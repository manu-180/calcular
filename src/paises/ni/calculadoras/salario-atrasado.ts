import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { diasEntre } from "@/motor/vigencia";

export default definirCalculadora({
  id: "ni.salario-atrasado",
  mercado: "ni",
  concepto: "propio",
  slug: "salario-atrasado",
  estado: "publicado",
  requiere: {
    "ni.atraso-salario-recargo": "numero",
    "ni.atraso-salario-semanas": "numero",
  },
  campos: [
    { id: "monto", tipo: "moneda", etiqueta: "Salario que te deben", min: 0 },
    { id: "fechaDebida", tipo: "fecha", etiqueta: "Día en que te tenían que pagar" },
    { id: "fechaPago", tipo: "fecha", etiqueta: "Día en que te pagaron (o hoy, si todavía no te pagan)", porDefecto: "hoy" },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.fechaPago < entrada.fechaDebida) throw new ErrorEntrada("La fecha de pago no puede ser anterior al día en que te tenían que pagar.", "fechaPago");
    const dias = diasEntre(entrada.fechaDebida, entrada.fechaPago);
    const semanas = Math.floor(dias / 7);
    // Art. 86: la primera semana de retraso no genera recargo; solo las que le siguen, completas y con tope.
    const semanasConRecargo = Math.min(Math.max(semanas - 1, 0), valores["ni.atraso-salario-semanas"]);
    const recargo = redondear(porcentaje(entrada.monto, valores["ni.atraso-salario-recargo"]) * semanasConRecargo);
    const observaciones =
      semanasConRecargo === 0
        ? ["Todavía no corresponde recargo: empieza a contar cuando se cumple la segunda semana completa de retraso."]
        : ["El recargo no corre si el atraso se debe a fuerza mayor o caso fortuito. Si no te pagan, podés reclamar en la Inspectoría Departamental del Trabajo."];
    return { dias, semanasConRecargo, recargo, total: redondear(entrada.monto + recargo), observaciones };
  },
  resultado: [
    { clave: "dias", etiqueta: "Días de retraso", formato: "dias" },
    { clave: "semanasConRecargo", etiqueta: "Semanas con recargo", formato: "numero" },
    { clave: "recargo", etiqueta: "Recargo por el atraso", formato: "moneda", destacada: true },
    { clave: "total", etiqueta: "Total que te tienen que pagar", formato: "moneda" },
  ],
});
