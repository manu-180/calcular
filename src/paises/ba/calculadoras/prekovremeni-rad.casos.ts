import { definirCasos } from "@/motor/calculo";
import prekovremeniRad from "./prekovremeni-rad";

export default definirCasos(prekovremeniRad, [
  {
    nombre: "RS, prekovremeni rad 25 %",
    origen: { tipo: "oficial", url: "https://vladars.rs/sr-SP-Cyrl/Vlada/Ministarstva/mpb/PAO/Documents/Odluka-Visina-uvecanja-plate.pdf", detalle: "Odluka, tačka II: najmanje 25 %. Satnica 1.760 / 176 = 10; 12,50 x 10 sati = 125." },
    fecha: "2026-11-01",
    entrada: { region: "rs", plata: 1760, fond: 176, sati: 10, uvecanje: null, vrsta: "prekovremeni" },
    esperado: { ukupno: 125, stopa: 25 },
  },
  {
    nombre: "RS, praznik 40 %",
    origen: { tipo: "oficial", url: "https://vladars.rs/sr-SP-Cyrl/Vlada/Ministarstva/mpb/PAO/Documents/Odluka-Visina-uvecanja-plate.pdf", detalle: "Odluka, tačka II: najmanje 40 %. 14 x 8 = 112." },
    fecha: "2026-11-01",
    entrada: { region: "rs", plata: 1760, fond: 176, sati: 8, uvecanje: null, vrsta: "praznik" },
    esperado: { ukupno: 112 },
  },
  {
    nombre: "FBiH, upisanih 30 %",
    origen: { tipo: "recalculado", url: "https://www.pufbih.ba/v1/public/upload/zakoni/f0787-zakon-o-radu-precisceni-tekst.pdf", detalle: "Član 76 upućuje na kolektivni ugovor. 10 x 1,3 x 10 = 130." },
    fecha: "2026-11-01",
    entrada: { region: "fbih", plata: 1760, fond: 176, sati: 10, uvecanje: 30, vrsta: null },
    esperado: { ukupno: 130, uvecanaSatnica: 13 },
  },
]);
