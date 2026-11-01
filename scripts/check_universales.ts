// Valida las calculadoras universales (src/motor/universales) en mercados de prueba de cada idioma y
// trato: que la definición se arme, que los casos den, que el resultado se pueda mostrar y que los
// textos cumplan lo básico (largo de title y description, FAQ, sin rayas ni emojis). En las variantes
// de un idioma (es-ES, pt-PT, pt-AO, fr-CA, de-CH) revisa además que no se cuele el vocabulario de otra
// (pt-AO con el de pt-PT y el de la lusofonía, en el orden de variantesDeLocale).
// Uso: npx tsx scripts/check_universales.ts [id]
import { anchoVisual } from "../src/motor/ancho";
import { ErrorEntrada, crearContexto } from "../src/motor/calculo";
import { CONCEPTOS } from "../src/motor/conceptos";
import { formatearFilas } from "../src/motor/formulario";
import { IDIOMAS, type CodigoMercado, type ContextoSerializado, type Idioma, type Moneda, type ResultadoBase, type TablaResultado, type Trato } from "../src/motor/tipos";
import { variantesDeLocale, PT_LUSOFONIA } from "../src/motor/i18n/variantes";
import { UNIVERSALES } from "../src/motor/universales";
import { idiomasDe, instanciar, type ContextoUniversal } from "../src/motor/universales/tipos";
import { problemasDeTexto } from "./reglas_idioma";

const TOLERANCIA = 0.005;
const RE_SLUG = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const RE_RAYA = /[—–]| - /;
const RE_EMOJI = /\p{Extended_Pictographic}/u;
const MARCADOR = /\{\{[^}]+\}\}/g;

