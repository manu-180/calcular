import { definirCasos } from "@/motor/calculo";
import calculatorTva from "./calculator-tva";

const CF = "https://static.anaf.ro/static/10/Anaf/legislatie/Cod_fiscal_norme_2023.htm";

export default definirCasos(calculatorTva, [
  {
    nombre: "1.000 lei plus TVA 21 %",
    origen: { tipo: "recalculado", url: CF, detalle: "Codul fiscal, art. 291 alin. (1): 1.000 × 21 % = 210; total 1.210 lei." },
    fecha: "2026-10-24",
    entrada: { operatie: "adauga", suma: 1000, cota: "standard" },
    esperado: { tva: 210, cuTva: 1210, cota: 21 },
  },
  {
    nombre: "TVA inclus în 121 lei",
    origen: { tipo: "recalculado", url: CF, detalle: "121 / 1,21 = 100; TVA 21 lei." },
    fecha: "2026-10-24",
    entrada: { operatie: "scoate", suma: 121, cota: "standard" },
    esperado: { faraTva: 100, tva: 21 },
  },
  {
    nombre: "Alimente cu cota redusă de 11 %",
    origen: { tipo: "recalculado", url: CF, detalle: "Codul fiscal, art. 291 alin. (2): 200 × 11 % = 22; total 222 lei." },
    fecha: "2026-10-24",
    entrada: { operatie: "adauga", suma: 200, cota: "redusa" },
    esperado: { tva: 22, cuTva: 222, cota: 11 },
  },
  {
    nombre: "Prima zi cu cota de 21 %",
    origen: { tipo: "recalculado", url: CF, detalle: "Cotele de 21 % și 11 % se aplică de la 1 august 2025 (Legea nr. 141/2025). 50 × 21 % = 10,50." },
    fecha: "2025-08-01",
    entrada: { operatie: "adauga", suma: 50, cota: "standard" },
    esperado: { tva: 10.5, cuTva: 60.5 },
  },
  {
    nombre: "Preț zero",
    origen: { tipo: "recalculado", url: CF, detalle: "Fără preț nu există calcul." },
    fecha: "2026-10-24",
    entrada: { operatie: "adauga", suma: 0, cota: "standard" },
    esperaError: true,
  },
]);
