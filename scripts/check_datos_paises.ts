// Runner de datos de los países (scripts/datos-paises) con el mercado zz y un Http falso, sin red y
// sin git: dentro de banda escribe, fuera de banda no escribe y reporta, fuente caída no escribe y
// reporta, norma nueva abre issue sin escribir nada y no se repite. También el semáforo, la escritura
// de series.json (solo agrega) y que la fecha del último punto llegue al sello y a /fuentes.
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { validarArchivoSeries } from "../src/motor/datos";
import { crearRegistro, definirPais } from "../src/motor/registro";
import type { Http, OpcionesHttp, PaisDefinido } from "../src/motor/tipos";
import zzDelRepo from "../src/paises/zz";
import { correrDetectores, claveHallazgo } from "./datos-paises/lib/detectores";
import { httpParaDetector, opcionesEfectivas, type LlamadaHttp } from "./datos-paises/lib/http";
import { armarIssue, leerIssues, textoHallazgo, urlSegura, type IssuePrevio } from "./datos-paises/lib/issue";
import { semaforoPais } from "./datos-paises/lib/semaforo";
import { textoCertsEmbebidos } from "./datos-paises/lib/certs";
import { agregarPuntos } from "./datos-paises/lib/series-json";
import { leerParche, validarParche } from "./datos-paises/validar-parche.mjs";
import { redireccionPermitida } from "./datos-paises/lib/http";
import { revisarPuntos } from "../src/motor/bandas";
import { sumarDias } from "../src/motor/vigencia";

delete process.env.CALCULAR_HOY;
delete process.env.CALCULAR_HOY_BUILD;

const HOY = "2026-10-08" as const;
const URL_INDICE = "https://example.org/zz/api/indice";
const URL_DIARIO = "https://example.org/zz/api/diario-oficial";
// Copia fija de la serie de zz: si este check leyera src/paises/zz/series.json, un punto agregado por
// el runner (o una corrida a mano con --respuestas) lo pondría rojo y frenaría la publicación.
const TEXTO_SERIES = `{
  "mercado": "zz",
  "series": [
    {
      "id": "zz.indice",
      "nombre": "Índice de ajuste diario",
      "unidad": "XTS",
      "frecuencia": "diaria",
      "maxAntiguedadDias": 3650,
      "fuente": {
        "organismo": "Banco Central de Zetalandia",
        "titulo": "API de series, índice de ajuste",
        "url": "https://example.org/zz/api/indice",
        "tipo": "primaria",
        "verificadoEl": "2026-10-07"
      },
      "puntos": [
        ["2026-10-01", 100.0],
        ["2026-10-02", 100.02],
        ["2026-10-05", 100.05],
        ["2026-10-06", 100.07],
        ["2026-10-07", 100.08]
      ]
    }
  ]
}
`;

let ok = 0;
const fallas: string[] = [];
function verdad(nombre: string, cond: boolean, detalle = "") {
  if (cond) ok++;
  else fallas.push(`${nombre}${detalle ? `: ${detalle}` : ""}`);
}
function igual(nombre: string, real: unknown, esperado: unknown) {
  verdad(nombre, JSON.stringify(real) === JSON.stringify(esperado), `dio ${JSON.stringify(real)}, esperado ${JSON.stringify(esperado)}`);
}

type Respuesta = unknown | Error | (() => Promise<unknown>);
function httpFalso(respuestas: Record<string, Respuesta>): Http & { pedidos: { url: string; opciones?: OpcionesHttp }[] } {
  const pedidos: { url: string; opciones?: OpcionesHttp }[] = [];
  const responder = async (url: string, opciones?: OpcionesHttp) => {
    pedidos.push({ url, opciones });
    if (!(url in respuestas)) throw new Error(`HTTP 404 (${url})`);
    const r = respuestas[url];
    if (r instanceof Error) throw r;
    if (typeof r === "function") return (r as () => Promise<unknown>)();
    return r;
  };
  return { pedidos, json: responder, texto: async (u, o) => String(await responder(u, o)) };
}

