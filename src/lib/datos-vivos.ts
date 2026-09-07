// Detector de deriva entre lo que calcular.ar SIRVE hoy y lo que las fuentes oficiales publican.
//
// POR QUÉ EXISTE (4/9/2026): las páginas son estáticas y los datos se hornean en el build, así que
// un dato nuevo del BCRA o del INDEC no llega al sitio hasta que alguien redeploya. Hasta hoy el
// único que se daba cuenta era una sesión de Claude arrancando a mano.
//
// INVARIANTE QUE NO SE PUEDE ROMPER: este módulo DETECTA y AVISA, nunca escribe un dato. La
// rotación con sus guardas vive en tools/rotar-tna.ts y tools/rotar-inflacion.ts, y pasa por git.
// Un número de plata horneado desde un fetch sin revisar es exactamente la línea roja #5.
//
// Las bandas de sanidad están duplicadas a propósito con las de tools/rotar-*.ts: ese código corre
// en Node con node:fs y no se puede importar desde el bundle de Next. Si cambiás una, cambiá las dos.

import https from "node:https";

export type Severidad = "ok" | "atencion" | "accion";

export type Hallazgo = {
  dato: string;
  severidad: Severidad;
  sirve: string;
  fuente: string;
  detalle: string;
  accion?: string;
};

export const BANDA_TNA = { min: 1, max: 300, saltoRelativoMax: 0.3 };
export const BANDA_IPC = { min: -5, max: 30, saltoPpMax: 5 };

export const URL_BCRA = "https://api.bcra.gob.ar/estadisticas/v4.0/monetarias/12?limit=1";
export const URL_IPC =
  "https://apis.datos.gob.ar/series/api/series/?ids=148.3_INIVELNAL_DICI_M_26&format=json&limit=5000";

const MESES = [
  "enero", "febrero", "marzo", "abril", "mayo", "junio",
  "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
];

export function periodoANombre(periodo: string): string {
  const [anio, mes] = periodo.split("-");
  return `${MESES[Number(mes) - 1]} ${anio}`;
}

export function nombreAPeriodo(nombre: string): string | null {
  const [mes, anio] = nombre.trim().toLowerCase().split(/\s+/);
  const i = MESES.indexOf(mes);
  if (i < 0 || !/^\d{4}$/.test(anio ?? "")) return null;
  return `${anio}-${String(i + 1).padStart(2, "0")}`;
}

// ── IO ───────────────────────────────────────────────────────────────────────
// Varios .gob.ar sirven la cadena de certificados incompleta: fetch tira "fetch failed" y el
// llamador cree que el organismo está caído. Se reintenta sin verificar TLS, como en tools/lib.

function getJson(url: string, timeoutMs: number, insecure = false, redirects = 3): Promise<unknown> {
  return new Promise((resolve, reject) => {
    const req = https.get(
      url,
      {
        headers: { "User-Agent": "calcular.ar/datos-vivos", Accept: "application/json" },
        rejectUnauthorized: !insecure,
        timeout: timeoutMs,
      },
      (res) => {
        const status = res.statusCode ?? 0;
        if (status >= 301 && status <= 308 && res.headers.location && redirects > 0) {
          res.resume();
          getJson(new URL(res.headers.location, url).toString(), timeoutMs, insecure, redirects - 1)
            .then(resolve, reject);
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
            resolve(JSON.parse(Buffer.concat(chunks).toString("utf8")));
          } catch {
            reject(new Error("la respuesta no es JSON válido"));
          }
        });
      },
    );
    req.on("timeout", () => req.destroy(new Error(`timeout tras ${Math.round(timeoutMs / 1000)}s`)));
    req.on("error", reject);
  });
}

const CODIGOS_TLS = new Set([
  "UNABLE_TO_VERIFY_LEAF_SIGNATURE",
  "SELF_SIGNED_CERT_IN_CHAIN",
  "DEPTH_ZERO_SELF_SIGNED_CERT",
  "CERT_HAS_EXPIRED",
  "ERR_TLS_CERT_ALTNAME_INVALID",
]);

