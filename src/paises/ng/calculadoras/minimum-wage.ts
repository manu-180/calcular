import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { naira } from "../lib/impuestos";

export default definirCalculadora({
  id: "ng.minimum-wage",
  mercado: "ng",
  concepto: "salario-minimo",
  slug: "minimum-wage",
  estado: "publicado",
  requiere: {
    "ng.minimum-wage": "numero",
  },
  campos: [{ id: "sueldo", tipo: "moneda", etiqueta: "Your pay a month (optional)", requerido: false, min: 0 }],
  calcular(entrada, v, { redondear }) {
    const minimo = v["ng.minimum-wage"];
    if (entrada.sueldo !== null && entrada.sueldo < 0) throw new ErrorEntrada("Pay cannot be negative.", "sueldo");
    const observaciones: string[] = [];
    let diferencia: number | null = null;
    if (entrada.sueldo !== null) {
      diferencia = redondear(entrada.sueldo - minimo);
      observaciones.push(
        diferencia >= 0
          ? `Your pay is ${naira(diferencia)} above the national minimum wage.`
          : `Your pay is ${naira(-diferencia)} below the national minimum wage.`,
      );
      if (entrada.sueldo <= minimo) observaciones.push("At the minimum wage or less, the job is exempt from income tax.");
    }
    return { mensual: minimo, anual: redondear(minimo * 12), diferencia, observaciones };
  },
  resultado: [
    { clave: "mensual", etiqueta: "National minimum wage a month", formato: "moneda", destacada: true },
    { clave: "anual", etiqueta: "A year", formato: "moneda" },
    { clave: "diferencia", etiqueta: "Your pay minus the minimum", formato: "moneda" },
  ],
});
