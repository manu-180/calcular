# Informe del país Bosnia y Herzegovina (ba)

Rama `claude/pais-ba`, base `origin/claude/mundo-motor-bs`. **Depende de `claude/mundo-motor-bs` (motor bosnio sin mergear):** hay que integrar esa rama antes.
Mercado `ba`, nombre Bosna i Hercegovina, idioma `bs`, locale `bs-BA`, BAM, escala 2 (fila de `PAISES.md`), `trato: "usted"` («vi» en minúscula, ADR D39), `estado: "interno"`. Regiones: `fbih`, `rs`, `brcko`.

## Calculadoras: 17 locales + 40 universales = 57

| slug | concepto | publicable | entidad y motivo |
|---|---|---|---|
| kalkulator-plate | sueldo-neto | sí | FBiH y RS; `mundo` declarado con FBiH, entra en la grilla (34,8 / 37,0 / 37,6 %) |
| bruto-iz-neta | propio | sí | FBiH y RS; da los brutos oficiales de RS |
| trosak-poslodavca | costo-empleador | sí | FBiH 5 %; RS nada sobre el bruto |
| minimalna-plata | salario-minimo | sí | FBiH 1.027 neto (bruto calculado); RS cinco grupos, bruto y neto oficiales |
| porez-na-dohodak | impuesto-renta | sí | 10 % en FBiH, 8 % en RS |
| doprinosi | aportes-seguridad-social | sí | desglose por entidad |
| kalkulator-pdv | iva | sí | 17 %, reemplaza a la universal `pdv-kalkulator` |
| godisnji-odmor | vacaciones | sí | leyes de trabajo de las dos entidades |
| otpremnina | indemnizacion-despido | sí | art. 111 FBiH, art. 194 RS |
| otkazni-rok | preaviso | sí | 7/14 días FBiH, 15/30 RS |
| prekovremeni-rad | horas-extra | sí | RS 25/30/40 %; FBiH lo escribe la persona porque la ley no fija porcentaje |
| bolovanje | propio | sí, **solo RS** | FBiH fuera, con aviso |
| porodiljsko-odsustvo | propio | sí | duración en las dos; monto solo RS |
| topli-obrok-i-regres | propio | sí | RS 0,85 %; FBiH tope no imponible 1 % y 50 % |
| porez-na-promet-nekretnina | propio | sí, **4 cantones** | KS y ZDK 5 %; USK y HNK tope 5 %. RS y otros cantones fuera |
| kursna-lista | tipo-de-cambio | sí | serie CBBiH, euro fijo |
| kalkulator-inflacije | inflacion | sí, **índice RS** | ver abajo |

Ninguna local queda en borrador. Universales: `"todas"`; cae solo la de IVA por haber local del mismo concepto.

## Decisión por entidad (encargo: usar cada tasa solo si se leyó)

**Brčko distrikt queda fuera** de todo cálculo laboral y de sueldo, con el aviso `ba.brcko-van-obracuna`. Leí en skupstinabd.ba el 10 % y el mínimo personal de 500 KM (24/20), pero no hallé las tasas de aportes ni el salario mínimo vigentes, así que no hay neto calculable. La región existe en `mercado.ts` y ningún campo la ofrece. Cuando se lea la fuente, sumarla es agregar un tramo por dato.

**FBiH y RS calculan distinto, no solo con otra tasa.** FBiH: impuesto sobre bruto menos aportes menos deducción. RS: impuesto sobre bruto menos deducción, sin restar aportes. Desde 2026 en RS, 50 KM netos quedan fuera de impuesto y de aportes para ciertos trabajos.

**Lo de los 50 KM es inferencia verificada.** La ley 114/25 habla del impuesto; no leí el texto que los saque de la base de aportes. Lo deduje porque así y solo así dan las cifras oficiales de la decisión de RS: 1.476,23 bruto da 1.000 neto y 1.558,19 da 1.050, y los otros grupos dan sin esos 50. Los casos de `kalkulator-plate`, `bruto-iz-neta` y `minimalna-plata` lo prueban contra esos montos, con tolerancia de 2 feninge por el redondeo de cada renglón.

## Datos

41 datos, 54 tramos verificados, 0 pendientes; 5 series. Leídos el 1/11/2026 descargando los documentos oficiales (PDF, doc en zip de la Narodna skupština), no desde extractos del buscador.

**Fuentes que no se pudieron usar:**
- `bhas.gov.ba`: no resuelve DNS (reintentado con y sin www). Sin índice nacional.
- `poreskaupravars.org`: certificado TLS vencido. No lo eludí. Las tasas de RS salen de las leyes en la Narodna skupština (`narodnaskupstinars.net`) y de la Vlada RS.
- `sluzbenenovine.ba`: abre, con registro de usuarios; no busqué las normas ahí. Las de FBiH se leyeron en pufbih.ba y fbihvlada.gov.ba.
- `fmrsp.gov.ba`: abre, sin el texto del Zakon o radu ni la decisión del mínimo en sus páginas. La Ley de Trabajo FBiH se leyó en pufbih.ba y la decisión en fbihvlada.gov.ba.
- `poreskaupravars.org` y `vladars.rs` no tienen, que yo hallara, texto refundido de la ley de aportes ni de renta: **las tasas de RS se reconstruyeron cadena por cadena** (114/17, 112/19, 49/21, 119/21, 56/22, 132/22, 112/23, 110/24, 114/25 para aportes; 60/15, 66/18, 119/21, 56/22, 112/23, 110/24, 114/25 para renta). Las cifras oficiales del mínimo de RS confirman el resultado.