async function getJsonTolerante(url: string, timeoutMs: number): Promise<unknown> {
  try {
    return await getJson(url, timeoutMs);
  } catch (err) {
    if (CODIGOS_TLS.has((err as NodeJS.ErrnoException).code ?? "")) {
      return await getJson(url, timeoutMs, true);
    }
    throw err;
  }
}

/** Recorre un JSON de forma arbitraria juntando pares {fecha, valor}: el BCRA rota el shape seguido. */
export function extraerFechados(node: unknown, acc: { fecha: string; valor: number }[] = []) {
  if (Array.isArray(node)) {
    for (const n of node) extraerFechados(n, acc);
    return acc;
  }
  if (node && typeof node === "object") {
    const o = node as Record<string, unknown>;
    const fecha = o.fecha ?? o.date ?? o.Fecha;
    const valor = o.valor ?? o.value ?? o.Valor;
    if (typeof fecha === "string" && typeof valor === "number" && /^\d{4}-\d{2}-\d{2}/.test(fecha)) {
      acc.push({ fecha: fecha.slice(0, 10), valor });
    }
    for (const v of Object.values(o)) extraerFechados(v, acc);
  }
  return acc;
}

export type TnaViva = { valor: number; fecha: string };
export type IpcVivo = { periodo: string; indice: number; previo: number };

export async function traerTna(timeoutMs = 15_000): Promise<TnaViva | null> {
  try {
    const datos = extraerFechados(await getJsonTolerante(URL_BCRA, timeoutMs));
    if (!datos.length) return null;
    const ultimo = datos.reduce((a, b) => (b.fecha > a.fecha ? b : a));
    return { valor: ultimo.valor, fecha: ultimo.fecha };
  } catch {
    return null;
  }
}

export async function traerIpc(timeoutMs = 25_000): Promise<IpcVivo | null> {
  try {
    const json = (await getJsonTolerante(URL_IPC, timeoutMs)) as { data?: [string, number][] };
    const filas = (json.data ?? []).filter((f) => typeof f?.[1] === "number");
    if (filas.length < 2) return null;
    const [fecha, indice] = filas[filas.length - 1];
    const previo = filas[filas.length - 2][1];
    return { periodo: String(fecha).slice(0, 7), indice, previo };
  } catch {
    return null;
  }
}

// ── Comparación (pura: sin red, sin env — es lo que testea tools/datos-vivos-test.ts) ────────

export function compararTna(
  servido: { valor: number; fechaISO: string },
  vivo: TnaViva | null,
): Hallazgo {
  const base = { dato: "TNA_FALLBACK (plazo fijo)", sirve: `${servido.valor}% · ${servido.fechaISO}` };

  if (!vivo) {
    return {
      ...base,
      severidad: "atencion",
      fuente: "sin respuesta",
      detalle: "El BCRA no respondió. La calculadora pide la TNA en vivo desde el navegador, así que el usuario sigue viendo el dato correcto salvo que el BCRA también esté caído para él.",
    };
  }

  const fuente = `${vivo.valor}% · ${vivo.fecha}`;

  if (!(vivo.valor >= BANDA_TNA.min && vivo.valor <= BANDA_TNA.max)) {
    return {
      ...base,
      severidad: "accion",
      fuente,
      detalle: `El BCRA devolvió ${vivo.valor}%, fuera de la banda de sanidad (${BANDA_TNA.min}–${BANDA_TNA.max}%). Puede ser un cambio de unidad o de shape de la API.`,
      accion: "Revisar a mano la serie 12 del BCRA antes de tocar nada. NO rotar el fallback a ciegas.",
    };
  }

  if (Math.abs(vivo.valor - servido.valor) / servido.valor > BANDA_TNA.saltoRelativoMax) {
    return {
      ...base,
      severidad: "accion",
      fuente,
      detalle: `Salto brusco: ${servido.valor}% → ${vivo.valor}% (>${BANDA_TNA.saltoRelativoMax * 100}% relativo). tools/rotar-tna.ts NO lo va a escribir solo, por diseño.`,
      accion: "Verificar contra el BCRA y, si el salto es real, rotar y deployar a mano.",
    };
  }

  if (vivo.fecha > servido.fechaISO) {
    return {
      ...base,
      severidad: "atencion",
      fuente,
      detalle: `El fallback horneado quedó viejo. Impacto acotado: solo se muestra cuando el BCRA no le responde al navegador del usuario, y siempre con su fecha a la vista.`,
      accion: "Se arregla solo en el próximo deploy (tools/rotar-tna.ts corre como paso 0).",
    };
  }

  return { ...base, severidad: "ok", fuente, detalle: "El fallback horneado está al día." };
}

