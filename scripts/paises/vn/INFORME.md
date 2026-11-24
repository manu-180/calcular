# Informe de Việt Nam (vn)

Rama `claude/pais-vn`, creada desde `origin/claude/mundo-motor-vi`. **Depende de `claude/mundo-motor-vi`** (motor vietnamita, ADR 0002 D37): hay que integrar esa rama antes. `estado: "interno"`, sin registrar en `src/paises/index.ts`.

Registro contrastado el 1/11/2026: Techcombank usa «bạn» en su portada («Chào mừng bạn đến với Techcombank»); Vietcombank escribe sin pronombre, con imperativo cortés («Vui lòng nhập»). eTax (thuedientu.gdt.gov.vn) rechaza la conexión. Se mantiene lo de D37: «bạn», frases cortas, sin «quý khách». El botón «Tính» es del motor; ninguna de las dos webs abiertas mostró una calculadora para contrastarlo.

## Calculadoras: 22 locales + 40 universales = 62

Todas las locales son publicables hoy: sus datos están verificados y tienen casos. Universales: `todas`, salvo que el concepto `iva` lo cubre la local.

| Slug | Concepto | Publicable | Notas |
|---|---|---|---|
| tinh-luong-gross-net | sueldo-neto | sí | declara `mundo` |
| tinh-luong-net-sang-gross | propio | sí | inversa por mitades, tolerancia 1 đồng en casos |
| tinh-thue-tncn | impuesto-renta | sí | mes o año |
| tinh-giam-tru-gia-canh | propio | sí | |
| tinh-bao-hiem-xa-hoi | aportes-seguridad-social | sí | |
| tinh-chi-phi-luong-doanh-nghiep | costo-empleador | sí | usa 0,5 % TNLĐ; el 0,3 % queda en texto |
| luong-toi-thieu-vung | salario-minimo | sí | 4 regiones |
| tinh-bao-hiem-that-nghiep | propio | sí | |
| tinh-tro-cap-thoi-viec | propio | sí | |
| tinh-tro-cap-mat-viec | indemnizacion-despido | sí | |
| tinh-tien-thai-san | propio | sí | no valida el requisito de cotización (Điều 50) |
| tinh-luong-huu | jubilacion | sí | la persona ingresa el promedio; no ajusta jubilación anticipada |
| tinh-bhxh-mot-lan | propio | sí | la persona ingresa el promedio; sin coeficiente de ajuste |
| tinh-tien-lam-them-gio | horas-extra | sí | noche 200/210/270/390 % (Điều 57 NĐ 145) |
| tinh-phep-nam | vacaciones | sí | |
| thoi-han-bao-truoc-nghi-viec | preaviso | sí | |
| tinh-thue-gtgt | iva | sí | 8 % hasta 31/12/2026; 10 % desde 1/1/2027 |
| tinh-thue-ho-kinh-doanh | regimen-simplificado | sí | |
| tinh-thue-cho-thue-nha | propio | sí | no descuenta el 30 % (ver riesgos) |
| tinh-le-phi-truoc-ba | propio | sí | |
| ty-gia-usd-vnd | tipo-de-cambio | sí | serie diaria SBV |
| tinh-lam-phat | inflacion | sí | proyección, no índice encadenado |

## Datos

78 datos con 87 tramos verificados y 4 series, 0 pendientes, leídos el 1/11/2026 en vanban.chinhphu.vn (PDF oficiales escaneados, página a página), sbv.gov.vn y nso.gov.vn.

**No verificados: ninguno cargado.** Lo que no se pudo leer o se dejó afuera:

- gdt.gov.vn y thuedientu.gdt.gov.vn: conexión rechazada. baohiemxahoi.gov.vn: conexión cortada. Sin eludir. Sus datos salen de leyes y decretos en vanban.chinhphu.vn.
- IPC de años anteriores: solo se leyó septiembre de 2026, por eso `tinh-lam-phat` proyecta y no actualiza desde un año pasado.
- Salario mínimo 2027: es un proyecto (el Bộ Tư pháp lo está revisando). Va como aviso sin números, no como tramo.
- Decreto 398/2026/NĐ-CP (reglamenta el 30 %): leído en la copia del portal del Gobierno, no en PDF. No aporta ningún número cargado; el 30 % sale del PDF de NQ 43/2026/QH16.

