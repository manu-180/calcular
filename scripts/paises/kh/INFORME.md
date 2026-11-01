# Informe: Camboya (`kh`)

- Rama `claude/pais-kh`. **Depende de `claude/mundo-motor-km`** (sin mergear): sin ese motor no existe el idioma `km`.
- Mercado `kh`, `km-KH`, idioma `km`, trato `usted` (registro D38), KHR y USD, `Asia/Phnom_Penh`, escala 4000, riel sin decimales, `estado: "interno"`. Nombre «កម្ពុជា» escrito a mano.
- 65 calculadoras: 25 locales (22 publicables, 3 borradores) y 40 universales (`universales: "todas"`; la universal `vat` cae porque `vat-calculator` es local del mismo concepto).

## Calculadoras locales

| slug | concepto | publicable | por qué |
|---|---|---|---|
| salary-tax | impuesto-renta | sí | anukret 48 (leído en imagen), ejemplos oficiales GDT |
| bonus-tax | propio | sí | la misma escala, diferencia con y sin bono. No hay bono anual obligatorio leído en la norma: calcula el impuesto, no un derecho |
| fringe-benefit-tax | propio | sí | 20 % GDT |
| minimum-wage | salario-minimo | sí | prakas 214/25 (MLVT, leído en imagen). Solo textil, confección, calzado y artículos de viaje. Rige hasta 31/12/2026 |
| overtime-pay | horas-extra | sí | prakas 112/25, arts. 5, 9 y 13 |
| annual-leave | vacaciones | sí | Ley laboral, arts. 166 a 168 (traducción inglesa en cdc.gov.kh) |
| notice-period | preaviso | sí | Ley laboral, arts. 73, 75 y 77 |
| severance-pay | indemnizacion-despido | sí | arts. 89 y 91 según la reforma de 2018 (MLVT), art. 73, prakas 443 |
| seniority-pay | bono-semestral | sí | prakas 443, art. 2: 7,5 días en junio y en diciembre |
| vat-calculator | iva | sí | GDT y FAQ (art. 64): 10 % y 0 % |
| tax-on-income | propio | sí | anukret 48 art. 4; tasas 20 y 30 de GDT |
| prepayment-tax | propio | sí | 1 % mensual y mínimo 1 % de GDT |
| property-tax | propio | sí | caso oficial GDT: 406.880 |
| transfer-tax | propio | sí | caso oficial GDT: 9.408.000 |
| rental-tax | propio | sí | 10 % y umbral 500.000 de GDT |
| unused-land-tax | propio | sí | caso oficial GDT: 12.000.000 |
| patent-tax | propio | sí | montos de GDT; la página no da los límites de cada categoría y eso se dice en la FAQ |
| withholding-tax | retencion-honorarios | sí | FAQ GDT (arts. 25 y 26, prakas 578) |
| specific-tax | propio | sí | FAQ GDT. La persona carga la base |
| accommodation-tax | propio | sí | 2 % de GDT |
| exchange-rate | tipo-de-cambio | sí | tabla oficial de GDT, que cita a la NBC como emisor |
| inflation | inflacion | sí | CPI de NIS (Table 2, Phnom Penh), 21 meses |
| net-salary | sueldo-neto | **no** | requiere NSSF |
| nssf-contribution | aportes-seguridad-social | **no** | requiere NSSF |
| employer-cost | costo-empleador | **no** | requiere NSSF |

Sin `net-salary` publicado, Camboya queda fuera de «Tu sueldo en el mundo». `salary-tax` muestra el sueldo después del impuesto y avisa que falta NSSF.

## Datos

46 datos y 2 series, 41 tramos verificados el 2026-11-01.

**No verificados (6 tramos):**
- `kh.nssf-pension-employee`, `-employer`, `-health-employer`, `-risk-employer`, `-wage-ceiling`: nssf.gov.kh rechaza el pedido; el compendio de MLVT (244 MB) respondió 500. Los valores son pistas de guías privadas de nómina. Un extracto de buscador mostró un PDF de nssf.gov.kh: no cuenta como lectura y no se usó.
- `kh.min-wage` desde 2027-01-01 (212 USD): solo prensa; MLVT no lista el prakas de 2027.

