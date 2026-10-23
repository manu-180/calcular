import { grillaMundo } from "@/lib/mundo/grilla";
import type { GrillaMundo } from "@/motor/mundo/tipos";

// Sin países la página no existe (notFound) y la home no muestra la tarjeta.
export async function grillaPublicada(): Promise<GrillaMundo> {
  return grillaMundo();
}
