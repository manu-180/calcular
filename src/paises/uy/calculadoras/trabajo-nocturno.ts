import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "uy.trabajo-nocturno",
  mercado: "uy",
  concepto: "propio",
  slug: "trabajo-nocturno",
  estado: "publicado",
  requiere: {
    "uy.nocturno-sobretasa": "numero",
    "uy.nocturno-horas-minimas": "numero",
  },
  campos: [
    {
      id: "modalidad",
      tipo: "opcion",
      etiqueta: "Cómo cobrás",
      opciones: [
        { valor: "mensual", etiqueta: "Sueldo mensual" },
        { valor: "hora", etiqueta: "Por hora" },
      ],
      porDefecto: "mensual",
    },
    { id: "monto", tipo: "moneda", etiqueta: "Sueldo mensual o valor de tu hora", min: 0 },
    {
      id: "divisor",
      tipo: "numero",
      etiqueta: "Horas que se dividen para sacar el valor hora",
      ayuda: "Solo para mensuales. 200 es el divisor del salario mínimo; tu laudo puede usar otro.",
      min: 1,
      max: 400,
      porDefecto: 200,
    },
    { id: "horas", tipo: "numero", etiqueta: "Horas seguidas por noche entre las 22 y las 6", min: 0, max: 8, porDefecto: 8 },
    { id: "noches", tipo: "entero", etiqueta: "Noches trabajadas en el mes", min: 0, max: 31, porDefecto: 20 },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.modalidad === "mensual" && entrada.divisor <= 0) throw new ErrorEntrada("El divisor tiene que ser mayor que cero.", "divisor");
    const valorHora = redondear(entrada.modalidad === "mensual" ? entrada.monto / entrada.divisor : entrada.monto);
    const corresponde = entrada.horas > valores["uy.nocturno-horas-minimas"];
    const recargoHora = redondear(porcentaje(valorHora, valores["uy.nocturno-sobretasa"]));
    const total = corresponde ? redondear(recargoHora * entrada.horas * entrada.noches) : 0;
    const observaciones: string[] = [];
    if (!corresponde) observaciones.push("La sobretasa corresponde solo si trabajás más de cinco horas seguidas entre las 22 y las 6.");
    observaciones.push("Tu laudo puede fijar una compensación mayor o una reducción del horario en lugar del recargo.");
    return { valorHora, recargoHora, corresponde: corresponde ? "Sí" : "No", total, observaciones };
  },
  resultado: [
    { clave: "valorHora", etiqueta: "Valor de tu hora común", formato: "moneda" },
    { clave: "corresponde", etiqueta: "Te corresponde la sobretasa", formato: "texto" },
    { clave: "recargoHora", etiqueta: "Recargo por hora nocturna", formato: "moneda" },
    { clave: "total", etiqueta: "Extra por trabajo nocturno en el mes", formato: "moneda", destacada: true },
  ],
});
