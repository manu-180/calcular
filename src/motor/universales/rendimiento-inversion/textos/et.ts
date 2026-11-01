import type { TextosUi } from "../../tipos";
import type { UiRendimientoInversion } from "../definicion";

export const textosEt: TextosUi<UiRendimientoInversion> = {
  slug: "tootluse-kalkulaator",
  ui: () => ({
    inicial: "Investeeritud summa",
    final: "Lõppväärtus",
    finalAyuda: "Investeeringu praegune väärtus või summa, mille müües said.",
    cobrado: "Vahepeal saadud tulu (valikuline)",
    cobradoAyuda: "Dividendid, intressid või üür, mille said ja mida uuesti ei investeerinud.",
    anios: "Aastad",
    aniosAyuda: "Aasta osade jaoks võid kasutada kümnendkohti, näiteks 1,5 aastat.",
    ganancia: "Kasum",
    roi: "Kogutootlus (ROI)",
    cagr: "Aastatootlus (CAGR)",
    cagrAyuda: "Aastane tootlus, mis annab sama lõpptulemuse, kui see kasvab aastast aastasse liitintressina.",
    errorInicial: "Sisesta, kui palju alguses investeerisid.",
    observacionCorto: "Alla aasta pikkuse perioodi puhul venitab aastatootlus lühikese tulemuse nii, nagu see korduks terve aasta. Tõlgenda seda ettevaatlikult.",
    observacionInflacion: "Kui tahad teada, kas sinu ostujõud on kasvanud, võrdle aastatootlust sama perioodi inflatsiooniga.",
  }),
};
