import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "pl.maly-zus-plus",
  h1: "Kalkulator małego ZUS plus",
  title: "Mały ZUS plus: kalkulator podstawy i składek",
  description:
    "Sprawdź, czy masz prawo do małego ZUS plus, i policz podstawę oraz składki od dochodu z poprzedniego roku. Limit przychodu to {{pl.limit-malego-zus}}.",
  intro: [
    "Mały ZUS plus obniża składki społeczne przedsiębiorcom, których przychód z działalności w poprzednim roku nie przekroczył {{pl.limit-malego-zus}}. Podstawa składek zależy od dochodu z poprzedniego roku.",
    "Kalkulator liczy podstawę, każdą składkę i to, ile oszczędzasz w porównaniu z pełnym ZUS.",
  ],
  comoSeCalcula: [
    "Przeciętny miesięczny dochód: roczny dochód z działalności podzielony przez liczbę dni jej prowadzenia i pomnożony przez 30.",
    "Podstawa składek: przeciętny dochód razy {{pl.wspolczynnik-malego-zus}}. Nie może być niższa niż {{pl.podstawa-zus-preferencyjna}} ani wyższa niż {{pl.podstawa-zus-pelna}}.",
    "Jeśli działalność trwała krócej niż cały rok, limit przychodu zmniejsza się proporcjonalnie do liczby dni.",
    "Od podstawy liczy się składki emerytalną, rentową, wypadkową, dobrowolnie chorobową oraz Fundusz Pracy z Funduszem Solidarnościowym.",
  ],
  ejemplo: [
    "Przy dochodzie 60 000 zł za cały poprzedni rok podstawa wynosi 2465,76 zł, a składki społeczne z chorobowym i FP to 840,58 zł miesięcznie.",
  ],
  faq: [
    {
      pregunta: "Kto może skorzystać z małego ZUS plus?",
      respuesta: "Przedsiębiorca, którego przychód z działalności w poprzednim roku nie przekroczył {{pl.limit-malego-zus}}. Limit zmniejsza się proporcjonalnie, jeśli działalność trwała krócej niż cały rok.",
    },
    {
      pregunta: "Czy mały ZUS plus obniża składkę zdrowotną?",
      respuesta: "Nie. Mały ZUS plus dotyczy tylko składek społecznych. Składkę zdrowotną liczy się osobno, według formy opodatkowania.",
    },
    {
      pregunta: "Jaki dochód wpisać, jeśli składki ZUS były kosztem?",
      respuesta: "Dochód powiększony o składki społeczne zaliczone do kosztów uzyskania przychodu. Tak każe liczyć ustawa o systemie ubezpieczeń społecznych.",
    },
  ],
  glosario: [
    { termino: "Przychód", definicion: "Wszystkie wpływy z działalności, przed odjęciem kosztów." },
    { termino: "Dochód", definicion: "Przychód minus koszty uzyskania przychodu." },
  ],
});
