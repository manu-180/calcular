import { definirCasos } from "@/motor/calculo";
import prisbasbelopp from "./prisbasbelopp";

const BELOPP = "https://skatteverket.se/download/18.1522bf3f19aea8075ba3285/1767885159120/belopp-och-procentsatser-for-inkomstaret-2026.pdf";

export default definirCasos(prisbasbelopp, [
  {
    nombre: "Ett prisbasbelopp 2026",
    origen: { tipo: "oficial", url: BELOPP, detalle: "Prisbasbelopp 2026: 59 200 kronor." },
    fecha: "2026-10-24",
    entrada: { antal: 1, typ: "pbb" },
    esperado: { belopp: 59200 },
  },
  {
    nombre: "Tio prisbasbelopp (taket för SGI)",
    origen: { tipo: "recalculado", url: BELOPP, detalle: "10 × 59 200 = 592 000 kronor." },
    fecha: "2026-10-24",
    entrada: { antal: 10, typ: "pbb" },
    esperado: { belopp: 592000, perManad: 49333.33 },
  },
  {
    nombre: "8,07 inkomstbasbelopp (taket för pensionsavgiften)",
    origen: { tipo: "recalculado", url: BELOPP, detalle: "Inkomstbasbelopp 83 400. 8,07 × 83 400 = 673 038 kronor." },
    fecha: "2026-10-24",
    entrada: { antal: 8.07, typ: "ibb" },
    esperado: { belopp: 673038 },
  },
  {
    nombre: "Förhöjt prisbasbelopp",
    origen: { tipo: "oficial", url: BELOPP, detalle: "Förhöjt prisbasbelopp 2026: 60 500 kronor." },
    fecha: "2026-10-24",
    entrada: { antal: 1, typ: "forhojt" },
    esperado: { belopp: 60500 },
  },
]);
