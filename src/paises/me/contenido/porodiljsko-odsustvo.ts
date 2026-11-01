import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "me.porodiljsko-odsustvo",
  h1: "Porodiljsko odsustvo {{anio}}: trajanje i naknada",
  title: "Porodiljsko odsustvo {{anio}}: trajanje i naknada zarade",
  description: "Obavezno porodiljsko odsustvo traje {{me.porodiljsko-dani}}, a roditeljsko se nastavlja poslije toga. Procijenite mjesečnu naknadu i iznos za cijelo odsustvo.",
  intro: [
    "Zaposlena žena koristi obavezno porodiljsko odsustvo od {{me.porodiljsko-dani}}: 28 dana prije očekivanog porođaja i 70 dana od rođenja djeteta. Otac ima očinsko odsustvo od deset radnih dana.",
    "Poslije toga slijedi roditeljsko odsustvo koje pripada oboma, a kalkulator procjenjuje naknadu zarade za vrijeme odsustva.",
  ],
  comoSeCalcula: [
    "Naknada polazi od prosječne zarade iz 12 mjeseci prije početka odsustva.",
    "Iznos ima gornju granicu vezanu za prosječnu zaradu u državi.",
    "Kraći staž prije odsustva daje manji procenat, što kalkulator još ne prikazuje.",
  ],
  ejemplo: [
    "Radnica sa prosječnom zaradom od 1.000 eura i više od godinu dana neprekidnog rada, na odsustvu dvanaest mjeseci, dobija 1.000 eura mjesečno, ukupno 12.000 eura.",
  ],
  faq: [
    {
      pregunta: "Koliko traje porodiljsko odsustvo?",
      respuesta: "{{me.porodiljsko-dani}} prema članu 126 Zakona o radu. Ako se dijete rodi prije 37. nedjelje trudnoće, odsustvo se produžava za onoliko dana koliko je rođeno ranije.",
    },
    {
      pregunta: "Može li otac da koristi roditeljsko odsustvo?",
      respuesta: "Da. Pravo imaju oba roditelja, a prenos na drugog roditelja moguć je poslije 30 dana od početka korišćenja (Zakon o radu, čl. 127).",
    },
    {
      pregunta: "Može li poslodavac da otpusti zaposlenu na porodiljskom?",
      respuesta: "Član 123 Zakona o radu to zabranjuje, osim kod teže povrede radne obaveze ili drugih razloga koji se ne mogu dovesti u vezu sa trudnoćom i odsustvom.",
    },
  ],
  glosario: [
    { termino: "Porodiljsko odsustvo", definicion: "Obavezno odsustvo majke oko porođaja." },
    { termino: "Roditeljsko odsustvo", definicion: "Odsustvo radi njege djeteta koje pripada oba roditelja." },
    { termino: "Očinsko odsustvo", definicion: "Deset radnih dana od rođenja djeteta." },
  ],
});
