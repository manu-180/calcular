import { validarCampos, type Campos } from "@/lib/formulario";

export type Pendiente = { path: string; titulo: string; resumen: string; campos: Campos; ts: number };

const CLAVE = "ca_calculo_pendiente";
const VIDA_MS = 2 * 60 * 60 * 1000;

// localStorage y no sessionStorage: el alta confirma el mail en otra pestaña (la abre el
// cliente de correo) y sessionStorage no cruza pestañas. La vida corta y el borrado al
// usarlo evitan que el cálculo quede dando vueltas en una compu compartida.
export function guardarPendiente(p: Omit<Pendiente, "ts">) {
  try {
    localStorage.setItem(CLAVE, JSON.stringify({ ...p, ts: Date.now() }));
  } catch {}
}

export function borrarPendiente() {
  try {
    localStorage.removeItem(CLAVE);
  } catch {}
}

export function leerPendiente(path: string): Pendiente | null {
  try {
    const crudo = localStorage.getItem(CLAVE);
    if (!crudo) return null;
    const p = JSON.parse(crudo) as Partial<Pendiente> | null;
    const vencido = !p || typeof p.ts !== "number" || Date.now() - p.ts > VIDA_MS;
    const campos = p ? validarCampos(p.campos) : null;
    if (vencido || !campos) {
      borrarPendiente();
      return null;
    }
    if (p!.path !== path) return null;
    return {
      path,
      titulo: typeof p!.titulo === "string" ? p!.titulo.slice(0, 80) : "",
      resumen: typeof p!.resumen === "string" ? p!.resumen.slice(0, 200) : "",
      campos,
      ts: p!.ts as number,
    };
  } catch {
    return null;
  }
}
