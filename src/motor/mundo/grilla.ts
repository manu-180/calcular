import "server-only";
import type { GrillaMundo } from "./tipos";

// STUB del contrato: el frente de datos lo reemplaza por la grilla real (registro + calcular.ar + PPA
// del Banco Mundial). La firma no cambia.
export function grillaMundo(): GrillaMundo {
  return {
    version: 1,
    generadoEl: "2026-10-23",
    fuentePpa: { organismo: "Banco Mundial", indicador: "PA.NUS.PRVT.PP", url: "https://data.worldbank.org/indicator/PA.NUS.PRVT.PP", consultadoEl: "2026-10-23" },
    paises: [],
  };
}
