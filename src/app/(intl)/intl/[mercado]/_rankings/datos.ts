import type { GrillaMundo } from "@/motor/mundo/tipos";
import { FOTOS } from "@/motor/rankings/historial/indice";
import type { IdRanking } from "@/motor/rankings/rutas";
import { vistasDeRankings, type VistaRanking } from "@/motor/rankings/vista";
import { origenAR } from "@/motor/sitio";
import type { CodigoMercado, Idioma } from "@/motor/tipos";
import { contextoSitio, type ContextoSitio } from "@/motor/ui/contexto";
import { hoyEn } from "@/motor/vigencia";
import { registro } from "@/paises";
import { grillaPublicada } from "../_mundo/datos";

// Un ranking existe en una edición si su idioma es el de la carpeta y la grilla tiene países. Con la
// grilla vacía (falló al armarse) todo da null: la página es 404 y nada tira, ni en el build.

export interface Resuelto {
  ctx: ContextoSitio;
  grilla: GrillaMundo;
  vistas: VistaRanking[];
}

export async function resolverRankings(idioma: Idioma, mercado: string): Promise<Resuelto | null> {
  try {
    const ctx = contextoSitio(registro, mercado as CodigoMercado);
    if (!ctx || ctx.mercado.idioma !== idioma) return null;
    const grilla = await grillaPublicada();
    if (!grilla.paises.length) return null;
    const hoy = ctx.mercado.codigo === "global" ? hoyEn({ zonaHoraria: "UTC" }) : ctx.fecha;
    const vistas = vistasDeRankings({ grilla, mercado: ctx.mercado, origenAR: origenAR(), fotos: FOTOS, hoy });
    return vistas.length ? { ctx, grilla, vistas } : null;
  } catch (err) {
    console.error("[rankings] no se pudo armar la página", err);
    return null;
  }
}

export async function resolverRanking(idioma: Idioma, mercado: string, id: IdRanking): Promise<(Resuelto & { vista: VistaRanking }) | null> {
  const r = await resolverRankings(idioma, mercado);
  const vista = r?.vistas.find((v) => v.id === id);
  return r && vista ? { ...r, vista } : null;
}

