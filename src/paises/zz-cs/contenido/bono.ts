import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "zz-cs.bono",
  h1: "Kalkulačka pololetní prémie v Zetalandii",
  title: "Pololetní prémie v Zetalandii: kolik dostanete",
  description: "Spočítejte si pololetní prémii s minimální mzdou vašeho kraje a příplatkem {{zz.bonificacion}}, s oficiálními hodnotami, datem a zdrojem.",
  intro: [
    "Pololetní prémie je mzda navíc, kterou zaměstnavatel vyplácí dvakrát do roka.",
    "Pokud jste odpracovali celé pololetí, dostanete jednu měsíční mzdu a příplatek {{zz.bonificacion}}.",
  ],
  comoSeCalcula: [
    "Výpočet vychází z hrubé měsíční mzdy. Pokud je nižší než minimální mzda ve vašem kraji, použije se minimální mzda.",
    "Tato mzda se vynásobí počtem odpracovaných měsíců a vydělí šesti.",
    "V malých firmách je prémie poloviční.",
    "K prémii se připočte příplatek {{zz.bonificacion}}.",
  ],
  faq: [
    { pregunta: "Jaká je minimální mzda v Severním kraji?", respuesta: "{{zz.minimo@norte}}, platí od {{zz.minimo@norte#desde}}." },
    { pregunta: "Co když nemám odpracované celé pololetí?", respuesta: "Dostanete poměrnou část podle odpracovaných měsíců." },
    { pregunta: "Vyplácí se příplatek vždy?", respuesta: "Ano. Je to {{zz.bonificacion}} z prémie a firma ho vyplácí spolu s prémií." },
  ],
  glosario: [
    { termino: "Pololetní prémie", definicion: "Mzda navíc, kterou zákon ukládá vyplatit v červenci a v prosinci." },
    { termino: "Minimální mzda", definicion: "Nejnižší odměna za práci na plný úvazek v každém kraji." },
  ],
});