const PRUEBA: Readonly<Record<Idioma, readonly Partial<ContextoUniversal>[]>> = {
  es: [
    { mercado: "mx", pais: "MX", nombrePais: "México", locale: "es-MX", trato: "tu", moneda: "MXN", escala: 20 },
    { mercado: "co", pais: "CO", nombrePais: "Colombia", locale: "es-CO", trato: "usted", moneda: "COP", escala: 4000 },
    { mercado: "uy", pais: "UY", nombrePais: "Uruguay", locale: "es-UY", trato: "vos", moneda: "UYU", escala: 40 },
    { mercado: "vc" as CodigoMercado, pais: "VC", nombrePais: "San Vicente y las Granadinas", locale: "es", trato: "usted", moneda: "XCD" as Moneda, escala: 2.5 },
    { mercado: "es" as CodigoMercado, pais: "ES", nombrePais: "España", locale: "es-ES", trato: "tu", moneda: "EUR" as Moneda, escala: 1 },
  ],
  en: [
    { mercado: "us" as CodigoMercado, pais: "US", nombrePais: "United States", locale: "en-US", trato: "tu", moneda: "USD" as Moneda, escala: 1, unidades: "imperial" },
    { mercado: "gb" as CodigoMercado, pais: "GB", nombrePais: "United Kingdom", locale: "en-GB", trato: "tu", moneda: "GBP" as Moneda, escala: 1 },
    { mercado: "vc" as CodigoMercado, pais: "VC", nombrePais: "Saint Vincent and the Grenadines", locale: "en-VC", trato: "tu", moneda: "XCD" as Moneda, escala: 2.5 },
  ],
  pt: [
    { mercado: "br", pais: "BR", nombrePais: "Brasil", locale: "pt-BR", trato: "tu", moneda: "BRL", escala: 5 },
    { mercado: "pt" as CodigoMercado, pais: "PT", nombrePais: "Portugal", locale: "pt-PT", trato: "usted", moneda: "EUR" as Moneda, escala: 1 },
    // Angola: norma europea (como todo pt-* menos pt-BR), sin lo que es propio de Portugal.
    { mercado: "ao" as CodigoMercado, pais: "AO", nombrePais: "Angola", locale: "pt-AO", trato: "usted", moneda: "AOA" as Moneda, escala: 900 },
  ],
  fr: [
    { mercado: "fr" as CodigoMercado, pais: "FR", nombrePais: "France", locale: "fr-FR", trato: "usted", moneda: "EUR" as Moneda, escala: 1 },
    { mercado: "ca-fr" as CodigoMercado, pais: "CA", nombrePais: "Canada", locale: "fr-CA", trato: "usted", moneda: "CAD" as Moneda, escala: 1.4 },
  ],
  de: [
    { mercado: "de" as CodigoMercado, pais: "DE", nombrePais: "Deutschland", locale: "de-DE", trato: "usted", moneda: "EUR" as Moneda, escala: 1 },
    { mercado: "ch" as CodigoMercado, pais: "CH", nombrePais: "Schweiz", locale: "de-CH", trato: "usted", moneda: "CHF" as Moneda, escala: 0.8 },
  ],
  it: [{ mercado: "it" as CodigoMercado, pais: "IT", nombrePais: "Italia", locale: "it-IT", trato: "tu", moneda: "EUR" as Moneda, escala: 1 }],
  nl: [{ mercado: "nl" as CodigoMercado, pais: "NL", nombrePais: "Nederland", locale: "nl-NL", trato: "tu", moneda: "EUR" as Moneda, escala: 1 }],
  ja: [
    { mercado: "jp" as CodigoMercado, pais: "JP", nombrePais: "日本", locale: "ja-JP", trato: "usted", moneda: "JPY" as Moneda, escala: 150 },
    { mercado: "vc" as CodigoMercado, pais: "VC", nombrePais: "セントビンセント及びグレナディーン諸島", locale: "ja-JP", trato: "usted", moneda: "XCD" as Moneda, escala: 2.5 },
  ],
  ko: [
    { mercado: "kr" as CodigoMercado, pais: "KR", nombrePais: "대한민국", locale: "ko-KR", trato: "usted", moneda: "KRW" as Moneda, escala: 1400 },
    { mercado: "vc" as CodigoMercado, pais: "VC", nombrePais: "세인트빈센트 그레나딘", locale: "ko-KR", trato: "usted", moneda: "XCD" as Moneda, escala: 2.5 },
  ],
  zh: [
    { mercado: "tw" as CodigoMercado, pais: "TW", nombrePais: "台灣", locale: "zh-TW", trato: "usted", moneda: "TWD" as Moneda, escala: 30 },
    { mercado: "hk-zh" as CodigoMercado, pais: "HK", nombrePais: "香港", locale: "zh-HK", trato: "usted", moneda: "HKD" as Moneda, escala: 8 },
    { mercado: "cn" as CodigoMercado, pais: "CN", nombrePais: "中国", locale: "zh-CN", trato: "usted", moneda: "CNY" as Moneda, escala: 7 },
    { mercado: "vc" as CodigoMercado, pais: "VC", nombrePais: "聖文森及格瑞那丁", locale: "zh-TW", trato: "usted", moneda: "XCD" as Moneda, escala: 2.5 },
  ],
  pl: [
    { mercado: "pl" as CodigoMercado, pais: "PL", nombrePais: "Polska", locale: "pl-PL", trato: "tu", moneda: "PLN" as Moneda, escala: 4 },
    { mercado: "vc" as CodigoMercado, pais: "VC", nombrePais: "Saint Vincent i Grenadyny", locale: "pl-PL", trato: "tu", moneda: "XCD" as Moneda, escala: 2.5 },
  ],
  sv: [
    { mercado: "se" as CodigoMercado, pais: "SE", nombrePais: "Sverige", locale: "sv-SE", trato: "tu", moneda: "SEK" as Moneda, escala: 10 },
    { mercado: "fi-sv" as CodigoMercado, pais: "FI", nombrePais: "Finland", locale: "sv-FI", trato: "tu", moneda: "EUR" as Moneda, escala: 1 },
    { mercado: "vc" as CodigoMercado, pais: "VC", nombrePais: "Saint Vincent och Grenadinerna", locale: "sv-SE", trato: "tu", moneda: "XCD" as Moneda, escala: 2.5 },
  ],
  da: [
    { mercado: "dk" as CodigoMercado, pais: "DK", nombrePais: "Danmark", locale: "da-DK", trato: "tu", moneda: "DKK" as Moneda, escala: 7 },
    { mercado: "vc" as CodigoMercado, pais: "VC", nombrePais: "Saint Vincent og Grenadinerne", locale: "da-DK", trato: "tu", moneda: "XCD" as Moneda, escala: 2.5 },
  ],
  nb: [
    { mercado: "no" as CodigoMercado, pais: "NO", nombrePais: "Norge", locale: "nb-NO", trato: "tu", moneda: "NOK" as Moneda, escala: 10 },
    { mercado: "vc" as CodigoMercado, pais: "VC", nombrePais: "Saint Vincent og Grenadinene", locale: "nb-NO", trato: "tu", moneda: "XCD" as Moneda, escala: 2.5 },
  ],
  // Finés: el país se declina (GRAMATICA.fi); Yhdysvallat prueba la tabla de plurales y Malta el adesivo.
  fi: [
    { mercado: "fi" as CodigoMercado, pais: "FI", nombrePais: "Suomi", locale: "fi-FI", trato: "tu", moneda: "EUR" as Moneda, escala: 1 },
    { mercado: "mt" as CodigoMercado, pais: "MT", nombrePais: "Malta", locale: "fi-FI", trato: "tu", moneda: "EUR" as Moneda, escala: 1 },
    { mercado: "vc" as CodigoMercado, pais: "VC", nombrePais: "Saint Vincent ja Grenadiinit", locale: "fi-FI", trato: "tu", moneda: "XCD" as Moneda, escala: 2.5 },
  ],
  ar: [
    { mercado: "eg" as CodigoMercado, pais: "EG", nombrePais: "مصر", locale: "ar-EG-u-ca-gregory-nu-latn", trato: "usted", moneda: "EGP" as Moneda, escala: 50 },
    { mercado: "sa" as CodigoMercado, pais: "SA", nombrePais: "السعودية", locale: "ar-SA-u-ca-gregory-nu-latn", trato: "usted", moneda: "SAR" as Moneda, escala: 4 },
    { mercado: "ma-ar" as CodigoMercado, pais: "MA", nombrePais: "المغرب", locale: "ar-MA-u-ca-gregory-nu-latn", trato: "usted", moneda: "MAD" as Moneda, escala: 10 },
    { mercado: "vc" as CodigoMercado, pais: "VC", nombrePais: "سانت فينسنت وجزر غرينادين", locale: "ar-EG-u-ca-gregory-nu-latn", trato: "usted", moneda: "XCD" as Moneda, escala: 2.5 },
  ],
  // Indonesio (ADR 0002, D11): rupias sin decimales y en millones (escala de IDR), y un nombre largo.
  id: [
    { mercado: "id" as CodigoMercado, pais: "ID", nombrePais: "Indonesia", locale: "id-ID", trato: "usted", moneda: "IDR" as Moneda, escala: 16000 },
    { mercado: "vc" as CodigoMercado, pais: "VC", nombrePais: "Saint Vincent dan Grenadine", locale: "id-ID", trato: "usted", moneda: "XCD" as Moneda, escala: 2.5 },
  ],
  // Turco (ADR 0002, D12): liras con «₺» delante y coma decimal, el nombre largo de siempre y uno
  // largo con posesivo («Demokratik Kongo Cumhuriyeti», que pide «Cumhuriyeti'nde» en el locativo).
  tr: [
    { mercado: "tr" as CodigoMercado, pais: "TR", nombrePais: "Türkiye", locale: "tr-TR", trato: "usted", moneda: "TRY" as Moneda, escala: 40 },
    { mercado: "vc" as CodigoMercado, pais: "VC", nombrePais: "Saint Vincent ve Grenadinler", locale: "tr-TR", trato: "usted", moneda: "XCD" as Moneda, escala: 2.5 },
    { mercado: "cd" as CodigoMercado, pais: "CD", nombrePais: "Demokratik Kongo Cumhuriyeti", locale: "tr-TR", trato: "usted", moneda: "CDF" as Moneda, escala: 2800 },
  ],
  // Bengalí (ADR 0002, D14): taka en la escala de BDT (cientos de miles y lakhs) y un nombre largo.
  bn: [
    { mercado: "bd" as CodigoMercado, pais: "BD", nombrePais: "বাংলাদেশ", locale: "bn-BD", trato: "usted", moneda: "BDT" as Moneda, escala: 120 },
    { mercado: "vc" as CodigoMercado, pais: "VC", nombrePais: "সেন্ট ভিনসেন্ট ও গ্রেনাডিনস", locale: "bn-BD", trato: "usted", moneda: "XCD" as Moneda, escala: 2.5 },
  ],
  // Tailandés (ADR 0002, D13): baht con escala de THB, fechas en พ.ศ. (th-TH) y un nombre de país largo.
  th: [
    { mercado: "th" as CodigoMercado, pais: "TH", nombrePais: "ไทย", locale: "th-TH", trato: "usted", moneda: "THB" as Moneda, escala: 35 },
    { mercado: "vc" as CodigoMercado, pais: "VC", nombrePais: "เซนต์วินเซนต์และเกรนาดีนส์", locale: "th-TH", trato: "usted", moneda: "XCD" as Moneda, escala: 2.5 },
  ],
  // Ucraniano (ADR 0002, D15): гривня con «₴» detrás y espacio de miles, un nombre largo que se declina
  // por partes («на Сент-Вінсенті і Гренадинах») y uno con adjetivos delante («в Обʼєднаних Арабських
  // Еміратах»).
  uk: [
    { mercado: "ua" as CodigoMercado, pais: "UA", nombrePais: "Україна", locale: "uk-UA", trato: "usted", moneda: "UAH" as Moneda, escala: 41 },
    { mercado: "vc" as CodigoMercado, pais: "VC", nombrePais: "Сент-Вінсент і Гренадіни", locale: "uk-UA", trato: "usted", moneda: "XCD" as Moneda, escala: 2.5 },
    { mercado: "ae" as CodigoMercado, pais: "AE", nombrePais: "Обʼєднані Арабські Емірати", locale: "uk-UA", trato: "usted", moneda: "AED" as Moneda, escala: 3.67 },
  ],
  // Uzbeko (ADR 0002, D16): soʻm con espacio de miles y coma decimal («1 234 567,50 soʻm»), el nombre
  // largo de siempre y uno largo compuesto que toma el sufijo en la última palabra.
  uz: [
    { mercado: "uz" as CodigoMercado, pais: "UZ", nombrePais: "Oʻzbekiston", locale: "uz-UZ", trato: "usted", moneda: "UZS" as Moneda, escala: 12500 },
    { mercado: "vc" as CodigoMercado, pais: "VC", nombrePais: "Sent-Vinsent va Grenadin", locale: "uz-UZ", trato: "usted", moneda: "XCD" as Moneda, escala: 2.5 },
    { mercado: "cd" as CodigoMercado, pais: "CD", nombrePais: "Kongo Demokratik Respublikasi", locale: "uz-UZ", trato: "usted", moneda: "CDF" as Moneda, escala: 2800 },
  ],
  // Ruso (ADR 0002, D17): Kazajistán con el tenge («₸» detrás y espacio de miles), un nombre largo que
  // se declina por partes («на Сент-Винсенте и Гренадинах») y uno con adjetivos delante («в
  // Объединенных Арабских Эмиратах»).
  ru: [
    { mercado: "kz" as CodigoMercado, pais: "KZ", nombrePais: "Казахстан", locale: "ru-KZ", trato: "usted", moneda: "KZT" as Moneda, escala: 500 },
    { mercado: "vc" as CodigoMercado, pais: "VC", nombrePais: "Сент-Винсент и Гренадины", locale: "ru-KZ", trato: "usted", moneda: "XCD" as Moneda, escala: 2.5 },
    { mercado: "ae" as CodigoMercado, pais: "AE", nombrePais: "Объединенные Арабские Эмираты", locale: "ru-RU", trato: "usted", moneda: "AED" as Moneda, escala: 3.67 },
  ],
  // Rumano (ADR 0002, D18): Rumania con el leu (RON, punto de miles y coma decimal), Moldavia con el
  // leu moldavo (MDL, ro-MD) y un nombre largo que no se declina y va con «din» («din Saint Vincent și
  // Grenadinele»), más uno compuesto que sí («Statelor Unite ale Americii»).
  ro: [
    { mercado: "ro" as CodigoMercado, pais: "RO", nombrePais: "România", locale: "ro-RO", trato: "usted", moneda: "RON" as Moneda, escala: 4.6 },
    { mercado: "md" as CodigoMercado, pais: "MD", nombrePais: "Republica Moldova", locale: "ro-MD", trato: "usted", moneda: "MDL" as Moneda, escala: 18 },
    { mercado: "vc" as CodigoMercado, pais: "VC", nombrePais: "Saint Vincent și Grenadinele", locale: "ro-RO", trato: "usted", moneda: "XCD" as Moneda, escala: 2.5 },
    { mercado: "us" as CodigoMercado, pais: "US", nombrePais: "Statele Unite ale Americii", locale: "ro-RO", trato: "usted", moneda: "USD" as Moneda, escala: 1 },
  ],
  // Checo (ADR 0002, D19): koruna con «Kč» detrás y espacio de miles, un nombre largo que se declina
  // por partes («na Svatém Vincenci a Grenadinách») y uno plural con adjetivos delante («ve Spojených
  // arabských emirátech»).
  // Eslovaco (ADR 0002, D25): euros con espacio de miles, un nombre largo que se declina por partes
  // («na Svätom Vincente a Grenadínach») y uno plural con adjetivos delante.
  sk: [
    { mercado: "sk" as CodigoMercado, pais: "SK", nombrePais: "Slovensko", locale: "sk-SK", trato: "usted", moneda: "EUR" as Moneda, escala: 1 },
    { mercado: "vc" as CodigoMercado, pais: "VC", nombrePais: "Svätý Vincent a Grenadíny", locale: "sk-SK", trato: "usted", moneda: "XCD" as Moneda, escala: 2.5 },
    { mercado: "ae" as CodigoMercado, pais: "AE", nombrePais: "Spojené arabské emiráty", locale: "sk-SK", trato: "usted", moneda: "AED" as Moneda, escala: 4 },
  ],
  cs: [
    { mercado: "cz" as CodigoMercado, pais: "CZ", nombrePais: "Česko", locale: "cs-CZ", trato: "usted", moneda: "CZK" as Moneda, escala: 23 },
    { mercado: "vc" as CodigoMercado, pais: "VC", nombrePais: "Svatý Vincenc a Grenadiny", locale: "cs-CZ", trato: "usted", moneda: "XCD" as Moneda, escala: 2.5 },
    { mercado: "ae" as CodigoMercado, pais: "AE", nombrePais: "Spojené arabské emiráty", locale: "cs-CZ", trato: "usted", moneda: "AED" as Moneda, escala: 3.67 },
  ],
  // Griego (ADR 0002, D20): euro con «€» detrás y punto de miles en Grecia y en Chipre, el nombre
  // largo masculino que se declina por partes («στον Άγιο Βικέντιο και Γρεναδίνες») y uno plural
  // neutro («στα Ηνωμένα Αραβικά Εμιράτα»).
  el: [
    { mercado: "gr" as CodigoMercado, pais: "GR", nombrePais: "Ελλάδα", locale: "el-GR", trato: "usted", moneda: "EUR" as Moneda, escala: 1 },
    { mercado: "cy" as CodigoMercado, pais: "CY", nombrePais: "Κύπρος", locale: "el-CY", trato: "usted", moneda: "EUR" as Moneda, escala: 1 },
    { mercado: "vc" as CodigoMercado, pais: "VC", nombrePais: "Άγιος Βικέντιος και Γρεναδίνες", locale: "el-GR", trato: "usted", moneda: "XCD" as Moneda, escala: 2.5 },
    { mercado: "ae" as CodigoMercado, pais: "AE", nombrePais: "Ηνωμένα Αραβικά Εμιράτα", locale: "el-GR", trato: "usted", moneda: "AED" as Moneda, escala: 3.67 },
  ],
  // Húngaro (ADR 0002, D21): forintos sin decimales con «Ft» detrás y espacio de miles, un nombre largo
  // con artículo y sufijo de isla («a Saint Vincent és a Grenadine-szigeteken») y uno compuesto en
  // -ország («Németországban»).
  // Mongol (ADR 0002, D28): tugrik con ₮ delante y coma de miles, un nombre largo que ya trae «Улс»
  // («Бүгд Найрамдах Доминикан Улсад») y uno en plural («Соломоны арлуудад»).
  mn: [
    { mercado: "mn" as CodigoMercado, pais: "MN", nombrePais: "Монгол Улс", locale: "mn-MN", trato: "usted", moneda: "MNT" as Moneda, escala: 3400 },
    { mercado: "do" as CodigoMercado, pais: "DO", nombrePais: "Бүгд Найрамдах Доминикан Улс", locale: "mn-MN", trato: "usted", moneda: "DOP" as Moneda, escala: 60 },
    { mercado: "vc" as CodigoMercado, pais: "VC", nombrePais: "Сент-Винсент ба Гренадин", locale: "mn-MN", trato: "usted", moneda: "XCD" as Moneda, escala: 2.5 },
    { mercado: "sb" as CodigoMercado, pais: "SB", nombrePais: "Соломоны арлууд", locale: "mn-MN", trato: "usted", moneda: "SBD" as Moneda, escala: 8 },
  ],
  // Armenio (ADR 0002, D30): dram con «֏» detrás, «Սենթ Վինսենթ և Գրենադիններ» por el nombre largo con «և»
  // («Սենթ Վինսենթ և Գրենադիններում») y «Միացյալ Նահանգներ» por el plural.
  hy: [
    { mercado: "am" as CodigoMercado, pais: "AM", nombrePais: "Հայաստան", locale: "hy-AM", trato: "usted", moneda: "AMD" as Moneda, escala: 400 },
    { mercado: "vc" as CodigoMercado, pais: "VC", nombrePais: "Սենթ Վինսենթ և Գրենադիններ", locale: "hy-AM", trato: "usted", moneda: "XCD" as Moneda, escala: 2.5 },
    { mercado: "us" as CodigoMercado, pais: "US", nombrePais: "Միացյալ Նահանգներ", locale: "hy-AM", trato: "usted", moneda: "USD" as Moneda, escala: 1 },
  ],
  // Albanés (ADR 0002, D31): lek sin decimales detrás; un nombre largo que se declina por partes («të
  // Shën-Vincentit dhe Grenadineve») y uno plural con adjetivos («në Emiratet e Bashkuara Arabe»).
  sq: [
    { mercado: "al" as CodigoMercado, pais: "AL", nombrePais: "Shqipëri", locale: "sq-AL", trato: "usted", moneda: "ALL" as Moneda, escala: 1 },
    { mercado: "vc" as CodigoMercado, pais: "VC", nombrePais: "Shën-Vincent dhe Grenadine", locale: "sq-AL", trato: "usted", moneda: "XCD" as Moneda, escala: 2.5 },
    { mercado: "ae" as CodigoMercado, pais: "AE", nombrePais: "Emiratet e Bashkuara Arabe", locale: "sq-AL", trato: "usted", moneda: "AED" as Moneda, escala: 3.67 },
  ],
  // Esloveno (ADR 0002, D32): euro detrás con punto de miles; un nombre largo que se declina por partes («na
  // Svetem Vincenciju in Grenadinah») y uno plural con adjetivos delante («v Združenih arabskih emiratih»).
  sl: [
    { mercado: "si" as CodigoMercado, pais: "SI", nombrePais: "Slovenija", locale: "sl-SI", trato: "usted", moneda: "EUR" as Moneda, escala: 1 },
    { mercado: "vc" as CodigoMercado, pais: "VC", nombrePais: "Sveti Vincencij in Grenadine", locale: "sl-SI", trato: "usted", moneda: "XCD" as Moneda, escala: 2.5 },
    { mercado: "ae" as CodigoMercado, pais: "AE", nombrePais: "Združeni arabski emirati", locale: "sl-SI", trato: "usted", moneda: "AED" as Moneda, escala: 3.67 },
  ],
  // Estonio (ADR 0002, D33): euro detrás con espacio de miles; un nombre largo que se declina por partes
  // («Saint Vincentil ja Grenadiinidel») y uno plural de tabla («Araabia Ühendemiraatides»).
  et: [
    { mercado: "ee" as CodigoMercado, pais: "EE", nombrePais: "Eesti", locale: "et-EE", trato: "tu", moneda: "EUR" as Moneda, escala: 1 },
    { mercado: "vc" as CodigoMercado, pais: "VC", nombrePais: "Saint Vincent ja Grenadiinid", locale: "et-EE", trato: "tu", moneda: "XCD" as Moneda, escala: 2.5 },
    { mercado: "ae" as CodigoMercado, pais: "AE", nombrePais: "Araabia Ühendemiraadid", locale: "et-EE", trato: "tu", moneda: "AED" as Moneda, escala: 3.67 },
  ],
  // Islandés (ADR 0002, D34): coronas sin decimales con «kr.» detrás y punto de miles; un nombre largo con
  // «á» y plural («á Sankti Vinsent og Grenadíneyjum») y uno plural con adjetivos («í Sameinuðu arabísku furstadæmunum»).
  is: [
    { mercado: "is" as CodigoMercado, pais: "IS", nombrePais: "Ísland", locale: "is-IS", trato: "tu", moneda: "ISK" as Moneda, escala: 150 },
    { mercado: "vc" as CodigoMercado, pais: "VC", nombrePais: "Sankti Vinsent og Grenadíneyjar", locale: "is-IS", trato: "tu", moneda: "XCD" as Moneda, escala: 2.5 },
    { mercado: "ae" as CodigoMercado, pais: "AE", nombrePais: "Sameinuðu arabísku furstadæmin", locale: "is-IS", trato: "tu", moneda: "AED" as Moneda, escala: 3.67 },
  ],
  // Letón (ADR 0002, D35): euro detrás, con espacio de miles desde 5 cifras; un nombre largo que se declina
  // por partes («Sentvinsentā un Grenadīnās») y uno plural con adjetivo («Apvienotajos Arābu Emirātos»).
  lv: [
    { mercado: "lv" as CodigoMercado, pais: "LV", nombrePais: "Latvija", locale: "lv-LV", trato: "usted", moneda: "EUR" as Moneda, escala: 1 },
    { mercado: "vc" as CodigoMercado, pais: "VC", nombrePais: "Sentvinsenta un Grenadīnas", locale: "lv-LV", trato: "usted", moneda: "XCD" as Moneda, escala: 2.5 },
    { mercado: "ae" as CodigoMercado, pais: "AE", nombrePais: "Apvienotie Arābu Emirāti", locale: "lv-LV", trato: "usted", moneda: "AED" as Moneda, escala: 3.67 },
  ],
  bg: [
    { mercado: "bg" as CodigoMercado, pais: "BG", nombrePais: "България", locale: "bg-BG", trato: "usted", moneda: "EUR" as Moneda, escala: 1 },
    { mercado: "vc" as CodigoMercado, pais: "VC", nombrePais: "Сейнт Винсънт и Гренадини", locale: "bg-BG", trato: "usted", moneda: "XCD" as Moneda, escala: 2.5 },
    { mercado: "ae" as CodigoMercado, pais: "AE", nombrePais: "Обединени арабски емирства", locale: "bg-BG", trato: "usted", moneda: "AED" as Moneda, escala: 4 },
  ],
  // Georgiano (ADR 0002, D26): lari con «₾» detrás, «სენტ-ვინსენტი და გრენადინები» por el nombre largo
  // con «და» («სენტ-ვინსენტსა და გრენადინებში») y «ამერიკის შეერთებული შტატები» por el plural con
  // adjetivo delante («ამერიკის შეერთებულ შტატებში»).
  ka: [
    { mercado: "ge" as CodigoMercado, pais: "GE", nombrePais: "საქართველო", locale: "ka-GE", trato: "usted", moneda: "GEL" as Moneda, escala: 2.7 },
    { mercado: "vc" as CodigoMercado, pais: "VC", nombrePais: "სენტ-ვინსენტი და გრენადინები", locale: "ka-GE", trato: "usted", moneda: "XCD" as Moneda, escala: 2.5 },
    { mercado: "us" as CodigoMercado, pais: "US", nombrePais: "ამერიკის შეერთებული შტატები", locale: "ka-GE", trato: "usted", moneda: "USD" as Moneda, escala: 1 },
  ],
  hu: [
    { mercado: "hu" as CodigoMercado, pais: "HU", nombrePais: "Magyarország", locale: "hu-HU", trato: "tu", moneda: "HUF" as Moneda, escala: 360 },
    { mercado: "vc" as CodigoMercado, pais: "VC", nombrePais: "Saint Vincent és a Grenadine-szigetek", locale: "hu-HU", trato: "tu", moneda: "XCD" as Moneda, escala: 2.5 },
    { mercado: "de" as CodigoMercado, pais: "DE", nombrePais: "Németország", locale: "hu-HU", trato: "tu", moneda: "EUR" as Moneda, escala: 1 },
  ],
  he: [
    { mercado: "il" as CodigoMercado, pais: "IL", nombrePais: "ישראל", locale: "he-IL", trato: "usted", moneda: "ILS" as Moneda, escala: 3.7 },
    { mercado: "vc" as CodigoMercado, pais: "VC", nombrePais: "סנט וינסנט והגרנדינים", locale: "he-IL", trato: "usted", moneda: "XCD" as Moneda, escala: 2.5 },
    { mercado: "gb" as CodigoMercado, pais: "GB", nombrePais: "הממלכה המאוחדת", locale: "he-001", trato: "usted", moneda: "GBP" as Moneda, escala: 1 },
  ],
  // Serbio en latinica (ADR 0002, D23): dinar con «RSD» detrás y punto de miles; Montenegro con euro
  // (los textos de las universales son los mismos); un nombre largo que se declina por partes («na
  // Sent Vinsentu i Grenadinima») y uno plural con adjetivos delante («u Ujedinjenim Arapskim
  // Emiratima»).
  sr: [
    { mercado: "rs" as CodigoMercado, pais: "RS", nombrePais: "Srbija", locale: "sr-Latn-RS", trato: "usted", moneda: "RSD" as Moneda, escala: 100 },
    { mercado: "me" as CodigoMercado, pais: "ME", nombrePais: "Crna Gora", locale: "sr-Latn-ME", trato: "usted", moneda: "EUR" as Moneda, escala: 1 },
    { mercado: "vc" as CodigoMercado, pais: "VC", nombrePais: "Sent Vinsent i Grenadini", locale: "sr-Latn-RS", trato: "usted", moneda: "XCD" as Moneda, escala: 2.5 },
    { mercado: "ae" as CodigoMercado, pais: "AE", nombrePais: "Ujedinjeni Arapski Emirati", locale: "sr-Latn-RS", trato: "usted", moneda: "AED" as Moneda, escala: 3.67 },
  ],
  // Croata (ADR 0002, D27): euro detrás con punto de miles; un nombre largo que se declina por partes («na
  // Svetom Vincentu i Grenadinima») y uno plural con adjetivos delante («u Ujedinjenim Arapskim Emiratima»).
  hr: [
    { mercado: "hr" as CodigoMercado, pais: "HR", nombrePais: "Hrvatska", locale: "hr-HR", trato: "usted", moneda: "EUR" as Moneda, escala: 1 },
    { mercado: "vc" as CodigoMercado, pais: "VC", nombrePais: "Sveti Vincent i Grenadini", locale: "hr-HR", trato: "usted", moneda: "XCD" as Moneda, escala: 2.5 },
    { mercado: "ae" as CodigoMercado, pais: "AE", nombrePais: "Ujedinjeni Arapski Emirati", locale: "hr-HR", trato: "usted", moneda: "AED" as Moneda, escala: 3.67 },
  ],
};

