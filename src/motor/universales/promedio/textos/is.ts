import type { TextosUi } from "../../tipos";
import type { UiPromedio } from "../definicion";

export const textosIs: TextosUi<UiPromedio> = {
  slug: "medaltal",
  ui: () => ({
    nota: (n) => `Gildi ${n}`,
    notaAyuda: "Sláðu inn hverja einkunn eða gildi með vægi sínu. Skildu línur sem þú notar ekki eftir auðar.",
    peso: (n) => `Vægi ${n}`,
    pesoAyuda: "Það getur verið prósenta, einingar eða hve oft gildið telur. Án vægis telja öll gildi jafnt.",
    ponderado: "Vegið meðaltal",
    simple: "Venjulegt meðaltal",
    cantidad: "Fjöldi gilda",
    sumaPesos: "Samanlagt vægi",
    errorSinNotas: "Sláðu inn að minnsta kosti eitt gildi.",
    errorFaltaPeso: "Þetta gildi vantar vægi. Ef þú notar vægi þurfa öll gildi að hafa það.",
    errorFaltaNota: "Þetta vægi vantar gildi. Sláðu inn gildið eða fjarlægðu vægið.",
    errorPesosCero: "Samanlagt vægi er 0. Að minnsta kosti eitt þarf að vera stærra en 0.",
    sinPesos: "Án vægis er vegið meðaltal það sama og venjulegt meðaltal.",
  }),
};
