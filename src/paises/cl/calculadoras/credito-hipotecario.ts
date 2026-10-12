import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "cl.credito-hipotecario",
  mercado: "cl",
  concepto: "propio",
  slug: "credito-hipotecario",
  estado: "publicado",
  requiere: {
    "cl.uf": "serie",
  },
  campos: [
    { id: "valor", tipo: "numero", etiqueta: "Valor de la propiedad en UF", min: 0, porDefecto: 3000 },
    { id: "pie", tipo: "porcentaje", etiqueta: "Pie", ayuda: "La parte que pagas al contado. Los bancos suelen pedir 10 % a 20 %.", min: 0, max: 100, porDefecto: 20 },
    { id: "tasa", tipo: "porcentaje", etiqueta: "Tasa anual del crédito", ayuda: "La que te ofrece el banco, sobre la UF.", min: 0, max: 30, porDefecto: 4.5 },
    { id: "plazo", tipo: "entero", etiqueta: "Plazo en años", min: 1, max: 40, porDefecto: 25 },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.pie >= 100) throw new ErrorEntrada("Con un pie de 100 % no necesitas crédito.", "pie");
    if (entrada.tasa > 30) throw new ErrorEntrada("Revisa la tasa: es muy alta para un crédito hipotecario.", "tasa");
    const uf = valores["cl.uf"].valor;
    const credito = entrada.valor - porcentaje(entrada.valor, entrada.pie);
    const meses = entrada.plazo * 12;
    // Cuota fija (sistema francés) con tasa mensual = tasa anual / 12. Es una aproximación: cada banco
    // fija su convención en el contrato.
    const i = entrada.tasa / 100 / 12;
    const dividendoUf = i === 0 ? credito / meses : (credito * i) / (1 - Math.pow(1 + i, -meses));
    const totalUf = dividendoUf * meses;
    return {
      creditoUf: credito,
      pieUf: entrada.valor - credito,
      dividendoUf,
      dividendo: redondear(dividendoUf * uf),
      totalUf,
      interesesUf: totalUf - credito,
      rentaSugerida: redondear((dividendoUf * uf) / 0.25),
      valorUf: uf,
      observaciones: ["El dividendo real suma los seguros de desgravamen e incendio, que dependen del banco y de tu edad."],
    };
  },
  resultado: [
    { clave: "dividendo", etiqueta: "Dividendo mensual aproximado (sin seguros)", formato: "moneda", destacada: true },
    { clave: "dividendoUf", etiqueta: "Dividendo en UF", formato: "numero", decimales: 2 },
    { clave: "creditoUf", etiqueta: "Monto del crédito (UF)", formato: "numero", decimales: 2 },
    { clave: "pieUf", etiqueta: "Pie (UF)", formato: "numero", decimales: 2 },
    { clave: "totalUf", etiqueta: "Total pagado al banco (UF)", formato: "numero", decimales: 2 },
    { clave: "interesesUf", etiqueta: "Intereses en todo el plazo (UF)", formato: "numero", decimales: 2 },
    { clave: "rentaSugerida", etiqueta: "Renta para que el dividendo sea 25 % del ingreso", formato: "moneda" },
    { clave: "valorUf", etiqueta: "UF usada", formato: "moneda", decimales: 2 },
  ],
});
