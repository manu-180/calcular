# Informe Israel (`il`), 2026-10-26

- Rama: `claude/pais-il`, con origin/main mergeado (sin conflictos). Último commit de código: `86b99e92`. Este informe va en el commit siguiente.
- Mercado `il`, `he` / `he-IL`, ILS, `trato: "tu"`, `estado: "interno"`. RTL con el motor hebreo de main.
- Total: **67 calculadoras** = 27 locales + 40 universales.

## Calculadoras locales (27, todas `publicado`)

Todas son publicables: los datos que usan están verificados en fuente primaria y tienen casos que pasan. Las de esta sesión van en **negrita**. La ronda anterior había dejado 5 sin commitear; las commiteé en esta sesión, marcadas con *.

| slug | concepto | qué calcula |
|---|---|---|
| sachar-neto | sueldo-neto | sueldo neto 2026; declara `mundo` |
| bruto-neto | propio | de neto a bruto |
| mas-hachnasa | impuesto-renta | מס הכנסה por tramos, נקודות זיכוי, מס יסף |
| bituach-leumi | aportes-seguridad-social | ביטוח לאומי y מס בריאות del asalariado |
| alut-maasik | costo-empleador | costo para el empleador |
| sachar-minimum | salario-minimo | שכר מינימום |
| pitzuyei-piturim | indemnizacion-despido | פיצויי פיטורים y su exención |
| dmei-havraa | propio | דמי הבראה |
| yemei-chufsha | vacaciones | ימי חופשה |
| dmei-machala | propio | דמי מחלה |
| hodaa-mukdemet | preaviso | הודעה מוקדמת |
| shaot-nosafot | horas-extra | שעות נוספות |
| dmei-leida | propio | דמי לידה |
| dmei-avtala | propio | דמי אבטלה |
| kitzbat-yeladim | propio | קצבת ילדים |
| maam | iva | מע"מ 18 % (la universal `vat` se cae sola) |
| mas-rechisha | propio | מס רכישה (vivienda única y adicional) |
| hatzmada-lamadad | inflacion | indexación por la serie del מדד del BOI |
| shaar-chalifin | tipo-de-cambio | USD/EUR/GBP del BOI |
| tagmulei-miluim* | propio | תגמולי מילואים |
| dmei-pgia* | propio | דמי פגיעה |
| kitzbat-zikna* | jubilacion | קצבת אזרח ותיק |
| gil-prisha* | propio | גיל פרישה por sexo y fecha de nacimiento |
| bituach-leumi-atzmai* | propio | ביטוח לאומי del autónomo |
| **maanak-leida** | propio | מענק לידה (según el orden del hijo y si es parto múltiple) |
| **kitzbat-nechut** | propio | קצבת נכות כללית según el grado, más los suplementos por hijos y cónyuge |
| **bituach-leumi-lo-oved** | propio | ביטוח לאומי de quien no trabaja: mínimo y sobre ingresos que no son de trabajo |

## Universales

Entran las 40 con `universales: { todas: true }`. La única que se cae es `vat`, porque `maam` es local. No excluí ninguna a mano.

## Datos

- **50 datos, 51 tramos verificados, 0 sin verificar.** 34 tramos vienen de btl.gov.il y 17 de gov.il. Hay 4 series del BOI (USD, EUR, GBP y מדד).
- Los 6 datos nuevos de hoy (`il.maanak-leida`, `il.nechut-kitzba`, `il.nechut-yeled`, `il.nechut-zug`, `il.bl-lo-oved`, `il.bl-lo-oved-schumim`) los leí en las páginas del ביטוח לאומי, con `verificadoEl` 2026-10-26.
- No hay datos sin verificar.

## Detectores (15) y cómo los probé

- **Series del BOI** (`il.boi-usd`, `il.boi-eur`, `il.boi-gbp`, `il.boi-madad`): los corrí contra la red real. Cada uno trajo puntos y el último es USD 3,078 del 2026-10-26.
- **Páginas del BTL** (11 detectores de norma): los corrí contra la red real. Todos validan la página y devuelven `[]`, o sea sin fechas nuevas.
- Para los 3 nuevos (`il.btl-maanak-leida`, `il.btl-nechut`, `il.btl-lo-oved`) probé además con un Http falso:
  - un HTML con «01.01.2027» devuelve un hallazgo con esa fecha;
  - un HTML que no es la página devuelve `null`.

## Checks (corridos hoy, con `il` registrado localmente, sin commitear ese cambio)

| check | resultado |
|---|---|
| `tsc --noEmit` | 0 errores |
| `check_paises il` | ✅ 50 datos, 67 calculadoras. 2 avisos de frescura que no frenan: `il.madad` y las series de cambio, que actualizan los detectores |
| `check_paises_casos il` | TODO OK, 117 casos en 27 archivos |
| `check_textos_paises il` | TODO OK, 1346 textos, 0 avisos |
| `check_fronteras` | 1 falla **ajena**: `src/motor/compartir/AlCelu.tsx` importa `uqr` (viene de main, commit 53e3b2f9). En `src/paises/il` no hay nada |
| `check_eol` | OK, 12835 archivos en LF |
| `check_motor` | TODO OK, 3855 pruebas |
| `check_mundo` | TODO OK. `il` está en `interno` y la grilla solo mira producción, así que lo pasé a `publicado` en local (sin commitear): IL entra como `declarado` con 10,3 / 23,2 / 41,4 % |
| `next dev` (puerto 3103) | `/il`, `/il/maanak-leida`, `/il/kitzbat-nechut`, `/il/bituach-leumi-lo-oved` y `/il/mortgage`: todas 200, RTL y con los montos esperados |

## Riesgos y dudas para el coordinador

1. **gov.il bloquea la descarga desde acá** (403 con curl y con WebFetch). Por eso no pude volver a leer hoy los 17 tramos de gov.il, que quedaron con `verificadoEl` 2026-10-24 de la ronda anterior. Los nuevos los saqué todos de btl.gov.il. Mismo motivo por el que no hice מס שבח, מס על שכר דירה, קרן השתלמות ni נקודות זיכוי por perfil.
2. **`bituach-leumi-lo-oved`**: repliqué el ejemplo oficial del BTL. Primero se descuentan los 3.442 exentos y sobre el resto se aplica la tasa reducida hasta 7.703 y la normal hasta 51.910. Con 12.000 da 1.035,34, igual que el ejemplo. El tope de 51.910 lo aplico al ingreso ya sin la parte exenta, que es mi lectura del ejemplo. Los estudiantes (otro mínimo) y los cónyuges exentos van en una observación y no se calculan.
3. **`kitzbat-nechut`** no descuenta los ingresos del trabajo ni los que no son del trabajo; lo avisa en una observación. Tampoco aplica la regla de que con grado parcial y un sueldo de más de 2.891 corresponde el suplemento completo, porque la página no dice qué montos tendría.
4. **`next dev` con Turbopack no arranca en este worktree**: el `node_modules` es un junction que apunta fuera del filesystem root. Funcionó con `--webpack` y `NEXT_PUBLIC_SITIO_INTL_URL=http://calcularya.localhost:3103`.
5. `hatzmada-lamadad` y `shaar-chalifin` dejan de ser publicables si los detectores del BOI no corren: el מדד tiene 75 días de margen y el cambio 10.
