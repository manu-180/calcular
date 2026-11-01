import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "si.kalkulator-inflacije",
  h1: "Kalkulator inflacije {{anio}}: vrednost denarja v Sloveniji",
  title: "Kalkulator inflacije {{anio}} po podatkih SURS",
  description: "Preračunajte znesek na današnje cene z indeksom cen življenjskih potrebščin SURS. Zadnji indeks: {{si.ipc}}. Izračunajte kupno moč.",
  intro: [
    "Koliko je danes vrednih 1.000 € iz leta 2020? Kalkulator primerja indeks cen življenjskih potrebščin za dva meseca in pove, kolikšen znesek ohranja enako kupno moč.",
    "Podatki so iz baze SiStat Statističnega urada RS. Zadnji indeks je {{si.ipc}}, velja za ta mesec: {{si.ipc#desde}}. Indeks je preračunan na povprečje leta 2025.",
  ],
  comoSeCalcula: [
    "Faktor = indeks končnega meseca / indeks začetnega meseca.",
    "Enaka kupna moč = znesek × faktor. Vrednost zneska v starih cenah = znesek / faktor.",
    "Podatki so na voljo od decembra 2016. Če izberete mesec po zadnji objavi, računamo do zadnjega objavljenega meseca.",
  ],
  ejemplo: [
    "1.000,00 € iz januarja 2020 ima pri indeksih 80,15 in 104,13 v septembru 2026 enako kupno moč kot 1.299,19 €. Cene so se v tem času zvišale za 29,9 odstotka.",
  ],
  faq: [
    {
      pregunta: "Katero mero inflacije uporablja kalkulator?",
      respuesta: "Indeks cen življenjskih potrebščin (ICŽP), skupaj za vse izdelke, iz tabele SURS 0400608S po klasifikaciji ECOICOP različice 2.",
    },
    {
      pregunta: "Ali je to tudi uskladitev najemnine?",
      respuesta: "Kalkulator pokaže rast cen. Za pogodbeno uskladitev preverite, kateri indeks in obdobje določa vaša pogodba.",
    },
    {
      pregunta: "Zakaj je indeks drugačen od podatka v novicah?",
      respuesta: "V novicah je pogosto letna inflacija: mesec proti istemu mesecu prejšnjega leta. Tu uporabljamo stalni indeks, da lahko primerjamo poljubna meseca.",
    },
  ],
  glosario: [
    { termino: "ICŽP", definicion: "Indeks cen življenjskih potrebščin." },
    { termino: "Kupna moč", definicion: "Količina dobrin, ki jih lahko kupimo z določenim zneskom." },
  ],
});
