import { grillaMundo } from "@/lib/mundo/grilla";
import type { GrillaMundo } from "@/motor/mundo/tipos";

const VACIA: GrillaMundo = { version: 1, generadoEl: "", fuentePpa: { organismo: "", indicador: "", url: "", consultadoEl: "", anio: 0 }, paises: [] };

// Sin países la página no existe (notFound) y la home no muestra la tarjeta. Nunca tira: un error acá
// no puede tumbar la home de un mercado.
export async function grillaPublicada(): Promise<GrillaMundo> {
  try {
    return grillaMundo();
  } catch (err) {
    console.error("[mundo] grillaPublicada", err);
    return VACIA;
  }
}
