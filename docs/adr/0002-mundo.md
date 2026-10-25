# ADR 0002: calcularya.com en todos los países del mundo

| Campo | Valor |
|---|---|
| Estado | Aceptado (en ejecución) |
| Fecha | 2026-10-13 |
| Pedido | Manuel: replicar la experiencia de calcular.ar en cada país del mundo, 40 a 60 calculadoras o más por país, algo para vender en cada calculadora (PayPal), métricas por país en su perfil |
| Base | ADR 0001 (multi-país LATAM), PR #28 (paridad), PR #30 (auditoría) |

## 1. Contexto

Hoy hay 16 países en español con unas 620 calculadoras, todas legales o impositivas, con datos
verificados en fuente primaria. calcular.ar tiene 83 familias de herramientas y ninguna es
universal. El motor soporta `es` y un `pt` parcial; ofertas, informes, planillas y mails están
solo en español. El build prerenderiza todo (1.111 páginas en 30 s) y tiene costos cuadráticos que
no aguantan 10.000 páginas.

## 2. Decisiones

### D1. Dos capas de calculadoras por país

1. **Universales** (`src/motor/universales/<id>/`): 41 calculadoras que no dependen de una ley
   (préstamo, hipoteca, interés compuesto, presupuesto, margen, IMC, fechas, combustible, obra...).
   Se escriben una vez, con textos por idioma y trato, y cada país las instancia con su moneda,
   locale, escala de montos y sistema de unidades. Tienen concepto propio, así que forman clústeres
   hreflang entre países. Son la base que garantiza 40 calculadoras en cualquier país.
2. **Locales** (`src/paises/<m>/calculadoras/`): las legales del país (IVA, salario mínimo, sueldo
   neto, impuesto a la renta, aportes, indemnización, aguinaldo o 13.º, vacaciones, horas extra...),
   con la misma regla de siempre: dato `verificado` solo si se leyó en la fuente primaria.

Un país no instancia una universal cuyo concepto o slug ya cubre una calculadora local.

**SEO.** Las universales casi iguales entre países del mismo idioma se diferencian con moneda,
formato, montos de ejemplo en la escala local, unidades, nombre del país y hreflang por concepto.
Es la práctica estándar para variantes regionales; el riesgo de contenido duplicado queda acotado
por el clúster hreflang y se mide en Search Console antes de abrir más países del mismo idioma.

### D2. Idiomas

- `Idioma` pasa a ser una lista abierta en `src/motor/tipos.ts` (`IDIOMAS`). Fase 1: `es pt en fr
  de it nl`. Después: `ar` (RTL, D10) `ru tr pl id ms vi th ja ko zh hi ...` a medida que entran países.
- `Trato` se reinterpreta como registro en cualquier idioma: `tu` informal (tú, você, tu, du, you),
  `usted` formal (usted, vous, Sie, Lei, u), `vos` voseo (solo español). Los nombres quedan por
  historia; no se renombra nada.
- Cada diccionario del sitio (motor, sitio, calculadora, inicio, legales, ofertas, informes,
  planillas, mails) se resuelve por idioma y trato. Un idioma entra al sistema cuando tiene todos sus
  diccionarios completos (lo obliga TypeScript).
- La home global (x-default) pasa a inglés.
- `check_textos_paises` aplica reglas por idioma (las de trato del español solo a `es`).

### D3. País y edición

Un país con un idioma usa su código ISO en minúsculas (`/us`, `/br`, `/fr`). Un país con varios
idiomas tiene una edición por idioma: la principal con el código ISO y las demás con sufijo
(`/ca` y `/ca-fr`, `/ch` y `/ch-fr`, `/be` y `/be-fr`). Los datos son del país; la edición
aporta idioma, locale, trato y textos.

### D4. Escala

Para 190 países y unas 10.000 páginas:

- registro con índices (`Map` por país, slug, dato y concepto) y `publicables` memoizado;
- `generateStaticParams` solo para lo más visitado, el resto ISR al primer pedido (`revalidate`);
- cargadores del cliente en dos niveles (un archivo por mercado) y universales con cargador propio;
- lista de países compacta enviada una vez, nombres con `Intl.DisplayNames`, banderas en archivos;
- hreflang al sitemap cuando el clúster pasa de 20 alternativos.

### D5. Ofertas

Cada concepto tiene una familia de producto. Las 9 familias legales actuales siguen; se suman las
de las universales (ver catálogo). El producto base es el **informe**: una página imprimible que
vuelve a correr la calculadora con los números de la persona y suma lo que la página gratis no
muestra (tabla completa, escenarios, plan). Donde aporta, también una **planilla** `.xlsx` con los
números cargados. Precio en USD, de 3 a 9, igual en todos los países por ahora. PayPal es el único
cobro; el proveedor ya es intercambiable (`PAGOS_INTL_PROVEEDOR`).

### D6. Métricas

El panel de `/dashboard` (calcular.ar, solo admin) suma: lista de mercados abierta (cualquier
mercado del registro), embudo por país (vista, cálculo, vio la oferta, clic, checkout, venta),
ingresos consolidados en USD, ranking de 190 países, corte por calculadora y producto, y el `vid`
en el checkout intl para atribuir la venta a la visita. El SQL nuevo va en `supabase/migrations` y
lo aplica Manuel (la base no es accesible desde las herramientas de esta máquina).

### D7. Orden de trabajo

| Ronda | Qué | Bloquea |
|---|---|---|
| 1 | Idiomas del motor · escala · métricas · universales en `es` y `en` | todo lo demás |
| 2 | Integración de universales al registro y la página · ofertas por idioma y familias nuevas · tabla en la página · País y edición | países nuevos |
| 3 | Traducción de universales y diccionarios a `pt fr de it nl` | países de esos idiomas |
| 4+ | Países por tandas, primero por tráfico y monetización: US GB CA AU IN BR ES PT FR DE IT NL ... | |

### D8. Japonés, coreano y chino (2026-10-17)

`IDIOMAS` suma `ja`, `ko` y `zh`. Motor, sitio, inicio, legales, mensajes de error y las 41
universales están en los tres. Las ofertas no (ver abajo).

**Trato.** Cada idioma tiene un solo registro para la web y sus mercados van con `trato: "usted"`.
Los diccionarios lo escriben en `base`, sin parches.

| Idioma | Registro | Por qué |
|---|---|---|
| ja | です/ます (丁寧語), sin «あなた» | Es el registro estándar de sitios de servicio; el sujeto se omite. Nada de 尊敬語 recargado ni de 常体 (だ／である). |
| ko | 해요체 | El de los servicios digitales coreanos (bancos y fintech incluidos): cortés y cercano. Sin 합니다체 ni 반말. Detrás de un valor variable no va partícula que dependa de la última sílaba (이/가, 을/를); la frase se arma con partículas fijas (의, 에, 씩) o con dos puntos. |
| zh | 您 en todas las variantes | Es el trato de servicios, bancos y gobierno tanto en Taiwán y Hong Kong como en China continental. |

**Variantes del chino.** Base en tradicional (zh-TW, y zh-HK por defecto) y parche `regional` completo
para `zh-CN` y `zh-SG` en simplificado (`src/motor/i18n/escritura.ts`). El simplificado está escrito
a mano frase por frase, con el vocabulario de allá (数据, 账户, 工资, 房贷, 增值税), nunca convertido.
Las universales tienen un solo `textos/zh.ts` y `contenido/zh.ts` con las dos escrituras
(`universales/comun/chino.ts`); Hong Kong cambia solo donde el vocabulario difiere (按揭/首期 en vez de
房貸/頭期款, 差餉, 平方呎). Comillas: 「」 en ja y en chino tradicional, “” en simplificado (norma
GB/T 15834). `resolverLegales` ahora aplica también el parche regional.

**Slugs.** ja, ko y zh usan el slug en inglés de las universales (columna `en` del catálogo). La
romanización del japonés y del coreano es larga y poco legible, y el pinyin sin tonos es ambiguo;
el slug en inglés es corto, estable y ya está curado. zh-TW, zh-HK y zh-CN comparten slug. Para las
calculadoras locales de esos países: término en inglés si se usa, y si no la romanización estándar
(Hepburn sin macrones, Revisada para el coreano, pinyin sin tonos), por ejemplo `furusato-nozei`.

**Formato.** Intl de ja-JP, ko-KR, zh-TW, zh-HK y zh-CN. Unidades de tiempo sin plural y pegadas al
número (3日, 3개월, 3個月/3个月). `parsearNumero` normaliza los dígitos de ancho completo del IME y
lee las unidades de 10⁴ que se escriben a mano (3万, 1億2000万, 5천만, 12萬): sin eso «3万» daba 3.

**Largos de SEO.** Title (60) y description (70 a 160) se miden en ancho visual: un carácter CJK
cuenta doble (`src/motor/ancho.ts`), porque así corta Google. En textos latinos no cambia nada.

**Reglas de texto** (`scripts/reglas_idioma.ts`): sin exclamaciones; ja y zh sin puntuación de ancho
medio pegada a texto CJK (。、，：？（）); ja sin，．ni comillas latinas, sin 常体 y sin «あなた»; ko sin
puntuación de ancho completo, sin 합니다체 ni 반말; zh sin «你» y con control de escritura (caracteres
simplificados en zh-TW/HK y tradicionales en zh-CN, comillas de la otra variante).