export function compararIpc(
  servidoDefault: { mensualPct: number; periodo: string },
  servidaSerie: ReadonlyArray<readonly [string, number]>,
  vivo: IpcVivo | null,
): Hallazgo[] {
  const ultimoServido = servidaSerie[servidaSerie.length - 1]?.[0] ?? "(serie vacía)";
  const base = {
    dato: "IPC / INFLACION_DEFAULT",
    sirve: `serie hasta ${ultimoServido} · default ${servidoDefault.mensualPct}% (${servidoDefault.periodo})`,
  };

  if (!vivo) {
    return [{
      ...base,
      severidad: "atencion",
      fuente: "sin respuesta",
      detalle: "La API de series de tiempo del INDEC no respondió. No se puede afirmar nada sobre el IPC en esta corrida.",
    }];
  }

  const fuente = `serie hasta ${vivo.periodo} · índice ${vivo.indice}`;
  const mensualVivo = Math.round((vivo.indice / vivo.previo - 1) * 1000) / 10;

  if (!(mensualVivo >= BANDA_IPC.min && mensualVivo <= BANDA_IPC.max)) {
    return [{
      ...base,
      severidad: "accion",
      fuente,
      detalle: `La variación derivada da ${mensualVivo}%, fuera de la banda (${BANDA_IPC.min}–${BANDA_IPC.max}%). Huele a cambio de base de la serie.`,
      accion: "Revisar la serie 148.3_INIVELNAL_DICI_M_26 a mano antes de regenerar nada.",
    }];
  }

  if (vivo.periodo <= ultimoServido) {
    return [{ ...base, severidad: "ok", fuente, detalle: "La serie horneada llega al último período publicado." }];
  }

  const salto = Math.abs(mensualVivo - servidoDefault.mensualPct) > BANDA_IPC.saltoPpMax;

  return [{
    ...base,
    severidad: "accion",
    fuente,
    detalle:
      `El INDEC publicó ${periodoANombre(vivo.periodo)} (${mensualVivo}% mensual) y el sitio sirve la serie hasta ${ultimoServido}. ` +
      `Las páginas son estáticas: hasta que no se redeploye, el usuario ve el dato viejo.` +
      (salto ? ` OJO: salto de más de ${BANDA_IPC.saltoPpMax} p.p. contra el default guardado — verificar contra el informe del INDEC.` : ""),
    accion:
      "npx -y tsx calcular-ar/scripts/gen_ipc_serie.ts && npx -y tsx tools/rotar-inflacion.ts, después npx -y tsx tools/deploy-calcular.ts",
  }];
}

export function resumir(hallazgos: Hallazgo[]): { severidadMax: Severidad; linea: string } {
  const orden: Severidad[] = ["ok", "atencion", "accion"];
  const severidadMax = hallazgos.reduce<Severidad>(
    (max, h) => (orden.indexOf(h.severidad) > orden.indexOf(max) ? h.severidad : max),
    "ok",
  );
  const emoji = { ok: "🟢", atencion: "🟡", accion: "🔴" }[severidadMax];
  const accionables = hallazgos.filter((h) => h.severidad === "accion");
  const linea = accionables.length
    ? `${emoji} calcular.ar sirve datos viejos: ${accionables.map((h) => h.dato).join(", ")}`
    : `${emoji} calcular.ar al día contra BCRA e INDEC (${hallazgos.length} datos vivos chequeados)`;
  return { severidadMax, linea };
}
