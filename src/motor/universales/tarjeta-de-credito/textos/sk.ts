import { pluralSk } from "../../../i18n/plural";
import type { TextosUi } from "../../tipos";
import type { UiTarjetaDeCredito } from "../definicion";

const mesiace = (n: string) => pluralSk(n, "mesiac", "mesiace", "mesiacov");

export const textosSk: TextosUi<UiTarjetaDeCredito> = {
  slug: "splatenie-kreditnej-karty",
  ui: () => ({
    saldo: "Dlh na karte",
    tasa: "Ročná úroková sadzba (%)",
    tasaAyuda: "Úroková sadzba z nákupov po skončení bezúročného obdobia. Nájdete ju vo výpise alebo v zmluve.",
    modo: "Ako budete splácať?",
    modoFijo: "Pevnou sumou každý mesiac",
    modoMinimo: "Minimálnou splátkou",
    pagoFijo: "Pevná mesačná splátka",
    minimoPorcentaje: "Minimálna splátka (% dlhu)",
    minimoPorcentajeAyuda: "Koľko od vás vydavateľ karty každý mesiac žiada. Ak to neviete presne, bežných je 5 %.",
    minimoPiso: "Minimálna splátka nikdy nižšia ako",
    meses: "Počet mesiacov do splatenia",
    intereses: "Zaplatené úroky",
    total: "Zaplatené spolu",
    primerPago: "Prvá minimálna splátka",
    tabla: "Splátkový plán po mesiacoch",
    colMes: "Mesiac",
    colPago: "Splátka",
    colInteres: "Úrok",
    colCapital: "Istina",
    colSaldo: "Zostatok",
    errorSaldo: "Zadajte, koľko na karte dlhujete.",
    errorFaltaPago: "Zadajte, koľko budete každý mesiac splácať.",
    errorNoCubre: (interes) => `S touto splátkou dlh nikdy neklesne: len úrok za prvý mesiac je ${interes}. Splátku zvýšte.`,
    errorMuyLargo: "S touto splátkou by splatenie trvalo viac ako 50 rokov. Splátku zvýšte.",
    observacionAnios: (anios, meses) => {
      const a = pluralSk(anios, "rok", "roky", "rokov");
      return meses === "0" ? `Spolu teda ${a}.` : `Spolu teda ${a} a ${mesiace(meses)}.`;
    },
    observacionFijo: (pago, meses, ahorro) =>
      `Ak budete vždy platiť ${pago}, teda rovnako ako prvú minimálnu splátku, splatíte dlh za ${mesiace(meses)} a na úrokoch ušetríte ${ahorro}.`,
    observacionNoGastar: "Výpočet predpokladá, že počas splácania kartou nebudete nič ďalšie nakupovať.",
  }),
};