**Tipografía.** Sin descargar fuentes CJK: Geist sigue para latín y cifras, y los ideogramas y el
hangul caen en la fuente del sistema de cada escritura (Hiragino/Yu Gothic/Meiryo, Apple SD Gothic
Neo/Malgun Gothic, PingFang TC/HK/SC, Microsoft JhengHei/YaHei), con Noto Sans JP/KR/TC/HK/SC de
respaldo si está instalada. `line-break: strict` en ja y zh, `word-break: keep-all` en ko, tracking 0
en títulos CJK. El peso de las páginas latinas no cambia.

**Ofertas.** El diccionario de venta (`src/lib/pagos/textos`) está en ja, ko y zh. El chino tiene
dos diccionarios completos (`zh.ts` tradicional y `zh-hans.ts` simplificado) y las funciones de venta
reciben el locale del mercado para elegir. La carta del informe usa puntuación de ancho completo en ja y
zh (`informe.anchoCompleto`); en coreano la carta va en 합니다체, que es el registro de una carta formal
(`check_ofertas_intl` la exime de la regla del 해요체).

**Prueba.** `zz-ja` (Zetaland en japonés) es una edición interna como `zz-en`. `check_universales`
prueba ja-JP, ko-KR, zh-TW, zh-HK y zh-CN, con nombres de país largos.

### D9. Polaco, sueco, danés, noruego y finés (2026-10-24)

`IDIOMAS` suma `pl`, `sv`, `da`, `nb` y `fi`. Motor, mensajes de error, calculadora, sitio, inicio,
legales, compartir, embed, «Tu sueldo en el mundo» y el diccionario de venta completo (ofertas,
informes, planillas y mails) están en los cinco. Las 41 universales no: las escriben las ramas
`claude/mundo-trad-<idioma>`, que solo crean `textos/<idioma>.ts` y `contenido/<idioma>.ts`; el
cableado lo hace `gen_idiomas_universales`. Hasta que entren, un mercado de estos idiomas no tiene
universales (`universales: "todas"` toma las que tienen textos en el idioma).

**Trato.** Un solo registro informal por idioma, el de los bancos y servicios digitales del país. Los
mercados van con `trato: "tu"` y los diccionarios escriben solo `base`, sin parches.

| Idioma | Registro | Por qué |
|---|---|---|
| pl | Ty implícito: imperativo y 2.ª persona sin pronombre («Sprawdź», «Twoje wynagrodzenie»), formas impersonales donde suena mejor («liczy się», «można») | PKO BP, mBank, ING y los servicios de gobierno en línea tutean o usan impersonales; «Pan/Pani» suena a carta de oficina y obliga a elegir género. |
| sv | du | Es el trato universal en Suecia (du-reformen); «Ni» de cortesía se lee anticuado. |
| da | du | El de bancos y del Forbrugerrådet Tænk; «De» formal casi no se usa. |
| nb | du | El de DNB, Sbanken, Forbrukerrådet y NAV. |
| fi | sinä implícito: imperativo de 2.ª persona singular y sufijos posesivos («Laske», «palkkasi»), pasiva donde suena natural («lasketaan») | El de OP, Nordea y S-Pankki; Vero.fi usa formas impersonales. Nada de teitittely (Te, -kaa). |

**Gramática del país.** sv, da y nb no declinan: «i Sverige», «för Sverige». pl declina por tabla y
terminación («dla Polski», «w Polsce», «na Litwie»). fi declina y no usa preposiciones:
`GRAMATICA.fi.de` y `.para` dan el genitivo, que va delante del sustantivo («Suomen laskurit»), y
`.en` el caso de lugar completo («Suomessa», «Maltalla»). Tabla para compuestos, plurales y los que
van con adesivo (islas, Venäjä); el resto por regla (gradación nti/lta/kk/tt/pp, -in tras consonante,
armonía vocálica de la última palabra). Donde un valor variable no encaja en un caso, la frase lo deja
en nominativo detrás de dos puntos («Taulukot ja raportit: {pais}»).

**Formato.** Intl de pl-PL, sv-SE, sv-FI, da-DK, nb-NO y fi-FI. `parsearNumero` acepta el signo menos
de Unicode (U+2212), que es como Intl escribe el negativo en sv, nb y fi, y el espacio duro de miles.
Unidades de tiempo con `Intl.PluralRules`: en polaco las categorías few y many (2 dni, 5 lat) y el
genitivo singular para fracciones (1,5 roku); en finés partitivo singular tras todo número distinto
de 1 (3 päivää, 1,5 vuotta).

**Slugs.** Latinos en ASCII, con la palabra que se busca en cada idioma y sin diacríticos
(ł → l, ą → a, å → a o aa en danés, ø → o, ä → a, ö → o). «Tu sueldo en el mundo»:
`wynagrodzenie-na-swiecie`, `lon-i-varlden`, `lon-i-verden`, `lonn-i-verden`, `palkka-maailmalla`.
Las páginas que trajo main después (24/10, bb530d7a), en el mismo orden pl, sv, da, nb, fi:
calendario `kalendarz-placowy`, `lonekalender`, `lonkalender`, `lonnskalender`, `palkkakalenteri`;
horas de trabajo `ile-godzin-pracy`, `arbetstimmar`, `arbejdstimer`, `arbeidstimer`, `tyotunnit`;
rankings `ranking-krajow`, `landsrankning`, `landerangliste`, `landrangering`, `maiden-vertailu`;
«Sueldos reales» `prawdziwe-zarobki`, `verkliga-loner`, `rigtige-lonninger`, `faktiske-lonninger`,
`todelliset-palkat`. Los tres rankings llevan slug propio en cada idioma (no el inglés, que D8 usa
solo para escrituras no latinas), y el del día de liberación fiscal repite el nombre que ya usaba
«Tu sueldo en el mundo»: `dzien-wolnosci-podatkowej`, `skattefrihetsdagen`, `skattefridag`,
`skattefridagen`, `verovapauden-paiva`. En horas, sv, da y nb nombran el producto con artículo
indefinido («en iPhone 17») y pl y fi en nominativo; en «Sueldos reales», pl y fi dejan
{ocupacion} en nominativo (tras dos puntos) para no declinarla.

**Reglas de texto** (`scripts/reglas_idioma.ts`, sobre la página entera en las universales): sin
exclamaciones ni rayas, y se atrapa el registro formal que se cuela: pl «Pan/Pani/Państwo» (por eso
«państwo» como Estado va en minúscula), sv «Ni/Er» con mayúscula a mitad de frase, da y nb
«De/Dem/Deres» con mayúscula a mitad de frase, fi «Te/Teidän/Teille...» con mayúscula y el
imperativo plural de los verbos de formulario (no se busca -kaa suelto: «aikaa» es partitivo).

**Prueba.** Ediciones internas `zz-pl`, `zz-sv`, `zz-da`, `zz-nb` y `zz-fi` (Zetaland, Zetalandia,
Zetamaa) con locale `<idioma>-001`, como `zz-ja`. `check_universales` prueba pl-PL, sv-SE, sv-FI,
da-DK, nb-NO y fi-FI (con Suomi, Malta por el adesivo y San Vicente por el nombre largo).

### D10. Árabe y escritura de derecha a izquierda (2026-10-24)

(D9 queda para el motor europeo pl/sv/da/nb/fi, que corre en paralelo en `claude/mundo-motor-eu`.)

`IDIOMAS` suma `ar`. Motor, sitio, inicio, novedades, legales, mensajes de error, compartir, embed,
«Tu sueldo en el mundo», el calendario laboral, «¿Cuántas horas de trabajo cuesta?», los rankings de
países, «Sueldos reales», los enlaces de afiliados y el diccionario de venta están en árabe. Las 41
universales las escribe aparte `claude/mundo-trad-ar`.

**Registro.** Un solo registro para la web, el árabe estándar moderno (فصحى) de los bancos y los
portales de gobierno del Golfo y de Egipto, y los mercados van con `trato: "usted"`. Se le habla a la
persona en segunda persona del singular en masculino genérico (اختر، أدخل، تعمل), que es lo que hacen
esos sitios; donde se puede, la frase va impersonal para no marcar género (تم النسخ، يُفتح). Nada de
dialecto, ni de «يا», ni de fórmulas de venta. Excepciones: la carta del informe va en primera persona
y con el tono de un escrito formal, y la familia de embarazo le habla en femenino a la persona
gestante (خذي، اسألي), como los sitios de salud en árabe.

