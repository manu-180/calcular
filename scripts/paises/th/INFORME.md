# Informe: Tailandia (`th`)

- Rama: `claude/pais-th`. El último commit es el que agrega este informe (antes: `717d4ef8`).
- Mercado `th`, `th-TH`, idioma `th`, trato `usted` (registro D13: sin คุณ/ท่าน, sin ครับ/ค่ะ), THB, `Asia/Bangkok`, escala 33, `estado: "interno"`.
- Total: **61 calculadoras**, de las cuales 20 son locales y 41 universales. Todas las locales están en `publicado`.

## Calculadoras locales

| slug | concepto | ¿publicable? | por qué |
|---|---|---|---|
| take-home-pay | sueldo-neto | sí | PIT (rd.go.th 59670, 59668), deducciones (RD, 28/1/2568), SSO 5 % con techo 17.500 (gaceta 142/81ก). Declara `mundo` |
| income-tax | impuesto-renta | sí | escala y deducciones de RD |
| social-security | aportes-seguridad-social | sí | reglamento de tasas 2565 (cuadro ข) y de piso/techo 2568 (ocs.go.th) |
| employer-cost | costo-empleador | sí | 5 % del empleador con el mismo techo |
| net-to-gross | propio | sí | inversa del sueldo neto (bisección) |
| bonus-tax | propio | sí | diferencia de PIT con y sin bono |
| freelance-tax | propio | sí | 40 (2), gasto 50 % con tope compartido, retención del 3 % |
| tax-deduction | propio | sí | topes de seguros, RMF, pensión e hipoteca (RD, 28/1/2568) |
| withholding-tax | retencion-honorarios | sí | ท.ป.4/2528 (rd.go.th 3479, act. 25/6/2026), mínimo de 1.000 (ข้อ 12/7) |
| corporate-income-tax | propio | sí | tasas PyME 0/15/20 y general 20 (guía CIT SME de RD) |
| inheritance-tax | propio | sí | 100 M exentos, 5 % / 10 % (rd.go.th 56662) |
| gift-tax | propio | sí | Código Tributario art. 42 (27) (28) y 48 (6) (7) (rd.go.th 5937, act. 21/10/2026) |
| specific-business-tax | propio | sí | 3 % + 10 % local o timbre 1/200 (rd.go.th 63775, 63777) |
| stamp-duty | propio | sí | tabla de instrumentos 1 a 5 (RD, 10/8/2561) |
| tax-surcharge | propio | sí | art. 27: 1,5 % por mes o fracción, tope igual al impuesto (rd.go.th 5943) |
| deposit-interest | plazo-fijo | sí | 15 % (rd.go.th 23286) y exención de 20.000 en caja de ahorro (rd.go.th 3187) |
| severance-pay | indemnizacion-despido | sí | Ley de Protección Laboral art. 118 (30 a 400 días) |
| notice-pay | preaviso | sí | art. 17 y 17/1 (surte efecto en el próximo día de pago, tope de 3 meses) |
| overtime-pay | horas-extra | sí | arts. 61 a 63 y 68 (1,5 / 1 o 2 / 3 veces; hora = sueldo ÷ 30 ÷ horas) |
| annual-leave | vacaciones | sí | arts. 30 y 67 (6 días mínimos, proporcional al despido, acumulados siempre) |

Quedaron fuera (sin borrador para no cargar datos de segunda mano):

- **Salario mínimo** (17 niveles por provincia). La Gaceta (ratchakitcha) devuelve 403 en `/DATA/PDF` y en la búsqueda, y mol.go.th está detrás de Incapsula. No hubo fuente primaria legible.
- **Beneficios del seguro social** (desempleo, pensión, maternidad). sso.go.th devuelve 404 o redirige en bucle, y el reglamento de vejez está en reforma (2026).
- **Impuesto anual del auto**: dlt.go.th no responde.
- **Retención de PIT por venta de inmueble**: la página de ejemplos de RD (63765) usa la escala anterior a 2560.
- **Exención de la indemnización** (300 días y 300.000 o 400 días y 600.000): RD solo publica el proyecto de 2567, no el reglamento final.
- **Tipo de cambio e IPC**: la API del BOT exige clave y no probé la del TPSO.

## Universales

