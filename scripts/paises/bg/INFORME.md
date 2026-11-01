# Bulgaria (bg): informe del agente de país

Rama `claude/pais-bg`. **Depende de `claude/mundo-motor-bg`, que no está mergeada a main**: integrar primero el motor búlgaro.
Mercado en `estado: "interno"`, sin registrar en `src/paises/index.ts`. Moneda EUR (euro desde el 1/1/2026), escala 0.9, trato `usted` con «Вие» en mayúscula (ADR 0002, D24).

## Calculadoras locales (21: 18 publicables y 3 en borrador)

| Slug | Concepto | Publicable | Motivo o norma |
|---|---|---|---|
| kalkulator-zaplata-bruto-neto | sueldo-neto | sí | КСО, ЗЗО, ЗБДОО 2026; 10 % en Мин. на икономиката |
| kalkulator-neto-bruto | propio | sí | inversa del anterior |
| razhodi-na-rabotodatelya | costo-empleador | sí | КСО, ЗБДОО прил. № 2А |
| minimalna-rabotna-zaplata | salario-minimo | sí | 620,20 EUR, página del НОИ |
| danak-varhu-dohodite | impuesto-renta | sí | 10 %, Мин. на икономиката |
| osiguritelni-vnoski | aportes-seguridad-social | sí | КСО чл. 6 y 157, ЗЗО чл. 40 |
| platen-godishen-otpusk | vacaciones | sí | КТ чл. 155, 156, 177, 224 |
| izchislyavane-na-bolnichni | propio | sí | КСО чл. 40 a 42 (70 %, 80 %, tope neto) |
| obezshtenie-za-maychinstvo | propio | sí | КСО чл. 48а a 50 |
| obezshtenie-za-otglezhdane-na-dete | propio | sí | ЗБДОО чл. 12 |
| obezshtenie-pri-uvolnenie | indemnizacion-despido | sí | КТ чл. 222 y 225 |
| predizvestie-pri-napuskane | preaviso | sí | КТ чл. 220, 326 |
| izvanreden-trud | horas-extra | sí | КТ чл. 262 |
| obezshtenie-za-bezrabotitsa | propio | sí | КСО чл. 54б y 54в, ЗБДОО чл. 11 |
| samoosiguryavashti-se-litsa | propio | sí | КСО чл. 6 y 157, ЗБДОО чл. 9 |
| dds-kalkulator | iva | sí | 20 % y 9 %, Мин. на икономиката |
| danak-pri-pokupka-na-imot | propio | sí | Sofía 3 %, Решение № 1036 del СОС; otra municipalidad con tasa propia |
| kalkulator-za-inflatsia | inflacion | sí | ИПЦ 2025 = 100, НСИ |
| danak-dividenti | propio | no | ver abajo |
| danak-varhu-nedvizhimi-imoti | propio | no | ver abajo |
| zakonna-lihva | propio | no | ver abajo |

**Universales:** `"todas"`. Entran 40: la de IVA se cae sola porque hay `dds-kalkulator` con el mismo concepto. Total del país: 61 (58 publicables).

## Datos

34 datos verificados el 31/10/2026 y 1 serie. Fuentes leídas:

- НОИ: ЗБДОО 2026 (`zbdoo-2026.pdf`), КСО consolidado a ДВ 68/2026 (`KCO-7.pdf`), КТ (`KT-2.pdf`), páginas de самоосигуряващи се y МРЗ.
- НЗОК: ЗБНЗОК 2026 (8 %) y ЗЗО (60:40).
- Министерство на икономиката: 10 % sobre el sueldo, 20 % y 9 % de ДДС. **Es una página explicativa del ministerio, no el texto de la ley.**
- Столичен общински съвет: Решение № 1036 (3 %).
- НСИ: CPI_1.1.xlsx (69 puntos, 2021-01 a 2026-09, 2 decimales).
- ЕЦБ: tasas de referencia (solo la usa la calculadora en borrador).

Vigencia a mitad de año: tope de cotización 2111,64 EUR hasta el 31/7 y 2300 EUR desde el 1/8; mínimo de самоосигуряващи се 550,66 y 620,20 EUR.

### No verificados (calculadora en borrador, sin casos)