**Dirección.** `src/motor/i18n/direccion.ts` decide la dirección por idioma (`ar` es rtl), no por
mercado. El layout intl pone `dir` y `lang` en `<html>`; `lang`, `hreflang`, `og:locale` e
`inLanguage` van con la etiqueta base (`ar-EG`), sin las extensiones del locale. Las hojas de estilo
del motor, de la oferta, del mundo y del puente de compartir usan propiedades lógicas (`inset-inline`,
`padding-inline`, `text-align: end`); las flechas de avance se espejan en rtl (`scale: -1 1`) y los
empujones de hover van hacia la izquierda, mientras que la flecha externa y los chevrons de acordeón no
se espejan. La carta del informe aísla el monto con `<bdi>` y el mail lleva `dir="rtl"` en `<html>` y
en la tabla del contenido (Gmail y Outlook descartan el primero). Las hojas que trajo main después
(calendario, horas, rankings, sueldos reales) siguen la misma regla; en rtl sus barras se llenan desde
la derecha, salvo la barra de rango de «Sueldos reales», que es un eje de montos y va de izquierda a
derecha en todos los idiomas. Lo que el código pone entre dos textos (nombre y fecha, una lista de
organismos) va con `coma()` y `puntoYComa()` de `direccion.ts`: «، » y «؛ » en árabe.

**Cifras.** Los mercados árabes muestran dígitos occidentales (0-9): el locale lleva
`-u-ca-gregory-nu-latn` (por ejemplo `ar-EG-u-ca-gregory-nu-latn`). Es lo que usan la banca en línea y
los portales de servicios de Arabia Saudita, Emiratos y Egipto, lo que se ve en los recibos de sueldo y
en las facturas electrónicas, y evita mezclar dos sistemas en una página con montos, porcentajes y
códigos en cifras latinas. Sin `nu-latn`, Intl daría dígitos arábigo-índicos en ar-EG y ar-SA y latinos
en ar-AE. El calendario es el gregoriano, el de los plazos laborales y fiscales que calculan las
calculadoras. `parsearNumero` sí acepta lo que escribe un teclado árabe: dígitos arábigo-índicos y
persas (٣٬٥٠٠٫٧٥), el ٫ decimal, el ٬ de miles y la coma «،».

**Plurales y gramática.** El árabe tiene seis categorías (Intl.PluralRules: zero, one, two, few, many,
other) y el sustantivo cambia en cada una: `FormasAr` y `pluralAr` en `src/motor/i18n/arabe.ts`
(يوم واحد، يومان، 3 أيام، 11 يومًا، 100 يوم). Las unidades de tiempo traen esas formas con `{n}` donde va
el número, porque el dual («يومان») no lo lleva. Detrás de «بـ» el dual va en genitivo (بيومين).
`GRAMATICA.ar`: la pertenencia va por idafa («حاسبات مصر»), «في» para el lugar y «ل» pegada al nombre
(«للسعودية» cuando el nombre lleva artículo).

**Tipografía.** Noto Sans Arabic por `next/font`, que se baja solo en páginas con texto árabe; Geist
sigue para el latín y las cifras. En árabe el interlineado sube a 1.7 y no hay `letter-spacing` en
ningún elemento (separa las letras ligadas).

**Slugs.** Las universales usan el slug en inglés del catálogo (columna `en`), como D8: la
transliteración del árabe no tiene un sistema que la gente escriba (rawatib, rawateb, ratib), un slug en
letras árabes viaja codificado en porcentaje y en el Golfo mucha gente busca estas calculadoras en
inglés («end of service calculator», «salary calculator»). Las calculadoras locales siguen la misma
regla: término en inglés si se usa, y si no la transliteración simple sin diacríticos. Las páginas con
una carpeta por idioma no pueden repetir la del inglés y van con la transliteración, como las de ja, ko
y zh: «Tu sueldo en el mundo» en `rawatib-alalam` (رواتب العالم), el calendario en `taqwim-alrawatib`
(تقويم الرواتب), las horas de trabajo en `saat-alamal` (ساعات العمل), los rankings en `tartib-alduwal`
(ترتيب الدول) y «Sueldos reales» en `rawatib-haqiqiya` (رواتب حقيقية). Los rankings de adentro usan el
slug en inglés (`take-home-pay`, `tax-freedom-day`, `pay-raise`).

**Reglas de texto** (`scripts/reglas_idioma.ts`): sin exclamaciones; puntuación árabe (، ؛ ؟) y no la
latina pegada a una letra árabe; comillas «»; sin dígitos arábigo-índicos en los textos; sin tatweel
de adorno (sí vale detrás de un prefijo de una letra o del artículo delante de algo que no es letra
árabe: «بـ7 أيام», «لـ «راتب»», «الـ7»). `check_ofertas_intl` aplica las mismas reglas al diccionario de
venta y al mail.

**Ofertas.** `src/lib/pagos/textos/ar.ts` está en `IDIOMAS_VENTA`, con las mismas piezas por familia
que el español. Un mercado árabe vende desde el día en que se registra.

**Prueba.** `zz-ar` (زيتالاند) es una edición interna de zz en `ar-001-u-ca-gregory-nu-latn` (árabe sin país, como `en-001` y `ja-001`): con `ar-EG` compartía locale con Egipto y sumaba fallas de hreflang en modo interno.
`check_universales` prueba eg, sa, ma-ar y un nombre de país largo; `check_motor` prueba el parseo
de dígitos arábigo-índicos y los plurales.

### D11. Indonesio (2026-10-24)

D9 (pl, sv, da, nb, fi) y D10 (árabe) están en ramas sin mergear (`claude/mundo-motor-eu`,
`claude/mundo-motor-ar`); esta entrada toma el número siguiente para no chocar al mergear.

`IDIOMAS` suma `id`. Motor, mensajes de error, calculadora, sitio, inicio, legales, compartir, embed,
«Tu sueldo en el mundo» (`gaji-di-dunia`), el diccionario de venta completo (las 27 familias,
`informe-calculo` incluida, informes, planillas y mails) y las 41 universales están en indonesio.

**Trato.** Un solo registro, el de los bancos y servicios digitales de Indonesia (BCA, Mandiri, OJK,
DJP Online): «Anda» con mayúscula, imperativo corto sin «-lah» («Masukkan», «Pilih», «Hitung») y
frases breves. Nada de «kamu», «aku» ni jerga de chat (yuk, dong, aja, nggak), que en una web de
servicio suenan a publicidad o a mensaje entre amigos. «Anda» es la forma de cortesía estándar, por
eso los mercados van con `trato: "usted"`, como ja, ko y zh; los diccionarios escriben solo `base`.
Las cartas del informe van en primera persona formal y las tarjetas para compartir en primera persona
(«Saya»).

**Gramática del país.** El indonesio no tiene artículos ni declinación. `GRAMATICA.id`: el poseedor va
detrás sin preposición (`de(p)` = p: «Kalkulator Indonesia», «pajak Indonesia»), el lugar con «di» y el
destino con «untuk».

**Formato.** Intl de id-ID: miles con punto y decimales con coma («Rp 1.500.000», «1,5 tahun»), igual
que es-CO o de-DE, así que `parsearNumero` no cambia (casos nuevos en `check_motor`). La rupia sale sin
decimales porque así la formatea Intl en id-ID; los ejemplos de las universales usan `montoEjemplo`, que
da cifras redondas en la escala de IDR (millones). Fechas largas «24 Oktober 2026». El indonesio no
marca plural después de un número: las dos formas de cada unidad son iguales («3 hari», «1 tahun») y los
diccionarios no ramifican por n.

**Slugs.** ASCII en indonesio, con la palabra que se busca en Google Indonesia, casi siempre con el
prefijo «kalkulator»: `kalkulator-pinjaman`, `kalkulator-kpr`, `kalkulator-ppn`, `kalkulator-bunga-efektif`,
`kalkulator-bunga-majemuk`, `kalkulator-bunga-tunggal`, `kalkulator-tabungan`, `kalkulator-dana-pensiun`,
`kalkulator-dana-darurat`, `kalkulator-gaji-per-jam`, `kalkulator-kenaikan-gaji`, `kalkulator-bep`,
`kalkulator-roi`, `kalkulator-persen`, `kalkulator-diskon`, `kalkulator-patungan`, `kalkulator-umur`,
`kalkulator-bmi`, `kalkulator-hpl`, `kalkulator-masa-subur`, `kalkulator-listrik`, `kalkulator-keramik`,
`kalkulator-beton`; sin prefijo donde la búsqueda es una frase (`sewa-atau-beli-rumah`,
`biaya-kepemilikan-mobil`, `perbandingan-senilai`, `selisih-tanggal`, `tambah-hari-ke-tanggal`,
`tarif-freelance-per-jam`). «Tu sueldo en el mundo»: `gaji-di-dunia`.

**Universales.** Textos nativos de Indonesia (cicilan, tenor, uang muka, bunga fixed/floating, bunga
efektif frente a bunga flat, PPN, HPP, BEP, HPHT y HPL, sak semen, dus de keramik), sin cifras legales
tipeadas ni organismos: la tasa de `iva` sale del dato del país. Los ejemplos se calculan con las
funciones de cada `definicion.ts`.

**Reglas de texto** (`scripts/reglas_idioma.ts`, sobre la página entera en las universales y en las
ofertas): sin exclamaciones, rayas ni guion como pausa, y se atrapan «kamu/aku/gue/lo», la jerga de
chat, «anda» en minúscula y los posesivos con -mu más comunes (no se busca -mu suelto: «umum», «ilmu»).

**Prueba.** `zz-id` (Zetaland, locale `id-001`) es una edición interna como `zz-ja`. `check_universales`
prueba id-ID con IDR (escala 16000) y «Saint Vincent dan Grenadine» por el nombre largo.

