# Informe: Republica Moldova (`md`)

- Rama `claude/pais-md`. Commits: `2d30fedd`, `202e6c98`, `c4a358ce`, `c967ccf2` y el de este informe (es el último de la rama).
- Mercado `md`, rumano `ro-MD`, trato `usted` (dumneavoastră), MDL con símbolo «lei», `Europe/Chisinau`, escala 18, estado `interno`.
- 59 calculadoras: 19 locales (17 publicables y 2 en borrador) y 40 universales.

## Fuentes: lo que se pudo abrir y lo que no

- **legis.md, sfs.md, cnam.md y parlament.md** tienen un desafío anti-bot de Cloudflare. Fallan con curl, con WebFetch y con Chrome headless. Por eso no leí ningún código consolidado: ni el Codul fiscal, ni el Codul muncii, ni la Legea 489/1999.
- Lo que sí abrí:
  - el **Monitorul Oficial** (monitorul.gov.md, PDF de cada edición);
  - **CNAS** (cnas.gov.md);
  - **BNM** (XML diario);
  - **BNS** (PxWeb);
  - los **datos abiertos del SFS** (dataset.gov.md);
  - **particip.gov.md** (documento del Ministerio de Finanzas).

## Calculadoras locales

| slug | concepto | ¿publicable? | por qué |
|---|---|---|---|
| calculator-salariu-net | sueldo-neto | sí | Datos verificados, 6 casos. Declara `mundo`. |
| calculator-salariu-brut | propio | sí | Calcula del neto al bruto, rotundeado al ban. Considera el umbral de 360.000. |
| cost-total-angajator | costo-empleador | sí | Un caso reproduce la carga del 35,4 % que publica el MF. |
| salariul-minim | salario-minimo | sí | HG 771/2025 (y HG 846/2024 para 2025). |
| salariul-mediu-pe-economie | propio | sí | HG 773/2025 y HG 845/2024. |
| calculator-impozit-pe-venit | impuesto-renta | sí | Cálculo anual con escutiri y el umbral. |
| calculator-tva | iva | sí | 20 % y 8 %. Reemplaza la universal. |
| impozit-pe-dividende | propio | sí | 6 %. |
| curs-valutar-bnm | tipo-de-cambio | sí | Serie BNM de EUR, USD, RON, UAH y GBP. |
| calculator-inflatie | inflacion | sí | IPC de BNS (dic. 1993 = 100), desde 2000. |
| calculator-concediu-medical | propio | sí | CNAS: 60, 70, 90 o 100 %; empleador 75 %; tope de 5 salarios medios. |
| indemnizatie-de-maternitate | propio | sí | CNAS: 100 %, 126 o 140 días. |
| indemnizatie-crestere-copil | propio | sí | CNAS: tres opciones con sus mínimos. |
| indemnizatie-unica-la-nastere | propio | sí | CNAS: 21.886 lei y 1.000 lei por mes. |
| indemnizatie-de-somaj | propio | sí | CNAS: 40 %, durante 5, 7 o 9 meses. |
| varsta-de-pensionare | propio | sí | Tabla de CNAS 2023–2028. |
| polita-de-asigurare-medicala | propio | sí | Legea 321/2025: 12.636 y 2.527 lei. |
| calculator-concediu-de-odihna | vacaciones | **no (borrador)** | Los 28 días del Codul muncii no se pudieron leer en la fuente primaria. |
| calculator-ore-suplimentare | horas-extra | **no (borrador)** | El 150 / 200 % del Codul muncii no se pudo leer en la fuente primaria. |

## Universales

Entran las 40 con `universales: "todas"`. La de IVA no se suma porque la reemplaza `calculator-tva`, que es local. No hay slugs que choquen.

## Datos verificados (todos con `verificadoEl` 2026-10-26)

- **Monitorul Oficial:**
  - salariul minim 5.500 / 6.300 lei y por hora 32,54 / 37,28 lei, con 169 horas (HG 846/2024 y HG 771/2025);
  - salariul mediu 16.100 / 17.400 lei (HG 845/2024 y HG 773/2025);
  - prima medicală 9 % y sumas fijas de 12.636 y 2.527 lei (Legea 321/2025, art. 4);
  - escutiri 2025 (Legea 214/2024, art. 33 y 35): 29.700, 34.620, 9.900 y 21.780.
