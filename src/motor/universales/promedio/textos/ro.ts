import type { TextosUi } from "../../tipos";
import type { UiPromedio } from "../definicion";

export const textosRo: TextosUi<UiPromedio> = {
  slug: "calculator-medie",
  ui: () => ({
    nota: (n) => `Nota ${n}`,
    notaAyuda: "Introduceți fiecare notă sau valoare cu ponderea ei. Rândurile nefolosite rămân goale.",
    peso: (n) => `Ponderea ${n}`,
    pesoAyuda: "Poate fi un procent, numărul de credite sau de câte ori contează. Fără ponderi, toate valorile contează la fel.",
    ponderado: "Media ponderată",
    simple: "Media aritmetică",
    cantidad: "Număr de valori",
    sumaPesos: "Suma ponderilor",
    errorSinNotas: "Introduceți cel puțin o valoare.",
    errorFaltaPeso: "Această valoare nu are pondere. Dacă folosiți ponderi, completați-le pentru toate valorile.",
    errorFaltaNota: "Această pondere nu are valoare. Completați valoarea sau ștergeți ponderea.",
    errorPesosCero: "Suma ponderilor este 0: cel puțin una trebuie să fie mai mare decât zero.",
    sinPesos: "Fără ponderi, media ponderată este egală cu media aritmetică.",
  }),
};
