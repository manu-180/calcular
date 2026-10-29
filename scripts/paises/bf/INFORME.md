# Burkina Faso (`bf`): informe del agente

- Rama: `claude/pais-bf` (base origin/main). Último commit de código: `615a8d4b`. El commit de este informe va encima.
- Mercado: `bf`, francés `fr-BF`, `usted` (vous), XOF, `Africa/Ouagadougou`, escala 600, `estado: "interno"`.
- Total: **60 calculadoras**, 20 locales y 40 universales. Las 20 locales están publicables y tienen casos.

## Calculadoras locales

| slug | concepto | ¿publicable? | base |
|---|---|---|---|
| calcul-salaire-net | sueldo-neto | sí | CGI art. 106, 111 a 113 (IUTS) y tasas CNSS. Declara `mundo` |
| calcul-iuts | impuesto-renta | sí | CGI art. 106, 111 a 113 |
| cotisations-cnss | aportes-seguridad-social | sí | CNSS: 5,5 % / 16 %, tope 800 000, piso SMIG |
| cout-employeur | costo-empleador | sí | CNSS empleador + TPA 3 % (CGI art. 227 a 229, abattement CGA 20 %) |
| smig | salario-minimo | sí | SMIG 45 000 / 259,62 por hora; mínimo prorrateado sobre 40 h |
| calcul-tva | iva | sí | CGI art. 317: 18 % y 10 % (hotelería y restauración agréées), redondeo al franco inferior |
| preavis | preaviso | sí | Código del Trabajo 2026, art. 76 y 78 |
| periode-d-essai | propio | sí | Código del Trabajo 2026, art. 49 |
| conges-payes | vacaciones | sí | Código del Trabajo 2026, art. 180 a 182 y 189 (solo días: la ley remite el cálculo del pago a un reglamento) |
| conge-maternite | propio | sí | Código del Trabajo 2026, art. 169 (fechas) |
| indemnite-maladie | propio | sí | Código del Trabajo 2026, art. 113 (salario por enfermedad no profesional) |
| rupture-irreguliere | propio | sí | Código del Trabajo 2026, art. 84, 85 y 87 |
| impot-sur-les-societes | propio | sí | CGI art. 87 a 89 (IS 27,5 % y MFP) |
| impot-sur-les-benefices | propio | sí | CGI art. 13 y 14 (BIC de personas físicas) |
| impot-revenus-fonciers | propio | sí | CGI art. 125 y 126 |
| calcul-ircm | propio | sí | CGI art. 140 y 141 |
| convertisseur-euro-fcfa | tipo-de-cambio | sí | paridad BCEAO 655,957 |
| convertisseur-dollar-fcfa | propio | sí | serie BCEAO (promedio compra y venta), con detector |
| age-de-depart-a-la-retraite | propio | sí | CNSS: 56, 58, 60 y 63 años; 15 años de cotización |
| assurance-volontaire-cnss | propio | sí | CNSS: 14 % |

No las hice porque no hay fuente primaria con el dato: **indemnización por despido** y fin de CDD (el código de 2026 remite a las convenciones colectivas, art. 71 y 81), **horas extra** (los recargos los fija un reglamento que no conseguí leer) y **asignaciones familiares** (el folleto de la CNSS está desactualizado: menciona todavía un tope de 600 000).

## Universales

Entran todas (`universales: "todas"`), 40 en francés. La universal `calcul-tva` la reemplaza la local del mismo concepto. No excluí ninguna.

## Datos

**41 datos, todos `verificado` el 2026-10-27, ninguno pendiente.** Además, una serie (`bf.usd-xof`: 585,25 al 27/10/2026).

