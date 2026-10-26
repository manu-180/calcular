import type { TextosUi } from "../../tipos";
import type { UiPuntoDeEquilibrio } from "../definicion";

export const textosFi: TextosUi<UiPuntoDeEquilibrio> = {
  slug: "kannattavuusraja",
  ui: () => ({
    fijos: "Kiinteät kulut kuukaudessa",
    fijosAyuda: "Kulut, jotka maksat, vaikka et myisi mitään: vuokra, kiinteät palkat, sähkö, ohjelmistot ja tilaukset.",
    precio: "Myyntihinta kappaleelta",
    variable: "Muuttuvat kulut kappaleelta",
    variableAyuda: "Mitä jokainen myyty kappale sinulle maksaa: materiaalit, ostot, provisiot ja rahti.",
    objetivo: "Tavoiteltu voitto kuukaudessa (valinnainen)",
    objetivoAyuda: "Näet, paljonko sinun pitää myydä kulujen kattamisen lisäksi.",
    unidades: "Kappaleita kannattavuusrajaan",
    facturacion: "Liikevaihto kannattavuusrajalla",
    contribucion: "Katetuotto kappaleelta",
    contribucionAyuda: "Mitä jokaisesta myynnistä jää kiinteiden kulujen kattamiseen: hinta miinus muuttuvat kulut.",
    contribucionPct: "Katetuottoprosentti (%)",
    unidadesObjetivo: "Kappaleita tavoitevoittoon",
    facturacionObjetivo: "Liikevaihto tavoitevoittoon",
    errorPrecio: "Syötä yhden kappaleen myyntihinta.",
    errorMargen: "Muuttuvat kulut ovat yhtä suuret tai suuremmat kuin hinta. Jokainen myynti tuottaa tappiota, etkä koskaan pääse kannattavuusrajaan. Tarkista hinta ja kulut.",
    observacionRedondeo: "Kappalemäärä pyöristetään ylöspäin, koska kappaleen osaa ei voi myydä.",
  }),
};
