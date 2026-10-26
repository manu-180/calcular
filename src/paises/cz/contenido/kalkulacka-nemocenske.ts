import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "cz.kalkulacka-nemocenske",
  h1: "Kalkulačka nemocenské 2026",
  title: "Kalkulačka nemocenské 2026: náhrada mzdy a nemocenská",
  description:
    "Spočítejte, kolik dostanete na nemocenské: náhradu mzdy od zaměstnavatele za prvních 14 dní a nemocenskou od ČSSZ od 15. dne podle redukčních hranic 2026.",
  intro: [
    "Při pracovní neschopnosti vám první dva týdny platí zaměstnavatel náhradu mzdy. Od 15. dne vyplácí nemocenské okresní správa sociálního zabezpečení.",
    "Kalkulačka spočítá obě částky z vaší průměrné hrubé mzdy a délky nemoci.",
  ],
  comoSeCalcula: [
    "Náhrada mzdy je {{cz.nahrada-mzdy-nemoc}} redukovaného průměrného hodinového výdělku za každou zameškanou hodinu v pracovních dnech prvních 14 dnů.",
    "Nemocenské se počítá z denního vyměřovacího základu: příjem za posledních 12 měsíců vydělený počtem dní. Ten se redukuje: do {{cz.redukcni-hranice[prvni]}} se počítá 90 %, do {{cz.redukcni-hranice[druha]}} 60 % a do {{cz.redukcni-hranice[treti]}} 30 %, nad ní nic.",
    "Nemocenské za kalendářní den je {{cz.nemocenske-sazby[do-30]}} redukovaného základu do 30. dne, {{cz.nemocenske-sazby[do-60]}} od 31. do 60. dne a {{cz.nemocenske-sazby[od-61]}} od 61. dne.",
    "Pro náhradu mzdy se hranice násobí koeficientem {{cz.nahrada-mzdy-koeficient}}.",
  ],
  ejemplo: [
    "Při mzdě 34 784 Kč a nemoci 30 dní dostanete od zaměstnavatele 8 640 Kč za 10 pracovních dní a od ČSSZ 618 Kč denně za 16 dní, tedy 9 888 Kč. Dohromady 18 528 Kč.",
  ],
  faq: [
    {
      pregunta: "Kolik procent ze mzdy je nemocenská?",
      respuesta: "Nemocenské je {{cz.nemocenske-sazby[do-30]}} redukovaného denního vyměřovacího základu, od 31. dne {{cz.nemocenske-sazby[do-60]}} a od 61. dne {{cz.nemocenske-sazby[od-61]}}.",
    },
    {
      pregunta: "Kdo platí prvních 14 dní nemoci?",
      respuesta: "Zaměstnavatel. Platí náhradu mzdy za pracovní dny ve výši {{cz.nahrada-mzdy-nemoc}} redukovaného průměrného výdělku. Od 15. dne vyplácí nemocenské ČSSZ za všechny kalendářní dny včetně víkendů.",
    },
    {
      pregunta: "Jak dlouho se nemocenské vyplácí?",
      respuesta: "Nejdéle 380 kalendářních dní od vzniku pracovní neschopnosti.",
    },
    {
      pregunta: "Platí se nemocenská i z dohody o provedení práce?",
      respuesta: "Jen když jste z dohody nemocensky pojištěni, tedy když odměna v měsíci dosáhne rozhodného příjmu pro DPP.",
    },
  ],
  glosario: [
    { termino: "Denní vyměřovací základ", definicion: "Průměrný denní příjem za rozhodné období, obvykle za 12 měsíců před nemocí." },
    { termino: "Redukční hranice", definicion: "Částky, nad kterými se příjem do výpočtu dávky započítává jen zčásti nebo vůbec." },
    { termino: "eNeschopenka", definicion: "Elektronické potvrzení pracovní neschopnosti, které lékař posílá ČSSZ a zaměstnavateli." },
  ],
});
