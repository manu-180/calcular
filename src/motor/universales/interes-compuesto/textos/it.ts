import { percento } from "../../comun/italiano";
import type { TextosUi } from "../../tipos";
import type { UiInteresCompuesto } from "../definicion";

const maiuscola = (s: string) => s[0].toUpperCase() + s.slice(1);
const comeNumero = (s: string) => new Intl.NumberFormat("it-IT", { maximumFractionDigits: 2 }).format(Number(s));

export const textosIt: TextosUi<UiInteresCompuesto> = {
  slug: "calcolo-interesse-composto",
  ui: () => ({
    capital: "Capitale iniziale",
    aporte: "Versamento mensile (facoltativo)",
    aporteAyuda: "Quello che aggiungeresti ogni mese. Si somma alla fine di ogni mese.",
    tasa: "Tasso di interesse annuo (%)",
    anios: "Anni",
    capitalizacion: "Capitalizzazione",
    anual: "Annuale",
    semestral: "Semestrale",
    trimestral: "Trimestrale",
    mensual: "Mensile",
    diaria: "Giornaliera",
    saldo: "Capitale finale",
    aportado: "Totale versato",
    intereses: "Interessi maturati",
    tabla: "Crescita anno per anno",
    colAnio: "Anno",
    colAportado: "Versamenti",
    colIntereses: "Interessi",
    colSaldo: "Capitale a fine anno",
    errorSinDinero: "Inserisci un capitale iniziale o un versamento mensile.",
    observacionIntereses: (p) => `${maiuscola(percento(comeNumero(p)))} del capitale finale sono interessi.`,
  }),
};
