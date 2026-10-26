import { enMapa, porcentaje } from "@/motor/calculo";
import type { Campo } from "@/motor/tipos";

type Mapa = Readonly<Record<string, number>>;

export const REQUIERE_GOSI = {
  "sa.gosi-pension-legacy": "mapa",
  "sa.gosi-pension-new": "mapa",
  "sa.gosi-saned": "mapa",
  "sa.gosi-hazards": "numero",
  "sa.gosi-cap": "numero",
} as const;

export const CAMPO_NACIONALIDAD = {
  id: "nacionalidad",
  tipo: "opcion",
  etiqueta: "الجنسية",
  opciones: [
    { valor: "saudi", etiqueta: "سعودي" },
    { valor: "non-saudi", etiqueta: "غير سعودي" },
  ],
  porDefecto: "saudi",
} as const satisfies Campo;

// El sistema nuevo (1445هـ) alcanza a quien entró a trabajar desde el 3 de julio de 2024 sin meses de
// aporte anteriores; los demás siguen con el 9 % de siempre (GOSI, plataforma de concientización).
export const CAMPO_REGIMEN = {
  id: "regimen",
  tipo: "opcion",
  etiqueta: "نظام الاشتراك في فرع المعاشات",
  ayuda: "النظام الجديد يشمل من التحق بالعمل منذ 3 يوليو 2024 وليس له أي مدة اشتراك سابقة. إذا كانت لك مدد اشتراك قبل ذلك فأنت على النظام السابق.",
  opciones: [
    { valor: "legacy", etiqueta: "لي مدد اشتراك قبل 3 يوليو 2024" },
    { valor: "new", etiqueta: "النظام الجديد (أول اشتراك منذ 3 يوليو 2024)" },
  ],
  porDefecto: "legacy",
  visibleSi: { nacionalidad: ["saudi"] },
} as const satisfies Campo;

export interface TablasGosi {
  readonly "sa.gosi-pension-legacy": Mapa;
  readonly "sa.gosi-pension-new": Mapa;
  readonly "sa.gosi-saned": Mapa;
  readonly "sa.gosi-hazards": number;
  readonly "sa.gosi-cap": number;
}

export interface AportesGosi {
  base: number;
  topeAplicado: boolean;
  pensionEmpleado: number;
  pensionEmpleador: number;
  sanedEmpleado: number;
  sanedEmpleador: number;
  riesgos: number;
  empleado: number;
  empleador: number;
  tasaPension: number;
}

// Base de aporte: sueldo básico más el subsidio de vivienda (GOSI), con el tope mensual. El extranjero
// solo aporta al ramo de riesgos laborales, a cargo del empleador; pensión y ساند son para saudíes.
export function aportesGosi(basico: number, vivienda: number, saudi: boolean, regimen: string | null, t: TablasGosi): AportesGosi {
  const bruta = basico + vivienda;
  const tope = t["sa.gosi-cap"];
  const base = Math.min(bruta, tope);
  const tablaPension = regimen === "new" ? t["sa.gosi-pension-new"] : t["sa.gosi-pension-legacy"];
  const tasaPension = saudi ? enMapa(tablaPension, "employee") : 0;
  const pensionEmpleado = saudi ? porcentaje(base, enMapa(tablaPension, "employee")) : 0;
  const pensionEmpleador = saudi ? porcentaje(base, enMapa(tablaPension, "employer")) : 0;
  const sanedEmpleado = saudi ? porcentaje(base, enMapa(t["sa.gosi-saned"], "employee")) : 0;
  const sanedEmpleador = saudi ? porcentaje(base, enMapa(t["sa.gosi-saned"], "employer")) : 0;
  const riesgos = porcentaje(base, t["sa.gosi-hazards"]);
  return {
    base,
    topeAplicado: bruta > tope,
    pensionEmpleado,
    pensionEmpleador,
    sanedEmpleado,
    sanedEmpleador,
    riesgos,
    empleado: pensionEmpleado + sanedEmpleado,
    empleador: pensionEmpleador + sanedEmpleador + riesgos,
    tasaPension,
  };
}
