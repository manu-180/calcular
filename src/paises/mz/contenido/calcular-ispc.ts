import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "mz.calcular-ispc",
  h1: "Calcular o ISPC do trimestre",
  title: "ISPC {{anio}}: calcular o imposto dos pequenos contribuintes",
  description: "Quanto ISPC paga no trimestre com as taxas de {{anio}}: {{mz.ispc-comercio[0].tasa}} a {{mz.ispc-comercio[-1].tasa}} no comércio, {{mz.ispc-servicos}} nos serviços e {{mz.ispc-liberais}} nas profissões liberais.",
  intro: [
    "O Imposto Simplificado para Pequenos Contribuintes (ISPC) substitui o IVA e o IRPS ou o IRPC para quem tem um volume de negócios anual até {{mz.ispc-limite}} e escolhe este regime.",
    "Desde {{mz.ispc-limite#desde}} a taxa depende da actividade e o imposto é pago por trimestre, sobre as vendas ou serviços desse trimestre.",
  ],
  comoSeCalcula: [
    "Comércio, indústria, agricultura e artesanato: {{mz.ispc-comercio[0].tasa}} com volume anual até {{mz.ispc-comercio[0].hasta}}, {{mz.ispc-comercio[1].tasa}} até {{mz.ispc-comercio[1].hasta}} e {{mz.ispc-comercio[2].tasa}} até {{mz.ispc-comercio[2].hasta}}.",
    "Serviços como canalização, carpintaria ou mecânica: {{mz.ispc-servicos}}. Profissões liberais e consultores: {{mz.ispc-liberais}}.",
    "A parte das vendas do ano que passa o limite paga {{mz.ispc-excesso}}.",
    "Se o imposto do trimestre ficar abaixo de {{mz.ispc-minimo}}, não há pagamento, mas a declaração continua obrigatória.",
  ],
  ejemplo: ["Uma loja com 800 000 MT de vendas por ano paga 3 %. Num trimestre de 200 000 MT de vendas, o ISPC é 6 000 MT."],
  faq: [
    {
      pregunta: "Quem pode optar pelo ISPC?",
      respuesta: "Pessoas e empresas com actividade agrícola, pesqueira, comercial, industrial, de artesanato ou de prestação de serviços, com volume de negócios anual até {{mz.ispc-limite}} e sem contabilidade organizada obrigatória. Não pode quem tem vários estabelecimentos ou participações noutras sociedades.",
    },
    {
      pregunta: "Quem está no ISPC cobra IVA?",
      respuesta: "Não. As facturas de quem está no ISPC não devem incluir IVA, e os rendimentos dessa actividade não pagam IRPS nem IRPC.",
    },
    {
      pregunta: "Quando se paga o ISPC?",
      respuesta: "Por trimestre, nas unidades de cobrança da Autoridade Tributária ou pelos outros meios de pagamento aceites, junto com a declaração trimestral.",
    },
    {
      pregunta: "Quanto tempo um profissional liberal pode ficar no ISPC?",
      respuesta: "No máximo cinco anos, seja qual for o volume de negócios. O prazo conta desde a entrada em vigor da Lei n.º 9/2025.",
    },
  ],
  glosario: [
    { termino: "ISPC", definicion: "Imposto Simplificado para Pequenos Contribuintes, criado pela Lei n.º 5/2009 e revisto pela Lei n.º 9/2025." },
    { termino: "Volume de negócios", definicion: "O total das vendas e dos serviços facturados no período." },
  ],
});
