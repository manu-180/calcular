const CLAVE_CODIGO = "cy-ref";
const CLAVE_VARIANTE = "cy-ab-puente";
const ALFABETO = "abcdefghijklmnopqrstuvwxyz0123456789";

export const REF_VALIDO = /^[a-z0-9]{6,12}$/;
export const ORIGEN_VALIDO = /^[a-z0-9]{1,6}$/;

export type VariantePuente = "con" | "sin";

// Sin localStorage (modo privado, bloqueado) el código y la variante viven lo que dura la pestaña:
// la persona no cambia de variante a mitad de la sesión y un compartido sigue llevando un ref.
let codigoEfimero = "";
let varianteEfimera: VariantePuente | "" = "";

function leer(clave: string): string {
  try {
    return localStorage.getItem(clave) ?? "";
  } catch {
    return "";
  }
}

function escribir(clave: string, valor: string): void {
  try {
    localStorage.setItem(clave, valor);
  } catch {}
}

function aleatorio(n: number): string {
  const bytes = new Uint8Array(n);
  if (globalThis.crypto?.getRandomValues) globalThis.crypto.getRandomValues(bytes);
  else for (let i = 0; i < n; i++) bytes[i] = Math.floor(Math.random() * 256);
  return Array.from(bytes, (b) => ALFABETO[b % ALFABETO.length]).join("");
}

// El código que identifica a quien comparte. No es el id de visitante de la medición (ca_vid): ese no
// puede viajar en una URL que otros ven y reenvían.
export function leerCodigoPropio(): string {
  const guardado = leer(CLAVE_CODIGO);
  return REF_VALIDO.test(guardado) ? guardado : codigoEfimero;
}

export function codigoPropio(): string {
  const actual = leerCodigoPropio();
  if (actual) return actual;
  codigoEfimero = aleatorio(8);
  escribir(CLAVE_CODIGO, codigoEfimero);
  return codigoEfimero;
}

// «calculadora:mx.sueldo-neto» → «c». El origen viaja corto para que el link compartido siga siendo corto.
const ORIGENES: Readonly<Record<string, string>> = { calculadora: "c", mundo: "m", duelo: "d" };

export function origenCorto(origen: string): string {
  const tipo = origen.split(":")[0].toLowerCase();
  return ORIGENES[tipo] ?? tipo.replace(/[^a-z0-9]/g, "").slice(0, 3);
}

// 50 / 50 estable por persona. La variante «sin» no ve la línea-puente: sirve de control para saber
// si la línea baja el uso de la calculadora.
export function variantePuente(): VariantePuente {
  const guardada = leer(CLAVE_VARIANTE);
  if (guardada === "con" || guardada === "sin") return guardada;
  if (varianteEfimera) return varianteEfimera;
  const nueva: VariantePuente = Math.random() < 0.5 ? "con" : "sin";
  varianteEfimera = nueva;
  escribir(CLAVE_VARIANTE, nueva);
  return nueva;
}
