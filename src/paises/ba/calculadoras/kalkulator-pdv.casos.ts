import { definirCasos } from "@/motor/calculo";
import kalkulatorPdv from "./kalkulator-pdv";

export default definirCasos(kalkulatorPdv, [
  {
    nombre: "100 KM bez PDV-a",
    origen: { tipo: "recalculado", url: "https://www.uino.gov.ba/portal/wp-content/uploads/PROPISI/2_Porezi/1_PDV/1_Zakon_o_PDV/B/B-1-Zakon_o_PDV-b.pdf", detalle: "Član 23: 17 %. 100 x 17 % = 17; ukupno 117." },
    fecha: "2026-11-01",
    entrada: { iznos: 100, smjer: "bez" },
    esperado: { pdv: 17, osnovica: 100, ukupno: 117 },
  },
  {
    nombre: "117 KM sa PDV-om",
    origen: { tipo: "recalculado", url: "https://www.uino.gov.ba/portal/wp-content/uploads/PROPISI/2_Porezi/1_PDV/1_Zakon_o_PDV/B/B-1-Zakon_o_PDV-b.pdf", detalle: "117 / 1,17 = 100; PDV 17." },
    fecha: "2026-11-01",
    entrada: { iznos: 117, smjer: "sa" },
    esperado: { pdv: 17, osnovica: 100 },
  },
  {
    nombre: "1.000 KM sa PDV-om",
    origen: { tipo: "recalculado", url: "https://www.uino.gov.ba/portal/wp-content/uploads/PROPISI/2_Porezi/1_PDV/1_Zakon_o_PDV/B/B-1-Zakon_o_PDV-b.pdf", detalle: "1.000 / 1,17 = 854,70; PDV 145,30." },
    fecha: "2026-11-01",
    entrada: { iznos: 1000, smjer: "sa" },
    esperado: { pdv: 145.3, osnovica: 854.7 },
  },
  {
    nombre: "Iznos nula je greška",
    origen: { tipo: "recalculado", url: "https://www.uino.gov.ba/portal/wp-content/uploads/PROPISI/2_Porezi/1_PDV/1_Zakon_o_PDV/B/B-1-Zakon_o_PDV-b.pdf", detalle: "Bez iznosa nema obračuna." },
    fecha: "2026-11-01",
    entrada: { iznos: 0, smjer: "bez" },
    esperaError: true,
  },
]);
