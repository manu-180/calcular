import type { TextosUi } from "../../tipos";
import type { UiCombustible } from "../definicion";

export const textosEt: TextosUi<UiCombustible> = {
  slug: "kutusekalkulaator",
  ui: () => ({
    distancia: (u) => `Teekonna pikkus (${u})`,
    idaYVuelta: "Edasi-tagasi",
    tipoConsumo: "Kuidas kütusekulu on esitatud",
    l100: "Liitrit 100 kilomeetri kohta",
    kml: "Kilomeetrit liitri kohta",
    consumo: "Kütusekulu",
    consumoMpg: "Kütusekulu (miili galloni kohta)",
    consumoAyuda: "Väärtuse leiad auto kasutusjuhendist või pardakompuutrist. Maanteel kulub tavaliselt vähem kütust kui linnas.",
    precio: (u) => (u === "L" ? "Liitri hind" : "Galloni hind"),
    personas: "Kulude jagajate arv",
    costo: "Kütuse maksumus",
    porPersona: "Inimese kohta",
    combustible: (u) => (u === "L" ? "Kütust kulub (liitrit)" : "Kütust kulub (gallonit)"),
    distanciaTotal: (u) => `Kogu teekond (${u})`,
    costoPorDistancia: (u) => `Maksumus ${u} kohta`,
    errorConsumo: "Kütusekulu peab olema suurem kui 0.",
    errorPersonas: "Inimesi peab olema vähemalt üks.",
  }),
};