- **SFS en dataset.gov.md (archivo de 2026):** las mismas escutiri y el umbral de 360.000 lei.
- **Ministerio de Finanzas** (presentación «Politica fiscală 2027» en particip.gov.md, que describe la situación de 2026): impozit pe venit 12 %, CAS empleador 24 %, TVA 20 % y 8 %, dividendos 6 %.
- **CNAS:**
  - incapacidad temporal (ITM), tope de 5 salarios medios, maternidad, cuidado del hijo y monto mínimo de 740 lei, indemnización por cuidado de 1.000 lei, indemnización por nacimiento de 21.886 lei;
  - desempleo (șomaj): 40 % y 5, 7 o 9 meses;
  - edad de jubilación.
- **Series:** BNM (31 días hábiles, del 14/09 al 26/10/2026) y IPC de BNS (de enero de 2000 a septiembre de 2026).

## Datos no verificados

- `md.concediu-odihna` (28) y `md.ore-suplimentare` (150 / 200 %): el Codul muncii consolidado solo está en legis.md, que está bloqueado. Además hay un proyecto del Gobierno de 2026 que cambia el régimen de vacaciones.

## Detectores y su prueba

`scripts/paises/md/probar_detectores.ts` se corrió contra la red real:

- BNM: 5 detectores; cada uno trae el punto del 2026-10-27.
- IPC de BNS por POST: trae 321 puntos, el último de 2026-09.
- 4 detectores de norma en html (Monitorul Oficial: salario mínimo, salario medio y fondos AOAM; SFS: escutiri): 0 hallazgos.
  - El parser del Monitorul lee los títulos 2024, 2025 y 2026 y solo avisa si el año es mayor que 2026.
- 2 detectores de CNAS que comprueban que las sumas sigan en la página: 0 hallazgos.
- 2 detectores manuales (Codul fiscal y Codul muncii en legis.md).

## Checks

| check | resultado |
|---|---|
| `tsc --noEmit` | 0 errores |
| `check_paises md` | ✅ 29 datos (35 tramos verificados, 2 pendientes), 6 series, 59 calculadoras |
| `check_paises_casos md` | 68 casos en 17 archivos |
| `check_textos_paises md` | 801 textos, 0 avisos |
| `check_motor` (con md registrado localmente) | 3855 pruebas OK |
| `check_eol` | 12803 archivos en LF |
| `check_mundo` (con md en `publicado` solo localmente) | MD entra como «declarado»: 17,2 % / 19,9 % / 19,9 % |
| `check_fronteras` | 1 falla ajena a md: `src/motor/compartir/AlCelu.tsx` importa `uqr` (viene del commit `53e3b2f9`, que ya está en main) |

En `next dev` cargaron bien la home `/md`, `/md/calculator-salariu-net`, `/md/varsta-de-pensionare` y `/md/calculator-credit` (universal), y los marcadores se resolvieron.

## Riesgos y dudas para el coordinador

1. **12 %, 24 %, TVA y dividendos.** Se verificaron con un documento oficial del Ministerio de Finanzas que describe las cuotas vigentes, no con el texto del Codul fiscal ni de la Legea 489/1999. La cuenta cierra con la carga de 35,4 % que publica el MF. Conviene releerlos en legis.md desde una red sin bloqueo.
2. **Escutiri.** No incluí la escutire del cónyuge (soț/soție), porque el SFS la rotula «majoră» y no pude leer el art. 34. El umbral de 360.000 lei lo apliqué solo a la escutire personal, como dice la nota del SFS.
3. **El tope de la indemnización de desempleo** (salario medio del año anterior) no se aplica en el cálculo: solo se avisa en una observación. Las indemnizaciones de CNAS se muestran como monto mensual, sin prorratear por día.
4. **Las 2 calculadoras del Codul muncii** quedan en borrador hasta que se lean en legis.md.
5. **Entorno:**
   - El worktree no tenía el junction de `node_modules`. Lo creé apuntando a `calcular-nm` (no se instaló nada).
   - `next dev` con Turbopack rechaza el junction, así que usé `--webpack`.
   - Para ver calcularya hizo falta `NEXT_PUBLIC_SITIO_INTL_URL=http://calcularya.localhost:3103`.
6. No hay pedidos al motor.
