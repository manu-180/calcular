import type { TextosUi } from "../../tipos";
import type { UiPintura } from "../definicion";

const volumen = (u: string) => (u === "L" ? "lítrar" : "gallon");

export const textosIs: TextosUi<UiPintura> = {
  slug: "malning",
  ui: () => ({
    modo: "Hvaða mál ertu með?",
    modoMedidas: "Lengd og hæð veggjanna",
    modoSuperficie: "Heildarflötinn",
    largo: (u) => `Samanlögð lengd veggjanna (${u})`,
    largoAyuda: "Allir veggir sem þú ætlar að mála, samanlagt. Í einu herbergi er það ummálið.",
    alto: (u) => `Lofthæð (${u})`,
    superficie: (u) => `Flötur sem á að mála (${u})`,
    aberturas: (u) => `Hurðir og gluggar sem dragast frá (${u})`,
    aberturasAyuda: "Hurð er um 2 m² (21 ft²) og venjulegur gluggi 1 til 2 m².",
    manos: "Fjöldi umferða",
    rendimiento: (u) => `Þekja málningarinnar (${u})`,
    rendimientoAyuda: "Það stendur á dósinni: hvað einn lítri þekur stóran flöt í einni umferð. Ef þú veist það ekki skaltu halda tillögunni.",
    recomendado: (u) => `Málning sem þarf að kaupa (${volumen(u)})`,
    recomendadoAyuda: "Með 10% aukalega fyrir lagfæringar og það sem verður eftir í rúllunni.",
    necesario: (u) => `Nákvæmt magn (${volumen(u)})`,
    neta: (u) => `Flötur sem á að mála (${u})`,
    errorMedidas: "Sláðu inn lengd og hæð veggjanna.",
    errorSuperficie: "Sláðu inn flötinn sem á að mála.",
    errorAberturas: "Hurðir og gluggar geta ekki tekið allan vegginn.",
    errorRendimiento: "Þekjan þarf að vera meiri en 0.",
  }),
};
