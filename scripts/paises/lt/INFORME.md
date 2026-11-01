# Informe del país Lituania (lt)

Rama `claude/pais-lt`. **Depende de `claude/mundo-motor-lt`** (sin mergear): sin ella no existe el idioma `lt`.
Estado del mercado: `interno`. No se tocó `src/paises/index.ts` en el commit.

## Resumen: la barra de datos NO se alcanzó

Quedaron **3 locales publicables y 21 en borrador**, más 40 universales. La barra pedía 15 a 25 locales con datos
verificados: falta la verificación de 21. El motivo es uno solo y está abajo.

## Bloqueo de fuentes (1/11/2026)

`e-tar.lt`, `e-seimas.lrs.lt`, `www.lrs.lt`, `vmi.lt`, `sodra.lt`, `atvira.sodra.lt`, `*.lrv.lt` (socmin, finmin, vda,
ligoniukasa), `osp.stat.gov.lt`, `vdi.lt`, `uzt.lt`, `registrucentras.lt` y las páginas de `lb.lt` responden 403 con
un desafío de Cloudflare (`Cf-Mitigated: challenge`) a WebFetch y a curl. Una prueba con el navegador integrado sobre
vmi.lt quedó trabada en «Verificación de seguridad en curso».

**No se eludió el control**: sin User-Agent de navegador, sin tocar el verificador, sin espejos ni archivos web como
si fueran la fuente, sin usar el Chrome de la persona para pasar por humano. Es un control de bots del sitio, y
esquivarlo no es decisión de este agente. Por el brief, lo no leído queda `no-verificado` y su calculadora en borrador.

Para destrabar: que una persona lea las normas de la columna «falta leer» en `datos.json` (cada `motivo` la nombra),
o que el coordinador consiga un acceso autorizado. Luego, por calculadora: pasar los tramos a `verificado` con URL y
fecha, cambiar `estado` a `publicado`, contrastar la fórmula con la ley, sumar `.casos.ts`, FAQ, ejemplo y marcadores.

## Calculadoras locales

| slug | concepto | publicable | por qué |
|---|---|---|---|
| mma | salario-minimo | sí | Eurostat earn_mw_cur (ver decisión 1) |
| infliacijos-skaiciuokle | inflacion | sí | API oficial de la Valstybės duomenų agentūra |
| valiutu-skaiciuokle | tipo-de-cambio | sí | LB Web Services de Lietuvos bankas |
| atlyginimo-skaiciuokle | sueldo-neto | no | VDU, NPD, GPM, VSD, PSD, lubos sin leer |
| is-ranku-i-popieriu | propio | no | igual |
| darbo-vietos-kaina | costo-empleador | no | įmokos de darbdavio sin leer |
| npd-skaiciuokle | propio | no | NPD sin leer |
| gpm-skaiciuokle | impuesto-renta | no | tarifas y ribos sin leer |
| sodra-imokos | aportes-seguridad-social | no | VSD, PSD, lubos sin leer |
| individuali-veikla | retencion-honorarios | no | tarifas sin valor; fórmula del crédito de memoria, a contrastar |
| verslo-liudijimas | regimen-simplificado | no | riba e įmokos sin leer |
| mb-mokesciai | propio | no | pelno mokestis sin valor |
| pvm-skaiciuokle | iva | no | PVM įstatymas sin leer |
| atostoginiu-skaiciuokle | vacaciones | no | Darbo kodeksas sin leer |
| kompensacija-uz-atostogas | propio | no | igual |
| iseitine-ismoka | indemnizacion-despido | no | igual |
| ispejimo-terminas | preaviso | no | igual |
| virsvalandziai | horas-extra | no | igual, sin valor |
| ligos-pasalpa | propio | no | sodra.lt y ley sin leer |
| motinystes-pasalpa | propio | no | sin valor |
| tevystes-pasalpa | propio | no | sin valor |
| vaiko-prieziuros-pasalpa | propio | no | sin valor |
| nedarbo-ismoka | propio | no | sin valor |
| nt-mokestis | propio | no | escala sin valor |

Los borradores llevan contenido mínimo (h1, title, description, intro, cómo se calcula), sin FAQ ni números: no hay
afirmaciones legales sin fuente. Hay que completarlo al verificar. Ningún número de norma está en el código: todo sale
de `datos.json`. Las fórmulas de `lib/atlyginimas.ts` y de los borradores **no se contrastaron con la ley**.