**Decisiones sobre fuentes bloqueadas (ninguna eludida; pedidos comunes, sin cabeceras falsas):**
- minimumwage.gov.kh da 403. El salario mínimo se leyó en el prakas firmado que publica el propio MLVT, emisor de la norma.
- nbc.gov.kh da 403. El tipo de cambio se leyó en la tabla pública de tax.gov.kh, con el filtro normal de su formulario (`for_year`, `for_month`). La tabla pone «ធនាគារជាតិ» como emisor. **Para revisar por el coordinador:** se tomó como publicación oficial propia de la GDT y no como rodeo; si prefiere otro criterio, alcanza con pasar `exchange-rate` a borrador.
- mef.gov.kh da 403: no hizo falta.

**Sobre lectura:** las normas en PDF escaneado se renderizaron a imagen y se leyeron a ojo (anukret 48, prakas 214/25, 112/25 y 443, reformas 2018 y 2021). Las páginas `/kh/article` de GDT se leyeron con WebFetch, cuyo modelo resume: los tramos de sueldo se cotejaron con el anukret y el IVA, el impuesto a la propiedad y los específicos con el texto crudo de la FAQ. Las tasas de retención se confirmaron con una segunda lectura, pero **no** en el HTML crudo (ahí están en cifras jemeres).

**Fechas `desde`:** en las páginas de GDT sin norma citada, `desde` es la fecha de la página (31/3/2020 y parecidas) o la de la ley de 2023. No es necesariamente el inicio de vigencia.

**Base legal de 1997:** arts. 73 a 79, 137 y 166 a 168 salen de la traducción de cdc.gov.kh. El texto jemer de MLVT está escaneado y no se cotejó artículo por artículo. Las reformas de 2018 y 2021 no tocan esos artículos según sus títulos leídos.

## Supuestos visibles

La norma no fija el valor del día ni de la hora. El día es sueldo ÷ días trabajados (campo, 26 por defecto). La hora es sueldo × 12 ÷ 52 ÷ horas semanales. La calculadora lo aclara. El art. 91 da una suma estimada: la fija el trabajador o un tribunal y no descuenta lo ya cobrado.

## Detectores (probados con `scripts/paises/kh/probar-detectores.ts`, TODOS RESPONDEN)

| id | resultado real |
|---|---|
| kh.usd-gdt | 19 puntos de octubre (el 1/11 no hay filas: lee el mes anterior) |
| kh.gdt-sub-decree | 0 hallazgos |
| kh.mlvt-min-wage | 0 hallazgos |
| kh.nis-cpi | 0 hallazgos. Avisa, no carga: la NIS publica `.xls`, que hay que leer a mano |

## Checks

`tsc --noEmit -p .` sin errores. `check_paises kh` OK, 46 datos, 65 calculadoras. `check_paises_casos kh` 55 casos en 22 archivos. `check_textos_paises kh` 501 textos, 0 avisos. `check_seo_pais kh` OK, 20 avisos (por debajo del objetivo de 220 palabras, mínimo 130, todas sobre 90). `check_ofertas_intl` OK. `check_fronteras` OK. `check_eol` OK. `check_motor` 5953 pruebas OK. `check_mundo`: 1 falla ajena (`be`, ya anotada en D38).

## Riesgos y pendientes

- **Sin revisión de hablante nativo.** Los términos legales salen de las fuentes, pero el jemer no lo revisó nadie que lo hable. Conviene revisarlo antes de publicar.
- **No se miró en navegador:** `next dev` exige `npm ci` real en el worktree y no se corrió. Falta ver la home, una local y una universal, y el corte de línea del jemer.
- **SEO:** no pude confirmar autocompletar de Google Camboya: el buscador disponible es de EE. UU. Los slugs siguen D38 (inglés). Los títulos usan el vocabulario de GDT y MLVT y lo pedido en el encargo. «ប្រាក់បៀវត្ស» es la forma oficial; la variante «បៀវត្សរ៍» aparece en la intro de `salary-tax`.
- **Salario mínimo:** el tramo vence el 31/12/2026. Si para entonces no se carga el prakas de 2027, `minimum-wage` deja de ser publicable (correcto, y lo avisa el detector).
- **Series:** `kh.usd` vence a los 10 días y `kh.cpi` a los 70. Sin cron o carga manual, `exchange-rate` e `inflation` salen de lo publicable antes del 2/12/2026.
- La ley de 1997 en traducción puede diferir en matices del original jemer.
