import { segunTrato, type TextosUi } from "../../tipos";
import type { UiDividirGastos } from "../definicion";

export const textosEs: TextosUi<UiDividirGastos> = {
  slug: "dividir-gastos",
  ui: (trato) => ({
    persona: (n) => `Persona ${n}`,
    personaAyuda: segunTrato(trato, {
      tu: "Escribe cuánto pagó cada uno. Si alguien no pagó nada pero comparte el gasto, pon 0. Deja vacíos los que sobran.",
      usted: "Escriba cuánto pagó cada uno. Si alguien no pagó nada pero comparte el gasto, ponga 0. Deje vacíos los que sobran.",
      vos: "Escribí cuánto pagó cada uno. Si alguien no pagó nada pero comparte el gasto, poné 0. Dejá vacíos los que sobran.",
    }),
    total: "Gasto total",
    personas: "Personas",
    cuota: "Le toca a cada uno",
    transferencias: "Pagos para quedar a mano",
    tabla: "Quién le paga a quién",
    colDe: "Paga",
    colPara: "Recibe",
    colMonto: "Monto",
    errorPocas: "Hacen falta al menos dos personas para dividir un gasto.",
    aMano: "Están a mano: todos pusieron lo mismo.",
  }),
};
