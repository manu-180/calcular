# Informe del país bz (Belize), 2026-10-29

Rama `claude/pais-bz`. Inglés (en-BZ), trato tu, BZD, America/Belize, escala 2. Estado `interno`.

## Calculadoras

Locales publicables (12): `gst-calculator` (iva), `minimum-wage-calculator`, `social-security-calculator`,
`employer-cost-calculator`, `overtime-calculator`, `vacation-pay-calculator`, `sick-leave-pay-calculator` (propio),
`maternity-leave-calculator` (propio), `notice-pay-calculator`, `severance-pay-calculator`, `final-pay-calculator`,
`usd-to-bzd`.

Locales en borrador (2): `income-tax-calculator` y `net-salary-calculator`. Motivo: no se pudo leer el texto vigente
del impuesto a la renta (ver abajo). Por eso `sueldo-neto` no entra en `check_mundo`.

Universales: 40 (la de IVA cae porque hay GST local). Total en el registro: 54.

## Datos

Verificados (29 tramos, leídos el 2026-10-29 en fuente primaria):

| Dato | Fuente |
|---|---|
| GST tasa estándar 12,5 % | Belize Tax Service, Orientation Manual for Issuers of Electronic Tax Documents v1.3 (mayo 2026) |
| BZD fijo en 2 por USD | Central Bank of Belize, nota del 11/5/2026 |
| Salario mínimo BZ$5,00 por hora desde 1/1/2023 | Press Office del Gobierno, PR378/22 (S.I. 169 y 170 de 2022) |
| Horas, horas extra, vacaciones, enfermedad, maternidad, preaviso, severance | Labour Act Cap. 297, edición revisada 2020, alojada por el Ministerio de Trabajo |
| Aportes del Social Security Board: 13 bandas semanales, 10 %, tope 520, solo lesiones 2,60, vencimiento día 14 | SSB, cuadro vigente desde 4/4/2022 y página de contribuciones |

## No verificados

- `bz.income-tax-exemption` (29.000 anual): la Act No. 40 of 2024 no se pudo abrir (el sitio de la Asamblea Nacional
  devuelve error y bts.gov.bz carga solo en el navegador). Solo prensa y guías de terceros, que además discrepan sobre el
  alivio entre 29.001 y 32.000.
- `bz.income-tax-rate` (25 %): leído en la edición 2020 del Cap. 55 (art. 20), pero la Act 40/2024 deroga y reemplaza
  disposiciones, así que la tasa vigente no está confirmada.

## Para quien retome

- Cuando se pueda leer la Act 40/2024, cargar la exención y el alivio, pasar las dos calculadoras a `publicado`,
  escribir sus casos y contenido, y declarar `mundo` en el sueldo neto.
- Umbral de registro de GST y tasas de stamp duty: solo fuentes secundarias o ediciones anteriores a las enmiendas de
  2024, no se cargaron.
- La Labour Act leída es la edición con leyes al 31/12/2020. El Gobierno anunció una revisión integral; el detector de
  normas del SSB avisa de un cuadro nuevo, pero no hay detector para la Labour Act.
- Sección 183: el texto no dice cómo tratar un año completo que cruza el 1 de mayo de 2011. La calculadora lo cuenta a
  la tasa mayor y lo avisa en el resultado.
- La definición de «GST fraction» del manual del BTS dice 1/11, que no coincide con 12,5 %. Se usó la tasa que el mismo
  manual aplica en sus ejemplos y en el XML.
- Serie del banco central: no hay, el tipo es fijo (dato `bz.usd-peg`). Inflación: el Statistical Institute no respondió
  (HTTP 406), sin calculadora.
- `scripts/paises/bz/generar-datos.py` regenera `datos.json`.