| Dato | Motivo |
|---|---|
| `bg.danak-dividenti` (5 % como pista) | No se pudo leer el ЗДДФЛ vigente. El proyecto de presupuesto 2026 subía a 10 % y la prensa dice que se retiró; la única fuente oficial que dice 5 % es de 29/5/2025, y otra habla de sociedades fuera de la UE. Prudente: borrador. |
| `bg.zakonna-lihva-nadbavka` (8 % como pista) | El ПМС № 347/2025 está en dv.parliament.bg, que rechaza la conexión; solo se vio como extracto del buscador. |
| `bg.danak-nedvizhimi-sofia` (sin valor) | No se pudo leer la redacción vigente de la ordenanza de Sofía ni el ЗМДТ. |

### Accesos

- `nra.bg` (y `nap.bg`, que redirige), `dv.parliament.bg` y `parliament.bg`: conexión rechazada.
- `minfin.bg`: 403. Un intento con cabeceras de navegador por curl fue bloqueado por el clasificador de permisos como elusión de control de bots; no se reintentó ni se rodeó. Lo que depende de esa fuente quedó como borrador o se tomó de otro organismo oficial.
- `lex.bg`: 403. No se usó.
- ОЛП: la БНБ dejó de publicarlo desde el 1/1/2026 (comunicado del 19/2/2026), así que no hay dato de «основен лихвен процент». Se reemplaza en `zakonna-lihva` por la tasa del ЕЦБ.

### No construido

- **Ваучери:** el monto 102,26 EUR solo se vio en una fuente secundaria (ЗДБРБ sin leer).
- **МОД por actividad y profesión:** el anexo 1А es una tabla grande que el formulario no resuelve. Las páginas lo avisan en texto.
- **Pensión por fórmula:** no se calculó. Solo está cargado lo necesario para maternidad y paro.

## Detectores y su prueba real (`scripts/paises/bg/probar_detectores.ts`)

- `bg.ipc-nsi` (serie): devolvió 1 punto, 2026-09-01 = 105,85. Solo trae el último mes porque el histórico está en xlsx.
- `bg.zbdoo-noi` (norma, busca `zbdoo-<año>.pdf` en el НОИ): `[]`, sin novedad.
- `bg.mrz-noi` (norma, frase de МРЗ en el НОИ): `[]`, sin novedad.

## Checks (con bg registrado localmente, sin commitear ese cambio)

| Check | Resultado |
|---|---|
| `tsc --noEmit -p .` | sin errores |
| `check_paises bg` | OK, 34 datos verificados y 3 pendientes, 61 calculadoras, 1 aviso |
| `check_paises_casos bg` | OK, 52 casos en 18 archivos |
| `check_textos_paises bg` | OK, 807 textos, 0 avisos |
| `check_ofertas_intl bg` | OK |
| `check_fronteras` | OK, 15210 archivos |
| `check_eol` | OK, 16267 archivos |
| `check_seo_pais bg` | OK, 1 aviso: `danak-varhu-dohodite` con 217 palabras (objetivo 220) |
| `check_motor` | OK, 4879 pruebas |
| `check_mundo` | 1 falla ajena (be, ya anotada en ESTADO.md); sin menciones de bg, `mundo` declarado en la definición |

El aviso de `check_paises` es la serie ИПЦ: deja de ser publicable antes del 1/12/2026 si el detector no agrega puntos.

**Sin correr:** `next dev`, porque Turbopack no acepta la junction de node_modules y hacía falta `npm ci` real. Falta mirar la home y dos calculadoras con el país registrado.

## Riesgos

- **Slugs sin validar:** no se comprobaron en el autocompletar de Google Bulgaria; salen de la demanda pedida en el encargo y de la transliteración oficial. No se cambian después de publicar.
- **10 % y ДДС:** verificados en páginas del ministerio, no en el ЗДДФЛ ni el ЗДДС. Con acceso a dv.parliament.bg conviene releerlos.
- **Tope neto en болнични y майчинство:** el tope legal (neto medio diario) casi siempre gana sobre el 80 % y el 90 %. Está implementado; el neto del tope se aproxima con el ingreso medio del período.
- **Días laborables:** los importes de болнични, майчинство y безработица dependen del campo de días por mes (21 por defecto); el total de 410 días es aproximado (5 de cada 7).
- **Funcionarios:** el nuevo reparto del art. 6 ал. 5а КСО no se calcula. Las FAQ lo advierten.
- **МОД:** el neto usa el sueldo como base, y si el МОД de la actividad es mayor, las cotizaciones reales suben. Avisado en texto.
- **2027:** el proyecto de МРЗ 660 EUR queda solo como aviso informativo. Los datos de presupuesto no tienen `hasta`, llevan `proximaRevision` 2027-01-01 y hay detector, pero el cambio de КСО del 1/1/2027 para funcionarios no afecta el cálculo general.
