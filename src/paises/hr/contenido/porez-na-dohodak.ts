import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "hr.porez-na-dohodak",
  h1: "Porez na dohodak {{anio}}: stope po gradovima i općinama",
  title: "Porez na dohodak {{anio}}: izračun po gradu i općini",
  description: "Izračunajte godišnji porez na dohodak za svoj grad: osobni odbitak {{hr.osobni-odbitak}} mjesečno, granica {{hr.prag-godisnji}} i umanjenje za mlade do 30 godina.",
  intro: [
    "Porez na dohodak plaća se po dvije stope koje određuje grad ili općina. Niža vrijedi do {{hr.prag-godisnji}} godišnje osnovice, a viša na ostatak. U Zagrebu su {{hr.stopa-niza[zagreb]}} i {{hr.stopa-visa[zagreb]}}, u Splitu {{hr.stopa-niza[split]}} i {{hr.stopa-visa[split]}}, u Osijeku {{hr.stopa-niza[osijek]}} i {{hr.stopa-visa[osijek]}}.",
    "Kalkulator koristi službenu tablicu Porezne uprave za svih 556 jedinica lokalne samouprave. Unesite dohodak nakon mirovinskih doprinosa.",
  ],
  comoSeCalcula: [
    "Godišnji osobni odbitak je {{hr.osobni-odbitak}} puta 12, uvećan za koeficijente djece i uzdržavanih članova.",
    "Osnovica je dohodak minus odbitak. Do {{hr.prag-godisnji}} primjenjuje se niža stopa vašeg grada, a iznad te svote viša.",
    "Osobe do 25 godina dobivaju umanjenje od {{hr.umanjenje-mladi[do25]}} poreza po nižoj stopi na plaću, a od 26 do 30 godina {{hr.umanjenje-mladi[do30]}}. Priznaje se u godišnjem obračunu.",
  ],
  ejemplo: [
    "Dohodak 80.000 eura u Zagrebu, bez djece. Odbitak je 7.200 eura, a osnovica 72.800 eura. Na 60.000 eura porez je 23 %, dakle 13.800 eura, a na preostalih 12.800 eura 33 %, dakle 4.224 eura. Ukupno 18.024 eura.",
    "Da ta osoba ima do 25 godina, umanjenje bi pokrilo cijelih 13.800 eura i ostalo bi 4.224 eura poreza.",
  ],
  faq: [
    {
      pregunta: "Koje su granice stopa po vrsti mjesta?",
      respuesta: "Zakon (NN 152/2024) dopušta: općina 15 do 20 % i 25 do 30 %, grad 15 do 21 % i 25 do 31 %, veliki grad i sjedište županije 15 do 22 % i 25 do 32 %, Grad Zagreb 15 do 23 % i 25 do 33 %. Bez odluke vrijede 20 % i 30 %.",
    },
    {
      pregunta: "Koja stopa vrijedi ako radim u drugom gradu?",
      respuesta: "Vrijedi stopa mjesta prebivališta ili uobičajenog boravišta, a ne mjesta rada. Niža stopa u Rijeci je {{hr.stopa-niza[rijeka]}} i za onoga tko radi u Zagrebu.",
    },
    {
      pregunta: "Kada se mijenjaju stope?",
      respuesta: "Gradovi i općine odluke donose do kraja studenog, a primjenjuju se od 1. siječnja iduće godine. Ovdje je tablica Porezne uprave koja vrijedi od {{hr.stopa-niza#desde}}.",
    },
    {
      pregunta: "Plaćam li porez ako nemam dovoljno dohotka?",
      respuesta: "Ne. Ako je dohodak manji od godišnjeg odbitka, osnovica je nula i poreza nema.",
    },
  ],
  glosario: [
    { termino: "Porezna osnovica", definicion: "Dohodak nakon doprinosa, umanjen za osobni odbitak." },
    { termino: "Godišnji obračun", definicion: "Konačni izračun poreza koji provodi Porezna uprava, s povratom ili doplatom." },
    { termino: "Jedinica lokalne samouprave", definicion: "Grad ili općina koja određuje stope poreza." },
  ],
});
