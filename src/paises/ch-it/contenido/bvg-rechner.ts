import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ch-it.bvg-rechner",
  h1: "Calcolo LPP: avere di vecchiaia e rendita della cassa pensioni",
  title: "Calcolo LPP: avere di vecchiaia e rendita a 65 anni",
  description: "Quanto avrai nella cassa pensioni a 65 anni? Accrediti LPP, interesse {{ch.bvg-mindestzins}} e aliquota di conversione {{ch.bvg-umwandlungssatz}}: capitale e rendita.",
  intro: [
    "Nella cassa pensioni risparmi ogni anno un accredito di vecchiaia sul salario coordinato. Con gli interessi diventa l'avere di vecchiaia, che al pensionamento è convertito in rendita.",
    "Il calcolatore mostra il minimo legale secondo la LPP. Se il tuo certificato di previdenza indica un avere più alto, la tua cassa assicura più della legge.",
  ],
  comoSeCalcula: [
    "Salario coordinato: salario annuo fino a {{ch.bvg-obere-grenze}} meno {{ch.bvg-koordinationsabzug}}, almeno {{ch.bvg-min-koordinierter-lohn}}. È assicurato solo chi guadagna più di {{ch.bvg-eintrittsschwelle}}.",
    "Accredito di vecchiaia: 7 % da 25 a 34 anni, 10 % da 35 a 44, 15 % da 45 a 54 e 18 % da 55 a 65.",
    "Ogni anno si aggiunge l'interesse sull'avere precedente, poi il nuovo accredito. Senza la tua indicazione vale il tasso minimo del {{ch.bvg-mindestzins}}.",
    "Rendita: avere di vecchiaia moltiplicato per l'aliquota di conversione del {{ch.bvg-umwandlungssatz}} all'età di riferimento di 65 anni.",
  ],
  ejemplo: [
    "Chi è assicurato dai 45 ai 65 anni con un salario annuo di 80’000 franchi raggiunge per legge un avere di vecchiaia di circa 198’200 franchi. Ne risulta una rendita di circa 1123 franchi al mese.",
  ],
  faq: [
    { pregunta: "Che cos'è l'aliquota di conversione?", respuesta: "La percentuale con cui l'avere di vecchiaia è convertito in rendita annua. Per la parte obbligatoria ammonta almeno al {{ch.bvg-umwandlungssatz}} all'età di riferimento di 65 anni." },
    { pregunta: "Chi paga gli accrediti di vecchiaia?", respuesta: "Datore di lavoro e dipendenti insieme. Il datore di lavoro deve pagare almeno quanto tutti i dipendenti insieme." },
    { pregunta: "Perché il mio certificato di previdenza è diverso?", respuesta: "La tua cassa può assicurare più di quanto chiede la legge o applicare aliquote proprie. Questo calcolatore mostra solo il minimo prescritto dalla LPP." },
  ],
  glosario: [
    { termino: "Avere di vecchiaia", definicion: "Il capitale risparmiato nella cassa pensioni con gli accrediti di vecchiaia e gli interessi." },
    { termino: "Certificato di previdenza", definicion: "Riepilogo annuo della cassa pensioni con avere, salario assicurato e rendita prevista." },
  ],
});
