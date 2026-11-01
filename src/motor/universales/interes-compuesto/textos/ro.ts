import type { TextosUi } from "../../tipos";
import type { UiInteresCompuesto } from "../definicion";

export const textosRo: TextosUi<UiInteresCompuesto> = {
  slug: "calculator-dobanda-compusa",
  ui: () => ({
    capital: "Suma inițială",
    aporte: "Depunere lunară (opțional)",
    aporteAyuda: "Cât ați adăuga în fiecare lună. Se adaugă la sfârșitul fiecărei luni.",
    tasa: "Dobânda anuală (%)",
    anios: "Ani",
    capitalizacion: "Capitalizare",
    anual: "Anuală",
    semestral: "Semestrială",
    trimestral: "Trimestrială",
    mensual: "Lunară",
    diaria: "Zilnică",
    saldo: "Sold final",
    aportado: "Total depus",
    intereses: "Dobândă câștigată",
    tabla: "Creșterea an cu an",
    colAnio: "Anul",
    colAportado: "Depuneri",
    colIntereses: "Dobândă",
    colSaldo: "Sold la final de an",
    errorSinDinero: "Introduceți o sumă inițială sau o depunere lunară.",
    observacionIntereses: (porcentaje) => `${porcentaje}% din soldul final este dobândă.`,
  }),
};
