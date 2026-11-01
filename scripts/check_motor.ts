// Pruebas del motor multi-país (src/motor): formato y parseo por locale, redondeo, vigencia en los
// bordes de tramo y por zona horaria, que vigente() nunca devuelva un tramo no verificado, que un
// tramo vencido saque la calculadora de lo publicable, validación de archivos, registro, formulario
// y bandas de series. Usa el mercado ficticio zz y datos sintéticos. Sin red y sin reloj.
// También compara el mapa de cargadores del cliente intl con el registro:
//   npx tsx scripts/check_motor.ts --generar-cargadores     lo reescribe
import { existsSync, mkdirSync, readdirSync, readFileSync, unlinkSync, writeFileSync } from "node:fs";
import path from "node:path";
import { aplicarEscala, aplicarEscalaMarginal, definirCalculadora, ErrorEntrada } from "../src/motor/calculo";
import { revisarPuntos } from "../src/motor/bandas";
import { validarArchivoDatos, validarArchivoSeries, validarUrl } from "../src/motor/datos";
import { normalizar } from "../src/components/buscador/indice";
import { anchoVisual } from "../src/motor/ancho";
import { decimalesDeMoneda, formatearFecha, formatearMoneda, formatearNumero, formatearPorcentaje, formatearValorUnidad, mayusculaInicial, minusculaInicial, parsearNumero, redondear, sugerenciaMiles } from "../src/motor/formato";
import { cifrasBn } from "../src/motor/i18n/bengali";
import { casosKa, casosHy, esetekHu, GRAMATICA, neveloHu } from "../src/motor/i18n/gramatica";
import { campoVisible, ejecutar, mensajeDeError, opcionesDe, parsearEntrada, valoresIniciales } from "../src/motor/formulario";
import { textosSitio } from "../src/motor/i18n";
import { problemasDeTexto } from "./reglas_idioma";
import { formaRo, pluralCs, pluralSk, pluralEl, pluralRo, pluralRu, pluralUk } from "../src/motor/i18n/plural";
import { pluralHe, prefijoHe } from "../src/motor/i18n/hebreo";
import { pluralSq, pluralSr } from "../src/motor/i18n/plural";
import { pluralHr } from "../src/motor/i18n/plural";
import { crearRegistro, definirEdicion, definirPais, esUniversal, marcadoresDe, publicabilidad, rellenarContenido, resolverValores } from "../src/motor/registro";
import { UNIVERSALES } from "../src/motor/universales";
import { idiomasDe } from "../src/motor/universales/tipos";
import { textosMotor } from "../src/motor/textos";
import type { ContextoSerializado, Dato, FechaISO, Mercado, PaisDefinido, PropsCalculadora, Serie, Tramo } from "../src/motor/tipos";
import { validarPais } from "../src/motor/validar";
import { fechaEnZona, hoyEn, sumarDias, valorSerie, vigente } from "../src/motor/vigencia";
import zz from "../src/paises/zz";
import bono from "../src/paises/zz/calculadoras/bono";
import datosZz from "../src/paises/zz/datos.json";
import { detectores } from "../src/paises/zz/fuentes";
import { registro as registroReal } from "../src/paises";
import { crudoDeNumero } from "../src/lib/prefill/intl-cliente";

delete process.env.CALCULAR_HOY;
delete process.env.CALCULAR_HOY_BUILD;

let ok = 0;
const fallas: string[] = [];
function igual(nombre: string, real: unknown, esperado: unknown) {
  const a = JSON.stringify(real);
  const b = JSON.stringify(esperado);
  if (a === b) ok++;
  else fallas.push(`${nombre}: dio ${a}, esperado ${b}`);
}
function verdad(nombre: string, cond: boolean, detalle = "") {
  if (cond) ok++;
  else fallas.push(`${nombre}${detalle ? `: ${detalle}` : ""}`);
}
const sinNbsp = (s: string) => s.replace(/[  ]/g, " ");

// Formato de moneda por locale (el espacio duro de Intl se normaliza para comparar).
igual("moneda es-PE", sinNbsp(formatearMoneda(1474.77, "es-PE", "PEN")), "S/ 1,474.77");
igual("moneda es-MX", sinNbsp(formatearMoneda(9582.47, "es-MX", "MXN")), "$9,582.47");
igual("moneda es-CO sin decimales", sinNbsp(formatearMoneda(1750905, "es-CO", "COP", 0)), "$ 1.750.905");
igual("moneda es-UY", sinNbsp(formatearMoneda(1234.5, "es-UY", "UYU")), "$ 1.234,50");
igual("moneda es-CL (CLP sin decimales)", sinNbsp(formatearMoneda(553553, "es-CL", "CLP")), "$553.553");
igual("moneda es-AR", sinNbsp(formatearMoneda(12500000.5, "es-AR", "ARS")), "$ 12.500.000,50");
igual("moneda pt-BR", sinNbsp(formatearMoneda(1474.77, "pt-BR", "BRL")), "R$ 1.474,77");
igual("porcentaje es-PE", sinNbsp(formatearPorcentaje(9, "es-PE")), "9%");
igual("porcentaje es-CO", sinNbsp(formatearPorcentaje(1.37, "es-CO")), "1,37%");
igual("moneda es-PA con símbolo local", sinNbsp(formatearMoneda(1250.5, "es-PA", "USD", undefined, "B/.")), "B/. 1,250.50");
igual("fecha es-MX", formatearFecha("2026-12-20", "es-MX"), "20 de diciembre de 2026");
igual("fecha ar-SA gregoriana con dígitos latinos", formatearFecha("2026-12-20", "ar-SA-u-ca-gregory-nu-latn"), "20 ديسمبر 2026");
// En rtl el «$» de «US$» se iría al otro lado de las letras: lleva una LRM detrás (formatearMoneda).
igual("moneda USD en ar-EG con LRM tras el símbolo", formatearMoneda(2849, "ar-EG-u-ca-gregory-nu-latn", "USD").endsWith("US$\u200e"), true);
igual("moneda EGP en ar-EG sin LRM", formatearMoneda(2849, "ar-EG-u-ca-gregory-nu-latn", "EGP").includes("\u200e"), false);
igual("número ar-EG con dígitos latinos", formatearNumero(1234567.5, "ar-EG-u-ca-gregory-nu-latn"), "1,234,567.5");
igual("dual árabe", formatearValorUnidad(2, "dias", "ar-EG-u-ca-gregory-nu-latn"), "يومان");
igual("plural árabe de 3 a 10", formatearValorUnidad(3, "meses", "ar-EG-u-ca-gregory-nu-latn"), "3 أشهر");
igual("plural árabe de 11 a 99", formatearValorUnidad(11, "anios", "ar-EG-u-ca-gregory-nu-latn"), "11 سنة");
// Bengalí (ADR 0002, D14): dígitos bengalíes y miles en lakh y crore, taka detrás del número.
igual("número bn-BD en lakh con dígitos bengalíes", formatearNumero(1234567.5, "bn-BD"), "১২,৩৪,৫৬৭.৫");
igual("moneda bn-BD sin decimales", sinNbsp(formatearMoneda(2500000, "bn-BD", "BDT", 0)), "২৫,০০,০০০৳");
igual("porcentaje bn-BD", formatearPorcentaje(15.5, "bn-BD"), "১৫.৫%");
igual("fecha bn-BD", formatearFecha("2026-10-24", "bn-BD"), "২৪ অক্টোবর, ২০২৬");
igual("cifrasBn de un año y de un texto ya bengalí", [cifrasBn(2026), cifrasBn("৩ দিন")], ["২০২৬", "৩ দিন"]);
igual("genitivo y locativo bengalí", [GRAMATICA.bn.de("বাংলাদেশ"), GRAMATICA.bn.de("কানাডা"), GRAMATICA.bn.en("বাংলাদেশ"), GRAMATICA.bn.en("কানাডা"), GRAMATICA.bn.en("ইতালি"), GRAMATICA.bn.para("ভারত")], ["বাংলাদেশের", "কানাডার", "বাংলাদেশে", "কানাডায়", "ইতালিতে", "ভারতের জন্য"]);
// El ancho de SEO no cuenta el hasanta ni los signos que van sobre o bajo la letra (ু); los vocálicos
// del costado (ি) cuentan medio latino y la letra uno y medio.
igual("ancho visual bengalí", [anchoVisual("কি"), anchoVisual("ক্ষ"), anchoVisual("কু"), anchoVisual("abc")], [2, 3, 1.5, 3]);
// Hebreo (ADR 0002, D22): Intl he-IL con coma de miles y punto decimal; el ₪ lo pone Intl con sus
// marcas RLM. Plurales one/two/other con el dual en la palabra («יומיים», «שנתיים»).
const sinMarcas = (s: string) => s.replace(/[\u200e\u200f\u00a0]/g, " ").replace(/\s+/g, " ").trim();
igual("moneda ILS en he-IL", sinMarcas(formatearMoneda(1234567.89, "he-IL", "ILS")), "1,234,567.89 ₪");
igual("moneda ILS en he-001", sinMarcas(formatearMoneda(1250.5, "he-001", "ILS")), "1,250.50 ₪");
igual("moneda USD en he-IL con símbolo local con LRM", formatearMoneda(10, "he-IL", "USD", undefined, "US$").includes("US$\u200e"), true);
igual("número he-IL", formatearNumero(1234567.5, "he-IL"), "1,234,567.5");
igual("porcentaje he-IL", sinMarcas(formatearPorcentaje(17.5, "he-IL")), "17.5%");
igual("fecha he-IL gregoriana", formatearFecha("2026-12-20", "he-IL"), "20 בדצמבר 2026");
igual("uno hebreo", formatearValorUnidad(1, "dias", "he-IL"), "יום אחד");
igual("dual hebreo de días", formatearValorUnidad(2, "dias", "he-IL"), "יומיים");
igual("dual hebreo de años", formatearValorUnidad(2, "anios", "he-IL"), "שנתיים");
igual("dual hebreo de meses", formatearValorUnidad(2, "meses", "he-IL"), "חודשיים");
igual("plural hebreo", formatearValorUnidad(3, "meses", "he-IL"), "3 חודשים");
igual("plural hebreo con decimales", formatearValorUnidad(1.5, "anios", "he-IL"), "1.5 שנים");
igual("plural hebreo de 11", formatearValorUnidad(11, "horas", "he-IL"), "11 שעות");
igual("pluralHe sin dual en la palabra", pluralHe(2, { uno: "מחשבון אחד", dos: "שני מחשבונים", otros: "{n} מחשבונים" }), "שני מחשבונים");
igual("prefijo hebreo pegado", prefijoHe("ב", "ישראל"), "בישראל");
igual("prefijo hebreo con guion delante de cifra", prefijoHe("ב", "2026"), "ב-2026");
igual("gramática he: lugar", GRAMATICA.he.en("ישראל"), "בישראל");
igual("gramática he: el artículo se absorbe", GRAMATICA.he.en("הממלכה המאוחדת"), "בממלכה המאוחדת");
igual("gramática he: la ה del nombre se queda", GRAMATICA.he.para("הודו"), "להודו");
igual("gramática he: nombre latino con guion", GRAMATICA.he.en("Zetaland"), "ב-Zetaland");
igual("gramática he: pertenencia", GRAMATICA.he.de("ישראל"), "של ישראל");

