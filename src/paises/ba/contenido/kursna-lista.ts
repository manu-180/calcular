import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ba.kursna-lista",
  h1: "Kursna lista {{anio}}: euro, dolar i franak u KM",
  title: "Kursna lista {{anio}}: 1 euro je {{ba.kurs-eur}}",
  description: "Euro vrijedi tačno {{ba.kurs-eur}}, a dolar {{ba.usd}}. Pretvorite EUR, USD, GBP, CHF ili RSD u KM po srednjem kursu Centralne banke.",
  intro: [
    "Konvertibilna marka je vezana za euro. Kurs Centralne banke BiH je fiksan, {{ba.kurs-eur}} za jedan euro, pa se ne mijenja iz dana u dan.",
    "Ostali kursevi kreću se s eurom na svjetskom tržištu. Na zadnjoj unesenoj listi (datum: {{ba.usd#desde}}) dolar je {{ba.usd}}, funta {{ba.gbp}} i franak {{ba.chf}}.",
  ],
  comoSeCalcula: [
    "Iz valute u KM: iznos puta srednji kurs. Iz KM u valutu: iznos podijeljen srednjim kursom.",
    "Centralna banka objavljuje kupovni, srednji i prodajni kurs. Kalkulator koristi srednji.",
    "Kod dinara lista navodi kurs za 100 jedinica, a kalkulator ga svodi na jedan dinar.",
  ],
  ejemplo: [
    "Za 100 eura dobijate 195,58 KM po kursu Centralne banke. Za 1.000 KM po listi od 31. oktobra 2026. dobili biste 571,22 dolara.",
    "Ako kupujete 500 švicarskih franaka, po srednjem kursu s te liste plaćate oko 1.064 KM, a u mjenjačnici obično nešto više.",
  ],
  faq: [
    {
      pregunta: "Da li se kurs eura mijenja?",
      respuesta: "Na kursnoj listi CBBiH euro ima isti kupovni, srednji i prodajni kurs: {{ba.kurs-eur}}. Ostale valute imaju tri različita broja, koja se mijenjaju svakog radnog dana.",
    },
    {
      pregunta: "Kada izlazi nova lista?",
      respuesta: "CBBiH na stranici kursne liste navodi da je objavljuje svakog radnog dana poslije 16 sati, od promjene rasporeda Evropske centralne banke 1. jula 2016.",
    },
    {
      pregunta: "Zašto mi banka daje drugačiji iznos?",
      respuesta: "Banke i mjenjačnice određuju vlastite kupovne i prodajne kurseve. Lista Centralne banke pokazuje samo službeni srednji, kupovni i prodajni kurs.",
    },
  ],
  glosario: [
    { termino: "KM", definicion: "Konvertibilna marka, službena valuta BiH, oznaka BAM." },
    { termino: "Srednji kurs", definicion: "Sredina između kupovnog i prodajnog kursa." },
    { termino: "CBBiH", definicion: "Centralna banka Bosne i Hercegovine." },
  ],
});
