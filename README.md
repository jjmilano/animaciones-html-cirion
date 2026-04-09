# Cirion HTML5 Heroes

Dos heroes animados listos para WordPress, uno para `Connectivity` y otro para `Data`, usando los videos reales como motion principal.

## Archivos principales
- `snippets/cirion-hero.css`: estilos compartidos y namespaced.
- `snippets/cirion-hero.js`: carga progresiva, autoplay, pause/resume por visibilidad y fallback.
- `snippets/cirion-hero-experimental.css`: variante experimental con capa extra de profundidad y luz reactiva.
- `snippets/cirion-hero-experimental.js`: lógica experimental para la variante avanzada.
- `snippets/hero-connectivity.html`: markup listo para el banner de connectivity.
- `snippets/hero-data.html`: markup listo para el banner de data.
- `assets/optimized/connectivity/`: poster + videos optimizados de connectivity.
- `assets/optimized/data/`: poster + videos optimizados de data.
- `preview/index.html`: preview local para revisar ambas piezas.
- `preview/index-experimental.html`: preview local de la variante experimental.

## Integración en WordPress
1. Subí los archivos de `assets/optimized/...` a WordPress o a tu CDN.
2. Incluí `snippets/cirion-hero.css` una sola vez en la página o en el theme.
3. Incluí `snippets/cirion-hero.js` una sola vez en el footer o en un asset encolado.
4. Pegá en Gutenberg el HTML de `snippets/hero-connectivity.html` o `snippets/hero-data.html`.
5. Reemplazá las URLs relativas de `poster.webp`, `video.webm` y `video.mp4` por las URLs finales de WordPress/CDN.

## Control de velocidad
- `data-base-speed="0.55"` define la velocidad por defecto.
- `data-hover-speed="1"` define la velocidad al hacer hover con mouse en desktop.
- `data-cursor-sensitivity="0.005"` define cuánto “arrastra” el timeline el movimiento horizontal del mouse.
- En touch/mobile no se acelera por hover.
- Mientras movés el mouse sobre el banner en desktop, el video sigue el cursor horizontal y hace loop infinito.
- La preview incluye un toolkit básico para ajustar velocidades y sensibilidad en vivo.

## Preview local
Desde la raíz del proyecto:

```powershell
python -m http.server 8000
```

Después abrí:

```text
http://127.0.0.1:8000/preview/
```

Previews individuales:

```text
http://127.0.0.1:8000/preview/data.html
http://127.0.0.1:8000/preview/connectivity.html
```

O más simple:

```powershell
.\preview\start-preview.ps1
```

También podés abrirlo con doble click usando:

```text
preview\start-preview.bat
```

La preview fuerza animación por defecto para que puedas ver el comportamiento con JS aunque tu sistema tenga activado `prefers-reduced-motion`. Arriba a la derecha tenés un botón para alternar entre animación real y fallback estático.

## Stable vs experimental
- `stable`: usa `snippets/cirion-hero.css` + `snippets/cirion-hero.js`.
- `experimental`: usa `snippets/cirion-hero-experimental.css` + `snippets/cirion-hero-experimental.js`.
- Los snippets HTML de `hero-data.html` y `hero-connectivity.html` sirven para ambas versiones; lo que cambia es qué CSS/JS cargás en la página.
- Preview estable:
  - `http://127.0.0.1:8000/preview/`
- Preview experimental:
  - `http://127.0.0.1:8000/preview/index-experimental.html`

## Deploy en Vercel (evitar `NOT_FOUND`)
Este repo no tiene `index.html` en la raíz: la entrada real vive en `preview/index.html`.
Para que Vercel no devuelva `404: NOT_FOUND` en `/`, se incluye `vercel.json` con rewrites hacia las páginas de `preview/`.

Rutas útiles luego del deploy:

```text
/                       -> /preview/index.html
/data                   -> /preview/data.html
/connectivity           -> /preview/connectivity.html
/experimental           -> /preview/index-experimental.html
/data-experimental      -> /preview/data-experimental.html
/connectivity-experimental -> /preview/connectivity-experimental.html
```

## Regenerar assets
Si querés volver a generar posters y videos optimizados desde los MP4 originales:

```powershell
python .\scripts\build_assets.py
```

## Entrega a IT (WordPress / landings)
Para armar un paquete único, versionado y listo para instalación por IT:

```bash
python scripts/package_handoff.py --version v1.0.0
```

Esto genera en `dist/`:

- carpeta con todos los archivos necesarios,
- ZIP para compartir,
- `CHECKSUMS.sha256` para validar integridad.

Guía detallada para instalación (paso a paso, checklist y rollback):

- `docs/WORDPRESS_IT_HANDOFF.md`
