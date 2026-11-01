# Sri Lanka (lk): informe del agente

- Rama: `claude/pais-lk` (base origin/main). Mercado `interno`, inglés `en-LK`, trato `tu`, LKR con símbolo `Rs.`, escala 300.
- 20 calculadoras locales (18 publicables, 2 borrador) + 40 universales (todas menos `vat`, que reemplaza la local) = 60 en el registro, 58 publicables.

## Calculadoras locales

| slug | concepto | publicable | por qué |
|---|---|---|---|
| salary-calculator | sueldo-neto | sí | APIT Tabla 1 + EPF 8 %. Declara `mundo` (12 pagas) |
| gross-salary-calculator | propio | sí | neto a bruto, mismos datos |
| apit-calculator | impuesto-renta | sí | Tablas 1 (residentes) y 4.1 (no residentes no ciudadanos) del IRD 2025/26 |
| income-tax-calculator | propio | sí | escala anual (Act No. 2 de 2025) y alivio de Rs. 1.800.000 |
| freelancer-tax-calculator | propio | sí | ingresos en divisas remitidos por banco, tope 15 % (First Schedule 1(6)) |
| bonus-tax-calculator | propio | sí | Tabla 2 del IRD (pagos globales), probada contra su fórmula |
| gratuity-tax-calculator | propio | sí | escala de beneficios de retiro + retención del 12 % sobre Rs. 5M (Tabla 3) |
| epf-etf-calculator | aportes-seguridad-social | sí | EPF 8/12 (CBSL), ETF 3 % (ETF Board) |
| epf-withdrawal-calculator | propio | sí | retiro del 30 % (máx. Rs. 2M) según la página del CBSL |
| employer-cost-calculator | costo-empleador | sí | EPF 12 % + ETF 3 % |
| minimum-wage | salario-minimo | sí | Rs. 30.000 / Rs. 1.200 desde 1/1/2026 (Department of Labour) |
| vat-calculator | iva | sí | 18 % desde 1/1/2024, umbrales de registro |
| sscl-calculator | propio | sí | 2,5 % sobre la parte sujeta por actividad, umbrales |
| capital-gains-tax-calculator | propio | sí | 10 % hasta 2/6/2026, 15 % desde 3/6/2026 (Act No. 11 de 2026) |
| withholding-tax-calculator | propio | sí | AIT: intereses 10 %, dividendos 15 %, alquiler 10 % sobre Rs. 100.000/mes |
| fixed-deposit-calculator | plazo-fijo | sí | interés simple con retención del 10 % |
| stamp-duty-calculator | propio | sí | lease, hire purchase, hipoteca, pagaré, seguro, tarjeta en el exterior |
| dollar-rate | tipo-de-cambio | sí | serie diaria USD/LKR del CBSL con detector |
| gratuity-calculator | propio | no (borrador) | Payment of Gratuity Act sin fuente oficial legible |
| overtime-calculator | horas-extra | no (borrador) | Shop and Office Employees Act sin fuente oficial legible |

## Datos

Verificados el 2026-10-26 (35 datos, todos con fuente primaria https):
- IRD: Tabla APIT 1, 2, 3 y 4 (PDF 2025-2026), Inland Revenue (Amendment) Act No. 2 de 2025 y No. 11 de 2026, texto consolidado del Inland Revenue Act (hasta 31/3/2025), páginas de Income Tax, VAT, SSCL y Stamp Duty.
- CBSL: página del EPF (aportes mínimos y retiro del 30 %), serie USD/LKR indicativa (puntos 13 a 26/10/2026).
- ETF Board: aviso 2026 de pago electrónico (3 %).
- Department of Labour: aviso sobre la National Minimum Wage of Workers (Amendment) Act No. 11 de 2025.

