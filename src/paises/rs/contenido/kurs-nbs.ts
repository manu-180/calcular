import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "rs.kurs-nbs",
  h1: "Kurs NBS: srednji kurs evra i drugih valuta",
  title: "Kurs NBS {{anio}}: srednji kurs evra, dolara, franka i funte",
  description: "Pretvorite evre, dolare, franke i funte po zvaničnom srednjem kursu NBS. Evro je {{rs.eur}} na dan {{rs.eur#desde}}. Važi i u obrnutom smeru.",
  intro: [
    "Zvanični srednji kurs evra je {{rs.eur}}, dolara {{rs.usd}}, švajcarskog franka {{rs.chf}} i britanske funte {{rs.gbp}}, po kursnoj listi NBS od {{rs.eur#desde}}.",
    "Ovaj kurs se koristi u ugovorima i obračunima. Banke i menjačnice rade po svojim kupovnim i prodajnim kursevima, pa će iznos na šalteru biti drugačiji.",
  ],
  comoSeCalcula: [
    "Iz valute u dinare: iznos puta srednji kurs.",
    "Iz dinara u valutu: iznos podeljen srednjim kursom.",
    "Kurs se na ovoj strani osvežava sa kursne liste NBS. Datum kursa vidite u rezultatu.",
  ],
  ejemplo: [
    "Po kursu od 117,5367 dinara za evro, 100 evra je 11.753,67 dinara.",
    "Po kursu od 105,0560 dinara za dolar, 10.000 dinara je 95,19 dolara.",
  ],
  faq: [
    {
      pregunta: "Šta je srednji kurs?",
      respuesta: "Zvanični kurs dinara koji objavljuje Narodna banka Srbije na kursnoj listi. Dnevnice u inostranstvu, na primer, u dinare se pretvaraju po tom kursu (Zakon o porezu na dohodak građana, čl. 18).",
    },
    {
      pregunta: "Koliko decimala ima kurs?",
      respuesta: "Četiri, kao na kursnoj listi NBS. Rezultat pretvaranja je zaokružen na dve decimale, pa kod velikih iznosa pogledajte i sam kurs u rezultatu.",
    },
    {
      pregunta: "Zašto je kurs u menjačnici drugačiji?",
      respuesta: "Menjačnice i banke imaju svoje kupovne i prodajne kurseve, a srednji kurs NBS služi kao zvanična referenca.",
    },
    {
      pregunta: "Da li kurs važi i vikendom?",
      respuesta: "Vikendom se koristi poslednja objavljena lista. Datum kursa uvek piše uz rezultat.",
    },
  ],
  glosario: [
    { termino: "NBS", definicion: "Narodna banka Srbije." },
    { termino: "Srednji kurs", definicion: "Zvanični kurs dinara sa kursne liste NBS." },
    { termino: "Kursna lista", definicion: "Dnevni pregled kurseva koji objavljuje NBS." },
  ],
});