// En ja, ko, zh y todos los idiomas que entraron después (pl, sv, da, nb, fi, ar, id, tr, bn, th...)
// las reglas de puntuación, registro y escritura (scripts/reglas_idioma.ts) corren sobre toda la página:
// solo los traductores de los siete idiomas latinos del principio no las necesitaban.
const IDIOMAS_LATINOS_INICIALES: readonly Idioma[] = ["es", "pt", "en", "fr", "de", "it", "nl"];
const REGLAS_COMPLETAS: ReadonlySet<Idioma> = new Set<Idioma>(IDIOMAS.filter((i) => !IDIOMAS_LATINOS_INICIALES.includes(i)));

// Palabras que delatan otra variante del idioma. `todo` revisa la página entera (contenido incluido);
// si no, solo lo que sale de ui (etiquetas, opciones, observaciones y errores), que es lo que hoy
// ramifica por locale en pt, fr y de.
interface Vocabulario {
  todo: boolean;
  prohibidas: readonly (readonly [RegExp, string])[];
}

const VOCABULARIO: Readonly<Record<string, Vocabulario>> = {
  "es-ES": {
    todo: true,
    prohibidas: [
      [/\bautos?\b/i, "coche"],
      [/\bcostos?\b/i, "coste"],
      [/\btasas? (de interés|anual(?! equivalente)|nominal|efectiva)/i, "tipo de interés / TAE"],
      [/\btasa(s)? del IVA|\btasas? de IVA/i, "tipo de IVA"],
      [/\bcomputadora/i, "ordenador"],
      [/\bcontrapiso/i, "solera"],
      [/\baguinaldo/i, "pagas extra"],
      [/\bpor mes\b/i, "al mes"],
      [/\b(te|le) ofrecieron\b/i, "te han ofrecido"],
      [/\bsin goce\b/i, "no retribuida"],
      [/\benganche\b|\bo pie\b|\bel pie\b/i, "entrada"],
      [/revisión técnica/i, "ITV"],
      [/\bheladera|\brefrigerador/i, "frigorífico"],
      [/\bnafta\b/i, "gasolina"],
      [/\bcelular/i, "móvil"],
      [/\bestacionamiento/i, "aparcamiento"],
      [/\bporcelanato/i, "gres porcelánico"],
      [/\bcerámicos\b/i, "baldosas"],
      [/\bmanej(ar|as|a|o)\b/i, "conducir"],
      [/\bdepartamento\b/i, "piso"],
      [/\bplata\b/i, "dinero"],
      [/\bacá\b/i, "aquí"],
      [/\bchequea/i, "comprueba"],
      [/\bmontos?\b/i, "importe / cantidad"],
      [/\baportes?\b/i, "aportación"],
      [/\bmercadería/i, "mercancía"],
      [/\bse prende|\bprender\b/i, "encender"],
    ],
  },
  "pt-PT": {
    todo: false,
    prohibidas: [
      [/\baluguel/i, "renda"],
      [/\bparcela/i, "prestação"],
      [/\beconomiz/i, "poupar"],
      [/\bconcreto\b/i, "betão"],
      [/\bgeladeira/i, "frigorífico"],
      [/\bcelular/i, "telemóvel"],
      [/(?<!\p{L})ônibus|\btrem\b/iu, "autocarro / comboio"],
      [/\bregistro/i, "registo"],
      [/\bcontato/i, "contacto"],
      [/ôm|ôn|(?<![tv])ên(?!c)|(?<![tv])êm/i, "acentuação de Portugal (económico, género, prémio)"],
      [/\bvocê/i, "sem «você»"],
      [/\bestá [a-z]+ndo\b/i, "está a + infinitivo"],
      [/\bpiso\b/i, "pavimento"],
      [/\bplano de saúde/i, "seguro de saúde"],
      [/\bporcentage/i, "percentagem"],
      [/\btaxa de juros\b/i, "taxa de juro"],
      [/\bfinanciamento\b/i, "crédito"],
      [/\bcoloque\b/i, "indique"],
      [/\bquit(ar|a|e|ou)\b/i, "liquidar"],
      [/\bmoradia\b/i, "habitação"],
      [/\baposentadoria/i, "reforma"],
      [/\bcorretagem/i, "comissão de mediação"],
      [/\bIPTU\b/, "IMI"],
      [/\busuário/i, "utilizador"],
      [/\bplanilha/i, "folha de cálculo"],
    ],
  },
  // Lo que en la norma europea es propio de Portugal y no vale en Angola, Mozambique o Cabo Verde.
  [PT_LUSOFONIA]: {
    todo: true,
    prohibidas: [
      [/IRS/, "imposto sobre o rendimento"],
      [/IM[IT]/, "imposto predial / impostos sobre a compra"],
      [/IUC/, "impostos do veículo"],
      [/PPR/, "poupança para a reforma"],
      [/Segurança Social/, "segurança social"],
      [/duodécimos/i, "salário de cada mês"],
      [/Portugal/, "o país do mercado"],
    ],
  },
  "fr-CA": {
    todo: false,
    prohibidas: [
      [/apport personnel/i, "mise de fonds"],
      [/\bcrédit immobilier|\bprêt immobilier/i, "prêt hypothécaire"],
      [/\bweek-end/i, "fin de semaine"],
      [/\bparking\b/i, "stationnement"],
      [/\bcarrelage/i, "céramique"],
      [/\bTVA\b/, "taxes de vente"],
      [/\bcharges de copropriété/i, "frais de condo"],
      [/\bmutuelle/i, "assurance collective"],
    ],
  },
  "de-CH": { todo: true, prohibidas: [[/ß/, "ss"]] },
};

