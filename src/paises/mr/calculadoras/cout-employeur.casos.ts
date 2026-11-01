import { definirCasos } from "@/motor/calculo";
import calculadora from "./cout-employeur";

export default definirCasos(calculadora, [
  {
    nombre: "Bruto 30.000, régimen real con CNAM",
    origen: {
      tipo: "recalculado",
      detalle: "CNSS 13 % de 15.000 = 1.950; medicina del trabajo 2 % de 15.000 = 300; CNAM 5 % de 30.000 = 1.500; taxe d'apprentissage 0,6 % de 30.000 = 180. Cargas 3.930 (13,1 %). Costo 33.930.",
    },
    fecha: "2026-10-29",
    entrada: { brut: 30000, cnam: true, reel: true },
    esperado: { cnss: 1950, medecine: 300, cnam: 1500, apprentissage: 180, charges: 3930, cout: 33930, taux: 13.1, annuel: 407160 },
  },
  {
    nombre: "Bruto 10.000 sin CNAM ni régimen real",
    origen: { tipo: "recalculado", detalle: "13 % + 2 % de 10.000 = 1.500. Costo 11.500." },
    fecha: "2026-10-29",
    entrada: { brut: 10000, cnam: false, reel: false },
    esperado: { charges: 1500, cout: 11500, cnam: 0, apprentissage: 0 },
  },
  {
    nombre: "Sin bruto",
    origen: { tipo: "recalculado", detalle: "Bruto 0." },
    fecha: "2026-10-29",
    entrada: { brut: 0, cnam: true, reel: true },
    esperaError: true,
  },
]);
