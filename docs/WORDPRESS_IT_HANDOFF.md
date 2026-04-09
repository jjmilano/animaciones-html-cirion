# Guía de entrega a IT (WordPress + Landing Pages)

> Objetivo: que cualquier equipo de IT pueda instalar este hero animado sin depender del equipo de desarrollo original.

## 1) Qué entregar (paquete final)

Entregar **un ZIP versionado** generado desde este repo (no enviar archivos sueltos por chat/email).

Contenido mínimo del ZIP:

- `assets/optimized/connectivity/*` (poster + webm + mp4)
- `assets/optimized/data/*` (poster + webm + mp4)
- `snippets/cirion-hero.css`
- `snippets/cirion-hero.js`
- `snippets/cirion-hero-experimental.css` (opcional)
- `snippets/cirion-hero-experimental.js` (opcional)
- `snippets/hero-connectivity.html`
- `snippets/hero-data.html`
- esta guía de instalación
- `CHECKSUMS.sha256` para validar integridad

## 2) Mejor práctica de despliegue

Para WordPress y landing pages, la práctica recomendada es:

1. **Subir los medios pesados (poster + videos) al CDN o Media Library**.
2. **Publicar CSS/JS como assets versionados** (idealmente en el theme hijo o plugin de utilidades).
3. **Pegar únicamente el HTML del snippet en cada landing**.
4. **Reemplazar URLs relativas por absolutas (CDN/WordPress)**.
5. **Hacer smoke test en desktop + mobile antes de publicar**.

> Evitar: pegar CSS/JS inline en cada página (genera duplicación y dificulta mantenimiento).

## 3) Instalación paso a paso en WordPress (a prueba de errores)

## Paso 0 — Prerrequisitos

- Rol con permisos para subir medios y editar páginas.
- Acceso al plugin/theme donde se encolan assets globales.
- HTTPS activo en el sitio final.

## Paso 1 — Subir assets multimedia

Subir estos 6 archivos:

- `assets/optimized/connectivity/poster.webp`
- `assets/optimized/connectivity/video.webm`
- `assets/optimized/connectivity/video.mp4`
- `assets/optimized/data/poster.webp`
- `assets/optimized/data/video.webm`
- `assets/optimized/data/video.mp4`

Guardar las URLs finales en un documento interno (ejemplo):

- `https://cdn.midominio.com/cirion/connectivity/poster.webp`
- `https://cdn.midominio.com/cirion/connectivity/video.webm`
- `https://cdn.midominio.com/cirion/connectivity/video.mp4`
- `https://cdn.midominio.com/cirion/data/poster.webp`
- `https://cdn.midominio.com/cirion/data/video.webm`
- `https://cdn.midominio.com/cirion/data/video.mp4`

## Paso 2 — Registrar CSS y JS una sola vez

### Opción recomendada: enqueue desde theme/plugin

Registrar:

- `cirion-hero.css`
- `cirion-hero.js`

Con versionado de cache (ejemplo: `v1.0.0` o hash de build).

### Opción alternativa (rápida): plugin de headers/footers

- CSS en `<head>` una sola vez.
- JS antes de `</body>` una sola vez.

> Importante: **no duplicar** el script por página.

## Paso 3 — Insertar snippet HTML en la landing

En Gutenberg, usar bloque **HTML personalizado** y pegar:

- `snippets/hero-connectivity.html` o
- `snippets/hero-data.html`

## Paso 4 — Reemplazar URLs relativas

Dentro del snippet, reemplazar `src="../assets/..."` y `poster="../assets/..."` por URLs absolutas del CDN/WordPress.

Checklist de reemplazo:

- [ ] `<img class="cirion-hero__poster" src="...">`
- [ ] `<video ... poster="...">`
- [ ] `<source ... type="video/webm">`
- [ ] `<source ... type="video/mp4">`

## Paso 5 — QA técnico mínimo

Validar en:

- Chrome desktop (última versión)
- Safari iOS (iPhone real)
- Android Chrome

Pruebas obligatorias:

- [ ] El poster carga antes que el video.
- [ ] El video reproduce en loop, muteado, sin controles.
- [ ] No hay “saltos” visuales al cargar.
- [ ] La página no rompe Lighthouse por errores JS.
- [ ] Si no hay autoplay permitido, se mantiene fallback visual correcto.

## 4) Parámetros que IT puede ajustar sin romper el componente

En el wrapper del snippet:

- `data-base-speed="0.55"`
- `data-hover-speed="1"`
- `data-cursor-sensitivity="0.005"`

Y variables de posición:

- `--video-pos-desktop`
- `--video-pos-tablet`
- `--video-pos-mobile`

Recomendación: cambiar estos valores de a uno, testear, y documentar el valor final por landing.

## 5) Estrategia de versionado recomendada

- Tag semántico por release (`v1.0.0`, `v1.0.1`, etc.).
- ZIP con versión en nombre.
- Mantener changelog corto (qué cambió, quién aprobó, fecha).
- Nunca sobrescribir ZIPs anteriores.

## 6) Plan de rollback (si algo falla en producción)

1. Revertir el enqueue de CSS/JS a la versión anterior.
2. Restaurar snippet HTML previo en la landing.
3. Purga de caché (plugin + CDN).
4. Revalidar en incógnito/mobile.

Tiempo objetivo de rollback: < 15 minutos.

## 7) Cómo generar el ZIP listo para IT

Desde la raíz del repo:

```bash
python scripts/package_handoff.py
```

Si Windows no reconoce `python`, usar:

```powershell
.\scripts\package_handoff.ps1 -Version v1.0.0
```

o:

```bat
scripts\package_handoff.bat -Version v1.0.0
```

Si aparece el error `no se encontró Python`, no es un problema del proyecto; significa que Python no está instalado o no está en PATH.

Salida esperada:

- carpeta en `dist/`
- archivo ZIP versionado en `dist/`
- archivo `CHECKSUMS.sha256` dentro del paquete

## 8) Qué enviar por correo/ticket a IT

Plantilla breve:

- **Asunto:** Entrega Hero Cirion WordPress vX.Y.Z
- **Adjunto:** `cirion-hero-it-handoff-vX.Y.Z.zip`
- **Incluye:** assets + snippets + guía + checksums
- **Instrucción clave:** instalar assets globales una sola vez y usar snippets por landing.
- **Validación:** QA en desktop + iOS + Android antes de publicar.
