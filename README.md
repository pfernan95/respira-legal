# respiraapp.fit

Web de [Respira](https://apps.apple.com/app/6759206565), app iOS de niveles de
polen y calidad del aire en España. Sitio estático generado con
[Eleventy 3](https://www.11ty.dev/) y desplegado en GitHub Pages.

## Desarrollo

```bash
npm ci
npm run build          # fetch de Open-Meteo (52 capitales) + build a _site/
npm run serve          # servidor de desarrollo
POLLEN_SKIP_FETCH=1 npm run build   # build offline con el último dato cacheado
```

## Arquitectura de datos

- `src/_data/constants/` — puerto **literal** de las constantes de la app iOS
  (`pfernan95/respira-app`): umbrales, temporadas, `MONTHLY_POLLEN_GRAINS`,
  colores y coordenadas. La app es la fuente de verdad; no se editan aquí.
- `src/_lib/aggregate.js` — reglas de agregación diaria (idénticas a la vista
  de previsión de la app): valor del día = **máximo horario** por tipo de
  polen; nivel general = peor nivel; AQI = **media** horaria redondeada;
  negativos recortados a 0.
- `src/_data/pollenData.js` — fetch en build por capital de provincia
  (`timezone=auto`, `forecast_days=7`). Si el fetch de una ciudad falla se
  reutiliza el último dato bueno de `.cache/pollen-data.json` marcado como
  `stale`, conservando su `fetchedAt` real.

## Páginas

Generadas por Eleventy a partir de los data files:

- **`/`** — snapshot nacional: nivel de hoy de las principales ciudades, qué
  pólenes están en temporada, enlaces por tipo.
- **`/polen-{ciudad}`** (52) — una por capital de provincia, ordenadas por
  población (INE, solo orden interno). Nivel de hoy por tipo, previsión,
  calidad del aire, calendario, FAQ y enlaces a ciudades cercanas (4 más
  próximas por distancia geográfica).
- **`/alergia-{polen}`** (6) — páginas nacionales por alérgeno con datos de
  Open-Meteo (gramíneas, olivo, abedul, aliso, artemisa, ambrosía).
- **`/polen-{polen}-{ciudad}`** — páginas cruzadas, solo los pares calibrados
  (ver abajo).
- **`/mapa-polen-espana`** — índice de las 52 ciudades con su nivel de hoy.
- **`/estilo`** — guía de estilo interna, `noindex`, fuera del sitemap.

### Páginas cruzadas y calibración

`tools/calibrate-cross-pages.mjs` decide qué páginas `/polen-{polen}-{ciudad}`
se generan, con filtro mecánico (no a criterio): solo los 6 pólenes con datos
de Open-Meteo, y solo si ese polen alcanzó al menos nivel `moderate` en esa
ciudad en los últimos 92 días (`past_days=92`). El resultado se versiona en
`src/_data/crossPages.json` para que la generación sea reproducible.

⚠️ **Una pasada de 92 días solo ve ~3 meses.** La calibración actual se hizo en
agosto, así que capta bien gramíneas/olivo/artemisa/ambrosía pero NO abedul ni
aliso (temporada invierno–primavera). Para las páginas cruzadas de esos pólenes
hay que re-calibrar con una pasada entre febrero y mayo. El fichero registra
`runMonth` y un `caveat` con esta limitación.

## Rebuild diario

`.github/workflows/deploy.yml` reconstruye y despliega:

- **Cron**: `0 5 * * *` UTC (06:00 Madrid en invierno, 07:00 en verano).
- **Deploy por artifact** (`actions/deploy-pages`): los datos nunca se
  commitean a `main`. El último payload bueno vive en la caché de Actions.
- **Respaldo contra la desactivación de crons** (GitHub los apaga tras 60 días
  sin actividad en el repo): un cron externo en cron-job.org dispara el
  workflow a diario vía `workflow_dispatch`:
  - URL: `https://api.github.com/repos/pfernan95/respira-legal/actions/workflows/deploy.yml/dispatches`
  - Método: `POST`, cuerpo: `{"ref":"main"}`
  - Cabeceras: `Authorization: Bearer <PAT>`, `Accept: application/vnd.github+json`
  - El PAT (fine-grained, solo este repo, permiso *Actions: read and write*)
    se guarda en cron-job.org, nunca en este repo.

**Requisito de configuración**: en *Settings → Pages*, la fuente debe ser
**GitHub Actions** (no "Deploy from a branch") para que este workflow sirva el
sitio. El dominio personalizado se mantiene en la configuración de Pages.

## Imágenes de marca (generación manual, no diaria)

Los iconos y la imagen OG son assets estáticos versionados; se regeneran a
mano, no en cada build. Todos parten del **icono real de la app**
(`tools/brand-icon.png`, copiado tal cual de `pfernan95/respira-app`
`assets/icon.png`, 1024×1024) — no hay ningún icono redibujado.

```bash
pip install Pillow
python3 tools/generate-icons.py    # favicon.png + apple-touch-icon.png

# OG image (necesita fuentes estáticas; resvg no aplica woff2 variable):
pip install fonttools brotli
python3 tools/instance-fonts.py    # woff2 variable -> .cache/fonts/*.ttf
node tools/generate-og-image.mjs   # src/og-image.png (1200×630)
```

La OG image de Fase 1 es una imagen de marca estática (icono real + Fraunces +
IBM Plex, paleta salvia, sin afirmaciones no verificables). La OG por ciudad
con el nivel del día es Fase 2 (después de noviembre).

## URLs

Las URLs públicas son extensionless (`/polen-madrid`) y **no deben cambiar**.
El build genera ficheros planos (`polen-madrid.html`), que GitHub Pages sirve
extensionless con 200 y sin redirección — la salida tipo directorio
(`polen-madrid/index.html`) provocaría un 301 a `/polen-madrid/` y cambiaría
las URLs indexadas.
