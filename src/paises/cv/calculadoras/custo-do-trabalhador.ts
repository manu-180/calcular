import { definirCalculadora, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "cv.custo-do-trabalhador",
  mercado: "cv",
  concepto: "costo-empleador",
  slug: "custo-do-trabalhador",
  estado: "publicado",
  requiere: {
    "cv.inps-empregador": "numero",
    "cv.inps-trabalhador": "numero",
    "cv.salario-minimo": "numero",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Salário bruto mensal", min: 0, porDefecto: 100000 },
    {
      id: "pagamentos",
      tipo: "entero",
      etiqueta: "Pagamentos de salário por ano",
      min: 12,
      max: 16,
      porDefecto: 12,
      ayuda: "Use mais de 12 se a empresa paga, por contrato ou convenção, subsídios equivalentes a um salário.",
    },
  ],
  calcular(entrada, valores, { redondear }) {
    const inps = redondear(porcentaje(entrada.salario, valores["cv.inps-empregador"]));
    const custoMes = redondear(entrada.salario + inps);
    const anual = redondear(entrada.salario * entrada.pagamentos + porcentaje(entrada.salario * entrada.pagamentos, valores["cv.inps-empregador"]));
    return {
      custoMes,
      inps,
      anual,
      encargo: entrada.salario > 0 ? (inps / entrada.salario) * 100 : 0,
      observaciones: ["Não entram seguros, formação, equipamento nem subsídios de alimentação ou de transporte que a empresa pague para além do salário."],
    };
  },
  resultado: [
    { clave: "custoMes", etiqueta: "Custo mensal para a empresa", formato: "moneda", destacada: true },
    { clave: "inps", etiqueta: "Contribuição patronal para o INPS", formato: "moneda" },
    { clave: "anual", etiqueta: "Custo anual com salário e INPS", formato: "moneda" },
    { clave: "encargo", etiqueta: "Encargo sobre o salário", formato: "porcentaje", decimales: 1 },
  ],
});
