import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ba.prekovremeni-rad",
  h1: "Prekovremeni rad {{anio}}: obračun uvećane satnice",
  title: "Prekovremeni rad {{anio}}: {{ba.uvecanje-rs[prekovremeni]}} u RS, procenat u FBiH",
  description: "U RS prekovremeni rad nosi najmanje {{ba.uvecanje-rs[prekovremeni]}}, noćni {{ba.uvecanje-rs[nocni]}}, praznik {{ba.uvecanje-rs[praznik]}}. U FBiH upišite procenat iz svog ugovora. Saznajte iznos.",
  intro: [
    "Republika Srpska ima propisan minimum: {{ba.uvecanje-rs[prekovremeni]}} za prekovremeni rad, {{ba.uvecanje-rs[nocni]}} za noćni i {{ba.uvecanje-rs[praznik]}} za državne praznike i druge neradne dane. Ta uvećanja se međusobno ne isključuju.",
    "Federacija BiH daje pravo na uvećanu platu, ali zakon ne navodi procenat. On stoji u kolektivnom ugovoru ili pravilniku o radu, pa ga upisujete sami.",
    "Prekovremeni rad u FBiH može trajati najviše {{ba.prekovremeno-sedmicno-fbih}} sedmično.",
  ],
  comoSeCalcula: [
    "Satnica je mjesečna osnovna plata podijeljena radnim satima u mjesecu.",
    "Uvećana satnica je satnica plus procenat uvećanja. Za RS kalkulator koristi minimum iz odluke Vlade, a za FBiH vaš procenat.",
    "Ukupno je uvećana satnica puta broj prekovremenih sati. Iznos je u istom obliku kao plata koju upišete: bruto ako je bruto.",
  ],
  ejemplo: [
    "Osnovna plata 1.760 KM i 176 radnih sati daju satnicu 10 KM. U RS deset prekovremenih sati vrijedi 125 KM.",
    "Ako vam kolektivni ugovor u FBiH daje 30 odsto, istih deset sati vrijedi 130 KM.",
  ],
  faq: [
    {
      pregunta: "Ko određuje uvećanje u RS?",
      respuesta: "Vlada RS, Odlukom o utvrđivanju uvećanja plate („Službeni glasnik RS” 53/16, izmjene 12/22 i 39/22), na osnovu člana 134 Zakona o radu. Primjenjuje se do zaključenja Opšteg kolektivnog ugovora.",
    },
    {
      pregunta: "Zašto kalkulator ne daje procenat za FBiH?",
      respuesta: "Član 76 Zakona o radu FBiH kaže da radnik ima pravo na povećanu platu u skladu s kolektivnim ugovorom, pravilnikom o radu i ugovorom. Procenta u samom zakonu nema, pa ga ne izmišljamo.",
    },
    {
      pregunta: "Koliko sati prekovremenog rada smijem imati u FBiH?",
      respuesta: "Član 38: najviše {{ba.prekovremeno-sedmicno-fbih}} sedmično. Ako rad traje duže od tri sedmice neprekidno ili više od deset sedmica godišnje, poslodavac obavještava inspekciju rada.",
    },
    {
      pregunta: "Kome je prekovremeni rad zabranjen u RS?",
      respuesta: "Član 64 Zakona o radu RS zabranjuje ga radnicima mlađim od 18 godina, trudnicama i majkama s djetetom do tri godine i samohranim roditeljima djeteta mlađeg od šest godina. Trudnice, majke i roditelji mogu raditi na svoj pisani zahtjev.",
    },
  ],
  glosario: [
    { termino: "Satnica", definicion: "Plata za jedan radni sat." },
    { termino: "Uvećanje", definicion: "Procenat koji se dodaje na satnicu za rad u posebnim uslovima." },
    { termino: "Fond sati", definicion: "Ukupan broj radnih sati u mjesecu." },
  ],
});