// Parseo por locale: el error que multiplica por mil.
const parseos: [string, string, number | null][] = [
  ["es-PE", "1,474.77", 1474.77],
  ["es-PE", "S/ 1,474.77", 1474.77],
  ["es-PE", "S/. 1,474.77", 1474.77],
  ["es-PA", "B/. 1,250.50", 1250.5],
  ["es-PE", "1474.77", 1474.77],
  ["es-PE", "1474,77", 1474.77],
  ["es-PE", "1,230", 1230],
  ["es-PE", "1.230", 1.23],
  ["es-PE", "1.474,77", 1474.77],
  ["es-MX", "$9,582.47", 9582.47],
  ["es-MX", "315.04", 315.04],
  ["es-MX", "1,000,000", 1000000],
  ["es-CO", "1.750.905", 1750905],
  ["es-CO", "$ 1.750.905,50", 1750905.5],
  ["es-CO", "1,5", 1.5],
  ["es-CO", "1.750", 1750],
  ["es-UY", "1.234,56", 1234.56],
  ["es-CL", "553.553", 553553],
  ["es-CL", "$553.553", 553553],
  ["es-AR", "12.500.000,50", 12500000.5],
  ["es-AR", "-1.000", -1000],
  ["pt-BR", "R$ 1.474,77", 1474.77],
  ["es-CR", "1 750 905,50", 1750905.5],
  ["es-419", "2,000", 2000],
  ["es-PE", "1,2,3", null],
  ["es-CO", "1.23.4", null],
  ["es-PE", "abc", null],
  ["es-PE", "", null],
  ["es-PE", "1,", null],
  ["es-PE", "1,2345", null],
  ["pl-PL", "1 234,50", 1234.5],
  ["pl-PL", "1234,5", 1234.5],
  ["pl-PL", "1 234 567,25 zł", 1234567.25],
  ["sv-SE", "1 234,50", 1234.5],
  ["sv-SE", "−12 345,5", -12345.5],
  ["nb-NO", "−1 000 kr", -1000],
  ["fi-FI", "−250,75 €", -250.75],
  ["da-DK", "1.234,50", 1234.5],
  ["da-DK", "1 234,50", 1234.5],
  ["da-DK", "-1.000", -1000],
  ["ar-EG-u-ca-gregory-nu-latn", "٣٬٥٠٠٫٧٥", 3500.75],
  ["ar-EG-u-ca-gregory-nu-latn", "١٢٫٥", 12.5],
  ["ar-EG-u-ca-gregory-nu-latn", "٢٥٠٠٠", 25000],
  ["ar-EG-u-ca-gregory-nu-latn", "3,500.75", 3500.75],
  ["ar-EG-u-ca-gregory-nu-latn", "-١٢", -12],
  ["ar-EG-u-ca-gregory-nu-latn", "١٢،٥", 12.5],
  ["ar-EG-u-ca-gregory-nu-latn", "۱۲۰۰", 1200],
  ["ar-MA-u-ca-gregory-nu-latn", "1.234,5", 1234.5],
  ["ar-MA-u-ca-gregory-nu-latn", "١٫٢٥", 1.25],
  ["ar-EG", "٣٬٥٠٠٫٧٥", 3500.75],
  ["id-ID", "1.234,50", 1234.5],
  ["id-ID", "Rp 1.500.000", 1500000],
  ["id-ID", "Rp 12.345.678,25", 12345678.25],
  ["id-ID", "-250,75", -250.75],
  // Turco: miles con punto, decimal con coma y la lira y el porcentaje delante («₺1.234,50», «%20»).
  ["tr-TR", "1.234,50", 1234.5],
  ["tr-TR", "₺1.500.000", 1500000],
  ["tr-TR", "₺12.345.678,25", 12345678.25],
  ["tr-TR", "-250,75", -250.75],
  ["tr-TR", "%20", 20],
  // Teclado bengalí (Avro, Bijoy, Gboard): dígitos ০-৯, miles en lakh y crore o de a tres.
  ["bn-BD", "১২,৩৪,৫৬৭.৫০", 1234567.5],
  ["bn-BD", "১২৩৪৫৬৭", 1234567],
  ["bn-BD", "12,34,567", 1234567],
  ["bn-BD", "৳ ২৫,০০০", 25000],
  ["bn-BD", "২৫,০০,০০০৳", 2500000],
  ["bn-BD", "-১২.৫", -12.5],
  ["bn-BD", "১,২৩৪.৫", 1234.5],
  ["bn-BD", "১২,৩৪৫,৬৭", null],
  // Tailandés (ADR 0002, D13): miles con coma, palabras de unidad (ล้าน, แสน, หมื่น) y dígitos tailandeses.
  ["th-TH", "1,234.50", 1234.5],
  ["th-TH", "฿1,500,000", 1500000],
  ["th-TH", "2.5 ล้าน", 2500000],
  ["th-TH", "1 ล้าน 5 แสน", 1500000],
  ["th-TH", "3 หมื่นบาท", 30000],
  ["th-TH", "1 ล้าน 250,000", 1250000],
  ["th-TH", "๑,๒๐๐", 1200],
  ["th-TH", "5 แสน 2 ล้าน", null],
  ["th-TH", "1 ล้าน 2,000,000", null],
  // Ucraniano: miles con espacio (U+00A0, como lo da Intl), decimal con coma y la grivna detrás.
  ["uk-UA", "1 234,50", 1234.5],
  ["uk-UA", "1\u00a0234\u00a0567,25\u00a0₴", 1234567.25],
  ["uk-UA", "25 000 грн", 25000],
  ["uk-UA", "-250,75", -250.75],
  ["uk-UA", "19,5%", 19.5],
  // Uzbeko: miles con espacio (U+00A0 de Intl o el espacio del teclado), coma decimal y «soʻm» detrás.
  ["uz-UZ", "1\u00a0234,50", 1234.5],
  ["uz-UZ", "1 234,50", 1234.5],
  ["uz-UZ", "1 500 000 soʻm", 1500000],
  ["uz-UZ", "12 345 678,25 soʻm", 12345678.25],
  ["uz-UZ", "-250,75", -250.75],
  ["uz-UZ", "12,5%", 12.5],
  // Ruso: miles con espacio (U+00A0, como lo da Intl), decimal con coma y el tenge o el rublo detrás.
  ["ru-KZ", "1 234,50", 1234.5],
  ["ru-KZ", "1 234 567,25 ₸", 1234567.25],
  ["ru-KZ", "250 000 тг", 250000],
  ["ru-RU", "25 000 ₽", 25000],
  ["ru-KZ", "-250,75", -250.75],
  ["ru-KZ", "12,5 %", 12.5],
  // Rumano: punto de miles, coma decimal y el leu detrás («RON», «lei», o «MDL» en Moldavia).
  ["ro-RO", "1.234,50", 1234.5],
  ["ro-RO", "1.234.567,25 RON", 1234567.25],
  ["ro-RO", "4.050 lei", 4050],
  ["ro-MD", "12.500,75 MDL", 12500.75],
  ["ro-RO", "-250,75", -250.75],
  ["ro-RO", "19,5 %", 19.5],
  // Checo: miles con espacio (U+00A0, como lo da Intl), decimal con coma y «Kč» detrás.
  // Eslovaco: miles con espacio, decimal con coma y € detrás.
  ["sk-SK", "1 234,50", 1234.5],
  ["sk-SK", "1 234 567,25 €", 1234567.25],
  ["sk-SK", "-250,75", -250.75],
  ["sk-SK", "23 %", 23],
  ["cs-CZ", "1 234,50", 1234.5],
  ["cs-CZ", "1 234 567,25 Kč", 1234567.25],
  ["cs-CZ", "25 000 Kč", 25000],
  ["cs-CZ", "-250,75", -250.75],
  ["cs-CZ", "21 %", 21],
  // Griego: punto de miles, coma decimal y «€» detrás con espacio (U+00A0, como lo da Intl).
  ["el-GR", "1.234,50", 1234.5],
  ["el-GR", "1.234.567,25 €", 1234567.25],
  ["el-CY", "25.000 €", 25000],
  ["el-GR", "-250,75", -250.75],
  ["el-GR", "24%", 24],
  // Húngaro: miles con espacio (U+00A0, y sin espacio con cuatro cifras, como lo da Intl: «1234,5»),
  // decimal con coma y «Ft» detrás.
  // Mongol: como en inglés, coma de miles y punto decimal, ₮ delante con espacio.
  ["mn-MN", "1,234.50", 1234.5],
  ["mn-MN", "1234.5", 1234.5],
  ["mn-MN", "₮ 1,500,000", 1500000],
  ["mn-MN", "-250.75", -250.75],
  ["mn-MN", "20%", 20],
  // Búlgaro: miles con espacio, decimal con coma y € detrás (Bulgaria en el euro desde el 1/1/2026).
  // Armenio: miles con espacio (U+00A0) desde cinco cifras, decimal con coma y ֏ detrás (D30).
  ["hy-AM", "1 234,50", 1234.5],
  ["hy-AM", "1234,5", 1234.5],
  ["hy-AM", "1 500 000 ֏", 1500000],
  ["hy-AM", "-250,75", -250.75],
  ["hy-AM", "20%", 20],
  ["bg-BG", "1 234,50", 1234.5],
  ["bg-BG", "1234,5", 1234.5],
  ["bg-BG", "1 500 000 €", 1500000],
  ["bg-BG", "-250,75", -250.75],
  ["bg-BG", "20 %", 20],
  ["ka-GE", "1 234,50", 1234.5],
  ["ka-GE", "1234,5", 1234.5],
  ["ka-GE", "1 500 000 ₾", 1500000],
  ["ka-GE", "-250,75", -250.75],
  ["ka-GE", "18%", 18],
  ["hu-HU", "1 234,50", 1234.5],
  ["hu-HU", "1234,5", 1234.5],
  ["hu-HU", "1 500 000 Ft", 1500000],
  ["hu-HU", "-250,75", -250.75],
  ["hu-HU", "27%", 27],
  ["he-IL", "1,234.50", 1234.5],
  ["he-IL", "₪ 12,500", 12500],
  ["he-IL", "\u200f12,500.75 \u200f₪", 12500.75],
  ["he-IL", "3.5", 3.5],
  ["he-IL", "1,2,3", null],
  ["he-001", "2,000", 2000],
  // Albanés (sq-AL): espacio duro de miles, coma decimal y «Lekë» detrás, sin miles en 4 cifras.
  ["sq-AL", "1 234,50", 1234.5],
  ["sq-AL", "1234,5", 1234.5],
  ["sq-AL", "1\u00a0500\u00a0000\u00a0Lekë", 1500000],
  ["sq-AL", "25 000 Lekë", 25000],
  ["sq-AL", "-250,75", -250.75],
  ["sq-AL", "20%", 20],
  // Serbio (sr-Latn-RS): punto de miles, coma decimal y «RSD» o «din.» detrás.
  ["sr-Latn-RS", "1.234,50", 1234.5],
  ["sr-Latn-RS", "1.234.567,25 RSD", 1234567.25],
  ["sr-Latn-RS", "25.000 din.", 25000],
  ["sr-Latn-RS", "-250,75", -250.75],
  ["sr-Latn-RS", "20%", 20],
  ["sr-Latn-ME", "1.234,50 €", 1234.5],
  // Croata (hr-HR): punto de miles, coma decimal y € detrás.
  ["hr-HR", "1.234,50", 1234.5],
  ["hr-HR", "1.234.567,25 €", 1234567.25],
  ["hr-HR", "25.000 €", 25000],
  ["hr-HR", "-250,75", -250.75],
  ["hr-HR", "20%", 20],
];
for (const [locale, texto, esperado] of parseos) igual(`parsear ${locale} «${texto}»`, parsearNumero(texto, locale), esperado);
// Miles ambiguos (moneda y entero): "5.000" en un locale de punto decimal no se lee como 5.
const ambiguos: [string, string, number | null][] = [
  ["es-MX", "5.000", null],
  ["es-PE", "1.230", null],
  ["es-GT", "-12.500", null],
  ["es-MX", "5.00", 5],
  ["es-MX", "5.5", 5.5],
  ["es-MX", "0.500", 0.5],
  ["es-MX", "5,000", 5000],
  ["es-MX", "5,000.000", 5000],
  ["es-CL", "5,000", null],
  ["es-CO", "5.000", 5000],
  ["sv-SE", "5,000", null],
  ["fi-FI", "−5,000", null],
  ["pl-PL", "5 000", 5000],
  ["id-ID", "5.000", 5000],
  ["id-ID", "5,000", null],
  ["tr-TR", "5.000", 5000],
  ["tr-TR", "5,000", null],
  ["bn-BD", "৫.০০০", null],
  ["bn-BD", "৫,০০০", 5000],
  ["th-TH", "5,000", 5000],
  ["th-TH", "5.000", null],
  ["uk-UA", "5 000", 5000],
  ["uk-UA", "5,000", null],
  ["uz-UZ", "5.000", 5000],
  ["uz-UZ", "5,000", null],
  ["ru-KZ", "5 000", 5000],
  ["ru-KZ", "5,000", null],
  ["ro-RO", "5.000", 5000],
  ["ro-RO", "5,000", null],
  ["sk-SK", "5 000", 5000],
  ["sk-SK", "5,000", null],
  ["cs-CZ", "5 000", 5000],
  ["cs-CZ", "5,000", null],
  ["el-GR", "5.000", 5000],
  ["el-GR", "5,000", null],
  ["mn-MN", "5,000", 5000],
  ["mn-MN", "5.000", null],
  ["hy-AM", "5 000", 5000],
  ["hy-AM", "5,000", null],
  ["bg-BG", "5 000", 5000],
  ["bg-BG", "5,000", null],
  ["ka-GE", "5 000", 5000],
  ["ka-GE", "5,000", null],
  ["hu-HU", "5 000", 5000],
  ["hu-HU", "5,000", null],
  ["sq-AL", "5 000", 5000],
  ["sq-AL", "5,000", null],
  ["sr-Latn-RS", "5.000", 5000],
  ["sr-Latn-RS", "5,000", null],
  ["hr-HR", "5.000", 5000],
  ["hr-HR", "5,000", null],
];
for (const [locale, texto, esperado] of ambiguos) igual(`parsear con milesAmbiguos ${locale} «${texto}»`, parsearNumero(texto, locale, { milesAmbiguos: true }), esperado);
igual("sin milesAmbiguos sigue siendo decimal", parsearNumero("5.000", "es-MX"), 5);
// Monedas de 3 decimales (TND, KWD, BHD, OMR, JOD, LYD): «1544,136» dinares es un monto, no miles
// ambiguos, y los dígitos arábigo-índicos de ar-KW («١٬٥٤٤٫١٣٦») se leen.
const tresDecimales: [string, string, number, number | null][] = [
  ["fr-TN", "1544,136", 3, 1544.136],
  ["fr-TN", "1 544,136", 3, 1544.136],
  ["fr-TN", "1 544,136 DT", 3, 1544.136],
  ["fr-TN", "1.544,136", 3, 1544.136],
  ["fr-TN", "5.000", 3, 5000],
  ["fr-TN", "1544,136", 2, null],
  ["ar-KW", "١٥٤٤٫١٣٦", 3, 1544.136],
  ["ar-KW", "١٬٥٤٤٫١٣٦ د.ك.", 3, 1544.136],
  ["ar-KW", "1544.136", 3, 1544.136],
  ["ar-KW", "1,544.136", 3, 1544.136],
  ["ar-KW", "۱۵۴۴٫۱۳۶", 3, 1544.136],
  ["en-KW", "1544.136", 3, 1544.136],
  ["en-KW", "KWD 1,544.136", 3, 1544.136],
  ["en-KW", "5.000", 3, 5],
  ["en-KW", "5,000", 3, 5000],
  ["ar-BH", "١٢٫٥٠٠", 3, 12.5],
  ["ar-JO", "-١٬٢٣٤٫٥", 3, -1234.5],
];
for (const [locale, texto, decimales, esperado] of tresDecimales) igual(`parsear moneda de ${decimales} decimales ${locale} «${texto}»`, parsearNumero(texto, locale, { milesAmbiguos: true, decimales }), esperado);
igual("decimales de TND en fr-TN", decimalesDeMoneda("TND", "fr-TN"), 3);
igual("decimales de KWD en ar-KW", decimalesDeMoneda("KWD", "ar-KW"), 3);
igual("decimales de KWD en en-KW", decimalesDeMoneda("KWD", "en-KW"), 3);
// Ida y vuelta del formulario: el valor inicial y el prefill (crudoDeNumero) se vuelven a leer igual.
for (const [locale, moneda] of [["fr-TN", "TND"], ["ar-KW", "KWD"], ["en-KW", "KWD"]] as const) {
  const campo = { id: "monto", tipo: "moneda", etiqueta: "Monto", porDefecto: 1544.136 } as const;
  const ctx = { locale, moneda, idioma: locale.slice(0, 2), trato: "usted" } as unknown as ContextoSerializado;
  const inicial = valoresIniciales([campo], ctx, {});
  igual(`valor inicial ${locale} ${moneda} con 3 decimales`, parsearNumero(String(inicial.monto), locale), 1544.136);
  for (const crudo of [String(inicial.monto), crudoDeNumero(1544.136, locale), sinNbsp(formatearMoneda(1544.136, locale, moneda))]) {
    const r = parsearEntrada([campo], { monto: crudo }, ctx, {});
    igual(`formulario ${locale} ${moneda} lee «${crudo}»`, r.ok ? r.entrada.monto : r.errores, 1544.136);
  }
}
igual("sugerencia de miles con los dígitos que escribió la persona", sugerenciaMiles("৫.০০০", "bn-BD")?.sugerido, "৫০০০");
// Unidades de 10⁴ en ja, zh y ko, y dígitos de ancho completo del IME: «3万» no puede dar 3.
const cjk: [string, string, number | null][] = [
  ["ja-JP", "3万", 30000],
  ["ja-JP", "1億2000万", 120000000],
  ["ja-JP", "１２３，４５６", 123456],
  ["ja-JP", "1.5万円", 15000],
  ["ja-JP", "-2万", -20000],
  ["ko-KR", "5천만 원", 50000000],
  ["ko-KR", "3억 5천만", 350000000],
  ["ko-KR", "2만5000", 25000],
  ["zh-TW", "12萬", 120000],
  ["zh-CN", "300万", 3000000],
  ["ja-JP", "3万2万", null],
  ["ja-JP", "3万20000", null],
  ["ja-JP", "1,234.5", 1234.5],
];
for (const [locale, texto, esperado] of cjk) igual(`parsear ${locale} «${texto}»`, parsearNumero(texto, locale), esperado);
igual("sugerencia es-MX", sugerenciaMiles("$5.000", "es-MX"), { sugerido: "5000", separador: "." });
igual("sugerencia es-CL", sugerenciaMiles("5,000", "es-CL"), { sugerido: "5000", separador: "," });
igual("sin sugerencia para 5.5", sugerenciaMiles("5.5", "es-MX"), null);