// Todos los textos que devuelve ui, con las funciones llamadas con argumentos de prueba.
function textosDeUi(valor: unknown, salida: string[] = []): string[] {
  if (typeof valor === "string") salida.push(valor);
  else if (typeof valor === "function") {
    try {
      textosDeUi((valor as (...a: unknown[]) => unknown)("1", "2", "3", "4"), salida);
    } catch {
      try {
        textosDeUi((valor as (...a: unknown[]) => unknown)(1, 2, 3, 4), salida);
      } catch {
        // Una función de ui que no acepta argumentos de prueba no aporta texto para revisar.
      }
    }
  } else if (Array.isArray(valor)) valor.forEach((v) => textosDeUi(v, salida));
  else if (valor && typeof valor === "object") Object.values(valor).forEach((v) => textosDeUi(v, salida));
  return salida;
}

function contexto(id: string, idioma: Idioma, base: Partial<ContextoUniversal>, datos: readonly string[] = []): ContextoUniversal {
  const mercado = base.mercado as CodigoMercado;
  return {
    id: `${mercado}.${id}`,
    slug: "",
    mercado,
    pais: base.pais ?? "",
    nombrePais: base.nombrePais ?? "",
    locale: base.locale ?? "es",
    idioma,
    trato: (base.trato ?? "tu") as Trato,
    moneda: (base.moneda ?? "USD") as Moneda,
    escala: base.escala ?? 1,
    unidades: base.unidades ?? "metrico",
    estado: "publicado",
    datos: Object.fromEntries(datos.map((d) => [d, `${mercado}.${d}`])),
  };
}