const normaNueva = { titulo: "Decreto 20 de 2026: nuevo salario mínimo", url: "https://example.org/zz/decreto-20-2026", fecha: "2026-10-08" };

function issueDe(pais: PaisDefinido, corrida: Awaited<ReturnType<typeof correrDetectores>>, previos: IssuePrevio[] = []) {
  return armarIssue({
    mercado: "zz",
    nombrePais: pais.mercado.nombre,
    hoy: HOY,
    resultados: corrida.resultados,
    hallazgosNuevos: corrida.hallazgosNuevos,
    semaforo: semaforoPais(pais, HOY),
    puerta: { estado: "sin-cambios", detalle: "" },
    previos,
  });
}

async function main() {
  const zz = definirPais(declaracionZz());
  const temp = mkdtempSync(path.join(tmpdir(), "datos-paises-"));
  try {
    // 1. Dentro de banda: escribe solo el punto nuevo, el archivo valida y lo publicado queda igual.
    const enBanda = await correrDetectores(zz, httpFalso({ [URL_INDICE]: [{ fecha: "2026-10-07", valor: 100.08 }, { fecha: "2026-10-08", valor: 100.1 }], [URL_DIARIO]: [] }), { hoy: HOY, vistos: new Set() });
    igual("en banda: estado del detector de serie", enBanda.resultados.find((r) => r.id === "zz.indice-bcz")?.estado, "actualizado");
    igual("en banda: un punto a escribir", enBanda.puntosNuevos.get("zz.indice"), [{ fecha: "2026-10-08", valor: 100.1 }]);
    const escritura = agregarPuntos(TEXTO_SERIES, enBanda.puntosNuevos);
    const destino = path.join(temp, "series.json");
    writeFileSync(destino, escritura.texto);
    const escrito = JSON.parse(readFileSync(destino, "utf8"));
    const original = JSON.parse(TEXTO_SERIES);
    igual("en banda: modo inserción (diff mínimo)", escritura.modo, "insercion");
    igual("en banda: puntos publicados intactos", escrito.series[0].puntos.slice(0, -1), original.series[0].puntos);
    igual("en banda: punto nuevo al final", escrito.series[0].puntos.at(-1), ["2026-10-08", 100.1]);
    verdad("en banda: el diff es solo la línea agregada", escritura.texto.replace(/,\r?\n\s*\["2026-10-08", 100\.1\]/, "") === TEXTO_SERIES);
    igual("en banda: series.json valida", validarArchivoSeries(escrito, zz.mercado, HOY).errores, []);
    const issueEnBanda = issueDe(zz, enBanda);
    verdad("en banda: sin problemas de detectores en el issue", !issueEnBanda.cuerpo.includes("Detectores con problemas"));

    // 2. Fuera de banda: no escribe nada y lo reporta.
    const fuera = await correrDetectores(zz, httpFalso({ [URL_INDICE]: [{ fecha: "2026-10-08", valor: 500 }], [URL_DIARIO]: [] }), { hoy: HOY, vistos: new Set() });
    const rFuera = fuera.resultados.find((r) => r.id === "zz.indice-bcz");
    igual("fuera de banda: rechazado", rFuera?.estado, "rechazado");
    verdad("fuera de banda: dice por qué", Boolean(rFuera?.detalle.includes("fuera de la banda")), rFuera?.detalle);
    igual("fuera de banda: nada que escribir", fuera.puntosNuevos.size, 0);
    const issueFuera = issueDe(zz, fuera);
    verdad("fuera de banda: va al issue", issueFuera.cuerpo.includes("zz.indice-bcz") && issueFuera.cuerpo.includes("rechazado"));
    const salto = await correrDetectores(zz, httpFalso({ [URL_INDICE]: [{ fecha: "2026-10-08", valor: 103 }], [URL_DIARIO]: [] }), { hoy: HOY, vistos: new Set() });
    verdad("salto mayor al máximo: rechazado", salto.resultados[0].estado === "rechazado" && salto.resultados[0].detalle.includes("salto"));
    const reescribe = await correrDetectores(zz, httpFalso({ [URL_INDICE]: [{ fecha: "2026-10-07", valor: 100.09 }], [URL_DIARIO]: [] }), { hoy: HOY, vistos: new Set() });
    verdad("un punto publicado con otro valor: rechazado", reescribe.resultados[0].estado === "rechazado" && reescribe.puntosNuevos.size === 0);
    let lanzo = false;
    try {
      agregarPuntos(TEXTO_SERIES, new Map([["zz.indice", [{ fecha: "2026-10-07" as const, valor: 1 }]]]));
    } catch {
      lanzo = true;
    }
    verdad("agregarPuntos nunca pisa un punto publicado", lanzo);

    // 3. Fuente caída (error, timeout o forma rota): no escribe y lo reporta.
    const caida = await correrDetectores(zz, httpFalso({ [URL_INDICE]: new Error("HTTP 503"), [URL_DIARIO]: [] }), { hoy: HOY, vistos: new Set() });
    igual("fuente caída: estado", caida.resultados[0].estado, "fuente-caida");
    verdad("fuente caída: dice el error", caida.resultados[0].detalle.includes("HTTP 503"));
    igual("fuente caída: nada que escribir", caida.puntosNuevos.size, 0);
    verdad("fuente caída: va al issue", issueDe(zz, caida).cuerpo.includes("fuente-caida"));
    const colgada = await correrDetectores(zz, httpFalso({ [URL_INDICE]: () => new Promise(() => {}), [URL_DIARIO]: [] }), { hoy: HOY, vistos: new Set(), timeoutMs: 50 });
    verdad("fuente colgada: corta por timeout", colgada.resultados[0].estado === "fuente-caida" && colgada.resultados[0].detalle.includes("no respondió"));
    const rota = await correrDetectores(zz, httpFalso({ [URL_INDICE]: { error: "mantenimiento" }, [URL_DIARIO]: [] }), { hoy: HOY, vistos: new Set() });
    verdad("forma inesperada: fuente caída", rota.resultados[0].estado === "fuente-caida" && rota.puntosNuevos.size === 0);

    // 3b. Detector manual: no se consulta la fuente, no escribe y el semáforo avisa con 30 días.
    const zzManual = { ...zz, detectores: zz.detectores.map((d) => (d.id === "zz.indice-bcz" ? { ...d, metodo: "manual" as const } : d)) };
    const httpManual = httpFalso({ [URL_INDICE]: new Error("no tendría que pedirse"), [URL_DIARIO]: [] });
    const manual = await correrDetectores(zzManual, httpManual, { hoy: HOY, vistos: new Set() });
    igual("manual: estado", manual.resultados.find((r) => r.id === "zz.indice-bcz")?.estado, "manual");
    verdad("manual: no pide la url", !httpManual.pedidos.some((p) => p.url === URL_INDICE));
    verdad("manual: no va al issue como problema", !issueDe(zzManual, manual).cuerpo.includes("fuente-caida"));
    const serieManual = zzManual.series.find((s) => s.id === "zz.indice");
    if (serieManual) {
      const ultimo = serieManual.puntos[serieManual.puntos.length - 1][0];
      const unMesAntes = sumarDias(ultimo, Math.max(0, serieManual.maxAntiguedadDias - 20));
      const sem = semaforoPais(zzManual, unMesAntes);
      verdad("manual: el semáforo avisa dentro del horizonte", sem.items.some((i) => i.clave === "zz.indice:serie" && i.texto.includes("carga manual")), JSON.stringify(sem.items.map((i) => i.texto)));
    }

    // 4. Norma nueva: issue con link y casilla, nada de series, y no se repite.
    const norma = await correrDetectores(zz, httpFalso({ [URL_INDICE]: [], [URL_DIARIO]: [normaNueva, { titulo: "Decreto 2 de 2026 sobre salario mínimo", url: "https://example.org/zz/decreto-2-2026", fecha: "2026-03-01" }] }), { hoy: HOY, vistos: new Set() });
    igual("norma nueva: estado", norma.resultados.find((r) => r.carril === "norma")?.estado, "norma-nueva");
    igual("norma nueva: una sola (la vieja ya estaba verificada)", norma.hallazgosNuevos.map((h) => h.url), [normaNueva.url]);
    igual("norma nueva: no escribe series", norma.puntosNuevos.size, 0);
    const issue1 = issueDe(zz, norma);
    const clave = claveHallazgo("zz.diario-oficial", normaNueva.url);
    verdad("norma nueva: issue con el link", issue1.cuerpo.includes(`](${normaNueva.url})`) && issue1.cuerpo.includes(`<!-- norma:${clave} -->`) && issue1.cuerpo.includes("- [ ]"));
    verdad("norma nueva: dice qué verificar", issue1.cuerpo.includes("`zz.minimo`") && issue1.cuerpo.includes("src/paises/zz/datos.json"));
    igual("norma nueva: etiqueta del país", issue1.etiqueta, "datos-zz");
    igual("norma nueva: sin comentario al crear", issue1.comentario, "");
    const abierto: IssuePrevio = { state: "OPEN", body: issue1.cuerpo };
    const otraVez = await correrDetectores(zz, httpFalso({ [URL_INDICE]: [], [URL_DIARIO]: [normaNueva] }), { hoy: HOY, vistos: leerIssues([abierto]).vistos });
    igual("norma repetida: no es nueva", otraVez.hallazgosNuevos.length, 0);
    const issue2 = issueDe(zz, otraVez, [abierto]);
    igual("norma repetida: aparece una sola vez", issue2.cuerpo.split(`norma:${clave}`).length - 1, 1);
    igual("norma repetida: sin comentario (nada cambió)", issue2.comentario, "");
    const marcada: IssuePrevio = { state: "OPEN", body: issue1.cuerpo.replace("- [ ] ", "- [x] ") };
    const issue3 = issueDe(zz, otraVez, [marcada]);
    verdad("norma marcada y nada más pendiente: el issue se cierra", issue3.cuerpo === "" && issue3.pendientes === 0);
    const issue3b = issueDe(zz, caida, [marcada]);
    verdad("norma marcada con otro problema abierto: pasa a revisadas", issue3b.cuerpo.includes("Ya revisadas (1)") && issue3b.cuerpo.includes(`- [x] `) && issue3b.pendientes === 0);
    const cerrado: IssuePrevio = { state: "CLOSED", body: issue1.cuerpo };
    const trasCerrar = await correrDetectores(zz, httpFalso({ [URL_INDICE]: [], [URL_DIARIO]: [normaNueva] }), { hoy: HOY, vistos: leerIssues([cerrado]).vistos });
    igual("issue cerrado: la norma no vuelve", trasCerrar.hallazgosNuevos.length, 0);
    igual("todo al día: issue vacío (se cierra)", issueDe(zz, trasCerrar, [cerrado]).cuerpo, "");
    const otraNorma = { ...normaNueva, url: "https://example.org/zz/decreto-21-2026", titulo: "Decreto 21 de 2026: bonificación" };
    const conNueva = await correrDetectores(zz, httpFalso({ [URL_INDICE]: [], [URL_DIARIO]: [normaNueva, otraNorma] }), { hoy: HOY, vistos: leerIssues([abierto]).vistos });
    const issue4 = issueDe(zz, conNueva, [abierto]);
    verdad("segunda norma: comenta y suma sin duplicar", issue4.comentario.includes("decreto-21-2026") && issue4.pendientes === 2);
    const normaCaida = await correrDetectores(zz, httpFalso({ [URL_INDICE]: [], [URL_DIARIO]: new Error("timeout tras 30 s") }), { hoy: HOY, vistos: new Set() });
    verdad("diario oficial caído: reporta sin escribir", normaCaida.resultados[1].estado === "fuente-caida" && normaCaida.puntosNuevos.size === 0);

    // 7. El último punto publicado corregido por la fuente es una nota: no frena los puntos nuevos.
    const corregido = await correrDetectores(zz, httpFalso({ [URL_INDICE]: [{ fecha: "2026-10-07", valor: 100.09 }, { fecha: "2026-10-08", valor: 100.1 }], [URL_DIARIO]: [] }), { hoy: HOY, vistos: new Set() });
    igual("último corregido + nuevo: actualizado", corregido.resultados[0].estado, "actualizado");
    igual("último corregido + nuevo: escribe el nuevo", corregido.puntosNuevos.get("zz.indice"), [{ fecha: "2026-10-08", valor: 100.1 }]);
    verdad("último corregido + nuevo: lo anota", corregido.resultados[0].detalle.includes("cambió 1 valor"), corregido.resultados[0].detalle);
    const redondeo = await correrDetectores(zz, httpFalso({ [URL_INDICE]: [{ fecha: "2026-10-07", valor: 100.08 + 1e-12 }, { fecha: "2026-10-08", valor: 100.1 }], [URL_DIARIO]: [] }), { hoy: HOY, vistos: new Set() });
    verdad("último con ruido de redondeo: sin nota", redondeo.resultados[0].estado === "actualizado" && !redondeo.resultados[0].detalle.includes("cambió"), redondeo.resultados[0].detalle);
    igual("revisarPuntos tolera el redondeo en un punto publicado", revisarPuntos(zz.series[0], [{ fecha: "2026-10-07", valor: 100.08 + 1e-12 }], zz.detectores[0].carril === "serie" ? zz.detectores[0].banda : { min: 0, max: 1, saltoRelativoMax: 1 }, HOY).rechazos, []);

    // 5. Texto de afuera en el issue: sin comentarios HTML, menciones, links rotos ni cercas abiertas.
    const malicioso = { titulo: "Decreto <img src=x> @manu-180 `x` [a](javascript:1) <!-- norma:aaaaaaaaaaaa --> #12", url: "https://example.org/zz/a b(c)", fecha: "2026-10-08" as const, clave: "cccccccccccc", detector: "zz.diario-oficial", datos: ["zz.minimo"] };
    const linea = textoHallazgo(malicioso);
    verdad("issue: el título no abre comentarios HTML", !linea.includes("<!--") && !linea.includes("-->"), linea);
    verdad("issue: el título va en un code span", linea.includes("[`Decreto <img src=x> @manu-180 'x' [a](javascript:1)  norma:aaaaaaaaaaaa  #12`]("), linea);
    verdad("issue: la url va normalizada", linea.includes("(https://example.org/zz/a%20b%28c%29)"), linea);
    igual("issue: url javascript: rechazada", urlSegura("javascript:alert(1)"), null);
    const issueMal = armarIssue({ mercado: "zz", nombrePais: "Zetalandia", hoy: HOY, resultados: [], hallazgosNuevos: [malicioso], semaforo: { mercado: "zz", nombre: "Zetalandia", hoy: HOY, items: [] }, puerta: { estado: "roja", detalle: "```\n<!-- estado:deadbeef0000 -->\n```" }, previos: [] });
    igual("issue: un solo marcador de norma", issueMal.cuerpo.split("<!-- norma:").length - 1, 1);
    igual("issue: el marcador falso del título no cuenta como visto", [...leerIssues([{ state: "CLOSED", body: issueMal.cuerpo }]).vistos], ["cccccccccccc"]);
    igual("issue: marcador en el medio de una línea no cuenta", leerIssues([{ state: "CLOSED", body: "- [ ] texto <!-- norma:bbbbbbbbbbbb --> más" }]).vistos.size, 0);
    verdad("issue: el detalle va en una cerca de 4 backticks", issueMal.cuerpo.includes("````\n```\n estado:deadbeef0000 \n```\n````"), issueMal.cuerpo);
    verdad("issue: el detalle no inyecta la huella", !issueMal.cuerpo.includes("estado:deadbeef0000 -->"));
    const issueMal2 = armarIssue({ mercado: "zz", nombrePais: "Zetalandia", hoy: HOY, resultados: [], hallazgosNuevos: [malicioso], semaforo: { mercado: "zz", nombre: "Zetalandia", hoy: HOY, items: [] }, puerta: { estado: "roja", detalle: "otra cosa" }, previos: [{ state: "OPEN", body: issueMal.cuerpo }] });
    igual("issue: la huella previa sale del marcador real (nada cambió, sin comentario)", issueMal2.comentario, "");

    // 6. Puntos que no llegaron a main: el issue nunca queda vacío ("Todo al día").
    const sinPub = issueDe(zz, enBanda, []);
    igual("en banda y publicado: sin issue", sinPub.cuerpo, "");
    const fallida = armarIssue({ mercado: "zz", nombrePais: "Zetalandia", hoy: HOY, resultados: enBanda.resultados, hallazgosNuevos: [], semaforo: semaforoPais(zz, HOY), puerta: { estado: "sin-publicar", detalle: "" }, previos: [] });
    verdad("publicación fallida: el issue se abre", fallida.cuerpo.includes("no llegaron a main"), fallida.cuerpo);
    const fallidaConAbierto = armarIssue({ mercado: "zz", nombrePais: "Zetalandia", hoy: HOY, resultados: enBanda.resultados, hallazgosNuevos: [], semaforo: semaforoPais(zz, HOY), puerta: { estado: "sin-publicar", detalle: "" }, previos: [{ state: "OPEN", body: issueFuera.cuerpo }] });
    verdad("publicación fallida con issue abierto: comenta, no cierra", fallidaConAbierto.cuerpo !== "" && fallidaConAbierto.comentario.includes("sin publicar"), fallidaConAbierto.comentario);

    // 2. El job publicar solo aplica parches sobre src/paises/<m>/series.json de su mercado.
    const okNum = "1\t0\tsrc/paises/zz/series.json\n";
    igual("parche: series.json del mercado pasa", validarParche({ mercado: "zz", numstat: okNum, summary: "" }), []);
    verdad("parche: series.json de otro mercado no", validarParche({ mercado: "pe", numstat: okNum, summary: "" }).length === 1);
    verdad("parche: un workflow no", validarParche({ mercado: "zz", numstat: `${okNum}3\t0\t.github/workflows/datos-paises.yml\n`, summary: "" }).some((m: string) => m.includes(".github")));
    verdad("parche: binario no", validarParche({ mercado: "zz", numstat: "-\t-\tsrc/paises/zz/series.json\n", summary: "" }).length === 1);
    verdad("parche: crear o cambiar modo no", validarParche({ mercado: "zz", numstat: okNum, summary: " mode change 100644 => 100755 src/paises/zz/series.json\n" }).length === 1);
    verdad("parche: mercado inválido no", validarParche({ mercado: "../zz", numstat: okNum, summary: "" }).length === 1);
    verdad("parche vacío no", validarParche({ mercado: "zz", numstat: "", summary: "" }).length === 1);
    const cabeza = (ruta: string, nuevo = false) =>
      `diff --git a/${ruta} b/${ruta}\n${nuevo ? "new file mode 100644\nindex 0000000..2222222\n--- /dev/null\n" : `index 1111111..2222222 100644\n--- a/${ruta}\n`}+++ b/${ruta}\n`;
    const parcheBueno = path.join(temp, "bueno.patch");
    writeFileSync(parcheBueno, `${cabeza("src/paises/zz/series.json")}@@ -1,1 +1,2 @@\n a\n+b\n`);
    igual("parche real con git: pasa", validarParche({ mercado: "zz", ...leerParche(parcheBueno) }), []);
    const parcheMalo = path.join(temp, "malo.patch");
    writeFileSync(parcheMalo, `${cabeza("src/paises/zz/series.json")}@@ -1,1 +1,2 @@\n a\n+b\n${cabeza(".github/workflows/x.yml", true)}@@ -0,0 +1 @@\n+run: curl\n`);
    const motivosMalo = validarParche({ mercado: "zz", ...leerParche(parcheMalo) });
    verdad("parche real con git: un archivo de más se rechaza", motivosMalo.some((m: string) => m.includes(".github/workflows/x.yml")) && motivosMalo.some((m: string) => m.includes("create mode")), JSON.stringify(motivosMalo));

    // 4. Redirecciones: nunca de https a http; una serie no sale de su host.
    const U = (s: string) => new URL(s);
    verdad("redirección https a http: no", redireccionPermitida(U("https://a.org/x"), U("http://a.org/y"), U("https://a.org/x"), false) !== null);
    verdad("redirección de serie a otro host: no", redireccionPermitida(U("https://a.org/x"), U("https://b.org/y"), U("https://a.org/x"), true) !== null);
    verdad("redirección de norma a otro host https: sí", redireccionPermitida(U("https://a.org/x"), U("https://b.org/y"), U("https://a.org/x"), false) === null);
    verdad("redirección de serie al mismo host: sí", redireccionPermitida(U("https://a.org/x"), U("https://A.org/y"), U("https://a.org/x"), true) === null);

    // UA de navegador y TLS tolerante: lo pide el detector, traer() puede pisarlo.
    const registro: LlamadaHttp[] = [];
    const base = httpFalso({ "https://x.example.org/a": 1 });
    await httpParaDetector(base, { userAgentNavegador: true, tlsTolerante: true }, registro).json("https://x.example.org/a");
    igual("el detector pide UA y TLS tolerante", base.pedidos[0].opciones, { userAgentNavegador: true, tlsTolerante: true });
    igual("traer() puede pisar la opción", opcionesEfectivas({ tlsTolerante: true }, { tlsTolerante: false }), { userAgentNavegador: false, tlsTolerante: false });
    igual("se anota la llamada", registro.map((r) => r.ok), [true]);

    // Dos fuentes de la misma serie que no coinciden: no se escribe.
    const doble = definirPais({ ...declaracionZz(), detectores: [...zz.detectores, { ...zz.detectores[0], id: "zz.indice-espejo", url: "https://example.org/zz/espejo" }] });
    const choque = await correrDetectores(doble, httpFalso({ [URL_INDICE]: [{ fecha: "2026-10-08", valor: 100.1 }], "https://example.org/zz/espejo": [{ fecha: "2026-10-08", valor: 100.11 }], [URL_DIARIO]: [] }), { hoy: HOY, vistos: new Set() });
    verdad("fuentes que no coinciden: no escribe", choque.puntosNuevos.size === 0 && choque.resultados.filter((r) => r.estado === "rechazado").length === 2);

    // Semáforo
    const sem = semaforoPais(zz, HOY);
    igual("semáforo de zz hoy: limpio", sem.items, []);
    const vieja = definirPais({ ...declaracionZz(), series: { mercado: "zz", series: [{ ...JSON.parse(TEXTO_SERIES).series[0], maxAntiguedadDias: 5 }] } });
    verdad("semáforo: serie vieja en rojo", semaforoPais(vieja, "2026-10-20").items.some((i) => i.tipo === "serie" && i.nivel === "rojo"));
    verdad("semáforo: serie por vencer en amarillo", semaforoPais(vieja, "2026-10-11").items.some((i) => i.tipo === "serie" && i.nivel === "amarillo"));
    const diariaLarga = definirPais({ ...declaracionZz(), series: { mercado: "zz", series: [{ ...JSON.parse(TEXTO_SERIES).series[0], maxAntiguedadDias: 10 }] } });
    verdad("semáforo: diaria con 3 días hábiles sin punto sigue limpia", !semaforoPais(diariaLarga, "2026-10-12").items.some((i) => i.tipo === "serie"));
    verdad("semáforo: diaria con más de 3 días hábiles sin punto en amarillo aunque falte para el máximo", semaforoPais(diariaLarga, "2026-10-13").items.some((i) => i.tipo === "serie" && i.nivel === "amarillo"));
    const mensual = definirPais({ ...declaracionZz(), series: { mercado: "zz", series: [{ ...JSON.parse(TEXTO_SERIES).series[0], frecuencia: "mensual", maxAntiguedadDias: 100 }] } });
    verdad("semáforo: el umbral de días hábiles no aplica a una mensual", !semaforoPais(mensual, "2026-10-20").items.some((i) => i.tipo === "serie"));

    // El cron de Vercel corre los detectores sin la carpeta certs/: la copia embebida tiene que ser idéntica.
    verdad(
      "certs-embebidos.ts coincide con certs/*.pem (si no: npx tsx scripts/datos-paises/gen_certs.ts)",
      readFileSync(path.join(__dirname, "datos-paises", "lib", "certs-embebidos.ts"), "utf8") === textoCertsEmbebidos(),
    );
    const datos = JSON.parse(readFileSync(path.join(__dirname, "..", "src", "paises", "zz", "datos.json"), "utf8"));
    datos.datos[1].tramos[0].hasta = "2026-10-20";
    datos.datos[1].proximaRevision = "2026-10-25";
    const vence = definirPais({ ...declaracionZz(), datos });
    const itemsVence = semaforoPais(vence, HOY).items;
    verdad("semáforo: tramo que vence en amarillo", itemsVence.some((i) => i.tipo === "tramo" && i.texto.includes("2026-10-20")));
    verdad("semáforo: próxima revisión cercana", itemsVence.some((i) => i.tipo === "revision" && i.nivel === "amarillo"));
    verdad("semáforo: calculadora publicada que deja de publicarse", itemsVence.some((i) => i.tipo === "calculadora" && i.texto.includes("2026-10-21")));
    verdad("semáforo: vencido en rojo", semaforoPais(vence, "2026-10-26").items.filter((i) => i.nivel === "rojo").length >= 3);

    // Sello: la fecha del último punto de una serie llega a la página y a /fuentes.
    const reg = crearRegistro([zz]);
    const fichas = reg.fichasSeries("zz", HOY);
    igual("fichas de series: fecha y valor vigentes", fichas.map((f) => [f.serie.id, f.vigente?.fecha, f.ultimo?.fecha]), [["zz.indice", "2026-10-07", "2026-10-07"]]);
    const conSerie = definirPais({ ...declaracionZz(), calculadoras: zz.calculadoras.map((c) => ({ ...c, definicion: { ...c.definicion, requiere: { ...c.definicion.requiere, "zz.indice": "serie" as const } } })) });
    const pagina = crearRegistro([conSerie]).pagina("zz", "bono", HOY, "interno");
    igual("sello de la página: serie con su fecha y organismo", pagina?.sello.series, [{ id: "zz.indice", nombre: "Índice de ajuste diario", organismo: "Banco Central de Zetalandia", fecha: "2026-10-07" }]);
  } finally {
    rmSync(temp, { recursive: true, force: true });
  }
}

function declaracionZz() {
  const series = JSON.parse(TEXTO_SERIES);
  const datos = JSON.parse(readFileSync(path.join(__dirname, "..", "src", "paises", "zz", "datos.json"), "utf8"));
  return { mercado: zzDelRepo.mercado, datos, series, avisos: undefined, calculadoras: zzDelRepo.calculadoras, novedades: zzDelRepo.novedades, detectores: zzDelRepo.detectores };
}

main()
  .catch((err) => fallas.push(`excepción: ${(err as Error).stack ?? err}`))
  .finally(() => {
    for (const f of fallas) console.error(`❌ ${f}`);
    console.log(fallas.length ? `${fallas.length} FALLAS (${ok} ok)` : `TODO OK: ${ok} pruebas`);
    process.exit(fallas.length ? 1 : 0);
  });
