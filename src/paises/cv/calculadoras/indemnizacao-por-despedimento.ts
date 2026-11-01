import { definirCalculadora } from "@/motor/calculo";

export default definirCalculadora({
  id: "cv.indemnizacao-por-despedimento",
  mercado: "cv",
  concepto: "indemnizacion-despido",
  slug: "indemnizacao-por-despedimento",
  estado: "publicado",
  requiere: {
    "cv.indemnizacao-dias-ano": "numero",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Retribuição mensal na data do despedimento", min: 0, porDefecto: 60000 },
    { id: "anos", tipo: "entero", etiqueta: "Anos completos de serviço", min: 0, max: 60, porDefecto: 5 },
    { id: "meses", tipo: "entero", etiqueta: "Meses a mais", min: 0, max: 11, porDefecto: 0 },
    {
      id: "motivo",
      tipo: "opcion",
      etiqueta: "Tipo de despedimento",
      porDefecto: "coletivo",
      opciones: [
        { valor: "coletivo", etiqueta: "Despedimento coletivo" },
        { valor: "objetiva", etiqueta: "Justa causa objetiva (extinção do posto de trabalho)" },
      ],
    },
    {
      id: "divisor",
      tipo: "entero",
      etiqueta: "Dias do mês para o valor do dia",
      min: 20,
      max: 31,
      porDefecto: 30,
      ayuda: "A lei não fixa o divisor. Trinta é o mais usado nas folhas de salário. Use o do seu contrato ou convenção, se for outro.",
    },
  ],
  calcular(entrada, valores, { redondear }) {
    const tempo = entrada.anos + entrada.meses / 12;
    const dias = valores["cv.indemnizacao-dias-ano"] * tempo;
    const valorDia = entrada.salario / entrada.divisor;
    const observaciones: string[] = [];
    if (entrada.motivo === "objetiva") {
      observaciones.push("Na justa causa objetiva a lei fixa um mínimo de 20 dias por ano de serviço. Contrato ou convenção podem prever mais.");
    }
    if (entrada.meses > 0) {
      observaciones.push("A lei só diz expressamente que a fração de ano conta proporcionalmente no despedimento coletivo.");
    }
    return {
      indemnizacao: redondear(valorDia * dias),
      dias: redondear(dias),
      valorDia: redondear(valorDia),
      observaciones,
    };
  },
  resultado: [
    { clave: "indemnizacao", etiqueta: "Indemnização", formato: "moneda", destacada: true },
    { clave: "dias", etiqueta: "Dias de retribuição devidos", formato: "dias" },
    { clave: "valorDia", etiqueta: "Valor de um dia de retribuição", formato: "moneda" },
  ],
});
