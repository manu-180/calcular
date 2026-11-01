import { definirCasos } from "@/motor/calculo";
import calculadora from "./impot-sur-les-societes";

export default definirCasos(calculadora, [
  {
    nombre: "Real normal: manda el mínimo del 2 %",
    origen: { tipo: "recalculado", detalle: "Art. 51 CGI: 25 % de 2.000.000 = 500.000; 2 % de 50.000.000 = 1.000.000. Se paga el mayor: 1.000.000 (50 % del beneficio)." },
    fecha: "2026-10-29",
    entrada: { regime: "reel-normal", benefice: 2000000, produits: 50000000 },
    esperado: { impot: 1000000, surBenefice: 500000, surProduits: 1000000, base: "الحد الأدنى النسبي على المداخيل", effectif: 50 },
  },
  {
    nombre: "Intermedio: manda el 25 %",
    origen: { tipo: "recalculado", detalle: "25 % de 1.000.000 = 250.000; 2,5 % de 8.000.000 = 200.000. IS 250.000." },
    fecha: "2026-10-29",
    entrada: { regime: "intermediaire", benefice: 1000000, produits: 8000000 },
    esperado: { impot: 250000, base: "النسبة العادية على الربح", effectif: 25 },
  },
  {
    nombre: "Pérdida en real normal: mínimo de percepción",
    origen: { tipo: "recalculado", detalle: "Beneficio 0; 2 % de 3.000.000 = 60.000 < 100.000 (mínimo de percepción del real normal)." },
    fecha: "2026-10-29",
    entrada: { regime: "reel-normal", benefice: 0, produits: 3000000 },
    esperado: { impot: 100000, base: "الحد الأدنى للتحصيل", effectif: null },
  },
  {
    nombre: "Sin datos",
    origen: { tipo: "recalculado", detalle: "Todo en cero." },
    fecha: "2026-10-29",
    entrada: { regime: "reel-normal", benefice: 0, produits: 0 },
    esperaError: true,
  },
]);
