import type { TextosUi } from "../../tipos";
import type { UiInteresCompuesto } from "../definicion";

export const textosEt: TextosUi<UiInteresCompuesto> = {
  slug: "liitintress",
  ui: () => ({
    capital: "Algsumma",
    aporte: "Igakuine sääst (valikuline)",
    aporteAyuda: "Summa, mille iga kuu sisse maksad. Sissemakse arvestatakse iga kuu lõpus.",
    tasa: "Aastane tootlus või intress (%)",
    anios: "Aastate arv",
    capitalizacion: "Intressi arvestamine",
    anual: "Kord aastas",
    semestral: "Kord poolaastas",
    trimestral: "Kord kvartalis",
    mensual: "Kord kuus",
    diaria: "Kord päevas",
    saldo: "Lõppsumma",
    aportado: "Sissemaksed kokku",
    intereses: "Intressid ja tootlus",
    tabla: "Muutus aasta aastalt",
    colAnio: "Aasta",
    colAportado: "Sissemaksed",
    colIntereses: "Intressid",
    colSaldo: "Saldo aasta lõpus",
    errorSinDinero: "Sisesta algsumma või igakuine sääst.",
    observacionIntereses: (porcentaje) => `Lõppsummast ${porcentaje}% on liitintress ja tootlus.`,
  }),
};
