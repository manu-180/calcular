import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "br.periculosidade",
  h1: "Cálculo do adicional de periculosidade",
  title: "Adicional de periculosidade: {{br.periculosidade}} do salário",
  description: "Calcule o adicional de periculosidade de {{br.periculosidade}} sobre o salário-base para quem trabalha com inflamáveis, explosivos, eletricidade, segurança ou moto.",
  intro: [
    "Quem trabalha exposto a risco acentuado tem direito ao adicional de periculosidade de {{br.periculosidade}} do salário-base.",
    "Informe o salário-base, sem gratificações, prêmios e participação nos lucros, e veja o adicional.",
  ],
  comoSeCalcula: [
    "O adicional é {{br.periculosidade}} do salário-base.",
    "Gratificações, prêmios e participação nos lucros não entram na base.",
    "O valor se soma ao salário e reflete no 13º, nas férias, no FGTS e no INSS.",
  ],
  ejemplo: ["Com salário-base de R$ 3.000, o adicional é de R$ 900 e o salário vai para R$ 3.900."],
  faq: [
    {
      pregunta: "Quem tem direito à periculosidade?",
      respuesta: "Quem tem contato permanente com inflamáveis, explosivos ou energia elétrica, vigilantes e seguranças, agentes de trânsito e quem trabalha de moto.",
    },
    {
      pregunta: "O adicional é sobre o salário total?",
      respuesta: "Não. É sobre o salário-base, sem gratificações, prêmios ou participação nos lucros.",
    },
    {
      pregunta: "Posso receber periculosidade e insalubridade?",
      respuesta: "Não ao mesmo tempo. Quem tem direito às duas escolhe uma.",
    },
  ],
  glosario: [
    { termino: "Risco acentuado", definicion: "Exposição permanente a situações perigosas definidas em lei e nas normas do Ministério do Trabalho." },
  ],
});
