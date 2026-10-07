import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "cl.sueldo-minimo",
  mercado: "cl",
  concepto: "salario-minimo",
  slug: "sueldo-minimo",
  estado: "publicado",
  requiere: {
    "cl.imm": "numero",
    "cl.imm-menores-mayores": "numero",
    "cl.imm-no-remuneracional": "numero",
    "cl.jornada-maxima": "numero",
  },
  campos: [
    {
      id: "edad",
      tipo: "opcion",
      etiqueta: "Edad de quien trabaja",
      opciones: [
        { valor: "general", etiqueta: "De 18 a 65 años" },
        { valor: "especial", etiqueta: "Menor de 18 o mayor de 65 años" },
      ],
      porDefecto: "general",
    },
    {
      id: "jornada",
      tipo: "entero",
      etiqueta: "Horas semanales de tu contrato",
      ayuda: "Si trabajas jornada completa, escribe la jornada máxima legal.",
      min: 1,
      max: 45,
      porDefecto: 42,
    },
  ],
  calcular(entrada, valores, { redondear }) {
    const maxima = valores["cl.jornada-maxima"];
    if (entrada.jornada > maxima) throw new ErrorEntrada(`La jornada máxima legal hoy es de ${maxima} horas semanales.`, "jornada");
    const minimo = entrada.edad === "general" ? valores["cl.imm"] : valores["cl.imm-menores-mayores"];
    const proporcional = (minimo * entrada.jornada) / maxima;
    return {
      minimo,
      proporcional: redondear(proporcional),
      porHora: redondear(((proporcional / 30) * 28) / (4 * entrada.jornada)),
      porDia: redondear(proporcional / 30),
      jornadaMaxima: maxima,
    };
  },
  resultado: [
    { clave: "minimo", etiqueta: "Ingreso mínimo mensual (jornada completa)", formato: "moneda" },
    { clave: "proporcional", etiqueta: "Mínimo para tu jornada", formato: "moneda", destacada: true },
    { clave: "porDia", etiqueta: "Valor por día", formato: "moneda" },
    { clave: "porHora", etiqueta: "Valor por hora", formato: "moneda" },
    { clave: "jornadaMaxima", etiqueta: "Jornada completa legal", formato: "horas" },
  ],
});