**Puesta al día con main (7d190a68).** Calendario laboral y fiscal (`kalender-gaji`), «¿Cuántas horas de
trabajo cuesta?» (`berapa-jam-kerja`, con el nombre «Berapa jam kerja untuk membelinya?», la frase que
se busca en Indonesia), rankings (`peringkat-negara`: `gaji-paling-bernilai`, `hari-bebas-pajak`,
`sisa-kenaikan-gaji`), «Sueldos reales» (`gaji-sebenarnya`) y afiliados en indonesio. Calendario, horas,
rankings y afiliados impersonales; sueldos con «Anda» en `base`, como el resto del idioma. «Upah minimum»
por salario mínimo (el término general; UMP y UMK son los de cada provincia o ciudad), «iuran» por
aportes y «kiriman» por cada sueldo aportado. Las imágenes OG no suman fuente de respaldo: Geist cubre
el alfabeto latino del indonesio.

### D12. Turco (2026-10-24)

D9 (pl, sv, da, nb, fi), D10 (árabe) y D11 (indonesio) están en ramas sin mergear
(`claude/mundo-motor-eu`, `claude/mundo-motor-ar`, `claude/mundo-motor-id`); esta entrada toma el
número siguiente para no chocar al mergear.

`IDIOMAS` suma `tr`. Motor, mensajes de error, calculadora, sitio, inicio, legales, compartir, embed,
«Tu sueldo en el mundo» (`ulkelere-gore-maas`), el diccionario de venta completo (todas las familias,
`informe-calculo` incluida, informes, planillas y mails) y las 41 universales están en turco.

**Trato.** Un solo registro, el de los bancos y servicios digitales de Turquía (Garanti, İş Bankası,
e-Devlet, GİB): «siz» con las formas corteses en las oraciones («hesaplayın», «girin», «seçin»,
«maaşınız»), nunca «sen». Los botones y enlaces cortos van en imperativo breve («Hesapla», «Kodu
kopyala»), como los botones de esos mismos sitios. Los mercados van con `trato: "usted"`, como ja, ko,
zh e id; los diccionarios escriben solo `base`. Las cartas del informe van en primera persona formal
(«talep ederim») y cierran la oración antes de la cifra con dos puntos («... toplam tutar:»), porque en
turco el verbo va al final. La tarjeta para compartir va en primera persona.