Puntos de reforma confirmados en el texto oficial: biểu thuế de 5 tramos (Luật 109/2025/QH15, Điều 9) rige para sueldos desde el período 2026 (khoản 2 Điều 29); deducción 15,5 y 6,2 millones (NQ 110/2025/UBTVQH15); umbral del hộ kinh doanh subió a 1 tỷ (NĐ 141/2026, vigente desde 1/1/2026, tras Luật 09/2026/QH16); 30 % menos de TNCN 2026-2027 hasta 10 tỷ de ingresos (NQ 43/2026/QH16).

## Detectores (prueba real con `scripts/paises/vn/probar_detectores.ts` y el cliente del cron)

- `vn.usd-sbv`: 1 punto, 31/10/2026 = 25637. Corre con el User-Agent propio del cron. `curl` con el suyo recibe 403; no se usó User-Agent de navegador.
- `vn.cpi-nam-nso`, `vn.cpi-thang-nso`, `vn.cpi-binh-quan-nso`: 1 punto cada uno, 9/2026 = 5,08, 0,62 y 4,52.
- 8 detectores de norma sobre la portada de vanban.chinhphu.vn (salario mínimo, lương cơ sở, TNCN, GTGT, hộ kinh doanh, seguros, trước bạ, laboral): 0 hallazgos, que es lo esperado porque filtran por docid mayor a 220134. El parseo de filas se probó contra la portada real. Solo miran las últimas 50 publicaciones: si el cron corre poco, una norma puede salir de la lista.

## Checks (con el país registrado localmente, sin commitear ese cambio)

- `tsc --noEmit -p .`: sin errores.
- `check_paises vn`: OK, 78 datos, 87 tramos, 0 pendientes, 4 series, 62 calculadoras, 2 avisos (series que dejan de ser publicables si el cron no las actualiza antes del 2/12/2026).
- `check_paises_casos vn`: OK, 83 casos en 22 archivos.
- `check_textos_paises vn`: OK, 1121 textos, 0 avisos.
- `check_ofertas_intl vn`: OK.
- `check_seo_pais vn`: OK, 0 avisos.
- `check_fronteras`: OK, 16515 archivos. `check_eol`: OK, 17521 archivos.
- `check_motor`: OK, 5425 pruebas. `check_calendario`: OK.
- `check_mundo`: 1 falla, solo `be` (neto), la misma que ESTADO.md ya anotaba como ajena a este frente. `vn` no aparece como falla ni como excluido.

No se miró en `next dev`: el brief común no lo pide en su lista y exige `npm ci` real por Turbopack.

## Decisiones y riesgos

- Slug `tinh-thue-gtgt` es igual al de la universal: la local tiene el mismo concepto y la universal cae sola (check_paises no marca choque).
- Mức tham chiếu = lương cơ sở 2.530.000 desde 1/7/2026 (khoản 13 Điều 141 Luật 41/2024 + NĐ 161/2026). Solo se cargó ese tramo: los casos usan fecha desde julio de 2026.
- BHYT se cargó como 1,5 % y 3 % (un tercio y dos tercios del 4,5 % del NĐ 188/2025), con la cuenta en la nota de la fuente.
- Piso de cotización (mức tham chiếu) no aplicado: a jornada completa el mínimo regional ya es mayor.
- GTGT del hộ para «nội dung số» y «cho thuê tài sản»: se usa el grupo «dịch vụ» 5 % por inferencia del khoản 2 Điều 11; la lista fina está en una circular del Bộ Tài chính que no se leyó. Riesgo bajo, a revisar si se lee esa circular.
- GTGT 5 % en alquiler: mismo grupo «dịch vụ»; el portal del Gobierno lo repite, pero no se leyó en circular.
- El 30 % de NQ 43/2026 no se descuenta en alquiler: el texto dice «thu nhập từ kinh doanh» y el decreto no nombra el alquiler. Decisión prudente: observación que manda a preguntar a la oficina de impuestos.
- Serie `vn.usd` con `maxAntiguedadDias` 14 y CPI con 70: dependen del cron de datos.
- Sin pedidos al motor.
