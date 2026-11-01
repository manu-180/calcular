import { definirCasos } from "@/motor/calculo";
import porezNaZarade from "./porez-na-zarade";

const ZPDG = "https://www.mfin.gov.rs//upload/media/MOq4eO_6aa14ac8c7a47.docx";

export default definirCasos(porezNaZarade, [
  {
    nombre: "Bruto 100.000",
    origen: { tipo: "recalculado", url: ZPDG, detalle: "(100.000 - 34.221) puta 10 % = 6.577,90; 6.577,90 / 100.000 = 6,5779 %." },
    fecha: "2026-10-31",
    entrada: { bruto: 100000, radnoVreme: 100 },
    esperado: { porez: 6577.9, osnovica: 65779, efektivnaStopa: 6.5779 },
  },
  {
    nombre: "Bruto ispod neoporezivog iznosa",
    origen: { tipo: "recalculado", url: ZPDG, detalle: "30.000 je manje od 34.221, pa nema poreza." },
    fecha: "2026-10-31",
    entrada: { bruto: 30000, radnoVreme: 100 },
    esperado: { porez: 0, osnovica: 0 },
  },
]);
