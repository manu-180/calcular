# Informe del agente de Omán (`om`, `om-en`)

Rama `claude/pais-om` (base `origin/main`). El último commit es el de este informe. Sin PR y sin tocar
`src/paises/index.ts` en los commits: el registro fue solo local, para probar.

## Calculadoras locales (17: 16 publicables y 1 en borrador)

Mercado `om` en árabe (`ar-OM`, usted, OMR con 3 decimales, escala 0,4). Edición `om-en` (`en-OM`) con
las 16 publicables traducidas y su contenido escrito en inglés.

| Slug | Concepto | ¿Publicable? | Por qué |
|---|---|---|---|
| `salary-calculator` | sueldo-neto | sí | Ley de Protección Social 52/2023: art. 70 (7,5 %), art. 116 (0,5 %), art. 52 (tope de 3.000). Declara `mundo` |
| `spf-contribution-calculator` | aportes-seguridad-social | sí | Arts. 52, 70, 90, 116, 123 y 128 y art. 6 del decreto (fechas de inicio de cada rama) |
| `employee-cost-calculator` | costo-empleador | sí | Los mismos datos. Empleador omaní: 14,5 % |
| `end-of-service-gratuity` | indemnizacion-despido | sí | Ley de Trabajo 53/2023: art. 61 (un salario básico por año, proporcional) y arts. 40, 80 y 83 |
| `final-settlement` | liquidacion-final | sí | Arts. 38, 61 y 81 |
| `notice-period` | preaviso | sí | Art. 38: 30 días (sueldo mensual) o 15 (otros) y art. 39 |
| `annual-leave-calculator` | vacaciones | sí | Arts. 78 y 81: 30 días; salario total al terminar y básico durante la relación |
| `overtime-calculator` | horas-extra | sí | Art. 71 (25/50/100 %) y art. 72 (50/75/200 % sin consentimiento) |
| `sick-leave-calculator` | propio | sí | Art. 82 (182 días: 100/75/50/35 %) y art. 124 de la Ley 52/2023 (empleador 7 días, el fondo el resto) |
| `maternity-leave-calculator` | propio | sí | Art. 84: 98 días (hasta 14 antes del parto) y paternidad de 7 días |
| `working-hours-calculator` | propio | sí | Art. 70: 8 h/40 h y en Ramadán 6 h/30 h. Art. 71: 12 h como máximo |
| `unfair-dismissal-compensation` | propio | sí | Art. 11: de 3 a 12 salarios totales |
| `job-security-benefit` | propio | sí | Ley 52/2023, art. 119: 60 % del promedio de 2 años, mínimo 115 OMR, 6 meses |
| `pension-calculator` | jubilacion | sí | Ley 52/2023: arts. 73, 75, 76 y 78 (2 % por año, 60 años, mujer 5 antes, reducción 5 % y 1 %). Es una estimación simplificada y lo dice |
| `vat-calculator` | iva | sí | Ley de IVA 121/2020, art. 36 (5 %), vigente desde el 16/4/2021 |
| `inflation-calculator` | inflacion | sí | Serie `om.cpi-yoy` del NCSI: 3,2 % a septiembre de 2026 |
| `minimum-wage` | salario-minimo | **no (borrador)** | 325 OMR (RM 222/2013) solo leído en qanoon.om, que no es oficial, y sin confirmar que no lo cambió otra resolución posterior a 2023 |

**Universales:** entran 40, todas menos `vat`, que queda reemplazada por la local. En total: `om` tiene
57 calculadoras (56 publicables) y `om-en` tiene 56.

## Datos

Hay 26 datos y 1 serie. 25 datos están verificados hoy (2026-10-26) en PDF oficiales de
**mjla.gov.om** (Ministerio de Justicia y Asuntos Legales, biblioteca de leyes):

- Ley de Trabajo 53/2023: `Book524081.pdf`. Datos: vacaciones, preaviso, horas extra (normales y
  urgentes), jornada, gratificación, despido arbitrario, licencias familiares, escala de enfermedad y
  días de enfermedad.
- Ley de Protección Social 52/2023: `Book595450.pdf`. Datos: aportes de vejez, tope, riesgos, seguridad
  laboral, maternidad (desde el 19/7/2024), enfermedad (desde el 19/7/2026), días a cargo del
  empleador, seguro de desempleo (tasa, mínimo y meses), jubilación (2 %, 60 años, mujer, reducciones).
