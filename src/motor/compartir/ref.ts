const CLAVE_VARIANTE = "cy-ab-puente";
const ALFABETO = "abcdefghijklmnopqrstuvwxyz0123456789";

// /api/e (src/app/api/e/protocolo.ts) valida contra estas mismas constantes: si cambian acá, cambia allá.
export const REF_VALIDO = /^[a-z0-9]{6,12}$/;
export const ORIGENES_COMPARTIR = ["calculadora", "mundo", "duelo", "ranking", "horas", "sueldos", "calendario"] as const;
export type OrigenCompartir = (typeof ORIGENES_COMPARTIR)[number];
const CORTOS: Readonly<Record<OrigenCompartir, string>> = { calculadora: "c", mundo: "m", duelo: "d", ranking: "r", horas: "h", sueldos: "s", calendario: "k" };
export const ORIGENES_CORTOS: readonly string[] = Object.values(CORTOS);
export const VARIANTES_PUENTE = ["con", "sin"] as const;

export type VariantePuente = (typeof VARIANTES_PUENTE)[number];

let varianteEfimera: VariantePuente | "" = "";

function aleatorio(n: number): string {
  const bytes = new Uint8Array(n);
  if (globalThis.crypto?.getRandomValues) globalThis.crypto.getRandomValues(bytes);
  else for (let i = 0; i < n; i++) bytes[i] = Math.floor(Math.random() * 256);
  return Array.from(bytes, (b) => ALFABETO[b % ALFABETO.length]).join("");
}

// Uno nuevo por cada compartido y no se guarda en ningún lado: viaja en una URL que otros ven y
// reenvían, así que no puede ser un seudónimo de quien comparte. El evento `compartir` lleva el mismo
// código que la `llegada` que trae ese link, y así se cuenta qué compartido trajo gente. Las llegadas
// de quien abre su propio link se separan en la base comparando el vid de los dos eventos.
export function codigoCompartido(): string {
  return aleatorio(8);
}

// «calculadora:mx.sueldo-neto» → «c». El origen viaja corto para que el link compartido siga siendo
// corto. Un origen fuera de la lista no viaja: /api/e descartaría la llegada.
export function origenCorto(origen: string): string | null {
  const tipo = origen.split(":")[0].toLowerCase();
  return (ORIGENES_COMPARTIR as readonly string[]).includes(tipo) ? CORTOS[tipo as OrigenCompartir] : null;
}

// 50 / 50 estable por persona. La variante «sin» no ve la línea-puente: sirve de control para saber
// si la línea baja el uso de la calculadora. Va en localStorage porque es una preferencia de cómo se
// ve el sitio, no un dato de la persona, y nunca sale del navegador más que como «con» o «sin» (lo
// cuenta la política de privacidad, src/motor/i18n/legales). Sin localStorage dura lo que la pestaña.
export function variantePuente(): VariantePuente {
  let guardada = "";
  try {
    guardada = localStorage.getItem(CLAVE_VARIANTE) ?? "";
  } catch {}
  if (guardada === "con" || guardada === "sin") return guardada;
  if (varianteEfimera) return varianteEfimera;
  const nueva: VariantePuente = Math.random() < 0.5 ? "con" : "sin";
  varianteEfimera = nueva;
  try {
    localStorage.setItem(CLAVE_VARIANTE, nueva);
  } catch {}
  return nueva;
}