**Gramática del país.** El turco no tiene artículos: el caso va como sufijo detrás del nombre, con
apóstrofo por ser nombre propio. `GRAMATICA.tr`: `nombre(p)` = p; `de(p)` es el genitivo
(«Türkiye'nin», «Almanya'nın», «Peru'nun», «Irak'ın»); `en(p)` el locativo («Türkiye'de», «Almanya'da»,
«Kuveyt'te», «Fas'ta») y `para(p)` = «p için». El sufijo sigue la armonía vocálica de la última vocal y
el locativo endurece la d tras f, s, t, k, ç, ş, h, p. Las siglas se leen por sus letras («ABD'de»,
«BAE'nin»), los compuestos con posesivo toman la n pronominal («Dominik Cumhuriyeti'nde», «Birleşik Arap
Emirlikleri'nin») y la l palatal de Senegal y Nepal pide sufijo de adelante. Los diccionarios no pegan
sufijos a cifras ni a valores interpolados (la armonía dependería de cómo se lee el número): la fecha va
en el medio («24 Ekim 2026 tarihine kadar») y los montos después de dos puntos.

**Mayúsculas.** La i del turco tiene dos letras (i/İ, ı/I): `toUpperCase` daría «Iş» en vez de «İş».
`formato.ts` suma `mayusculaInicial` y `minusculaInicial` con el locale, y las usan el menú, la oferta
secundaria, las planillas y la carta del informe (`toLocaleLowerCase`). Los buscadores (sitio, país,
mundo, embed) pasan la ı a i, que NFD no descompone, para que «kalıp» y «kalip» coincidan.

**Formato.** Intl de tr-TR: miles con punto, decimal con coma, la lira y el porcentaje delante
(«₺1.500.000», «%20»); `parsearNumero` no cambia (casos nuevos en `check_motor`). El informe muestra los
campos de porcentaje con `formatearPorcentaje`, que da «%20» en turco. Fechas largas «24 Ekim 2026». El
sustantivo no va en plural después de un número: las dos formas de cada unidad son iguales («3 gün»,
«1,5 yıl»). `inferir.ts` reconoce «aylık» y «yıllık».

**Slugs.** ASCII en turco (ç ğ ı ö ş ü pasan a c g i o s u), con la búsqueda real de Google Turquía,
casi siempre con el sufijo «hesaplama»: `kredi-hesaplama`, `konut-kredisi-hesaplama`, `kdv-hesaplama`,
`efektif-faiz-hesaplama`, `bilesik-faiz-hesaplama`, `basit-faiz-hesaplama`, `birikim-hesaplama`,
`emeklilik-birikimi-hesaplama`, `kredi-karti-borc-hesaplama`, `butce-hesaplama`,
`acil-durum-fonu-hesaplama`, `arac-masrafi-hesaplama`, `yatirim-getirisi-hesaplama`,
`kar-marji-hesaplama`, `basabas-noktasi-hesaplama`, `freelance-ucret-hesaplama`,
`saatlik-ucret-hesaplama`, `maas-zammi-hesaplama`, `calisma-saati-hesaplama`, `yuzde-hesaplama`,
`yuzde-degisim-hesaplama`, `oran-oranti-hesaplama`, `indirim-hesaplama`, `bahsis-hesaplama`,
`hesap-bolme-hesaplama`, `agirlikli-ortalama-hesaplama`, `yas-hesaplama`,
`iki-tarih-arasi-gun-hesaplama`, `vucut-kitle-indeksi-hesaplama`, `kalori-ihtiyaci-hesaplama`,
`tahmini-dogum-tarihi-hesaplama`, `yumurtlama-donemi-hesaplama`, `kosu-temposu-hesaplama`,
`yakit-hesaplama`, `elektrik-tuketimi-hesaplama`, `boya-hesaplama`, `metrekare-hesaplama`,
`fayans-hesaplama`, `beton-hesaplama`; sin sufijo donde la búsqueda es una frase
(`ev-almak-mi-kira-mi`, `tarihe-gun-ekleme`). «Tu sueldo en el mundo»: `ulkelere-gore-maas`.

**Universales.** Textos nativos de Turquía y neutrales de país (el turco también se usa en el norte de
Chipre): taksit, vade, peşinat, anapara, yıllık nominal y efektif faiz, KDV dahil/hariç, matrah, kâr
marjı, başabaş noktası, kasko, VKİ, son adet tarihi, fire payı, çimento torbası; sin organismos de un
solo país (nada de SGK, GİB, BDDK ni DASK) y sin cifras legales tipeadas: la tasa de `iva` sale del dato
del país. Como en Turquía los bancos anuncian la tasa mensual, la ayuda de crédito y tarjeta dice cómo
pasarla a anual. Los ejemplos se calculan con las funciones de cada `definicion.ts`.

**Reglas de texto** (`scripts/reglas_idioma.ts`, sobre la página entera en las universales y en las
ofertas): sin exclamaciones, rayas ni guion como pausa; se atrapan «sen» y sus formas que no se
confunden con otra cosa (-abilirsin, -iyorsun, -eceksin, -melisin, el condicional -rsen), los posesivos
de «sen» en sustantivos terminados en vocal (kredin, paran, que no chocan con el genitivo), la jerga de
chat, el apóstrofo tipográfico y el porcentaje detrás del número.

**Prueba.** `zz-tr` (Zetaland, locale `tr-001`) es una edición interna como `zz-ja`. `check_universales`
prueba tr-TR con TRY, «Saint Vincent ve Grenadinler» por el nombre largo y «Demokratik Kongo
Cumhuriyeti» por el largo con posesivo.

**Puesta al día con main (7d190a68).** Calendario laboral y fiscal (`maas-takvimi`), «¿Cuántas horas de
trabajo cuesta?» (`kac-saatlik-calisma`, con el nombre «Kaç saat çalışmak gerekir?», la frase que se
busca en Turquía), rankings (`ulke-siralamasi`: `maasin-alim-gucu`, `vergi-ozgurluk-gunu`,
`zamdan-ne-kalir`), «Sueldos reales» (`gercek-maaslar`) y afiliados en turco, con las mismas reglas:
calendario, horas y rankings impersonales, sueldos y afiliados con «siz»; las cifras, fechas y montos
van sueltos o tras dos puntos («Doğrulama tarihi: ...», «Sıra: 3 / 40»). Las imágenes OG no suman
fuente de respaldo: Geist cubre ç, ğ, ı, İ, ö, ş y ü.

### D14. Bengalí (2026-10-24)

D9 a D13 los usan otras ramas sin mergear (pl/sv/da/nb/fi, árabe, indonesio y los frentes que siguen);
esta entrada toma el 14 para no chocar al mergear. Pensada para Bangladés (bn-BD); sirve también para
Bengala Occidental (bn-IN) sin cambios en el motor.

`IDIOMAS` suma `bn`. Motor, mensajes de error, calculadora, sitio, inicio, legales, compartir, embed,
«Tu sueldo en el mundo» (`bishwe-beton`), el diccionario de venta completo (las 27 familias,
`informe-calculo` incluida, informes, planillas y mails) y las 41 universales están en bengalí.

**Trato.** Un solo registro, el de los bancos y servicios digitales de Bangladés (bKash, Sonali Bank,
NBR e-Return): «আপনি» con las formas verbales corteses (করুন, দিন, লিখুন, দেখুন, বেছে নিন), sin
«তুমি» ni «তুই». Es la forma de respeto estándar para hablarle a un desconocido; «তুমি» en una web de
servicio suena a publicidad o a trato entre amigos. Los mercados van con `trato: "usted"`, como ja, ko,
zh e id, y los diccionarios escriben solo `base`. Las cartas del informe van en primera persona formal
(«আমি») y las tarjetas para compartir también en primera persona. Vocabulario de allá: বেতন
ক্যালকুলেটর, আয়কর, ভ্যাট, ঋণের কিস্তি (EMI), সুদ, সঞ্চয়পত্র, ঐকিক নিয়ম (la regla de tres de la
escuela). Las universales son neutrales de país (no nombran NBR ni Bangladesh Bank).

**Cifras.** Los montos visibles van con dígitos bengalíes (০-৯), como en las páginas en bangla de NBR,
Bangladesh Bank y los bancos del país, y como formatea Intl de bn-BD por defecto (numberingSystem
`beng`). No hay extensión `-u-nu-latn` como en el árabe (D10): en Bangladés los dígitos latinos son de
las páginas en inglés. Miles en lakh y crore (৳ detrás, como CLDR: «২৫,০০,০০০৳»), decimal con punto.
Para lo que llega como número suelto (un año, un contador, el argumento de una función de diccionario)
está `cifrasBn` (`src/motor/i18n/bengali.ts`), idempotente; todo diccionario bn la aplica a cada
parámetro. Los resultados de formato `texto` y las celdas de texto de las tablas pasan por
`textoDelLocale` (el ritmo «৫:৩০» de `ritmo-de-carrera`).

**Parseo.** `parsearNumero` pasa a ASCII los dígitos ০-৯ que escribe un teclado bengalí (Avro, Bijoy,
Gboard) antes de las reglas; los separadores de bn son los latinos, así que el resto no cambia. Se
aceptan lakh («১২,৩৪,৫৬৭.৫০») y grupos de a tres («১,২৩৪.৫»), y `conLakhs` reconoce bn-BD aunque Intl
devuelva dígitos bengalíes. `sugerenciaMiles` responde con los dígitos que escribió la persona («৫.০০০»
da «৫০০০»). Casos en `check_motor`.

**Plural y gramática.** El bengalí no flexiona el sustantivo detrás de un número (৩ দিন, ১ বছর, ১.৫
বছর): las dos formas de cada unidad son iguales, separadas del número por un espacio. `GRAMATICA.bn`
pega el sufijo de caso al nombre del país: genitivo «-এর» tras consonante y «-র» tras vocal
(বাংলাদেশের, কানাডার), locativo «-এ», «-য়» tras «া» y «-তে» tras las demás vocales (বাংলাদেশে,
কানাডায়, ইতালিতে), y el destino es el genitivo con «জন্য».

**Slugs.** El slug en inglés del catálogo para las 41 universales, como D8 (`loan`, `bmi`, `vat`,
`age`...). En Bangladés las búsquedas de calculadoras en alfabeto latino son en inglés («loan
calculator», «emi calculator», «age calculator»), y una transliteración (`boyos-calculator`,
`sud-calculator`) sería larga, con grafías que compiten entre sí y sin un estándar de uso. Los títulos,
h1 y FAQ sí van con la búsqueda en bengalí («লোন ক্যালকুলেটর», «বয়স ক্যালকুলেটর»). Para las
calculadoras locales del país: el término en inglés que usa el sitio oficial (`income-tax`, `vat`,
`sanchayapatra` solo si el agente de país lo encuentra así en las búsquedas). «Tu sueldo en el mundo»:
`bishwe-beton` (transliteración de «বিশ্বে বেতন», como las romanizaciones de D8 para esa página).
Las piezas que sumó main después (24/10) siguen esa transliteración: rankings en `desher-ranking`
(`kothay-beton-beshi-chole`, `kor-mukti-dibos`, `beton-briddhir-koto-thake`), horas de trabajo en
`koto-ghonta-kaj`, calendario en `beton-calendar` y sueldos reales en `asol-beton`. Los productos del
índice de horas van en bengalí (আইফোন ১৭, ম্যাকবুক এয়ার), como se escriben en la prensa del país.
Los `rellenar` de plantillas con {marcas} (horas, sueldos y los textos de mundo en el navegador) pasan
a dígitos bengalíes los valores cuando la plantilla está en bengalí (`valorPara`); el resto de los
idiomas queda igual.

**Largos de SEO.** `anchoVisual` (`src/motor/ancho.ts`) mide el bengalí con los avances de Nirmala UI
contra Arial: una letra o un dígito bengalí vale 1,5; el hasanta y los signos que van sobre o bajo la
letra (ু, ূ, ৃ, ঁ, nukta) valen 0; los signos vocálicos del costado (া, ি, ী, ে) y ং, ঃ valen 0,5, y
«ো», «ৌ», que rodean la consonante, 1,5. Con `.length` cada signo contaba como una letra y los
conjuntos como tres. En una muestra de títulos el modelo queda a menos de 10 % del ancho medido glifo por glifo. En
textos latinos y CJK no cambia nada (los signos combinantes sueltos valen 0 en cualquier escritura).

**Reglas de texto** (`scripts/reglas_idioma.ts`, sobre la página entera en universales, sitio y
ofertas): sin exclamaciones; la oración cierra con el dari «।» (un punto latino tras letra bengalí,
dígito, % o paréntesis es falla), sin espacio antes del dari y con espacio después; sin cifras latinas
sueltas (una cifra latina delata un número que no pasó por Intl ni por `cifrasBn`); sin «তুমি», «তুই»
ni sus formas, ni los imperativos de তুমি (করো, দাও, দেখো). No se buscan «নাও» («নাও হতে পারে») ni
«কর», que es «impuesto». `check_i18n` llama las funciones de bn con «৭» de muestra en vez de «7».

**Tipografía.** Sin descargar fuentes: Geist para el latín y la fuente del sistema para el bengalí
(Noto Sans Bengali en Android y Linux, Kohinoor Bangla en macOS e iOS, Nirmala UI y Vrinda en
Windows). Títulos sin tracking negativo y con interlineado 1,35 por los signos que suben y bajan. La
imagen OG de «Tu sueldo en el mundo» pide Noto Sans Bengali por los glifos, pero Satori no reordena
los signos vocálicos: la tarjeta en bn puede salir con algún conjunto mal armado. La carta del informe
cierra con `nota.puntoFinal` («।»).

**Prueba.** `zz-bn` (Zetaland, locale `bn-001`) es una edición interna como `zz-ja`.
`check_universales` prueba bn-BD con BDT (escala 120) y «সেন্ট ভিনসেন্ট ও গ্রেনাডিনস» por el nombre
largo.

**Pendiente para el país.** En Bangladés el viernes es día de descanso (y el sábado también en la
administración pública), y `dias-entre-fechas` y `sumar-dias` cuentan días hábiles de lunes a viernes: los textos bn lo
advierten, y el agente de país tiene que decidir si suma una opción de fin de semana al motor.

### D13. Tailandés (2026-10-24)

D9 a D12 los usan otras ramas sin mergear (`claude/mundo-motor-eu`, `claude/mundo-motor-ar`,
`claude/mundo-motor-id` y la que siga); esta entrada toma el D13 para no chocar al mergear.

`IDIOMAS` suma `th`. Motor, mensajes de error, calculadora, sitio, inicio, legales, compartir, embed,
«Tu sueldo en el mundo», el calendario laboral, «¿Cuántas horas de trabajo cuesta?», los rankings de
países, «Sueldos reales», los enlaces de afiliados, el diccionario de venta completo (todas las
familias, `informe-calculo` incluida, informes, planillas y mails) y las 41 universales están en
tailandés.

**Trato.** Un solo registro, el de los bancos y servicios digitales de Tailandia (SCB, Kasikorn,
กรมสรรพากร): cortés y neutro. Sin pronombre de segunda persona (ni คุณ ni ท่าน): el tailandés omite el
sujeto con naturalidad y, cuando hace falta, se usa el rol (ผู้กู้, ลูกจ้าง, ผู้ซื้อ). Sin partículas de
cortesía (ครับ/ค่ะ), que marcan el género de quien habla y en una interfaz suenan a chat. «กรุณา» para
pedir algo («กรุณากรอกตัวเลข»), imperativo corto en botones y etiquetas («คำนวณ», «เลือกประเทศ»). Los
mercados van con `trato: "usted"`, como ja, ko, zh e id, y los diccionarios escriben solo `base`. La
carta del informe usa «ข้าพเจ้า», la primera persona formal sin género.

**Gramática del país.** Sin artículos ni declinación. `GRAMATICA.th`: «ของ» para el poseedor, «ใน» para
el lugar y «สำหรับ» para el destino, pegados al nombre como se escribe («ในประเทศไทย», «สำหรับไทย»).

**Puntuación y espacios.** El tailandés no separa palabras con espacios: el espacio separa frases y
oraciones, y la oración no lleva punto ni signo de pregunta al final (las preguntas terminan en
อะไร, อย่างไร, เท่าไร, ไหม o หรือไม่). Las abreviaturas con punto sí van (พ.ศ., ต.ค., กม., ตร.ม.).
«ๆ» con espacio antes y después, como recomienda la ราชบัณฑิตยสภา (อื่น ๆ). Comillas “”.

**Formato.** Intl de th-TH: cifras arábigas (no los dígitos tailandeses, que la web de servicios casi no
usa), miles con coma y decimales con punto («฿1,234.50», «1.5 ปี»). Unidades sin plural y separadas por
un espacio («3 วัน»). `parsearNumero` pasa los dígitos tailandeses a arábigos y lee las palabras de unidad
con que se escriben montos a mano («2.5 ล้าน», «1 ล้าน 5 แสน», «3 หมื่น»): sin eso «2 ล้าน» daba 2, un
error de un millón de veces, como pasaba con 万 en D8.

**Calendario.** Las fechas visibles van en พุทธศักราช (พ.ศ., año gregoriano + 543), como en los sitios
del gobierno (กรมสรรพากร, ราชกิจจานุเบกษา) y en los resúmenes de los bancos; el año fiscal, la edad y
los plazos se piensan en พ.ศ. No hace falta `-u-ca-buddhist`: es el calendario por defecto de `th` en
Intl (con o sin región, también en `th-001`), así que todo `Intl.DateTimeFormat(locale)` ya lo escribe
(«24 ตุลาคม 2569», «24/10/2569»). Se descartó `-u-ca-gregory` (ค.ศ.) porque obligaba a cambiar el
locale del mercado, que también arma el hreflang, y porque en tailandés el año gregoriano lleva la
marca ค.ศ. y suena a traducción. Los diccionarios que reciben un año como número lo pasan a พ.ศ.
(títulos del país y de novedades, ©, PPA del mundo). Internamente todo sigue en ISO gregoriano.

**Slugs.** Las universales usan el slug en inglés del catálogo, como D8: la romanización del tailandés
(RTGS) es larga y ambigua (no marca tonos ni vocales largas, y casi nadie busca así),
y el slug en inglés es corto, estable y ya está curado. Para las calculadoras locales de Tailandia:
término en inglés si se usa (`vat`, `withholding-tax`), y si no RTGS sin tonos. Las páginas que tienen
una carpeta por idioma no pueden repetir la del inglés, así que van en RTGS, como las de ja, ko y zh:
«Tu sueldo en el mundo» en `ngoen-duean-thua-lok` (เงินเดือนทั่วโลก), el calendario en
`patithin-ngoen-duean` (ปฏิทินเงินเดือน), las horas de trabajo en `chua-mong-tham-ngan` (ชั่วโมงทำงาน),
los rankings en `andap-prathet` (อันดับประเทศ) y «Sueldos reales» en `ngoen-duean-ching` (เงินเดือนจริง).
Los rankings de adentro usan el slug en inglés (`take-home-pay`, `tax-freedom-day`, `pay-raise`).

**Largos de SEO.** `anchoVisual` no cuenta las marcas combinantes (`\p{Mn}`): las vocales de arriba y
de abajo y los tonos se apilan sobre la consonante y no ocupan ancho, aunque en `.length` cuenten. Así
«ภาษีมูลค่าเพิ่ม» mide 10, no 15. En textos latinos en NFC no cambia nada. Los títulos usan las búsquedas
reales («คำนวณเงินเดือน», «คำนวณสินเชื่อบ้าน», «คำนวณ VAT ภาษีมูลค่าเพิ่ม», «คำนวณดอกเบี้ย»).

**Tipografía y corte de línea.** Geist no trae tailandés: cae en la fuente del sistema (Thonburi en
Apple, Leelawadee UI en Windows), con Noto Sans Thai y Tahoma de respaldo, sin descargar nada.
`word-break: normal` en `:lang(th)`: los navegadores cortan el tailandés por diccionario sin partir
palabras; `keep-all` no cortaría nunca y `break-all` partiría las palabras al medio. Nada de U+200B a
mano. Interlineado 1.65 por las vocales y tonos apilados, y tracking 0 en los títulos (el negativo de
Geist encima los tonos). La tarjeta OG del mundo carga Noto Sans Thai.

**Reglas de texto** (`scripts/reglas_idioma.ts`, sobre la página entera en las universales y en las
ofertas): sin exclamaciones, rayas ni guion como pausa; sin espacios raros (U+200B y parecidos, espacio
duro o fino, doble espacio, vocal o tono suelto tras un espacio); sin punto ni «?» al final de una
oración tailandesa; sin ครับ/ค่ะ/คะ; sin คุณ ni ท่าน como pronombre (no cuentan คุณภาพ, คุณสมบัติ,
คุณค่า, ขอบคุณ ni เท่านั้น) ni ผม/ดิฉัน/ฉัน; sin dígitos tailandeses; sin ค.ศ. ni «ปี 2026».

**Prueba.** `zz-th` (Zetaland, locale `th-001`) es una edición interna como `zz-ja`. `check_universales`
prueba th-TH con THB (escala 35) y «เซนต์วินเซนต์และเกรนาดีนส์» por el nombre largo; `check_motor`
prueba el parseo, las unidades, las fechas en พ.ศ. y el ancho visual.

### D15. Ucraniano (2026-10-24)

D9 a D14 los usan otras ramas sin mergear (`claude/mundo-motor-eu`, `claude/mundo-motor-tr` y las
demás); esta entrada toma el D15 para no chocar al mergear.

`IDIOMAS` suma `uk`. Motor, mensajes de error, calculadora, sitio, inicio, legales, compartir, embed,
afiliados, «Tu sueldo en el mundo» (`zarplata-u-sviti`), rankings (`reitynh-krain`), horas de trabajo
(`skilky-hodyn-roboty`), calendario (`kalendar-vyplat`), sueldos reales (`realni-zarplaty`), el
diccionario de venta completo (las 29 familias, `informe-calculo` incluida, informes, planillas y
mails) y las 41 universales están en ucraniano.

**Trato.** Un solo registro, el de los bancos y servicios digitales de Ucrania (Дія, ПриватБанк,
monobank, el portal de la ДПС): «ви» siempre con minúscula (como escriben esos sitios, no la «Ви» de
carta) y las formas corteses en las oraciones («введіть», «оберіть», «розрахуйте», «ваша
зарплата»), nunca «ти». Los botones van en infinitivo («Розрахувати», «Скопіювати посилання») o en
imperativo cortés breve («Оберіть країну»), como en esos sitios. Los mercados van con
`trato: "usted"`, como ja, ko, zh y tr; los diccionarios escriben solo `base`. Las cartas del informe
van en primera persona formal («Прошу виплатити...»). La tarjeta para compartir va en primera persona.
Vocabulario real ucraniano y nunca calcos del ruso: калькулятор зарплати, податок на доходи фізичних
осіб, військовий збір, ЄСВ, ПДВ, іпотека, кредит, відсотки, перший внесок, тіло кредиту.

**Plurales.** El ucraniano tiene cuatro categorías en `Intl.PluralRules("uk")`: one (1, 21, 31...),
few (2 a 4, 22 a 24...), many (0, 5 a 20, 25...) y other (las fracciones, que van en genitivo
singular: «1,5 року»). `src/motor/i18n/plural.ts` da `formaUk` y `pluralUk(n, uno, pocos, muchos,
fracción?)`; las unidades de tiempo suman las formas `pocos` y `muchos` (`FormasUnidad`, la misma
interfaz que la rama del motor eu) y `formatearValorUnidad` elige por categoría («1 рік», «3 роки»,
«5 років»). El contador del buscador acepta una forma few opcional (`resultadosPocos`).

**Gramática del país.** El nombre se declina. `GRAMATICA.uk`: `nombre(p)` = p; `de(p)` es el
genitivo suelto, que va detrás del sustantivo («калькулятори України»); `en(p)` el lugar con su
preposición («в Україні», «у Німеччині», «на Філіппінах»; «в» ante vocal y «у» ante consonante,
nunca «на Україні»); `para(p)` = «для» + genitivo. Los nombres llegan como los escribe
Intl.DisplayNames en uk, así que se declinan por regla: -ія da -ії; -а da -и/-і con la alternancia
к→ц, г→з y х→с en el locativo («у Мексиці»); los masculinos en consonante dan -у e -і («Люксембургу»,
«у Люксембурзі»; en -к el locativo es -у: «в Іраку»); -й y -ь dan -ю e -ї/-і; en los compuestos los
adjetivos de delante en -а, -і, -е o -ий concuerdan («у Великій Британії», «в Обʼєднаних Арабських
Еміратах») y los plurales en -и dan -ів y -ах. Una tabla lleva los irregulares (Білорусь, Єгипет,
Філіппіни, «Сент-Вінсент і Гренадіни») y otra los nombres de isla que van con «на» (Кіпр, Мальта,
Куба, Ямайка...). Lo que termina en otra vocal (Чилі, Перу, Марокко) y las siglas no se declinan.
Los marcadores `{pais}` del diccionario de venta no pasan por esta función: ahí el país va en
nominativo entre paréntesis o detrás de dos puntos. Probado con los ~110 nombres de Intl de los países
del sitio y del plan.

**Formato.** Intl de uk-UA: miles con espacio (U+00A0), decimal con coma, la grivna detrás con «₴»
(«1 234,50 ₴», que es lo que da Intl; «грн» también se lee al parsear) y el porcentaje pegado
(«19,5%»). `parsearNumero` no cambia (casos nuevos en `check_motor`). Fechas largas «24 жовтня
2026 р.». `inferir.ts` reconoce «місячна» y «річна» por prefijo. El índice del buscador cuenta el
cirílico como letra (antes `[^a-z0-9]` lo borraba y una búsqueda en ucraniano no daba nada). Las
imágenes OG cargan Noto Sans de respaldo en uk por si Geist no trae algún glifo.

**Slugs.** Transliteración oficial ucraniana al latín (resolución del Gabinete de Ministros 55/2010:
и→y, і→i, г→h, х→kh, ц→ts, ч→ch, ш→sh, щ→shch, ж→zh, є/ї/й/ю/я→ie/i/i/iu/ia dentro de palabra, sin
ь ni apóstrofo), en kebab-case ASCII, sobre la frase que busca la gente en Google Ucrania:
`kalkuliator-kredytu`, `efektyvna-vidsotkova-stavka`, `kalkuliator-ipoteky`,
`orenda-chy-kupivlia-zhytla`, `skladni-vidsotky`, `prosti-vidsotky`, `kalkuliator-zaoshchadzhen`,
`zaoshchadzhennia-na-pensiiu`, `pohashennia-kredytnoi-kartky`, `biudzhet-50-30-20`,
`podushka-bezpeky`, `vartist-utrymannia-avto`, `rentabelnist-investytsii`, `kalkuliator-marzhi`,
`tochka-bezzbytkovosti`, `stavka-frylansera`, `zarplata-za-hodynu`, `pidvyshchennia-zarplaty`,
`oblik-robochoho-chasu`, `kalkuliator-vidsotkiv`, `zmina-u-vidsotkakh`, `proportsiia`,
`kalkuliator-znyzhky`, `chaiovi`, `podilyty-rakhunok`, `serednie-zvazhene`, `kalkuliator-viku`,
`kilkist-dniv-mizh-datamy`, `dodaty-dni-do-daty`, `indeks-masy-tila`, `kalkuliator-kalorii`,
`data-polohiv`, `kalkuliator-ovuliatsii`, `temp-bihu`, `vytrata-palnoho`,
`spozhyvannia-elektroenerhii`, `skilky-farby-potribno`, `kalkuliator-ploshchi`,
`skilky-plytky-potribno`, `kalkuliator-betonu` y `kalkuliator-pdv`. Se eligió la transliteración y no
el slug en inglés (como D8 con ja/ko/zh) porque es la norma oficial del país, legible por quien busca
y estable. Rankings: `kupivelna-spromozhnist-zarplaty`, `den-podatkovoi-svobody`,
`skilky-zalyshaietsia-vid-pidvyshchennia`.

**Universales.** Textos nativos de Ucrania y neutrales de país: sin organismos de un solo país (nada
de НБУ, ДПС ni ПФУ en las universales) y sin cifras legales tipeadas; la tasa de `iva` (ПДВ) sale del
dato del país. Los ejemplos se calculan con las funciones de cada `definicion.ts`. Salud con la
oración de que no reemplaza la consulta con un médico.

**Reglas de texto** (`scripts/reglas_idioma.ts`, sobre la página entera en las universales y en las
ofertas): sin exclamaciones, rayas ni guion como pausa; se atrapan «ти» y sus posesivos, los
imperativos y presentes de segunda del singular de un formulario («введи», «можеш»), la «Ви» con
mayúscula a mitad de oración, las letras que solo tiene el ruso (ы, э, ё, ъ), las comillas que no son
«», el apóstrofo que no es ʼ ni ', y los calcos del ruso más frecuentes («являється», «слідуючий»,
«на протязі», «приймати участь»).