// Redondeo
igual("redondeo 1.005 a 2", redondear(1.005, { decimales: 2, modo: "mitad-arriba" }), 1.01);
igual("redondeo -1.005 a 2", redondear(-1.005, { decimales: 2, modo: "mitad-arriba" }), -1.01);
igual("redondeo mitad-par 2.5", redondear(2.5, { decimales: 0, modo: "mitad-par" }), 2);
igual("redondeo mitad-par 3.5", redondear(3.5, { decimales: 0, modo: "mitad-par" }), 4);
igual("redondeo truncar 1.239", redondear(1.239, { decimales: 2, modo: "truncar" }), 1.23);
igual("redondeo CLP 553552.5", redondear(553552.5, { decimales: 0, modo: "mitad-arriba" }), 553553);
igual("redondeo 1474.7700000001", redondear(1474.7700000001, { decimales: 2, modo: "mitad-arriba" }), 1474.77);

// Vigencia: bordes de tramo y zona horaria.
const fuente = { organismo: "X", titulo: "Y", url: "https://example.org/x" as const, tipo: "primaria" as const, verificadoEl: "2026-10-07" as FechaISO };
const rmv: Dato<"numero"> = {
  id: "zz.rmv",
  nombre: "RMV",
  tipo: "numero",
  unidad: "XTS",
  tramos: [
    { estado: "verificado", desde: "2026-01-01", hasta: "2026-09-30", valor: 1130, fuente },
    { estado: "verificado", desde: "2026-10-01", hasta: "2026-12-31", valor: 1230, fuente },
    { estado: "no-verificado", desde: "2027-01-01", valor: 1300, motivo: "DS pendiente" },
  ],
};
igual("vigente día anterior al cambio", vigente(rmv, "2026-09-30")?.valor, 1130);
igual("vigente día de inicio", vigente(rmv, "2026-10-01")?.valor, 1230);
igual("vigente último día del tramo", vigente(rmv, "2026-12-31")?.valor, 1230);
igual("vigente con tramo no verificado", vigente(rmv, "2027-01-01"), null);
igual("vigente antes del primer tramo", vigente(rmv, "2025-12-31"), null);

const instante = new Date("2026-10-01T03:00:00Z");
igual("hoy en Lima a las 03:00 UTC", hoyEn({ zonaHoraria: "America/Lima" }, instante), "2026-09-30");
igual("hoy en Madrid a las 03:00 UTC", hoyEn({ zonaHoraria: "Europe/Madrid" }, instante), "2026-10-01");
igual("RMV en Lima a las 03:00 UTC", vigente(rmv, hoyEn({ zonaHoraria: "America/Lima" }, instante))?.valor, 1130);
igual("RMV en Madrid a las 03:00 UTC", vigente(rmv, hoyEn({ zonaHoraria: "Europe/Madrid" }, instante))?.valor, 1230);
igual("hoy en Lima a las 05:00 UTC", hoyEn({ zonaHoraria: "America/Lima" }, new Date("2026-10-01T05:00:00Z")), "2026-10-01");
igual("hoy en Ciudad de México a las 05:59 UTC", hoyEn({ zonaHoraria: "America/Mexico_City" }, new Date("2026-10-01T05:59:00Z")), "2026-09-30");
igual("hoy en Ciudad de México a las 06:00 UTC", hoyEn({ zonaHoraria: "America/Mexico_City" }, new Date("2026-10-01T06:00:00Z")), "2026-10-01");
process.env.CALCULAR_HOY = "2026-10-01";
igual("CALCULAR_HOY fija el día", hoyEn({ zonaHoraria: "America/Lima" }, instante), "2026-10-01");
delete process.env.CALCULAR_HOY;
igual("fechaEnZona Kiritimati (UTC+14)", fechaEnZona(new Date("2026-10-07T10:00:00Z"), "Pacific/Kiritimati"), "2026-10-08");

// vigente() nunca devuelve un no verificado, ni uno con fuente secundaria aunque diga verificado.
const trampa: Dato<"numero"> = {
  id: "zz.trampa",
  nombre: "Trampa",
  tipo: "numero",
  unidad: "XTS",
  tramos: [
    { estado: "no-verificado", desde: "2026-01-01", hasta: "2026-03-31", valor: 1, motivo: "prensa" },
    { estado: "verificado", desde: "2026-04-01", hasta: "2026-06-30", valor: 2, fuente: { ...fuente, tipo: "secundaria" } } as unknown as Tramo<number>,
    { estado: "verificado", desde: "2026-07-01", hasta: "2026-09-30", valor: 3, fuente: { ...fuente, url: "http://example.org/x" } } as unknown as Tramo<number>,
    { estado: "verificado", desde: "2026-10-01", valor: 4, fuente },
  ],
};
let devueltos = 0;
for (let f: FechaISO = "2026-01-01"; f <= "2026-12-31"; f = sumarDias(f, 1)) {
  const t = vigente(trampa, f);
  if (t) {
    devueltos++;
    verdad(`vigente ${f} solo verificado primario https`, t.estado === "verificado" && t.fuente.tipo === "primaria" && t.fuente.url.startsWith("https://") && t.valor === 4);
  }
}
igual("días con valor en el año trampa (solo desde el 1/10)", devueltos, 92);

// Regiones
const regional: Dato<"numero"> = {
  id: "zz.sm",
  nombre: "SM",
  tipo: "numero",
  unidad: "XTS",
  regiones: ["norte", "sur"],
  tramos: [
    { estado: "verificado", region: "norte", desde: "2026-01-01", valor: 440.87, fuente },
    { estado: "verificado", region: "sur", desde: "2026-01-01", valor: 315.04, fuente },
  ],
};
igual("regional sin región", vigente(regional, "2026-10-07"), null);
igual("regional norte", vigente(regional, "2026-10-07", "norte")?.valor, 440.87);

// Series
const serie: Serie = { id: "zz.uf", nombre: "UF", unidad: "XTS", frecuencia: "diaria", maxAntiguedadDias: 5, fuente, puntos: [["2026-10-01", 41065.38], ["2026-10-06", 41106.35], ["2026-11-09", 41300]] };
igual("serie mismo día", valorSerie(serie, "2026-10-06"), { fecha: "2026-10-06", valor: 41106.35 });
igual("serie fin de semana toma el anterior", valorSerie(serie, "2026-10-08"), { fecha: "2026-10-06", valor: 41106.35 });
igual("serie vencida por antigüedad", valorSerie(serie, "2026-10-20"), null);
igual("serie antes del primer punto", valorSerie(serie, "2026-09-01"), null);

// Escalas
const escala = datosZz.datos.find((d) => d.id === "zz.escala-impuesto")!.tramos[0].valor as { desde: number; hasta: number | null; tasa: number; cuotaFija: number }[];
igual("escala cuota fija 6000", aplicarEscala(escala, 6000), 600);
igual("escala cuota fija 500", aplicarEscala(escala, 500), 0);
igual("escala marginal PE 10 UIT", redondear(aplicarEscalaMarginal([{ desde: 0, hasta: 5, tasa: 8 }, { desde: 5, hasta: 20, tasa: 14 }, { desde: 20, hasta: null, tasa: 17 }], 10), { decimales: 4, modo: "mitad-arriba" }), 1.1);

// Validación de archivos (pruebas negativas)
const mercadoZz = zz.mercado;
const copia = () => JSON.parse(JSON.stringify(datosZz)) as { mercado: string; datos: { id: string; tramos: Record<string, unknown>[] }[] };
const conHttp = copia();
(conHttp.datos[1].tramos[0].fuente as { url: string }).url = "http://example.org/zz/ley-30-2020";
verdad("datos.json con http da error", validarArchivoDatos(conHttp, mercadoZz, "2026-10-07").errores.some((e) => e.includes("https")));
const conSecundaria = copia();
(conSecundaria.datos[1].tramos[0].fuente as { tipo: string }).tipo = "secundaria";
verdad("verificado con fuente secundaria da error", validarArchivoDatos(conSecundaria, mercadoZz, "2026-10-07").errores.some((e) => e.includes("fuente primaria")));
const conSolape = copia();
delete conSolape.datos[0].tramos[0].hasta;
verdad("tramos solapados en una región dan error", validarArchivoDatos(conSolape, mercadoZz, "2026-10-07").errores.some((e) => e.includes("se solapa")));
const conFuturo = copia();
(conFuturo.datos[1].tramos[0].fuente as { verificadoEl: string }).verificadoEl = "2026-10-09";
verdad("verificadoEl futuro da error", validarArchivoDatos(conFuturo, mercadoZz, "2026-10-08").errores.some((e) => e.includes("futuro")));
const sinMotivo = copia();
delete sinMotivo.datos[2].tramos[0].motivo;
verdad("no-verificado sin motivo da error", validarArchivoDatos(sinMotivo, mercadoZz, "2026-10-07").errores.some((e) => e.includes("motivo")));
const regionAjena = copia();
regionAjena.datos[0].tramos[0].region = "este";
verdad("región que no está en el mercado da error", validarArchivoDatos(regionAjena, mercadoZz, "2026-10-07").errores.length > 0);
const escalaConHueco = copia();
(escalaConHueco.datos[3].tramos[0].valor as { desde: number }[])[2].desde = 6000;
verdad("escala con hueco da error", validarArchivoDatos(escalaConHueco, mercadoZz, "2026-10-07").errores.some((e) => e.includes("no continúa")));
verdad("serie con fecha repetida da error", validarArchivoSeries({ mercado: "zz", series: [{ ...serie, puntos: [["2026-10-01", 1], ["2026-10-01", 2]] }] }, mercadoZz, "2026-10-07").errores.length > 0);
verdad("url de ejemplo fuera de zz da error", validarUrl("https://example.org/pe/rmv", "x", "pe").some((e) => e.includes("url de ejemplo")));
igual("url oficial https sin error", validarUrl("https://busquedas.elperuano.pe/dispositivo/EX/2559163-1", "x", "pe"), []);
verdad("url vacía da error", validarUrl("", "x", "pe").length === 1);

// El país zz completo valida limpio y, con una url http, deja de hacerlo.
const informeZz = validarPais(zz, { hoy: "2026-10-15" });
igual("zz sin errores", informeZz.errores, []);
const zzHttp = definirPais({ mercado: mercadoZz, datos: conHttp, series: undefined, avisos: undefined, calculadoras: zz.calculadoras });
verdad("zz con http tiene errores", validarPais(zzHttp, { hoy: "2026-10-15" }).errores.some((e) => e.includes("https")));
verdad("zz publicado es error", definirPais({ mercado: { ...mercadoZz, estado: "publicado" } }).errores.some((e) => e.includes("nunca puede estar publicado")));

// Publicabilidad: un tramo verificado vencido saca la calculadora; un no-verificado nunca la habilita.
function paisCon(tramos: Tramo<number>[]): PaisDefinido {
  const datos = copia();
  datos.datos[1].tramos = tramos as unknown as Record<string, unknown>[];
  return definirPais({ mercado: mercadoZz, datos, calculadoras: zz.calculadoras });
}
const conVencido = paisCon([{ estado: "verificado", desde: "2020-01-01", hasta: "2026-06-30", valor: 9, fuente }]);
const entrada = conVencido.calculadoras[0];
verdad("publicable antes del vencimiento", publicabilidad(conVencido, entrada, "2026-06-30", "interno").publicable);
const vencida = publicabilidad(conVencido, entrada, "2026-07-01", "interno");
verdad("no publicable con el tramo vencido", !vencida.publicable && vencida.motivos.some((m) => m.includes("zz.bonificacion")));
verdad("check estricto marca el vencido como error", validarPais(conVencido, { hoy: "2026-07-01" }).errores.some((e) => e.includes("no se puede publicar")));
verdad("check tolerante lo baja a aviso", validarPais(conVencido, { hoy: "2026-07-01", estricto: false }).errores.length === 0);
verdad("aviso 30 días antes de vencer", validarPais(conVencido, { hoy: "2026-06-15" }).avisos.some((a) => a.includes("deja de ser publicable")));
const soloPendiente = paisCon([{ estado: "no-verificado", desde: "2020-01-01", valor: 9, motivo: "prensa" }]);
verdad("un no-verificado no habilita", !publicabilidad(soloPendiente, soloPendiente.calculadoras[0], "2026-10-15", "interno").publicable);

