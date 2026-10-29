import { aplicarEscalaMarginal, porcentaje } from "@/motor/calculo";
import type { FilaEscala } from "@/motor/tipos";

export const REQUIERE_IMPUESTO = {
  "np.income-tax-bands": "escala",
  "np.remote-area-allowance": "mapa",
  "np.life-insurance-cap": "numero",
  "np.health-insurance-cap": "numero",
  "np.house-insurance-cap": "numero",
  "np.retirement-deduction-cap": "numero",
  "np.retirement-deduction-share": "numero",
  "np.women-salary-rebate": "numero",
  "np.ssf-employee-rate": "numero",
  "np.ssf-provident-rate": "numero",
} as const;

export interface ValoresImpuesto {
  "np.income-tax-bands": readonly FilaEscala[];
  "np.remote-area-allowance": Readonly<Record<string, number>>;
  "np.life-insurance-cap": number;
  "np.health-insurance-cap": number;
  "np.house-insurance-cap": number;
  "np.retirement-deduction-cap": number;
  "np.retirement-deduction-share": number;
  "np.women-salary-rebate": number;
  "np.ssf-employee-rate": number;
  "np.ssf-provident-rate": number;
}

export interface EntradaImpuesto {
  ingresoAnual: number;
  // Afiliado al SSF: los aportes salen del sueldo básico mensual. Si no, es lo que declara la persona.
  ssf: boolean;
  basicoMensual: number;
  aporteRetiroAnual: number;
  remota: string;
  seguroVida: number;
  seguroSalud: number;
  seguroCasa: number;
  mujer: boolean;
}

export interface ResultadoImpuesto {
  aporteSsfAnual: number;
  retiro: number;
  seguros: number;
  remota: number;
  gravable: number;
  impuestoBruto: number;
  rebaja: number;
  impuesto: number;
  marginal: number;
}

// Tarifa del año de renta 2083/84 (Income Tax Act 2058, anexo 1): la banda del 1 % no se cobra a quien aporta al SSF ni a un fondo
// de retiro. La deducción por aportes al retiro es el menor entre el tope y un tercio del ingreso.
export function impuestoAnual(e: EntradaImpuesto, v: ValoresImpuesto, redondear: (n: number) => number): ResultadoImpuesto {
  const bandas = v["np.income-tax-bands"];
  const aporteSsfAnual = e.ssf ? redondear(porcentaje(e.basicoMensual, v["np.ssf-employee-rate"]) * 12) : 0;
  const aporteRetiro = e.ssf ? redondear(porcentaje(e.basicoMensual, v["np.ssf-provident-rate"]) * 12) : e.aporteRetiroAnual;
  const retiro = redondear(Math.min(aporteRetiro, v["np.retirement-deduction-cap"], porcentaje(e.ingresoAnual, v["np.retirement-deduction-share"])));
  const seguros = redondear(
    Math.min(e.seguroVida, v["np.life-insurance-cap"]) + Math.min(e.seguroSalud, v["np.health-insurance-cap"]) + Math.min(e.seguroCasa, v["np.house-insurance-cap"]),
  );
  const remota = e.remota === "none" ? 0 : (v["np.remote-area-allowance"][e.remota] ?? 0);
  const gravable = redondear(Math.max(0, e.ingresoAnual - retiro - seguros - remota));
  const exentoPrimera = e.ssf || aporteRetiro > 0;
  const primera = bandas[0];
  const descuentoPrimera = exentoPrimera ? porcentaje(Math.min(gravable, primera.hasta ?? gravable), primera.tasa) : 0;
  const impuestoBruto = redondear(aplicarEscalaMarginal(bandas, gravable) - descuentoPrimera);
  const rebaja = e.mujer ? redondear(porcentaje(impuestoBruto, v["np.women-salary-rebate"])) : 0;
  let marginal = 0;
  for (const f of bandas) {
    if (gravable > f.desde) marginal = f === primera && exentoPrimera ? 0 : f.tasa;
  }
  return { aporteSsfAnual, retiro, seguros, remota, gravable, impuestoBruto, rebaja, impuesto: redondear(impuestoBruto - rebaja), marginal };
}

export const npr = (n: number): string => `NPR ${n.toLocaleString("en-NP", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
