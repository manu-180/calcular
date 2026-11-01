import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "rs.kalkulator-pdv",
  h1: "Kalkulator PDV-a: {{rs.pdv-opsta}} i {{rs.pdv-posebna}}",
  title: "Kalkulator PDV {{anio}}: dodajte ili izdvojite {{rs.pdv-opsta}} i {{rs.pdv-posebna}}",
  description: "Izračunajte PDV po opštoj stopi {{rs.pdv-opsta}} i posebnoj {{rs.pdv-posebna}}. Dodajte PDV na neto iznos ili ga izdvojite iz cene sa računa.",
  intro: [
    "Opšta stopa PDV je {{rs.pdv-opsta}}, a posebna {{rs.pdv-posebna}}. Kalkulator dodaje PDV na iznos bez poreza ili ga izdvaja iz cene koja ga već sadrži.",
    "Posebna stopa važi, između ostalog, za hleb, mleko, brašno, šećer, sveže voće, povrće, meso i jaja, kao i za lekove.",
  ],
  comoSeCalcula: [
    "Dodavanje: PDV = iznos bez PDV puta stopa.",
    "Izdvajanje: osnovica = cena sa PDV podeljena sa 1,20 za opštu stopu, odnosno sa 1,10 za posebnu stopu.",
    "PDV = cena sa PDV minus osnovica.",
  ],
  ejemplo: [
    "Na 1.000 dinara bez PDV po opštoj stopi dolazi 200 dinara PDV, ukupno 1.200 dinara.",
    "Cena od 1.100 dinara sa posebnom stopom sadrži 1.000 dinara osnovice i 100 dinara PDV.",
  ],
  faq: [
    {
      pregunta: "Koje su stope PDV u Srbiji?",
      respuesta: "Opšta {{rs.pdv-opsta}} i posebna {{rs.pdv-posebna}} (Zakon o porezu na dodatu vrednost, čl. 23).",
    },
    {
      pregunta: "Kada moram da uđem u sistem PDV?",
      respuesta: "Mali obveznik je lice čiji promet u prethodnih 12 meseci nije veći od {{rs.pdv-limit-prometa}}. On ne obračunava PDV i nema pravo na odbitak (čl. 33).",
    },
    {
      pregunta: "Koji proizvodi idu po posebnoj stopi?",
      respuesta: "Član 23 navodi, između ostalog, hleb i pekarske proizvode, mleko, brašno, šećer, jestivo ulje i med, sveže voće, povrće, meso, ribu i jaja, lekove, đubrivo i seme. Za sve ostalo važi opšta stopa, ako zakon ne kaže drugačije.",
    },
    {
      pregunta: "Zašto se 20 odsto ne računa direktno od cene sa PDV?",
      respuesta: "Jer je osnovica manja od cene. Iz cene sa opštom stopom izdvaja se šestina, a ne petina.",
    },
  ],
  glosario: [
    { termino: "PDV", definicion: "Porez na dodatu vrednost." },
    { termino: "Osnovica", definicion: "Iznos bez PDV na koji se obračunava porez." },
    { termino: "Mali obveznik", definicion: "Lice ispod granice prometa koje ne obračunava PDV." },
  ],
});
