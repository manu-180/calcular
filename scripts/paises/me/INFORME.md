# Informe del país Montenegro (me)

Rama `claude/pais-me`. **Depende de `claude/mundo-motor-sr` (motor serbio sin mergear):** hay que integrar esa rama antes. No depende de `claude/pais-rs`.
Mercado `me`, nombre Crna Gora, idioma `sr`, locale `sr-Latn-ME`, EUR, escala 0,9 (fila de `PAISES.md`), `trato: "usted"` («vi» en minúscula), `estado: "interno"`. `simbolos` no hizo falta.

## Decisión de idioma

El motor no tiene montenegrino aparte. Los textos locales van en ijekavski con vocabulario de los organismos de Montenegro («zarada», «plata» en títulos de búsqueda, «porez», «doprinosi», «PDV», «nijesu», «sedmica»).

**Regla del motor, verificada:** `scripts/reglas_idioma.ts` solo atrapa lo ijekavski si el locale no termina en `-ME` (línea 390). `check_textos_paises me` pasó 827 textos con «mjesec», «vrijeme», «cijena». Las palabras del croata se siguen atrapando también en `-ME`.

**Lo que queda en ekavski:** las 40 universales y el marco del sitio (inicio, legales, errores) son del motor, escritos en ekavski. Una página de Montenegro mezcla locales en ijekavski con universales en ekavski. D23 prevé que Montenegro las pise con una edición: no la hice porque son 40 traducciones y queda fuera de `src/paises/me` solo en parte. Para decidir antes de publicar.

## Calculadoras: 18 locales + 40 universales = 58

| slug | concepto | publicable | motivo |
|---|---|---|---|
| kalkulator-plate | sueldo-neto | sí | contrastado con MONSTAT; `mundo` declarado |
| bruto-iz-neta | propio | sí | |
| trosak-poslodavca | costo-empleador | sí | |
| minimalna-zarada | salario-minimo | sí | 600 y 800 neto, Zakon o radu, art. 101 |
| porez-na-dohodak | impuesto-renta | sí | |
| obracun-doprinosa | aportes-seguridad-social | sí | |
| godisnji-odmor | vacaciones | sí | |
| otpremnina | indemnizacion-despido | sí | promedio nacional del semestre desde la serie MONSTAT |
| otkazni-rok | preaviso | sí | |
| prekovremeni-rad | horas-extra | sí, con riesgo | ver OKU abajo |
| bolovanje | propio | sí | texto de 2024; división por 30 días declarada como estimación |
| porodiljsko-odsustvo | propio | **no, borrador** | sin casos, ver abajo |
| porez-za-preduzetnike | regimen-simplificado | sí | tributación real; la escala del paušal no entra |
| kalkulator-pdv | iva | sí | reemplaza a la universal `pdv-kalkulator` |
| porez-na-promet-nepokretnosti | propio | sí | 3, 5 y 6 % |
| porez-na-nepokretnosti | propio | sí | da el rango; la tasa exacta es de cada municipio |
| kalkulator-inflacije | inflacion | sí | IPC MONSTAT desde 2016 |
| prosjecna-zarada | propio | sí | sumada por demanda, no estaba en el encargo |

Universales: `"todas"`. Cae solo la de IVA, por haber local del mismo concepto. Sin `tipo de cambio` local: el país usa euro.

## Datos

47 datos (45 tramos verificados, 2 pendientes) y 3 series, leídos el 31/10/2026.

**Fuentes leídas:** textos refundidos en gov.me y sitios de organismos (Zakon o radu hasta Sl. list 51/26; Zakon o doprinosima hasta 160/25; Zakon o porezu na dohodak hasta 133/25 más las leyes 160/25 y 70/26; Uputstvo de cálculo; Zakon o obaveznom zdravstvenom osiguranju), páginas de Uprava prihoda i carina en gov.me, Službeni list, MONSTAT. Los refundidos son del «Katalog propisa» de un editor privado, publicados en sitios oficiales: los cité como tales en el título de la fuente.

**poreskauprava.gov.me no resuelve DNS** (ENOTFOUND): la administración es hoy Uprava prihoda i carina, en gov.me. fzocg.me y fondpio.me no hicieron falta salvo la decisión de la pensión mínima (456 euros), que no cargué porque ninguna calculadora la usa.

**Corrección a tu encargo:** el programa cambió el PDV a 21/15/7, como pediste verificar. El 15 % sale de la Poreska praksa (art. 24a, desde 2025). La página general de gov.me sigue diciendo solo 21 y 7: está desactualizada. La ley de PDV de Sl. list 104/26 se aplica recién desde el ingreso a la UE, según la propia Uprava.

