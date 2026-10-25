import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "cz.rodicovsky-prispevek",
  h1: "Kalkulačka rodičovského příspěvku",
  title: "Rodičovský příspěvek 2026: kalkulačka čerpání",
  description:
    "Spočítejte, jak dlouho budete čerpat rodičovský příspěvek {{cz.rodicovsky-prispevek[do-2026]}} a kolik můžete brát měsíčně. Se stropem podle mzdy i pro děti narozené od roku 2027.",
  intro: [
    "Rodičovský příspěvek vyplácí úřad práce rodiči, který celodenně pečuje o nejmladší dítě v rodině. Celková částka je pevná, měsíční výši si volíte sami.",
    "Kalkulačka spočítá nejvyšší měsíční částku, na kterou máte nárok, a jak dlouho vám příspěvek při zvolené částce vydrží.",
  ],
  comoSeCalcula: [
    "Celková částka je {{cz.rodicovsky-prispevek[do-2026]}} na dítě narozené do konce roku 2026 a {{cz.rodicovsky-prispevek[od-2027]}} na dítě narozené od 1. ledna 2027. U dvojčat a více dětí je dvojnásobná.",
    "Měsíčně můžete čerpat až {{cz.rodicovsky-limit}}. Více jen tehdy, když {{cz.rodicovsky-podil}} z 30násobku denního vyměřovacího základu jednoho z rodičů je vyšší než tato částka. Pak je strop právě tato hodnota.",
    "Denní vyměřovací základ se počítá stejně jako u mateřské: z příjmu za 12 měsíců před porodem, redukovaný hranicemi pro dávky.",
    "Příspěvek se vyplácí nejdéle do 3 let věku dítěte. Výši čerpání můžete měnit jednou za 3 měsíce.",
  ],
  ejemplo: [
    "Při mzdě 40 000 Kč je strop 27 636 Kč měsíčně. Pokud budete brát 15 000 Kč, vyčerpáte {{cz.rodicovsky-prispevek[do-2026]}} za 24 měsíců, poslední výplata bude 5 000 Kč.",
  ],
  faq: [
    {
      pregunta: "Kolik je rodičovský příspěvek v roce 2026?",
      respuesta: "Celkem {{cz.rodicovsky-prispevek[do-2026]}} na nejmladší dítě v rodině, u vícerčat dvojnásobek. Na děti narozené od 1. ledna 2027 bude {{cz.rodicovsky-prispevek[od-2027]}}.",
    },
    {
      pregunta: "Kolik můžu čerpat měsíčně bez příjmu?",
      respuesta: "Pokud ani jednomu z rodičů nelze stanovit denní vyměřovací základ, nejvýše {{cz.rodicovsky-limit}} měsíčně, u vícerčat dvojnásobek.",
    },
    {
      pregunta: "Jak dlouho se rodičovský příspěvek pobírá?",
      respuesta: "Do vyčerpání celkové částky, nejdéle do 3 let věku dítěte. Co nestihnete vyčerpat, propadá.",
    },
    {
      pregunta: "Můžu při rodičovském příspěvku pracovat?",
      respuesta: "Ano, výdělek se nesleduje. Musíte ale zajistit péči o dítě jinou dospělou osobou. Dítě do 2 let smí chodit do školky nebo dětské skupiny nejvýše 120 hodin měsíčně.",
    },
  ],
  glosario: [
    { termino: "Nejmladší dítě v rodině", definicion: "Dítě, na které se rodičovský příspěvek vyplácí. Narozením dalšího dítěte nárok na předchozí příspěvek končí." },
    { termino: "Denní vyměřovací základ", definicion: "Průměrný denní příjem za rok před porodem, upravený redukčními hranicemi." },
  ],
});
