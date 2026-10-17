import type { TextosUi } from "../../tipos";
import type { UiPrestamo } from "../definicion";

export const textosIt: TextosUi<UiPrestamo> = {
  slug: "calcolo-rata-prestito",
  ui: () => ({
    monto: "Importo del prestito",
    tasa: "TAN, tasso annuo (%)",
    tasaAyuda: "Il tasso annuo nominale indicato nell'offerta. Spese e commissioni non sono comprese.",
    meses: "Durata in mesi",
    extra: "Versamento extra al mese (facoltativo)",
    extraAyuda: "Quello che aggiungeresti ogni mese per finire prima. Va tutto a ridurre il capitale.",
    cuota: "Rata mensile",
    intereses: "Interessi totali",
    total: "Totale da restituire",
    mesesReales: "Mesi per estinguere con il versamento extra",
    ahorro: "Interessi risparmiati",
    tabla: "Piano di ammortamento",
    colMes: "Mese",
    colPago: "Rata",
    colInteres: "Quota interessi",
    colCapital: "Quota capitale",
    colSaldo: "Debito residuo",
    errorMonto: "Inserisci un importo maggiore di zero.",
    observacionCostos: "La rata non comprende assicurazioni, spese o imposte che la banca può aggiungere. Prima di firmare, guarda il TAEG.",
    observacionExtra: (mesi, risparmio) => `Con il versamento extra finisci in ${mesi} mesi e risparmi ${risparmio} di interessi.`,
  }),
};
