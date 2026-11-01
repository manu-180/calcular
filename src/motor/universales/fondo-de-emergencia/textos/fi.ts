import type { TextosUi } from "../../tipos";
import type { UiFondoDeEmergencia } from "../definicion";

export const textosFi: TextosUi<UiFondoDeEmergencia> = {
  slug: "puskurirahasto",
  ui: () => ({
    gastos: "Välttämättömät menot kuukaudessa",
    gastosAyuda: "Menot, joita et voi lopettaa: asuminen, ruoka, sähkö, liikkuminen, terveys ja lainojen lyhennykset.",
    meses: "Montako kuukautta puskurin pitää riittää",
    mesesAyuda: "Kolmesta kuuteen kuukautta, jos tulosi ovat vakaat. Enemmän, jos tulot vaihtelevat tai kotitaloudessa on vain yksi tulonsaaja.",
    actual: "Jo säästetty summa (valinnainen)",
    aporte: "Paljonko voit säästää kuukaudessa (valinnainen)",
    meta: "Suositeltu puskurirahasto",
    falta: "Vielä säästettävää",
    mesesParaLlegar: "Kuukausia, kunnes puskuri on koossa",
    cobertura: "Montako kuukautta nykyiset säästösi riittävät",
    errorGastos: "Syötä välttämättömät menosi yhdeltä kuukaudelta.",
    yaCubierto: "Puskurisi on jo koossa. Tästä eteenpäin voit säästää muihin tavoitteisiin.",
    sinAporte: "Syötä, paljonko voit säästää kuukaudessa, niin näet, kauanko säästäminen kestää.",
    observacionDonde: "Pidä puskuri omalla tilillään, josta saat rahat käyttöön samana päivänä ja jonka arvo ei heilu, esimerkiksi säästötilillä.",
  }),
};
