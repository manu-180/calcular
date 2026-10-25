# Ucrania (ua): calcularya.com en ucraniano, 22 calculadoras locales + 40 universales

**Depende de `claude/mundo-motor-uk`** (motor ucraniano sin mergear: idioma `uk`, plurales, gramática del país, universales y diccionario de venta en ucraniano). Mergear primero esa rama.

## Qué incluye

- `src/paises/ua/`: mercado (`ua`, `UA`, `uk`, `uk-UA`, trato `usted` según ADR 0002 D15, UAH, Europe/Kyiv, escala 40 de PAISES.md, nombre «Україна»), 28 datos con vigencia (81 tramos, todos verificados), 5 series (курси НБУ USD/EUR/PLN/GBP e índice de precios de Держстат vía НБУ), 4 avisos, 3 novedades, 8 detectores.
- 22 calculadoras locales (slugs transliterados según la resolución 55/2010):
  - Sueldo: `kalkuliator-zarplaty` (sueldo-neto, entra a «Tu sueldo en el mundo»), `zarplata-na-ruky` (neto → bruto), `vytraty-robotodavtsia` (costo-empleador), `minimalna-zarplata`.
  - ФОП: `kalkuliator-fop` (1, 2 y 3 група, regimen-simplificado), `yesv-dlia-fop` (aportes-seguridad-social).
  - Impuestos: `kalkuliator-pdv` (20/14/7 %, reemplaza a la universal iva), `kalkuliator-pdfo` (impuesto-renta: alquiler, dividendos 5/9 %, intereses, premios, ingresos del exterior), `podatok-na-depozyt` (plazo-fijo), `podatok-z-prodazhu-neruhomosti`, `podatok-z-prodazhu-avto`.
  - Trabajo: `rozrakhunok-vidpusknykh` (vacaciones), `kompensatsiia-vidpustky`, `likarniani`, `dekretni`, `ponadnormovi` (horas-extra), `vykhidna-dopomoha` (indemnizacion-despido).
  - Dinero y deudas: `kurs-valiut-nbu` (tipo-de-cambio), `indeks-infliatsii` (inflacion), `try-vidsotky-richnykh` (3 % річних e inflación, art. 625 ЦКУ), `kalkuliator-peni` (multa hasta el doble de la облікова ставка), `kalkuliator-alimentiv` (pension-alimentos).
- 40 universales en ucraniano con una línea (`universales: "todas"`; la iva universal se cae por la local).
- Commit `publicar ua`: `estado: "publicado"`, alta al final de `PAISES`, cargadores y medición regenerados.

## Fuentes (todas primarias, leídas el 24/10/2026)

`zakon.rada.gov.ua`, `ukrstat.gov.ua` y `data.rada.gov.ua` no responden desde fuera de Ucrania (timeout por geobloqueo) y `tax.gov.ua` da 403 a clientes sin navegador. Se verificó en:
- ЗІР de la ДПС (`zir.tax.gov.ua`): tablas de tasas de ПДФО, військовий збір, ЄСВ, ПДВ, єдиний податок y límites, salario mínimo 2025/2026 (8000/8647 y 48/52 por hora), прожитковий мінімум, податкова соціальна пільга; respuestas de la base de conocimiento (base máxima de ЄСВ 20 МЗП en 2025 y 2026 por art. 32 de la ley 4695-IX; ВЗ sobre depósitos, alquiler y ventas de bienes; ПДФО sobre вихідна допомога; декретні sin impuestos).
- `tax.gov.ua` (en navegador): ley 4835-IX del 07.04.2026 (ВЗ hasta el 31/12 del tercer año después del fin del воєнний стан), ley 2464-VI del ЄСВ, excepción de ЄСВ para ФОП desde 01.10.2025, tasas de ПДФО y casos de declaración.
- ПФУ: tasas de лікарняні por estaje, fórmula con 30,44 días y los dos ejemplos oficiales, 5 días a cargo del empleador, декретні 126/140/180 días al 100 %.
- Мінекономіки: compensación de vacaciones (dos ejemplos oficiales; los feriados no se excluyen durante el воєнний стан), 24 días de vacaciones en воєнний стан.
- Держпраці: horas extra al doble (art. 106 КЗпП), indemnización por despido (art. 44 КЗпП, 20/01/2026).
- Верховний Суд: 3 % річних y deflación (КЦС 751/4086/24, 16/04/2026), regla de 15 días (ОП КГС 910/9374/21), multa en el doble de la облікова ставка con caso oficial reproducido (ОП КГС 922/3578/18: 20 935,59 грн).
- Мін'юст vía sitio judicial oficial: mínimo de alimentos 50 % del ПМ (1408,50 y 1756 грн en 2026) y fracciones 1/4, 1/3 y 1/2.
- API del НБУ: cambios oficiales, облікова ставка desde 2015 (48 tramos, hoy 16 % desde el 18/09/2026) e IPC mensual de Держстат desde 2010.

