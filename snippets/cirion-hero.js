(function () {
  const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  const hoverQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
  const heroes = Array.from(document.querySelectorAll("[data-cirion-hero]"));
  const DEFAULT_BASE_SPEED = 0.55;
  const DEFAULT_HOVER_SPEED = 1;
  const DEFAULT_CURSOR_SENSITIVITY = 0.005;
  const RATE_TRANSITION_MS = 220;
  const POINTER_IDLE_MS = 150;
  const heroState = new WeakMap();

  if (!heroes.length) {
    return;
  }

  function getState(hero) {
    if (!heroState.has(hero)) {
      heroState.set(hero, {
        hovered: false,
        rateRaf: 0,
        idleTimer: 0,
        lastPointerX: null,
        pointerDriven: false,
      });
    }

    return heroState.get(hero);
  }

  function prefersReducedMotion() {
    return document.documentElement.dataset.cirionForceMotion === "true"
      ? false
      : reduceMotionQuery.matches;
  }

  function clampSpeed(value, fallback) {
    const numeric = Number.parseFloat(value);
    if (!Number.isFinite(numeric)) {
      return fallback;
    }

    return Math.min(2, Math.max(0.2, numeric));
  }

  function clampCursorSensitivity(value, fallback) {
    const numeric = Number.parseFloat(value);
    if (!Number.isFinite(numeric)) {
      return fallback;
    }

    return Math.min(0.02, Math.max(0.001, numeric));
  }

  function getBaseSpeed(hero) {
    return clampSpeed(hero.dataset.baseSpeed, DEFAULT_BASE_SPEED);
  }

  function getHoverSpeed(hero) {
    return clampSpeed(hero.dataset.hoverSpeed, DEFAULT_HOVER_SPEED);
  }

  function getCursorSensitivity(hero) {
    return clampCursorSensitivity(hero.dataset.cursorSensitivity, DEFAULT_CURSOR_SENSITIVITY);
  }

  function getTargetSpeed(hero) {
    const state = getState(hero);
    return hoverQuery.matches && state.hovered ? getHoverSpeed(hero) : getBaseSpeed(hero);
  }

  function setPlaybackRate(hero, targetRate, immediate) {
    const video = hero.querySelector(".cirion-hero__video");
    if (!video) {
      return;
    }

    const state = getState(hero);

    if (state.rateRaf) {
      cancelAnimationFrame(state.rateRaf);
      state.rateRaf = 0;
    }

    if (immediate || typeof requestAnimationFrame !== "function") {
      video.defaultPlaybackRate = targetRate;
      video.playbackRate = targetRate;
      return;
    }

    const startRate = Number.isFinite(video.playbackRate) ? video.playbackRate : targetRate;
    const startedAt = performance.now();

    const tick = (timestamp) => {
      const elapsed = timestamp - startedAt;
      const progress = Math.min(1, elapsed / RATE_TRANSITION_MS);
      const eased = 1 - Math.pow(1 - progress, 4);
      const nextRate = startRate + (targetRate - startRate) * eased;

      video.defaultPlaybackRate = targetRate;
      video.playbackRate = nextRate;

      if (progress < 1) {
        state.rateRaf = requestAnimationFrame(tick);
      } else {
        state.rateRaf = 0;
        video.playbackRate = targetRate;
      }
    };

    state.rateRaf = requestAnimationFrame(tick);
  }

  function syncHeroSpeed(hero, immediate) {
    if (prefersReducedMotion()) {
      return;
    }

    const state = getState(hero);
    if (state.pointerDriven) {
      return;
    }

    setPlaybackRate(hero, getTargetSpeed(hero), immediate);
  }

  function wrapTime(time, duration) {
    if (!duration || !Number.isFinite(duration)) {
      return 0;
    }

    return ((time % duration) + duration) % duration;
  }

  function stopPointerDriven(hero) {
    const state = getState(hero);
    state.pointerDriven = false;
    state.lastPointerX = null;

    if (state.idleTimer) {
      clearTimeout(state.idleTimer);
      state.idleTimer = 0;
    }
  }

  function resumeAfterPointer(hero) {
    if (prefersReducedMotion()) {
      return;
    }

    stopPointerDriven(hero);
    syncHeroSpeed(hero, false);
    playHero(hero);
  }

  function handlePointerDrivenMotion(hero, clientX) {
    if (!hoverQuery.matches || prefersReducedMotion()) {
      return;
    }

    const video = hero.querySelector(".cirion-hero__video");
    if (!video || video.readyState < 2 || !Number.isFinite(video.duration) || video.duration <= 0) {
      return;
    }

    const state = getState(hero);
    if (state.lastPointerX === null) {
      state.lastPointerX = clientX;
      return;
    }

    const deltaX = clientX - state.lastPointerX;
    state.lastPointerX = clientX;

    if (Math.abs(deltaX) < 0.25) {
      return;
    }

    state.pointerDriven = true;

    if (state.idleTimer) {
      clearTimeout(state.idleTimer);
    }

    if (!video.paused) {
      video.pause();
    }

    const nextTime = wrapTime(
      video.currentTime - deltaX * getCursorSensitivity(hero),
      video.duration
    );

    video.currentTime = nextTime;

    state.idleTimer = window.setTimeout(() => {
      resumeAfterPointer(hero);
    }, POINTER_IDLE_MS);
  }

  function activate(hero) {
    if (hero.dataset.activated === "true" || prefersReducedMotion()) {
      if (prefersReducedMotion()) {
        hero.classList.add("is-reduced");
      }
      return;
    }

    const video = hero.querySelector(".cirion-hero__video");
    if (!video) {
      hero.classList.add("is-fallback");
      return;
    }

    hero.dataset.activated = "true";
    if (video.readyState === 0) {
      video.load();
    }
  }

  function markReady(hero) {
    hero.classList.add("is-ready");
    hero.classList.remove("is-fallback");
  }

  function playHero(hero) {
    if (prefersReducedMotion()) {
      hero.classList.add("is-reduced");
      return;
    }

    const video = hero.querySelector(".cirion-hero__video");
    if (!video) {
      return;
    }

    syncHeroSpeed(hero, true);
    const playAttempt = video.play();
    if (playAttempt && typeof playAttempt.catch === "function") {
      playAttempt.catch(() => {
        hero.classList.add("is-fallback");
      });
    }
  }

  function pauseHero(hero) {
    const video = hero.querySelector(".cirion-hero__video");
    if (video && !video.paused) {
      video.pause();
    }
  }

  heroes.forEach((hero) => {
    const video = hero.querySelector(".cirion-hero__video");

    if (!video) {
      hero.classList.add("is-fallback");
      return;
    }

    if (prefersReducedMotion()) {
      hero.classList.add("is-reduced");
    }

    video.muted = true;
    video.playsInline = true;
    video.loop = true;
    video.autoplay = true;
    video.defaultPlaybackRate = getBaseSpeed(hero);
    video.playbackRate = getBaseSpeed(hero);

    video.addEventListener("loadeddata", () => markReady(hero), { once: true });
    video.addEventListener("canplay", () => markReady(hero), { once: true });
    video.addEventListener("error", () => hero.classList.add("is-fallback"));

    hero.addEventListener("pointerenter", () => {
      if (!hoverQuery.matches || prefersReducedMotion()) {
        return;
      }

      const state = getState(hero);
      state.hovered = true;
      state.lastPointerX = null;
      syncHeroSpeed(hero, false);
    });

    hero.addEventListener("pointermove", (event) => {
      handlePointerDrivenMotion(hero, event.clientX);
    });

    hero.addEventListener("pointerleave", () => {
      const state = getState(hero);
      state.hovered = false;
      resumeAfterPointer(hero);
    });
  });

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const hero = entry.target;
          if (entry.isIntersecting) {
            activate(hero);
            playHero(hero);
          } else {
            pauseHero(hero);
          }
        });
      },
      {
        rootMargin: "240px 0px",
        threshold: 0.25,
      }
    );

    heroes.forEach((hero) => observer.observe(hero));
  } else {
    heroes.forEach((hero) => {
      activate(hero);
      playHero(hero);
    });
  }

  document.addEventListener("visibilitychange", () => {
    heroes.forEach((hero) => {
      if (document.hidden) {
        pauseHero(hero);
        return;
      }

      const bounds = hero.getBoundingClientRect();
      const inView = bounds.top < window.innerHeight && bounds.bottom > 0;
      if (inView) {
        playHero(hero);
      }
    });
  });

  const handleReducedMotionChange = (event) => {
    heroes.forEach((hero) => {
      if (prefersReducedMotion()) {
        hero.classList.add("is-reduced");
        getState(hero).hovered = false;
        stopPointerDriven(hero);
        pauseHero(hero);
      } else {
        hero.classList.remove("is-reduced");
        activate(hero);
        syncHeroSpeed(hero, true);
        playHero(hero);
      }
    });
  };

  if (typeof reduceMotionQuery.addEventListener === "function") {
    reduceMotionQuery.addEventListener("change", handleReducedMotionChange);
  } else if (typeof reduceMotionQuery.addListener === "function") {
    reduceMotionQuery.addListener(handleReducedMotionChange);
  }

  window.addEventListener("cirion:motion-override", () => {
    heroes.forEach((hero) => {
      if (prefersReducedMotion()) {
        hero.classList.add("is-reduced");
        getState(hero).hovered = false;
        stopPointerDriven(hero);
        pauseHero(hero);
      } else {
        hero.classList.remove("is-reduced");
        activate(hero);
        syncHeroSpeed(hero, true);
        playHero(hero);
      }
    });
  });

  const toolkits = Array.from(document.querySelectorAll("[data-cirion-speed-toolkit]"));

  function renderToolkit(toolkit, base, hover, cursor) {
    const baseInput = toolkit.querySelector("[data-speed-control='base']");
    const hoverInput = toolkit.querySelector("[data-speed-control='hover']");
    const cursorInput = toolkit.querySelector("[data-speed-control='cursor']");
    const baseOutput = toolkit.querySelector("[data-speed-output='base']");
    const hoverOutput = toolkit.querySelector("[data-speed-output='hover']");
    const cursorOutput = toolkit.querySelector("[data-speed-output='cursor']");

    if (baseInput) {
      baseInput.value = String(base);
    }

    if (hoverInput) {
      hoverInput.value = String(hover);
    }

    if (cursorInput) {
      cursorInput.value = String(cursor);
    }

    if (baseOutput) {
      baseOutput.textContent = `${Number(base).toFixed(2)}x`;
    }

    if (hoverOutput) {
      hoverOutput.textContent = `${Number(hover).toFixed(2)}x`;
    }

    if (cursorOutput) {
      cursorOutput.textContent = `${Number(cursor).toFixed(3)}`;
    }
  }

  function syncAllToolkits(base, hover, cursor) {
    toolkits.forEach((toolkit) => renderToolkit(toolkit, base, hover, cursor));
  }

  toolkits.forEach((toolkit) => {
    const baseInput = toolkit.querySelector("[data-speed-control='base']");
    const hoverInput = toolkit.querySelector("[data-speed-control='hover']");
    const cursorInput = toolkit.querySelector("[data-speed-control='cursor']");
    const resetButton = toolkit.querySelector("[data-speed-reset]");

    const applyToolkitValues = () => {
      const base = clampSpeed(baseInput?.value, DEFAULT_BASE_SPEED);
      const hover = clampSpeed(hoverInput?.value, DEFAULT_HOVER_SPEED);
      const cursor = clampCursorSensitivity(cursorInput?.value, DEFAULT_CURSOR_SENSITIVITY);

      heroes.forEach((hero) => {
        hero.dataset.baseSpeed = String(base);
        hero.dataset.hoverSpeed = String(hover);
        hero.dataset.cursorSensitivity = String(cursor);
        stopPointerDriven(hero);
        syncHeroSpeed(hero, true);
      });

      syncAllToolkits(base, hover, cursor);
    };

    renderToolkit(
      toolkit,
      getBaseSpeed(heroes[0]),
      getHoverSpeed(heroes[0]),
      getCursorSensitivity(heroes[0])
    );

    if (baseInput) {
      baseInput.addEventListener("input", applyToolkitValues);
    }

    if (hoverInput) {
      hoverInput.addEventListener("input", applyToolkitValues);
    }

    if (cursorInput) {
      cursorInput.addEventListener("input", applyToolkitValues);
    }

    if (resetButton) {
      resetButton.addEventListener("click", () => {
        if (baseInput) {
          baseInput.value = String(DEFAULT_BASE_SPEED);
        }
        if (hoverInput) {
          hoverInput.value = String(DEFAULT_HOVER_SPEED);
        }
        if (cursorInput) {
          cursorInput.value = String(DEFAULT_CURSOR_SENSITIVITY);
        }
        applyToolkitValues();
      });
    }
  });
})();
