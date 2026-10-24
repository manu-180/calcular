import { indiceHoras } from "@/lib/horas/indice";
import { publicacionDe, SIN_HORAS, type PublicacionHoras } from "@/motor/horas/publicacion";
import type { IndiceHoras } from "@/motor/horas/tipos";

const VACIO: IndiceHoras = { version: 1, generadoEl: "", preciosActualizadosEl: "", filas: [] };

// Lo que no se publica (publicacionDe) es 404, igual que en el sitemap. Nunca tira: un error acá no
// puede tumbar una edición.
export async function indicePublicado(): Promise<{ indice: IndiceHoras; publicacion: PublicacionHoras }> {
  try {
    const indice = indiceHoras();
    return { indice, publicacion: publicacionDe(indice) };
  } catch (err) {
    console.error("[horas] indicePublicado", err);
    return { indice: VACIO, publicacion: SIN_HORAS };
  }
}
