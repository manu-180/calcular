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
  de it nl`. Después: `ar` (RTL) `ru tr pl id ms vi th ja ko zh hi ...` a medida que entran países.
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

### D21. Húngaro (2026-10-24)

D9 a D20 los usan otras ramas sin mergear (`claude/mundo-motor-eu`, `claude/mundo-motor-tr`,
`claude/mundo-motor-cs` y las demás); esta entrada toma el D21 para no chocar al mergear.

`IDIOMAS` suma `hu`. Motor, mensajes de error, calculadora, sitio, inicio, legales, compartir, embed,
afiliados, «Tu sueldo en el mundo» (`fizetes-a-vilagban`), rankings (`orszagok-rangsora`), horas de
trabajo (`hany-ora-munka`), calendario (`fizetesi-naptar`), sueldos reales (`valodi-fizetesek`), el
diccionario de venta completo (familias, informes, planillas y mails) y las 41 universales están en
húngaro.

**Trato.** Un solo registro: tegezés. Es el de OTP, K&H, Revolut, Wise y las calculadoras de los
portales húngaros de finanzas y de empleo, que es el tipo de sitio que es calcularya; NAV y
Ügyfélkapu usan magázás («Ön», «adja meg»), pero son la web del Estado, con trámites y
obligaciones, y una calculadora en magázás suena a formulario oficial. Los mercados van con
`trato: "tu"` y los diccionarios escriben solo `base`. Las oraciones usan el imperativo de segunda
del singular («add meg», «válaszd ki», «számold ki») y los botones el sustantivo de acción
(«Kiszámítás») o la primera persona («Kérem a kimutatást», «Hozzáadom a fizetésemet»), como esos
sitios. Las cartas del informe (para un tercero) van en el registro neutro de una carta. Vocabulario
real: nettó bér kalkulátor, bruttó bér, SZJA, TB-járulék, ÁFA, lakáshitel kalkulátor, kamat, THM,
törlesztőrészlet, futamidő, önerő. Las universales quedan neutrales de país (nada de NAV, MNB ni
CSOK en el texto visible; la tasa de ÁFA sale del dato del país).

**Sin plural detrás de un número.** El húngaro usa el singular después de un numeral («3 év», «5
nap», «41 kalkulátor»). `Intl.PluralRules("hu")` tiene one y other, pero las dos formas de las
unidades de tiempo son iguales («1 év», «3 év», «1,5 év») y los diccionarios escriben `${n} ország`
sin elegir forma. El contador del buscador dice «találat» siempre. `reglas_idioma` atrapa los
plurales frecuentes detrás de una cifra («3 napok»).

**Artículo a/az.** «az» delante de vocal y «a» delante de consonante. Delante de una cifra cuenta
cómo se lee: `neveloHu(x)` da «az» para 1 (egy), 5 (öt), 50, 500, 1 000 (ezer), 1 500 (ezerötszáz),
1 000 000 (egymillió) y «a» para 10 (tíz), 15, 100 (száz), 10 000 (tízezer); también lee montos
formateados («az 1 500 000 Ft») y palabras («az eredmény»). `conNeveloHu(x)` devuelve el artículo y lo
que sigue. Las siglas que se leen letra por letra («az SZJA», «az ÁFA», frente a «a NAV») no se
adivinan: el texto las escribe a mano. En las plantillas, una cifra variable con artículo delante va
con `conNeveloHu` o la frase se arma sin artículo.

**Gramática del país.** El nombre no lleva preposición: el caso es un sufijo pegado a la última
palabra con armonía vocálica. `esetekHu(p)` (en `gramatica.ts`) da `nev` (con artículo si lo lleva),
`hol` (lugar), `hova` (dirección), `honnan` (origen) y `nak` (dativo). Dos grupos: casi todos los
países van con -ban/-ben, -ba/-be, -ból/-ből («Németországban», «Kanadába»); Magyarország, las islas
y los estados insulares (tabla FELSZIN: Ciprus, Málta, Kuba, Srí Lanka, Tajvan...) y lo que termina
en -sziget(ek), -föld, -land, -part o -terület van con -on/-en/-ön, -ra/-re, -ról/-ről
(«Magyarországon», «Cipruson», «Thaiföldön», «Új-Zélandon», «Elefántcsontparton»). La armonía la
decide la última vocal no neutra (i, í son neutras) de la última palabra: «Maliban», «Izraelben»,
«Chilében», «Fidzsin»; la ö/ő/ü/ű da -ön en el superesivo. La a, e, o y ö finales se alargan antes del
sufijo («Kanadában», «Chilében», «Togóban», «Puerto Ricón»). Los nombres que son una frase con
sustantivo común (Köztársaság, Királyság, Államok, Emírségek, -szigetek, Terület, Vatikán) llevan
artículo en todas las formas («az Egyesült Államokban», «a Fülöp-szigeteken», «a Dominikai
Köztársaságból»). Una tabla lleva los que Intl escribe con un agregado («Hongkong KKT» da
«Hongkongban», «Kongó – Kinshasa» da «a Kongói Demokratikus Köztársaságban») y los de e o -que
finales mudas, con guion («Belize-ben», «Guadeloupe-on», «Jersey-n»). Probado con los ~250 nombres
de Intl en hu. `GRAMATICA.hu`: `nombre(p)` = `nev`; `de(p)` = `nev`, el poseedor sin sufijo, porque
en húngaro el posesivo va en el poseído («Magyarország adórendszere», «az Egyesült Államok
kalkulátorai»); `en(p)` = `hol`; `para(p)` = «nev számára», una posposición que no cambia el nombre.
Si una forma con artículo abre la oración, el texto la pasa por `mayusculaHu`.

**Ningún sufijo pegado a cifras ni marcadores.** La forma del sufijo depende de cómo se lee el
número («5-ben», «6-ban», «10-ben», «2026-ban») y en una plantilla el número cambia, así que en los
textos las cifras, fechas y marcadores van tras dos puntos («A legkisebb megengedett érték: {min}»),
entre paréntesis, con una posposición («${n} ország alapján», «${n} óra munkával») o detrás de una
fecha larga con «napján/napjáig» («2026. október 24. napjáig», que no pega nada a la cifra porque la
fecha termina en punto). Las cifras fijas que llevarían sufijo se escriben en letras («ötvenkettővel
szorzol», «január elsejétől»). `reglas_idioma` atrapa una cifra o un % seguidos de guion y sufijo
(«5-ben», «27%-os»). Queda una excepción tolerada en textos fijos: el sufijo detrás de una
abreviatura de unidad («100 km-en», «kW-ban»), que es la escritura normal y no depende de un número
variable.

**Formato.** Intl de hu-HU: miles con espacio (U+00A0) desde cinco cifras («1234,5», «12 345,5»),
decimal con coma, el forint sin decimales y con «Ft» detrás («1 234 568 Ft»), el porcentaje pegado
(«27%»). `parsearNumero` no cambia (casos nuevos en `check_motor`, con y sin espacio de miles). Fechas
largas «2026. október 24.», con el punto final de la fecha: los textos no le agregan otro.
`inferir.ts` reconoce «éves», «évi», «évente», «havi» y «havonta». Geist suma el subconjunto
`latin-ext` en los layouts intl y embebido para la ő y la ű (el mismo cambio que la rama cs; con
unicode-range solo se baja en las páginas que lo usan).

**Comillas.** „ ” (abre abajo, cierra arriba a la derecha). `reglas_idioma` rechaza «», "" y “, y la
” abriendo.

**Slugs.** ASCII en kebab-case sin diacríticos (á→a, é→e, ő→o, ű→u), sobre lo que busca la gente,
con «kalkulator» donde es la búsqueda real: `hitelkalkulator`, `lakashitel-kalkulator`,
`afa-kalkulator`, `kamat-kalkulator`, `kamatos-kamat-kalkulator`, `effektiv-kamatlab-kalkulator`,
`hitelkartya-torlesztes`, `berlet-vagy-vasarlas`, `nyugdijcelu-megtakaritas`,
`megtakaritas-kalkulator`, `vesztartalek-kalkulator`, `50-30-20-szabaly`,
`auto-fenntartasi-koltseg`, `hozam-kalkulator`, `arres-kalkulator`, `fedezeti-pont-kalkulator`,
`szabaduszo-oradij-kalkulator`, `oraber-kalkulator`, `fizetesemeles-kalkulator`,
`munkaido-kalkulator`, `szazalekszamitas`, `szazalekos-valtozas`, `kedvezmeny-kalkulator`,
`aranyossag-kalkulator`, `atlag-kalkulator`, `borravalo-kalkulator`, `koltsegek-megosztasa`,
`eletkor-kalkulator`, `napok-ket-datum-kozott`, `datum-kalkulator`, `bmi-kalkulator`,
`kaloriaszukseglet-kalkulator`, `szules-varhato-idopontja`, `ovulacios-kalkulator`,
`futotempo-kalkulator`, `uzemanyagkoltseg-kalkulator`, `aramfogyasztas-kalkulator`,
`festekszukseglet-kalkulator`, `negyzetmeter-kalkulator`, `csempe-kalkulator` y
`beton-kalkulator`. `nettober-kalkulator` queda libre para la calculadora local de sueldo neto de
Hungría. Rankings: `hol-er-tobbet-a-fizetes`, `adoszabadsag-napja`,
`mennyi-marad-a-fizetesemelesbol`. Los títulos escriben «Lakáshitel kalkulátor» con espacio, como se
busca; la ortografía académica pide guion y queda para la revisión nativa.

**Universales.** Textos nativos para un lector húngaro y neutrales de país. Los ejemplos se calculan
con las funciones de cada `definicion.ts`. Salud con la oración de que no reemplaza la consulta con
un profesional («fordulj orvoshoz»).

**Reglas de texto** (`scripts/reglas_idioma.ts`, sobre la página entera en las universales y en las
ofertas): sin exclamaciones, rayas ni guion como pausa; se atrapa la magázás («Ön» y sus casos con
mayúscula, porque en minúscula «önt» es un verbo, y los imperativos corteses de un formulario:
«kattintson», «adja meg», «válassza ki», «írja be», «töltse ki», «ellenőrizze», «forduljon»), las
comillas que no son „ ”, el sufijo pegado a una cifra y el plural detrás de un número. Los
imperativos corteses coinciden con la tercera persona del indicativo definido («a bolt adja meg»):
el texto se reescribe («tünteti fel») en lugar de abrir excepciones.

**Prueba.** `zz-hu` (Zetaország, locale `hu-001`, Északi y Déli megye) es una edición interna como
`zz-ja`. `check_universales` prueba hu-HU con HUF, «Saint Vincent és a Grenadine-szigetek» por el
nombre largo con artículo y sufijo de isla y «Németország» por el compuesto en -ország.
`check_motor` prueba el parseo, las unidades, el forint, la fecha larga, el artículo y los casos del
país.

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
