import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "hu.afa-kalkulator",
  h1: "ÁFA kalkulátor: {{hu.afa[altalanos]}}, {{hu.afa[kedvezmenyes18]}} és {{hu.afa[kedvezmenyes5]}}",
  title: "ÁFA kalkulátor {{hu.afa[altalanos]}}: nettóból bruttó, bruttóból nettó",
  description:
    "Add hozzá vagy vond ki az ÁFA-t: {{hu.afa[altalanos]}}, {{hu.afa[kedvezmenyes18]}} vagy {{hu.afa[kedvezmenyes5]}}. Nettó, bruttó és az adó összege forintra pontosan.",
  intro: [
    "Magyarországon az általános ÁFA-kulcs {{hu.afa[altalanos]}}. A kedvezményes kulcsok: {{hu.afa[kedvezmenyes18]}} és {{hu.afa[kedvezmenyes5]}}.",
    "A kalkulátor a nettó árból kiszámolja a bruttót, vagy a bruttó árból kiveszi az ÁFA-t.",
  ],
  comoSeCalcula: [
    "Nettóból bruttó: az ÁFA a nettó ár szorozva a kulccsal. A bruttó a nettó és az ÁFA összege.",
    "Bruttóból nettó: a bruttót elosztod ennyivel: 1,27 (kedvezményes kulcsnál 1,18 vagy 1,05). Az ÁFA a különbség.",
    "Ne vonj le egyszerűen {{hu.afa[altalanos]}} részt a bruttóból, mert úgy túl kevés nettó jön ki.",
  ],
  ejemplo: [
    "Egy 10 000 Ft nettó árú szolgáltatás bruttó ára {{hu.afa[altalanos]}} ÁFA-val 12 700 Ft. 12 700 Ft bruttóban 2700 Ft ÁFA van.",
  ],
  faq: [
    {
      pregunta: "Hogyan számolok bruttóból nettót?",
      respuesta: "A bruttó összeget oszd el ennyivel: 1,27. 12 700 Ft bruttóból 10 000 Ft a nettó és 2700 Ft az ÁFA.",
    },
    {
      pregunta: "Mire vonatkozik a kedvezményes kulcs?",
      respuesta: "Az Áfa tv. 3. számú mellékletében felsorolt termékekre és szolgáltatásokra {{hu.afa[kedvezmenyes5]}}, a 3/A. számú mellékletben felsoroltakra {{hu.afa[kedvezmenyes18]}} az ÁFA. Minden másra az általános kulcs vonatkozik.",
    },
    {
      pregunta: "Mennyi az ÁFA egy 5000 Ft-os bruttó árban?",
      respuesta: "Általános kulccsal 1063 Ft: 5000 / 1,27 = 3937 Ft a nettó, a különbség az ÁFA.",
    },
  ],
  glosario: [
    { termino: "Nettó ár", definicion: "Az ár ÁFA nélkül." },
    { termino: "Bruttó ár", definicion: "Az ár ÁFA-val, ezt fizeti a vásárló." },
  ],
});