**Para mirar:**
- Salario mínimo RS: el monto sale de la nota oficial de la 16.ª sesión del gobierno (vladars.rs) y el número de gaceta 115/25 del índice del Službeni glasnik. El PDF de la gaceta que abrí vino casi sin texto, así que no leí el texto de la decisión publicada.
- Ley de Trabajo FBiH: es «prečišćena neslužbena verzija» hasta 89/18, publicada por la Porezna uprava. No hallé reformas posteriores, tampoco las puedo descartar.
- Ley de renta FBiH: refundido no oficial en pufbih.ba; el listado que la propia Porezna uprava tiene en su aplicación cita 10/08, 9/10, 44/11, 7/13 y 65/13. Hay una propuesta de 2025 para subir la deducción (300 a 600 u 800 KM) en parlamentfbih.gov.ba: **no consta que se aprobara**; no se usa. El detector avisa si cambia el listado.
- Decisión RS de 2016 sobre recargos: 25/30/40 %. Leí las modificaciones 12/22 y 39/22 (solo tocan dietas y comida). Dice que rige hasta que haya Opšti kolektivni ugovor; no consta que exista.
- `ba.promet-kanton` es un mapa con una sola fuente en el tramo: su título cita los cuatro artículos, el enlace va a la ley de KS. Las de ZDK (2009), USK y HNK también están en pufbih.ba. Sarajevo tramitaría un alivio para primera vivienda (solo vi el título en el buscador, vlada.ks.gov.ba): sin leer ni confirmar, no se aplica.
- Las fechas `desde` de los tramos laborales son aproximadas a la entrada en vigor; no cambian ningún resultado hoy.
- Costo del empleador FBiH: solo aportes. Las tasas especiales cantonales y de agua **no se incluyen** y lo dice una observación.
- `kalkulator-inflacije`: usa el índice de RS (RZS, base 2015) porque BHAS no conecta y el Federalni zavod muestra solo variaciones. La página lo dice. Serie desde 1/2024.
- `ba.prosjecna-neto-fbih` (1.708, VIII/2026) y `-3m` (1.726) se leyeron en la portada de fzs.ba; hay que renovarlas a mano al publicarse el dato nuevo (`proximaRevision` 20/11/2026).
- `godisnji-odmor`: la «gruba naknada» divide por 22 días: es una estimación, y la etiqueta y el texto lo dicen.
- `bolovanje`: divide por 30, declarado como estimación.

## Detectores y prueba real

`scripts/paises/ba/probar_detectores.ts`, sin User-Agent de navegador, corrido contra las fuentes:

| detector | resultado |
|---|---|
| ba.usd-cbbh, gbp, chf, rsd | 1 punto, lista del 31/10/2026 (USD 1,750653; GBP 2,345682; CHF 2,12729; RSD 0,01664016) |
| ba.cpi-rzs | 0 hallazgos (norma: avisa de un mes nuevo; la serie `ba.ipc` se carga a mano porque es PDF) |
| ba.propisi-fbih | 0 hallazgos (listado de pufbih con 33/25 y 65/13) |
| ba.najniza-plata-fbih | 0 hallazgos (nota de 2027 aún inexistente; su URL es una suposición sobre el patrón de 2026) |

No se probó un camino con hallazgo contra una publicación real. `ba.propisi-fbih` lee el bundle JS de la aplicación pública: frágil si la rehacen, en cuyo caso devuelve null y no inventa nada. El endpoint JSON de CBBiH no está documentado.

**`check_paises` avisa** que `kursna-lista` e `inflacije` dejan de ser publicables antes del 1/12/2026 si las series no se actualizan: las de kurs las refresca el cron; `ba.ipc` hay que cargarla a mano (último punto 9/2026).

## Checks (con ba registrado localmente, sin commitear ese cambio)

- `tsc --noEmit -p .`: sin errores.
- `check_paises ba`: OK, 57 calculadoras, 2 avisos (los de arriba).
- `check_paises_casos ba`: 66 casos en 17 archivos.
- `check_textos_paises ba`: 809 textos, 0 avisos.
- `check_seo_pais ba`: OK, 0 avisos.
- `check_ofertas_intl ba`: OK.
- `check_fronteras`, `check_eol`: OK.
- `check_motor`: 5944 pruebas OK.
- `check_mundo`: con `estado: "publicado"` temporal entra `declarado` (34,8 / 37,0 / 37,6 %).

**No corrido:** `next dev`, porque Turbopack no acepta la junction de node_modules. Revisé título, h1, descripción e intro de las 57 con los marcadores resueltos por script, no la página renderizada.

## Riesgos

- Los textos los escribió un no nativo. D39 pide revisión por hablante nativo antes de publicar.
- Los slugs salen de términos de ley y de uso conocido, **sin verificar en el autocompletar de Google BiH**: no tengo acceso.
- El límite de 65 % de oraciones compartidas no se midió contra otro país bosnio: no lo hay. Los conceptos son los mismos que en rs y me, pero los textos se escribieron aparte y en otra variante.
- Las oraciones sobre derecho de las normas son lectura propia, no asesoría. Conviene mirar especialmente el tratamiento de los 50 KM en aportes.
- `kalkulator-plate` no incluye reducciones por intereses de vivienda en RS ni alguna otra deducción de la tarjeta fiscal más allá del factor (FBiH) y los dependientes (RS).
