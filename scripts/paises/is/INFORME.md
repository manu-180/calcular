# Informe de Islandia (is)

Depende de `claude/mundo-motor-is` (motor islandés, ADR 0002 D34), todavía sin mergear: integrar esa rama antes
que esta. `estado: "interno"`: no publicado y sin registrar en `src/paises/index.ts`.

## Calculadoras locales (25)

| Slug | Concepto | Publicable | Por qué |
|---|---|---|---|
| launareiknivel | sueldo-neto | sí | Staðgreiðsla 2026, caso oficial de la orðsending 1/2026 |
| brutto-ur-neti | propio | sí | Inversa del anterior, mismo caso oficial |
| launakostnadur | costo-empleador | sí | Mismo ejemplo oficial (69.000 y 42.482) |
| tekjuskattur | impuesto-renta | sí | Límites anuales de la orðsending |
| personuafslattur | propio | sí | Tabla por período de Skatturinn |
| lifeyrissjodur | aportes-seguridad-social | sí | 4 %, 11,5 % y hasta 4 % de séreign, de la orðsending |
| tryggingagjald | propio | sí | 6,35 % y 7 %, de la orðsending |
| vsk-reiknivel | iva | sí | 24 y 11 %, Helstu tölur. Reemplaza a la universal del mismo concepto y slug |
| fjarmagnstekjuskattur | propio | sí | 22 % y frítekjumark, Helstu tölur |
| leigutekjur | propio | sí | 75 % como base, Helstu tölur |
| orlofslaun | vacaciones | sí, con riesgo | Ver riesgos: la fuente es del ministerio, de 1993 |
| desemberuppbot | bono-semestral | no (borrador) | Cifra solo de SA, parte del convenio, no de un organismo oficial |
| orlofsuppbot | propio | no (borrador) | Cifra solo vista en extracto de buscador de SA y VR |
| faedingarorlof | propio | sí | 80 %, 900.000 y mínimos, Vinnumálastofnun en island.is |
| atvinnuleysisbaetur | propio | sí | Fjárhæðir desde el 1/1/2026 |
| barnabaetur | propio | sí | Fjárhæðir 2026 de Skatturinn |
| vaxtabaetur | propio | sí | Forsendur álagningar 2026, sobre datos del ejercicio anterior |
| stimpilgjald | propio | sí | Gjaldskrá sýslumanna y Þinglýsing skjala |
| verdtrygging | propio | sí | Tabla VIS01004 de Hagstofa |
| gengi | tipo-de-cambio | sí | Serie oficial de Seðlabanki |
| verdbolga | inflacion | sí | Tabla VIS01000 de Hagstofa. Concuerda con el 5,9 % publicado |
| erfdafjarskattur | propio | sí | 10 % y 6.789.790, Helstu tölur |
| ellilifeyrir | jubilacion | sí | Fjárhæðir de TR y 45 % de su noticia. Comprobado con el corte oficial de 856.085 |
| dagpeningar | propio | sí | Tres períodos del año, Helstu tölur |
| drattarvextir | propio | sí | Tilkynning nr. 10/2026 |

Universales: `universales: "todas"`, entran 40 (cae la de IVA por la local). 65 calculadoras en total.
Salario mínimo: no hay calculadora, Islandia no tiene mínimo legal. Lo fijan los kjarasamningar.

## Datos no verificados

| Dato | Motivo |
|---|---|
| is.desemberuppbot (114.000) | Página de SA leída. SA es parte del convenio, no organismo público. Falta una fuente oficial o la decisión de aceptar a SA como primaria |
| is.orlofsuppbot (62.000) | Solo visto en extracto de buscador (SA, VR). No es lectura de la fuente |

Decisión a confirmar: las dos son de alta demanda. Si el coordinador acepta el texto del convenio como fuente,
basta leerlo, marcar los tramos como verificados, pasar a `publicado` y agregar casos y FAQ.

## Fuentes que no se pudieron leer

- althingi.is responde 403. No se intentó eludirlo. La ley 30/1987 (orlof) y la ley del stimpilgjald no se leyeron:
  se usó lo publicado por Skatturinn, island.is y el ministerio.
- island.is/orlofsrettur no trae en su HTML el texto sobre 10,17 %, aunque un buscador lo muestra. No cuenta como lectura.
- tr.is no se usó: las cifras de TR se leyeron en island.is.

## Detectores (15) y su prueba

