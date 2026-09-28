// tools/lib/datos-oficiales.ts — Acceso compartido a las APIs oficiales (BCRA / INDEC).
//
// POR QUÉ EXISTE (1/8/2026, Turno de Madrugada s65): el helper HTTP tolerante a certificados
// mal encadenados de los .gob.ar y el parser defensivo de pares {fecha, valor} vivían adentro
// de `tools/check-apis.ts`. Cuando nació `tools/rotar-tna.ts` (obra O-12) hacía falta lo mismo
// por segunda vez → regla del 2-2: se extrae acá y los dos lo importan. Un solo lugar donde
// arreglar el día que el BCRA vuelva a rotar la versión de su API.
//
// Solo stdlib (node:https). Sin credenciales de ningún tipo.
//
// Vive en calcular-ar/scripts/vigia/ desde el 28/9/2026: vigila los datos de ESTE repo y corre en su
// workflow datos-vivos (GitHub Actions), sin depender de la PC de Manuel ni del repo libre_albedrio.
// En libre_albedrio/tools/ queda un atajo con el mismo nombre que la importa, así los comandos de
// siempre (`npx -y tsx tools/<este>.ts`) siguen funcionando.

import https from "node:https";

export type FetchResult = { json: unknown; ms: number; insecure: boolean };
export type DatoFechado = { fecha: string; valor: number };

export const TIMEOUT_BCRA_MS = 20_000;
export const TIMEOUT_IPC_MS = 90_000; // datos.gob.ar puede tardar muchísimo

export function httpGetJson(
  url: string,
  timeoutMs: number,
  opts: { insecure?: boolean; redirects?: number } = {},
): Promise<FetchResult> {
  const { insecure = false, redirects = 3 } = opts;
  const started = Date.now();

  return new Promise<FetchResult>((resolve, reject) => {
    const req = https.get(
      url,
      {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
          Accept: "application/json",
        },
        rejectUnauthorized: !insecure,
        timeout: timeoutMs,
      },
      (res) => {
        const status = res.statusCode ?? 0;

        if (status >= 301 && status <= 308 && res.headers.location) {
          res.resume();
          if (redirects <= 0) {
            reject(new Error(`demasiados redirects (último: ${status})`));
            return;
          }
          const next = new URL(res.headers.location, url).toString();
          httpGetJson(next, timeoutMs, { insecure, redirects: redirects - 1 }).then(resolve, reject);
          return;
        }

        if (status !== 200) {
          res.resume();
          reject(new Error(`HTTP ${status}`));
          return;
        }

        const chunks: Buffer[] = [];
        res.on("data", (c: Buffer) => chunks.push(c));
        res.on("end", () => {
          try {
            const body = Buffer.concat(chunks).toString("utf8");
            resolve({ json: JSON.parse(body), ms: Date.now() - started, insecure });
          } catch {
            reject(new Error("la respuesta no es JSON válido"));
          }
        });
      },
    );

    req.on("timeout", () => {
      req.destroy(new Error(`timeout tras ${Math.round(timeoutMs / 1000)}s`));
    });
    req.on("error", reject);
  });
}

const TLS_ERROR_CODES = new Set([
  "UNABLE_TO_VERIFY_LEAF_SIGNATURE",
  "SELF_SIGNED_CERT_IN_CHAIN",
  "DEPTH_ZERO_SELF_SIGNED_CERT",
  "CERT_HAS_EXPIRED",
  "ERR_TLS_CERT_ALTNAME_INVALID",
]);

/** Como httpGetJson, pero si falla por certificado reintenta sin verificación TLS (avisando). */
export async function httpGetJsonTolerante(url: string, timeoutMs: number): Promise<FetchResult> {
  try {
    return await httpGetJson(url, timeoutMs);
  } catch (err) {
    const code = (err as NodeJS.ErrnoException).code ?? "";
    if (TLS_ERROR_CODES.has(code)) {
      return await httpGetJson(url, timeoutMs, { insecure: true });
    }
    throw err;
  }
}

const UA_NAVEGADOR =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126 Safari/537.36";

/**
 * Baja HTML/texto siguiendo redirects y, si el certificado no valida, reintenta sin
 * verificación TLS. Varios sitios oficiales argentinos (camarco.org.ar entre ellos)
 * sirven la cadena de certificados incompleta: `fetch` tira "fetch failed" y el llamador
 * cree que el sitio está caído. Devuelve null si no hubo respuesta útil.
 */
