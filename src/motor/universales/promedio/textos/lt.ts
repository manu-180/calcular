import type { TextosUi } from "../../tipos";
import type { UiPromedio } from "../definicion";

export const textosLt: TextosUi<UiPromedio> = {
  slug: "svertinis-vidurkis",
  ui: () => ({
    nota: (n) => `Pažymys ${n}`,
    notaAyuda: "Įveskite kiekvieną pažymį ar reikšmę ir jos svorį. Nenaudojamas eilutes palikite tuščias.",
    peso: (n) => `Svoris ${n}`,
    pesoAyuda: "Tai gali būti procentas, kreditų skaičius arba tai, kiek kartų reikšmė skaičiuojama. Be svorių visos reikšmės vertinamos vienodai.",
    ponderado: "Svertinis vidurkis",
    simple: "Paprastasis vidurkis",
    cantidad: "Reikšmių skaičius",
    sumaPesos: "Svorių suma",
    errorSinNotas: "Įveskite bent vieną reikšmę.",
    errorFaltaPeso: "Šiai reikšmei trūksta svorio. Jei naudojate svorius, nurodykite juos visoms reikšmėms.",
    errorFaltaNota: "Šiam svoriui trūksta reikšmės. Įveskite reikšmę arba ištrinkite svorį.",
    errorPesosCero: "Svorių suma lygi 0: bent vienas svoris turi būti didesnis už nulį.",
    sinPesos: "Be svorių svertinis vidurkis sutampa su paprastuoju.",
  }),
};