**Prueba.** `zz-uk` (Зеталенд, locale `uk-001`) es una edición interna como `zz-ja`.
`check_universales` prueba uk-UA con UAH, «Сент-Вінсент і Гренадіни» por el nombre largo que se
declina por partes y «Обʼєднані Арабські Емірати» por los adjetivos delante.

### D16. Uzbeko latino (2026-10-24)

D9 a D15 los usan otras ramas sin mergear (`claude/mundo-motor-eu`, `-ar`, `-id`, `-tr`, `-th`, `-uk`,
`-bn`); esta entrada toma D16 para no chocar al mergear.

`IDIOMAS` suma `uz`. Motor, mensajes de error, calculadora, sitio, inicio, legales, compartir, embed,
«Tu sueldo en el mundo» (`mamlakatlar-boyicha-ish-haqi`), el diccionario de venta completo (todas las
familias, `informe-calculo` incluida, informes, planillas y mails), las 41 universales y los módulos
que main sumó después del modelo tr (horas de trabajo, rankings, sueldos reales, calendario y
afiliados) están en uzbeko.

**Escritura.** El uzbeko oficial de Uzbekistán es el latino (alfabeto de 1995 con las reformas
posteriores), el de soliq.uz, my.gov.uz y los bancos. oʻ y gʻ van con U+02BB («ʻ», modifier letter
turned comma) y la tutuq belgisi con U+02BC («ʼ», modifier letter apostrophe: maʼlumot, eʼlon,
taʼminot), nunca con el apóstrofo recto, el tipográfico (’ ‘) ni el acento grave, que son copias de
teclado. El cirílico, todavía muy usado en la web uzbeka, no se mezcla: el ruso o el uzbeko cirílico
serían otra edición. Los buscadores (sitio, país, mundo, embed) comparan sin «ʻ» ni «ʼ» y aceptan
«o'» y «g'» con el apóstrofo del teclado: «oʻrtacha», «o'rtacha» y «ortacha» encuentran lo mismo.
Geist no trae U+02BB: las imágenes OG de mundo, horas, rankings, calendario y sueldos piden Noto Sans
como respaldo para uz (en la página el navegador cae solo a otra fuente para ese glifo).

