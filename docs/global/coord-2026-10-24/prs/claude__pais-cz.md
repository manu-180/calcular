# Chequia (cz): 61 calculadoras en checo, publicado

Rama `claude/pais-cz` (último commit: `publicar cz`). **Depende de `claude/mundo-motor-cs`** (motor
checo sin mergear: idioma `cs`, D19, plurales, gramática del país, diccionario de venta y las 41
universales en checo). Se creó con `git checkout -b claude/pais-cz claude/mundo-motor-cs`; esa rama ya
incluía `origin/main` (`286ecb06`), así que no hizo falta merge. Hay que mergear primero el motor cs.

**Antes de publicar en producción hace falta la revisión de un hablante nativo de checo** sobre una
muestra de páginas (sueldo neto, OSVČ, mateřská, výpovědní doba y dos universales). Los textos están
escritos en vykání con «vy» en minúscula, imperativo cortés («zadejte», «spočítejte») y botones en
infinitivo según D19, con el vocabulario de Finanční správa, ČSSZ y MPSV, pero no los revisó una
persona checa.

## Qué incluye

- `src/paises/cz/**`: mercado `cz` (cs-CZ, `trato: "usted"`, CZK con 2 decimales, Europe/Prague,
  escala 22, nombre «Česko»), 46 datos con 80 tramos verificados (0 sin verificar), 6 series
  (kurzy ČNB de EUR, USD, GBP, CHF y PLN; IPC del ČSÚ), 3 avisos, 5 novedades y 15 detectores.
- 21 calculadoras locales, todas publicadas, con casos (100 en total) y contenido SEO propio (title,
  description, h1, 3 a 5 preguntas, glosario):

| slug | búsqueda en Chequia | concepto |
|---|---|---|
| vypocet-ciste-mzdy | výpočet čisté mzdy 2026, mzdová kalkulačka | sueldo-neto (entra en «Tu sueldo en el mundo») |
| naklady-zamestnavatele | náklady zaměstnavatele, superhrubá mzda | costo-empleador |
| minimalni-mzda | minimální mzda 2026 | salario-minimo |
| kalkulacka-dph | kalkulačka DPH, výpočet DPH 21 % | iva |
| pausalni-dan | paušální daň 2026 | regimen-simplificado |
| pausalni-vydaje | paušální výdaje, výpočet daně OSVČ | impuesto-renta |
| zalohy-osvc | zálohy OSVČ 2026 | aportes-seguridad-social |
| dohoda-o-provedeni-prace | DPP 2026, dohoda o provedení práce výpočet | propio |
| kalkulacka-nemocenske | kalkulačka nemocenské | propio |
| kalkulacka-materske | kalkulačka mateřské | propio |
| rodicovsky-prispevek | rodičovský příspěvek kalkulačka | propio |
| vypocet-dovolene | výpočet dovolené v hodinách | vacaciones |
| nahrada-mzdy-za-dovolenou | náhrada mzdy za dovolenou | propio |
| prumerny-vydelek | výpočet průměrného výdělku | propio |
| odstupne | výpočet odstupného | indemnizacion-despido |
| vypovedni-doba | výpovědní doba výpočet | preaviso |
| priplatek-za-prescas | příplatek za přesčas | horas-extra |
| kurzova-kalkulacka | kurzová kalkulačka ČNB | tipo-de-cambio |
| inflacni-kalkulacka | inflační kalkulačka | inflacion |
| urok-z-prodleni | úrok z prodlení kalkulačka | propio |
| duchodova-kalkulacka | důchodová kalkulačka 2026 | jubilacion |

- 40 universales en checo con `universales: "todas"`. La DPH es local (21 % y 12 %), así que la
  universal `iva` no se instancia; el slug `kalkulacka-dph` queda para la local.
- No se hicieron (como pedía el encargo): superhrubá mzda (no existe desde 2021) ni daň z nabytí
  nemovitosti (abolida). Daň z nemovitých věcí tampoco: depende de coeficientes municipales.
- Commit `publicar cz`: `estado: "publicado"`, import y alta al final de `PAISES`, cargadores generados
  (`cargadores/cz.ts`, `cargadores/mercados.ts`) y medición de mercados regenerada.
- `scripts/paises/cz/probar_detectores.ts`: corre los detectores contra la red real.

## Fuentes (todas primarias, leídas el 24/10/2026)

- Textos consolidados en zakonyprolidi.cz: zákon č. 586/1992 Sb. o daních z příjmů (§ 6 odst. 4, § 7
  odst. 7, § 7a, § 16, § 35ba, § 35c, § 35d, § 36, § 38h), zákoník práce 262/2006 Sb. (§ 51, § 67, § 75,
  § 93, § 111, § 114 a § 118, § 192, § 212, § 213, § 216, § 222, § 356, § 357), zákon 187/2006 Sb. o
  nemocenském pojištění (§ 17, § 21, § 29, § 32 a § 34, § 37), zákon 117/1995 Sb. (§ 30, rodičovský),
  zákon 152/2026 Sb. (rodičovský 400 000 Kč desde 2027), zákon 235/2004 Sb. o DPH (§ 37, § 47), zákon
  592/1992 Sb. (13,5 %), zákon 48/1997 Sb. (§ 9, un tercio el empleado), zákon 155/1995 Sb. (§ 15, § 16,
  § 34 y el redondeo de las výměry), NV 351/2013 Sb. (úrok z prodlení), sdělení MPSV 356/2025 y 171/2026 (minimální mzda 2026 y
  2027), 397/2025 y 185/2026 (redukční hranice 2026 y 2027).
