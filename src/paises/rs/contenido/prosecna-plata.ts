import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "rs.prosecna-plata",
  h1: "Prosečna plata u Srbiji",
  title: "Prosečna plata u Srbiji {{anio}}: uporedite svoju zaradu",
  description: "Prosečna neto zarada je {{rs.prosecna-neto}}, a bruto {{rs.prosecna-bruto}}, po podatku RZS za {{rs.prosecna-neto#desde}}. Uporedite svoju platu sa prosekom.",
  intro: [
    "Prosečna neto zarada u Srbiji je {{rs.prosecna-neto}}, a bruto {{rs.prosecna-bruto}}, po poslednjem podatku Republičkog zavoda za statistiku za {{rs.prosecna-neto#desde}}.",
    "Unesite svoju neto platu i videćete koliki je to procenat proseka i kolika je razlika u dinarima. Minimalna cena rada je {{rs.minimalna-cena-rada}} po času.",
  ],
  comoSeCalcula: [
    "Odnos = vaša neto plata podeljena prosečnom neto zaradom, puta 100.",
    "Razlika = vaša neto plata minus prosečna neto zarada.",
    "Prosek se računa po zaposlenom za obračunski mesec, pa se menja kad RZS objavi novi podatak.",
  ],
  ejemplo: [
    "Neto plata od 100.000 dinara prema proseku od 117.282 dinara za avgust 2026. je oko 85,3 odsto proseka, odnosno 17.282 dinara manje.",
    "Plata od 150.000 dinara je oko 127,9 odsto proseka, ili 32.718 dinara više.",
  ],
  faq: [
    {
      pregunta: "Koliko je porasla prosečna zarada?",
      respuesta: "Prema saopštenju RZS, prosečna neto zarada za avgust 2026. nominalno je veća za 11,1 odsto, a realno za 8,7 odsto u odnosu na isti mesec prethodne godine.",
    },
    {
      pregunta: "Zašto je medijana važna?",
      respuesta: "Prosek povlače naviše visoke zarade. RZS objavljuje i medijalnu zaradu, koja deli zaposlene na dve jednake polovine.",
    },
    {
      pregunta: "Gde se još koristi prosečna zarada?",
      respuesta: "Za otpremninu pri odlasku u penziju (Zakon o radu, čl. 119) i, kao 12-mesečni prosek, za najnižu i najvišu osnovicu doprinosa (Zakon o doprinosima, čl. 37 i 42).",
    },
  ],
  glosario: [
    { termino: "Prosečna zarada", definicion: "Ukupne obračunate zarade podeljene brojem zaposlenih." },
    { termino: "Medijalna zarada", definicion: "Iznos koji polovina zaposlenih ne dostiže, a polovina prelazi." },
    { termino: "RZS", definicion: "Republički zavod za statistiku." },
  ],
});
