import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "rs.porez-na-imovinu",
  h1: "Porez na imovinu: kalkulator",
  title: "Porez na imovinu {{anio}}: obračun po zakonskim stopama",
  description: "Izračunajte godišnji porez na imovinu: do {{rs.porez-na-imovinu[0].tasa}} do deset miliona dinara, pa progresivno do {{rs.porez-na-imovinu[-1].tasa}}. Kvartalne rate i stvarna stopa.",
  intro: [
    "Za stan ili kuću bez poslovnih knjiga stopa je do {{rs.porez-na-imovinu[0].tasa}} na prvih deset miliona dinara osnovice i raste u razredima do {{rs.porez-na-imovinu[-1].tasa}} iznad pedeset miliona.",
    "To su najviše stope. Lokalna samouprava određuje svoje stope i zone, pa je ovaj rezultat gornja granica za vašu nepokretnost.",
  ],
  comoSeCalcula: [
    "Do deset miliona dinara: {{rs.porez-na-imovinu[0].tasa}}.",
    "Od deset do 25 miliona: još {{rs.porez-na-imovinu[1].tasa}} na taj deo.",
    "Od 25 do 50 miliona: još {{rs.porez-na-imovinu[2].tasa}} na taj deo.",
    "Preko 50 miliona: još {{rs.porez-na-imovinu[3].tasa}} na taj deo.",
    "Obveznik koji vodi poslovne knjige plaća do {{rs.porez-imovina-knjige}}, a zemljište bez knjiga do {{rs.porez-imovina-zemljiste}}, po jednoj stopi.",
  ],
  ejemplo: [
    "Stan sa osnovicom od 12.000.000 dinara: prvih deset miliona nosi 40.000 dinara, a preostala dva 12.000 dinara. Godišnje najviše 52.000 dinara, odnosno 13.000 dinara po kvartalu.",
    "Zemljište sa osnovicom od 5.000.000 dinara: najviše 15.000 dinara godišnje.",
  ],
  faq: [
    {
      pregunta: "Ko određuje stopu poreza na imovinu?",
      respuesta: "Skupština jedinice lokalne samouprave, do iznosa iz zakona. Ako je ne utvrdi ili je utvrdi iznad maksimuma, primenjuje se najviša zakonska stopa (Zakon o porezima na imovinu, čl. 11).",
    },
    {
      pregunta: "Plaća li se porez na zemljište pod zgradom?",
      respuesta: "Za površinu pod objektom na koji se porez plaća po pravilu ne plaća se poseban porez, uz izuzetke iz zakona (čl. 12).",
    },
    {
      pregunta: "Gde da nađem stope za svoju opštinu?",
      respuesta: "Lokalna samouprava je dužna da objavi akte o zonama i stopama, i to do 30. novembra tekuće godine, kao i na svojoj internet strani.",
    },
  ],
  glosario: [
    { termino: "Poreska osnovica", definicion: "Vrednost nepokretnosti od koje se računa porez." },
    { termino: "Poslovne knjige", definicion: "Knjige koje vode firme i preduzetnici, za koje važi jedna stopa." },
    { termino: "Zona", definicion: "Deo teritorije opštine ili grada koji lokalna samouprava utvrđuje posebnim aktom." },
  ],
});
