import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "br.insalubridade",
  h1: "Cálculo do adicional de insalubridade {{anio}}",
  title: "Adicional de insalubridade {{anio}}: grau mínimo, médio e máximo",
  description: "Calcule o adicional de insalubridade de {{anio}}: {{br.insalubridade[minimo]}}, {{br.insalubridade[medio]}} ou {{br.insalubridade[maximo]}} do salário mínimo de {{br.salario-minimo}}.",
  intro: [
    "Quem trabalha exposto a agentes nocivos à saúde acima dos limites do Ministério do Trabalho recebe o adicional de insalubridade.",
    "O grau (mínimo, médio ou máximo) sai do laudo técnico. Escolha o grau e veja o valor por mês.",
  ],
  comoSeCalcula: [
    "A CLT fixa {{br.insalubridade[minimo]}} no grau mínimo, {{br.insalubridade[medio]}} no médio e {{br.insalubridade[maximo]}} no máximo.",
    "O percentual se aplica sobre o salário mínimo de {{br.salario-minimo}}, salvo regra mais favorável em convenção coletiva.",
    "O adicional se soma ao salário e entra no 13º, nas férias, no FGTS e no INSS.",
  ],
  ejemplo: ["No grau médio, o adicional é 20 % de R$ 1.621, ou R$ 324,20 por mês."],
  faq: [
    {
      pregunta: "Quem define o grau de insalubridade?",
      respuesta: "Um laudo de médico ou engenheiro do trabalho, com base nas normas regulamentadoras do Ministério do Trabalho.",
    },
    {
      pregunta: "O adicional é sobre o salário mínimo ou sobre o meu salário?",
      respuesta: "Pela CLT, sobre o salário mínimo. Algumas convenções coletivas usam o salário-base, e aí o valor é maior.",
    },
    {
      pregunta: "Posso receber insalubridade e periculosidade juntas?",
      respuesta: "Não. Quem tem direito às duas escolhe a que for melhor.",
    },
  ],
  glosario: [
    { termino: "Laudo técnico", definicion: "Documento que mede a exposição a agentes nocivos e define o grau de insalubridade." },
  ],
});
