import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "rs.kalkulator-inflacije",
  h1: "Kalkulator inflacije u Srbiji",
  title: "Kalkulator inflacije {{anio}}: kupovna moć dinara po mesecima",
  description: "Izračunajte koliko danas vredi iznos iz prošlosti, po indeksu potrošačkih cena RZS od januara 2011. Poslednji podatak je za {{rs.ipc#desde}}.",
  intro: [
    "Indeks potrošačkih cena Republičkog zavoda za statistiku za {{rs.ipc#desde}} iznosi {{rs.ipc}}, uz bazu 2025 = 100. Iz tog niza kalkulator računa koliko bi dinara danas imalo istu kupovnu moć.",
    "Unesite iznos, mesec iz koga potiče i mesec do koga računate. Podaci postoje od januara 2011.",
  ],
  comoSeCalcula: [
    "Uzima se indeks potrošačkih cena za početni i krajnji mesec.",
    "Faktor = indeks krajnjeg meseca podeljen indeksom početnog meseca.",
    "Ista kupovna moć = iznos puta faktor. Inflacija za period = (faktor minus 1) puta 100.",
  ],
  ejemplo: [
    "Od septembra 2025. do septembra 2026. indeks je porastao sa 99,6 na 103,8, što je 4,2 odsto. Za istu kupovnu moć od 100.000 dinara treba oko 104.217 dinara.",
    "Obrnuto, 100.000 dinara iz septembra 2026. vredi oko 95.954 dinara u cenama iz septembra 2025.",
  ],
  faq: [
    {
      pregunta: "Odakle su podaci?",
      respuesta: "Iz baznih indeksa potrošačkih cena Republičkog zavoda za statistiku (ECOICOP ver. 2, baza 2025 = 100), koji se koriste kao mera inflacije.",
    },
    {
      pregunta: "Zašto se računa samo do poslednjeg objavljenog meseca?",
      respuesta: "RZS objavljuje indeks posle isteka meseca. Ako izaberete kasniji mesec, kalkulator računa do poslednjeg dostupnog.",
    },
    {
      pregunta: "Da li je rezultat isto što i rast moje plate?",
      respuesta: "Ne. Inflacija je prosek za celu korpu proizvoda i usluga, a vaši troškovi mogu da rastu brže ili sporije.",
    },
  ],
  glosario: [
    { termino: "Indeks potrošačkih cena", definicion: "Mera promene cena proizvoda i usluga koje domaćinstva kupuju." },
    { termino: "Kupovna moć", definicion: "Koliko se proizvoda i usluga može kupiti za dati iznos." },
    { termino: "RZS", definicion: "Republički zavod za statistiku." },
  ],
});
