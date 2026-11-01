import type { TextosUi } from "../../tipos";
import type { UiHormigon } from "../definicion";

export const textosRo: TextosUi<UiHormigon> = {
  slug: "calculator-beton",
  ui: () => ({
    largo: (u) => `Lungime (${u})`,
    ancho: (u) => `Lățime (${u})`,
    espesor: (u) => `Grosime (${u})`,
    espesorAyuda: "O terasă sau o alee are de obicei 10 cm. O platformă pentru mașină, între 12 și 15 cm.",
    margen: "Rezervă suplimentară (%)",
    margenAyuda: "Pentru teren denivelat și pierderi. De obicei între 5% și 10%.",
    bolsa: (u) => `Greutatea sacului de ciment (${u})`,
    volumen: (u) => `Volum exact (${u})`,
    volumenTotal: (u) => `Beton necesar (${u})`,
    volumenPies: "Beton necesar (ft³)",
    cemento: (u) => `Ciment (${u})`,
    bolsas: "Saci de ciment",
    arena: (u) => `Nisip (${u})`,
    piedra: (u) => `Pietriș (${u})`,
    agua: (u) => (u === "L" ? "Apă (litri)" : "Apă (galoane)"),
    errorMedida: "Această dimensiune trebuie să fie mai mare decât 0.",
    aviso: "Materialele sunt orientative, pentru un beton obișnuit 1:2:3 (circa 350 kg de ciment pe m³). Se schimbă după rețetă, lucrare și materialele locale: verificați-le cu cel care conduce lucrarea.",
  }),
};