// Registro
const reg = crearRegistro([zz]);
igual("zz nunca aparece en producción", reg.mercados("produccion").length, 0);
// Un global con errores de datos desaparece de todos los checks que recorren mercados() y corta el
// build de producción: tiene que fallar acá, con el motivo.
verdad("global sin errores y visible en producción", registroReal.mercados("produccion").some((m) => m.codigo === "global"), registroReal.pais("global")?.errores.join("; ") ?? "no existe");
igual("zz aparece en modo interno", reg.mercados("interno").map((m) => m.codigo), ["zz"]);
igual("calculadoras locales publicables de zz (interno)", reg.calculadorasPublicables("zz", "2026-10-15", "interno").filter((c) => !esUniversal(c)).map((c) => c.definicion.id), ["zz.bono"]);
igual("calculadoras publicables de zz (producción)", reg.calculadorasPublicables("zz", "2026-10-15", "produccion").length, 0);
igual("equivalentes de bono-semestral", reg.equivalentes("bono-semestral", () => "2026-10-15", "interno"), [{ mercado: "zz", locale: "es-419", slug: "bono" }]);
igual("rutas internas", reg.rutas(() => "2026-10-15", "interno").filter((r) => r.slug === "bono"), [{ mercado: "zz", slug: "bono" }]);
const pagina = reg.pagina("zz", "bono", "2026-10-15", "interno");
verdad("página de zz/bono resuelta", pagina !== null);
if (pagina) {
  igual("valores serializados", pagina.props.valores, { "zz.minimo": { norte: 1100, sur: 1200 }, "zz.bonificacion": 9 });
  igual("sello: verificación más vieja", pagina.sello.verificadoMasViejo, "2026-10-07");
  verdad("contenido sin marcadores", !JSON.stringify(pagina.contenido).includes("{{"));
  verdad("marcador del mínimo norte", pagina.contenido.faq[0].respuesta.includes("1,100, vigente") && pagina.contenido.faq[0].respuesta.includes("1 de octubre de 2026"), pagina.contenido.faq[0].respuesta);
  verdad("las props cruzan a cliente como JSON", JSON.stringify(JSON.parse(JSON.stringify(pagina.props))) === JSON.stringify(pagina.props));
  igual("aviso vigente de zz", pagina.props.avisos.map((a) => a.id), ["zz.mercado-de-prueba"]);
  igual("regiones en el contexto", pagina.props.contexto.regiones.map((r) => r.id), ["norte", "sur"]);

  // Formulario: parseo y cálculo como lo hace el cliente.
  const textos = textosMotor("es", "tu");
  const props: PropsCalculadora = pagina.props;
  const def = bono as unknown as Parameters<typeof ejecutar>[0];
  const estado = ejecutar(def, { sueldo: "2,000", meses: "6", region: "norte", regimen: "general" }, props, textos);
  verdad("formulario calcula", estado.tipo === "ok");
  if (estado.tipo === "ok") igual("fila total", sinNbsp(estado.filas.find((f) => f.clave === "total")!.texto), "XTS 2,180.00");
  const conError = parsearEntrada(def.campos, { sueldo: "abc", meses: "9", region: "este", regimen: "general" }, props.contexto, props.opcionesDinamicas);
  verdad("formulario rechaza entradas inválidas", !conError.ok);
  if (!conError.ok) {
    igual("error de número en tú", mensajeDeError(conError.errores.sueldo, textos), "Escribe un número, por ejemplo 1,234.5.");
    igual("error de máximo", mensajeDeError(conError.errores.meses, textos), "El máximo es 6.");
    igual("error de región", mensajeDeError(conError.errores.region, textos), "Elige una región.");
  }
  const ambiguo = (trato: "tu" | "usted" | "vos") => {
    const p = parsearEntrada(def.campos, { sueldo: "5.000", meses: "6", region: "norte", regimen: "general" }, { ...props.contexto, trato }, props.opcionesDinamicas);
    return p.ok ? "ok" : mensajeDeError(p.errores.sueldo, textosMotor("es", trato));
  };
  igual("miles ambiguos en tú", ambiguo("tu"), "¿Quisiste decir 5000? Escríbelo sin puntos.");
  igual("miles ambiguos en usted", ambiguo("usted"), "¿Quiso decir 5000? Escríbalo sin puntos.");
  igual("miles ambiguos en vos", ambiguo("vos"), "¿Quisiste decir 5000? Escribilo sin puntos.");
  const conPunto = parsearEntrada(def.campos, { sueldo: "5.50", meses: "6", region: "norte", regimen: "general" }, props.contexto, props.opcionesDinamicas);
  igual("5.50 sigue siendo decimal", conPunto.ok ? conPunto.entrada.sueldo : null, 5.5);
  igual("error en vos", mensajeDeError({ codigo: "requerido" }, textosMotor("es", "vos")), "Completá este campo.");
  igual("error en usted", mensajeDeError({ codigo: "requerido" }, textosMotor("es", "usted")), "Complete este campo.");
  const bajoMinimo = ejecutar(def, { sueldo: "900", meses: "3", region: "norte", regimen: "general" }, props, textos);
  verdad("observación bajo el mínimo", bajoMinimo.tipo === "ok" && bajoMinimo.observaciones.length === 1);
  const bloqueo = ejecutar(def, { sueldo: "2,000", meses: "6", region: "norte", regimen: "general" }, { ...props, avisos: [{ id: "zz.x", nivel: "bloquea", texto: "Norma suspendida.", fuente }] }, textos);
  igual("aviso bloquea oculta el resultado", bloqueo.tipo, "bloqueado");
  const errorPropio = ejecutar({ ...def, calcular: () => { throw new ErrorEntrada("Los meses van de 1 a 6.", "meses"); } }, { sueldo: "1", meses: "6", region: "norte", regimen: "general" }, props, textos);
  igual("ErrorEntrada con campo vuelve al campo", errorPropio.tipo === "errores" ? mensajeDeError(errorPropio.errores.meses, textos) : errorPropio.tipo, "Los meses van de 1 a 6.");
}

// Contenido con marcadores
const r = resolverValores(zz, bono as never, "2026-10-15");
verdad("resolver valores de bono", r.ok);
if (r.ok) {
  const c = rellenarContenido(
    { calculadora: "zz.bono", h1: "Bonificación {{zz.bonificacion}}", title: "t", description: "d", intro: ["Sur: {{zz.minimo@sur}}"], comoSeCalcula: ["x"], faq: [], glosario: [] },
    { valores: r.valores, usados: r.usados, unidades: { "zz.bonificacion": "%", "zz.minimo": "XTS" }, locale: "es-419" },
  );
  igual("marcador porcentaje", sinNbsp(c.h1), "Bonificación 9%");
  igual("marcador por región", sinNbsp(c.intro[0]), "Sur: XTS 1,200");
}

// Tipos: una definición con requisito mal tipado se detecta en validarPais.
const malTipada = definirCalculadora({
  id: "zz.mal",
  mercado: "zz",
  concepto: "propio",
  slug: "mal",
  estado: "interno",
  requiere: { "zz.minimo": "numero", "zz.inexistente": "serie" },
  campos: [{ id: "x", tipo: "numero", etiqueta: "X" }],
  calcular: (e) => ({ y: e.x }),
  resultado: [{ clave: "y", etiqueta: "Y", formato: "numero" }],
});
const conMal = definirPais({ mercado: mercadoZz, datos: datosZz, calculadoras: [...zz.calculadoras, { definicion: malTipada, contenido: { ...zz.calculadoras[0].contenido, calculadora: "zz.mal" }, cliente: zz.calculadoras[0].cliente }] });
const errMal = validarPais(conMal, { hoy: "2026-10-15" }).errores;
verdad("requiere por región pedido como número", errMal.some((e) => e.includes("tiene regiones")));
verdad("requiere de serie inexistente", errMal.some((e) => e.includes("zz.inexistente")));
verdad("dos calculadoras con el mismo concepto", !errMal.some((e) => e.includes("concepto")));

// Universales: "todas" suma las que tienen textos en el idioma del mercado y no chocan con una local;
// una lista explícita que choca deja el error en el país (y el país no se publica).
const localesZz = zz.calculadoras.filter((c) => !esUniversal(c));
const zzTodas = definirPais({ mercado: mercadoZz, datos: datosZz, calculadoras: localesZz, universales: "todas" });
const descuentoZz = zzTodas.calculadoras.find((c) => esUniversal(c) && c.universal.id === "descuento");
verdad("universal descuento entra con universales: todas", Boolean(descuentoZz));
verdad("universal sin errores en el país", zzTodas.errores.length === 0, zzTodas.errores.join("; "));
if (descuentoZz && esUniversal(descuentoZz)) {
  igual("universal: id con el mercado", descuentoZz.definicion.id, "zz.descuento");
  igual("universal: contexto con el slug resuelto", descuentoZz.universal.contexto.slug, descuentoZz.definicion.slug);
  igual("universal: moneda del mercado", descuentoZz.universal.contexto.moneda, "XTS");
  verdad("universal: contenido con h1", descuentoZz.contenido.h1.length > 0);
  const regZz = crearRegistro([zzTodas]);
  verdad("universal publicable en interno", regZz.calculadorasPublicables("zz", "2026-10-15", "interno").includes(descuentoZz));
  verdad("universal: pagina() trae el origen para el cliente", regZz.pagina("zz", descuentoZz.definicion.slug, "2026-10-15", "interno")?.universal?.id === "descuento");
}
const zzChoque = definirPais({ mercado: mercadoZz, datos: datosZz, calculadoras: localesZz, universales: [{ id: "descuento", slug: bono.slug }, "no-existe"] });
verdad("universal con slug repetido da error", zzChoque.errores.some((e) => e.includes("slug")));
verdad("universal inexistente da error", zzChoque.errores.some((e) => e.includes("no-existe")));
verdad("universal que choca no entra", !zzChoque.calculadoras.some(esUniversal));
const zzExcepto = definirPais({ mercado: mercadoZz, datos: datosZz, calculadoras: localesZz, universales: { todas: true, excepto: ["descuento"] } });
verdad("universales todas con excepto", !zzExcepto.calculadoras.some((c) => esUniversal(c) && c.universal.id === "descuento"));

// Registro: equivalentes por índice de concepto, iguales a recorrer todo.
for (const concepto of ["bono-semestral", "iva", "descuento"]) {
  const directo = registroReal.paises.flatMap((p) =>
    registroReal
      .calculadorasPublicables(p.mercado.codigo, "2026-10-15", "interno")
      .filter((c) => c.definicion.concepto === concepto)
      .map((c) => `${p.mercado.codigo}/${c.definicion.slug}`),
  );
  const indexado = registroReal.equivalentes(concepto, () => "2026-10-15", "interno").map((e) => `${e.mercado}/${e.slug}`);
  igual(`equivalentes de ${concepto} por índice`, [...indexado].sort(), [...directo].sort());
}

// Ediciones (ADR 0002, D3): zz-en reusa los datos de zz, traduce bono y suma las universales en inglés.
const zzEn = registroReal.pais("zz-en");
verdad("zz-en existe y no tiene errores", Boolean(zzEn) && zzEn!.errores.length === 0, zzEn?.errores.join("; ") ?? "no está en el registro");
if (zzEn) {
  igual("edición: edicionDe", zzEn.edicionDe, "zz");
  igual("edición: hereda moneda, zona y redondeo", [zzEn.mercado.monedas, zzEn.mercado.zonaHoraria, zzEn.mercado.redondeo], [zz.mercado.monedas, zz.mercado.zonaHoraria, zz.mercado.redondeo]);
  igual("edición: datos del país", zzEn.datos.map((d) => d.id), zz.datos.map((d) => d.id));
  igual("edición: nombre de un dato traducido", zzEn.datos.find((d) => d.id === "zz.minimo")?.nombre, "Minimum wage by zone");
  igual("edición: sin detectores propios", zzEn.detectores.length, 0);
  const trad = zzEn.calculadoras.find((c) => c.definicion.slug === "half-year-bonus");
  igual("edición: traducción con id y origen", [trad?.definicion.id, trad?.traduccion], ["zz-en.bono", { mercado: "zz", archivo: "bono", id: "zz.bono" }]);
  verdad("edición: universales en inglés", zzEn.calculadoras.some((c) => esUniversal(c) && c.definicion.slug === "loan"));
  igual("edición: hermanas de zz/bono", registroReal.hermanas("zz", "bono", () => "2026-10-15", "interno").map((e) => `${e.mercado}/${e.slug}`), ["zz/bono", "zz-en/half-year-bonus", "zz-ja/half-year-bonus", "zz-pl/premia-polroczna", "zz-sv/halvarsbonus", "zz-da/halvaarsbonus", "zz-nb/halvarsbonus", "zz-fi/puolivuotisbonus", "zz-ar/half-year-bonus", "zz-id/bonus-semesteran", "zz-tr/yariyil-ikramiyesi", "zz-bn/half-year-bonus", "zz-th/half-year-bonus", "zz-uk/pivrichna-premiia", "zz-uz/yarim-yillik-mukofot", "zz-ru/polugodovaya-premiya", "zz-ro/prima-semestriala", "zz-cs/pololetni-premie", "zz-el/examiniaio-epidoma", "zz-hu/felevi-premium", "zz-he/half-year-bonus", "zz-sr/polugodisnji-bonus", "zz-bg/polugodishen-bonus", "zz-sk/polrocna-premia", "zz-ka/nakhevartsliuri-premia", "zz-hr/polugodisnja-nagrada", "zz-mn/khagas-jiliin-uramshuulal", "zz-hy/kisamyakayin-pargev", "zz-sq/bonus-gjashtemujor"]);
  igual("edición: ediciones de zz", registroReal.ediciones("zz", "interno").map((m) => m.codigo), ["zz", "zz-en", "zz-ja", "zz-pl", "zz-sv", "zz-da", "zz-nb", "zz-fi", "zz-ar", "zz-id", "zz-tr", "zz-bn", "zz-th", "zz-uk", "zz-uz", "zz-ru", "zz-ro", "zz-cs", "zz-el", "zz-hu", "zz-he", "zz-sr", "zz-bg", "zz-sk", "zz-ka", "zz-hr", "zz-mn", "zz-hy", "zz-sq"]);
  igual("edición: nunca en producción", registroReal.ediciones("zz", "produccion").length, 0);
  const pEn = registroReal.pagina("zz-en", "half-year-bonus", "2026-10-15", "interno");
  verdad("edición: página resuelta con marcadores de los datos del país", Boolean(pEn) && pEn!.contenido.faq[0].respuesta.includes("1,100") && pEn!.contenido.faq[0].respuesta.includes("1 October 2026"), pEn?.contenido.faq[0].respuesta);
  igual("edición: aviso traducido", pEn?.props.avisos.map((a) => a.texto.slice(0, 22)), ["Zetaland is a test cou"]);
  igual("edición: regiones con nombre en el idioma", pEn?.props.contexto.regiones.map((r) => r.nombre), ["North zone", "South zone"]);
  verdad("edición: la página lista a su hermana en el otro idioma", Boolean(pEn?.equivalentes.some((e) => e.mercado === "zz" && e.slug === "bono")));
  if (pEn && trad) {
    const d = trad.definicion;
    igual("edición: etiquetas y opciones traducidas", [d.campos[0].etiqueta, d.campos[3].tipo === "opcion" ? d.campos[3].opciones[1].etiqueta : ""], ["Gross monthly pay", "Small company"]);
    const est = ejecutar(d, { sueldo: "900", meses: "3", region: "norte", regimen: "general" }, pEn.props, textosMotor("en", "tu"));
    verdad("edición: misma fórmula, observación traducida", est.tipo === "ok" && est.filas.find((f) => f.clave === "total")?.texto.includes("599.50") === true && est.observaciones[0]?.startsWith("Your pay"), JSON.stringify(est));
    let mensaje = "";
    try {
      d.calcular({ sueldo: 900, meses: 9, region: "norte", regimen: "general" } as never, pEn.props.valores as never, { fecha: "2026-10-15", mercado: "zz-en", moneda: "XTS", redondear: (n) => n });
    } catch (e) {
      mensaje = e instanceof ErrorEntrada ? `${e.campo}: ${e.message}` : String(e);
    }
    igual("edición: error propio de calcular() traducido", mensaje, "meses: Months go from 1 to 6.");
  }
}
const textosRotos = { calculadora: "zz-xx.bono", base: "zz.bono", slug: "x", campos: {}, filas: {} };
const edRota = definirEdicion(zz, { mercado: { codigo: "zz-fr", nombre: "Zétalie", locale: "fr-FR", idioma: "fr", trato: "usted", estado: "interno" }, traducciones: [{ textos: textosRotos, contenido: zz.calculadoras[0].contenido }] });
verdad("edición: textos incompletos dan error", edRota.errores.some((e) => e.includes("falta traducir campo sueldo")), edRota.errores.join("; "));
verdad("edición: id de la traducción mal formado da error", edRota.errores.some((e) => e.includes('"zz-fr.bono"')));
verdad("edición: aviso sin traducir da error", edRota.errores.some((e) => e.includes("zz.mercado-de-prueba")));
const edMismoIdioma = definirEdicion(zz, { mercado: { codigo: "zz-es", nombre: "Z", locale: "es-ES", idioma: "es", trato: "tu", estado: "interno" } });
verdad("edición en el idioma del país da error", edMismoIdioma.errores.some((e) => e.includes("mismo idioma")));
verdad("edición de prueba publicada da error", definirEdicion(zz, { mercado: { codigo: "zz-en", nombre: "Z", locale: "en-001", idioma: "en", trato: "tu", estado: "publicado" } }).errores.some((e) => e.includes("nunca puede estar publicado")));

