import type { TextosUi } from "../../tipos";
import type { UiPintura } from "../definicion";

const volumen = (u: string) => (u === "L" ? "litri" : "galoane");

export const textosRo: TextosUi<UiPintura> = {
  slug: "calculator-vopsea",
  ui: () => ({
    modo: "Ce măsuri aveți?",
    modoMedidas: "Lungimea și înălțimea pereților",
    modoSuperficie: "Suprafața totală",
    largo: (u) => `Lungimea totală a pereților (${u})`,
    largoAyuda: "Toți pereții pe care îi vopsiți, adunați. Pentru o cameră, perimetrul.",
    alto: (u) => `Înălțimea pereților (${u})`,
    superficie: (u) => `Suprafața de vopsit (${u})`,
    aberturas: (u) => `Uși și ferestre de scăzut (${u})`,
    aberturasAyuda: "O ușă are în jur de 2 m², iar o fereastră obișnuită între 1 și 2 m².",
    manos: "Numărul de straturi",
    rendimiento: (u) => `Acoperirea vopselei (${u})`,
    rendimientoAyuda: "Scrie pe ambalaj: câtă suprafață acoperă la un strat. Dacă nu știți, păstrați valoarea propusă.",
    recomendado: (u) => `Vopsea de cumpărat (${volumen(u)})`,
    recomendadoAyuda: "Include 10% în plus pentru retușuri și pentru ce rămâne în trafalet.",
    necesario: (u) => `Cantitatea exactă (${volumen(u)})`,
    neta: (u) => `Suprafața de vopsit (${u})`,
    errorMedidas: "Completați lungimea și înălțimea pereților.",
    errorSuperficie: "Completați suprafața de vopsit.",
    errorAberturas: "Ușile și ferestrele nu pot ocupa tot peretele.",
    errorRendimiento: "Acoperirea trebuie să fie mai mare decât 0.",
  }),
};
