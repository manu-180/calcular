import { pluralCs } from "../../../i18n/plural";
import type { TextosUi } from "../../tipos";
import type { UiTarjetaDeCredito } from "../definicion";

const mesice = (n: string) => pluralCs(n, "měsíc", "měsíce", "měsíců");

export const textosCs: TextosUi<UiTarjetaDeCredito> = {
  slug: "splaceni-kreditni-karty",
  ui: () => ({
    saldo: "Dluh na kartě",
    tasa: "Roční úroková sazba (%)",
    tasaAyuda: "Úroková sazba z nákupů po skončení bezúročného období. Najdete ji ve výpisu nebo ve smlouvě.",
    modo: "Jak budete splácet?",
    modoFijo: "Pevnou částkou každý měsíc",
    modoMinimo: "Minimální splátkou",
    pagoFijo: "Pevná měsíční splátka",
    minimoPorcentaje: "Minimální splátka (% dluhu)",
    minimoPorcentajeAyuda: "Kolik po vás vydavatel karty každý měsíc chce. Pokud si nejste jistí, běžných je 5 %.",
    minimoPiso: "Minimální splátka nikdy nižší než",
    meses: "Počet měsíců do splacení",
    intereses: "Zaplacené úroky",
    total: "Zaplaceno celkem",
    primerPago: "První minimální splátka",
    tabla: "Splátkový plán po měsících",
    colMes: "Měsíc",
    colPago: "Splátka",
    colInteres: "Úrok",
    colCapital: "Jistina",
    colSaldo: "Zůstatek",
    errorSaldo: "Zadejte, kolik na kartě dlužíte.",
    errorFaltaPago: "Zadejte, kolik budete každý měsíc splácet.",
    errorNoCubre: (interes) => `S touto splátkou dluh nikdy neklesne: jen úrok za první měsíc je ${interes}. Splátku zvyšte.`,
    errorMuyLargo: "S touto splátkou by splacení trvalo přes 50 let. Splátku zvyšte.",
    observacionAnios: (anios, meses) => {
      const a = pluralCs(anios, "rok", "roky", "let");
      return meses === "0" ? `Celkem tedy ${a}.` : `Celkem tedy ${a} a ${mesice(meses)}.`;
    },
    observacionFijo: (pago, meses, ahorro) =>
      `Když budete vždy platit ${pago}, tedy stejně jako první minimální splátku, splatíte dluh za ${mesice(meses)} a na úrocích ušetříte ${ahorro}.`,
    observacionNoGastar: "Výpočet předpokládá, že během splácení kartou nebudete nic dalšího nakupovat.",
  }),
};