- ČSSZ (cssz.gov.cz): přehled nejdůležitějších údajů 2026 (průměrná mzda 48 967 Kč, máx. VZ, DPP 12 000
  Kč, OSVČ, důchody), sazby pojistného, zálohy OSVČ y el aviso del cambio del 1. 7. 2026 (mínimo social
  del 40 % al 35 %: 5 005 Kč).
- VZP: mínimos de 2026 (3 306 Kč y 24 483,50 Kč para OSVČ, 3 024 Kč para empleados).
- Finanční správa: paušální daň 2026 por pásmo con su composición (9 162 Kč, retroactivo a enero).
- ČNB: archivo anual de kurzy (`rok.txt`) y la historia de la repo sazba (`vyvoj_repo_historie.txt`).
- ČSÚ: datos abiertos CEN0101E (índice de precios base 2015 = 100, de enero de 2015 a septiembre de 2026).
- MPSV (ppropo.mpsv.cz): ejemplo oficial de la výpovědní doba desde el 1. 6. 2025.

## Checks (corridos con cz registrado)

- `npx tsc --noEmit -p .`: sin errores.
- `check_paises cz`: TODO OK (46 datos, 80 tramos verificados, 0 pendientes, 6 series, 61
  calculadoras); 2 avisos esperables: kurzy e IPC dejan de publicarse si el cron no actualiza las series
  antes del 24/11.
- `check_paises_casos cz`: 100 casos en 21 archivos, todos OK.
- `check_textos_paises cz`: 1141 textos, 0 avisos.
- `check_fronteras`: 7754 archivos sin cruces. `check_eol`: OK.
- `check_motor --generar-cargadores`: 2351 pruebas OK. `check_medicion_mercados --escribir`: 57 mercados.
- `check_mundo`: cz entra declarado (12,6 / 22,4 / 26,8 %, 12 pagas).
- `check_seo_intl`: 7690 páginas intl OK.
- `check_ofertas_intl`: 15 fallas, todas de cl (UF), las conocidas de main; las 61 páginas de cz OK.
- `check_hreflang`: 1924 fallas, todas en el clúster de inflación (la falla conocida de main, arreglada
  en `claude/mundo-arreglos-2026-10-24`); cz suma 74 líneas, todas de `cz/inflacni-kalkulacka` en ese
  mismo clúster. Ninguna otra página de cz falla.
- `check-all`: 151/155 suites verdes. Fallan `check_hreflang` y `check_ofertas_intl` (lo anterior),
  `check_mes_en_render` (11 páginas de `src/app/(ar)` que leen el reloj al cargar el módulo, ajeno a cz)
  y `check_panel_sql` (18 fallas de grants en SQL, ajeno a cz).
- `scripts/paises/cz/probar_detectores.ts`: 15 detectores OK contra la red real.
- Build (`npm run build`) no corrido.

## Decisiones

- Las cuotas sociales, la salud y las zálohy se redondean hacia arriba (leyes 589/1992, 592/1992 y §
  38h); la parte del empleado de la salud es un tercio del total redondeado hacia arriba.
- El neto mensual no aplica el tope anual del vyměřovací základ (lo dice una observación).
- OSVČ anual: mínimo social del 35 % para todo 2026, como indica la ČSSZ; zálohy con dos tramos (5 720 Kč
  hasta junio, 5 005 Kč desde julio).
- Paušální daň: el pásmo más bajo al que se tiene derecho; la comparación con el régimen común supone
  actividad principal todo el año, sin hijos ni otros ingresos.
- Nemocenská y náhrada mzdy: el průměrný hodinový výdělek se estima desde la mzda mensual con el
  coeficiente 4,348 del § 356; el DVZ usa 12 meses / 365 días.
- Úrok z prodlení: lee los tramos de la repo sazba desde 2018 directamente de `datos.json` (como hace pl
  con la NBP), porque la tasa se fija en el primer día del semestre en que empezó el retraso.
- Výpovědní doba: el segundo ejemplo de la MPSV («jednoměsíční... 30. 12. 2025 skončí 28. 2. 2026»)
  parece una errata y no se usa como caso.
- Detector del IPC: baja el CSV completo de la sada CEN0101E (unos 67 MB) porque no hay una
  distribución filtrada; si pesa demasiado para el cron, conviene pasarlo a la API de DataStat.

## Pendientes y riesgos

- Revisión de un hablante nativo de checo (ver arriba).
- 2027: ya hay versiones futuras de la ley del impuesto a la renta (vuelven la sleva na studenta y el
  školkovné) y nuevos valores de průměrná mzda, tope del VZ, mínimos OSVČ y paušální daň. Los datos de
  2026 llevan `hasta: 2026-12-31` y `proximaRevision: 2027-01-01`: si nadie carga 2027, las calculadoras
  que dependen de ellos dejan de publicarse el 1 de enero (es el comportamiento buscado).
- Las series de kurzy (10 días) e IPC (75 días) vencen si el cron no corre (avisos de check_paises).
- Sin credenciales de Supabase, Vercel ni PayPal: no se probó nada que las necesite.
- No se miró en `next dev` (la junction de node_modules no sirve para Turbopack).

🤖 Generated with [Claude Code](https://claude.com/claude-code)
