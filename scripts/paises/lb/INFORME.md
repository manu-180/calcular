# Líbano (lb): informe del agente

Fecha de lectura de todas las fuentes: 2026-11-01. Estado del mercado: `interno`, sin registrar.

## Calculadoras locales (15)

| Slug | Concepto | Publicable | Por qué |
|---|---|---|---|
| minimum-wage | salario-minimo | sí | Memorias CNSS 801 y 805 (decretos 699 y 887) |
| salary-tax-calculator | impuesto-renta | sí | Art. 31 y 58 ley de renta (Lebanese University) y Citizen Budget 2024 (MoF) |
| vat-calculator | iva | sí | Art. 25 ley 379 enmendada; aviso `cautela` por el 12 % sin ley |
| annual-leave-calculator | vacaciones | sí | Art. 39 y 41 ley del trabajo |
| overtime-calculator | horas-extra | sí | Art. 31, 33 y 36 |
| notice-period | preaviso | sí | Art. 50 c |
| dismissal-compensation | indemnizacion-despido | sí | Art. 50 a y b |
| end-of-service-calculator | fondo-cesantia | sí | Art. 50 a 52 ley del seguro social (texto CNSS al 31/8/2026) |
| inflation-calculator | inflacion | sí | Comunicado CAS de septiembre 2026 |
| sick-leave-calculator | propio | sí | Art. 40 a 42 |
| family-allowance-calculator | propio | sí | Memoria CNSS 831 (decreto 2923) |
| salary-calculator | sueldo-neto | no, borrador | Falta la tasa del decreto de aportes |
| nssf-contributions | aportes-seguridad-social | no, borrador | Igual |
| employee-cost-calculator | costo-empleador | no, borrador | Igual |
| lbp-usd-converter | tipo-de-cambio | no, borrador | bdl.gov.lb responde 403 |

Universales: `todas`. La de IVA se cae sola por la local del mismo concepto. No hay `mundo` hasta que salga el borrador de sueldo neto.

## Datos no verificados

- `lb.nssf-rates`: el art. 71 remite a un decreto que no se leyó (ni en cnss.gov.lb ni en el Diario Oficial). Valores de pista, no llegan a ninguna página.
- `lb.usd-rate`: bdl.gov.lb da 403 y no se eludió. El 89.500 del Citizen Budget 2026 es una estimación presupuestaria, no el cambio oficial.

## Fuentes y bloqueos

- labor.gov.lb y bdl.gov.lb: 403 con cliente normal. No se insistió con User-Agent de navegador ni con otras vías.
- finance.gov.lb, cnss.gov.lb, cas.gov.lb, pcm.gov.lb y legallaw.ul.edu.lb: leídos.
- Los PDF de CNSS se alojan en Google Drive, enlazados desde cnss.gov.lb. Los escaneados se leyeron como imagen, no por OCR automático.
- La ley del trabajo y la de renta se leyeron en el Centro de Informática Jurídica de la Universidad Libanesa (universidad pública, texto con sus enmiendas). Se tomó como texto de ley; ver riesgos.

## Decisiones

- `monedas: ["LBP"]` aunque PAISES.md nombra también USD: el encargo pide LBP, y sin cambio verificado no hay cómo mostrar dólares.
- `redondeo` sin decimales.
- IVA 11 %: la página de MoF `Tax-Rate.aspx` sigue diciendo 10 % (texto original de 2001). Se usó el art. 25 enmendado por la ley 64/2017. `desde` 2018-01-01 sale del propio artículo: rige desde el trimestre siguiente al de publicación.
- Art. 50 c, año 6 justo: el árabe lo deja suelto; la versión francesa de la misma ley dice «de six à douze ans», así que van 3 meses.
- `desde` de art. 40 (1974) y art. 50 (1975): el texto da solo el año de la reforma, se usó el 1 de enero y lo dice la `nota`. No se muestran con `#desde`.
- Horas extra: el recargo de 50 % está en el art. 33 (casos de urgencia). La ley no define el divisor mensual a hora: 48 h × 52 semanas, dicho en la página.
- Tanzil con los dos cónyuges trabajando: cada uno toma lo del soltero y los hijos a medias (art. 31).

## Detectores

Probados contra las fuentes reales con `scripts/paises/lb/probar_detectores.ts`.

- `lb.cas-cpi` (serie): devolvió 2026-09-01 = 17,53.
- `lb.cnss-memos` (norma): 0 hallazgos con la última memoria 852. Con el corte en 800 sí encuentra memorias, para confirmar que el patrón lee la tabla.
- `lb.mof-budget` (norma): 0 hallazgos mientras la última ley sea la de 2026.

## Checks (con lb registrado localmente)

`tsc --noEmit` sin errores; `check_paises lb` OK; `check_paises_casos lb` 39 casos en 11 archivos; `check_textos_paises lb` 528 textos, 0 avisos; `check_ofertas_intl lb` OK; `check_fronteras` OK; `check_eol` OK; `check_seo_pais lb` OK con 8 avisos de palabras por debajo del objetivo de 220 (138 a 213, mínimo 90 cumplido); `check_motor` 5889 pruebas.

No se miró en `next dev`: la junction de node_modules no lo admite y un `npm ci` no se justificó para este frente.

## Riesgos

- Slugs en inglés según D10, sin verificar en Google del país: el buscador disponible no consulta el autocompletar libanés.
- Una búsqueda de texto en Citizen Budget 2025 y 2026 no encontró cambios a los tramos de 2024, pero no se leyeron enteros y la ley de presupuesto 2026 completa tampoco (`Pdf-Preview` no sirve el PDF a un cliente simple). El detector vigila la ley siguiente.
- Prensa de febrero de 2026 dice que el aumento de IVA al 12 % sigue pendiente; la decisión de gabinete sí está leída en pcm.gov.lb. Falta un dato primario de que no salió la ley: por eso el aviso y el campo de tasa manual.
- Universidad Libanesa como fuente primaria: es un organismo público pero no el Diario Oficial. Si el coordinador no lo acepta, 7 calculadoras pasan a borrador o a depender solo de MoF: salary-tax (los tramos también están en MoF), vat, annual-leave, overtime, notice, dismissal, sick-leave.
- Tramo `lb.end-of-service` con `desde` 2026-08-31 (fecha de la compilación CNSS leída), no la fecha histórica de la norma.
- Ley 319/2023: el régimen de pensiones reemplazará el end-of-service cuando se dicten sus decretos. Hay aviso `cautela`. Las tasas del anexo 3 de esa ley no se cargaron porque no rigen aún.
