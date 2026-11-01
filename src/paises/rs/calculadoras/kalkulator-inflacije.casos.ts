import { definirCasos } from "@/motor/calculo";
import kalkulatorInflacije from "./kalkulator-inflacije";

const IPC = "https://opendata.stat.gov.rs/data/WcfJsonRestService.Service1.svc/dataset/03011101IND01/1/json";

export default definirCasos(kalkulatorInflacije, [
  {
    nombre: "Septembar 2025 do septembra 2026",
    origen: { tipo: "recalculado", url: IPC, detalle: "Bazni indeksi 2025 = 100: 103,8 / 99,6 = 1,04217; 100.000 postaje 104.216,87." },
    fecha: "2026-10-31",
    entrada: { iznos: 100000, od: "2025-09-15", do: "2026-09-15" },
    esperado: { danas: 104216.87, mesecOd: "septembar 2025.", mesecDo: "septembar 2026." },
    tolerancia: 0.02,
  },
  {
    nombre: "Mesec bez podatka",
    origen: { tipo: "recalculado", url: IPC, detalle: "Početak pre januara 2011 nije dostupan." },
    fecha: "2026-10-31",
    entrada: { iznos: 100000, od: "2009-01-01", do: "2026-09-01" },
    esperaError: true,
  },
]);