export function httpGetTextTolerante(
  url: string,
  timeoutMs = 25_000,
  opts: { insecure?: boolean; redirects?: number } = {},
): Promise<string | null> {
  const { insecure = false, redirects = 4 } = opts;

  return new Promise<string | null>((resolve) => {
    const req = https.get(
      url,
      {
        headers: { "User-Agent": UA_NAVEGADOR, Accept: "text/html,*/*" },
        rejectUnauthorized: !insecure,
        timeout: timeoutMs,
      },
      (res) => {
        const status = res.statusCode ?? 0;

        if (status >= 301 && status <= 308 && res.headers.location && redirects > 0) {
          res.resume();
          const next = new URL(res.headers.location, url).toString();
          httpGetTextTolerante(next, timeoutMs, { insecure, redirects: redirects - 1 }).then(resolve);
          return;
        }
        if (status !== 200) {
          res.resume();
          resolve(null);
          return;
        }

        const chunks: Buffer[] = [];
        res.on("data", (c: Buffer) => chunks.push(c));
        res.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
      },
    );

    req.on("timeout", () => req.destroy(new Error("timeout")));
    req.on("error", (err) => {
      const code = (err as NodeJS.ErrnoException).code ?? "";
      if (!insecure && TLS_ERROR_CODES.has(code)) {
        httpGetTextTolerante(url, timeoutMs, { insecure: true, redirects }).then(resolve);
      } else {
        resolve(null);
      }
    });
  });
}

/**
 * Diagnóstico de la última descarga que falló.
 *
 * POR QUÉ EXISTE (s82, 15/8/2026): `httpGetBufferTolerante` colapsaba TODA falla a `null`, y
 * quien la llamaba sólo podía decir «no se pudo bajar el PDF». Esa mañana ANSES devolvió 403 con
 * una página de challenge de Imperva/Incapsula a URLs que habían bajado bien ocho horas antes, y
 * el mensaje genérico apuntaba a la conclusión equivocada: «la URL está mal / el PDF no existe»,
 * cuando lo que pasaba era un bloqueo temporal del WAF. Es la 3ª vez que el instrumento tapa la
 * señal (el 403 de Vercel sin `teamId`, el `| tail` que no emite nada, esto) → la causa se
 * vuelve herramienta: la falla ahora se nombra.
 */
export type FalloDescarga = {
  url: string;
  /** Código HTTP, o 0 si ni siquiera hubo respuesta. */
  status: number;
  /** WAF detectado por firma en el cuerpo de la respuesta ("Imperva/Incapsula", "Cloudflare"…). */
  waf: string | null;
  /** Frase lista para imprimirle a un humano (o a la próxima sesión). */
  motivo: string;
};

let ultimoFallo: FalloDescarga | null = null;

/** El último fallo de descarga registrado, para que quien llama explique en vez de adivinar. */
export function ultimoFalloDescarga(): FalloDescarga | null {
  return ultimoFallo;
}

