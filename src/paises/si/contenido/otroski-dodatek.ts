import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "si.otroski-dodatek",
  h1: "Otroški dodatek {{anio}}: izračun po dohodkovnem razredu",
  title: "Otroški dodatek {{anio}}: znesek po razredih",
  description: "Otroški dodatek za prvega otroka je do {{si.otroski-dodatek[o1-1]}} na mesec. Izračunajte znesek po dohodku na osebo in številu otrok.",
  intro: [
    "Otroški dodatek, za prvega otroka do {{si.otroski-dodatek[o1-1]}} na mesec, je dopolnilni prejemek za preživljanje, vzgojo in izobraževanje otroka do 18. leta. Višina je odvisna od povprečnega mesečnega dohodka na osebo v družini in od zaporedja otroka.",
    "Dohodkovnih razredov je osem. Prvi velja do {{si.otroski-dodatek-meje[r1]}} na osebo, zadnji do {{si.otroski-dodatek-meje[r8]}}. Zneski v tem izračunu veljajo za vloge od 1. februarja 2026 in priznanje pravice s 1. marcem 2026.",
  ],
  comoSeCalcula: [
    "Najprej se določi razred iz povprečnega mesečnega dohodka na osebo. Meje so objavljene v nominalnih zneskih.",
    "Za vsakega otroka se poišče znesek po zaporedju: prvi, drugi ter tretji in naslednji. Prvi razred da {{si.otroski-dodatek[o1-1]}}, {{si.otroski-dodatek[o1-2]}} in {{si.otroski-dodatek[o1-3]}}.",
    "Za otroke v srednji šoli velja ločena preglednica. Razlika je v sedmem in osmem razredu. Zneski se seštejejo.",
  ],
  ejemplo: [
    "Družina z dohodkom 700,00 € na osebo je v petem razredu. Dva otroka v osnovni šoli prejmeta 62,06 € in 72,42 €, skupaj 134,48 € na mesec.",
  ],
  faq: [
    {
      pregunta: "Kje uveljavim otroški dodatek?",
      respuesta: "Pri centru za socialno delo, kjer ima upravičenec stalno prebivališče oziroma kjer večina družinskih članov dejansko prebiva, kot navaja gov.si.",
    },
    {
      pregunta: "Kaj če je dohodek nad osmim razredom?",
      respuesta: "Preglednica se konča pri {{si.otroski-dodatek-meje[r8]}} na osebo. Nad to mejo kalkulator ne izračuna zneska.",
    },
    {
      pregunta: "Kdaj dodatek ne pripada?",
      respuesta: "Na primer za otroka, ki je v delovnem razmerju, v rejništvu ali v zavodu s celodnevno brezplačno oskrbo več kot 30 dni, z izjemami, ki jih opisuje gov.si.",
    },
  ],
  glosario: [
    { termino: "Dohodkovni razred", definicion: "Skupina družin po povprečnem mesečnem dohodku na osebo." },
    { termino: "CSD", definicion: "Center za socialno delo." },
  ],
});
