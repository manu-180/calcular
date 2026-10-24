import http from "node:http";
import https from "node:https";
import tls from "node:tls";
import zlib from "node:zlib";
import type { Detector, Http, OpcionesHttp } from "../../../src/motor/tipos";
import { INTERMEDIOS } from "./certs-embebidos";

export const UA_NAVEGADOR = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36";
export const UA_PROPIO = "CalcularYa/datos-paises (+https://calcularya.com)";

const MAX_BYTES = 25 * 1024 * 1024;
const MAX_REDIRECCIONES = 5;

// bcu.gub.uy, funcionpublica.gov.co, asamblea.gob.sv y bcv.org.ve no mandan el intermedio de su
// cadena (Node no lo baja solo por AIA, curl y los navegadores sí). tlsTolerante NO apaga la
// verificación: suma a las raíces de Node los intermedios de certs/, bajados de la URL "CA Issuers"
// de cada certificado y comprobados contra una raíz de Node. Verificación de cadena y de nombre
// (checkServerIdentity) quedan intactas; un MITM sigue rebotando. Si un sitio cambia de CA, el
// detector sale "fuente-caida" con UNABLE_TO_VERIFY_LEAF_SIGNATURE: bajar el intermedio nuevo con
// la URL del campo AIA del certificado, versionarlo en certs/ y correr gen_certs.ts (el agente lee la
// copia embebida para que el cron de Vercel, que no lleva la carpeta, también la tenga).
let agenteConIntermedios: https.Agent | undefined;
function agenteTolerante(): https.Agent {
  agenteConIntermedios ??= new https.Agent({ ca: [...tls.rootCertificates, ...INTERMEDIOS] });
  return agenteConIntermedios;
}

// mismoHost no está en OpcionesHttp a propósito: lo fija el carril del detector y traer() no lo
// puede apagar. Una serie se publica sola, así que su fuente no puede mandarnos a otro host.
export interface OpcionesEfectivas extends OpcionesHttp {
  mismoHost?: boolean;
}

export interface LlamadaHttp {
  url: string;
  opciones: OpcionesEfectivas;
  ok: boolean;
  ms: number;
  error?: string;
}

type DetectorHttp = Pick<Detector, "userAgentNavegador" | "tlsTolerante"> & { carril?: Detector["carril"] };

export function opcionesEfectivas(detector: DetectorHttp, opciones: OpcionesHttp = {}): OpcionesEfectivas {
  return {
    userAgentNavegador: opciones.userAgentNavegador ?? detector.userAgentNavegador ?? false,
    tlsTolerante: opciones.tlsTolerante ?? detector.tlsTolerante ?? false,
    ...(opciones.encabezados ? { encabezados: opciones.encabezados } : {}),
    ...(detector.carril === "serie" ? { mismoHost: true } : {}),
  };
}

export function httpParaDetector(base: Http, detector: DetectorHttp, registro: LlamadaHttp[]): Http {
  const anotar = async <T>(url: string, opciones: OpcionesHttp | undefined, f: (o: OpcionesEfectivas) => Promise<T>): Promise<T> => {
    const o = opcionesEfectivas(detector, opciones);
    const t0 = Date.now();
    try {
      const r = await f(o);
      registro.push({ url, opciones: o, ok: true, ms: Date.now() - t0 });
      return r;
    } catch (err) {
      registro.push({ url, opciones: o, ok: false, ms: Date.now() - t0, error: (err as Error).message });
      throw err;
    }
  };
  const post = base.postJson;
  return {
    json: (url, opciones) => anotar(url, opciones, (o) => base.json(url, o)),
    texto: (url, opciones) => anotar(url, opciones, (o) => base.texto(url, o)),
    ...(post ? { postJson: (url: string, cuerpo: unknown, opciones?: OpcionesHttp) => anotar(url, opciones, (o) => post(url, cuerpo, o)) } : {}),
  };
}

export function redireccionPermitida(desde: URL, hacia: URL, origen: URL, mismoHost: boolean): string | null {
  if (hacia.protocol !== "https:" && hacia.protocol !== "http:") return `redirección a un protocolo no soportado (${hacia.protocol})`;
  if (desde.protocol === "https:" && hacia.protocol === "http:") return `redirección de https a http (${hacia.host}): no se sigue`;
  if (mismoHost && hacia.hostname.toLowerCase() !== origen.hostname.toLowerCase()) return `redirección a otro host (${origen.hostname} → ${hacia.hostname}): una serie solo se lee de su host`;
  return null;
}

function charsetDe(tipo: string | undefined): string {
  const m = /charset=([^;]+)/i.exec(tipo ?? "");
  const c = (m?.[1] ?? "utf-8").trim().replace(/^"|"$/g, "").toLowerCase();
  return c === "latin1" ? "iso-8859-1" : c;
}

