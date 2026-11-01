import type { TextosUi } from "../../tipos";
import type { UiInteresCompuesto } from "../definicion";

export const textosLt: TextosUi<UiInteresCompuesto> = {
  slug: "sudetines-palukanos",
  ui: () => ({
    capital: "Pradinė suma",
    aporte: "Mėnesinė įmoka (neprivaloma)",
    aporteAyuda: "Kiek pridėsite kas mėnesį. Įmoka įskaitoma kiekvieno mėnesio pabaigoje.",
    tasa: "Metinė palūkanų norma (%)",
    anios: "Metų skaičius",
    capitalizacion: "Palūkanų priskaičiavimas",
    anual: "Kasmet",
    semestral: "Kas pusmetį",
    trimestral: "Kas ketvirtį",
    mensual: "Kas mėnesį",
    diaria: "Kasdien",
    saldo: "Galutinė suma",
    aportado: "Iš viso įmokėta",
    intereses: "Gautos palūkanos",
    tabla: "Augimas pagal metus",
    colAnio: "Metai",
    colAportado: "Įmokos",
    colIntereses: "Palūkanos",
    colSaldo: "Suma metų pabaigoje",
    errorSinDinero: "Įveskite pradinę sumą arba mėnesinę įmoką.",
    observacionIntereses: (porcentaje) => `${porcentaje} % galutinės sumos sudaro palūkanos.`,
  }),
};