/** Firmas de WAF en el cuerpo de una respuesta de error. Se agregan a medida que muerden. */
const FIRMAS_WAF: ReadonlyArray<readonly [RegExp, string]> = [
  [/_Incapsula_Resource|Incapsula incident ID/i, "Imperva/Incapsula"],
  [/Attention Required!.*Cloudflare|cf-error-details|__cf_chl/i, "Cloudflare"],
  [/Reference\s*#\d+\.[0-9a-f]+/i, "Akamai"],
  [/Request Rejected.*support ID|AWSALB|awselb/i, "AWS WAF / ELB"],
  [/BotDefender|PerimeterX|px-captcha/i, "PerimeterX"],
];

function registrarFallo(url: string, status: number, cuerpo: string): void {
  const waf = FIRMAS_WAF.find(([re]) => re.test(cuerpo))?.[1] ?? null;
  const motivo = waf
    ? `HTTP ${status} con página de challenge de ${waf}: el servidor NO dice que el archivo no exista, dice que a este cliente no le contesta. Suele ser temporal o por IP; la misma URL puede haber bajado bien hace horas. Reintentar más tarde antes de declarar un NO-GO de dato.`
    : status === 0
      ? "no hubo respuesta (timeout, DNS o TLS): es un problema de red, no de la URL."
      : `HTTP ${status}. Verificar la URL exacta antes de concluir que el documento no existe.`;
  ultimoFallo = { url, status, waf, motivo };
}

/**
 * Igual que httpGetTextTolerante pero devuelve los bytes crudos (PDFs, planillas).
 * Necesario para bajar PDF de sitios oficiales con la cadena de certificados rota.
 */
export function httpGetBufferTolerante(
  url: string,
  timeoutMs = 60_000,
  opts: { insecure?: boolean; redirects?: number } = {},
): Promise<Buffer | null> {
  const { insecure = false, redirects = 4 } = opts;

  return new Promise<Buffer | null>((resolve) => {
    const req = https.get(
      url,
      {
        headers: { "User-Agent": UA_NAVEGADOR, Accept: "*/*" },
        rejectUnauthorized: !insecure,
        timeout: timeoutMs,
      },
      (res) => {
        const status = res.statusCode ?? 0;

        if (status >= 301 && status <= 308 && res.headers.location && redirects > 0) {
          res.resume();
          const next = new URL(res.headers.location, url).toString();
          httpGetBufferTolerante(next, timeoutMs, { insecure, redirects: redirects - 1 }).then(resolve);
          return;
        }
        if (status !== 200) {
          // El cuerpo del error es la única pista de si esto es un WAF o un 404 de verdad:
          // se lee acotado (no se descarta) y se guarda el diagnóstico antes de devolver null.
          const errChunks: Buffer[] = [];
          let leidos = 0;
          res.on("data", (c: Buffer) => {
            if (leidos < 8192) {
              errChunks.push(c);
              leidos += c.length;
            }
          });
          res.on("end", () => {
            registrarFallo(url, status, Buffer.concat(errChunks).toString("utf8"));
            resolve(null);
          });
          res.on("error", () => {
            registrarFallo(url, status, "");
            resolve(null);
          });
          return;
        }

        const chunks: Buffer[] = [];
        res.on("data", (c: Buffer) => chunks.push(c));
        res.on("end", () => resolve(Buffer.concat(chunks)));
      },
    );

    req.on("timeout", () => req.destroy(new Error("timeout")));
    req.on("error", (err) => {
      const code = (err as NodeJS.ErrnoException).code ?? "";
      if (!insecure && TLS_ERROR_CODES.has(code)) {
        httpGetBufferTolerante(url, timeoutMs, { insecure: true, redirects }).then(resolve);
      } else {
        registrarFallo(url, 0, String((err as Error).message ?? ""));
        resolve(null);
      }
    });
  });
}

/**
 * Parsing defensivo: encuentra todos los pares { fecha, valor } en cualquier parte del JSON.
 * El shape del BCRA cambió entre versiones (a veces results[].detalle[], a veces results[]).
 */
export function extraerDatosFechados(node: unknown, acc: DatoFechado[] = []): DatoFechado[] {
  if (Array.isArray(node)) {
    for (const item of node) extraerDatosFechados(item, acc);
  } else if (node && typeof node === "object") {
    const o = node as Record<string, unknown>;
    if (typeof o.fecha === "string" && typeof o.valor === "number") {
      acc.push({ fecha: o.fecha, valor: o.valor });
    }
    for (const v of Object.values(o)) extraerDatosFechados(v, acc);
  }
  return acc;
}

export function ultimoDato(datos: DatoFechado[]): DatoFechado | null {
  if (datos.length === 0) return null;
  return datos.reduce((max, d) => (d.fecha > max.fecha ? d : max));
}

const hoyISO = () => new Date().toISOString().slice(0, 10);

/**
 * TNA promedio de plazos fijos a 30 días (BCRA, serie 12).
 * Prueba la URL vigente y, si muere, la forma legacy con rango de fechas.
 * Devuelve null si ninguna respondió (nunca inventa un valor).
 */
export async function traerTnaBcra(): Promise<
  { dato: DatoFechado; ms: number; insecure: boolean } | null
> {
  const urls = [
    "https://api.bcra.gob.ar/estadisticas/v4.0/monetarias/12?limit=1",
    `https://api.bcra.gob.ar/estadisticas/v4.0/DatosVariable/12/2024-01-01/${hoyISO()}`,
  ];

  for (const url of urls) {
    try {
      const { json, ms, insecure } = await httpGetJsonTolerante(url, TIMEOUT_BCRA_MS);
      const dato = ultimoDato(extraerDatosFechados(json));
      if (dato) return { dato, ms, insecure };
    } catch {
      /* probamos la siguiente URL */
    }
  }
  return null;
}
