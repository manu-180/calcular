import { enMapa, porcentaje } from "@/motor/calculo";
import type { Campo } from "@/motor/tipos";

type Mapa = Readonly<Record<string, number>>;

export const REQUIERE_APORTES = {
  "qa.social-insurance": "mapa",
  "qa.social-insurance-caps": "mapa",
} as const;

export const CAMPO_QATARI = {
  id: "qatari",
  tipo: "si-no",
  etiqueta: "You're a Qatari national insured with GRSIA",
  ayuda: "Social insurance contributions apply to Qatari employees. Expatriate workers don't pay them.",
  porDefecto: false,
} as const satisfies Campo;

// Ley 1/2022, art. 11 y 12: salario de cotización = básico + asignación social + asignación de vivienda
// (esta hasta el tope mensual), todo con el tope general.
export function salarioCotizacion(basico: number, social: number, vivienda: number, topes: Mapa) {
  const viviendaComputada = Math.min(vivienda, enMapa(topes, "housing-cap"));
  const sinTope = basico + social + viviendaComputada;
  const tope = enMapa(topes, "cap");
  return { base: Math.min(sinTope, tope), viviendaComputada, topeAplicado: sinTope > tope };
}

export function aportesGrsia(base: number, tasas: Mapa) {
  return {
    empleado: porcentaje(base, enMapa(tasas, "employee")),
    empleador: porcentaje(base, enMapa(tasas, "employer")),
  };
}
