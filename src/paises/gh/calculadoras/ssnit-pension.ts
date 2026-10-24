import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "gh.ssnit-pension",
  mercado: "gh",
  concepto: "jubilacion",
  slug: "ssnit-pension",
  estado: "publicado",
  requiere: {
    "gh.pension-min-months": "numero",
    "gh.pension-min-right": "numero",
    "gh.pension-max-right": "numero",
    "gh.pension-yearly-step": "numero",
    "gh.pension-full-age": "numero",
  },
  campos: [
    { id: "promedio", tipo: "moneda", etiqueta: "Average of your three best years' annual salaries", min: 0, porDefecto: 60000 },
    { id: "meses", tipo: "entero", etiqueta: "Months you have contributed", min: 0, max: 720, porDefecto: 300 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.promedio <= 0) throw new ErrorEntrada("Enter the average of your best three years.", "promedio");
    const minimo = v["gh.pension-min-months"];
    const observaciones: string[] = [];
    if (entrada.meses < minimo) {
      observaciones.push(`You need at least ${minimo} months of contributions for an old age pension.`);
      return { mensual: null, anual: null, derecho: null, observaciones };
    }
    const anios = Math.floor((entrada.meses - minimo) / 12);
    const derecho = Math.min(v["gh.pension-max-right"], v["gh.pension-min-right"] + anios * v["gh.pension-yearly-step"]);
    const anual = porcentaje(entrada.promedio, derecho);
    observaciones.push(`This is the full pension from age ${v["gh.pension-full-age"]}. Retiring earlier gives a reduced pension.`);
    return { mensual: redondear(anual / 12), anual: redondear(anual), derecho, observaciones };
  },
  resultado: [
    { clave: "mensual", etiqueta: "Estimated monthly pension", formato: "moneda", destacada: true },
    { clave: "anual", etiqueta: "Estimated yearly pension", formato: "moneda" },
    { clave: "derecho", etiqueta: "Your pension right", formato: "porcentaje", decimales: 3 },
  ],
});