function descomprimir(buf: Buffer, codificacion: string | undefined): Buffer {
  const c = (codificacion ?? "").toLowerCase();
  if (c.includes("gzip")) return zlib.gunzipSync(buf);
  if (c.includes("br")) return zlib.brotliDecompressSync(buf);
  if (c.includes("deflate")) return zlib.inflateSync(buf);
  return buf;
}

function pedir(url: string, opciones: OpcionesEfectivas, timeoutMs: number, origen: URL | null, saltos: number, cuerpo?: string): Promise<string> {
  return new Promise((resolve, reject) => {
    let u: URL;
    try {
      u = new URL(url);
    } catch {
      reject(new Error(`url inválida: ${url}`));
      return;
    }
    if (u.protocol !== "https:" && u.protocol !== "http:") {
      reject(new Error(`protocolo no soportado: ${u.protocol}`));
      return;
    }
    const inicio = origen ?? u;
    const modulo = u.protocol === "https:" ? https : http;
    const req = modulo.request(
      u,
      {
        method: cuerpo === undefined ? "GET" : "POST",
        headers: {
          "User-Agent": opciones.userAgentNavegador ? UA_NAVEGADOR : UA_PROPIO,
          Accept: "application/json, text/html, application/xml, text/plain, */*",
          "Accept-Encoding": "gzip, deflate, br",
          "Accept-Language": "es-419,es;q=0.9",
          ...(cuerpo === undefined ? {} : { "Content-Type": "application/json", "Content-Length": String(Buffer.byteLength(cuerpo)) }),
          ...(opciones.encabezados ?? {}),
        },
        timeout: timeoutMs,
        ...(u.protocol === "https:" && opciones.tlsTolerante ? { agent: agenteTolerante() } : {}),
      },
      (res) => {
        const status = res.statusCode ?? 0;
        if (status >= 300 && status < 400 && res.headers.location) {
          res.resume();
          if (saltos <= 0) return reject(new Error(`demasiadas redirecciones desde ${url}`));
          let destino: URL;
          try {
            destino = new URL(res.headers.location, u);
          } catch {
            return reject(new Error(`redirección a una url inválida desde ${url}`));
          }
          const motivo = redireccionPermitida(u, destino, inicio, Boolean(opciones.mismoHost));
          if (motivo) return reject(new Error(motivo));
          if (cuerpo !== undefined) return reject(new Error(`un POST no sigue redirecciones (${destino.host})`));
          pedir(destino.toString(), opciones, timeoutMs, inicio, saltos - 1).then(resolve, reject);
          return;
        }
        if (status < 200 || status >= 300) {
          res.resume();
          reject(new Error(`HTTP ${status}`));
          return;
        }
        const partes: Buffer[] = [];
        let total = 0;
        res.on("data", (c: Buffer) => {
          total += c.length;
          if (total > MAX_BYTES) req.destroy(new Error(`respuesta de más de ${MAX_BYTES} bytes`));
          else partes.push(c);
        });
        res.on("end", () => {
          try {
            const crudo = descomprimir(Buffer.concat(partes), res.headers["content-encoding"]);
            resolve(new TextDecoder(charsetDe(res.headers["content-type"])).decode(crudo));
          } catch (err) {
            reject(new Error(`no pude decodificar la respuesta: ${(err as Error).message}`));
          }
        });
        res.on("error", reject);
      },
    );
    req.on("timeout", () => req.destroy(new Error(`timeout tras ${Math.round(timeoutMs / 1000)} s`)));
    req.on("error", reject);
    req.end(cuerpo);
  });
}

export function crearHttpReal(timeoutMs = 30_000): Http {
  const texto = async (url: string, opciones: OpcionesEfectivas = {}, cuerpo?: string): Promise<string> => {
    try {
      return await pedir(url, opciones, timeoutMs, null, MAX_REDIRECCIONES, cuerpo);
    } catch (err) {
      const codigo = (err as NodeJS.ErrnoException).code ?? "";
      if (codigo) (err as Error).message = `${(err as Error).message} (${codigo})`;
      throw err;
    }
  };
  const parsear = (cuerpo: string): unknown => {
    try {
      return JSON.parse(cuerpo.replace(/^\uFEFF/, "")) as unknown;
    } catch {
      throw new Error(`la respuesta no es JSON válido (empieza con ${JSON.stringify(cuerpo.slice(0, 60))})`);
    }
  };
  const conJson = (opciones: OpcionesEfectivas): OpcionesEfectivas => ({ ...opciones, encabezados: { Accept: "application/json", ...(opciones.encabezados ?? {}) } });
  return {
    texto: (url, opciones) => texto(url, opciones),
    async json(url, opciones = {}) {
      return parsear(await texto(url, conJson(opciones)));
    },
    async postJson(url, cuerpo, opciones = {}) {
      return parsear(await texto(url, conJson(opciones), JSON.stringify(cuerpo)));
    },
  };
}
