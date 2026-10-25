# Côte d'Ivoire (ci): 58 calculadoras en francés, publicado

Rama `claude/pais-ci` (último commit `30d670aa publicar ci`). Se basa en `origin/main` (merge sin
conflictos en `5d2be395`); no depende de ninguna rama de motor.

## Qué incluye

- `src/paises/ci/**`: mercado `ci` (fr-CI, vous, XOF sin decimales, Africa/Abidjan, escala 600),
  36 datos con 36 tramos verificados, 1 serie (dólar BCEAO), 1 aviso, 2 novedades y 3 detectores.
- 18 calculadoras locales, todas publicadas, con casos y contenido SEO propio (title, description,
  h1, FAQ de 3 o 4 preguntas, glosario):
  calcul-salaire-net, calcul-its, calcul-cotisations-cnps, cout-employeur, smig, calcul-tva,
  indemnite-licenciement, indemnite-fin-de-contrat, conges-payes, heures-supplementaires, preavis,
  prime-anciennete, prime-de-fin-d-annee, indemnite-depart-retraite, taxe-entreprenant,
  impot-sur-les-benefices, convertisseur-euro-fcfa, convertisseur-dollar-fcfa.
- 40 universales en francés (`universales: "todas"`). La universal de IVA no entra porque la cubre
  `calcul-tva` local, con la TVA normal de 18 % y la reducida de 9 % verificadas en la DGI.
- Titles con las búsquedas del país: «Calcul salaire net Côte d'Ivoire», «Calcul ITS Côte d'Ivoire»,
  «Calcul cotisations CNPS», «SMIG Côte d'Ivoire», «Indemnité de licenciement Côte d'Ivoire».
- Commit `publicar ci`: `estado: "publicado"`, alta al final de `PAISES`, cargadores generados y
  medición de mercados regenerada (57 mercados).

## Fuentes

- DGI (dgi.gouv.ci, «Le système fiscal ivoirien»): barème ITS, RICF, parts, pensiones, contribution
  employeur, taxe d'apprentissage, TVA 18 y 9 %, régimen del entreprenant y microentreprises, BIC.
- CNPS (cnps.ci, espace employeur): tasas, accidente de trabajo, topes.
- Gouvernement (gouv.ci): comunicado del Consejo de ministros del 21/12/2022, SMIG 75 000 F.
- BCEAO (bceao.int): paridad 655,957 (página Histoire du franc CFA, leída hoy), cours du dollar,
  taux directeurs.
- Código del trabajo, decretos (96-200, 96-203, 98-39, 2017-210) y Convención colectiva de 1977:
  leídos en el recueil edición 2025 de la UVCI (Universidad virtual de Côte d'Ivoire, pública).
  En esta sesión el organismo pasó de «Journal officiel» a «UVCI (recueil...)» para que diga dónde
  se leyó de verdad; los valores se releyeron hoy en el texto.
- Annexe fiscale 2026 (nota de presentación DGBF): revisada; no toca ITS, RICF, tasas de TVA, BIC ni
  tasas del entreprenant.

## Checks (corridos con el país registrado)

- `npx tsc --noEmit -p .`: OK.
- `check_paises ci`: 36 datos, 36 verificados, 58 calculadoras, estado publicado.
- `check_paises_casos ci`: 60 casos en 18 archivos.
- `check_textos_paises ci`: 827 textos, 0 avisos.
- `check_fronteras`: 7580 archivos. `check_eol`: 8251 archivos en LF.
- `check_seo_intl`: 7640 páginas intl en los dos modos (122 más que sin ci).
- `check_motor --generar-cargadores`: 2294 pruebas. `check_mundo`: CI entra por inferencia.
- Prueba real de detectores (`scripts/paises/ci/probar_detectores.ts`): DGI `[]`, dólar BCEAO
  586 al 2026-10-23, taux directeurs `[]`.
- `check-all`: 148/150. Fallan `check_hreflang` (900 fallas, todas en clústeres de inflación de otros
  países: au nz sg hk my ph kw tz frente a cl co mx pe uy ec cr gt do; 0 tocan `/ci/`) y
  `check_ofertas_intl` (15 fallas, todas de `cl/sueldo-liquido` y `cl/finiquito` por la UF).
  Nada de esto es de ci.
- `npm run build`: no se corrió (es opcional; check-all ya corrió).

## Saltado por falta de credenciales

- Push y PR (sin permiso de escritura); Supabase, Vercel y PayPal: no hacen falta para este frente.

## Pendientes y riesgos

- La serie `ci.usd-xof` es diaria (10 días de antigüedad máxima): si el cron no la actualiza,
  `convertisseur-dollar-fcfa` deja de publicarse sola.
- El Código del trabajo no está publicado en un sitio .gouv.ci; se usa el recueil de la UVCI.
- Un SMIG nuevo o una annexe fiscale 2027 cambiarían datos: los detectores de la DGI y de la BCEAO
  los vigilan.
- `src/paises/index.ts` y los cargadores generados van a chocar con otras ramas: regenerar al mergear.

🤖 Generated with [Claude Code](https://claude.com/claude-code)
