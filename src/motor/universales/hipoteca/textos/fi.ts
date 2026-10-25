import type { TextosUi } from "../../tipos";
import type { UiHipoteca } from "../definicion";

export const textosFi: TextosUi<UiHipoteca> = {
  slug: "asuntolainalaskuri",
  ui: () => ({
    precio: "Asunnon hinta",
    entradaPorcentaje: "Omarahoitusosuus (% hinnasta)",
    entradaMonto: "Omarahoitusosuus rahamääränä (valinnainen)",
    entradaMontoAyuda: "Jos syötät summan, sitä käytetään prosentin sijaan.",
    tasa: "Vuosikorko (%)",
    anios: "Laina-aika vuosina",
    gastos: "Asumiskulut kuukaudessa (valinnainen)",
    gastosAyuda: "Hoitovastike, vesi, kotivakuutus tai kiinteistövero, jotka maksat lainan lisäksi.",
    cuota: "Lainan kuukausierä",
    cuotaTotal: "Kuukausierä ja asumiskulut yhteensä",
    entrada: "Omarahoitusosuus",
    prestado: "Lainan määrä",
    intereses: "Korot yhteensä",
    total: "Lainan maksut yhteensä",
    tabla: "Vuosi vuodelta",
    colAnio: "Vuosi",
    colIntereses: "Maksetut korot",
    colCapital: "Lyhennykset",
    colSaldo: "Velkaa jäljellä vuoden lopussa",
    errorPrecio: "Syötä asunnon hinta.",
    errorEntrada: "Omarahoitusosuus kattaa koko hinnan, joten lainaa ei tarvita. Pienennä omarahoitusosuutta.",
    observacionPrestado: (porcentaje) => `Lainaat ${porcentaje} % asunnon arvosta. Mitä suurempi osuus, sitä enemmän pankki yleensä vaatii sinulta.`,
    observacionCostos: "Kaupan kulut (varainsiirtovero, pankin ja kiinnitysten kulut sekä välityspalkkio) eivät ole mukana. Varaa niihin rahaa omarahoitusosuuden lisäksi.",
  }),
};