- Ley de IVA 121/2020: `Book535783.pdf`. Dato: 5 %.
- Serie `om.cpi-yoy` (3,2 %, sept. 2026) leída en el informe en PDF del NCSI (api.ncsi.gov.om).

Contrasté el texto consolidado de qanoon.om para las leyes 52 y 53: no registra reformas y las tasas
coinciden.

**No verificado:** `om.minimum-wage` (325 OMR), por el motivo que dice la tabla.

**Sin dato, a propósito:** el divisor del salario diario. La ley no lo fija, así que es un campo con 30
por defecto y una ayuda que lo explica.

## Detectores (`fuentes.ts`), probados contra las fuentes reales

Script: `scripts/paises/om/probar_detectores.ts`.

- `om.ncsi-cpi` (serie): lee el JSON de indicadores que trae embebida la portada de ncsi.gov.om.
  Devolvió `[{"fecha":"2026-09-01","valor":3.2}]`.
- `om.mjla-labour-law`, `om.mjla-social-protection`, `om.mjla-vat` (norma): recorren el listado de
  leyes de mjla.gov.om buscando decretos sobre esas leyes que no sean los ya leídos. Hoy devuelven `[]`.
  Probé la regex con la página 2 del listado y encuentra 53/2023, 52/2023 y 50/2023, que el filtro de ya
  leídos descarta.

## Checks

| Check | Resultado |
|---|---|
| `npx tsc --noEmit` | 0 errores |
| `check_paises om` / `om-en` | ✅ 26 datos (25 verificados, 1 pendiente), 1 serie, 57 y 56 calculadoras |
| `check_paises_casos om` / `om-en` | TODO OK: 48 casos en 16 archivos (la edición los corre todos) |
| `check_textos_paises om` / `om-en` | 689 y 567 textos, 0 avisos |
| `check_fronteras` | 1 falla **ajena y previa**: `src/motor/compartir/AlCelu.tsx` importa `uqr`. No toqué `src/motor` |
| `check_eol` | OK |
| `check_motor` (con om y om-en registrados en local) | TODO OK: 3855 pruebas |
| `check_mundo` | Con el estado `interno` no entra en la grilla. Pasándolo a `publicado` solo en local: **OM incluido, declarado**, 8,0 % efectivo en 15k/50k/150k |

`next dev`: `/om`, `/om/salary-calculator`, `/om/sick-leave-calculator`, `/om/loan` y `/om-en/...` dan 200
y el contenido sale bien.

## Riesgos y dudas para el coordinador

1. **spf.gov.om y cbo.gov.om no responden** desde aquí (spf rechaza la conexión, cbo devuelve «Request
   Rejected»). Los aportes salen de la ley publicada en el diario oficial. Si un reglamento del fondo
   escalona las tasas, no lo vi. Por cbo no hay calculadora de tipo de cambio.
2. **Fechas de inicio de maternidad y enfermedad**: el decreto dice «un año» y «tres años» desde su
   emisión (19/7/2023). Cargué el 19/7/2024 y el 19/7/2026; podría ser un día después.
3. **Extranjeros**: el fondo no les cobra aportes hoy. El ramo de riesgos empieza en julio de 2028 y
   maternidad y enfermedad dependen de resoluciones del consejo que no leí. Para ellos el cálculo da 0 y
   lo dice.
4. **Sistema de ahorro (art. 139, 9 %)**: reemplazará la gratificación de los extranjeros cuando empiece
   (la prensa habla de julio de 2027). Hay un aviso informativo y no se calcula.
5. **Impuesto a la renta de personas (RD 56/2025)**: rige desde 2028 y no está en el listado de mjla, así
   que no lo leí. El sueldo neto no menciona impuestos.
6. **Puerto 3103**: estaba ocupado por otro `next` del `node_modules` compartido y no lo maté. Usé el 3903
   con `--webpack` (Turbopack no acepta el junction de `node_modules`) y
   `NEXT_PUBLIC_SITIO_INTL_URL=http://calcularya.localhost:3903`. Lo apagué al terminar.
7. Un push dio 403 una vez (credenciales de otra cuenta); el siguiente entró. Si falta algún commit en el
   remoto, es por eso.