`TSX_DISABLE_CACHE=1 npx tsx scripts/paises/is/probar_detectores.ts`, corrida real contra las fuentes el 2026-11-01:
15 de 15 responden.

- Series: gengi de Seðlabanki (EUR, USD, GBP, NOK, SEK, CHF, CSV `xmltimeseries`, 15 puntos cada uno) y Hagstofa
  (VNV y verdtrygging, PXWeb por POST, 6 puntos cada uno). Requieren `http.postJson`.
- Normas: 6 páginas donde se vigila que sigan las cifras conocidas (una cifra que desaparece abre hallazgo) y el RSS
  de Seðlabanki (notas de intereses posteriores a nr. 10/2026 y a la declaración de octubre). 0 hallazgos hoy.

## Checks (con el país registrado localmente, sin commitear ese cambio)

| Check | Resultado |
|---|---|
| tsc --noEmit | sin errores |
| check_paises is | OK: 51 datos verificados, 2 pendientes, 8 series, 65 calculadoras, 1 aviso (gengi vence sin cron) |
| check_paises_casos is | OK: 60 casos en 23 archivos |
| check_textos_paises is | OK: 1044 textos, 0 avisos |
| check_seo_pais is | OK, con avisos de 13 o más calculadoras por debajo del objetivo de 220 palabras (mínimo 181, mínimo exigido 90) |
| check_ofertas_intl is | OK |
| check_fronteras | OK |
| check_eol | OK |
| check_motor | OK: 5120 pruebas |
| check_mundo | `is` no entra mientras esté interno. Con `publicado` local entra: tasa 4,0 / 25,4 / 37,8 %, 12 pagas. 1 falla ajena al país (`be`, Bélgica) |

## Mirada en `next dev`

Con `--webpack` (Turbopack no acepta la junction de node_modules) y `NEXT_PUBLIC_SITIO_INTL_URL`:

- `/is`, `/is/launareiknivel`, `/is/vsk-reiknivel`, `/is/lanareiknivel` (universal) y `/is/novedades` responden 200, con
  `lang="is-IS"` y marcadores resueltos. `/is/desemberuppbot` da 404, como corresponde a un borrador.
- **Hallazgo corregido**: Node formatea la corona como `kr.` y Chromium como `ISK`, y la página no hidrataba. Se
  arregló con `simbolos: { ISK: "kr." }` en `mercado.ts`. Sin error de hidratación después del cambio.
- **Pedido al motor**: esta diferencia no la ve `check_motor`, que solo corre en Node, y afecta a cualquier mercado
  en ISK sin `simbolos`, incluida la edición `zz-is`. La afirmación de D34 de que Intl da `kr.` vale para Node.
- **No verificado**: el cálculo en el navegador. Con webpack falla el cargador de desarrollo (`{}.glob is not a
  function`, usa un glob de Turbopack), así que no se pudo apretar «Reikna». Las fórmulas sí están cubiertas por los
  60 casos. Falta mirarlo con `npm ci` real y Turbopack, o en un preview.

## Riesgos y pendientes

- **Revisión nativa**: textos sin revisar por un hablante de islandés (ADR D34 ya lo pide). Bloquea la publicación.
- **orlofslaun**: los 10,17, 11,59 y 13,04 % salen de una guía del ministerio de 1993 para empleados públicos. El
  artículo 7 de la ley 30/1987 no se pudo leer (403). Conviene confirmarlo cuando althingi.is responda.
- **vaxtabaetur**: las cifras son de la álagning 2026 (ejercicio 2025). Pasar a las de la próxima álagning cuando salgan.
- **drattarvextir**: la nota nr. 10/2026 cubre 1 a 30 de noviembre. El tramo queda sin `hasta` para no apagar la
  calculadora: el detector de RSS avisa de la siguiente. Revisar mensualmente.
- **meginvextir**: próxima decisión el 18/11/2026 (`proximaRevision`).
- **Simplificaciones, avisadas en la página**: atvinnuleysisbaetur no reduce por ingresos sobre el frítekjumark ni
  calcula tekjutengdar con bótaréttur parcial; ellilifeyrir no reduce heimilisuppbót; drattarvextir es interés
  simple con la tasa vigente; launakostnadur no suma cargas de convenio.
- **Slugs**: elegidos por criterio, no comprobados en el autocompletar de Google de Islandia (no hay acceso).
- **Pedidos al motor**: el de la corona en Chromium, arriba.
