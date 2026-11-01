import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "me.prosjecna-zarada",
  h1: "Prosječna plata u Crnoj Gori {{anio}}: gdje ste vi u odnosu na nju",
  title: "Prosječna zarada {{anio}}: neto {{me.prosjecna-neto}}, bruto {{me.prosjecna-bruto}}",
  description: "MONSTAT za {{me.prosjecna-neto#desde}} navodi prosječnu neto zaradu {{me.prosjecna-neto}} i bruto {{me.prosjecna-bruto}}. Unesite svoju platu i vidite koliki je to procenat prosjeka.",
  intro: [
    "Prosječna neto zarada u Crnoj Gori je {{me.prosjecna-neto}}, a bruto {{me.prosjecna-bruto}}, prema poslednjem saopštenju MONSTAT-a za {{me.prosjecna-neto#desde}}.",
    "Unesite svoju neto zaradu. Kalkulator pokazuje koliko je to procenata prosjeka i kolika je razlika u eurima, a zgodno je i poređenje sa minimalcem od {{me.minimalna-do-v}}.",
  ],
  comoSeCalcula: [
    "Vaša neto zarada dijeli se poslednjom objavljenom prosječnom neto zaradom i množi sa 100.",
    "Razlika u eurima je vaša zarada minus prosjek.",
    "Prosjek je statistički podatak za sve zaposlene. Polovina ljudi ne zarađuje nužno toliko: visoke plate podižu prosjek.",
  ],
  ejemplo: [
    "Sa neto zaradom od 1.000 eura i prosjekom od 1.043 eura za septembar 2026, imate 95,9 odsto prosjeka, odnosno 43 eura manje od njega.",
    "Isti iznos je 166,7 odsto minimalca za radna mjesta do V nivoa kvalifikacije, pa odmah vidite koliko je vaša plata iznad zakonskog dna.",
  ],
  faq: [
    {
      pregunta: "Kolika je bila prosječna plata u 2025?",
      respuesta: "MONSTAT u saopštenju za decembar 2025. navodi da je na nivou 2025. prosječna bruto zarada bila {{me.prosjecna-bruto-2025}}, a neto {{me.prosjecna-neto-2025}}.",
    },
    {
      pregunta: "Zašto je ovaj podatak važan za obračune?",
      respuesta: "Prosjek iz prethodne godine ulazi u osnovicu doprinosa za preduzetnike (Zakon o doprinosima, čl. 9), a prosjek prethodnog polugodišta u obračun otpremnine (Zakon o radu, čl. 169a).",
    },
    {
      pregunta: "Koliko često se objavljuje?",
      respuesta: "MONSTAT saopštenje o zaradama objavljuje svakog mjeseca, sa podatkom za prethodni mjesec. Saopštenje za septembar 2026. objavljeno je 30. oktobra 2026.",
    },
  ],
  glosario: [
    { termino: "MONSTAT", definicion: "Uprava za statistiku Crne Gore." },
    { termino: "Zarada bez poreza i doprinosa", definicion: "Naziv koji MONSTAT koristi za neto zaradu." },
    { termino: "Realna zarada", definicion: "Zarada umanjena za rast potrošačkih cijena." },
  ],
});
