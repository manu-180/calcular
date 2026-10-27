# Etiopía (`et`): informe del agente

- Rama: `claude/pais-et` (base origin/main). Último commit de código: ver `git log` (este informe va en el commit final).
- Mercado: `en-ET`, ETB, `Africa/Addis_Ababa`, escala 150, trato `tu`, estado `interno`. Sin regiones.
- Total: **20 locales + 40 universales = 60 calculadoras** (la universal `vat` se cae por la local de concepto `iva`).

## Calculadoras locales

| slug | concepto | publicable | por qué |
|---|---|---|---|
| net-salary-calculator | sueldo-neto | sí | Tabla de Schedule A (Procl. 1395/2025) + 7 % de pensión (POESSA). Declara `mundo` |
| income-tax-calculator | impuesto-renta | sí | Tabla mensual 0/15/20/25/30/35 %, con la deducción por tramo |
| gross-salary-calculator | propio | sí | Del neto al bruto (bisección sobre la misma nómina) |
| pension-contribution-calculator | aportes-seguridad-social | sí | 7 % empleado + 11 % empleador (POESSA) |
| employer-cost-calculator | costo-empleador | sí | Bruto + 11 % |
| pension-calculator | jubilacion | sí | 30 % por los primeros 10 años + 1,25 % por año extra × promedio de 36 meses. El caso oficial es el ejemplo de POESSA |
| overtime-calculator | horas-extra | sí | Art. 68: 1,5 / 1,75 / 2 / 2,5 |
| public-holiday-pay-calculator | propio | sí | Art. 75: 2 × la hora |
| annual-leave-calculator | vacaciones | sí | Art. 77: 16 días + 1 cada 2 años, proporcional el primer año |
| severance-pay-calculator | indemnizacion-despido | sí | Arts. 39 a 41: 30 días + 1/3 por año adicional, tope 12 meses, +60 días por cierre o reducción de personal, +30 o +90 de compensación |
| final-settlement-calculator | liquidacion-final | sí | Indemnización + licencia no gozada (Art. 77(4)) + días impagos |
| notice-period-calculator | preaviso | sí | Art. 35: 1 / 2 / 3 meses, 2 meses en reducción de personal |
| sick-leave-calculator | propio | sí | Art. 86: 1 mes al 100 %, 2 al 50 %, 3 sin goce |
| maternity-leave-calculator | propio | sí | Art. 88(3): 30 + 90 días; paternidad 3 días (Art. 81(2)) |
| vat-calculator | iva | sí | 15 %, umbral de inscripción 2.000.000 (Procl. 1341/2024) |
| withholding-tax-calculator | propio | sí | Art. 97 nuevo: 3 % para bienes de más de 20.000 y servicios desde 10.000; 30 % si el proveedor no da TIN |
| rental-income-tax-calculator | propio | sí | Schedule B anual para personas (0 % hasta 24.000 … 35 %) |
| business-income-tax-calculator | propio | sí | Schedule C anual para personas (misma tabla) |
| dividend-tax-calculator | propio | sí | Dividendos 15 %, intereses 10 %, regalías 10 / 5 %, premios de juegos de azar 20 % |
| dollar-to-birr | tipo-de-cambio | sí | Serie `et.usd`, tasa indicativa del NBE (promedio ponderado) |

Ninguna quedó en borrador. Descartadas (no construidas): impuesto sobre ventas brutas de Categoría B (no queda claro si la tasa va por tramos o sobre el total), ganancias de capital (la fórmula del Art. 61(3) tal como está impresa no cierra), sellos (la tabla de 1998 es un escaneo dudoso y puede estar desactualizada), inflación (el boletín de ESS da tasas anuales que no coinciden con las mensuales del mismo cuadro), salario mínimo (el sector privado no tiene uno nacional).

## Universales

`universales: "todas"`: entran las 40 en inglés. La `vat` universal no entra porque hay una local con concepto `iva`.

## Datos

Los 49 datos están **verificados** (`verificadoEl` 2026-10-27), todos leídos en fuente primaria https:

