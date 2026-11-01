import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "me.kalkulator-inflacije",
  h1: "Kalkulator inflacije {{anio}}: koliko vrijedi vaš novac danas",
  title: "Kalkulator inflacije {{anio}}: kupovna moć eura, MONSTAT",
  description: "Uporedite vrijednost eura između dva mjeseca od 2016. do danas. Indeks potrošačkih cijena MONSTAT-a, poslednji podatak {{me.ipc#desde}}: {{me.ipc}}.",
  intro: [
    "Poslednji indeks potrošačkih cijena koji je MONSTAT objavio je {{me.ipc}} za mjesec {{me.ipc#desde}}, uz osnovu 2025 = 100. U septembru 2026. cijene su bile 5,2 odsto više nego godinu ranije.",
    "Unesite iznos i dva mjeseca. Vidjećete koliko novca treba danas za istu kupovnu moć, na primjer za poređenje stare kirije ili plate.",
  ],
  comoSeCalcula: [
    "Uzimaju se dva mjesečna indeksa iz baze MONSTAT-a. Njihov odnos je faktor promjene cijena.",
    "Iznos pomnožen tim faktorom daje istu kupovnu moć na kraju perioda. Podijeljen faktorom, kaže koliko je današnji iznos vrijedio na početku.",
    "Računa se ukupan indeks za Crnu Goru, a ne cijene jedne grupe proizvoda.",
  ],
  ejemplo: [
    "1.000 eura iz septembra 2025. u septembru 2026. odgovara iznosu od 1.052,29 eura. Razlika od 52,29 eura pokazuje rast cijena za tih dvanaest mjeseci.",
  ],
  faq: [
    {
      pregunta: "Koja je trenutna inflacija u Crnoj Gori?",
      respuesta: "MONSTAT je 13. oktobra 2026. objavio da su cijene u septembru bile za 0,5 odsto više nego u avgustu i za 5,2 odsto više nego u septembru 2025. U periodu januar do septembar rast je 3,7 odsto u odnosu na isti period prošle godine.",
    },
    {
      pregunta: "Šta je najviše poskupjelo?",
      respuesta: "U istom saopštenju godišnji rast je najveći u grupi prevoz (18,5 odsto), zatim u grupi alkoholna pića i duvan (10,3 odsto) i kod restorana i smještaja (6,6 odsto).",
    },
    {
      pregunta: "Odakle počinju podaci?",
      respuesta: "Baza podataka MONSTAT-a sa osnovom 2025 ima mjesečni indeks od januara 2016. godine. Za ranije godine postoji arhivska baza sa osnovom 2015, koju ovaj kalkulator ne koristi.",
    },
  ],
  glosario: [
    { termino: "Indeks potrošačkih cijena", definicion: "Mjera prosječne promjene cijena proizvoda i usluga lične potrošnje." },
    { termino: "Godišnja stopa", definicion: "Promjena cijena u odnosu na isti mjesec prethodne godine." },
    { termino: "Kupovna moć", definicion: "Količina dobara koja se može kupiti za isti novac." },
  ],
});
