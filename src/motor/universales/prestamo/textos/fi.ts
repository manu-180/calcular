import type { TextosUi } from "../../tipos";
import type { UiPrestamo } from "../definicion";

export const textosFi: TextosUi<UiPrestamo> = {
  slug: "lainalaskuri",
  ui: () => ({
    monto: "Lainan määrä",
    tasa: "Vuosikorko (%)",
    tasaAyuda: "Tarjouksen nimellinen vuosikorko. Kuluja ei lasketa mukaan.",
    meses: "Laina-aika kuukausina",
    extra: "Ylimääräinen lyhennys kuukaudessa (valinnainen)",
    extraAyuda: "Summa, jonka maksat joka kuukausi erän lisäksi, jotta laina tulee maksetuksi nopeammin. Koko summa menee velan lyhentämiseen.",
    cuota: "Kuukausierä",
    intereses: "Korot yhteensä",
    total: "Maksat yhteensä",
    mesesReales: "Kuukausia, kunnes laina on maksettu ylimääräisellä lyhennyksellä",
    ahorro: "Säästät korkoja",
    tabla: "Maksusuunnitelma",
    colMes: "Kuukausi",
    colPago: "Maksu",
    colInteres: "Korko",
    colCapital: "Lyhennys",
    colSaldo: "Jäljellä oleva velka",
    errorMonto: "Syötä nollaa suurempi summa.",
    observacionCostos: "Kuukausierään ei sisälly vakuutuksia, kuluja tai veroja, joita lainanantaja voi lisätä. Kysy lainan kokonaiskulut ennen kuin allekirjoitat.",
    observacionExtra: (meses, ahorro) => `Ylimääräisellä lyhennyksellä laina on maksettu ${meses} kuukaudessa ja säästät korkoja ${ahorro}.`,
  }),
};
