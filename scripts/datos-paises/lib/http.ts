import http from "node:http";
import https from "node:https";
import zlib from "node:zlib";
import type { Detector, Http, OpcionesHttp } from "../../../src/motor/tipos";

export const UA_NAVEGADOR = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36";
export const UA_PROPIO = "CalcularYa/datos-paises (+https://calcularya.com)";

const MAX_BYTES = 25 * 1024 * 1024;
const MAX_REDIRECCIONES = 5;

// Varios organismos sirven la cadena de certificados incompleta: sin esto el runner cree que la fuente
// está caída. Solo se reintenta sin verificar cuando el detector lo pide y el error es de certificado.
const CODIGOS_TLS = new Set([
  "UNABLE_TO_VERIFY_LEAF_SIGNATURE",
  "UNABLE_TO_GET_ISSUER_CERT_LOCALLY",
  "SELF_SIGNED_CERT_IN_CHAIN",
  "DEPTH_ZERO_SELF_SIGNED_CERT",
  "CERT_HAS_EXPIRED",
  "ERR_TLS_CERT_ALTNAME_INVALID",
]);

export interface LlamadaHttp {
  url: string;
  opciones: OpcionesHttp;
  ok: boolean;
  ms: number;
  error?: string;
}

export function opcionesEfectivas(detector: Pick<Detector, "userAgentNavegador" | "tlsTolerante">, opciones: OpcionesHttp = {}): OpcionesHttp {
  return {
    userAgentNavegador: opciones.userAgentNavegador ?? detector.userAgentNavegador ?? false,
    tlsTolerante: opciones.tlsTolerante ?? detector.tlsTolerante ?? false,
    ...(opciones.encabezados ? { encabezados: opciones.encabezados } : {}),
  };
}

export function httpParaDetector(base: Http, detector: Pick<Detector, "userAgentNavegador" | "tlsTolerante">, registro: LlamadaHttp[]): Http {
  const anotar = async <T>(url: string, opciones: OpcionesHttp | undefined, f: (o: OpcionesHttp) => Promise<T>): Promise<T> => {
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
  return {
    json: (url, opciones) => anotar(url, opciones, (o) => base.json(url, o)),
    texto: (url, opciones) => anotar(url, opciones, (o) => base.texto(url, o)),
  };
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

function pedir(url: string, opciones: OpcionesHttp, timeoutMs: number, inseguro: boolean, saltos: number): Promise<string> {
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
    const modulo = u.protocol === "https:" ? https : http;
    const req = modulo.get(
      u,
      {
        headers: {
          "User-Agent": opciones.userAgentNavegador ? UA_NAVEGADOR : UA_PROPIO,
          Accept: "application/json, text/html, application/xml, text/plain, */*",
          "Accept-Encoding": "gzip, deflate, br",
          "Accept-Language": "es-419,es;q=0.9",
          ...(opciones.encabezados ?? {}),
        },
        timeout: timeoutMs,
        ...(u.protocol === "https:" ? { rejectUnauthorized: !inseguro } : {}),
      },
      (res) => {
        const status = res.statusCode ?? 0;
        if (status >= 300 && status < 400 && res.headers.location) {
          res.resume();
          if (saltos <= 0) return reject(new Error(`demasiadas redirecciones desde ${url}`));
          pedir(new URL(res.headers.location, u).toString(), opciones, timeoutMs, inseguro, saltos - 1).then(resolve, reject);
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
  });
}

export function crearHttpReal(timeoutMs = 30_000): Http {
  const texto = async (url: string, opciones: OpcionesHttp = {}): Promise<string> => {
    try {
      return await pedir(url, opciones, timeoutMs, false, MAX_REDIRECCIONES);
    } catch (err) {
      const codigo = (err as NodeJS.ErrnoException).code ?? "";
      if (opciones.tlsTolerante && CODIGOS_TLS.has(codigo)) return pedir(url, opciones, timeoutMs, true, MAX_REDIRECCIONES);
      if (codigo) (err as Error).message = `${(err as Error).message} (${codigo})`;
      throw err;
    }
  };
  return {
    texto,
    async json(url, opciones = {}) {
      const cuerpo = await texto(url, { ...opciones, encabezados: { Accept: "application/json", ...(opciones.encabezados ?? {}) } });
      try {
        return JSON.parse(cuerpo.replace(/^﻿/, "")) as unknown;
      } catch {
        throw new Error(`la respuesta no es JSON válido (empieza con ${JSON.stringify(cuerpo.slice(0, 60))})`);
      }
    },
  };
}
