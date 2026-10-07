import { definirCalculadora } from "@/motor/calculo";

export default definirCalculadora({
  id: "uy.salario-minimo",
  mercado: "uy",
  concepto: "salario-minimo",
  slug: "salario-minimo",
  estado: "publicado",
  requiere: {
    "uy.smn": "numero",
    "uy.smn-divisor-jornal": "numero",
    "uy.smn-divisor-hora": "numero",
  },
  campos: [
    {
      id: "horas",
      tipo: "numero",
      etiqueta: "Horas que trabajás en el mes",
      ayuda: "Opcional. Si trabajás medio horario o por hora, te mostramos el mínimo para esas horas.",
      min: 0,
      max: 400,
      requerido: false,
    },
  ],
  calcular(entrada, valores, { redondear }) {
    const mensual = valores["uy.smn"];
    const porHora = redondear(mensual / valores["uy.smn-divisor-hora"]);
    return {
      mensual,
      jornal: redondear(mensual / valores["uy.smn-divisor-jornal"]),
      porHora,
      paraTusHoras: entrada.horas === null ? null : redondear(porHora * entrada.horas),
      observaciones: ["Es el piso para todo el país. Muchos sectores tienen un laudo más alto fijado por el Consejo de Salarios."],
    };
  },
  resultado: [
    { clave: "mensual", etiqueta: "Salario Mínimo Nacional mensual", formato: "moneda", destacada: true },
    { clave: "jornal", etiqueta: "Jornal mínimo (mensual / 25)", formato: "moneda" },
    { clave: "porHora", etiqueta: "Mínimo por hora (mensual / 200)", formato: "moneda" },
    { clave: "paraTusHoras", etiqueta: "Mínimo para tus horas", formato: "moneda" },
  ],
});
