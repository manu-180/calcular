import type { TextosUi } from "../../tipos";
import type { UiTasaEfectiva } from "../definicion";

export const textosIt: TextosUi<UiTasaEfectiva> = {
  slug: "calcolo-tasso-effettivo",
  ui: () => ({
    direccion: "Quale tasso hai?",
    nominalAEfectiva: "Tasso nominale, TAN (trasformalo in TAE)",
    efectivaANominal: "Tasso effettivo, TAE (trasformalo in TAN)",
    tasa: "Tasso annuo (%)",
    tasaAyuda: "Inseriscilo esattamente come compare nell'offerta o nel contratto.",
    capitalizacion: "Capitalizzazione",
    capitalizacionAyuda: "Ogni quanto gli interessi si aggiungono al capitale. Prestiti e carte di credito di solito capitalizzano ogni mese.",
    mensual: "Mensile (12 volte l'anno)",
    trimestral: "Trimestrale (4 volte l'anno)",
    semestral: "Semestrale (2 volte l'anno)",
    diaria: "Giornaliera (365 volte l'anno)",
    efectiva: "Tasso annuo effettivo (TAE)",
    nominal: "Tasso annuo nominale (TAN)",
    periodica: "Tasso per periodo",
    errorNegativa: "Il tasso non può essere negativo. Inserisci un numero da 0 in su.",
    observacionDiferencia: (punti) =>
      `Il tasso effettivo è più alto di ${punti} punti rispetto al nominale, perché anche gli interessi producono interessi.`,
  }),
};
