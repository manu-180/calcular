import type { TextosUi } from "../../tipos";
import type { UiInteresCompuesto } from "../definicion";

export const textosIs: TextosUi<UiInteresCompuesto> = {
  slug: "vaxtavextir",
  ui: () => ({
    capital: "Upphafsupphæð",
    aporte: "Mánaðarlegur sparnaður (valfrjálst)",
    aporteAyuda: "Það sem þú leggur inn í hverjum mánuði. Innborgunin er reiknuð í lok hvers mánaðar.",
    tasa: "Árleg ávöxtun eða vextir (%)",
    anios: "Fjöldi ára",
    capitalizacion: "Hve oft vextir leggjast við",
    anual: "Árlega",
    semestral: "Á hálfs árs fresti",
    trimestral: "Ársfjórðungslega",
    mensual: "Mánaðarlega",
    diaria: "Daglega",
    saldo: "Lokaupphæð",
    aportado: "Lagt inn samtals",
    intereses: "Vextir og ávöxtun",
    tabla: "Þróun ár fyrir ár",
    colAnio: "Ár",
    colAportado: "Innborganir",
    colIntereses: "Vextir",
    colSaldo: "Staða í árslok",
    errorSinDinero: "Sláðu inn upphafsupphæð eða mánaðarlegan sparnað.",
    observacionIntereses: (porcentaje) => `${porcentaje}% af lokaupphæðinni eru vaxtavextir og ávöxtun.`,
  }),
};
