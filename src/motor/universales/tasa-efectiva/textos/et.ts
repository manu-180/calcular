import type { TextosUi } from "../../tipos";
import type { UiTasaEfectiva } from "../definicion";

export const textosEt: TextosUi<UiTasaEfectiva> = {
  slug: "krediidi-kulukuse-maar",
  ui: () => ({
    direccion: "Milline intress sul on?",
    nominalAEfectiva: "Nominaalintress (teisenda efektiivseks)",
    efectivaANominal: "Efektiivne intress (teisenda nominaalseks)",
    tasa: "Aastaintress (%)",
    tasaAyuda: "Sisesta intress täpselt nii, nagu see on kirjas pakkumises või lepingus.",
    capitalizacion: "Intressi arvestamine",
    capitalizacionAyuda: "Kui tihti lisatakse intress võlale või saldole. Laenude ja krediitkaartide intressi arvestatakse tavaliselt iga kuu.",
    mensual: "Iga kuu (12 korda aastas)",
    trimestral: "Iga kvartal (4 korda aastas)",
    semestral: "Iga poolaasta (2 korda aastas)",
    diaria: "Iga päev (365 korda aastas)",
    efectiva: "Efektiivne aastaintress",
    nominal: "Nominaalne aastaintress",
    periodica: "Intress perioodi kohta",
    errorNegativa: "Intress ei saa olla negatiivne. Sisesta arv alates nullist.",
    observacionDiferencia: (puntos) => `Efektiivne intress on ${puntos} protsendipunkti võrra nominaalintressist kõrgem, sest ka intressilt koguneb intressi.`,
  }),
};
