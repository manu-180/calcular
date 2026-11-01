import type { TextosUi } from "../../tipos";
import type { UiPromedio } from "../definicion";

export const textosEt: TextosUi<UiPromedio> = {
  slug: "kaalutud-keskmine",
  ui: () => ({
    nota: (n) => `Väärtus ${n}`,
    notaAyuda: "Sisesta iga hinne või väärtus ja selle kaal. Kasutamata read jäta tühjaks.",
    peso: (n) => `Kaal ${n}`,
    pesoAyuda: "Kaal võib olla protsent, ainepunktid või see, mitu korda väärtust arvestatakse. Ilma kaaludeta on kõigil väärtustel sama kaal.",
    ponderado: "Kaalutud keskmine",
    simple: "Tavaline keskmine",
    cantidad: "Väärtuste arv",
    sumaPesos: "Kaalude summa",
    errorSinNotas: "Sisesta vähemalt üks väärtus.",
    errorFaltaPeso: "Sellel väärtusel puudub kaal. Kui kasutad kaale, peab kaal olema igal väärtusel.",
    errorFaltaNota: "Sellel kaalul puudub väärtus. Sisesta väärtus või kustuta kaal.",
    errorPesosCero: "Kaalude summa on 0. Vähemalt üks kaal peab olema nullist suurem.",
    sinPesos: "Ilma kaaludeta on kaalutud keskmine sama mis tavaline keskmine.",
  }),
};
