import type { TextosUi } from "../../tipos";
import type { UiCombustible } from "../definicion";

export const textosBs: TextosUi<UiCombustible> = {
  slug: "potrosnja-goriva",
  ui: () => ({
    distancia: (u) => `Dužina puta (${u})`,
    idaYVuelta: "U oba smjera",
    tipoConsumo: "Kako je izražena potrošnja",
    l100: "Litara na 100 km",
    kml: "Kilometara po litri",
    consumo: "Potrošnja goriva",
    consumoAyuda: "Piše u uputama za vozilo ili na putnom računaru. Na autoputu je potrošnja obično manja nego u gradu.",
    consumoMpg: "Potrošnja goriva (milja po galonu)",
    precio: (u) => (u === "L" ? "Cijena po litri" : "Cijena po galonu"),
    personas: "Koliko osoba dijeli trošak",
    costo: "Trošak goriva",
    porPersona: "Po osobi",
    combustible: (u) => (u === "L" ? "Potrebno gorivo (litre)" : "Potrebno gorivo (galoni)"),
    distanciaTotal: (u) => `Ukupna udaljenost (${u})`,
    costoPorDistancia: (u) => (u === "mi" ? "Trošak po milji" : "Trošak po kilometru"),
    errorConsumo: "Potrošnja mora biti veća od nule.",
    errorPersonas: "Mora biti barem jedna osoba.",
  }),
};