**Trato.** Un solo registro, el de soliq.uz, my.gov.uz y los bancos (Kapitalbank, Hamkorbank): «Siz»
con las formas corteses, imperativo en -ing («kiriting», «tanlang», «hisoblang»), posesivo en -ingiz
(«maoshingiz», «kreditingiz») y verbos en -siz («toʻlaysiz»); nunca «sen». El botón principal va con
el nombre de la acción («Hisoblash»), como en las calculadoras de esos bancos. Los mercados van con
`trato: "usted"`, como ja, ko y zh; los diccionarios escriben solo `base`. Las cartas del informe van
en primera persona formal («soʻrayman») con la cifra después de dos puntos, y la tarjeta para
compartir en primera persona.

**Gramática del país.** El uzbeko no tiene artículos ni armonía vocálica en los sufijos de caso, y el
sufijo se pega al nombre propio sin apóstrofo. `GRAMATICA.uz`: `nombre(p)` = p; `de(p)` el genitivo
(«Oʻzbekistonning», «AQShning»); `en(p)` el locativo («Oʻzbekistonda», «Kongo Demokratik
Respublikasida»); `para(p)` = «p uchun». Los diccionarios no pegan sufijos a cifras, a valores
interpolados ni a marcadores: «Muddat: {x}», «{fecha} sanasigacha» (el sufijo cae en «sana»), «{n} ta
mamlakat» con el contador «ta» suelto, «15 foizdan» con la palabra en vez de «15%dan». Los ordinales
de fechas fijas siguen la norma con guion («1-yanvar»).

**Formato.** Intl de Node (ICU 78) tiene datos de uz y uz-Latn-UZ, y `Intl.NumberFormat("uz-UZ")` da
el formato oficial: miles con espacio (U+00A0), coma decimal y la moneda detrás («1 234 567,50 soʻm»,
ya con U+02BB), porcentaje «12%». Se usa `uz-UZ` tal cual. Fechas largas de Intl: «24-oktabr, 2026».
`parsearNumero` no cambia (casos nuevos en `check_motor`: espacio común o U+00A0, «soʻm» detrás,
«5.000» con miles ambiguos). El sustantivo no va en plural después de un número: las dos formas de
cada unidad son iguales («3 kun», «1,5 yil»). `inferir.ts` reconoce «oylik» y «yillik». Los decimales
del soʻm quedan en lo que da Intl (2); el país decide su redondeo en su mercado.

