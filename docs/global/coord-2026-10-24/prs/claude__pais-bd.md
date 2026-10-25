# Bangladés (bd) en bengalí: 21 calculadoras locales y 38 universales

Rama `claude/pais-bd`. **Depende de `claude/mundo-motor-bn`** (motor bengalí, ADR 0002 D14, sin mergear): la rama sale de ese motor y tiene además `origin/main` mergeado.

## Qué incluye

- `src/paises/bd/`: mercado `bd`/`BD`, `bn`, `bn-BD`, trato `usted` («আপনি», D14), `BDT`, `Asia/Dhaka`, escala 120, nombre «বাংলাদেশ». Publicado en el commit `publicar bd` (final de `PAISES`, cargadores y medición regenerados).
- 59 calculadoras: 21 locales (20 publicadas y 1 en borrador) y 38 universales. Las universales `iva`, `dias-entre-fechas` y `sumar-dias` las reemplazan locales del mismo concepto.
- Slugs en inglés y títulos, h1 y FAQ en bengalí con la búsqueda local, y la búsqueda en inglés en el title cuando aplica («Income tax BD», «VAT calculator BD», «TDS calculator BD», «FDR calculator BD»).

| slug | concepto | estado |
|---|---|---|
| income-tax-calculator (আয়কর) | impuesto-renta | publicado. Escala por categoría (general, mujer o 65+, discapacidad o tercer género, combatiente), hijo con discapacidad, rebaja art. 78, impuesto mínimo y el incentivo o recargo según cuándo se presenta la declaración (2026) |
| salary-tax-calculator (বেতনের কর) | sueldo-neto | publicado, entra en «Tu sueldo en el mundo» (`mundo` declarado) |
| tax-rebate-calculator (কর রেয়াত) | propio | publicado |
| vat-calculator (ভ্যাট/মূসক 15 %) | iva | publicado. Tasa reducida a mano |
| tds-calculator (উৎসে কর, servicios) | retencion-honorarios | publicado. Regla 4 de las উৎসে কর বিধিমালা ২০২৬ |
| sanchayapatra-calculator (সঞ্চয়পত্র) | propio | publicado. 5 esquemas, dos tramos (≤ 7,5 lakh), TDS 10 % y exención del pensioner |
| fdr-calculator | plazo-fijo | publicado. TDS 10 % |
| dps-calculator | propio | publicado |
| provident-fund-calculator | propio | publicado. 7 a 8 % (art. 264) |
| gratuity-calculator | propio | publicado. Art. 2(10) |
| service-benefit-calculator (ইস্তফা) | liquidacion-final | publicado. Art. 27(4) reformado en 2026 |
| retrenchment-calculator (ছাঁটাই) | indemnizacion-despido | publicado. Arts. 20, 22 y 26 |
| notice-period-calculator | preaviso | publicado |
| leave-calculator (ছুটি) | vacaciones | publicado |
| overtime-calculator | horas-extra | publicado. Doble del básico más DA (art. 108) |
| maternity-benefit-calculator | propio | publicado. 120 días, salario ÷ 26 (reforma 2026) |
| minimum-wage (নিম্নতম মজুরি) | salario-minimo | publicado. 28 sectores (garments RMG incluido) |
| working-days-calculator | dias-entre-fechas | publicado. Descanso el viernes o viernes y sábado |
| add-working-days | sumar-dias | publicado. Igual |
| inflation-calculator | propio | publicado. Serie BBS (proyección con la inflación vigente) |
| dollar-rate | tipo-de-cambio | **borrador**: bb.org.bd rechaza la conexión desde esta máquina (curl y WebFetch), no se pudo leer la tasa oficial |

## Datos (28 datos, 27 tramos verificados, 1 serie)

Verificados el 24/10/2026 en fuente primaria:
- NBR, আয়কর পরিপত্র ২০২৬-২০২৭ (escala y umbrales de los años fiscales 2026-27 y 2027-28, tabla de retenciones del apéndice 7, উৎসে কর বিধিমালা ২০২৬) y আয়কর নির্দেশিকা ২০২৬-২০২৭ (impuesto mínimo, rebaja, tope de exención del sueldo, incentivos por fecha de presentación, ejemplos oficiales usados como casos).
- NBR, Ley de IVA 2012 (art. 15(3), 15 %) y texto auténtico en inglés de la Ley de Impuesto a la Renta 2023 (arts. 102 y 105).
- Ministerio de Trabajo: Ley del Trabajo 2006 consolidada y বাংলাদেশ শ্রম (সংশোধন) আইন, ২০২৬ (Ley 43 de 2026, 10/4/2026).
- নিম্নতম মজুরী বোর্ড: lista de salarios mínimos por sector (actualizada el 23/9/2026).
- Dirección de Ahorro Nacional / IRD: notificación de tasas del 30/6/2025, que la Dirección sigue mostrando como vigente (la prensa informa que se mantuvieron en enero y julio de 2026; aviso `info` en la calculadora).
- BBS: inflación de septiembre de 2026 (8,34 %).

