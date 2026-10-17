import { definirCasos } from "@/motor/calculo";
import calculadora from "./vakantiegeld-berekenen";

const RSZ = "https://www.socialsecurity.be/employer/instructions/dmfa/nl/latest/instructions/salary/particularcases/holidaypay.html" as const;

export default definirCasos(calculadora, [
  {
    nombre: "Bediende, € 3.100, volledig jaar",
    origen: { tipo: "recalculado", url: RSZ, detalle: "92 % × 3.100 = 2.852. RSZ 13,07 % op 85/92 = 2.635 → 344,39. Na RSZ 2.507,61." },
    fecha: "2026-10-14",
    entrada: { situatie: "bediende", maandloon: 3100, maanden: 12, jaarloon: null },
    esperado: { vakantiegeld: 2852, rsz: 344.39, naRsz: 2507.61 },
  },
  {
    nombre: "Bediende, € 3.100, 9 maanden gewerkt",
    origen: { tipo: "recalculado", url: RSZ, detalle: "2.852 × 9 ÷ 12 = 2.139. RSZ 13,07 % × 2.139 × 85/92 = 1.976,25 → 258,30." },
    fecha: "2026-10-14",
    entrada: { situatie: "bediende", maandloon: 3100, maanden: 9, jaarloon: null },
    esperado: { vakantiegeld: 2139, rsz: 258.3 },
  },
  {
    nombre: "Arbeider, € 30.000 brutoloon vorig jaar",
    origen: { tipo: "recalculado", url: RSZ, detalle: "30.000 × 108 % = 32.400; × 15,38 % = 4.983,12." },
    fecha: "2026-10-14",
    entrada: { situatie: "arbeider", maandloon: 3000, maanden: 12, jaarloon: 30000 },
    esperado: { vakantiegeld: 4983.12, rsz: null },
  },
  {
    nombre: "Vertrekvakantiegeld op € 20.000",
    origen: { tipo: "recalculado", url: RSZ, detalle: "15,34 % × 20.000 = 3.068." },
    fecha: "2026-10-14",
    entrada: { situatie: "vertrek", maandloon: 3000, maanden: 12, jaarloon: 20000 },
    esperado: { vakantiegeld: 3068 },
  },
  {
    nombre: "Arbeider zonder loon is geen geldige invoer",
    origen: { tipo: "recalculado", detalle: "Zonder brutoloon valt er niets te berekenen." },
    fecha: "2026-10-14",
    entrada: { situatie: "arbeider", maandloon: 3000, maanden: 12, jaarloon: null },
    esperaError: true,
  },
]);