Datos no verificados: ninguno. Calculadoras en borrador: ninguna.

## Decisiones

- Escala 40 tal como dice PAISES.md, aunque el USD oficial está en 45,05.
- Sin campo de оціночна вартість en ventas de inmuebles y autos: no encontré la regla de base mínima en fuente primaria accesible.
- Мінімум de декретні pasado a día con 30,44 (el mismo divisor que el ПФУ usa para el máximo); queda dicho en la página.
- 3 % річних y multa: días divididos por los días del año calendario (365 o 366). El caso oficial de 2018 se reproduce exacto.
- IPC: el campo `dt` del НБУ es el mes siguiente al de referencia (verificado contra 2022 = 126,6 %, 2023 = 105,1 %, 2024 = 112,0 %). La serie guarda el índice encadenado (12/2009 = 100) con 8 decimales para que 101,7 % dé exacto.
- Detectores de normas: NBU (облікова ставка) y «Останні зміни в законодавстві» del ЗІР filtrado por palabras clave, porque zakon.rada no es alcanzable desde los runners.

## Checks (con ua registrado, commit `publicar ua`)

- `npx tsc --noEmit -p .`: sin errores.
- `check_paises ua`: OK (28 datos, 81 tramos verificados, 0 pendientes, 5 series, 62 calculadoras). 3 avisos esperables: las series de cambio e IPC vencen si el cron no las actualiza antes del 24/11. `check_paises` de todos: 60 países OK.
- `check_paises_casos ua`: 99 casos en 22 archivos OK (todos: 5062 casos en 1285 archivos).
- `check_textos_paises ua`: 1129 textos, 0 avisos (todos: 65 325, 0 avisos).
- `check_fronteras`: 7757 archivos OK. `check_eol`: OK.
- `check_motor --generar-cargadores`: 2352 pruebas OK. `check_medicion_mercados --escribir`: 57 mercados.
- `check_seo_intl`: 7692 páginas intl OK.
- `check_mundo`: OK; Ucrania entra con `ua.kalkuliator-zarplaty` (23 % de cuña fiscal, plana).
- `check_universales`: 41 universales, 4497 casos OK. `check_calendario`: OK.
- `check_ofertas_intl`: 15 fallas, las mismas 15 de cl (UF) conocidas en main; ninguna de ua.
- `check_hreflang`: 1978 fallas, todas del clúster de inflación (0 fuera de él); 86 tocan `ua/indeks-infliatsii` porque ua se suma a ese clúster. Es el error conocido de main que arregla `claude/mundo-arreglos-2026-10-24`.
- `check-all`: 151/155 verdes. Fallan check_hreflang y check_ofertas_intl (arriba), check_mes_en_render (las mismas 11 evaluaciones en la base `claude/mundo-motor-uk`, ajeno) y check_panel_sql (necesita Supabase, sin credenciales).
- Detectores probados contra las fuentes reales (`scripts/paises/ua/probar-detectores.ts`): los 4 cambios NBU, el IPC (202 puntos, igual a series.json), la облікова ставка y las dos lecturas del ЗІР responden bien.

## Pendientes y riesgos

- **Revisión de un hablante nativo de ucraniano** de todos los textos (contenido, etiquetas, observaciones, avisos y novedades). Los escribí con el vocabulario de ДПС, ПФУ y Дія, pero no los revisó nadie de allá.
- Re-verificar en `zakon.rada.gov.ua` desde una IP de Ucrania (o con VPN) los artículos del ПКУ, КЗпП, ЦКУ y СКУ citados vía ДПС, ПФУ y tribunales.
- La ley del presupuesto 2027 cambiará salario mínimo, ПМ, base máxima de ЄСВ y ПСП a partir del 01/01/2027 (todos con `proximaRevision`).
- La serie de cambios vence a los 10 días y el IPC a los 75: dependen del cron `datos-paises`.
- No miré las páginas en `next dev` (Turbopack rechaza la junction de node_modules y no hice `npm ci` real).
- Sin credenciales: no se probó nada de Supabase, Vercel ni PayPal.

🤖 Generated with [Claude Code](https://claude.com/claude-code)
