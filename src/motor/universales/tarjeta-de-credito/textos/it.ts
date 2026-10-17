import type { TextosUi } from "../../tipos";
import type { UiTarjetaDeCredito } from "../definicion";

export const textosIt: TextosUi<UiTarjetaDeCredito> = {
  slug: "calcolo-carta-revolving",
  ui: () => ({
    saldo: "Debito sulla carta",
    tasa: "TAN annuo della carta (%)",
    tasaAyuda: "Il tasso sugli acquisti. Lo trovi nell'estratto conto o nel contratto.",
    modo: "Come pensi di pagare?",
    modoFijo: "Una cifra fissa ogni mese",
    modoMinimo: "La rata minima",
    pagoFijo: "Rata mensile fissa",
    minimoPorcentaje: "Rata minima (% del debito)",
    minimoPorcentajeAyuda: "Quello che la banca ti chiede ogni mese. Se non sei sicuro, il 5% è un valore comune.",
    minimoPiso: "Rata minima mai sotto",
    meses: "Mesi per estinguere il debito",
    intereses: "Interessi che paghi",
    total: "Totale pagato",
    primerPago: "Prima rata minima",
    tabla: "Piano mese per mese",
    colMes: "Mese",
    colPago: "Rata",
    colInteres: "Interessi",
    colCapital: "Capitale",
    colSaldo: "Debito residuo",
    errorSaldo: "Inserisci il debito che hai sulla carta.",
    errorFaltaPago: "Inserisci quanto pagherai ogni mese.",
    errorNoCubre: (interessi) => `Con questa rata il debito non scende mai: solo gli interessi del primo mese sono ${interessi}. Aumenta la rata.`,
    errorMuyLargo: "Con questa rata ci vorrebbero più di 50 anni per estinguere il debito. Aumenta la rata.",
    observacionAnios: (anni, mesi) => {
      const a = anni === "1" ? "1 anno" : `${anni} anni`;
      const m = mesi === "0" ? "" : mesi === "1" ? " e 1 mese" : ` e ${mesi} mesi`;
      return `Cioè ${a}${m}.`;
    },
    observacionFijo: (rata, mesi, risparmio) =>
      `Se paghi sempre ${rata}, come la prima rata minima, finisci in ${mesi} mesi e risparmi ${risparmio} di interessi.`,
    observacionNoGastar: "Il calcolo considera che non fai nuovi acquisti con la carta mentre ripaghi il debito.",
  }),
};