Entran las 41 (`todas: true`). El IVA lleva el ajuste `th.vat` = 7 % (tramo 1/10/2026 a 30/9/2027): decreto 807 (gaceta 143/50ก, 6,3 % más el impuesto local) y comunicado de RD 18/2569. No excluí ninguna y no hay choques de slug: los slugs locales son términos en inglés según D13.

## Datos

Hay 49 datos con 51 tramos, **todos verificados el 2026-10-26** en fuente primaria https. No hay tramos `no-verificado`.

- **rd.go.th** (Departamento de Ingresos): escala PIT; gasto de 50 % con tope de 100.000; deducciones personal, cónyuge, hijos (30.000 y 60.000), padres y SSO (tope de 9.000); seguros, RMF, pensión, tope de grupo de 500.000 e hipoteca; retenciones y mínimo de 1.000; herencia; donaciones; interés del 15 % y exención de 20.000; CIT PyME; timbres; impuesto específico; recargo del art. 27; IVA.
- **ocs.go.th** (Consejo de Estado): tasas SSO 5 / 5 / 2,75 y piso y techo 1.650 / 17.500 (2569-2571), 20.000 (2572-2574) y 23.000 (2575 en adelante). Leído sobre las páginas de la gaceta renderizadas como imagen.
- **mol.go.th**: texto consolidado de la Ley de Protección Laboral (edición del Consejo de Estado, al día hasta la reforma n.º 7 de 2562), arts. 17, 17/1, 30, 61 a 63, 67, 68 y 118.

## Detectores (`fuentes.ts`) y su prueba

Hay 12 detectores, todos del carril norma:

- 8 leen la fecha «ปรับปรุงล่าสุด» de páginas de RD: escala, estructura, ท.ป.4, art. 27, art. 38 a 64, herencia, impuesto específico y timbre.
- 1 detecta un decreto de IVA con número mayor a 807 en «กฎหมายออกใหม่» de RD.
- 3 buscan normas nuevas en el índice de ocs.go.th (seguro social, ley laboral y Código Tributario).

Prueba real: `npx tsx scripts/paises/th/probar-detectores.ts`. Los 12 responden con 0 hallazgos (ninguno da null), con tiempos de 0,45 a 8,7 s.

## Checks (con `th` registrado localmente, sin commitear ese cambio)

| check | resultado |
|---|---|
| `tsc --noEmit` | OK |
| `check_paises th` | OK: 49 datos, 51 tramos verificados, 61 calculadoras |
| `check_paises_casos th` | OK: 68 casos en 20 archivos |
| `check_textos_paises th` | OK: 502 textos, 0 avisos |
| `check_fronteras` | **1 falla ajena**: `src/motor/compartir/AlCelu.tsx` importa `uqr` (commit 53e3b2f9 de main). Nada de `th` |
| `check_eol` | OK: 12.804 archivos en LF |
| `check_motor` | OK: 3.855 pruebas |
| `check_mundo` | OK. Con el mercado en `publicado` (prueba temporal, revertida): `TH declarado 5,0 % / 4,6 % / 14,5 %`. En `interno` no entra a la grilla, como los demás |

En `next dev` (puerto 3101) dieron 200 y renderizan en tailandés `/th`, `/th/take-home-pay`, `/th/severance-pay`, `/th/loan` y `/th/vat` (7 %).

## Riesgos y dudas para el coordinador

1. **Ley laboral consolidada a 2562.** No leí las reformas n.º 8 (2566) y n.º 9 (2568). Las noticias dicen que la n.º 9 cambia la licencia por maternidad (art. 41 y 59); no uso esos artículos, pero conviene confirmar que no tocaron los arts. 17, 30, 61 a 63, 67, 68 ni 118.
2. **Tope de la deducción SSO = 9.000.** Es la cifra de RD del 28/1/2568, del año fiscal 2567. Con el techo nuevo, el aporte llega a 10.500 por año y RD podría subir el tope; la calculadora lo avisa en una observación.
3. **Deducciones de seguros y RMF.** Salen de la lista de RD del 28/1/2568. SSF y Thai ESG quedaron fuera a propósito (dependen del año).
4. **`next dev`** necesita `--webpack` (Turbopack no acepta el junction de `node_modules`) y `NEXT_PUBLIC_SITIO_INTL_URL=http://calcularya.localhost:3101`.
5. **Pedidos al motor:** ninguno. Una nota: `check_textos` marca abreviaturas oficiales con punto de 3 letras (กบข., ปชส.). Las reemplacé por el nombre completo.
