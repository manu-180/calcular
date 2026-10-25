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
import { formatearFecha, formatearMoneda, formatearPorcentaje, formatearValorUnidad, parsearNumero, redondear, sugerenciaMiles } from "../src/motor/formato";
import { campoVisible, ejecutar, mensajeDeError, opcionesDe, parsearEntrada } from "../src/motor/formulario";
import { textosSitio } from "../src/motor/i18n";
import { GRAMATICA } from "../src/motor/i18n/gramatica";
import { pluralSr } from "../src/motor/i18n/plural";
import { crearRegistro, definirEdicion, definirPais, esUniversal, marcadoresDe, publicabilidad, rellenarContenido, resolverValores } from "../src/motor/registro";
import { UNIVERSALES } from "../src/motor/universales";
import { idiomasDe } from "../src/motor/universales/tipos";
import { textosMotor } from "../src/motor/textos";
import type { Dato, FechaISO, Mercado, PaisDefinido, PropsCalculadora, Serie, Tramo } from "../src/motor/tipos";
import { validarPais } from "../src/motor/validar";
import { fechaEnZona, hoyEn, sumarDias, valorSerie, vigente } from "../src/motor/vigencia";
import zz from "../src/paises/zz";
import bono from "../src/paises/zz/calculadoras/bono";
import datosZz from "../src/paises/zz/datos.json";
import { detectores } from "../src/paises/zz/fuentes";
import { registro as registroReal } from "../src/paises";

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

// Parseo por locale: el error que multiplica por mil.
const parseos: [string, string, number | null][] = [
  ["es-PE", "1,474.77", 1474.77],
  ["es-PE", "S/ 1,474.77", 1474.77],
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
  // Serbio (sr-Latn-RS): punto de miles, coma decimal y «RSD» o «din.» detrás.
  ["sr-Latn-RS", "1.234,50", 1234.5],
  ["sr-Latn-RS", "1.234.567,25 RSD", 1234567.25],
  ["sr-Latn-RS", "25.000 din.", 25000],
  ["sr-Latn-RS", "-250,75", -250.75],
  ["sr-Latn-RS", "20%", 20],
  ["sr-Latn-ME", "1.234,50 €", 1234.5],
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
  ["sr-Latn-RS", "5.000", 5000],
  ["sr-Latn-RS", "5,000", null],
];
for (const [locale, texto, esperado] of ambiguos) igual(`parsear con milesAmbiguos ${locale} «${texto}»`, parsearNumero(texto, locale, { milesAmbiguos: true }), esperado);
igual("sin milesAmbiguos sigue siendo decimal", parsearNumero("5.000", "es-MX"), 5);
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
  igual("edición: hermanas de zz/bono", registroReal.hermanas("zz", "bono", () => "2026-10-15", "interno").map((e) => `${e.mercado}/${e.slug}`), ["zz/bono", "zz-en/half-year-bonus", "zz-ja/half-year-bonus", "zz-sr/polugodisnji-bonus"]);
  igual("edición: ediciones de zz", registroReal.ediciones("zz", "interno").map((m) => m.codigo), ["zz", "zz-en", "zz-ja", "zz-sr"]);
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
