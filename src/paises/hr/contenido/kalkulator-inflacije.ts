import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "hr.kalkulator-inflacije",
  h1: "Kalkulator inflacije {{anio}}: vrijednost novca kroz godine",
  title: "Kalkulator inflacije {{anio}}: vrijednost eura u Hrvatskoj",
  description: "Izračunajte koliko danas vrijedi iznos iz prošlosti prema harmoniziranom indeksu potrošačkih cijena za Hrvatsku, od 2000. do zadnjeg objavljenog mjeseca.",
  intro: [
    "Kalkulator uspoređuje dva mjeseca po harmoniziranom indeksu potrošačkih cijena za Hrvatsku. Indeks izračunava Državni zavod za statistiku, a objavljuje ga Eurostat. Zadnja vrijednost je {{hr.ipc}} (2025 = 100), za {{hr.ipc#desde}}.",
    "Pokazuje koliko bi vam danas trebalo za istu kupovnu moć i koliko je inflacija bila za cijelo razdoblje.",
  ],
  comoSeCalcula: [
    "Uzme se vrijednost indeksa za početni i završni mjesec. Omjer završnog i početnog je faktor rasta cijena.",
    "Iznos se množi tim faktorom. Ako završni mjesec još nije objavljen, računamo do zadnjeg objavljenog.",
    "Za iznose iz vremena kune prvo sami preračunajte kune u eure po fiksnom tečaju, a zatim ih unesite ovdje.",
  ],
  ejemplo: [
    "Iznos od 1.000 eura iz siječnja 2020. Indeks je tada bio 74.82, a u rujnu 2026. 105.42. Za istu kupovnu moć trebalo bi 1408,98 eura.",
    "Godinu dana unatrag, od rujna 2025. (indeks 101.04), 1.000 eura vrijedi kao 1043,35 eura u rujnu 2026.",
  ],
  faq: [
    {
      pregunta: "Je li ovo isto što i službeni indeks cijena DZS-a?",
      respuesta: "Nije posve. Ovdje je harmonizirani indeks (HICP), izračunan po metodologiji usporedivoj u EU-u. Nacionalni indeks DZS-a može se malo razlikovati.",
    },
    {
      pregunta: "Kada se objavljuje novi podatak?",
      respuesta: "Svaki mjesec. Zadnji učitani podatak ovdje je za {{hr.ipc#desde}}, a novi se učitava sam kad ga Eurostat objavi.",
    },
    {
      pregunta: "Može li se ovako usklađivati stanarina ili plaća?",
      respuesta: "Može kao orijentacija. Ako ugovor navodi određeni indeks ili izvor, vrijedi ono što piše u ugovoru.",
    },
  ],
  glosario: [
    { termino: "HICP", definicion: "Harmonizirani indeks potrošačkih cijena, usporediv među državama EU-a." },
    { termino: "Kupovna moć", definicion: "Što se može kupiti za određeni iznos novca." },
    { termino: "Inflacija", definicion: "Rast opće razine cijena u nekom razdoblju." },
  ],
});
