import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "sk.rodicovsky-prispevok",
  h1: "Rodičovský príspevok {{anio}}",
  title: "Rodičovský príspevok {{anio}}: {{sk.rodicovsky[zakladny]}} a {{sk.rodicovsky[po-materskom]}}",
  description: "Rodičovský príspevok je {{sk.rodicovsky[zakladny]}} alebo {{sk.rodicovsky[po-materskom]}} po materskom. Vypočítajte sumu pri dvojičkách aj doplatok k materskému.",
  intro: [
    "Rodičovský príspevok je {{sk.rodicovsky[zakladny]}} mesačne a {{sk.rodicovsky[po-materskom]}}, ak rodič predtým poberal materské. Sumy zverejňuje ministerstvo práce a menia sa od januára podľa životného minima.",
    "Pri dvoch a viac súčasne narodených deťoch sa príspevok zvyšuje. Kalkulačka ukáže aj doplatok, keď materské vychádza nižšie ako príspevok.",
  ],
  comoSeCalcula: [
    "Východisková suma závisí od toho, či ste pred vznikom nároku poberali materské.",
    "Podľa § 4 zákona č. 571/2009 Z. z. sa suma zvyšuje o {{sk.rodicovsky-navysenie}} na každé ďalšie súčasne narodené dieťa a zaokrúhľuje na desať centov.",
    "Ak poberáte materské v sume nižšej, ako je príspevok, dostanete rozdiel medzi oboma sumami.",
  ],
  ejemplo: ["Rodič po materskom s dvojičkami dostane 625,10 eura mesačne, teda {{sk.rodicovsky[po-materskom]}} zvýšených o {{sk.rodicovsky-navysenie}}."],
  faq: [
    { pregunta: "Kedy mám nárok na vyššiu sumu?", respuesta: "Ak sa vám pred vznikom nároku vyplácalo materské alebo obdobná dávka z členského štátu. Vtedy patrí {{sk.rodicovsky[po-materskom]}}." },
    { pregunta: "Znižuje sa príspevok v niektorých prípadoch?", respuesta: "Áno, o 50 %, ak rodič najmenej tri mesiace po sebe nedbá o školskú dochádzku ďalšieho dieťaťa, ako uvádza ministerstvo práce." },
    { pregunta: "Ako sa príspevok mení každý rok?", respuesta: "Sumy sa od 1. januára upravujú koeficientom životného minima a ustanovuje ich opatrenie ministerstva práce." },
  ],
  glosario: [
    { termino: "Oprávnená osoba", definicion: "Rodič alebo iná osoba, ktorá sa riadne stará o dieťa a má nárok na príspevok." },
    { termino: "Súčasne narodené deti", definicion: "Dvojičky, trojičky a podobne." },
  ],
});
