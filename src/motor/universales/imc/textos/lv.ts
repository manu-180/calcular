import type { TextosUi } from "../../tipos";
import type { UiImc } from "../definicion";

export const textosLv: TextosUi<UiImc> = {
  slug: "kmi-kalkulators",
  ui: () => ({
    peso: (u) => `Svars (${u})`,
    altura: (u) => `Augums (${u})`,
    pies: "Augums: pēdas (ft)",
    pulgadas: "Augums: collas (in)",
    imc: "Ķermeņa masas indekss (ĶMI)",
    categoria: "Kategorija (PVO)",
    pesoMin: (u) => `Veselīga svara apakšējā robeža (${u})`,
    pesoMax: (u) => `Veselīga svara augšējā robeža (${u})`,
    rangoAyuda: "Svara intervāls, kurā pie jūsu auguma ĶMI paliek normas robežās.",
    bajo: "Nepietiekams svars",
    normal: "Normāls svars",
    sobrepeso: "Liekais svars",
    obesidad1: "I pakāpes aptaukošanās",
    obesidad2: "II pakāpes aptaukošanās",
    obesidad3: "III pakāpes aptaukošanās",
    errorPeso: "Svaram jābūt lielākam par nulli.",
    errorAltura: "Augumam jābūt lielākam par nulli.",
    aviso:
      "ĶMI ir vispārīgs pieaugušo rādītājs: tas neatšķir muskuļus no taukiem, bet grūtniecēm un bērniem to vērtē citādi. Tas neaizstāj ārsta konsultāciju.",
  }),
};
