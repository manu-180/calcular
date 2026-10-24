import type { TextosUi } from "../../tipos";
import type { UiAhorroRetiro } from "../definicion";

export const textosFi: TextosUi<UiAhorroRetiro> = {
  slug: "elakesaastaminen",
  ui: () => ({
    edadActual: "Ikäsi nyt",
    edadRetiro: "Ikä, jolloin haluat jäädä eläkkeelle",
    actual: "Jo säästetty summa",
    aporte: "Kuukausisäästö",
    rendimiento: "Reaalituotto vuodessa (%)",
    rendimientoAyuda: "Säästöjen tuotto inflaation jälkeen. Varovainen pitkän aikavälin oletus on kahdesta viiteen prosenttia.",
    aniosRenta: "Vuosia, jotka säästöjen pitää riittää eläkkeellä",
    aniosRentaAyuda: "Kuinka monena vuonna haluat nostaa rahaa säästöistäsi.",
    capital: "Säästöt eläkkeelle jäädessä",
    renta: "Kuukausittainen nosto säästöistä",
    aportado: "Talletukset yhteensä",
    intereses: "Arvonnousu yhteensä",
    tabla: "Kehitys iän mukaan",
    colEdad: "Ikä",
    colAportado: "Talletettu tähän mennessä",
    colSaldo: "Säästöt",
    errorEdades: "Eläkeiän pitää olla suurempi kuin ikäsi nyt.",
    errorSinAhorro: "Syötä nykyiset säästösi tai kuukausisäästö.",
    observacionDineroDeHoy: "Summat ovat tämän päivän rahassa, koska tuotosta on jo vähennetty inflaatio.",
    observacionPublica: "Tässä ovat mukana vain omat säästösi. Lakisääteinen eläke ja työnantajan lisäeläke eivät ole mukana.",
  }),
};