// Marcadores de series y filas de escala.
const zzSerie = zz.series[0];
const reqMarcadores = { [zzSerie.id]: "serie", "zz.escala-impuesto": "escala" } as const;
const rM = resolverValores(zz, { ...bono, requiere: reqMarcadores } as never, "2026-10-08");
verdad("resolver serie y escala para marcadores", rM.ok, rM.ok ? "" : rM.motivos.join("; "));
if (rM.ok) {
  const unidades = { [zzSerie.id]: zzSerie.unidad, "zz.escala-impuesto": "XTS" } as const;
  const c = rellenarContenido(
    { calculadora: "zz.bono", h1: `{{${zzSerie.id}}} al {{${zzSerie.id}#desde}}`, title: "{{zz.escala-impuesto[1].tasa}} desde {{zz.escala-impuesto[1].desde}}", description: "{{zz.escala-impuesto[-1].tasa}}", intro: ["{{zz.escala-impuesto#desde}}"], comoSeCalcula: ["{{zz.escala-impuesto[9].tasa}}"], faq: [], glosario: [] },
    { valores: rM.valores, usados: rM.usados, unidades, locale: "es-419", alFallar: () => undefined },
  );
  verdad("marcador de serie: valor y fecha del punto", /\d/.test(c.h1) && c.h1.includes("de 2026"), c.h1);
  const escalaZz = (datosZz.datos.find((d) => d.id === "zz.escala-impuesto")!.tramos[0].valor as { desde: number; tasa: number }[]);
  verdad("marcador de fila de escala: tasa y desde", c.title.startsWith(`${escalaZz[1].tasa}`) && c.title.includes(String(escalaZz[1].desde).slice(0, 1)), c.title);
  verdad("marcador de la última fila con -1", c.description.startsWith(`${escalaZz[escalaZz.length - 1].tasa}`), c.description);
  verdad("#desde de una escala", c.intro[0].includes("de 20"), c.intro[0]);
  verdad("fila fuera de la escala queda sin resolver", c.comoSeCalcula[0].includes("{{"), c.comoSeCalcula[0]);
}
igual("marcadoresDe con fila de escala y región", marcadoresDe("{{ca.x[2].tasa@on}}").map((m) => [m.id, m.clave, m.campo, m.region]), [["ca.x", "2", "tasa", "on"]]);

