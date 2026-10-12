import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "cr.salario-escolar",
  mercado: "cr",
  concepto: "propio",
  slug: "salario-escolar",
  estado: "publicado",
  requiere: {
    "cr.salario-escolar": "mapa",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Salario bruto mensual", min: 0 },
    {
      id: "porcentaje",
      tipo: "porcentaje",
      etiqueta: "Porcentaje que eligió ahorrar",
      ayuda: "La ley permite entre 4,16 % y 8,33 % del salario.",
      min: 0,
      max: 100,
      porDefecto: 8.33,
    },
    { id: "meses", tipo: "entero", etiqueta: "Meses de ahorro en el año", min: 1, max: 12, porDefecto: 12 },
  ],
  calcular(entrada, valores, { redondear }) {
    const minimo = enMapa(valores["cr.salario-escolar"], "minimo");
    const maximo = enMapa(valores["cr.salario-escolar"], "maximo");
    if (entrada.porcentaje < minimo || entrada.porcentaje > maximo) {
      throw new ErrorEntrada(`El porcentaje tiene que estar entre ${String(minimo).replace(".", ",")} % y ${String(maximo).replace(".", ",")} %.`, "porcentaje");
    }
    const mensual = redondear(porcentaje(entrada.salario, entrada.porcentaje));
    return {
      mensual,
      total: redondear(mensual * entrada.meses),
      netoMensual: redondear(entrada.salario - mensual),
      observaciones: [
        "El salario escolar no paga renta ni cargas sociales otra vez: ya se rebajaron del salario bruto.",
        "Esta calculadora es para el sector privado. En el sector público el salario escolar tiene reglas propias.",
      ],
    };
  },
  resultado: [
    { clave: "mensual", etiqueta: "Ahorro por mes", formato: "moneda" },
    { clave: "netoMensual", etiqueta: "Salario del mes después del ahorro (antes de rebajos)", formato: "moneda" },
    { clave: "total", etiqueta: "Salario escolar que recibe en enero", formato: "moneda", destacada: true },
  ],
});
