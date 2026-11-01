import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "dk.inflationsberegner",
  h1: "Inflationsberegner: hvad er beløbet værd i dag?",
  title: "Inflationsberegner: omregn kroner med forbrugerprisindekset",
  description:
    "Se hvad et beløb fra tidligere svarer til i dagens priser. Beregneren bruger Danmarks Statistiks forbrugerprisindeks måned for måned fra december 2000.",
  intro: [
    "Priserne stiger over tid, så 1.000 kr. for nogle år siden købte mere end i dag. Beregneren viser, hvor meget beløbet skal være i dag for at have samme købekraft.",
    "Vælg beløbet og to måneder. Beregneren bruger forbrugerprisindekset fra Danmarks Statistik.",
  ],
  comoSeCalcula: [
    "Beløbet ganges med indekset i slutmåneden og divideres med indekset i startmåneden.",
    "Er slutmåneden endnu ikke offentliggjort, regner vi til den seneste måned med tal.",
    "Seneste indeks er {{dk.fpi}} ({{dk.fpi#desde}}).",
  ],
  ejemplo: ["Forbrugerprisindekset var 100,41 i september 2025 og 102,60 i september 2026. 1.000 kr. fra september 2025 svarer til 1.021,81 kr. et år senere."],
  faq: [
    {
      pregunta: "Hvor stor er inflationen i Danmark?",
      respuesta: "Vælg de to måneder, du vil sammenligne. Fra september 2025 til september 2026 steg forbrugerpriserne med 2,2 %.",
    },
    {
      pregunta: "Hvilket indeks bruger beregneren?",
      respuesta: "Forbrugerprisindekset i alt fra Danmarks Statistik (tabel PRIS01). Det måler prisudviklingen på de varer og tjenester, husholdningerne køber.",
    },
    {
      pregunta: "Hvornår kommer nye tal?",
      respuesta: "Danmarks Statistik offentliggør forbrugerprisindekset hver måned. Beregneren opdateres, når nye tal er ude.",
    },
  ],
  glosario: [
    { termino: "Forbrugerprisindeks", definicion: "Et indeks for prisudviklingen på varer og tjenester til private." },
    { termino: "Købekraft", definicion: "Hvor meget du kan købe for et bestemt beløb." },
  ],
});
