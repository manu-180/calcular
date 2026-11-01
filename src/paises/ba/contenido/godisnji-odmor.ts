import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ba.godisnji-odmor",
  h1: "Godišnji odmor {{anio}}: koliko dana imate po zakonu",
  title: "Godišnji odmor {{anio}}: najmanje {{ba.odmor-min@fbih}} u BiH",
  description: "Zakon daje najmanje {{ba.odmor-min@fbih}} godišnjeg odmora u FBiH i RS. Izračunajte dane za dio godine i grubu naknadu, s posebnim pravilima za maloljetne radnike.",
  intro: [
    "Zakon u oba entiteta daje isti minimum: {{ba.odmor-min@fbih}} godišnjeg odmora. U FBiH je gornja granica {{ba.odmor-max-fbih}}, a maloljetni radnik ima najmanje {{ba.odmor-maloljetni-fbih}}. U RS radnik na poslovima s posebnim uslovima ima najmanje {{ba.odmor-posebni-rs}}.",
    "Ako ste radili samo dio godine, kalkulator srazmjerno računa dane i zaokružuje ih na cio dan u korist radnika.",
  ],
  comoSeCalcula: [
    "Dani za period = zakonski minimum x mjeseci rada / 12, zaokruženo naviše.",
    "Više dana od minimuma nije zakon, nego kolektivni ugovor, pravilnik o radu ili ugovor. Tamo provjerite da li vam staž ili uslovi rada donose dodatne dane.",
    "Gruba naknada je plata podijeljena s 22 radna dana, puta broj dana. Zakon traži punu platu za vrijeme odmora, pa stvarni iznos zavisi od rasporeda rada.",
  ],
  ejemplo: [
    "Radnica u RS koja je radila šest mjeseci, s platom 2.200 KM, ima 10 radnih dana odmora. Gruba naknada je 1.000 KM bruto.",
    "Maloljetni radnik u FBiH za cijelu godinu ima {{ba.odmor-maloljetni-fbih}}, a ne samo {{ba.odmor-min@fbih}}.",
  ],
  faq: [
    {
      pregunta: "Kada u FBiH stičem pravo na godišnji odmor?",
      respuesta: "Član 48 Zakona o radu FBiH: radnik koji se prvi put zaposli, ili ima prekid duži od 15 dana, stiče pravo nakon šest mjeseci neprekidnog rada. Prije toga ima najmanje jedan dan za svaki mjesec rada.",
    },
    {
      pregunta: "Mogu li odmor koristiti u dijelovima u RS?",
      respuesta: "Da, uz saglasnost poslodavca. Član 84 Zakona o radu RS kaže da prvi dio traje najmanje dvije radne sedmice u toku godine, a drugi se koristi najkasnije do 30. juna naredne godine.",
    },
    {
      pregunta: "Koliko se plaća dan godišnjeg odmora u RS?",
      respuesta: "Član 87 Zakona o radu RS daje radniku punu platu, kao da je radio. Član 131 navodi 100 % prosječne plate iz odgovarajućeg prethodnog perioda ili plate koju bi ostvario.",
    },
  ],
  glosario: [
    { termino: "Radni dan", definicion: "Dan kada biste po rasporedu radili. Praznici i bolovanje ne troše odmor." },
    { termino: "Regres", definicion: "Novac za godišnji odmor koji propisuje kolektivni ugovor." },
    { termino: "Posebni uslovi rada", definicion: "Poslovi iz člana 59 Zakona o radu RS, za koje važi duži odmor." },
  ],
});
