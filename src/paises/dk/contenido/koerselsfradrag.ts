import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "dk.koerselsfradrag",
  h1: "Beregn kørselsfradrag (befordringsfradrag)",
  title: "Kørselsfradrag 2026: beregn dit befordringsfradrag",
  description:
    "Beregn kørselsfradraget for turen mellem hjem og arbejde med satserne for 2026: {{dk.koerselsfradrag[mellem]}} pr. km fra 25 til 120 km. Se også fradragets værdi.",
  intro: [
    "Har du langt til arbejde, kan du få kørselsfradrag. Fradraget regnes ud fra afstanden mellem hjem og arbejde.",
    "Skriv afstanden tur-retur og antal arbejdsdage. Beregneren viser fradraget og hvor meget det sparer dig i skat.",
  ],
  comoSeCalcula: [
    "De første {{dk.koerselsfradrag-km[uden-fradrag]}} km om dagen tur-retur giver intet fradrag.",
    "Fra 25 til {{dk.koerselsfradrag-km[lav-sats-over]}} km er fradraget {{dk.koerselsfradrag[mellem]}} pr. km. Over {{dk.koerselsfradrag-km[lav-sats-over]}} km er det {{dk.koerselsfradrag[over-120]}} pr. km.",
    "Bor du i en yderkommune eller på en af de omfattede småøer, er satsen {{dk.koerselsfradrag[yderkommune]}} pr. km for al kørsel over {{dk.koerselsfradrag-km[uden-fradrag]}} km.",
    "Fradraget trækkes fra den skattepligtige indkomst. Det er værd cirka det, du betaler i kommuneskat og kirkeskat.",
  ],
  ejemplo: ["I 2026 med 60 km tur-retur i 216 dage får du 24.649,92 kr. i kørselsfradrag. I København sparer det dig 5.962,82 kr. i skat med kirkeskat."],
  faq: [
    {
      pregunta: "Hvor meget er kørselsfradraget i 2026?",
      respuesta: "Satserne er midlertidigt sat op i 2026: {{dk.koerselsfradrag[mellem]}} pr. km fra 25 til 120 km og {{dk.koerselsfradrag[over-120]}} over 120 km. I 2025 var satsen 2,23 kr.",
    },
    {
      pregunta: "Får jeg fradrag for broen?",
      respuesta: "Ja. I 2026 er der et ekstra fradrag på 110 kr. pr. tur over Storebæltsbroen i bil (15 kr. med kollektiv trafik) og 50 kr. over Øresundsbroen (8 kr. med kollektiv trafik).",
    },
    {
      pregunta: "Hvad hvis jeg tjener lidt?",
      respuesta: "Tjener du under 391.500 kr. i 2026 (før am-bidrag), kan du få et ekstra kørselsfradrag på højst 30.800 kr. Beregneren regner ikke med det ekstra fradrag.",
    },
  ],
  glosario: [
    { termino: "Befordringsfradrag", definicion: "Det officielle navn for kørselsfradraget." },
    { termino: "Yderkommune", definicion: "En af de kommuner, loven nævner, hvor kørselsfradraget er højere." },
  ],
});
