import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ba.otpremnina",
  h1: "Otpremnina {{anio}}: najmanji iznos po zakonu o radu",
  title: "Otpremnina {{anio}}: trećina plate za svaku godinu rada",
  description: "Otpremnina je najmanje trećina prosječne plate po godini rada, najviše {{ba.otpremnina-tope@fbih}} plata, poslije {{ba.otpremnina-godine@fbih}} rada. Obračun za FBiH i RS.",
  intro: [
    "Ako vam poslodavac otkaže ugovor na neodređeno vrijeme nakon najmanje {{ba.otpremnina-godine@fbih}} neprekidnog rada, imate pravo na otpremninu. U oba entiteta minimum je jedna trećina prosječne plate za svaku navršenu godinu.",
    "Gornja granica je {{ba.otpremnina-tope@fbih}} prosječnih plata iz zadnja tri mjeseca, a u RS je osnova neto plata. Kolektivni ugovor ili ugovor o radu mogu odrediti više u okviru te granice.",
  ],
  comoSeCalcula: [
    "Prosječna plata u zadnja tri mjeseca, podijeljena s {{ba.otpremnina-djelilac@fbih}}, puta navršene godine rada kod tog poslodavca.",
    "Rezultat ne može preći {{ba.otpremnina-tope@fbih}} prosječnih plata.",
    "Prava nema radnik kome je otkazano zbog kršenja obaveza ili neispunjavanja ugovora. To je izuzetak koji zakon izričito navodi, pa ga kalkulator ne procjenjuje.",
  ],
  ejemplo: [
    "Prosječna plata 1.500 KM i šest godina rada daju 3.000 KM. Da je radnik proveo 30 godina kod istog poslodavca, trećina bi bila 15.000 KM, ali zakon zaustavlja iznos na 9.000 KM.",
  ],
  faq: [
    {
      pregunta: "Gdje je otpremnina propisana u FBiH?",
      respuesta: "U članu 111 Zakona o radu FBiH („Službene novine FBiH” 26/16 i 89/18). Stav 2 daje minimum od jedne trećine prosječne mjesečne plate, a stav 3 granicu od šest plata.",
    },
    {
      pregunta: "Gdje je propisana u RS?",
      respuesta: "U članu 194 Zakona o radu RS. Stav 2 navodi trećinu neto prosječne mjesečne plate po godini rada, a stav 3 granicu od šest plata. Izmjena iz „Službenog glasnika RS” 119/21 vratila je riječ neto.",
    },
    {
      pregunta: "Može li otpremnina biti veća kod invaliditeta?",
      respuesta: "Da. Član 74 Zakona o radu FBiH propisuje iznos veći za najmanje 50 %, a član 118 zakona RS najmanje dvostruki iznos, za radnika kojem poslodavac zbog promijenjene radne sposobnosti ne može obezbijediti posao. Kalkulator računa samo osnovni slučaj.",
    },
  ],
  glosario: [
    { termino: "Otpremnina", definicion: "Novac koji poslodavac plaća radniku pri otkazu, prema dužini rada." },
    { termino: "Neodređeno vrijeme", definicion: "Ugovor o radu bez datuma završetka." },
    { termino: "Prosječna plata", definicion: "Prosjek plata isplaćenih u zadnja tri mjeseca prije prestanka ugovora." },
  ],
});