// Semanas, regiones de un campo y diccionarios por locale.
igual("semanas en inglés", formatearValorUnidad(2, "semanas", "en-CA"), "2 weeks");
igual("semana en singular (de)", formatearValorUnidad(1, "semanas", "de-DE"), "1 Woche");
igual("semanas en neerlandés", formatearValorUnidad(3, "semanas", "nl-NL"), "3 weken");
// Indonesio: sin plural después del número y decimal con coma.
igual("días en indonesio", formatearValorUnidad(3, "dias", "id-ID"), "3 hari");
igual("un año en indonesio", formatearValorUnidad(1, "anios", "id-ID"), "1 tahun");
igual("fracción de año en indonesio", formatearValorUnidad(1.5, "anios", "id-ID"), "1,5 tahun");
// Turco: sin plural después del número y decimal con coma.
igual("días en turco", formatearValorUnidad(3, "dias", "tr-TR"), "3 gün");
igual("un año en turco", formatearValorUnidad(1, "anios", "tr-TR"), "1 yıl");
igual("fracción de año en turco", formatearValorUnidad(1.5, "anios", "tr-TR"), "1,5 yıl");
// Sufijos de caso detrás del nombre del país: armonía vocálica, d/t, n tras vocal, siglas y posesivo.
igual(
  "gramática turca: locativo",
  ["Türkiye", "Almanya", "Kuveyt", "Fas", "ABD", "Peru", "Senegal", "Dominik Cumhuriyeti", "Saint Vincent ve Grenadinler"].map((p) => GRAMATICA.tr.en(p)),
  ["Türkiye'de", "Almanya'da", "Kuveyt'te", "Fas'ta", "ABD'de", "Peru'da", "Senegal'de", "Dominik Cumhuriyeti'nde", "Saint Vincent ve Grenadinler'de"],
);
igual(
  "gramática turca: genitivo",
  ["Türkiye", "Almanya", "Peru", "Hong Kong", "Irak", "BAE", "Birleşik Arap Emirlikleri"].map((p) => GRAMATICA.tr.de(p)),
  ["Türkiye'nin", "Almanya'nın", "Peru'nun", "Hong Kong'un", "Irak'ın", "BAE'nin", "Birleşik Arap Emirlikleri'nin"],
);
igual("gramática turca: para", GRAMATICA.tr.para("Türkiye"), "Türkiye için");
// Mayúscula inicial con la i del turco: «iş» da «İş», no «Iş».
igual("mayúscula inicial en turco", mayusculaInicial("iş bankası", "tr-TR"), "İş bankası");
igual("minúscula inicial en turco", minusculaInicial("Isparta", "tr-TR"), "ısparta");
// Bengalí: sin plural después del número y con dígitos bengalíes.
igual("días en bengalí", formatearValorUnidad(3, "dias", "bn-BD"), "৩ দিন");
igual("un año en bengalí", formatearValorUnidad(1, "anios", "bn-BD"), "১ বছর");
igual("fracción de año en bengalí", formatearValorUnidad(1.5, "anios", "bn-BD"), "১.৫ বছর");
// Tailandés: sin plural, la unidad separada por un espacio y las fechas en พ.ศ. (calendario de th-TH).
igual("días en tailandés", formatearValorUnidad(3, "dias", "th-TH"), "3 วัน");
igual("fracción de año en tailandés", formatearValorUnidad(1.5, "anios", "th-TH"), "1.5 ปี");
igual("fecha larga en พ.ศ.", formatearFecha("2026-10-24", "th-TH"), "24 ตุลาคม 2569");
igual("fecha corta en พ.ศ.", formatearFecha("2026-10-24", "th-TH", "corta"), "24/10/2569");
igual("ancho visual sin tonos ni vocales apiladas", anchoVisual("ภาษีมูลค่าเพิ่ม"), 10);
// Ucraniano: one/few/many/other de Intl.PluralRules («1 рік», «3 роки», «5 років», «1,5 року»).
igual(
  "años en ucraniano",
  [1, 3, 5, 11, 21, 22, 1.5].map((n) => formatearValorUnidad(n, "anios", "uk-UA")),
  ["1 рік", "3 роки", "5 років", "11 років", "21 рік", "22 роки", "1,5 року"],
);
igual("días en ucraniano", [1, 2, 7].map((n) => formatearValorUnidad(n, "dias", "uk-UA")), ["1 день", "2 дні", "7 днів"]);
igual("pluralUk", [1, 3, 12, 24, 25].map((n) => pluralUk(n, "калькулятор", "калькулятори", "калькуляторів")), ["1 калькулятор", "3 калькулятори", "12 калькуляторів", "24 калькулятори", "25 калькуляторів"]);
// Casos del nombre del país: genitivo, lugar con «в/у/на» y «для».
igual(
  "gramática ucraniana: lugar",
  ["Україна", "Німеччина", "Мексика", "Люксембург", "Китай", "Сполучені Штати", "Велика Британія", "Філіппіни", "Чилі", "Мальта", "Ірак"].map((p) => GRAMATICA.uk.en(p)),
  ["в Україні", "у Німеччині", "у Мексиці", "у Люксембурзі", "у Китаї", "у Сполучених Штатах", "у Великій Британії", "на Філіппінах", "у Чилі", "на Мальті", "в Іраку"],
);
igual(
  "gramática ucraniana: genitivo",
  ["Україна", "Польща", "Ізраїль", "Обʼєднані Арабські Емірати", "Південно-Африканська Республіка", "Сент-Вінсент і Гренадіни"].map((p) => GRAMATICA.uk.de(p)),
  ["України", "Польщі", "Ізраїлю", "Обʼєднаних Арабських Еміратів", "Південно-Африканської Республіки", "Сент-Вінсенту і Гренадин"],
);
igual("gramática ucraniana: para", GRAMATICA.uk.para("Україна"), "для України");
// Uzbeko: sin plural después del número y decimal con coma.
igual("días en uzbeko", formatearValorUnidad(3, "dias", "uz-UZ"), "3 kun");
igual("fracción de año en uzbeko", formatearValorUnidad(1.5, "anios", "uz-UZ"), "1,5 yil");
igual("soʻm en uz-UZ", formatearMoneda(1500000.5, "uz-UZ", "UZS"), "1\u00a0500\u00a0000,50\u00a0soʻm");
// Sufijos de caso pegados al nombre, sin apóstrofo ni armonía: genitivo -ning, locativo -da, «uchun».
igual(
  "gramática uzbeka",
  ["Oʻzbekiston", "AQSh", "Kongo Demokratik Respublikasi"].map((p) => [GRAMATICA.uz.de(p), GRAMATICA.uz.en(p), GRAMATICA.uz.para(p)]),
  [
    ["Oʻzbekistonning", "Oʻzbekistonda", "Oʻzbekiston uchun"],
    ["AQShning", "AQShda", "AQSh uchun"],
    ["Kongo Demokratik Respublikasining", "Kongo Demokratik Respublikasida", "Kongo Demokratik Respublikasi uchun"],
  ],
);
// Ruso: one/few/many/other de Intl.PluralRules («1 год», «3 года», «5 лет», «1,5 года»).
igual(
  "años en ruso",
  [1, 3, 5, 11, 21, 22, 1.5].map((n) => formatearValorUnidad(n, "anios", "ru-KZ")),
  ["1 год", "3 года", "5 лет", "11 лет", "21 год", "22 года", "1,5 года"],
);
igual("días en ruso", [1, 2, 7].map((n) => formatearValorUnidad(n, "dias", "ru-KZ")), ["1 день", "2 дня", "7 дней"]);
igual("semanas en ruso", [1, 4, 40].map((n) => formatearValorUnidad(n, "semanas", "ru-RU")), ["1 неделя", "4 недели", "40 недель"]);
igual("pluralRu", [1, 3, 12, 24, 25].map((n) => pluralRu(n, "калькулятор", "калькулятора", "калькуляторов")), ["1 калькулятор", "3 калькулятора", "12 калькуляторов", "24 калькулятора", "25 калькуляторов"]);
// Casos del nombre del país en ruso: lugar con «в/во/на», genitivo y «для».
igual(
  "gramática rusa: lugar",
  ["Казахстан", "Киргизия", "Узбекистан", "Россия", "Германия", "Франция", "Вьетнам", "Мексика", "Китай", "Соединенные Штаты", "Великобритания", "Филиппины", "Чили", "Мальта", "Израиль", "Беларусь", "ОАЭ", "Гонконг (САР)"].map((p) => GRAMATICA.ru.en(p)),
  ["в Казахстане", "в Киргизии", "в Узбекистане", "в России", "в Германии", "во Франции", "во Вьетнаме", "в Мексике", "в Китае", "в Соединенных Штатах", "в Великобритании", "на Филиппинах", "в Чили", "на Мальте", "в Израиле", "в Беларуси", "в ОАЭ", "в Гонконге (САР)"],
);
igual(
  "gramática rusa: genitivo",
  ["Казахстан", "Польша", "Египет", "Объединенные Арабские Эмираты", "Южно-Африканская Республика", "Сент-Винсент и Гренадины", "Коста-Рика", "Никарагуа", "Республика Корея", "Новая Зеландия", "Нидерланды", "Парагвай"].map((p) => GRAMATICA.ru.de(p)),
  ["Казахстана", "Польши", "Египта", "Объединенных Арабских Эмиратов", "Южно-Африканской Республики", "Сент-Винсента и Гренадин", "Коста-Рики", "Никарагуа", "Республики Корея", "Новой Зеландии", "Нидерландов", "Парагвая"],
);
igual("gramática rusa: para", GRAMATICA.ru.para("Казахстан"), "для Казахстана");
igual("gramática rusa: isla con «на»", GRAMATICA.ru.en("Сент-Винсент и Гренадины"), "на Сент-Винсенте и Гренадинах");
// Rumano: one/few/other de Intl.PluralRules("ro"), con «de» en other («20 de ani», «101 ani»).
igual(
  "años en rumano",
  [1, 2, 19, 20, 21, 100, 101, 119, 120, 1.5].map((n) => formatearValorUnidad(n, "anios", "ro-RO")),
  ["1 an", "2 ani", "19 ani", "20 de ani", "21 de ani", "100 de ani", "101 ani", "119 ani", "120 de ani", "1,5 ani"],
);
igual("días en rumano", [1, 3, 30, 365].map((n) => formatearValorUnidad(n, "dias", "ro-MD")), ["1 zi", "3 zile", "30 de zile", "365 de zile"]);
igual("semanas en rumano", [1, 4, 40].map((n) => formatearValorUnidad(n, "semanas", "ro-RO")), ["1 săptămână", "4 săptămâni", "40 de săptămâni"]);
igual("pluralRo", [1, 3, 20, 41, 102, "1.000", "7"].map((n) => pluralRo(n, "calculator", "calculatoare")), ["1 calculator", "3 calculatoare", "20 de calculatoare", "41 de calculatoare", "102 calculatoare", "1.000 de calculatoare", "7 calculatoare"]);
igual("formaRo de lei", [1, 2, 20, 1250].map((n) => formaRo(n, "leu", "lei")), ["leu", "lei", "de lei", "de lei"]);
// Nombre del país en rumano: genitivo con artículo enclítico, lugar con «în» y «pentru».
igual(
  "gramática rumana: genitivo",
  ["România", "Republica Moldova", "Germania", "Franța", "Mexic", "Statele Unite ale Americii", "Regatul Unit", "Țările de Jos", "Arabia Saudită", "Coreea de Sud", "Africa de Sud", "Noua Zeelandă", "Cipru", "Chile", "Saint Vincent și Grenadinele"].map((p) => GRAMATICA.ro.de(p)),
  ["României", "Republicii Moldova", "Germaniei", "Franței", "Mexicului", "Statelor Unite ale Americii", "Regatului Unit", "Țărilor de Jos", "Arabiei Saudite", "Coreei de Sud", "Africii de Sud", "Noii Zeelande", "Ciprului", "din Chile", "din Saint Vincent și Grenadinele"],
);
igual("gramática rumana: lugar", ["România", "Republica Moldova", "Mexic"].map((p) => GRAMATICA.ro.en(p)), ["în România", "în Republica Moldova", "în Mexic"]);
igual("gramática rumana: para y sujeto", [GRAMATICA.ro.para("Moldova"), GRAMATICA.ro.nombre("Mexic"), GRAMATICA.ro.nombre("Filipine")], ["pentru Moldova", "Mexicul", "Filipinele"]);
// Checo: one/few/other y many (fracciones) de Intl.PluralRules («1 rok», «3 roky», «5 let», «1,5 roku»).
igual(
  "años en checo",
  [1, 3, 5, 11, 21, 22, 1.5].map((n) => formatearValorUnidad(n, "anios", "cs-CZ")),
  ["1 rok", "3 roky", "5 let", "11 let", "21 let", "22 let", "1,5 roku"],
);
igual("días en checo", [1, 2, 7, 0.5].map((n) => formatearValorUnidad(n, "dias", "cs-CZ")), ["1 den", "2 dny", "7 dní", "0,5 dne"]);
igual("pluralCs", [1, 3, 5, 12, 24].map((n) => pluralCs(n, "kalkulačka", "kalkulačky", "kalkulaček")), ["1 kalkulačka", "3 kalkulačky", "5 kalkulaček", "12 kalkulaček", "24 kalkulaček"]);
// Casos del nombre del país: genitivo, lugar con «v/ve/na» y «pro» + acusativo.
igual(
  "gramática checa: lugar",
  ["Česko", "Česká republika", "Francie", "Slovensko", "Spojené státy", "Spojené království", "Filipíny", "Kanada", "Jamajka", "Švédsko", "Srbsko", "Nový Zéland"].map((p) => GRAMATICA.cs.en(p)),
  ["v Česku", "v České republice", "ve Francii", "na Slovensku", "ve Spojených státech", "ve Spojeném království", "na Filipínách", "v Kanadě", "na Jamajce", "ve Švédsku", "v Srbsku", "na Novém Zélandu"],
);
igual(
  "gramática checa: genitivo",
  ["Česko", "Německo", "Kanada", "Izrael", "Spojené arabské emiráty", "Jihoafrická republika", "Svatý Vincenc a Grenadiny"].map((p) => GRAMATICA.cs.de(p)),
  ["Česka", "Německa", "Kanady", "Izraele", "Spojených arabských emirátů", "Jihoafrické republiky", "Svatého Vincence a Grenadin"],
);
igual("gramática checa: para", ["Česko", "Kanada", "Francie", "Česká republika"].map((p) => GRAMATICA.cs.para(p)), ["pro Česko", "pro Kanadu", "pro Francii", "pro Českou republiku"]);
// Eslovaco: one/few/other y many (fracciones) de Intl.PluralRules («1 rok», «2 roky», «5 rokov», «1,5 roka»).
igual(
  "años en eslovaco",
  [1, 2, 5, 11, 21, 1.5].map((n) => formatearValorUnidad(n, "anios", "sk-SK")),
  ["1 rok", "2 roky", "5 rokov", "11 rokov", "21 rokov", "1,5 roka"],
);
igual("días en eslovaco", [1, 2, 7, 0.5].map((n) => formatearValorUnidad(n, "dias", "sk-SK")), ["1 deň", "2 dni", "7 dní", "0,5 dňa"]);
igual("pluralSk", [1, 3, 5, 12].map((n) => pluralSk(n, "kalkulačka", "kalkulačky", "kalkulačiek")), ["1 kalkulačka", "3 kalkulačky", "5 kalkulačiek", "12 kalkulačiek"]);
igual("euro en Eslovaquia", formatearMoneda(1234567.5, "sk-SK", "EUR").replace(/\s/g, " "), "1 234 567,50 €");
igual(
  "gramática eslovaca: lugar",
  ["Slovensko", "Česko", "Francúzsko", "Švédsko", "Srbsko", "Kanada", "Jamajka", "Spojené štáty", "Spojené kráľovstvo", "Filipíny", "Bahamy", "Nový Zéland", "Južná Kórea", "Kolumbia", "Keňa", "Nikaragua", "Irak", "Senegal", "Bangladéš", "Bosna a Hercegovina", "Čierna Hora", "Hongkong – OAO Číny"].map((p) => GRAMATICA.sk.en(p)),
  ["na Slovensku", "v Česku", "vo Francúzsku", "vo Švédsku", "v Srbsku", "v Kanade", "na Jamajke", "v Spojených štátoch", "v Spojenom kráľovstve", "na Filipínach", "na Bahamách", "na Novom Zélande", "v Južnej Kórei", "v Kolumbii", "v Keni", "v Nikarague", "v Iraku", "v Senegale", "v Bangladéši", "v Bosne a Hercegovine", "v Čiernej Hore", "v Hongkongu – OAO Číny"],
);
igual(
  "gramática eslovaca: genitivo",
  ["Slovensko", "Česko", "Nemecko", "Kanada", "Izrael", "Spojené arabské emiráty", "Dominikánska republika", "Svätý Vincent a Grenadíny", "Maldivy", "Južná Afrika"].map((p) => GRAMATICA.sk.de(p)),
  ["Slovenska", "Česka", "Nemecka", "Kanady", "Izraela", "Spojených arabských emirátov", "Dominikánskej republiky", "Svätého Vincenta a Grenadín", "Maldív", "Južnej Afriky"],
);
igual("gramática eslovaca: para", ["Slovensko", "Kanada", "Kolumbia", "Česká republika", "Dominikánska republika"].map((p) => GRAMATICA.sk.para(p)), ["pre Slovensko", "pre Kanadu", "pre Kolumbiu", "pre Českú republiku", "pre Dominikánsku republiku"]);
// Reglas del eslovaco: atrapan lo checo y el tykanie, y dejan pasar el texto bueno.
const reglasSk = (t: string) => problemasDeTexto(t, "sk", "usted", "sk-SK");
igual("reglas sk: texto bueno", reglasSk("Zadajte sumu a kliknite na „Vypočítať“. Pre iPhone 18 Pro čo najskôr, CO2 zvlášť."), []);
for (const malo of ["Výše úvěru", "Zadejte částku", "alebo nebo", "Zadaj sumu", "Môžeš to zmeniť.", "pro Slovensko", "Co je to?", "Suma «nová»", "Toto je pre Vás."]) {
  verdad(`reglas sk: atrapa «${malo}»`, reglasSk(malo).length > 0);
}
// Griego: one/other de Intl.PluralRules («1 έτος», «3 έτη», «1,5 έτη»).
igual("años en griego", [1, 3, 1.5].map((n) => formatearValorUnidad(n, "anios", "el-GR")), ["1 έτος", "3 έτη", "1,5 έτη"]);
igual("días en griego", [1, 2, 0.5].map((n) => formatearValorUnidad(n, "dias", "el-GR")), ["1 ημέρα", "2 ημέρες", "0,5 ημέρες"]);
igual("pluralEl", [1, 5].map((n) => pluralEl(n, "υπολογισμός", "υπολογισμοί")), ["1 υπολογισμός", "5 υπολογισμοί"]);
// Artículo, caso y contracción del nombre del país («στην Ελλάδα», «της Κύπρου», «για τη Γαλλία»).
igual(
  "gramática griega: lugar",
  ["Ελλάδα", "Κύπρος", "Γαλλία", "Ιταλία", "Καναδάς", "Βέλγιο", "Ισραήλ", "Ηνωμένες Πολιτείες", "Ηνωμένα Αραβικά Εμιράτα", "Νέα Ζηλανδία", "Άγιος Βικέντιος και Γρεναδίνες"].map((p) => GRAMATICA.el.en(p)),
  ["στην Ελλάδα", "στην Κύπρο", "στη Γαλλία", "στην Ιταλία", "στον Καναδά", "στο Βέλγιο", "στο Ισραήλ", "στις Ηνωμένες Πολιτείες", "στα Ηνωμένα Αραβικά Εμιράτα", "στη Νέα Ζηλανδία", "στον Άγιο Βικέντιο και Γρεναδίνες"],
);
igual(
  "gramática griega: genitivo",
  ["Ελλάδα", "Κύπρος", "Αίγυπτος", "Λίβανος", "Βέλγιο", "Ηνωμένο Βασίλειο", "Νότια Αφρική", "Φιλιππίνες", "Βοσνία - Ερζεγοβίνη", "Κόστα Ρίκα", "Μιανμάρ (Βιρμανία)"].map((p) => GRAMATICA.el.de(p)),
  ["της Ελλάδας", "της Κύπρου", "της Αιγύπτου", "του Λιβάνου", "του Βελγίου", "του Ηνωμένου Βασιλείου", "της Νότιας Αφρικής", "των Φιλιππινών", "της Βοσνίας - Ερζεγοβίνης", "της Κόστα Ρίκα", "του Μιανμάρ (Βιρμανία)"],
);
igual("gramática griega: para", ["Ελλάδα", "Γερμανία", "Κύπρος", "Καναδάς", "Μεξικό"].map((p) => GRAMATICA.el.para(p)), ["για την Ελλάδα", "για τη Γερμανία", "για την Κύπρο", "για τον Καναδά", "για το Μεξικό"]);
igual("gramática griega: nombre", ["Ελλάδα", "Καναδάς", "Περού", "Κάτω Χώρες"].map((p) => GRAMATICA.el.nombre(p)), ["η Ελλάδα", "ο Καναδάς", "το Περού", "οι Κάτω Χώρες"]);
// Mayúsculas sostenidas sin tono: lo hace toLocaleUpperCase("el") (toUpperCase() los deja).
igual("mayúsculas griegas sin tono", "Υπολογισμός μισθού".toLocaleUpperCase("el"), "ΥΠΟΛΟΓΙΣΜΟΣ ΜΙΣΘΟΥ");
// Húngaro: sin plural detrás del número («3 nap», «1,5 év») y moneda con «Ft» detrás, sin decimales.
igual("unidades en mongol, sin plural detrás del número", [1, 3].flatMap((n) => [formatearValorUnidad(n, "dias", "mn-MN"), formatearValorUnidad(n, "horas", "mn-MN"), formatearValorUnidad(n, "anios", "mn-MN")]), ["1 өдөр", "1 цаг", "1 жил", "3 өдөр", "3 цаг", "3 жил"]);
igual("tugrik", formatearMoneda(1234567, "mn-MN", "MNT", 0).replace(/\s/g, " "), "₮ 1,234,567");
igual("gramática mongola: en", ["Монгол", "Монгол Улс", "Герман", "Бүгд Найрамдах Доминикан Улс", "Соломоны арлууд", "Хонг-Конг"].map(GRAMATICA.mn.en), ["Монгол Улсад", "Монгол Улсад", "Герман улсад", "Бүгд Найрамдах Доминикан Улсад", "Соломоны арлуудад", "Хонг-Конг нутаг дэвсгэрт"]);
igual("gramática mongola: de y para", [GRAMATICA.mn.de("Монгол Улс"), GRAMATICA.mn.de("Франц"), GRAMATICA.mn.de("Соломоны арлууд"), GRAMATICA.mn.para("Монгол Улс"), GRAMATICA.mn.para("Сент-Винсент ба Гренадин")], ["Монгол Улсын", "Франц улсын", "Соломоны арлуудын", "Монгол Улсад зориулсан", "Сент-Винсент ба Гренадин улсад зориулсан"]);
igual("reglas del mongol: lo correcto pasa", problemasDeTexto("Цалингаа оруулна уу. Та 3 өдөр амарна, 12-р сард 40 тооцоолуур.", "mn", "usted"), []);
verdad("reglas del mongol: «чи», «ъ», exclamación, sufijo en cifra y plural tras número", ["Чи оруул.", "объект", "Тооцоолно уу!", "5-д нэмнэ", "20%-ийг хасна", "3 өдрүүд", "Тооцоолоорой", "зарплата"].every((t) => problemasDeTexto(t, "mn", "usted").length > 0));
// Armenio (ADR 0002, D30).
igual("unidades en armenio", [formatearValorUnidad(3, "dias", "hy-AM"), formatearValorUnidad(1, "anios", "hy-AM"), formatearValorUnidad(1.5, "anios", "hy-AM")], ["3 օր", "1 տարի", "1,5 տարի"]);
igual("dram", formatearMoneda(1234567.5, "hy-AM", "AMD").replace(/\s/g, " "), "1 234 567,50 ֏");
igual("fecha larga en armenio", formatearFecha("2026-03-05", "hy-AM"), "5 մարտի, 2026 թ.");
igual("ancho SEO del armenio", Math.round(anchoVisual("հաշվիչ") * 10) / 10, 7.8);
igual("«և» inicial reformada", [mayusculaInicial("և ահա", "hy-AM"), mayusculaInicial("հաշվիչ", "hy-AM")], ["Եվ ահա", "Հաշվիչ"]);
igual(
  "gramática armenia: lugar",
  ["Հայաստան", "Ֆրանսիա", "Կանադա", "Չիլի", "Պերու", "Մոնակո", "Զիմբաբվե", "Եգիպտոս", "Միացյալ Թագավորություն", "Միացյալ Նահանգներ", "Ֆիլիպիններ", "Բոսնիա և Հերցեգովինա", "Սենթ Վինսենթ և Գրենադիններ", "Մյանմա (Բիրմա)", "Հոնկոնգի ՀՎՇ", "Մեն կղզի", "Ուրուգվայ", "Zetaland"].map((p) => casosHy(p).lugar),
  ["Հայաստանում", "Ֆրանսիայում", "Կանադայում", "Չիլիում", "Պերուում", "Մոնակոյում", "Զիմբաբվեում", "Եգիպտոսում", "Միացյալ Թագավորությունում", "Միացյալ Նահանգներում", "Ֆիլիպիններում", "Բոսնիա և Հերցեգովինայում", "Սենթ Վինսենթ և Գրենադիններում", "Մյանմայում", "Հոնկոնգում", "Մեն կղզում", "Ուրուգվայում", "Zetaland-ում"],
);
igual(
  "gramática armenia: genitivo",
  ["Հայաստան", "Ֆրանսիա", "Չիլի", "Մոնակո", "Միացյալ Թագավորություն", "Միացյալ Նահանգներ", "Բոսնիա և Հերցեգովինա", "Մեն կղզի", "Zetaland"].map((p) => casosHy(p).genitivo),
  ["Հայաստանի", "Ֆրանսիայի", "Չիլիի", "Մոնակոյի", "Միացյալ Թագավորության", "Միացյալ Նահանգների", "Բոսնիա և Հերցեգովինայի", "Մեն կղզու", "Zetaland-ի"],
);
igual("gramática armenia: artículo", ["Հայաստան", "Կանադա", "Միացյալ Նահանգներ", "Zetaland"].map((p) => GRAMATICA.hy.nombre(p)), ["Հայաստանը", "Կանադան", "Միացյալ Նահանգները", "Zetaland-ը"]);
igual("gramática armenia: para", [GRAMATICA.hy.para("Հայաստան"), GRAMATICA.hy.para("Ֆրանսիա")], ["Հայաստանի համար", "Ֆրանսիայի համար"]);
igual("gramática armenia: una cifra no lleva sufijo", [casosHy("7").lugar, GRAMATICA.hy.para("7")], ["7", "7 համար"]);
igual("buscador: armenio con signos", [normalizar("Ինչպե՞ս հաշվարկել եկամուտը։"), normalizar("Ձեր և մեր")], ["ինչպես հաշվարկել եկամուտը", "ձեր եվ մեր"]);
// Albanés (ADR 0002, D31): one/other; lek sin decimales, con espacio duro de miles y sin miles en 4 cifras.
igual("años en albanés", [1, 2, 5, 21, 1.5].map((n) => formatearValorUnidad(n, "anios", "sq-AL")), ["1 vit", "2 vjet", "5 vjet", "21 vjet", "1,5 vjet"]);
igual("días, meses y horas en albanés", [formatearValorUnidad(1, "dias", "sq-AL"), formatearValorUnidad(2, "dias", "sq-AL"), formatearValorUnidad(2, "meses", "sq-AL"), formatearValorUnidad(3, "horas", "sq-AL")], ["1 ditë", "2 ditë", "2 muaj", "3 orë"]);
igual("pluralSq", [1, 3, 21].map((n) => pluralSq(n, "kalkulator", "kalkulatorë")), ["1 kalkulator", "3 kalkulatorë", "21 kalkulatorë"]);
igual("lek", [formatearMoneda(1234567, "sq-AL", "ALL"), formatearMoneda(1234, "sq-AL", "ALL")].map((x) => x.replace(/\s/g, " ")), ["1 234 567 Lekë", "1234 Lekë"]);
igual("gramática albanesa: lugar", ["Shqipëri", "Francë", "Kili", "Brazil", "Mal i Zi", "Filipine", "SHBA", "Mbretëria e Bashkuar", "Zelandë e Re", "Kore e Jugut", "Maqedonia e Veriut", "Emiratet e Bashkuara Arabe", "Shën-Vincent dhe Grenadine"].map((p) => GRAMATICA.sq.en(p)), ["në Shqipëri", "në Francë", "në Kili", "në Brazil", "në Mal të Zi", "në Filipine", "në SHBA", "në Mbretërinë e Bashkuar", "në Zelandën e Re", "në Korenë e Jugut", "në Maqedoninë e Veriut", "në Emiratet e Bashkuara Arabe", "në Shën-Vincent dhe Grenadine"]);
igual("gramática albanesa: de", ["Shqipëri", "Francë", "Zvicër", "Kili", "Irak", "Kanada", "Peru", "Monako", "Kenia", "Mal i Zi", "SHBA", "Filipine", "Afrika e Jugut", "Emiratet e Bashkuara Arabe", "Bosnjë-Hercegovinë", "Shën-Vincent dhe Grenadine"].map((p) => GRAMATICA.sq.de(p)), ["të Shqipërisë", "të Francës", "të Zvicrës", "të Kilit", "të Irakut", "të Kanadasë", "të Perusë", "të Monakos", "të Kenias", "të Malit të Zi", "të SHBA-së", "të Filipineve", "të Afrikës së Jugut", "të Emirateve të Bashkuara Arabe", "të Bosnjë-Hercegovinës", "të Shën-Vincentit dhe Grenadineve"]);
igual("gramática albanesa: para", ["Shqipëri", "Gjermani", "Kosovë", "Brazil", "Mal i Zi", "SHBA", "Filipine", "Zelandë e Re"].map((p) => GRAMATICA.sq.para(p)), ["për Shqipërinë", "për Gjermaninë", "për Kosovën", "për Brazilin", "për Malin e Zi", "për SHBA-në", "për Filipinet", "për Zelandën e Re"]);
igual("gramática albanesa: nombre", ["Shqipëri", "Kanada", "Irak", "Mal i Zi", "Filipine", "Shqipëria"].map((p) => GRAMATICA.sq.nombre(p)), ["Shqipëria", "Kanadaja", "Iraku", "Mali i Zi", "Filipinet", "Shqipëria"]);
igual("unidades en búlgaro", [1, 3].flatMap((n) => [formatearValorUnidad(n, "dias", "bg-BG"), formatearValorUnidad(n, "horas", "bg-BG"), formatearValorUnidad(n, "anios", "bg-BG")]), ["1 ден", "1 час", "1 година", "3 дни", "3 часа", "3 години"]);
igual("euro en Bulgaria", formatearMoneda(1234.5, "bg-BG", "EUR").replace(/\s/g, " "), "1234,50 €");
igual("gramática búlgara: en", ["България", "Германия", "Франция", "Виетнам", "Съединени щати", "Малдиви", "Бахамски острови", "Филипини"].map(GRAMATICA.bg.en), ["в България", "в Германия", "във Франция", "във Виетнам", "в Съединените щати", "на Малдивите", "на Бахамските острови", "във Филипините"]);
igual("gramática búlgara: de y para", [GRAMATICA.bg.de("Обединени арабски емирства"), GRAMATICA.bg.para("България"), GRAMATICA.bg.para("Доминиканска република")], ["на Обединените арабски емирства", "за България", "за Доминиканската република"]);
igual("unidades en georgiano", [formatearValorUnidad(3, "dias", "ka-GE"), formatearValorUnidad(1, "anios", "ka-GE"), formatearValorUnidad(1.5, "anios", "ka-GE")], ["3 დღე", "1 წელი", "1,5 წელი"]);
igual("lari", formatearMoneda(1234567, "ka-GE", "GEL").replace(/\s/g, " "), "1 234 567,00 ₾");
igual("fecha larga en georgiano", formatearFecha("2026-10-24", "ka-GE"), "24 ოქტომბერი, 2026");
igual("ancho SEO del georgiano", Math.round(anchoVisual("კალკულატორი") * 10) / 10, 15.4);
igual("georgiano sin mayúscula inicial", mayusculaInicial("კალკულატორი", "ka-GE"), "კალკულატორი");
igual(
  "gramática georgiana: lugar",
  ["საქართველო", "საფრანგეთი", "გერმანია", "კანადა", "ჩილე", "პერუ", "მალი", "ფიჯი", "ეგვიპტე", "სამოა", "ახალი ზელანდია", "გაერთიანებული სამეფო", "ამერიკის შეერთებული შტატები", "არაბთა გაერთიანებული საამიროები", "ფილიპინები", "სამხრეთ კორეა", "პაპუა-ახალი გვინეა", "ბოსნია და ჰერცეგოვინა", "ტრინიდადი და ტობაგო", "სენტ-ვინსენტი და გრენადინები", "მიანმარი (ბირმა)", "ურუგვაი", "Zetaland"].map((p) => casosKa(p).lugar),
  ["საქართველოში", "საფრანგეთში", "გერმანიაში", "კანადაში", "ჩილეში", "პერუში", "მალიში", "ფიჯიში", "ეგვიპტეში", "სამოაში", "ახალ ზელანდიაში", "გაერთიანებულ სამეფოში", "ამერიკის შეერთებულ შტატებში", "არაბთა გაერთიანებულ საამიროებში", "ფილიპინებში", "სამხრეთ კორეაში", "პაპუა-ახალ გვინეაში", "ბოსნიასა და ჰერცეგოვინაში", "ტრინიდადსა და ტობაგოში", "სენტ-ვინსენტსა და გრენადინებში", "მიანმარში", "ურუგვაიში", "Zetaland-ში"],
);
igual(
  "gramática georgiana: genitivo",
  ["საქართველო", "საფრანგეთი", "გერმანია", "კანადა", "ჩილე", "მალი", "ეგვიპტე", "სამოა", "ახალი ზელანდია", "ამერიკის შეერთებული შტატები", "ბოსნია და ჰერცეგოვინა", "ტრინიდადი და ტობაგო"].map((p) => casosKa(p).genitivo),
  ["საქართველოს", "საფრანგეთის", "გერმანიის", "კანადის", "ჩილეს", "მალის", "ეგვიპტის", "სამოას", "ახალი ზელანდიის", "ამერიკის შეერთებული შტატების", "ბოსნიისა და ჰერცეგოვინის", "ტრინიდადისა და ტობაგოს"],
);
igual("gramática georgiana: una cifra no lleva sufijo", [casosKa("7").lugar, GRAMATICA.ka.para("7")], ["7", "7"]);
igual("gramática georgiana: para", [GRAMATICA.ka.para("საქართველო"), GRAMATICA.ka.para("საფრანგეთი")], ["საქართველოსთვის", "საფრანგეთისთვის"]);
igual("unidades en húngaro", [formatearValorUnidad(3, "dias", "hu-HU"), formatearValorUnidad(1, "anios", "hu-HU"), formatearValorUnidad(1.5, "anios", "hu-HU")], ["3 nap", "1 év", "1,5 év"]);
igual("forint", formatearMoneda(1234567, "hu-HU", "HUF").replace(/\s/g, " "), "1 234 567 Ft");
igual("fecha larga en húngaro", formatearFecha("2026-10-24", "hu-HU"), "2026. október 24.");
// Artículo según cómo se lee lo que sigue: «az» delante de vocal, de 1 (egy), 5 (öt), 1 000 (ezer)...
igual(
  "artículo húngaro",
  [1, 5, 10, 15, 50, 100, 1000, 1500, 10000, 1000000, "1 500 000 Ft", "27%", "1,5", "eredmény", "kalkulátor", "Észak"].map((x) => neveloHu(x)),
  ["az", "az", "a", "a", "az", "a", "az", "az", "a", "az", "az", "a", "az", "az", "a", "az"],
);
// Sufijos del país: -ban/-ben dentro, -on/-en/-ön sobre (Magyarország, islas, -szigetek, -föld,
// -land), armonía con la última vocal no neutra, alargamiento de la a/e/o final y artículo en las
// frases con sustantivo común.
igual(
  "gramática húngara: lugar",
  ["Magyarország", "Németország", "Franciaország", "Kanada", "Chile", "Izrael", "Mali", "Kuba", "Ciprus", "Thaiföld", "Új-Zéland", "Fülöp-szigetek", "Egyesült Államok", "Egyesült Arab Emírségek", "Saint Vincent és a Grenadine-szigetek", "Hongkong KKT", "Zetaország"].map((p) => GRAMATICA.hu.en(p)),
  ["Magyarországon", "Németországban", "Franciaországban", "Kanadában", "Chilében", "Izraelben", "Maliban", "Kubán", "Cipruson", "Thaiföldön", "Új-Zélandon", "a Fülöp-szigeteken", "az Egyesült Államokban", "az Egyesült Arab Emírségekben", "a Saint Vincent és a Grenadine-szigeteken", "Hongkongban", "Zetaországban"],
);
igual(
  "gramática húngara: dirección, origen y dativo",
  ["Magyarország", "Németország", "Svédország", "Kanada", "Egyesült Királyság"].map((p) => { const e = esetekHu(p); return [e.hova, e.honnan, e.nak].join(" / "); }),
  [
    "Magyarországra / Magyarországról / Magyarországnak",
    "Németországba / Németországból / Németországnak",
    "Svédországba / Svédországból / Svédországnak",
    "Kanadába / Kanadából / Kanadának",
    "az Egyesült Királyságba / az Egyesült Királyságból / az Egyesült Királyságnak",
  ],
);
igual("gramática húngara: para y de", [GRAMATICA.hu.para("Magyarország"), GRAMATICA.hu.de("Egyesült Államok")], ["Magyarország számára", "az Egyesült Államok"]);
// Serbio: one/few/other de Intl.PluralRules («1 godina», «2 godine», «5 godina», «21 godina»).
igual(
  "años en serbio",
  [1, 2, 5, 11, 21, 22, 25, 1.5].map((n) => formatearValorUnidad(n, "anios", "sr-Latn-RS")),
  ["1 godina", "2 godine", "5 godina", "11 godina", "21 godina", "22 godine", "25 godina", "1,5 godina"],
);
igual("días en serbio", [1, 3, 7, 21, 0.5].map((n) => formatearValorUnidad(n, "dias", "sr-Latn-RS")), ["1 dan", "3 dana", "7 dana", "21 dan", "0,5 dana"]);
igual("meses en serbio", [1, 2, 12, 24].map((n) => formatearValorUnidad(n, "meses", "sr-Latn-RS")), ["1 mesec", "2 meseca", "12 meseci", "24 meseca"]);
igual("pluralSr", [1, 3, 5, 12, 21, 24].map((n) => pluralSr(n, "zemlja", "zemlje", "zemalja")), ["1 zemlja", "3 zemlje", "5 zemalja", "12 zemalja", "21 zemlja", "24 zemlje"]);
// Casos del nombre del país: genitivo, lugar con «u/na» y «za» + acusativo.
igual(
  "gramática serbia: lugar",
  ["Srbija", "Crna Gora", "Francuska", "Nemačka", "Sjedinjene Države", "Ujedinjeno Kraljevstvo", "Filipini", "Kanada", "Jamajka", "Kipar", "Novi Zeland", "Bosna i Hercegovina", "Sent Vinsent i Grenadini", "Ujedinjeni Arapski Emirati", "Peru", "Mali"].map((p) => GRAMATICA.sr.en(p)),
  ["u Srbiji", "u Crnoj Gori", "u Francuskoj", "u Nemačkoj", "u Sjedinjenim Državama", "u Ujedinjenom Kraljevstvu", "na Filipinima", "u Kanadi", "na Jamajci", "na Kipru", "na Novom Zelandu", "u Bosni i Hercegovini", "na Sent Vinsentu i Grenadinima", "u Ujedinjenim Arapskim Emiratima", "u Peruu", "u Maliju"],
);
igual(
  "gramática serbia: genitivo",
  ["Srbija", "Crna Gora", "Egipat", "Japan", "Maroko", "Sjedinjene Države", "Zelenortska Ostrva", "Južnoafrička Republika"].map((p) => GRAMATICA.sr.de(p)),
  ["Srbije", "Crne Gore", "Egipta", "Japana", "Maroka", "Sjedinjenih Država", "Zelenortskih Ostrva", "Južnoafričke Republike"],
);
igual("gramática serbia: para", ["Srbija", "Crna Gora", "Japan", "Filipini", "Francuska"].map((p) => GRAMATICA.sr.para(p)), ["za Srbiju", "za Crnu Goru", "za Japan", "za Filipine", "za Francusku"]);
// Croata: one/few/other de Intl.PluralRules («1 godina», «2 godine», «5 godina», «21 godina»).
igual(
  "años en croata",
  [1, 2, 5, 11, 21, 22, 25, 1.5].map((n) => formatearValorUnidad(n, "anios", "hr-HR")),
  ["1 godina", "2 godine", "5 godina", "11 godina", "21 godina", "22 godine", "25 godina", "1,5 godina"],
);
igual("días en croata", [1, 3, 7, 21, 0.5].map((n) => formatearValorUnidad(n, "dias", "hr-HR")), ["1 dan", "3 dana", "7 dana", "21 dan", "0,5 dana"]);
igual("meses en croata", [1, 2, 12, 24].map((n) => formatearValorUnidad(n, "meses", "hr-HR")), ["1 mjesec", "2 mjeseca", "12 mjeseci", "24 mjeseca"]);
igual("semanas en croata", [1, 2, 5].map((n) => formatearValorUnidad(n, "semanas", "hr-HR")), ["1 tjedan", "2 tjedna", "5 tjedana"]);
igual("pluralHr", [1, 3, 5, 12, 21, 24].map((n) => pluralHr(n, "zemlja", "zemlje", "zemalja")), ["1 zemlja", "3 zemlje", "5 zemalja", "12 zemalja", "21 zemlja", "24 zemlje"]);
// Casos del nombre del país: genitivo, lugar con «u/na» y «za» + acusativo.
igual(
  "gramática croata: lugar",
  ["Hrvatska", "Crna Gora", "Francuska", "Njemačka", "Sjedinjene Američke Države", "Ujedinjeno Kraljevstvo", "Filipini", "Kanada", "Jamajka", "Cipar", "Novi Zeland", "Bosna i Hercegovina", "Sveti Vincent i Grenadini", "Ujedinjeni Arapski Emirati", "Peru", "Mali", "Cookovi Otoci", "Južnoafrička Republika"].map((p) => GRAMATICA.hr.en(p)),
  ["u Hrvatskoj", "u Crnoj Gori", "u Francuskoj", "u Njemačkoj", "u Sjedinjenim Američkim Državama", "u Ujedinjenom Kraljevstvu", "na Filipinima", "u Kanadi", "na Jamajci", "na Cipru", "na Novom Zelandu", "u Bosni i Hercegovini", "na Svetom Vincentu i Grenadinima", "u Ujedinjenim Arapskim Emiratima", "u Peruu", "u Maliju", "na Cookovim Otocima", "u Južnoafričkoj Republici"],
);
igual(
  "gramática croata: genitivo",
  ["Hrvatska", "Crna Gora", "Egipat", "Japan", "Maroko", "Sjedinjene Američke Države", "Cookovi Otoci", "Južnoafrička Republika"].map((p) => GRAMATICA.hr.de(p)),
  ["Hrvatske", "Crne Gore", "Egipta", "Japana", "Maroka", "Sjedinjenih Američkih Država", "Cookovih Otoka", "Južnoafričke Republike"],
);
igual("gramática croata: para", ["Hrvatska", "Crna Gora", "Japan", "Filipini", "Francuska"].map((p) => GRAMATICA.hr.para(p)), ["za Hrvatsku", "za Crnu Goru", "za Japan", "za Filipine", "za Francusku"]);
const ctxRegiones = { fecha: "2026-10-15", mercado: "zz", locale: "es-419", idioma: "es", trato: "tu", moneda: "XTS", redondeo: { decimales: 2, modo: "mitad-arriba" }, regiones: zz.mercado.regiones ?? [] } as const;
igual("campo region con subconjunto", opcionesDe({ id: "r", tipo: "region", etiqueta: "R", regiones: ["sur"] }, ctxRegiones, {}).map((o) => o.valor), ["sur"]);
// Campo hora y campos condicionales (visibleSi).
const camposModo = [
  { id: "modo", tipo: "opcion", etiqueta: "Modo", opciones: [{ valor: "horas", etiqueta: "Horas" }, { valor: "total", etiqueta: "Total" }] },
  { id: "entrada", tipo: "hora", etiqueta: "Entrada", visibleSi: { modo: ["horas"] } },
  { id: "total", tipo: "numero", etiqueta: "Total", visibleSi: { modo: ["total"] } },
] as const;
const conHoras = parsearEntrada(camposModo, { modo: "horas", entrada: "08:30", total: "" }, ctxRegiones, {});
igual("hora válida y el campo oculto llega null", conHoras.ok ? conHoras.entrada : conHoras.errores, { modo: "horas", entrada: "08:30", total: null });
const horaMala = parsearEntrada(camposModo, { modo: "horas", entrada: "25:00", total: "" }, ctxRegiones, {});
igual("hora inválida da hora-invalida", horaMala.ok ? null : horaMala.errores.entrada, { codigo: "hora-invalida" });
const conTotal = parsearEntrada(camposModo, { modo: "total", entrada: "", total: "40" }, ctxRegiones, {});
igual("con el otro modo, la hora oculta no se pide", conTotal.ok ? conTotal.entrada : conTotal.errores, { modo: "total", entrada: null, total: 40 });
igual("campoVisible", [campoVisible(camposModo[1], { modo: "horas" }), campoVisible(camposModo[1], { modo: "total" })], [true, false]);
igual("texto del error de hora en inglés", textosMotor("en", "tu").errores["hora-invalida"], "Choose a valid time.");

