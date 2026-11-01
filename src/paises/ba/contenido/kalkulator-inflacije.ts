import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ba.kalkulator-inflacije",
  h1: "Kalkulator inflacije {{anio}}: koliko vrijedi vaš novac",
  title: "Kalkulator inflacije {{anio}}: indeks cijena {{ba.ipc}}",
  description: "Preračunajte stari iznos po indeksu potrošačkih cijena u RS, koji je {{ba.ipc}} (2015 = 100). Vidite koliko vam danas treba za istu kupovnu moć.",
  intro: [
    "Indeks potrošačkih cijena u Republici Srpskoj, s bazom 2015 = 100 i datumom {{ba.ipc#desde}} iznosi {{ba.ipc}}. Računamo s njim, jer je to jedini mjesečni indeks s bazom koji smo mogli pročitati u službenom izvoru.",
    "Agencija za statistiku BiH nije bila dostupna pri provjeri, a Federalni zavod na početnoj stranici daje mjesečnu i godišnju promjenu. Zato kalkulator pokazuje kretanje u RS i dobar je samo kao procjena za cijelu zemlju.",
  ],
  comoSeCalcula: [
    "Iznos se množi količnikom indeksa krajnjeg i početnog mjeseca.",
    "Računa se samo mjesec, ne i dan. Ako upišete mjesec bez objave, koristimo zadnji objavljeni.",
    "Serija počinje januarom 2024, a podaci su iz mjesečnih saopštenja Republičkog zavoda za statistiku.",
  ],
  ejemplo: [
    "Za ono što je u septembru 2025. koštalo 1.000 KM u septembru 2026. trebalo je oko 1.060 KM. Zavod je za isti period objavio rast od 6,0 odsto.",
  ],
  faq: [
    {
      pregunta: "Zašto kalkulator koristi podatke iz RS?",
      respuesta: "Saopštenja Republičkog zavoda navode indeks s bazom 2015 = 100 za svaki mjesec, što je potrebno za ovaj obračun. Federalni zavod na svojoj stranici navodi mjesečnu i godišnju promjenu, a Agencija za statistiku BiH nije se mogla otvoriti.",
    },
    {
      pregunta: "Koliko je inflacija u FBiH?",
      respuesta: "Federalni zavod za statistiku objavio je da su cijene u septembru 2026. za 1,4 odsto veće nego u avgustu i 5,7 odsto veće nego godinu ranije.",
    },
    {
      pregunta: "Da li se ovim usklađuje najniža plata?",
      respuesta: "Ne direktno. Uredba u FBiH koristi rast potrošačkih cijena u Federaciji za period januar do septembar, zajedno s rastom BDP-a, a ne ovaj indeks.",
    },
  ],
  glosario: [
    { termino: "Indeks potrošačkih cijena", definicion: "Mjera promjene cijena robe i usluga koje kupuju domaćinstva." },
    { termino: "Baza 2015 = 100", definicion: "Prosječne cijene 2015. godine uzete su kao polazište." },
    { termino: "Kupovna moć", definicion: "Koliko se robe može kupiti istim novcem." },
  ],
});