function textosVisibles(c: ReturnType<typeof instanciar>): string[] {
  const { definicion: d, contenido: k } = c;
  const campos = d.campos.flatMap((f) => [f.etiqueta, f.ayuda ?? "", ...("opciones" in f ? f.opciones.map((o) => o.etiqueta) : [])]);
  return [
    k.h1,
    k.title,
    k.description,
    ...k.intro,
    ...k.comoSeCalcula,
    ...(k.ejemplo ?? []),
    ...k.faq.flatMap((f) => [f.pregunta, f.respuesta]),
    ...k.glosario.flatMap((g) => [g.termino, g.definicion]),
    ...campos,
    ...d.resultado.flatMap((r) => [r.etiqueta, r.ayuda ?? ""]),
    ...(d.tablas ?? []).map((t) => t.titulo),
  ];
}

function esTabla(v: unknown): v is TablaResultado {
  return typeof v === "object" && v !== null && (v as TablaResultado).tipo === "tabla";
}

async function main() {
  const filtro = process.argv[2];
  const fallas: string[] = [];
  let probados = 0;
  const ids = new Set<string>();

  for (const u of UNIVERSALES) {
    if (filtro && u.id !== filtro) continue;
    if (ids.has(u.id)) fallas.push(`${u.id}: id repetido`);
    ids.add(u.id);
    if (!(u.concepto in CONCEPTOS) || u.concepto === "propio") fallas.push(`${u.id}: concepto "${u.concepto}" no existe o es propio`);
    const idiomas = idiomasDe(u);
    if (!idiomas.includes("es")) fallas.push(`${u.id}: falta el español`);
    for (const i of Object.keys(u.textos) as Idioma[]) if (!u.contenido[i]) fallas.push(`${u.id}: tiene textos en ${i} pero no contenido`);
    for (const i of Object.keys(u.contenido) as Idioma[]) if (!u.textos[i]) fallas.push(`${u.id}: tiene contenido en ${i} pero no textos`);
    if (u.casos.length < 2) fallas.push(`${u.id}: necesita al menos 2 casos`);

    for (const idioma of idiomas) {
      const slug = u.textos[idioma]!.slug;
      if (!RE_SLUG.test(slug)) fallas.push(`${u.id} [${idioma}]: slug "${slug}" no es kebab-case ASCII`);
      for (const base of PRUEBA[idioma]) {
        const ctx = contexto(u.id, idioma, base, u.datos);
        const donde = `${u.id} [${idioma}-${ctx.trato} ${ctx.moneda}]`;
        let inst: ReturnType<typeof instanciar>;
        try {
          inst = instanciar(u, ctx);
        } catch (err) {
          fallas.push(`${donde}: no se arma (${(err as Error).message})`);
          continue;
        }
        const { definicion: d, contenido: k } = inst;
        if (d.id !== ctx.id || d.mercado !== ctx.mercado || d.slug !== slug || d.concepto !== u.concepto) fallas.push(`${donde}: id, mercado, slug o concepto no salen del contexto`);
        const idsCampos = d.campos.map((c) => c.id);
        if (new Set(idsCampos).size !== idsCampos.length) fallas.push(`${donde}: ids de campo repetidos`);
        const largoTitle = anchoVisual(k.title.replace(MARCADOR, "XXXXXXX"));
        if (largoTitle > 60) fallas.push(`${donde}: title de ${largoTitle} de ancho (máximo 60)`);
        const largoDesc = anchoVisual(k.description.replace(MARCADOR, "XXXXXXX"));
        if (largoDesc > 160 || largoDesc < 70) fallas.push(`${donde}: description de ${largoDesc} de ancho (entre 70 y 160)`);
        if (k.faq.length < 3) fallas.push(`${donde}: menos de 3 preguntas frecuentes`);
        if (!k.intro.length || !k.comoSeCalcula.length) fallas.push(`${donde}: falta intro o comoSeCalcula`);
        for (const t of textosVisibles(inst)) {
          if (RE_RAYA.test(t)) fallas.push(`${donde}: raya en «${t.slice(0, 60)}»`);
          if (RE_EMOJI.test(t)) fallas.push(`${donde}: emoji en «${t.slice(0, 60)}»`);
        }
        if (REGLAS_COMPLETAS.has(idioma)) {
          const ui = textosDeUi(u.textos[idioma]!.ui(ctx.trato, ctx.locale));
          for (const t of new Set([...ui, ...textosVisibles(inst)])) {
            for (const p of problemasDeTexto(t, idioma, ctx.trato, ctx.locale)) fallas.push(`${u.id} [${ctx.locale}]: ${p} en «${t.slice(0, 70)}»`);
          }
        }
        for (const vocabulario of variantesDeLocale(ctx.locale).flatMap((k) => VOCABULARIO[k] ?? [])) {
          const ui = textosDeUi(u.textos[idioma]!.ui(ctx.trato, ctx.locale));
          const revisar = vocabulario.todo ? [...ui, ...textosVisibles(inst)] : ui;
          const vistas = new Set<string>();
          for (const t of revisar) {
            for (const [re, va] of vocabulario.prohibidas) {
              const m = re.exec(t);
              if (!m) continue;
              const clave = `${m[0]}|${t}`;
              if (vistas.has(clave)) continue;
              vistas.add(clave);
              fallas.push(`${u.id} [${ctx.locale}]: «${m[0]}» (va ${va}) en «${t.slice(0, 90)}»`);
            }
          }
        }

        const mercadoPrueba = { codigo: ctx.mercado, monedas: [ctx.moneda] as const, redondeo: { decimales: 2, modo: "mitad-arriba" as const } };
        u.casos.forEach((caso, n) => {
          if (caso.contexto?.idioma && caso.contexto.idioma !== idioma) return;
          if (caso.contexto?.moneda && caso.contexto.moneda !== ctx.moneda) return;
          if (caso.contexto?.unidades && caso.contexto.unidades !== ctx.unidades) return;
          probados++;
          const id = `${donde} caso ${n + 1} «${caso.nombre}»`;
          if (!caso.detalle?.trim()) fallas.push(`${id}: sin detalle de la cuenta`);
          const valores = { ...Object.fromEntries(Object.entries(caso.valores ?? {}).map(([k2, v]) => [`${ctx.mercado}.${k2}`, v])) };
          let r: ResultadoBase;
          try {
            r = d.calcular(caso.entrada as never, valores as never, crearContexto(mercadoPrueba, caso.fecha, d));
          } catch (err) {
            if (caso.esperaError && err instanceof ErrorEntrada) return;
            return void fallas.push(`${id}: ${caso.esperaError ? "esperaba ErrorEntrada y salió" : "tiró"} ${(err as Error).message}`);
          }
          if (caso.esperaError) return void fallas.push(`${id}: esperaba ErrorEntrada y calculó`);
          for (const fila of d.resultado) if (!(fila.clave in r)) fallas.push(`${id}: la fila "${fila.clave}" no sale de calcular()`);
          for (const t of d.tablas ?? []) if (!esTabla(r[t.clave])) fallas.push(`${id}: la tabla "${t.clave}" no sale de calcular()`);
          const tol = caso.tolerancia ?? TOLERANCIA;
          for (const [clave, esperado] of Object.entries(caso.esperado ?? {})) {
            const real = r[clave];
            if (typeof esperado === "number") {
              if (typeof real !== "number" || Math.abs(real - esperado) > tol) fallas.push(`${id}: ${clave} dio ${String(real)}, esperado ${esperado}`);
            } else if (JSON.stringify(real) !== JSON.stringify(esperado)) fallas.push(`${id}: ${clave} dio ${JSON.stringify(real)}, esperado ${JSON.stringify(esperado)}`);
          }
          const ser: ContextoSerializado = {
            fecha: caso.fecha,
            mercado: ctx.mercado,
            locale: ctx.locale,
            idioma,
            trato: ctx.trato,
            moneda: ctx.moneda,
            redondeo: mercadoPrueba.redondeo,
            regiones: [],
          };
          try {
            formatearFilas(d, r, ser);
          } catch (err) {
            fallas.push(`${id}: el resultado no se puede mostrar (${(err as Error).message})`);
          }
        });
      }
    }
  }

  if (filtro && !ids.size) fallas.push(`no hay universal con id "${filtro}"`);
  if (fallas.length) {
    console.error(`check_universales: ${fallas.length} fallas\n${fallas.map((f) => `  ✗ ${f}`).join("\n")}`);
    process.exit(1);
  }
  console.log(`check_universales: ${ids.size} universales, ${probados} casos probados ✓`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