**No verificado:**
- `me.porodiljsko-staz-12` y `me.porodiljsko-gornja-granica`: solo leí el art. 51 del Zakon o socijalnoj i dječjoj zaštiti en un refundido de 2022, sin las reformas posteriores. La calculadora queda en borrador, sin casos. Los días de licencia (98) sí están verificados en el Zakon o radu.
- **Prirez, tasa por municipio:** no hallé decisión oficial de ningún municipio ni el texto vigente del Zakon o finansiranju lokalne samouprave (el enlace de skupstina.me da 404). Por eso no es un dato: es un campo que completa la persona, con 13 de valor inicial, y la ayuda dice que es solo un punto de partida. El mecanismo sí está leído (Uputstvo, art. 6). El 13 se sostiene por el contraste con MONSTAT de abajo, no por una norma.
- **Najviša godišnja osnovica de PIO (art. 14):** no hallé el acto de 2026. No se carga ni se aplica: el cálculo no tiene tope y lo dice en la FAQ y en una observación para sueldos altos.
- **Najniža mjesečna osnovica (art. 9):** la fija el convenio colectivo, sin monto leído. No se aplica. Puede importar en jornadas muy cortas: por eso `kalkulator-plate` no tiene campo de jornada parcial.

**Para mirar:**
- **Contraste real:** con 13 % de prirez, bruto 1.245 da 1.042,23 de neto; MONSTAT publica 1.043. Bruto 1.238 da 1.037,15; MONSTAT, 1.037. El bruto de 600 neto da 670,39, igual al dato de Eurostat que leí en prensa.
- **Opšti kolektivni ugovor (40 / 40 / 150 / 80 %):** los porcentajes salen del art. 15 citado por el ministerio en sus respuestas sobre el salario mínimo. No leí el texto de Sl. list 150/22. La saglasnost de Sl. list 45/26 lo extiende solo **hasta el 30/4/2026** y no hallé qué rige después. El dato figura como verificado y la FAQ lo avisa, pero hay que confirmarlo antes de publicar `prekovremeni-rad`. Si no se confirma, esa calculadora debería pasar a borrador.
- `me.fond-rada` (0,2 %) sale de la página del Fondo en gov.me. El Uputstvo también lo trae, pero conserva el 5,5 % de PIO ya derogado, así que no lo usé como fuente de tasas.
- **La contribución a la Cámara de Comercio no se incluye.** No la verifiqué; el costo del empleador puede quedar corto si aplica.
- `bolovanje`: refundido de 2024; un acta del Fondo menciona una propuesta de bajar los 60 días a 30. No figura como ley.
- `porez-na-promet-nepokretnosti`: la exención de primera vivienda (20 m² por miembro) es de un refundido viejo, y el número de artículo del obligado también (art. 6 en ese texto, mientras la ley 33/26 llama art. 6 a otro). La FAQ lo dice.
- La serie `me.ipc` **no se actualiza sola:** MONSTAT la publica en xls y `Http` no lo lee. `check_paises` avisa que deja de ser publicable antes del 1/12/2026. Hay que cargar cada mes el valor, o el detector solo avisa.

## Detectores y prueba real

`scripts/paises/me/probar_detectores.ts`, corrido contra las fuentes:

| detector | resultado |
|---|---|
| me.zarada-neto-monstat | 16 puntos, último 09/2026: 1.043 |
| me.zarada-bruto-monstat | 15 puntos, último 09/2026: 1.245 |
| me.cpi-monstat | 0 hallazgos (norma: avisa de una base nueva) |
| me.poreski-propisi | 0 hallazgos (número de Sl. list en la página de nuevas leyes) |

No se probó el camino con hallazgo contra una publicación real. MONSTAT publica el HTML de sueldos desde agosto de 2026 (jun y jul dan 404); la abreviatura `Okt` es una suposición hasta la próxima publicación. `me.cpi-monstat` declara `me.prosjecna-bruto-2025` en `datos` porque el check no admite vacío y la serie no es un dato.

## Checks (con me registrado localmente)

- `tsc --noEmit -p .`: sin errores.
- `check_paises me`: OK, 58 calculadoras, 1 aviso (el de la serie IPC).
- `check_paises_casos me`: 65 casos en 17 archivos.
- `check_textos_paises me`: 827 textos, 0 avisos.
- `check_seo_pais me`: OK, 0 avisos.
- `check_ofertas_intl me`: OK.
- `check_fronteras`, `check_eol`: OK.

**No corrido:** `next dev`, porque Turbopack no acepta la junction de node_modules; las páginas no se miraron renderizadas. `check_motor` tampoco se corrió en esta tanda.

## Riesgos

- Los textos los escribió un no nativo. D23 pide revisión por hablante nativo, y acá además hay mezcla de variantes con las universales.
- Los slugs salen de términos de leyes y búsquedas conocidas, **sin verificar en el autocompletar de Google Montenegro**: no tengo acceso a Google del país.
- El límite de 65 % de oraciones compartidas no se midió contra Serbia, porque `claude/pais-rs` no está en esta rama. Los textos se escribieron aparte, pero conviene mirarlo al integrar ambos.
- `kalkulator-plate` usa `mundo` con prirez de 13 %, que no es un valor legal.
- `otpremnina`: el promedio nacional del semestre se calcula con datos mensuales de MONSTAT; no es un promedio semestral publicado. Calcula solo el caso general (no invalidez) y no el impuesto sobre el excedente.
- `porez-za-preduzetnike` pide el dohodak ya calculado y no incluye la escala del paušal (en el Pravilnik es una imagen; además el Pravilnik es de 2022 con límite de 18.000 y la ley ya dice 30.000).
