import { pluralSl } from "../../../i18n/plural";
import type { TextosUi } from "../../tipos";
import type { UiFechaDeParto } from "../definicion";

export const textosSl: TextosUi<UiFechaDeParto> = {
  slug: "izracun-datuma-poroda",
  ui: () => ({
    metodo: "Kateri datum poznate?",
    fum: "Prvi dan zadnje menstruacije",
    concepcion: "Datum spočetja",
    fecha: "Datum",
    fechaAyuda: "Če ste izbrali zadnjo menstruacijo, vnesite prvi dan krvavitve.",
    ciclo: "Dolžina menstrualnega cikla (dnevi)",
    cicloAyuda: "Upošteva se samo pri datumu zadnje menstruacije. Če dolžine ne poznate, pustite 28.",
    fpp: "Pričakovani datum poroda",
    edadGestacional: "Teden nosečnosti danes",
    trimestre: "Trimesečje",
    faltan: "Dnevi do poroda",
    fechaConcepcion: "Približni datum spočetja",
    semanasYDias: (s, d) => `${pluralSl(s, "teden", "tedna", "tedni", "tednov")}${d ? ` in ${pluralSl(d, "dan", "dneva", "dni", "dni")}` : ""}`,
    trimestres: ["Prvo trimesečje", "Drugo trimesečje", "Tretje trimesečje"],
    errorFutura: "Datum ne sme biti poznejši od današnjega.",
    errorCiclo: "Dolžina cikla mora biti od 20 do 45 dni.",
    notaPasada: "Od tega datuma je minilo več kot 42 tednov, zato tedna nosečnosti ne prikazujemo.",
    aviso:
      "To je ocena: točno na pričakovani dan se rodi malo otrok. Najbolj natančen datum določijo ultrazvok in pregledi pri ginekologu ali babici.",
  }),
};
