import { percento } from "../../comun/italiano";
import type { TextosUi } from "../../tipos";
import type { UiHipoteca } from "../definicion";

export const textosIt: TextosUi<UiHipoteca> = {
  slug: "calcolo-rata-mutuo",
  ui: () => ({
    precio: "Prezzo della casa",
    entradaPorcentaje: "Anticipo (% del prezzo)",
    entradaMonto: "Anticipo come importo (facoltativo)",
    entradaMontoAyuda: "Se lo inserisci, si usa al posto della percentuale.",
    tasa: "Tasso annuo (%)",
    anios: "Durata in anni",
    gastos: "Spese mensili della casa (facoltativo)",
    gastosAyuda: "Assicurazione, spese condominiali o altre spese che paghi insieme alla rata.",
    cuota: "Rata mensile del mutuo",
    cuotaTotal: "Rata mensile con le spese",
    entrada: "Anticipo",
    prestado: "Importo del mutuo",
    intereses: "Interessi totali",
    total: "Totale delle rate",
    tabla: "Anno per anno",
    colAnio: "Anno",
    colIntereses: "Interessi pagati",
    colCapital: "Capitale restituito",
    colSaldo: "Debito residuo a fine anno",
    errorPrecio: "Inserisci il prezzo della casa.",
    errorEntrada: "L'anticipo copre tutto il prezzo, quindi non c'è nessun mutuo da calcolare. Abbassa l'anticipo.",
    observacionPrestado: (p) => `Chiedi in prestito ${percento(p)} del valore della casa. Più alta è questa quota, più la banca di solito ti chiede garanzie.`,
    observacionCostos: "Non sono comprese le spese di acquisto (notaio, imposte, perizia, istruttoria). Mettile in conto oltre all'anticipo.",
  }),
};