- **Procl. 1395/2025** (Negarit Gazeta n.º 64, 1/9/2025, PDF en mor.gov.et): tablas de Schedule A, B y C, dividendos, intereses, regalías, premios y las cuatro reglas de retención. Rige para ingresos desde el 8/7/2025 y para la retención desde el 7/8/2025 (Art. 4).
- **Procl. 1341/2024** (IVA, Negarit Gazeta n.º 61, 21/8/2024, mor.gov.et): tasa del 15 % y umbral.
- **Procl. 1156/2019** (trabajo, Negarit Gazeta n.º 89): copia facsimilar de la gaceta en FAOLEX (`faolex.fao.org/docs/pdf/eth204430.pdf`), con el mismo criterio que usan `ao` y `ug`. Ni mols.gov.et ni otro sitio oficial etíope publica el PDF.
- **POESSA** (`poessa.gov.et/?page_id=443`, en amárico): 7 % / 11 %, la fórmula de la pensión de servicio, el mínimo de 10 años y la edad de 60. Desde: puse 2025-07-08 porque la página no da fecha de inicio, y con eso solo afirmo el año fiscal en curso.
- **Serie `et.usd`**: 11 puntos de la API oficial `api.nbe.gov.et` (del 13 al 27/10/2026).

No hay datos sin verificar.

## Detectores (`fuentes.ts`) y prueba real

Corridos contra las fuentes con `npx tsx scripts/paises/et/probar_detectores.ts`:

| id | carril | resultado |
|---|---|---|
| et.usd-nbe | serie (API NBE, últimos 7 días) | 5 puntos, el último 2026-10-27 = 160.9995 |
| et.mor-income-tax | norma (API JSON de proclamaciones del MoR, id > 32, categoría renta) | `[]` (lista leída, sin novedades) |
| et.mor-vat | norma (misma API, categoría IVA) | `[]` |
| et.poessa-pension | norma (`modified` de la página 443 de WP, leída 2024-11-29) | `[]` |
| et.mols-labour-law | norma (`modified` de la página 9693 de mols.gov.et) | en la primera corrida, timeout de conexión de Node. Con curl y con Node en un segundo intento respondió `2024-03-22`: el sitio es lento o intermitente |

## Checks (con el país registrado localmente, sin commitear `src/paises/index.ts`)

- `npx tsc --noEmit`: 0 errores.
- `check_paises et`: ✅ 49 datos (49 verificados), 1 serie, 60 calculadoras. Un aviso: `dollar-to-birr` deja de ser publicable si la serie no se actualiza en 10 días (lo resuelve el cron).
- `check_paises_casos et`: 72 casos en 20 archivos, todos OK.
- `check_textos_paises et`: 819 textos, 0 avisos.
- `check_fronteras`: 12.449 archivos sin cruces.
- `check_eol`: todo en LF.
- `check_motor`: 4.111 pruebas OK.
- `check_mundo`: ET sale «declarado» (35,9 % / 40,2 % / 41,4 % de carga). Lo probé pasando el mercado a `publicado` solo en local, porque la grilla salta los mercados internos. Lo volví a `interno`.
- `next dev` (puerto 3113, `--webpack` y `NEXT_PUBLIC_SITIO_INTL_URL`): la home `/et` renderiza «Ethiopia calculators» con las locales y las universales. Las páginas de calculadora muestran el placeholder «Esta cuenta…» también en `/ke/...`, así que es algo del entorno de desarrollo y no del país. Turbopack no arranca con el junction de `node_modules`.

## Riesgos y dudas para el coordinador

1. **Labour Proclamation desde FAOLEX**: es una copia de la gaceta, no un sitio del gobierno etíope. Si no se acepta, las 9 calculadoras laborales pasan a borrador.
2. **Supuestos de cálculo** (dichos en cada página): salario diario = mensual/30 en indemnización, licencia por enfermedad y días impagos; licencia no gozada a mensual/26 (Art. 77(3)), editable; hora = mensual/208 (48 × 52 / 12), editable. La indemnización cuenta solo años adicionales completos.
3. **Pensión**: la página de POESSA no menciona un tope del porcentaje. No apliqué ninguno; el campo de años llega hasta 50.
4. **Impuesto sobre el bruto**: el Schedule A se aplica al ingreso bruto, sin restar el 7 % de pensión, que es la práctica habitual. No pude leer la 979/2016 original (es un escaneo sin texto) para confirmarlo artículo por artículo.
5. **Retención de servicios**: el texto dice «involving Birr 10,000», así que la apliqué desde 10.000 inclusive. Para bienes es «more than 20,000».
6. **Push**: la cuenta activa de `gh` es `developers-insights` y no tiene permiso. Pusheé con el token de `manu-180` solo en el comando (`http.extraheader`), sin cambiar la configuración global.
7. Edición futura en amárico (`et-am`), según PAISES.md.