verdad("de-CH sin ß en el sitio", !JSON.stringify(textosSitio("de", "usted", "de-CH")).includes("ß") && JSON.stringify(textosSitio("de", "usted", "de-DE")).includes("ß"));
igual("de-CH en funciones del diccionario", textosSitio("de", "usted", "de-CH").avisoPais.cerrar.includes("ß"), false);

// Cargadores del cliente intl en dos niveles: cargadores/index.ts (un import() por mercado publicado)
// y cargadores/<m>.ts (un import() literal por calculadora local), así el JS de una página lleva el
// índice y baja solo el mapa de su país. Las universales tienen el suyo en
// src/motor/universales/cargadores.ts (un import() por definición y otro por idioma de textos).
// Sin zz, internos ni casos.
const RAIZ = path.resolve(import.meta.dirname, "..");
const NL = "\n";
const GENERAR = process.argv.includes("--generar-cargadores");
const AVISO_GENERADO = `// Generado por \`npx tsx scripts/check_motor.ts --generar-cargadores\`. No editar a mano: check_motor
// falla si no coincide con el registro.`;
const DIR_CARGADORES = path.join(RAIZ, "src", "app", "(intl)", "intl", "[mercado]", "[slug]", "cargadores");
// index.ts y dev.ts no son generados: la carga en dos pasos, la API vieja del informe y la de `next dev`.
const FIJOS = new Set(["index.ts", "dev.ts"]);
const esperados = new Map<string, string>();
const publicados = registroReal.paises
  .filter((p) => p.mercado.estado === "publicado" && p.mercado.codigo !== "global" && p.mercado.codigo !== "zz")
  .map((p) => p.mercado.codigo)
  .sort();
