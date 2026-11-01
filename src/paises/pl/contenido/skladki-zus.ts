import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "pl.skladki-zus",
  h1: "Kalkulator składek ZUS dla przedsiębiorcy",
  title: "Składki ZUS przedsiębiorcy: pełny, preferencyjny, zdrowotna",
  description:
    "Policz składki ZUS w działalności: pełny ZUS od {{pl.podstawa-zus-pelna}}, preferencyjny od {{pl.podstawa-zus-preferencyjna}}, ulga na start i zdrowotna na skali, liniowym i ryczałcie.",
  intro: [
    "Przedsiębiorca płaci co miesiąc składki społeczne (emerytalną, rentową, wypadkową i dobrowolnie chorobową), Fundusz Pracy z Funduszem Solidarnościowym oraz składkę zdrowotną.",
    "Wysokość składek społecznych zależy od wybranej podstawy, a składki zdrowotnej od formy opodatkowania i dochodu albo przychodu.",
  ],
  comoSeCalcula: [
    "Pełny ZUS: składki od podstawy {{pl.podstawa-zus-pelna}}, czyli 60 % prognozowanego przeciętnego wynagrodzenia.",
    "Preferencyjny ZUS przez pierwsze 24 miesiące działalności: podstawa {{pl.podstawa-zus-preferencyjna}}, bez Funduszu Pracy i Funduszu Solidarnościowego.",
    "Ulga na start: nie płacisz składek społecznych, tylko zdrowotną.",
    "Zdrowotna na skali: {{pl.skladka-zdrowotna}} dochodu pomniejszonego o składki społeczne. Na liniowym: {{pl.skladka-zdrowotna-liniowa}}. Na obu nie mniej niż {{pl.skladka-zdrowotna}} z {{pl.zdrowotna-podstawa-minimalna}}.",
    "Zdrowotna na ryczałcie: {{pl.skladka-zdrowotna}} od stałej podstawy, która zależy od przychodu od początku roku: {{pl.zdrowotna-ryczalt[do-60000]}}, {{pl.zdrowotna-ryczalt[do-300000]}} albo {{pl.zdrowotna-ryczalt[ponad-300000]}}.",
  ],
  ejemplo: [
    "Pełny ZUS z chorobowym to 1926,76 zł składek społecznych z FP i FS. Przy dochodzie 10 000 zł na skali dochodzi 739,05 zł składki zdrowotnej.",
  ],
  faq: [
    {
      pregunta: "Ile wynosi pełny ZUS?",
      respuesta: "Składki społeczne liczy się od {{pl.podstawa-zus-pelna}}: emerytalna ({{pl.skladki-pracownika[emerytalne]}} plus {{pl.skladki-platnika[emerytalne]}}), rentowa ({{pl.skladki-pracownika[rentowe]}} plus {{pl.skladki-platnika[rentowe]}}), wypadkowa {{pl.skladka-wypadkowa}} w wyliczeniach ZUS, chorobowa {{pl.skladki-pracownika[chorobowe]}} oraz FP {{pl.fundusze[fp]}} i FS {{pl.fundusze[fs]}}. Dokładną kwotę pokazuje kalkulator.",
    },
    {
      pregunta: "Czy chorobowe jest obowiązkowe?",
      respuesta: "Nie. Przedsiębiorca może przystąpić do ubezpieczenia chorobowego dobrowolnie. Bez niego suma składek jest niższa, ale nie masz prawa do zasiłku chorobowego z ZUS.",
    },
    {
      pregunta: "Od czego zależy składka zdrowotna na ryczałcie?",
      respuesta: "Od przychodu od początku roku. Do 60 000 zł podstawą jest 60 % przeciętnego wynagrodzenia, do 300 000 zł 100 %, a powyżej 180 %. Przeciętne wynagrodzenie to dane GUS z czwartego kwartału poprzedniego roku.",
    },
    {
      pregunta: "Kto nie płaci Funduszu Pracy?",
      respuesta: "Kobiety po 55. i mężczyźni po 60. roku życia, a także osoby na preferencyjnym ZUS i uldze na start.",
    },
  ],
  glosario: [
    { termino: "Podstawa wymiaru", definicion: "Kwota, od której liczy się procent składki." },
    { termino: "FP i FS", definicion: "Fundusz Pracy i Fundusz Solidarnościowy, opłacane razem ze składkami ZUS." },
  ],
});
