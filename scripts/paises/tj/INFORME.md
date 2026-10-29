# Tayikistán (`tj`): informe del agente

- Rama: `claude/pais-tj` (base `origin/main`).
- Mercado: `tj`, ruso (`ru-TJ`), TJS, `Asia/Dushanbe`, `estado: "interno"`, escala 10. `src/paises/index.ts` no se commitea.
- Total: **51 calculadoras** = 11 locales + 40 universales (`universales: "todas"`). La universal de IVA no entra: pide un dato de tasa verificado que no existe.

## Bloqueo de fuentes

Los sitios oficiales de Tayikistán no abrieron desde esta sesión: andoz.tj, ncz.tj, adlia.tj, mmk.tj, mehnat.tj (503 o sin respuesta del proxy). Solo abrieron nbt.tj, stat.tj, customs.tj y president.tj (portada vacía). Por eso **ningún texto de ley (Código Tributario, Código de Trabajo, salario mínimo) se leyó en fuente primaria**. Todo lo que depende de esas normas es `no-verificado` y su calculadora está en `borrador`.

## Calculadoras locales

| Slug | Concepto | Estado | Base |
|---|---|---|---|
| kurs-valyut | tipo-de-cambio | publicado, con detectores | nbt.tj, ficha de cursos oficial (USD, EUR, RUB, CNY, KZT) |
| kalkulyator-zarplaty | sueldo-neto (declara `mundo`) | borrador | tasas y vichet sin leer |
| podokhodnyy-nalog | impuesto-renta | borrador | ídem |
| sotsialnyy-nalog | aportes-seguridad-social | borrador | ídem |
| nalogi-rabotodatelya | costo-empleador | borrador | ídem |
| kalkulyator-nds | iva | borrador | 14 % en 2026 y 13 % desde 2027 solo en Reanda y Asia-Plus |
| minimalnaya-zarplata | salario-minimo | borrador | 1000 TJS (desde 01.09.2025) y 1300 TJS (desde 01.09.2026) solo en WageIndicator |
| otpusknye | vacaciones | borrador | 24 días, resumen de WageIndicator |
| sverkhurochnye | horas-extra | borrador | 40 h, x2 y 120 h/año, resumen de WageIndicator |
| vykhodnoe-posobie | indemnizacion-despido | borrador | resumen de WageIndicator |
| srok-preduprezhdeniya | preaviso | borrador | resumen de WageIndicator |

Mínimo de 8 locales cumplido, pero solo 1 es publicable. No se llegó a 15-25 porque sin acceso a la ley no se puede publicar nada de nómina o impuestos.

## Datos

- **Verificados: 5 series** (USD, EUR, RUB, CNY, KZT), leídas el 2026-10-29 en `https://nbt.tj/ru/kurs/kurs.php` y su exportación por fecha (`export_xml_dynamic.php`), 59 puntos diarios cada una (01.09 a 29.10.2026). El tenge viene por 10 unidades y se guarda por unidad.
- **No verificados: 14 tramos en 12 datos**, todos con el motivo «el sitio oficial no abrió» y, cuando existe, una fuente secundaria como pista:
  - IVA (14 % y 13 %), tasa del impuesto a la renta (12 %), contribuciones del empleador (25 % estatales, 20 % resto) y del empleado (1 % y 2 %): Reanda y Asia-Plus.
  - Deducción personal: **sin valor**, no apareció en ninguna fuente.
  - Salario mínimo, vacaciones, jornada, horas extra, indemnización y preaviso: WageIndicator, que resume el Código de Trabajo de 2016.
- La fila de PAISES.md decía «НДС 14 % (verificar)». Dos fuentes secundarias coinciden en 14 % para 2026 con baja a 13 % en 2027, pero no se leyó el artículo 264 del Código Tributario: sigue sin verificar.
- Datos vistos y descartados: IPC (stat.tj publica el anual, «103,5 % en 2025», sin serie mensual accesible), tasa de refinanciación (7,00 % desde el 02.02.2026, nbt.tj; no se usó), salario medio de mayo de 2026 (3304,05 TJS, stat.tj; no se usó).

## Detectores

5 de tipo de cambio (`api-xml`) sobre el RSS de nbt.tj (`/ru/kurs/rss.php`; `export_xml.php` sin fecha da error). `npx tsx scripts/paises/tj/probar-detectores.ts` corrido hoy: USD 9,2174, EUR 10,2562, RUB 0,1142, CNY 1,383, KZT 0,02017, todos con fecha 2026-10-29. No hay detectores de normas: no hay un lugar oficial legible que vigilar.

## Checks (corridos con `tj` registrado localmente)

- `tsc --noEmit`: sin errores.
- `check_paises tj`: OK, 12 datos, 5 series, 51 calculadoras. 1 aviso: `kurs-valyut` deja de ser publicable el 2026-11-28 si los detectores no corren.
- `check_paises_casos tj`: 5 casos en 1 archivo, OK.
- `check_textos_paises tj`: 319 textos, 0 avisos.
- `check_seo_pais tj`: OK, 0 avisos.
- `check_fronteras`, `check_eol`, `check_mundo`: OK.
- `check_motor`: 4595 OK y 1 falla (`forint`), que ya falla en main.

## Para completar el país (pedido al coordinador)

1. Con acceso a ncz.tj o andoz.tj: leer arts. 183 (renta), 264 (IVA) y 332 (contribuciones) del Código Tributario, la deducción personal y los regímenes simplificados, y el Código de Trabajo (arts. 28 a 51, 91 a 101, 154, 169). Pasar los tramos a `verificado`, dar de alta casos y contenido completo (FAQ, ejemplo, glosario) y cambiar los 10 borradores a `publicado`.
2. Hacer el calculador de inflación con la serie mensual de IPC de stat.tj (solo se vio el dato anual).
3. Los contenidos de los borradores son mínimos a propósito: no citan cifras no verificadas.
4. Supuestos de fórmula en borrador a revisar: la base del impuesto es salario menos deducción (no resta el aporte del empleado), y los plazos de preaviso en meses se pasan a días (30 por mes).
