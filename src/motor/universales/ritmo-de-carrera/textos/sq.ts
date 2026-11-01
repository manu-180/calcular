import type { TextosUi } from "../../tipos";
import type { UiRitmo } from "../definicion";

export const textosSq: TextosUi<UiRitmo> = {
  slug: "kalkulator-ritmi-vrapimi",
  ui: () => ({
    calcular: "Çfarë dëshironi të llogaritni?",
    calcRitmo: "Ritmin (nga distanca dhe koha)",
    calcTiempo: "Kohën (nga distanca dhe ritmi)",
    calcDistancia: "Distancën (nga koha dhe ritmi)",
    distancia: "Distanca",
    distanciaAyuda: "Zgjidhni një garë ose “Distancë tjetër” për të vendosur distancën që dëshironi.",
    otra: "Distancë tjetër",
    cincoK: "5 km",
    diezK: "10 km",
    media: "Gjysmëmaratonë",
    maraton: "Maratonë",
    distanciaOtra: (u) => `Distancë tjetër (${u})`,
    horas: "Koha: orë",
    minutos: "Koha: minuta",
    segundos: "Koha: sekonda",
    ritmoMin: (u) => `Ritmi: minuta për ${u}`,
    ritmoSeg: "Ritmi: sekonda",
    ritmo: (u) => `Ritmi (min/${u})`,
    tiempo: "Koha përfundimtare",
    distanciaRes: (u) => `Distanca (${u})`,
    velocidad: (u) => `Shpejtësia mesatare (${u})`,
    errorDistancia: "Vendosni një distancë më të madhe se 0.",
    errorTiempo: "Vendosni kohën: orë, minuta ose sekonda.",
    errorRitmo: "Vendosni ritmin: minuta dhe sekonda për njësi distance.",
  }),
};