No verificados (4 tramos, calculadoras en borrador):
- `lk.gratuity-months-per-year` (0,5), `lk.gratuity-min-years` (5), `lk.overtime-factor` (1,5), `lk.overtime-monthly-divisor` (240). Motivo: no se pudo leer la ley en fuente oficial. labourdept.gov.lk devuelve páginas vacías (solo sirven sus PDF de wp-content), lawnet.gov.lk tiene un certificado de otro host, documents.gov.lk corta el TLS y most.gov.lk no responde. Valores vistos solo en guías de nómina.

Fechas `desde` inciertas: EPF, ETF y timbre no traen fecha de inicio en su fuente; se cargó un `desde` conservador (2024-01-01) que no se muestra en ninguna página (nota en la fuente del timbre).

## Detectores (fuentes.ts) y prueba

`npx tsx scripts/paises/lk/probar_detectores.ts` contra las fuentes reales: los 8 responden y parsean (sin novedad).
- `lk.usd-cbsl` (serie): texto plano semanal del gráfico del CBSL; banda 200 a 500, salto 5 %. La búsqueda por fechas del CBSL solo acepta POST de formulario.
- `lk.ird-apit-tables`: carpeta de un año posterior a 2025-2026.
- `lk.ird-income-tax-acts`: toda Inland Revenue (Amendment) Act posterior a la No. 11 de 2026.
- `lk.ird-vat`: tasa con fecha posterior a 2024 o cambio del umbral de Rs. 60M.
- `lk.ird-sscl`, `lk.ird-stamp-duty`, `lk.cbsl-epf`, `lk.cbsl-epf-withdrawal`: el texto con la tasa leída deja de aparecer.
- Sin detector: salario mínimo (las páginas del Department of Labour salen vacías) y ETF.

## Checks (con lk registrado localmente, sin commitear index.ts)

- `tsc --noEmit`: sin errores.
- `check_paises lk`: OK, 35 datos, 60 calculadoras. Aviso: `dollar-rate` deja de publicarse si la serie no se actualiza en 10 días (lo hace el cron).
- `check_paises_casos lk`: 63 casos en 18 archivos OK.
- `check_textos_paises lk`: 771 textos, 0 avisos.
- `check_fronteras`: 1 falla ajena a lk (`src/motor/compartir/AlCelu.tsx` importa `uqr`, viene de main, commit 53e3b2f9).
- `check_eol`: 12.806 archivos en LF.
- `check_motor`: 3.855 pruebas OK.
- `check_mundo`: OK. Con lk en `interno` no entra a la grilla (solo cuentan los publicados); pasándolo a `publicado` en local entra como «declarado» con 8,0 % / 16,6 % / 34,7 % de tasa efectiva a 15k/50k/150k.
- `next dev` (puerto 3103, con `--webpack` y `NEXT_PUBLIC_SITIO_INTL_URL`): `/lk`, `/lk/salary-calculator`, `/lk/apit-calculator` y `/lk/loan` en 200, marcadores resueltos.

## Riesgos y dudas para el coordinador

1. Freelancers: el 1(6) dice «taxed at the maximum rate of 15%». Lo interpretamos como la escala normal con cada tramo topeado al 15 % y solo para ese ingreso (sin mezclar con sueldo local). Conviene una mirada legal.
2. Ganancias de capital: el 15 % rige desde la certificación del Act No. 11 de 2026 (3/6/2026), porque su sección 36 no está en la tabla de fechas de la sección 1(3).
3. APIT Tabla 1: el IRD redondea los límites (233.333, 316.667, 358.333). Las cuotas fijas cargadas reproducen su fórmula exacta (tasa × sueldo − alivio).
4. `next dev` con Turbopack no arranca en este worktree porque `node_modules` es un junction fuera de la raíz; con `--webpack` funciona.
5. Faltan por fuente: gratificación (Gratuity Act), horas extra, vacaciones, maternidad e indemnización TEWA. Con acceso a lawnet o documents.gov.lk se pueden verificar y publicar los dos borradores.
6. Ediciones futuras en cingalés y tamil (PAISES.md).
