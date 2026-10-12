import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "uy.plazo-fijo",
  h1: "Calculadora de plazo fijo en Uruguay",
  title: "Plazo fijo en Uruguay: cuánto ganás después del IRPF",
  description:
    "Calculá los intereses de un plazo fijo en pesos, UI o dólares y el IRPF que te retiene el banco: {{uy.irpf-intereses[uyu-1]}} en pesos a un año o menos.",
  intro: [
    "Un plazo fijo te paga intereses por dejar tu plata en el banco un tiempo. Sobre esos intereses el banco te retiene IRPF, con una tasa que depende de la moneda y del plazo.",
    "Poné el monto, la moneda, la tasa que te ofrecen y los días. Te decimos cuánto ganás limpio.",
  ],
  comoSeCalcula: [
    "Intereses: monto por tasa anual por días, dividido entre 365.",
    "IRPF en pesos con tasa fija: {{uy.irpf-intereses[uyu-1]}} a un año o menos, {{uy.irpf-intereses[uyu-3]}} de uno a tres años y {{uy.irpf-intereses[uyu-mas]}} a más de tres.",
    "En UI: {{uy.irpf-intereses[ui-1]}}, {{uy.irpf-intereses[ui-3]}} y {{uy.irpf-intereses[ui-mas]}}. En dólares: {{uy.irpf-intereses[usd-1]}} a un año o menos y {{uy.irpf-intereses[usd-mas]}} a más de un año.",
  ],
  ejemplo: ["$ 100.000 a 180 días al 5 % dan $ 2.465,75 de intereses. Después del IRPF te quedan $ 2.330,13."],
  faq: [
    {
      pregunta: "¿Cuánto IRPF se paga por un plazo fijo?",
      respuesta: "Depende de la moneda y del plazo. En pesos a un año o menos, {{uy.irpf-intereses[uyu-1]}}. En dólares a un año o menos, {{uy.irpf-intereses[usd-1]}}.",
    },
    {
      pregunta: "¿Conviene un plazo fijo en pesos, en UI o en dólares?",
      respuesta: "En pesos la tasa suele ser más alta pero la inflación se come una parte. En UI el capital se ajusta por inflación. En dólares dependés del tipo de cambio. Compará el resultado neto con la inflación esperada.",
    },
    {
      pregunta: "¿Dónde veo las tasas de los bancos?",
      respuesta: "Cada banco publica las suyas. El Banco Central publica cada mes las tasas promedio del sistema.",
    },
  ],
  glosario: [
    { termino: "TNA", definicion: "Tasa nominal anual. La que te ofrece el banco por un año." },
    { termino: "UI", definicion: "Unidad Indexada. Sube con la inflación." },
  ],
});
