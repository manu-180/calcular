# País: Kazajistán (kz) en ruso, 22 calculadoras locales y 40 universales

Depende de `claude/mundo-motor-ru` (motor ruso, ADR 0002 D17), sin mergear todavía: esta rama sale
de ella (`git checkout -b claude/pais-kz claude/mundo-motor-ru`). `origin/main` ya estaba incluido en
el motor ruso (sin merge extra).

## Qué incluye

- `src/paises/kz/`: mercado (`kz`, `KZ`, `ru`, `ru-KZ`, `trato: "usted"` por D17, KZT, `Asia/Almaty`,
  escala 500, «Казахстан»), 45 datos con 48 tramos verificados (0 pendientes), 5 series, 3 avisos,
  4 novedades, 11 detectores y 22 calculadoras locales con casos y contenido SEO propio.
- Las 41 universales en ruso entran con `universales: "todas"`; la de НДС se cae sola porque hay
  `kalkulyator-nds` local (mismo concepto), así que entran 40. Total del país: 62.
- Commit aparte `publicar kz`: `estado: "publicado"`, alta al final de `PAISES`, cargadores generados
  (`cargadores/kz.ts`, `mercados.ts`) y `mercados-registro.ts`. Va a chocar con otras ramas en esos
  archivos: se resuelve regenerando.

### Calculadoras locales (todas publicables)

| slug | concepto | qué hace |
|---|---|---|
| kalkulyator-zarplaty | sueldo-neto | ОПВ, ВОСМС, ИПН 10/15 % acumulado con базовый вычет 30 МРП, mes a mes (entra a «Tu sueldo en el mundo») |
| zarplata-na-ruki | propio | bruto desde el neto |
| nalogi-rabotodatelya | costo-empleador | ОПВР, СО, ООСМС y соцналог 6 % |
| kalkulyator-ipn | impuesto-renta | escalas del art. 363 (sueldo, ИП, dividendos, práctica privada) |
| mrp-v-tenge | conversor-unidad | МРП ↔ tenge, МЗП y mínimo de subsistencia |
| minimalnaya-zarplata | salario-minimo | МЗП proporcional y mínimo por hora |
| kalkulyator-nds | iva | 16 %, 5 % (medicamentos 2026, 10 % en 2027) y 10 % prensa |
| uproshchennaya-deklaratsiya | regimen-simplificado | 4 % ±50 % del маслихат, límite 600 000 МРП |
| vznosy-ip-za-sebya | aportes-seguridad-social | ОПВ, СО, ВОСМС y соцналог del ИП |
| otpusknye | vacaciones | por días hábiles (Reglas únicas del salario medio) |
| raschet-pri-uvolnenii | liquidacion-final | vacaciones no gozadas + compensación art. 131 |
| sverkhurochnye | horas-extra | ≥ 1,5 y límites del art. 78 |
| bolnichnye | propio | licencia por enfermedad con tope 25 МРП/mes |
| dekretnye | propio | prestación ГФСС por maternidad (СМД × días / 30 − ОПВ) |
| posobie-po-ukhodu-za-rebenkom | propio | 40 % del СМД de 24 meses, tope y mínimo |
| posobie-na-rozhdenie | propio | 38 / 63 МРП |
| nalog-na-imushchestvo | propio | escala del art. 602 |
| transportnyy-nalog | propio | turismos por cilindrada (art. 565), recargo 7 ₸/cm³, coeficientes por edad |
| kurs-valyut | tipo-de-cambio | USD, EUR, RUB, CNY del Нацбанк |
| kalkulyator-inflyatsii | inflacion | ИПЦ del Buró encadenado (dic. 2007 = 100) |
| pensionnye-nakopleniya | jubilacion | ОПВ + ОПВР con rendimiento elegido |
| kalkulyator-depozita | plazo-fijo | interés y garantía del КФГД |

## Fuentes y cómo se leyeron

- adilet.zan.kz no abre desde esta máquina (conexión rechazada). Los textos se leyeron así:
  - Ley de presupuesto 2026-2028 (МРП 4325, МЗП 85 000, mínimo de subsistencia 50 851): texto ИЗПИ
    en el portal gov.kz (API de documentos, página del КГД), citado con la URL de gov.kz.
  - Código Tributario 2025 (K2500000214): copia de web.archive.org de adilet del 1/9/2026, cruzada
    con el texto ИЗПИ en gov.kz; Código Social y Código Laboral: copias del 10/6/2026; ley de ОСМС:
    copia del 17/5/2026; Reglas únicas del salario medio (V1500012533): copia del 26/11/2025. Se cita
    la URL de adilet y la fecha de la redacción va en `fuente.nota`. **Riesgo:** cambios posteriores a
    esas fechas no se vieron (la orden 908 tuvo una modificación el 28/5/2026 que no se pudo leer).
  - ENPF (ОПВ, ОПВР 3,5/4,5/5 %), Нацбанк (RSS de cursos), stat.gov.kz (tablas dinámicas del ИПЦ),
    kdif.kz (límites de garantía): leídos directo.
