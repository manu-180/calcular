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
