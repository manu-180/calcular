import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "rs.porez-na-prenos-apsolutnih-prava",
  h1: "Porez na prenos apsolutnih prava",
  title: "Porez na prenos apsolutnih prava {{anio}}: {{rs.prenos-apsolutnih-prava}} i prvi stan",
  description: "Izračunajte porez od {{rs.prenos-apsolutnih-prava}} pri kupovini nekretnine i oslobođenje za prvi stan: {{rs.prvi-stan-kupac}} m² za kupca i {{rs.prvi-stan-clan}} m² po članu domaćinstva.",
  intro: [
    "Stopa poreza na prenos apsolutnih prava je {{rs.prenos-apsolutnih-prava}}. Osnovica je ugovorena cena, osim ako je niža od tržišne vrednosti.",
    "Ko kupuje prvi stan ne plaća porez na {{rs.prvi-stan-kupac}} m² za sebe i na po {{rs.prvi-stan-clan}} m² za članove domaćinstva koji takođe nemaju stan.",
  ],
  comoSeCalcula: [
    "Porez = ugovorena cena puta {{rs.prenos-apsolutnih-prava}}.",
    "Za prvi stan: saberite oslobođene kvadrate za kupca i članove domaćinstva.",
    "Porez se plaća samo na deo cene koji odgovara površini iznad tih kvadrata.",
    "Ako Poreska uprava oceni da je cena niža od tržišne, može da utvrdi osnovicu u visini tržišne vrednosti u roku od 60 dana.",
  ],
  ejemplo: [
    "Stan za 8.000.000 dinara bez oslobođenja: porez je 200.000 dinara.",
    "Isti stan od 60 m² kao prvi stan, za kupca i jednog člana domaćinstva: oslobođeno je 55 m², pa se plaća 5/60 od poreza, odnosno 16.666,67 dinara.",
  ],
  faq: [
    {
      pregunta: "Ko može da koristi oslobođenje za prvi stan?",
      respuesta: "Punoletni državljanin Srbije sa prebivalištem u Srbiji koji od 1. jula 2006. nije imao stan u svojini, sa drugim uslovima iz člana 31a Zakona o porezima na imovinu.",
    },
    {
      pregunta: "Koja je osnovica poreza?",
      respuesta: "Ugovorena cena u trenutku nastanka poreske obaveze, ako nije niža od tržišne vrednosti (čl. 27).",
    },
    {
      pregunta: "Šta ako kupujem samo udeo u stanu?",
      respuesta: "Pravo se ostvaruje srazmerno svojinskom udelu u odnosu na površinu od {{rs.prvi-stan-kupac}} m², odnosno {{rs.prvi-stan-clan}} m² (čl. 31a).",
    },
  ],
  glosario: [
    { termino: "Apsolutna prava", definicion: "Između ostalog, pravo svojine na nepokretnosti." },
    { termino: "Prvi stan", definicion: "Kupovina za koju važi poresko oslobođenje iz člana 31a." },
    { termino: "Tržišna vrednost", definicion: "Vrednost koju može da utvrdi poreski organ kad je ugovorena cena niža." },
  ],
});
