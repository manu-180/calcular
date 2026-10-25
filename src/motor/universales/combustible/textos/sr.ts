import type { TextosUi } from "../../tipos";
import type { UiCombustible } from "../definicion";

export const textosSr: TextosUi<UiCombustible> = {
  slug: "potrosnja-goriva",
  ui: () => ({
    distancia: (u) => `Dužina puta (${u})`,
    idaYVuelta: "U oba pravca",
    tipoConsumo: "Kako je izražena potrošnja",
    l100: "Litara na 100 km",
    kml: "Kilometara po litru",
    consumo: "Potrošnja goriva",
    consumoAyuda: "Piše u uputstvu za vozilo ili na putnom računaru. Na autoputu je potrošnja obično manja nego u gradu.",
    consumoMpg: "Potrošnja goriva (milja po galonu)",
    precio: (u) => (u === "L" ? "Cena po litru" : "Cena po galonu"),
    personas: "Koliko osoba deli trošak",
    costo: "Trošak goriva",
    porPersona: "Po osobi",
    combustible: (u) => (u === "L" ? "Potrebno gorivo (litri)" : "Potrebno gorivo (galoni)"),
    distanciaTotal: (u) => `Ukupna razdaljina (${u})`,
    costoPorDistancia: (u) => (u === "mi" ? "Trošak po milji" : "Trošak po kilometru"),
    errorConsumo: "Potrošnja mora biti veća od nule.",
    errorPersonas: "Mora biti bar jedna osoba.",
  }),
};