for (const codigo of publicados) {
  const locales = registroReal
    .pais(codigo)!
    .calculadoras.filter((c) => !esUniversal(c))
    .sort((a, b) => a.definicion.slug.localeCompare(b.definicion.slug));
  const lineas: string[] = [];
  for (const c of locales) {
    const slug = c.definicion.slug;
    const t = c.traduccion;
    if (t) {
      // Traducción de una edición: definición del país y textos de la edición, los dos por nombre de archivo.
      const def = path.join(RAIZ, "src", "paises", t.mercado, "calculadoras", `${t.archivo}.ts`);
      const textos = path.join(RAIZ, "src", "paises", codigo, "textos", `${t.archivo}.ts`);
      verdad(`cargador ${codigo}/${slug}: existe la definición del país`, existsSync(def), def);
      verdad(`cargador ${codigo}/${slug}: existen los textos de la edición`, existsSync(textos), textos);
      lineas.push(`  ${JSON.stringify(slug)}: () => traducida(import("@/paises/${t.mercado}/calculadoras/${t.archivo}"), import("@/paises/${codigo}/textos/${t.archivo}")),`);
      continue;
    }
    const archivo = path.join(RAIZ, "src", "paises", codigo, "calculadoras", `${slug}.ts`);
    verdad(`cargador ${codigo}/${slug}: existe el archivo`, existsSync(archivo), archivo);
    lineas.push(`  ${JSON.stringify(slug)}: () => import("@/paises/${codigo}/calculadoras/${slug}"),`);
  }
  const imports = locales.some((c) => c.traduccion) ? `import { traducida } from "@/motor/edicion";\n` : "";
  esperados.set(`${codigo}.ts`, `${AVISO_GENERADO}\n${imports}import type { Cargador } from "./tipos";\n\nexport const CARGADORES: Readonly<Record<string, Cargador>> = {\n${lineas.join(NL)}\n};\n`);
}
esperados.set(
  "tipos.ts",
  `${AVISO_GENERADO}\nexport type Cargador = () => Promise<{ default: unknown }>;\nexport type CargadoresMercado = () => Promise<{ CARGADORES: Readonly<Record<string, Cargador>> }>;\n`,
);
esperados.set(
  "mercados.ts",
  `${AVISO_GENERADO}\nimport type { CargadoresMercado } from "./tipos";\n\nexport const MERCADOS: Readonly<Record<string, CargadoresMercado>> = {\n${publicados.map((c) => `  ${JSON.stringify(c)}: () => import("./${c}"),`).join(NL)}\n};\n`,
);

const capital = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
const DIR_UNIVERSALES = path.join(RAIZ, "src", "motor", "universales");
const bloquesUniversales = [...UNIVERSALES]
  .sort((a, b) => a.id.localeCompare(b.id))
  .map((u) => {
    const definicion = path.join(DIR_UNIVERSALES, u.id, "definicion.ts");
    const textoDef = existsSync(definicion) ? readFileSync(definicion, "utf8") : "";
    verdad(`universal ${u.id}: definicion.ts exporta definir()`, /export function definir\b/.test(textoDef), definicion);
    const idiomas = idiomasDe(u).sort();
    for (const i of idiomas) {
      const textos = path.join(DIR_UNIVERSALES, u.id, "textos", `${i}.ts`);
      const contenido = existsSync(textos) ? readFileSync(textos, "utf8") : "";
      verdad(`universal ${u.id}: textos/${i}.ts exporta textos${capital(i)}`, new RegExp(`export const textos${capital(i)}\\b`).test(contenido), textos);
    }
    const lineas = idiomas.map((i) => `      ${JSON.stringify(i)}: () => import("./${u.id}/textos/${i}").then((m) => m.textos${capital(i)} as TextosUi<never>),`);
    return [
      `  ${JSON.stringify(u.id)}: {`,
      `    definir: () => import("./${u.id}/definicion").then((m) => m.definir as Definir),`,
      "    textos: {",
      ...lineas,
      "    },",
      "  },",
    ].join(NL);
  });
const ARCHIVO_UNIVERSALES = path.join(DIR_UNIVERSALES, "cargadores.ts");
const esperadoUniversales = `${AVISO_GENERADO}
// Lo usa solo el navegador (calculadora-intl.tsx): rearma la definición de una universal con el
// contexto plano que manda el servidor. Un import() por definición y otro por idioma, así una página
// baja la cuenta y los textos de su idioma y nada más.
import type { DefinicionCalculadora, Idioma } from "../tipos";
import type { ContextoUniversal, TextosUi } from "./tipos";

type Definir = (ctx: ContextoUniversal, ui: never) => DefinicionCalculadora;

interface CargadorUniversal {
  definir: () => Promise<Definir>;
  textos: Partial<Record<Idioma, () => Promise<TextosUi<never>>>>;
}

const CARGADORES: Readonly<Record<string, CargadorUniversal>> = {
${bloquesUniversales.join(NL)}
};

export async function cargarUniversal(id: string, contexto: ContextoUniversal): Promise<DefinicionCalculadora> {
  const cargador = CARGADORES[id];
  const textos = cargador?.textos[contexto.idioma];
  if (!cargador || !textos) throw new Error(\`sin cargador para la universal \${id} en \${contexto.idioma}\`);
  const [definir, t] = await Promise.all([cargador.definir(), textos()]);
  return definir(contexto, t.ui(contexto.trato, contexto.locale) as never);
}
`;

if (GENERAR) {
  mkdirSync(DIR_CARGADORES, { recursive: true });
  for (const f of readdirSync(DIR_CARGADORES)) if (!esperados.has(f) && !FIJOS.has(f)) unlinkSync(path.join(DIR_CARGADORES, f));
  for (const [f, texto] of esperados) writeFileSync(path.join(DIR_CARGADORES, f), texto);
  writeFileSync(ARCHIVO_UNIVERSALES, esperadoUniversales);
}
const leer = (archivo: string) => (existsSync(archivo) ? readFileSync(archivo, "utf8").replace(/\r\n/g, NL) : "");
const sobrantes = existsSync(DIR_CARGADORES) ? readdirSync(DIR_CARGADORES).filter((f) => !esperados.has(f) && !FIJOS.has(f)) : [];
verdad("cargadores/ no tiene archivos de mercados que ya no se publican", sobrantes.length === 0, sobrantes.join(", "));
for (const [f, texto] of esperados) verdad(`cargadores/${f} coincide con el registro (npx tsx scripts/check_motor.ts --generar-cargadores)`, leer(path.join(DIR_CARGADORES, f)) === texto);
verdad("src/motor/universales/cargadores.ts coincide con UNIVERSALES (npx tsx scripts/check_motor.ts --generar-cargadores)", leer(ARCHIVO_UNIVERSALES) === esperadoUniversales);

// Bandas de series con el detector de prueba de zz y un Http falso.
const det = detectores.find((d) => d.carril === "serie");
if (det && det.carril === "serie") {
  const http = (respuesta: unknown) => ({ json: async () => respuesta, texto: async () => "" });
  const base = zz.series[0];
  void (async () => {
    const enBanda = await det.traer(http([{ fecha: "2026-10-08", valor: 100.1 }]));
    const rev1 = revisarPuntos(base, enBanda ?? [], det.banda, "2026-10-08");
    igual("punto en banda se acepta", rev1.aceptados.length, 1);
    const fuera = await det.traer(http([{ fecha: "2026-10-08", valor: 500 }]));
    verdad("punto fuera de banda se rechaza", revisarPuntos(base, fuera ?? [], det.banda, "2026-10-08").rechazos.length === 1);
    const salto = await det.traer(http([{ fecha: "2026-10-08", valor: 103 }]));
    verdad("salto mayor al máximo se rechaza", revisarPuntos(base, salto ?? [], det.banda, "2026-10-08").rechazos.some((x) => x.includes("salto")));
    igual("respuesta rota da null", await det.traer(http({ error: "caído" })), null);
    const reescribe = revisarPuntos(base, [{ fecha: "2026-10-07", valor: 100.09 }], det.banda, "2026-10-08");
    verdad("no reescribe un punto publicado", reescribe.rechazos.length === 1);
    terminar();
  })();
} else {
  fallas.push("zz no tiene detector de serie");
  terminar();
}

function terminar() {
  for (const f of fallas) console.error(`❌ ${f}`);
  console.log(fallas.length ? `${fallas.length} FALLAS (${ok} ok)` : `TODO OK: ${ok} pruebas`);
  process.exit(fallas.length ? 1 : 0);
}
