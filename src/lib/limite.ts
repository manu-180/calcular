import "server-only";
import { createHash } from "node:crypto";
import { servicio } from "@/lib/supabase/servicio";

const TIMEOUT_MS = 1500;

// La clave suele llevar una IP o un mail: a la base llega sólo el prefijo legible
// ("login:") y un hash del resto, así ca_limites no guarda datos personales.
function claveSegura(clave: string): string {
  const corte = clave.indexOf(":");
  const prefijo = corte > 0 && corte <= 40 ? clave.slice(0, corte + 1) : "";
  const resto = prefijo ? clave.slice(corte + 1) : clave;
  return prefijo + createHash("sha256").update(resto).digest("base64url");
}

// Falla abierta: si la base no responde, el límite deja pasar. Un rate limit caído no puede
// tumbar el login ni el cobro; el error queda en el log para verlo.
export async function permitido(clave: string, max: number, ventanaSeg: number): Promise<boolean> {
  try {
    const { data, error } = await servicio()
      .rpc("ca_limite", {
        p_clave: claveSegura(clave),
        p_max: Math.max(0, Math.floor(max)),
        p_ventana_seg: Math.max(1, Math.floor(ventanaSeg)),
      })
      .abortSignal(AbortSignal.timeout(TIMEOUT_MS));
    if (error) {
      console.error("[limite] ca_limite falló, se deja pasar:", error.message);
      return true;
    }
    return data !== false;
  } catch (e) {
    console.error("[limite] ca_limite no respondió, se deja pasar:", e instanceof Error ? e.message : e);
    return true;
  }
}
