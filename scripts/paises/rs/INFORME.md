# Informe del país Serbia (rs)

Rama `claude/pais-rs`. **Depende de `claude/mundo-motor-sr` (motor serbio sin mergear):** hay que integrar esa rama antes.
Mercado `rs`, idioma `sr`, locale `sr-Latn-RS`, RSD, escala 100, `trato: "usted"` («vi» en minúscula), ekavski, `estado: "interno"`.

## Calculadoras: 20 locales + 40 universales = 60

| slug | concepto | publicable | motivo |
|---|---|---|---|
| kalkulator-plate | sueldo-neto | sí | tasas en ley leída; casos 2026 y 2027; `mundo` declarado |
| neto-u-bruto | propio | sí | misma base |
| trosak-poslodavca | costo-empleador | sí | |
| minimalna-zarada | salario-minimo | sí | 371 (2026), 405 (2027) |
| porez-na-zarade | impuesto-renta | sí | |
| obracun-doprinosa | aportes-seguridad-social | sí | |
| kalkulator-godisnjeg-odmora | vacaciones | sí | Zakon o radu |
| regres-i-topli-obrok | propio | sí | la ley no fija montos: los ingresa la persona |
| obracun-prekovremenog-rada | horas-extra | sí | |
| obracun-otpremnine | indemnizacion-despido | sí | |
| otkazni-rok | preaviso | sí | |
| obracun-bolovanja | propio | sí | prorrateo por 30 días declarado como estimación |
| porodiljsko-odsustvo | propio | **no, borrador** | tope sin verificar, ver abajo |
| pausal-kalkulator | regimen-simplificado | sí | parte del paušalni prihod del rešenje: no estima el ingreso |
| kalkulator-pdv | iva | sí | reemplaza a la universal `pdv-kalkulator` |
| porez-na-imovinu | propio | sí | da el máximo legal; cada municipio fija su tasa |
| porez-na-prenos-apsolutnih-prava | propio | sí | |
| kurs-nbs | tipo-de-cambio | sí | |
| kalkulator-inflacije | inflacion | sí | IPC RZS desde 2011 |
| prosecna-plata | propio | sí | sumada por demanda de búsqueda, no estaba en el encargo |

Universales: `"todas"`. Cae solo la de IVA, por haber local del mismo concepto.

## Datos

37 datos (38 tramos verificados, 1 pendiente) y 7 series, leídos el 31/10/2026.

**Fuentes leídas:** Ministarstvo finansija (textos refundidos en docx de ZPDG, Zakon o doprinosima, Zakon o porezima na imovinu; montos de osnovice), Pravno-informacioni sistem (Zakon o radu, Zakon o zdravstvenom osiguranju, Zakon o PDV), srbija.gov.rs y mfin.gov.rs (mínimo), NBS, RZS.

**No verificado:**
- `rs.porodiljsko-gornja-granica` (5 salarios promedio): solo está en el texto de 2017 de parlament.gov.rs. No se encontró el refundido vigente del Zakon o finansijskoj podršci porodici sa decom. La calculadora queda en borrador, sin casos.

**Para mirar:**
- Mínimo 2026 (371): no se pudo abrir la Odluka (Sl. glasnik 78/2025) en el PIS. La fuente citada es la nota del Ministerio del 18/8/2026 («sa 371 na 405»). El 405 de 2027 sale del comunicado de adopción del Gobierno (20/8/2026), no de la Odluka publicada.
- Esa nota del Ministerio dice que el neoporezivi pasa «de 34.521 a 37.369» según el resumen automático que leí. La ley (art. 7 de 109/2025) dice 34.221 y se usó esa. Conviene mirar la nota a ojo.
- `rs.neoporezivi-iznos` 2027 (37.369) ya está cargado (art. 15a, Sl. glasnik 80/2026).
- **Las osnovice no tienen tramo 2027.** Se publican en diciembre: hay que cargarlas entonces. Un cálculo con fecha de 2027 usa las de 2026 hasta ese momento. El art. 44 (tasas) no lleva marca de la ley 80/2026.
- Las URL del Ministerio son docx con doble barra, tal como las publica el sitio. Responden a WebFetch y dan 403 a un script propio.
- NBS: `www.nbs.rs` cortó la conexión y el panel del navegador no pudo abrirlo; sí se leyó `webappcenter.nbs.rs`. La referentna kamatna stopa (5,75 % en la portada) no se cargó porque ninguna calculadora la usa.
- `rs.prosecna-bruto` y `rs.prosecna-neto` son series mensuales con un solo punto y **sin detector**: hay que cargar cada mes el saopštenje de RZS. `check_paises` avisa que dejan de ser publicables con 100 días de antigüedad (afecta a `prosecna-plata` y `obracun-otpremnine`). Los kursevi y el IPC también dependen de que el cron corra.

## Detectores y prueba real

`scripts/paises/rs/probar_detectores.ts`, corrido el 31/10/2026 contra las fuentes:

| detector | resultado |
|---|---|
| rs.eur-nbs, usd, chf, gbp | 1 punto cada uno, 30/10/2026: 117,5367; 105,056; 127,7434; 140,7457 |
| rs.ipc-rzs | 189 puntos, último 09/2026: 103,8 (el JSON pesa 12 MB) |
| rs.purs-zpdg, rs.purs-doprinosi | 0 hallazgos: el número de página de la ley sigue igual |

Los detectores de norma comparan el id de página en purs.gov.rs (9941 y 9461). No se probó el camino con un id mayor contra una publicación real.

## Checks (con rs registrado localmente)

- `tsc --noEmit -p .`: sin errores.
- `check_motor`: 4883 pruebas OK.
- `check_paises rs`: OK, 60 calculadoras.
- `check_paises_casos rs`: 44 casos en 19 archivos.
- `check_textos_paises rs`: 900 textos.
- `check_seo_pais rs`: OK, sin avisos.
- `check_ofertas_intl rs`: OK.
- `check_fronteras`, `check_eol`: OK.
- `check_mundo`: 1 falla ajena (`be`, Bélgica; no toqué ese país). `rs` no figura en la tabla mientras esté interno: hay que mirarlo al publicar. `mundo` va declarado.

**No corrido:** `next dev`. Turbopack no acepta la junction de node_modules y el panel del navegador no abre localhost, así que las páginas no se miraron renderizadas.

## Riesgos

- Los textos los escribió un no nativo: D23 pide revisión por hablante nativo antes de publicar.
- Los slugs salen de búsquedas conocidas (`kalkulator-plate`, `neto-u-bruto`, `obracun-otpremnine`), sin verificación en el autocompletar de Google Serbia.
- `obracun-bolovanja`: el tope del RFZO se aproxima con la najviša osnovica vigente, cuando la ley usa el promedio de los meses del cálculo.
- `kalkulator-godisnjeg-odmora` y `obracun-bolovanja` usan divisores propios (días hábiles del mes, 30 días) que la ley no fija. Está dicho en los textos.
- `pausal-kalkulator` no incluye el test de independencia (art. 85) ni la regla de contribuciones de los freelancers.
- `obracun-otpremnine`: la exención impositiva hasta el mínimo legal se citó del art. 9; lo que excede el mínimo no se calcula.
- Sl. glasnik 80/2026 modifica también ZPDG y doprinosi desde 2027 y 2028 (arts. con aplicación 2028 sin revisar en detalle). Hay que releerlos antes de cargar los valores de 2027.
