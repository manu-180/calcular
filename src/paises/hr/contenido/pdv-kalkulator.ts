import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "hr.pdv-kalkulator",
  h1: "PDV kalkulator {{anio}}: izračun PDV-a {{hr.pdv[opca]}}, {{hr.pdv[snizena]}} i {{hr.pdv[niska]}}",
  title: "PDV kalkulator {{anio}}: {{hr.pdv[opca]}}, {{hr.pdv[snizena]}} i {{hr.pdv[niska]}}",
  description: "Dodajte PDV na neto iznos ili ga izdvojite iz bruto iznosa, po stopi od {{hr.pdv[opca]}}, {{hr.pdv[snizena]}} ili {{hr.pdv[niska]}}. Rezultat odmah, do centa.",
  intro: [
    "Opća stopa PDV-a u Hrvatskoj je {{hr.pdv[opca]}}, a snižene stope su {{hr.pdv[snizena]}} i {{hr.pdv[niska]}}. Stope objavljuje Porezna uprava.",
    "Kalkulator radi u oba smjera: dodaje PDV na cijenu bez poreza ili ga izdvaja iz cijene s računa.",
  ],
  comoSeCalcula: [
    "Dodavanje: iznos bez PDV-a pomnožite s 1,25 za opću stopu, s 1,13 ili 1,05 za snižene.",
    "Izdvajanje: iznos s PDV-om podijelite istim brojem, a razlika je PDV. Česta je greška oduzeti 25 % od bruto iznosa: tako se dobije premalo osnovice.",
  ],
  ejemplo: [
    "Račun bez PDV-a glasi 100 eura. Uz {{hr.pdv[opca]}} PDV je 25 eura, a ukupno 125 eura.",
    "Na računu piše 113 eura uz stopu od {{hr.pdv[snizena]}}. Osnovica je 113 / 1,13 = 100 eura, a PDV 13 eura. Kod 5 %, 200 eura bez poreza postaje 210 eura.",
  ],
  faq: [
    {
      pregunta: "Kada obrt mora u sustav PDV-a?",
      respuesta: "Prema Poreznoj upravi granica za obvezni ulazak u sustav PDV-a je 60.000,00 eura primitaka godišnje, ista kao granica za paušalno oporezivanje.",
    },
    {
      pregunta: "Koliko PDV-a ima u cijeni od 100 eura?",
      respuesta: "Uz opću stopu od {{hr.pdv[opca]}} u cijeni je 20 eura PDV-a, jer je osnovica 100 / 1,25 = 80 eura. Nije riječ o 25 eura.",
    },
    {
      pregunta: "Što kod kupnje nekretnine?",
      respuesta: "Porezna uprava navodi da se porez na promet nekretnina ne plaća ako se na isporuku plaća PDV. Tada u kalkulator unosite opću stopu od {{hr.pdv[opca]}}.",
    },
  ],
  glosario: [
    { termino: "PDV", definicion: "Porez na dodanu vrijednost." },
    { termino: "Osnovica", definicion: "Iznos bez PDV-a." },
    { termino: "Bruto iznos", definicion: "Iznos s uključenim PDV-om." },
  ],
});
