import type { TextosUi } from "../../tipos";
import type { UiPintura } from "../definicion";

const volumen = (u: string) => (u === "L" ? "litrais" : "galonais");

export const textosLt: TextosUi<UiPintura> = {
  slug: "dazu-skaiciuokle",
  ui: () => ({
    modo: "Kokius matmenis žinote?",
    modoMedidas: "Sienų ilgį ir aukštį",
    modoSuperficie: "Bendrą plotą",
    largo: (u) => `Bendras sienų ilgis (${u})`,
    largoAyuda: "Visos dažomos sienos kartu. Patalpos atveju tai perimetras.",
    alto: (u) => `Sienų aukštis (${u})`,
    superficie: (u) => `Dažomas plotas (${u})`,
    aberturas: (u) => `Atimamos durys ir langai (${u})`,
    aberturasAyuda: "Durys užima maždaug 2 m², įprastas langas nuo 1 iki 2 m².",
    manos: "Sluoksnių skaičius",
    rendimiento: (u) => `Dažų išeiga (${u})`,
    rendimientoAyuda: "Ją rasite ant pakuotės: kokį plotą padengia vienas sluoksnis. Jei nežinote, palikite siūlomą reikšmę.",
    recomendado: (u) => `Pirkti dažų (${volumen(u)})`,
    recomendadoAyuda: "Įskaitant 10 % atsargą pataisymams ir tam, kas lieka ant volelio.",
    necesario: (u) => `Tikslus kiekis (${volumen(u)})`,
    neta: (u) => `Dažomas plotas (${u})`,
    errorMedidas: "Įveskite sienų ilgį ir aukštį.",
    errorSuperficie: "Įveskite dažomą plotą.",
    errorAberturas: "Durys ir langai negali užimti visos sienos.",
    errorRendimiento: "Išeiga turi būti didesnė už 0.",
  }),
};
