import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "si.davek-na-promet-nepremicnin",
  h1: "Davek na promet nepremičnin {{anio}}: izračun",
  title: "Davek na promet nepremičnin {{anio}}: izračun",
  description: "Davek na promet nepremičnin znaša {{si.davek-promet-nepremicnin}} od prodajne cene. Izračunajte znesek in koliko prodajalcu ostane po davku.",
  intro: [
    "Davek na promet nepremičnin se plača po stopnji {{si.davek-promet-nepremicnin}} od prodajne cene. Zavezanec je po 5. členu ZDPN-2 prodajalec, a stranki se v pogodbi pogosto dogovorita drugače.",
    "FURS navaja tudi posebne primere, ki štejejo za prenos: menjava, finančni najem in podobno.",
  ],
  comoSeCalcula: [
    "Davek = prodajna cena × {{si.davek-promet-nepremicnin}}.",
    "Prodajna cena je vse, kar prodajalec dobi od kupca: denar, stvari, storitve in prevzeti dolgovi (8. člen ZDPN-2).",
    "Obveznost nastane ob sklenitvi pogodbe (7. člen ZDPN-2).",
  ],
  ejemplo: [
    "Stanovanje za 200.000,00 €: davek je 4.000,00 €, prodajalcu po davku ostane 196.000,00 €, če nosi davek on.",
  ],
  faq: [
    {
      pregunta: "Kdo plača davek na promet nepremičnin?",
      respuesta: "Po 5. členu ZDPN-2 je davčni zavezanec prodajalec. Pri prodaji idealnih deležev je zavezanec vsak prodajalec posebej.",
    },
    {
      pregunta: "Kaj če je prodajna cena nizka?",
      respuesta: "Tretji odstavek 8. člena ZDPN-2 je Ustavno sodišče delno razveljavilo. Zato je davčna osnova praviloma prodajna cena, preverite pa, kaj piše v odmerni odločbi.",
    },
    {
      pregunta: "Ali Slovenija pozna letni davek na nepremičnine?",
      respuesta: "Pravno-informacijski sistem PISRS Zakon o davku na nepremičnine (ZDavNepr) vodi kot neveljaven predpis, zato takega davka tu ne računamo. Ta stran računa le davek ob prodaji.",
    },
  ],
  glosario: [
    { termino: "Prodajna cena", definicion: "Vsa plačila, ki jih prodajalec dobi od kupca." },
    { termino: "ZDPN-2", definicion: "Zakon o davku na promet nepremičnin." },
  ],
});
