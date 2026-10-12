import { definirCalculadora, enMapa } from "@/motor/calculo";

export default definirCalculadora({
  id: "do.licencias-laborales",
  mercado: "do",
  concepto: "propio",
  slug: "licencias-laborales",
  estado: "publicado",
  requiere: {
    "do.licencias-dias": "mapa",
    "do.divisor-salario-diario": "numero",
  },
  campos: [
    { id: "motivo", tipo: "opcion-dato", etiqueta: "Motivo de la licencia", dato: "do.licencias-dias", porDefecto: "nacimiento" },
    { id: "salario", tipo: "moneda", etiqueta: "Salario mensual", min: 0 },
  ],
  calcular(entrada, valores, { redondear }) {
    const dias = enMapa(valores["do.licencias-dias"], entrada.motivo);
    const diario = redondear(entrada.salario / valores["do.divisor-salario-diario"]);
    const observaciones: string[] = ["Son días con salario completo: el empleador no puede descontarlos."];
    if (entrada.motivo === "nacimiento") observaciones.push("Para la licencia por nacimiento, la madre tiene que estar registrada en la empresa como tu esposa o compañera.");
    return { dias, diario, pago: redondear(diario * dias), observaciones };
  },
  resultado: [
    { clave: "dias", etiqueta: "Días de licencia con salario", formato: "dias", destacada: true },
    { clave: "diario", etiqueta: "Salario diario", formato: "moneda" },
    { clave: "pago", etiqueta: "Salario de esos días", formato: "moneda" },
  ],
});
