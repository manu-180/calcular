import "server-only";
import type { GrillaMundo } from "@/motor/mundo/tipos";
import { grillaDePrueba } from "@/motor/mundo/ui/fixture-dev";

// PROVISORIO de la rama de la página: lo reemplaza el frente de datos (claude/plaga-datos) con la
// grilla real. Mientras tanto, la de prueba solo en `next dev`; en cualquier build, vacía.
export function grillaMundo(): GrillaMundo {
  if (process.env.NODE_ENV === "development") return grillaDePrueba();
  return {
    version: 1,
    generadoEl: "",
    fuentePpa: { organismo: "Banco Mundial", indicador: "PA.NUS.PRVT.PP", url: "https://data.worldbank.org/indicator/PA.NUS.PRVT.PP", consultadoEl: "2026-10-23" },
    paises: [],
  };
}
