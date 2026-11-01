import type { TextosUi } from "../../tipos";
import type { UiFechaDeParto } from "../definicion";

export const textosEt: TextosUi<UiFechaDeParto> = {
  slug: "sunnitustahtaeg",
  ui: () => ({
    metodo: "Millist kuupäeva sa tead?",
    fum: "Viimase menstruatsiooni esimene päev",
    concepcion: "Viljastumise kuupäev",
    fecha: "Kuupäev",
    fechaAyuda: "Kui valisid viimase menstruatsiooni, sisesta vereerituse esimene päev.",
    ciclo: "Tsükli pikkus (päevades)",
    cicloAyuda: "Kasutatakse ainult koos viimase menstruatsiooniga. Kui sa ei tea, jäta väärtuseks 28.",
    fpp: "Sünnitustähtaeg",
    edadGestacional: "Rasedusnädal täna",
    trimestre: "Trimester",
    faltan: "Päevi jäänud",
    fechaConcepcion: "Eeldatav viljastumine",
    semanasYDias: (s, d) => {
      const nadalad = `${s} ${Number(s) === 1 ? "nädal" : "nädalat"}`;
      return d ? `${nadalad} ja ${d} ${Number(d) === 1 ? "päev" : "päeva"}` : nadalad;
    },
    trimestres: ["Esimene trimester", "Teine trimester", "Kolmas trimester"],
    errorFutura: "Kuupäev ei saa olla tänasest hilisem.",
    errorCiclo: "Tsükli pikkus peab olema 20-45 päeva.",
    notaPasada: "Kuupäevast on möödas üle 42 nädala, seega rasedusnädalat ei näidata.",
    aviso: "See on hinnang. Vähesed lapsed sünnivad täpselt tähtajal. Kõige täpsema kuupäeva annavad ultraheliuuring ja visiidid ämmaemanda juurde. Kalkulaator ei asenda ämmaemanda ega arsti hinnangut.",
  }),
};
