import type { TextosUi } from "../../tipos";
import type { UiPresupuesto } from "../definicion";

export const textosLt: TextosUi<UiPresupuesto> = {
  slug: "seimos-biudzetas",
  ui: () => ({
    ingreso: "Grynosios mėnesio pajamos",
    ingresoAyuda: "Kiek kas mėnesį gaunate į sąskaitą, sumokėjus mokesčius ir įmokas.",
    pctNecesidades: "Būtinos išlaidos (%)",
    pctNecesidadesAyuda: "Būstas, maistas, komunaliniai mokesčiai, transportas, sveikata ir privalomos skolų įmokos.",
    pctGustos: "Malonumai ir norai (%)",
    pctGustosAyuda: "Restoranai, nebūtini pirkiniai, prenumeratos, kelionės.",
    pctAhorro: "Santaupos (%)",
    pctAhorroAyuda: "Finansinis rezervas, tikslai, taupymas pensijai ir papildomos skolų įmokos.",
    necesidades: "Būtinoms išlaidoms",
    gustos: "Malonumams ir norams",
    ahorro: "Santaupoms",
    ahorroAnual: "Sutaupysite per metus",
    errorIngreso: "Įveskite savo mėnesio pajamas.",
    errorSuma: (suma) => `Visų trijų procentų suma yra ${suma} %. Ji turi būti lygi 100 %.`,
    observacionAhorroBajo: "Kai taupote mažiau nei 10 %, nenumatytoms išlaidoms lieka mažai atsargos. Jei galite, sumažinkite malonumų ir norų dalį.",
  }),
};