No verificado: `bd.usd-bdt` (Bangladesh Bank no responde desde acá).

Detectores (probados contra el HTML real descargado): serie de inflación de la portada de BBS; normas: listado de Finance Acts de NBR, página de tasas de Ahorro Nacional, lista de la Junta de Salarios Mínimos y página de leyes del Ministerio de Trabajo.

## Checks

- check_paises bd: OK (28 datos, 59 calculadoras). check_paises_casos bd: 72 casos OK en 21 archivos. check_textos_paises bd: 911 textos OK. check_fronteras: OK (7748 archivos). check_eol: OK (8572 archivos). check_mundo: bd entra (declarado, 0 % / 6,8 % / 19,7 %). check_motor --generar-cargadores: 2359 pruebas OK. check_medicion_mercados --escribir: 57 mercados.
- check_ofertas_intl: 15 fallas, todas de cl (UF), ajenas (arregladas en `claude/mundo-arreglos-2026-10-24`).
- tsc: 0 errores (antes 14 en `src/motor`, resueltos al mergear el motor bn al día; ver abajo).
- check_hreflang: solo las fallas conocidas del clúster de inflación de main (1.892, el mismo número que en `claude/mundo-motor-bn` sin bd), ninguna de bd. check_seo_intl: TODO OK en 7.684 páginas.
- check-all: 151 OK y 4 en rojo, todos ajenos a bd: check_hreflang (clúster de inflación), check_ofertas_intl (cl, UF), check_mes_en_render (páginas de AR) y check_panel_sql (18 fallas, tablas ca_sueldos_* y grants de la referencia).

## Pendientes y riesgos

- Ya no bloquea: el motor bn está al día con main (7d190a68) y mergeado acá. Sigue dependiendo de que `claude/mundo-motor-bn` entre a main antes o junto con este PR.
- Revisión de un hablante nativo de bengalí de todos los textos (contenido, etiquetas, errores, avisos y novedades).
- Resuelto en el motor: la regla bn ignora lo que va entre `{{ }}`. `lib/marcadores.ts` de bd ya no hace falta para pasar la regla; se dejó como está (no rompe nada) y se puede simplificar después.
- Pedido al motor: la universal `dias-entre-fechas`/`sumar-dias` cuenta hábiles de lunes a viernes; para bd se resolvió con calculadoras locales.
- Tasas de সঞ্চয়পত্র: se reajustan cada seis meses (próxima revisión enero de 2027); el detector avisa cuando cambia el PDF de la Dirección.
- El sobrecargo por patrimonio neto, el adelanto de impuesto y el sobrecargo ambiental de autos no se calculan (dicho en la FAQ del impuesto a la renta).
- Sin calculadoras de zakat ni de costos de registro de tierras: no se encontró fuente oficial vigente.
- El commit de merge de origin/main (2085cd72) quedó con el autor por defecto de la máquina (Miguel Navarro) y sin coautoría; no se reescribió.
- Sin push ni PR (sin permiso de escritura). Sin credenciales: nada saltado por eso.

## Puesta al día con el motor bn (24/10)

Merge de `claude/mundo-motor-bn` (6955756d, ya con main 7d190a68 mergeado) en 8291f333, sin conflictos. El motor suma
bn en rankings (`/bd/desher-ranking`), horas de trabajo (`/bd/koto-ghonta-kaj`), calendario
(`/bd/beton-calendar`), sueldos reales (`/bd/asol-beton`) y afiliados, con dígitos bengalíes en los
valores de las plantillas. `check_motor --generar-cargadores` (2.359 pruebas OK) y
`check_medicion_mercados --escribir` (57 mercados) no cambiaron archivos.

Checks después del merge: tsc 0 errores; check_paises bd OK (28 datos, 59 calculadoras, 1 aviso: la
serie de inflación de BBS deja de ser publicable el 24/11 si no llega el dato de octubre);
check_paises_casos bd 72 casos OK; check_textos_paises bd 911 textos OK; check_i18n TODO OK (30.375
textos); check_horas OK (32 países); check_rankings TODO OK (44 países, 118 ediciones); check_sueldos
15.436 pasadas, 0 fallas; check_calendario TODO OK; check_mundo TODO OK; check_embed 60 mercados;
check_fronteras OK (7.751 archivos); check_eol OK; check_hreflang y check_seo_intl como arriba;
check_ofertas_intl 15 fallas de cl (ajenas); check-all 151 OK y 4 en rojo ajenos.

El commit de merge 8291f333 quedó con el autor por defecto de la máquina (Miguel Navarro) y sin
coautoría; no se reescribió.

🤖 Generated with [Claude Code](https://claude.com/claude-code)
