// Pruebas del motor multi-país (src/motor): formato y parseo por locale, redondeo, vigencia en los
// bordes de tramo y por zona horaria, que vigente() nunca devuelva un tramo no verificado, que un
// tramo vencido saque la calculadora de lo publicable, validación de archivos, registro, formulario
// y bandas de series. Usa el mercado ficticio zz y datos sintéticos. Sin red y sin reloj.
import { aplicarEscala, aplicarEscalaMarginal, definirCalculadora, ErrorEntrada } from "../src/motor/calculo";
import { revisarPuntos } from "../src/motor/bandas";
import { validarArchivoDatos, validarArchivoSeries, validarUrl } from "../src/motor/datos";
import { formatearFecha, formatearMoneda, formatearPorcentaje, parsearNumero, redondear } from "../src/motor/formato";
import { ejecutar, mensajeDeError, parsearEntrada } from "../src/motor/formulario";
import { crearRegistro, definirPais, publicabilidad, rellenarContenido, resolverValores } from "../src/motor/registro";
import { textosMotor } from "../src/motor/textos";
import type { Dato, FechaISO, Mercado, PaisDefinido, PropsCalculadora, Serie, Tramo } from "../src/motor/tipos";
import { validarPais } from "../src/motor/validar";
import { fechaEnZona, hoyEn, sumarDias, valorSerie, vigente } from "../src/motor/vigencia";
import zz from "../src/paises/zz";
import bono from "../src/paises/zz/calculadoras/bono";
import datosZz from "../src/paises/zz/datos.json";
import { detectores } from "../src/paises/zz/fuentes";

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
];
for (const [locale, texto, esperado] of parseos) igual(`parsear ${locale} «${texto}»`, parsearNumero(texto, locale), esperado);

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
igual("zz aparece en modo interno", reg.mercados("interno").map((m) => m.codigo), ["zz"]);
igual("calculadoras publicables de zz (interno)", reg.calculadorasPublicables("zz", "2026-10-15", "interno").map((c) => c.definicion.id), ["zz.bono"]);
igual("calculadoras publicables de zz (producción)", reg.calculadorasPublicables("zz", "2026-10-15", "produccion").length, 0);
igual("equivalentes de bono-semestral", reg.equivalentes("bono-semestral", () => "2026-10-15", "interno"), [{ mercado: "zz", locale: "es-419", slug: "bono" }]);
igual("rutas internas", reg.rutas(() => "2026-10-15", "interno"), [{ mercado: "zz", slug: "bono" }]);
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