**Universales:** 40 con `universales: "todas"`. La `iva` no entra porque pide tasa verificada, así que **hoy no hay
ninguna página de PVM**. Un `sueldo-neto` en borrador también deja a Lituania fuera de «Tu sueldo en el mundo».

## Datos

Verificados (leídos el 1/11/2026): `lt.mma`, `lt.mma-ankstesne` (Eurostat); series `lt.usd`, `lt.gbp`, `lt.chf`,
`lt.pln` (Lietuvos bankas, 26 puntos) y `lt.vki` (Valstybės duomenų agentūra, 357 puntos desde 1997-01, 2025 = 100,
último 2026-09).

No verificados: los otros 36 datos de `datos.json`, cada uno con su motivo. Algunos llevan `valor` como pista de
secundarias (Grant Thornton, Eurofast) o del encargo, que `vigente()` ignora. Discrepancias concretas que justifican
no adivinar:

- VDU 2026: 2312,15 € (GT, proyecto de presupuesto) contra 2304,50 € (Eurofast; GT lo da como previsión de Finmin). Sin valor.
- Lubos de VSD: 60 VDU (GT) contra 43 VDU (resumen de buscador de una guía de Sodra, quizá otro concepto). Sin valor.
- Fórmula del NPD: Eurofast da 0,49 desde un PDF con operadores ilegibles; GT cita un límite de 2677,49 € sin la fórmula.
- `ispejimo-dienos`: 30 días es conversión propia de «un mes»; `vsd-darbdavio` y `iseitine-menesiai` salen de tablas desordenadas.

La MMA de 2027 no está cargada: la prensa da cifras distintas (1235,9 y 1245 €). `lt.mma` vence el 31/12/2026 a propósito.

## Detectores (`scripts/paises/lt/probar_detectores.ts`, corrida real del 1/11/2026)

| id | resultado |
|---|---|
| lt.usd-lb, lt.gbp-lb, lt.chf-lb, lt.pln-lb | 15 puntos cada uno, último 2026-10-30 (1,1172; 0,8338; 0,9194; 4,4038) |
| lt.vki-vda | 21 puntos, último 2026-09-01 = 106,9034 |
| lt.mma-eurostat | 0 hallazgos |

No hay detector de e-tar, e-seimas, VMI ni Sodra: fallarían por el mismo 403, así que los cambios de norma de los
borradores no tienen vigilancia. La API de la agencia ignora la clave SDMX: se acota con `startPeriod` y se filtra CP00.

## Checks (con lt registrado localmente, salvo `check_eol`, tras restaurar el registro)

| check | resultado |
|---|---|
| `tsc --noEmit -p .` | exit 0 |
| `check_paises lt` | OK: 38 datos, 3 tramos verificados, 36 pendientes, 5 series, 64 calculadoras, 2 avisos de vencimiento |
| `check_paises_casos lt` | OK: 8 casos en 3 archivos |
| `check_textos_paises lt` | OK: 573 textos, 0 avisos |
| `check_ofertas_intl lt` | OK |
| `check_seo_pais lt` | OK, 1 aviso: valiutu-skaiciuokle con 219 palabras (objetivo 220) |
| `check_fronteras` | OK: 15782 archivos |
| `check_mundo` | falla por `be` (neto 23589,12 contra 23487,48), ajeno a este país; no se tocó |

No corrido: `check_motor` y la mirada en `next dev` (pide `npm ci` real). Las páginas no se vieron renderizadas.

## Decisiones y riesgos

1. **MMA con Eurostat como `primaria`.** Es la oficina estadística oficial de la UE, pero no es la fuente que nombró
   el encargo (socmin, e-tar: bloqueadas). Por eso la nota de la fuente lo dice. Si el coordinador no lo acepta, `mma`
   pasa a borrador. Falta leer el nutarimas. El monto mensual no incluye el valandinis (7,05 € solo en secundarias).
2. **Series con unidad en moneda extranjera** (`USD`, `GBP`, `CHF`, `PLN`): el santykis es por 1 euro.
3. **Slug sin validar en Google de Lituania**: la búsqueda disponible es solo de EE. UU.; los slugs salen del encargo y de D29.
4. **Texto sin revisión de hablante nativo**, igual que el motor (D29).
5. Los dos avisos de `check_paises` son normales: series que el cron debe refrescar.
