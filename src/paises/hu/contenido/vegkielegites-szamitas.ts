import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "hu.vegkielegites-szamitas",
  h1: "Végkielégítés számítás",
  title: "Végkielégítés számítás: hány havi jár és mennyi?",
  description:
    "Számold ki a végkielégítést a munkaviszony hossza szerint: három év után egyhavi, huszonöt év után hathavi távolléti díj, a nyugdíj előtt emelve.",
  intro: [
    "Végkielégítés akkor jár, ha a munkáltató mond fel, vagy ha jogutód nélkül megszűnik. Munkavállalói felmondásnál és közös megegyezésnél a törvény nem írja elő.",
    "Az összeg a munkáltatónál töltött évektől függ, és havi távolléti díjban számolják. A kalkulátor a nyugdíjkorhatár előtti emelést is beszámítja.",
  ],
  comoSeCalcula: [
    "Legalább három év után egyhavi, öt év után kéthavi, tíz év után háromhavi, tizenöt év után négyhavi, húsz év után öthavi, huszonöt év után hathavi távolléti díj jár.",
    "Ha a munkaviszony az öregségi nyugdíjkorhatár előtti öt éven belül szűnik meg, a végkielégítés egy, két vagy három havi távolléti díjjal nő.",
    "Nem jár végkielégítés, ha nyugdíjas vagy, vagy ha a felmondás oka a magatartásod, illetve nem egészségi okú képességed.",
    "Végkielégítés = hónapok száma × havi távolléti díj.",
  ],
  ejemplo: [
    "Tizenkét év munkaviszony és havi 600 000 Ft távolléti díj: háromhavi végkielégítés, 1 800 000 Ft bruttó. Ha a nyugdíjkorhatár előtti öt évben vagy, öthavi, vagyis 3 000 000 Ft.",
  ],
  faq: [
    {
      pregunta: "Hány havi végkielégítés jár 10 év után?",
      respuesta: "Háromhavi távolléti díj. Ha a nyugdíjkorhatár előtti öt évben szűnik meg a munkaviszony, öthavi.",
    },
    {
      pregunta: "Jár végkielégítés közös megegyezésnél?",
      respuesta: "A törvény szerint nem, de a felek a megállapodásban megegyezhetnek valamilyen összegben.",
    },
    {
      pregunta: "Mi a távolléti díj?",
      respuesta: "Az alapbéred és a pótlékátalányod, hozzáadva az elmúlt hat hónapban kifizetett teljesítménybért és bizonyos rendszeres pótlékokat.",
    },
  ],
  glosario: [
    { termino: "Távolléti díj", definicion: "A végkielégítés és a felmentési idő díjazásának alapja." },
    { termino: "Jogutód nélküli megszűnés", definicion: "A munkáltató úgy szűnik meg, hogy senki nem veszi át a munkaviszonyokat." },
  ],
});