- gfss.kz y fms.kz no resuelven desde aquí: los datos de ГФСС y ОСМС salen del Código Social y de la
  ley de ОСМС.

## Checks

- `npx tsc --noEmit -p .`: OK.
- `check_paises kz`: OK (45 datos, 48 tramos verificados, 62 calculadoras, publicado). Avisos: las
  series de cursos e ИПЦ vencen antes del 24/11 si el cron no corre.
- `check_paises_casos kz`: 79 casos en 22 archivos, OK.
- `check_textos_paises kz`: 1065 textos, 0 avisos.
- `check_fronteras`: OK (7753 archivos). `check_eol`: OK.
- `check_motor --generar-cargadores`: 2355 pruebas OK. `check_medicion_mercados --escribir`: 57 mercados.
- `check_mundo`: KZ entra declarado (15,4 / 19,2 / 19,7 %).
- `check_seo_intl`: 7692 páginas intl revisadas en los dos modos, OK.
- `check_ofertas_intl`: 15 fallas, todas de cl (UF, conocidas de main y arregladas en
  `claude/mundo-arreglos-2026-10-24`); kz sin fallas y con ofertas por concepto.
- `check_hreflang`: 1924 fallas, todas del clúster de inflación (conocido de main, arreglado en
  `claude/mundo-arreglos-2026-10-24`). Las 74 líneas con kz son de `kz/kalkulyator-inflyatsii`
  dentro de ese mismo clúster: kz entra al clúster y suma pares, no hay fallas propias fuera de él.
- `check-all`: 151/155 suites verdes. Fallan check_hreflang y check_ofertas_intl (lo de arriba),
  check_mes_en_render (11 páginas de `src/app/(ar)` que leen el reloj a nivel de módulo, ajeno) y
  check_panel_sql (tablas `ca_sueldos_*` sin RLS en el chequeo, ajeno). Ninguna toca `src/paises/kz`.
- `npm run build`: no se corrió (opcional; con junction de node_modules).

## Decisiones

- Trato `usted` con «вы» minúscula (D17); sin «ё»; nombres de organismos sin letras kazajas
  («Адилет», no «Әділет»), porque las reglas del ruso las rechazan.
- СО del empleado sobre (bruto − ОПВ) por el art. 245 del Código Social (redacción 2026); СО del ИП
  sobre el ingreso declarado sin restar ОПВ (art. 245 p. 2). Соцналог 6 % sobre (bruto − ОПВ − ВОСМС),
  mínimo 14 МРП, sin restar СО (arts. 556-558 del nuevo código).
- Vacaciones, baja por enfermedad y liquidación por días hábiles según las Reglas únicas: la persona
  escribe los días hábiles del período (por defecto 247 y 20) porque el calendario de feriados no
  está en el motor.
- Mínimo de la prestación por cuidado (art. 85 p. 2, «с дополнительным исчислением ОПВ»): se toma el
  beneficio del presupuesto como neto y el bruto = beneficio / 0,9; la página avisa que el monto lo
  fija el ГФСС.
- Pensiones: se usa la ОПВР del año en curso para todo el horizonte (el motor da solo el valor
  vigente); la observación avisa que sube en 2027 y 2028.
- ИП: no se suma ОПВР por cuenta propia (no quedó claro en el Código Social si aplica al ИП en su
  favor).
- Detector del ИПЦ: continúa la serie con el ИПЦ interanual de la página de precios del Buró
  (índice de hace 12 meses × interanual). Detectores de normas: fecha de actualización en la API de
  gov.kz por código de adilet.

## Pendientes y riesgos

- **Revisión de un hablante nativo de ruso (Kazajistán)** de todos los textos: pendiente.
- Leer las normas en adilet directamente (desde Kazajistán o con otra salida) para confirmar que no
  hubo cambios después de las fechas de las copias.
- МРП y МЗП 2027: los tramos vencen el 31/12/2026; hay que cargar la ley de presupuesto 2027-2029
  cuando salga (sin eso, todas las calculadoras que usan МРП o МЗП dejan de publicarse el 1/1/2027).
- Edición `kz-kk` en kazajo cuando exista el motor kazajo (D17).
- `next dev` no se miró: la junction de node_modules no sirve para Turbopack y no se hizo `npm ci`.
- Sin credenciales (Supabase, Vercel, PayPal): nada que saltear en este frente.

🤖 Generated with [Claude Code](https://claude.com/claude-code)
