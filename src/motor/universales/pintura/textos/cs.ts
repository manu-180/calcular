import type { TextosUi } from "../../tipos";
import type { UiPintura } from "../definicion";

const volumen = (u: string) => (u === "L" ? "litry" : "galony");

export const textosCs: TextosUi<UiPintura> = {
  slug: "spotreba-barvy",
  ui: () => ({
    modo: "Jaké rozměry znáte?",
    modoMedidas: "Délku a výšku stěn",
    modoSuperficie: "Celkovou plochu",
    largo: (u) => `Celková délka stěn (${u})`,
    largoAyuda: "Všechny stěny, které budete malovat, dohromady. U místnosti je to obvod.",
    alto: (u) => `Výška stěn (${u})`,
    superficie: (u) => `Plocha k malování (${u})`,
    aberturas: (u) => `Dveře a okna, které se odečtou (${u})`,
    aberturasAyuda: "Dveře mají zhruba 2 m² a běžné okno 1 až 2 m².",
    manos: "Počet nátěrů",
    rendimiento: (u) => `Vydatnost barvy (${u})`,
    rendimientoAyuda: "Najdete ji na obalu: kolik plochy pokryje jeden nátěr. Pokud ji neznáte, nechte navrženou hodnotu.",
    recomendado: (u) => `Barvy koupit (${volumen(u)})`,
    recomendadoAyuda: "Včetně 10 % navíc na opravy a na to, co zůstane ve válečku.",
    necesario: (u) => `Přesné množství (${volumen(u)})`,
    neta: (u) => `Plocha k malování (${u})`,
    errorMedidas: "Vyplňte délku a výšku stěn.",
    errorSuperficie: "Vyplňte plochu k malování.",
    errorAberturas: "Dveře a okna nemohou zabírat celou stěnu.",
    errorRendimiento: "Vydatnost musí být větší než 0.",
  }),
};
