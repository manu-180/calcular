import { definirCalculadora } from "@/motor/calculo";
import { DIAS_DEL_MES } from "../lib/laboral";

export default definirCalculadora({
  id: "bo.domingo-trabajado",
  mercado: "bo",
  concepto: "propio",
  slug: "domingo-trabajado",
  estado: "publicado",
  requiere: {
    "bo.domingo-trabajado-factor": "numero",
  },
  campos: [
    { id: "haberBasico", tipo: "moneda", etiqueta: "Haber básico mensual", min: 0 },
    { id: "domingos", tipo: "entero", etiqueta: "Domingos que trabajó en el mes", min: 1, max: 5, porDefecto: 1 },
  ],
  calcular(entrada, valores, { redondear }) {
    const factor = valores["bo.domingo-trabajado-factor"];
    const diario = entrada.haberBasico / DIAS_DEL_MES;
    // La ley dice "pago triple". El sueldo mensual ya paga el domingo una vez, así que lo que se suma
    // al sueldo es el factor menos uno. Es nuestra lectura y la página lo explica.
    const pagoTotal = redondear(diario * factor * entrada.domingos);
    const adicional = redondear(diario * (factor - 1) * entrada.domingos);
    return {
      diario: redondear(diario),
      pagoTotal,
      adicional,
      observaciones: [
        "Su sueldo mensual ya incluye el domingo. Lo que tiene que sumarse a su boleta es la diferencia.",
        "Las horas extras del domingo, si las hubo, se pagan aparte.",
      ],
    };
  },
  resultado: [
    { clave: "diario", etiqueta: "Salario de un día", formato: "moneda" },
    { clave: "pagoTotal", etiqueta: "Pago total por los domingos trabajados", formato: "moneda" },
    { clave: "adicional", etiqueta: "Se suma a su sueldo del mes", formato: "moneda", destacada: true },
  ],
});
