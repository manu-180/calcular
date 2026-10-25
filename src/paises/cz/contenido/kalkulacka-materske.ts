import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "cz.kalkulacka-materske",
  h1: "Kalkulačka mateřské 2026",
  title: "Kalkulačka mateřské 2026: výpočet peněžité pomoci",
  description:
    "Spočítejte si mateřskou (peněžitou pomoc v mateřství) z hrubé mzdy: denní částku, částku za měsíc a celkem za {{cz.ppm-podpurci-doba[jedno]}} podle hranic pro rok 2026.",
  intro: [
    "Mateřská neboli peněžitá pomoc v mateřství nahrazuje příjem před porodem a po něm. Vyplácí ji okresní správa sociálního zabezpečení.",
    "Kalkulačka spočítá výši dávky z vaší průměrné hrubé mzdy za posledních 12 měsíců.",
  ],
  comoSeCalcula: [
    "Denní vyměřovací základ je příjem za 12 měsíců před nástupem na mateřskou vydělený počtem dní.",
    "Základ se redukuje: do {{cz.redukcni-hranice[prvni]}} se počítá celý, z části do {{cz.redukcni-hranice[druha]}} 60 %, z části do {{cz.redukcni-hranice[treti]}} 30 % a ke zbytku se nepřihlíží.",
    "Mateřská za kalendářní den je {{cz.ppm-sazba}} redukovaného základu. Vyplácí se {{cz.ppm-podpurci-doba[jedno]}}, při narození dvojčat a více dětí {{cz.ppm-podpurci-doba[vicercata]}}.",
  ],
  ejemplo: ["Při průměrné mzdě 34 784 Kč vychází mateřská 801 Kč denně, tedy 24 030 Kč za 30 dní a 156 996 Kč za celých 28 týdnů."],
  faq: [
    {
      pregunta: "Kolik je mateřská v roce 2026?",
      respuesta: "{{cz.ppm-sazba}} redukovaného denního vyměřovacího základu. Nejvyšší možná mateřská v roce 2026 je 2 000 Kč za den, při mzdě zhruba nad 149 000 Kč měsíčně.",
    },
    {
      pregunta: "Jak dlouho se mateřská pobírá?",
      respuesta: "{{cz.ppm-podpurci-doba[jedno]}} u jednoho dítěte a {{cz.ppm-podpurci-doba[vicercata]}} u dvojčat a více dětí. Nastoupit na ni můžete od začátku 8. do začátku 6. týdne před očekávaným porodem.",
    },
    {
      pregunta: "Kdo má nárok na mateřskou?",
      respuesta: "Pojištěnka, která byla v posledních dvou letech před nástupem na mateřskou nemocensky pojištěna aspoň 270 dní.",
    },
    {
      pregunta: "Co následuje po mateřské?",
      respuesta: "Rodičovský příspěvek, který vyplácí úřad práce. Kolik a jak dlouho ho budete čerpat, spočítá kalkulačka rodičovského příspěvku.",
    },
  ],
  glosario: [
    { termino: "PPM", definicion: "Peněžitá pomoc v mateřství, hovorově mateřská." },
    { termino: "Redukční hranice", definicion: "Částky, nad kterými se příjem do výpočtu dávky započítává jen zčásti nebo vůbec." },
  ],
});
