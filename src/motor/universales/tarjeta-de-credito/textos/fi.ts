import type { TextosUi } from "../../tipos";
import type { UiTarjetaDeCredito } from "../definicion";

export const textosFi: TextosUi<UiTarjetaDeCredito> = {
  slug: "luottokorttivelka",
  ui: () => ({
    saldo: "Luottokorttivelka",
    tasa: "Vuosikorko (nimellinen, %)",
    tasaAyuda: "Kortilla tehtyjen ostojen korko. Se lukee laskussasi tai sopimuksessa.",
    modo: "Miten haluat maksaa?",
    modoFijo: "Saman summan joka kuukausi",
    modoMinimo: "Vähimmäismaksun",
    pagoFijo: "Kiinteä summa kuukaudessa",
    minimoPorcentaje: "Vähimmäismaksu (% velasta)",
    minimoPorcentajeAyuda: "Summa, jonka kortin myöntäjä vaatii joka kuukausi. Jos et ole varma, 5 % on tavallinen.",
    minimoPiso: "Vähimmäismaksu vähintään",
    meses: "Kuukausia, kunnes velka on maksettu",
    intereses: "Maksat korkoja",
    total: "Maksat yhteensä",
    primerPago: "Ensimmäinen vähimmäismaksu",
    tabla: "Suunnitelma kuukausi kuukaudelta",
    colMes: "Kuukausi",
    colPago: "Maksu",
    colInteres: "Korko",
    colCapital: "Lyhennys",
    colSaldo: "Velkaa jäljellä",
    errorSaldo: "Syötä, paljonko olet velkaa kortilla.",
    errorFaltaPago: "Syötä, paljonko maksat joka kuukausi.",
    errorNoCubre: (interes) => `Tällä maksulla velka ei koskaan pienene. Pelkkä ensimmäisen kuukauden korko on ${interes}. Nosta maksua.`,
    errorMuyLargo: "Tällä maksulla velan maksamiseen menisi yli 50 vuotta. Nosta maksua.",
    observacionAnios: (anios, meses) => {
      const a = anios === "1" ? "1 vuosi" : `${anios} vuotta`;
      const m = meses === "0" ? "" : meses === "1" ? " ja 1 kuukausi" : ` ja ${meses} kuukautta`;
      return `Se on ${a}${m}.`;
    },
    observacionFijo: (pago, meses, ahorro) =>
      `Jos maksat aina ${pago} eli saman verran kuin ensimmäinen vähimmäismaksu, velka on maksettu ${meses} kuukaudessa ja säästät korkoja ${ahorro}.`,
    observacionNoGastar: "Laskelma olettaa, ettet osta kortilla mitään lisää sillä aikaa, kun maksat velkaa pois.",
  }),
};
