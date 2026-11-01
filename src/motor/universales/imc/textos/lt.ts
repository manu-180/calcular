import type { TextosUi } from "../../tipos";
import type { UiImc } from "../definicion";

export const textosLt: TextosUi<UiImc> = {
  slug: "kmi-skaiciuokle",
  ui: () => ({
    peso: (u) => `Svoris (${u})`,
    altura: (u) => `Ūgis (${u})`,
    pies: "Ūgis: pėdos (ft)",
    pulgadas: "Ūgis: coliai (in)",
    imc: "Kūno masės indeksas (KMI)",
    categoria: "Kategorija (PSO)",
    pesoMin: (u) => `Sveiko svorio apatinė riba (${u})`,
    pesoMax: (u) => `Sveiko svorio viršutinė riba (${u})`,
    rangoAyuda: "Svorio intervalas, kuriame, esant jūsų ūgiui, KMI išlieka normos ribose.",
    bajo: "Per mažas svoris",
    normal: "Normalus svoris",
    sobrepeso: "Antsvoris",
    obesidad1: "I laipsnio nutukimas",
    obesidad2: "II laipsnio nutukimas",
    obesidad3: "III laipsnio nutukimas",
    errorPeso: "Svoris turi būti didesnis už nulį.",
    errorAltura: "Ūgis turi būti didesnis už nulį.",
    aviso:
      "KMI yra bendras suaugusiųjų rodiklis: jis neskiria raumenų nuo riebalų, o nėščiosioms ir vaikams vertinamas kitaip. Jis neatstoja gydytojo konsultacijos.",
  }),
};
