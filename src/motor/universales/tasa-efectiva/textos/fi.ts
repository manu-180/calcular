import type { TextosUi } from "../../tipos";
import type { UiTasaEfectiva } from "../definicion";

export const textosFi: TextosUi<UiTasaEfectiva> = {
  slug: "todellinen-vuosikorko",
  ui: () => ({
    direccion: "Mikä korko sinulla on?",
    nominalAEfectiva: "Nimelliskorko (muunna efektiiviseksi)",
    efectivaANominal: "Efektiivinen korko (muunna nimelliseksi)",
    tasa: "Vuosikorko (%)",
    tasaAyuda: "Syötä korko juuri niin kuin se lukee tarjouksessa tai sopimuksessa.",
    capitalizacion: "Koron laskeminen",
    capitalizacionAyuda: "Kuinka usein korko lisätään velkaan tai saldoon. Lainoissa ja luottokorteissa korko lasketaan yleensä kuukausittain.",
    mensual: "Kuukausittain (12 kertaa vuodessa)",
    trimestral: "Neljännesvuosittain (4 kertaa vuodessa)",
    semestral: "Puolivuosittain (2 kertaa vuodessa)",
    diaria: "Päivittäin (365 kertaa vuodessa)",
    efectiva: "Efektiivinen vuosikorko",
    nominal: "Nimellinen vuosikorko",
    periodica: "Korko jaksoa kohden",
    errorNegativa: "Korko ei voi olla negatiivinen. Syötä luku nollasta ylöspäin.",
    observacionDiferencia: (puntos) => `Efektiivinen korko on ${puntos} prosenttiyksikköä nimelliskorkoa korkeampi, koska korolle kertyy myös korkoa.`,
  }),
};
