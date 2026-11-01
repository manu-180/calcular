# Eslovaquia (sk): informe del país

Rama `claude/pais-sk`. **Depende de `claude/mundo-motor-sk`** (idioma `sk`, D25): se creó desde ese motor sin
mergear, así que hay que integrar el motor antes o junto con el país. Estado `interno`; `src/paises/index.ts` no se
commiteó. Fecha de lectura de todas las fuentes: 1/11/2026.

## Calculadoras locales (25)

| slug | concepto | publicable | nota |
|---|---|---|---|
| vypocet-cistej-mzdy | sueldo-neto | sí | Entra a «mundo» con `mundo` declarado |
| hruba-mzda-z-cistej | propio | sí | Bisección; da la bruta mínima en céntimos |
| celkova-cena-prace | costo-empleador | sí | Accidente sin tope |
| minimalna-mzda | salario-minimo | sí | Con los 6 stupne de § 120 |
| odvody-szco | aportes-seguridad-social | sí | Mínimo, osobitný y máximo 2026 |
| pausalne-vydavky | regimen-simplificado | sí | 60 %, tope 20 000 |
| dan-z-prijmov | impuesto-renta | sí | 15 % y franjas 19/25/30/35 |
| kalkulacka-dph | iva | sí | 23/19/5; reemplaza a la universal |
| vypocet-dovolenky | vacaciones | sí | |
| nahrada-mzdy | propio | sí | Priemerný zárobok § 134 |
| kalkulacka-pn | propio | sí | Náhrada 25/55 % + nemocenské |
| kalkulacka-materske | propio | sí | Tope 2026 y 2027 por fecha |
| tehotenske | propio | sí | |
| osetrovne | propio | sí | Solo el de 14 días |
| rodicovsky-prispevok | propio | sí | Mellizos por ley 571/2009 |
| odstupne | indemnizacion-despido | sí | Výpoveď y dohoda |
| odchodne | propio | sí | |
| vypovedna-doba | preaviso | sí | Slug con el término legal; el texto nombra «výpovedná lehota» |
| mzda-za-nadcas | horas-extra | sí | |
| priplatky-za-pracu | propio | sí | Sábado, domingo, noche, feriado |
| 13-plat | propio | sí | Sin exención, ver decisiones |
| danovy-bonus | propio | sí | Límite y reducción |
| kalkulacka-dochodku | jubilacion | sí | Estimación POMB × años × ADH |
| kurzova-kalkulacka | tipo-de-cambio | sí | Serie NBS |
| inflacna-kalkulacka | inflacion | **no (borrador)** | statistics.sk inaccesible |

Universales: `todas` (entran 40; `kalkulacka-dph` la reemplaza la local). No se excluyó ninguna a mano.

## Datos

42 datos: 41 con tramos verificados en fuente primaria y 1 pendiente. Fuentes: Slov-Lex (versión estática, leyes
595/2003, 311/2001, 222/2004, 580/2004, 461/2003, 462/2003, 571/2009, NV 324/2019), Finančná správa, Sociálna
poisťovňa, MPSVR, VšZP, NBS.

No verificado:
- `sk.inflacia-rocna`: `data.statistics.sk` rechazó la conexión (ECONNREFUSED) desde curl y WebFetch. La calculadora
  queda en borrador, sin casos. Al volver el servicio conviene pasarla a serie mensual del IPC, como en cz.

## Detectores

- Seis series NBS (`nbs.sk/export/sk/exchange-rate/latest/csv`): probadas, último punto 30/10/2026.
- Cinco de norma sobre el historial de versiones de Slov-Lex: probados. Marcan redacciones futuras aún no leídas, a
  propósito: 595/2003 (31/12/2026 y 1/1/2027), 311/2001 (2/12/2026), 222/2004 (1/1/2027 y 1/7/2030), 580/2004
  (31/12/2026), 461/2003 (31/12/2026, 1/1/2027, 2028 y 2029).
- Prueba: `TSX_DISABLE_CACHE=1 npx tsx scripts/paises/sk/probar_detectores.ts`.

## Decisiones

- **El encargo decía «15/19/25 %»; la ley vigente no.** Desde 1/1/2026 § 15 tiene 19/25/30/35 % más el 15 % para
  empresarios hasta 100 000 eur. Se usó la ley (también Finančná správa).
- **13. y 14. plat sin exención.** § 118 ods. 4 ZP los trata como salario y § 5 ods. 7 no trae hoy la exención (Finančná
  správa la marca «účinné do 31.12.2020»). Se calculan como salario del mes.
- Nómina con 1/12 de la nezdaniteľná časť (§ 35), sin la reducción anual; aviso en pantalla.
- Bono mensual: tope y reducción con 1/12 de la cifra anual, por § 35 ods. 5. La letra exacta mensual se infirió:
  revisar con un contador.
- Salud por debajo de 570 eur (odpočítateľná položka y minimálny preddavok): no se calcula, aviso en pantalla.
- PN: la base del empleador usa el tope de 16 764 eur y no el de 100,2083; no se leyó una norma que lo fije para la
  náhrada. Solo afecta sueldos muy altos.
- Redondeo a 10 céntimos de las dávky: inferido y comprobado contra todas las sumas oficiales 2026 y 2027.
- Fuera por costo y reglas muchas: dávka v nezamestnanosti, dohody, úrok z omeškania. Pendientes con demanda real.

## Riesgos y pendientes

- Falta revisión de un hablante nativo (lo pide ESTADO.md). Las búsquedas de slugs no se validaron en Google de
  Eslovaquia: salieron del pedido y del uso oficial.
- Los valores anuales vencen el 31/12/2026: hay que cargar 2027 (mínimo 972 eur ya anunciado, sin dato cargado) y leer
  las redacciones futuras de arriba.
- `rodicovsky-prispevok`: la página del ministerio no tiene fecha; 500,10 lo confirma su noticia de enero de 2026 y
  364,80 solo esa página. Su «120,60» por mellizos no coincide con el 25 % de la ley: se usó la ley.
- No se miró en `next dev` (Turbopack no acepta la junction y exige `npm ci`).
- `check_mundo` falla por `be` (neto de Bélgica), ajeno a este país.

## Checks

Corrida final con sk registrado localmente: `tsc` sin errores; `check_paises sk` OK (42 datos, 65 calculadoras, 1
aviso: la serie NBS envejece sin cron); `check_paises_casos sk` 71 casos en 24 archivos; `check_textos_paises sk` 999
textos, 0 avisos; `check_seo_pais sk` OK con 17 avisos (páginas bajo el objetivo de 220 palabras, todas sobre el mínimo
de 90); `check_ofertas_intl sk` OK; `check_fronteras` 15 230 archivos; `check_eol` OK; `check_motor` 4 891 pruebas.
`check_mundo`: 1 falla ajena (`be`); SK no figura entre los excluidos.
