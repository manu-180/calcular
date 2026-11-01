import type { TextosUi } from "../../tipos";
import type { UiInteresCompuesto } from "../definicion";

export const textosSq: TextosUi<UiInteresCompuesto> = {
  slug: "kalkulator-interes-i-perbere",
  ui: () => ({
    capital: "Shuma fillestare",
    aporte: "Depozitim mujor (opsional)",
    aporteAyuda: "Sa do të shtonit çdo muaj. Shtohet në fund të çdo muaji.",
    tasa: "Interesi vjetor (%)",
    anios: "Vite",
    capitalizacion: "Kapitalizimi",
    anual: "Vjetor",
    semestral: "Gjashtëmujor",
    trimestral: "Tremujor",
    mensual: "Mujor",
    diaria: "Ditor",
    saldo: "Teprica përfundimtare",
    aportado: "Totali i depozituar",
    intereses: "Interesi i fituar",
    tabla: "Rritja vit pas viti",
    colAnio: "Viti",
    colAportado: "Depozitimet",
    colIntereses: "Interesi",
    colSaldo: "Teprica në fund të vitit",
    errorSinDinero: "Vendosni një shumë fillestare ose një depozitim mujor.",
    observacionIntereses: (porcentaje) => `${porcentaje}% e tepricës përfundimtare është interes.`,
  }),
};
