import { definirCasos } from "@/motor/calculo";
import calculadora from "./land-registration-fees";

// Solo la fórmula, con las tasas pisadas: los datos todavía no están verificados.
export default definirCasos(calculadora, [
  {
    nombre: "Inmueble de 60.000",
    origen: { tipo: "recalculado", detalle: "60.000 × 4 % = 2.400 por cada concepto. Total 4.800." },
    fecha: "2026-10-24",
    entrada: { precio: 60000 },
    valores: { "jo.land-registration-fee": 4, "jo.property-sales-tax": 4 },
    esperado: { registro: 2400, impuesto: 2400, total: 4800 },
  },
]);
