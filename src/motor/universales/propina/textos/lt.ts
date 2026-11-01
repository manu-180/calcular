import type { TextosUi } from "../../tipos";
import type { UiPropina } from "../definicion";

export const textosLt: TextosUi<UiPropina> = {
  slug: "arbatpinigiu-skaiciuokle",
  ui: () => ({
    cuenta: "Sąskaitos suma",
    porcentaje: "Arbatpinigiai (%)",
    porcentajeAyuda: "Papročiai skiriasi pagal šalį ir įstaigą. Pasirinkite tai, kas jums atrodo tinkama.",
    personas: "Mokančių žmonių skaičius",
    redondear: "Suapvalinti kiekvieno dalį į didesnę pusę",
    redondearAyuda: "Kad kiekvienas mokėtų sveiką sumą. Skirtumas atitenka arbatpinigiams.",
    propina: "Arbatpinigiai",
    total: "Iš viso su arbatpinigiais",
    porPersona: "Kiekvienas moka",
    propinaEfectiva: "Arbatpinigiai po suapvalinimo",
    errorPersonas: "Mokėti turi bent vienas žmogus.",
    observacionRedondeo: (efectiva) => `Suapvalinus į didesnę pusę, arbatpinigiai sudaro ${efectiva} % sąskaitos sumos.`,
  }),
};
