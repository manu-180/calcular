import type { TextosUi } from "../../tipos";
import type { UiPintura } from "../definicion";

const volumen = (u: string) => (u === "L" ? "litre" : "galóny");

export const textosSk: TextosUi<UiPintura> = {
  slug: "spotreba-farby",
  ui: () => ({
    modo: "Aké rozmery poznáte?",
    modoMedidas: "Dĺžku a výšku stien",
    modoSuperficie: "Celkovú plochu",
    largo: (u) => `Celková dĺžka stien (${u})`,
    largoAyuda: "Všetky steny, ktoré budete maľovať, dokopy. Pri miestnosti je to obvod.",
    alto: (u) => `Výška stien (${u})`,
    superficie: (u) => `Plocha na maľovanie (${u})`,
    aberturas: (u) => `Dvere a okná, ktoré sa odpočítajú (${u})`,
    aberturasAyuda: "Dvere majú približne 2 m² a bežné okno 1 až 2 m².",
    manos: "Počet náterov",
    rendimiento: (u) => `Výdatnosť farby (${u})`,
    rendimientoAyuda: "Nájdete ju na obale: koľko plochy pokryje jeden náter. Ak ju nepoznáte, nechajte navrhnutú hodnotu.",
    recomendado: (u) => `Koľko farby kúpiť (${volumen(u)})`,
    recomendadoAyuda: "Vrátane 10 % navyše na opravy a na to, čo zostane vo valčeku.",
    necesario: (u) => `Presné množstvo (${volumen(u)})`,
    neta: (u) => `Plocha na maľovanie (${u})`,
    errorMedidas: "Vyplňte dĺžku a výšku stien.",
    errorSuperficie: "Vyplňte plochu na maľovanie.",
    errorAberturas: "Dvere a okná nemôžu zaberať celú stenu.",
    errorRendimiento: "Výdatnosť musí byť väčšia ako 0.",
  }),
};
