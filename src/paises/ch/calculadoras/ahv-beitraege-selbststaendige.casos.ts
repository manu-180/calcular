import { definirCasos } from "@/motor/calculo";
import ahvBeitraegeSelbststaendige from "./ahv-beitraege-selbststaendige";

const MB202 = "https://www.ahv-iv.ch/p/2.02.d";

export default definirCasos(ahvBeitraegeSelbststaendige, [
  {
    nombre: "50 000 Franken in der sinkenden Skala",
    origen: { tipo: "recalculado", url: MB202, detalle: "Stufe 48 000 bis unter 50 500: 7,840 %. 50 000 × 7,84 % = 3920." },
    fecha: "2026-10-14",
    entrada: { einkommen: 50000 },
    esperado: { satz: 7.84, beitrag: 3920, monat: 326.67 },
  },
  {
    nombre: "Ab 60 500 Franken voller Satz",
    origen: { tipo: "recalculado", url: MB202, detalle: "60 500 × 10 % = 6050." },
    fecha: "2026-10-14",
    entrada: { einkommen: 60500 },
    esperado: { satz: 10, beitrag: 6050 },
  },
  {
    nombre: "Unterste Stufe",
    origen: { tipo: "recalculado", url: MB202, detalle: "10 100 × 5,371 % = 542,471 → 542,47." },
    fecha: "2026-10-14",
    entrada: { einkommen: 10100 },
    esperado: { satz: 5.371, beitrag: 542.47 },
  },
  {
    nombre: "Mindestbeitrag",
    origen: { tipo: "oficial", url: MB202, detalle: "Unter 10 100 Franken Einkommen: Mindestbeitrag 530 Franken." },
    fecha: "2026-10-14",
    entrada: { einkommen: 6000 },
    esperado: { beitrag: 530, satz: null },
  },
]);
