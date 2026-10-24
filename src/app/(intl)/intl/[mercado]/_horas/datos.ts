import { indiceHoras } from "@/lib/horas/indice";
import type { IndiceHoras } from "@/motor/horas/tipos";

const VACIO: IndiceHoras = { version: 1, generadoEl: "", preciosActualizadosEl: "", filas: [] };

// Sin países la página no existe (notFound). Nunca tira: un error acá no puede tumbar una edición.
export async function indicePublicado(): Promise<IndiceHoras> {
  try {
    return indiceHoras();
  } catch (err) {
    console.error("[horas] indicePublicado", err);
    return VACIO;
  }
}
