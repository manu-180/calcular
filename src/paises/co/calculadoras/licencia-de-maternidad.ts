import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "co.licencia-de-maternidad",
  mercado: "co",
  concepto: "propio",
  slug: "licencia-de-maternidad",
  estado: "publicado",
  requiere: {
    "co.smmlv": "numero",
    "co.licencia-maternidad-semanas": "numero",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Salario mensual al empezar la licencia", ayuda: "Sin auxilio de transporte.", min: 0 },
    {
      id: "caso",
      tipo: "opcion",
      etiqueta: "Tipo de parto",
      opciones: [
        { valor: "normal", etiqueta: "Un solo bebé, a término" },
        { valor: "multiple", etiqueta: "Parto múltiple o bebé con discapacidad (2 semanas más)" },
        { valor: "prematuro", etiqueta: "Bebé prematuro" },
      ],
      porDefecto: "normal",
    },
    {
      id: "semanasPrematuro",
      tipo: "entero",
      etiqueta: "Semanas que faltaban para el nacimiento a término",
      ayuda: "Solo si el bebé nació prematuro. Se suman a la licencia.",
      min: 0,
      max: 20,
      porDefecto: 0,
    },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.salario < valores["co.smmlv"]) throw new ErrorEntrada("El salario no puede ser menor al salario mínimo.", "salario");
    const base = valores["co.licencia-maternidad-semanas"];
    const extra = entrada.caso === "multiple" ? 2 : entrada.caso === "prematuro" ? entrada.semanasPrematuro : 0;
    const semanas = base + extra;
    const dias = semanas * 7;
    const valorDia = entrada.salario / 30;
    return {
      semanas,
      dias,
      valorDia: redondear(valorDia),
      total: redondear(valorDia * dias),
    };
  },
  resultado: [
    { clave: "semanas", etiqueta: "Semanas de licencia", formato: "numero" },
    { clave: "dias", etiqueta: "Días de licencia", formato: "dias" },
    { clave: "valorDia", etiqueta: "Valor de cada día", formato: "moneda", decimales: 0 },
    { clave: "total", etiqueta: "Total de la licencia", formato: "moneda", decimales: 0, destacada: true },
  ],
});
