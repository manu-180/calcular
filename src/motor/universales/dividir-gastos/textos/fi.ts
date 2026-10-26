import type { TextosUi } from "../../tipos";
import type { UiDividirGastos } from "../definicion";

export const textosFi: TextosUi<UiDividirGastos> = {
  slug: "kulujen-jakaminen",
  ui: () => ({
    persona: (n) => `Henkilö ${n}`,
    personaAyuda: "Syötä, paljonko kukin on maksanut. Jos joku ei ole maksanut mitään mutta osallistuu kuluihin, syötä 0. Jätä loput kentät tyhjiksi.",
    total: "Kulut yhteensä",
    personas: "Henkilöitä",
    cuota: "Osuus henkilöä kohden",
    transferencias: "Tasaukseen tarvittavat maksut",
    tabla: "Kuka maksaa kenelle",
    colDe: "Maksaja",
    colPara: "Saaja",
    colMonto: "Summa",
    errorPocas: "Kulujen jakamiseen tarvitaan vähintään kaksi henkilöä.",
    aMano: "Olette sujut. Kaikki ovat maksaneet saman verran.",
  }),
};
