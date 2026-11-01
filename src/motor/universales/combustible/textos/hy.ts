import type { TextosUi } from "../../tipos";
import type { UiCombustible } from "../definicion";

const unidad = (u: string) => ({ km: "կմ", mi: "մղոն" })[u] ?? u;

export const textosHy: TextosUi<UiCombustible> = {
  slug: "vareliki-hashvich",
  ui: () => ({
    distancia: (u) => `Ուղևորության հեռավորություն (${unidad(u)})`,
    idaYVuelta: "Գնալ և վերադառնալ",
    tipoConsumo: "Ինչպե՞ս է չափվում ծախսը",
    l100: "Լիտր 100 կմ վրա",
    kml: "Կիլոմետր մեկ լիտրով",
    consumo: "Վառելիքի ծախս",
    consumoMpg: "Վառելիքի ծախս (մղոն մեկ գալոնով)",
    consumoAyuda: "Նայեք ձեռնարկում կամ մեքենայի համակարգչում։ Քաղաքից դուրս մեքենան սովորաբար ավելի քիչ է ծախսում, քան քաղաքում։",
    precio: (u) => (u === "L" ? "Մեկ լիտրի գին" : "Մեկ գալոնի գին"),
    personas: "Ծախսը կիսողների թիվը",
    costo: "Վառելիքի արժեք",
    porPersona: "Մեկ անձի համար",
    combustible: (u) => (u === "L" ? "Անհրաժեշտ վառելիք (լիտր)" : "Անհրաժեշտ վառելիք (գալոն)"),
    distanciaTotal: (u) => `Ընդհանուր հեռավորություն (${unidad(u)})`,
    costoPorDistancia: (u) => `Արժեքը մեկ ${unidad(u)} համար`,
    errorConsumo: "Վառելիքի ծախսը պետք է լինի 0 արժեքից մեծ։",
    errorPersonas: "Պետք է լինի առնվազն մեկ անձ։",
  }),
};
