import { pluralSk } from "../../../i18n/plural";
import type { TextosUi } from "../../tipos";
import { duracionSk } from "../../dias-entre-fechas/textos/sk";
import type { UiEdad } from "../definicion";

export const textosSk: TextosUi<UiEdad> = {
  slug: "vypocet-veku",
  ui: () => ({
    nacimiento: "Dátum narodenia",
    referencia: "Vek k dátumu",
    referenciaAyuda: "Predvolene dnešný deň. Zmeňte dátum, ak chcete poznať vek k inému dňu.",
    edad: "Vek",
    anios: "Dovŕšené roky",
    totalMeses: "V mesiacoch",
    totalSemanas: "V týždňoch",
    totalDias: "V dňoch",
    proximo: "Najbližšie narodeniny",
    faltan: "Zostáva dní",
    cumplira: "Koľko rokov oslávi",
    duracion: duracionSk,
    errorFutura: "Dátum narodenia nemôže byť neskorší ako dátum, ku ktorému vek počítate.",
    cumpleHoy: (anios) => `Dnes sú narodeniny: je to presne ${pluralSk(anios, "rok", "roky", "rokov")}.`,
    nota29: "Kto sa narodil 29. februára, tomu v neprestupných rokoch počítame narodeniny 28. februára.",
  }),
};
