import { pluralLt } from "../../../i18n/plural";
import type { TextosUi } from "../../tipos";
import type { UiFechaDeParto } from "../definicion";

export const textosLt: TextosUi<UiFechaDeParto> = {
  slug: "gimdymo-datos-skaiciuokle",
  ui: () => ({
    metodo: "Kurią datą žinote?",
    fum: "Paskutinių mėnesinių pirma diena",
    concepcion: "Pastojimo data",
    fecha: "Data",
    fechaAyuda: "Jei pasirinktos paskutinės mėnesinės, įveskite pirmą kraujavimo dieną.",
    ciclo: "Menstruacinio ciklo trukmė (dienomis)",
    cicloAyuda: "Naudojama tik su paskutinių mėnesinių data. Jei trukmės nežinote, palikite 28.",
    fpp: "Numatoma gimdymo data",
    edadGestacional: "Nėštumo savaitė šiandien",
    trimestre: "Trimestras",
    faltan: "Dienų iki gimdymo",
    fechaConcepcion: "Apytikslė pastojimo data",
    semanasYDias: (s, d) => `${pluralLt(s, "savaitė", "savaitės", "savaičių")}${d ? ` ir ${pluralLt(d, "diena", "dienos", "dienų")}` : ""}`,
    trimestres: ["Pirmas trimestras", "Antras trimestras", "Trečias trimestras"],
    errorFutura: "Data negali būti vėlesnė už šiandieną.",
    errorCiclo: "Ciklo trukmė turi būti nuo 20 iki 45 dienų.",
    notaPasada: "Nuo šios datos praėjo daugiau nei 42 savaitės, todėl nėštumo savaitės nerodome.",
    aviso: "Tai apytikslis įvertis: tiksliai numatytą dieną gimsta nedaug vaikų. Tiksliausią datą nustato echoskopija ir apsilankymai pas gydytoją ar akušerį.",
  }),
};