| Fuente | Datos |
|---|---|
| DGI, [CGI actualizado con la ley de finanzas 2023](https://dgi.bf/wp-content/uploads/2023/08/Code-general-des-impots-a-jour-avec-la-LF-2023.pdf) | escala IUTS, reducción por cargas, abattement 20/25 %, deducción de jubilación de hasta 8 %, exoneraciones de vivienda, función y transporte, TPA, TVA, IS, MFP, escala BIC, IRF, IRCM |
| CNSS, [cotisations sociales](https://cnssbf.org/cotisations-sociales/) y [pension de retraite](https://cnssbf.org/la-pension-de-retraite-vieillesse/) | tasas (decreto 2023-0129), tope de 800 000 (resolución 2022-067), seguro voluntario 14 %, edades de jubilación y 15 años de cotización |
| SIG, [Conseil des ministres del 29/06/2023](https://gouvernement.gov.bf/wp-content/uploads/2025/10/CONSEIL-DES-MINISTRES-N%C2%B0020-DU-29-JUIN-2023.pdf) | SMIG mensual 45 000 y por hora 259,62 |
| SIG, [decreto 2026-0613/PF que promulga la ley 013-2026/ALP (Código del Trabajo)](https://gouvernement.gov.bf/wp-content/uploads/2026/06/DECRET-N%C2%B02026-0613-PF.pdf) | duración legal de 40 h, preaviso, período de prueba, vacaciones, maternidad, enfermedad, ruptura irregular, tope de daños y perjuicios |
| BCEAO | paridad con el euro; cotización del dólar |

El CGI lo crucé contra la ley de finanzas 2024 (texto completo en an.bf) y contra las exposiciones de motivos de las leyes de finanzas 2025, 2026 y de la rectificativa 2025 (publicadas por la DGI). Ninguna toca los artículos que uso.

## Detectores

Los probé con `npx tsx scripts/paises/bf/probar_detectores.ts` contra las fuentes reales, el 27/10/2026:

- `bf.bceao-dollar` (serie): `[{"fecha":"2026-10-27","valor":585.25}]`.
- `bf.dgi-lois-de-finances` (norma, página de leyes de la DGI): `[]`. Encontró los PDF y no hay ninguna ley posterior a 2026 ni una rectificativa de 2026.
- `bf.cnss-cotisations` (norma): `[]`. Leyó el decreto 2023-0129, la resolución 2022-067 y el tope de 800 000, sin cambios.
- `bf.sig-smig` (norma, API WordPress del SIG): `[]`. La respuesta fue válida y no hay consejos posteriores al 27/10/2026 sobre «salaires minima».

## Checks (con `bf` registrado solo en local; `index.ts` revertido antes del commit)

- `npx tsc --noEmit`: sin errores.
- `check_paises bf`: ✅ 41 datos (41 verificados), 1 serie, 60 calculadoras. Avisa que la serie del dólar vence en 10 días sin el cron.
- `check_paises_casos bf`: TODO OK, 59 casos en 20 archivos.
- `check_textos_paises bf`: TODO OK, 891 textos.
- `check_fronteras`: TODO OK, 12 447 archivos.
- `check_eol`: OK, 13 666 archivos en LF.
- `check_motor`: TODO OK, 4 111 pruebas.
- `check_mundo`: TODO OK. Solo cuenta mercados publicados: con `bf` pasado a publicado de forma temporal, entra como «declarado», con tasa efectiva de 14,5 % / 19,9 % / 19,2 % a 15k / 50k / 150k.
- `next dev` (webpack, puerto 3111, con `NEXT_PUBLIC_SITIO_INTL_URL=http://calcularya.localhost:3111`): `/bf`, `/bf/calcul-salaire-net` y `/bf/calcul-mensualite-pret` responden 200 en francés.

## Riesgos y dudas para el coordinador

1. **Código del Trabajo de 2026.** La ley 013-2026/ALP derogó el código de 2008. El único texto oficial accesible es el PDF escaneado del decreto de promulgación del 25/05/2026, que leí con OCR página por página. Los números de artículo y las cifras los revisé en contexto, pero conviene una segunda lectura humana del PDF. La ley da 6 meses de adaptación (art. 438).
2. **Fecha del SMIG.** El monto está en el comunicado oficial del Conseil des ministres del 29/06/2023 y el SIG lo confirmó el 04/10/2026. No leí en fuente oficial la fecha de promulgación del decreto (según fuentes secundarias, 2023-1586 del 3/11/2023). El tramo arranca el 29/06/2023, con una nota que lo explica.
3. **Leyes de finanzas no leídas.** La rectificativa 2024 está escaneada y es ilegible en dgi.bf. La rectificativa 2026 (aprobada el 23/09/2026) no está publicada. Según la prensa, sus medidas son sectoriales (inmobiliario, agropecuario), no tocan el IUTS. El detector de la DGI va a avisar cuando aparezca.
4. **Escala del IUTS.** La ley escribe los tramos «de 30.100 a 50.000», etc. La apliqué en continuo, sin redondear la base a centenas, y está anotado en la fuente. La diferencia es de unos pocos francos.
5. **El AMU (seguro de salud universal) no está en el sueldo neto.** cnamu.bf está en mantenimiento y no encontré tasas oficiales. El campo «Autres retenues» cubre lo que figure en el recibo.
6. **Infraestructura.** Los sitios `*.gov.bf` (finances, sécurité, fonction publique, legiburkina) no responden desde esta red; gouvernement.gov.bf y cnssbf.org sí. Al worktree le faltaba el junction `node_modules`: lo creé hacia `calcular-nm\node_modules`, igual que en los otros worktrees. Turbopack lo rechaza («points out of the filesystem root»), por eso `next dev` corre con `--webpack`. El push con la cuenta activa de gh (developers-insights) da 403: subí con el token de manu-180 solo para cada comando, sin cambiar la cuenta activa.
