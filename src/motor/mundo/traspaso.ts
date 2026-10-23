import { CLAVE_TRASPASO } from "./rutas";

export interface Traspaso {
  mercado: string;
  brutoMensual: number;
}

// STUB del contrato: el frente de datos completa la conversión de los campos de cada calculadora de
// sueldo neto a un bruto mensual. La firma no cambia.
export function guardarTraspaso(mercado: string, calculadora: string, crudos: Readonly<Record<string, unknown>>): void {
  void calculadora;
  void crudos;
  try {
    sessionStorage.setItem(CLAVE_TRASPASO, JSON.stringify({ mercado, brutoMensual: 0 }));
  } catch {}
}

export function leerTraspaso(): Traspaso | null {
  try {
    const crudo = sessionStorage.getItem(CLAVE_TRASPASO);
    if (!crudo) return null;
    const t = JSON.parse(crudo) as Traspaso;
    return typeof t.mercado === "string" && t.brutoMensual > 0 ? t : null;
  } catch {
    return null;
  }
}