**Slugs.** Uzbeko latino en ASCII (oʻ y gʻ pasan a o y g, sin apóstrofos), con la búsqueda real,
casi siempre «… kalkulyatori»: `kredit-kalkulyatori`, `ipoteka-kalkulyatori`, `qqs-kalkulyatori`,
`samarali-foiz-stavkasi`, `murakkab-foiz-kalkulyatori`, `oddiy-foiz-kalkulyatori`,
`jamgarma-kalkulyatori`, `pensiya-jamgarmasi-kalkulyatori`, `kredit-karta-kalkulyatori`,
`byudjet-kalkulyatori`, `favqulodda-jamgarma-kalkulyatori`, `avtomobil-xarajatlari-kalkulyatori`,
`investitsiya-daromadi-kalkulyatori`, `foyda-marjasi-kalkulyatori`,
`zararsizlik-nuqtasi-kalkulyatori`, `frilans-narxi-kalkulyatori`, `soatlik-ish-haqi-kalkulyatori`,
`ish-haqi-oshishi-kalkulyatori`, `ish-soatlari-kalkulyatori`, `foiz-hisoblash`,
`foiz-ozgarishi-kalkulyatori`, `proporsiya-kalkulyatori`, `chegirma-kalkulyatori`,
`choychaqa-kalkulyatori`, `ortacha-qiymat-kalkulyatori`, `yosh-kalkulyatori`,
`tana-massasi-indeksi-kalkulyatori`, `kaloriya-kalkulyatori`, `tugruq-sanasi-kalkulyatori`,
`ovulyatsiya-kalkulyatori`, `yugurish-tempi-kalkulyatori`, `yoqilgi-sarfi-kalkulyatori`,
`elektr-energiyasi-kalkulyatori`, `boyoq-kalkulyatori`, `kvadrat-metr-kalkulyatori`,
`kafel-kalkulyatori`, `beton-kalkulyatori`; frases donde la búsqueda lo es: `ijara-yoki-uy-sotib-olish`,
`xarajatlarni-bolish`, `sanalar-orasidagi-kunlar`, `sanaga-kun-qoshish`. Páginas del idioma:
`mamlakatlar-boyicha-ish-haqi` (mundo), `necha-soatlik-mehnat` (horas), `ish-haqi-kalendari`
(calendario), `haqiqiy-maoshlar` (sueldos reales), `mamlakatlar-reytingi` (rankings, con
`maosh-qayerda-kop-yetadi`, `soliqdan-ozodlik-kuni` y `oshgan-maoshdan-qancha-qoladi`).

**Universales.** Textos nativos de Uzbekistán y neutrales de país: kredit, ipoteka, foiz stavkasi
(yillik, nominal, samarali), oylik toʻlov, asosiy qarz, boshlangʻich toʻlov, toʻlov jadvali, omonat,
jamgʻarma, QQS bilan / QQSsiz, tannarx, ustama, zararsizlik nuqtasi, TMI, tugʻruq sanasi, zaxira,
sement qopi; sin organismos de un solo país (nada de Soliq qoʻmitasi, Markaziy bank ni JShShIR) y sin
cifras legales tipeadas: la tasa de `iva` sale del dato del país. Salud informativa, con la oración
de que no reemplaza la consulta médica. Los ejemplos se calculan con las funciones de cada
`definicion.ts`.

**Reglas de texto** (`scripts/reglas_idioma.ts`, sobre la página entera en las universales y en las
ofertas): sin exclamaciones, rayas ni guion como pausa; oʻ y gʻ con U+02BB y la tutuq con U+02BC
(se atrapa el apóstrofo recto, el tipográfico y el grave entre letras, la «ʼ» detrás de o o g y la «ʻ»
suelta); sin cirílico; el «sen» (pronombre y casos, presente -asan/-ysan, condicional -sang y los
posesivos más comunes). El pasado -ding no se busca porque choca con el imperativo cortés de las
raíces en t y d («kiriting»).

**Prueba.** `zz-uz` (Zetalend, locale `uz-001`) es una edición interna como `zz-ja`.
`check_universales` prueba uz-UZ con UZS, «Sent-Vinsent va Grenadin» por el nombre largo y «Kongo
Demokratik Respublikasi» por el compuesto que toma el sufijo en la última palabra.

## 3. Catálogo de universales

Slug por idioma: el que busca la gente. Familia de oferta: la del producto que se ofrece.

| id | concepto | slug es | slug en | categoría | familia de oferta |
|---|---|---|---|---|---|
| prestamo | prestamo | prestamo | loan | finanzas | plan-prestamo |
| tasa-efectiva | tasa-efectiva | tasa-efectiva-anual | apr-to-apy | finanzas | plan-prestamo |
| hipoteca | hipoteca | hipoteca | mortgage | finanzas | plan-hipoteca |
| alquilar-o-comprar | alquilar-o-comprar | alquilar-o-comprar | rent-vs-buy | finanzas | plan-hipoteca |
| interes-compuesto | interes-compuesto | interes-compuesto | compound-interest | finanzas | plan-inversion |
| interes-simple | interes-simple | interes-simple | simple-interest | finanzas | plan-inversion |
| meta-de-ahorro | meta-de-ahorro | meta-de-ahorro | savings-goal | finanzas | plan-inversion |
| ahorro-retiro | ahorro-retiro | ahorro-para-el-retiro | retirement-savings | finanzas | plan-inversion |
| tarjeta-de-credito | tarjeta-de-credito | pagar-tarjeta-de-credito | credit-card-payoff | finanzas | plan-deudas |
| presupuesto | presupuesto | presupuesto-50-30-20 | budget | finanzas | plan-presupuesto |
| fondo-de-emergencia | fondo-de-emergencia | fondo-de-emergencia | emergency-fund | finanzas | plan-presupuesto |
| costo-de-un-auto | costo-de-un-auto | costo-de-tener-auto | car-cost | finanzas | plan-presupuesto |
| rendimiento-inversion | rendimiento-inversion | rendimiento-de-inversion | roi | negocio | plan-negocio |
| margen-de-ganancia | margen-de-ganancia | margen-de-ganancia | profit-margin | negocio | plan-negocio |
| punto-de-equilibrio | punto-de-equilibrio | punto-de-equilibrio | break-even | negocio | plan-negocio |
| tarifa-freelance | tarifa-freelance | cuanto-cobrar-por-hora | freelance-rate | negocio | kit-freelance |
| conversor-sueldo | conversor-sueldo | sueldo-por-hora | hourly-to-salary | sueldo | plan-sueldo |
| aumento-de-sueldo | aumento-de-sueldo | aumento-de-sueldo | pay-raise | sueldo | plan-sueldo |
| horas-trabajadas | horas-trabajadas | horas-trabajadas | time-card | sueldo | plan-sueldo |
| porcentaje | porcentaje | porcentaje | percentage | calculos | kit-calculos |
| variacion-porcentual | variacion-porcentual | variacion-porcentual | percentage-change | calculos | kit-calculos |
| regla-de-tres | regla-de-tres | regla-de-tres | rule-of-three | calculos | kit-calculos |
| descuento | descuento | descuento | discount | calculos | kit-calculos |
| propina | propina | propina | tip | calculos | kit-gastos-grupo |
| dividir-gastos | dividir-gastos | dividir-gastos | split-bill | calculos | kit-gastos-grupo |
| promedio | promedio | promedio-ponderado | weighted-average | calculos | kit-estudio |
| edad | edad | edad | age | fechas | kit-fechas |
| dias-entre-fechas | dias-entre-fechas | dias-entre-fechas | days-between-dates | fechas | kit-fechas |
| sumar-dias | sumar-dias | sumar-dias-a-una-fecha | add-days-to-date | fechas | kit-fechas |
| imc | imc | imc | bmi | salud | plan-salud |
| calorias | calorias | calorias-diarias | calorie-calculator | salud | plan-salud |
| fecha-de-parto | fecha-de-parto | fecha-probable-de-parto | due-date | salud | plan-embarazo |
| ovulacion | ovulacion | dias-fertiles | ovulation | salud | plan-embarazo |
| ritmo-de-carrera | ritmo-de-carrera | ritmo-de-carrera | running-pace | salud | plan-entrenamiento |
| combustible | combustible | costo-de-combustible | fuel-cost | hogar | kit-viaje |
| consumo-electrico | consumo-electrico | consumo-electrico | electricity-cost | hogar | kit-hogar |
| pintura | pintura | cuanta-pintura-necesito | paint-calculator | hogar | kit-obra |
| metros-cuadrados | metros-cuadrados | metros-cuadrados | square-footage | hogar | kit-obra |
| ceramicos | ceramicos | cuantos-ceramicos | tile-calculator | hogar | kit-obra |
| hormigon | hormigon | hormigon | concrete-calculator | hogar | kit-obra |
| iva (con dato del país) | iva | iva | vat | impuestos | kit-facturacion |

`iva` es universal en la fórmula pero exige la tasa verificada del país (`datos: ["tasa"]`): solo
lo instancian los países nuevos (los 16 de LATAM ya tienen el suyo).

## 4. Riesgos

| Riesgo | Mitigación |
|---|---|
| Romper calcular.ar | `check_rutas_ar` con la foto de main antes de mergear; nada de esto toca `src/app/(ar)` salvo el panel |
| Build lento o caro | D4 antes de pasar de unos 30 países; medir build en cada tanda |
| Textos traducidos que suenan a máquina | un agente por idioma con la guía de redacción y reglas por idioma en el check |
| Datos legales sin verificar | igual que LATAM: lo no verificado no se publica |
| Salud (IMC, calorías, embarazo) | textos informativos, aviso de que no reemplaza a un profesional, nada de diagnóstico |
| Métricas que no aparecen | el SQL lo corre Manuel; el panel degrada sin la migración |
