import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "si.minimalna-placa",
  h1: "Minimalna plača {{anio}}: bruto, neto in strošek",
  title: "Minimalna plača {{anio}}: bruto {{si.minimalna-placa}} in neto",
  description: "Minimalna plača znaša {{si.minimalna-placa}} bruto. Izračunajte neto znesek, prispevke in strošek delodajalca, tudi pri krajšem delovnem času.",
  intro: [
    "Minimalna plača v Sloveniji znaša {{si.minimalna-placa}} bruto na mesec za poln delovni čas. Velja od tega dne: {{si.minimalna-placa#desde}}. Kalkulator pokaže, koliko od tega ostane na računu in koliko plača delodajalec.",
    "Po Zakonu o minimalni plači se v ta znesek ne štejejo dodatki, del plače za uspešnost, povračila stroškov in regres. Pri krajšem delovnem času pripada sorazmerni del.",
  ],
  comoSeCalcula: [
    "Bruto znesek je minimalna plača, pomnožena z deležem delovnega časa.",
    "Minimalna plača je nižja od najnižje osnove za prispevke {{si.najnizja-osnova}}. Delavec zato pokojninski, zdravstveni in prispevek za dolgotrajno oskrbo plača od dejanske plače, delodajalec pa od razlike.",
    "Neto se nato izračuna kot pri vsaki plači: odšteje se OZP {{si.ozp}} in akontacija po stopnji {{si.dohodnina[0].tasa}} na davčno osnovo.",
  ],
  ejemplo: [
    "Pri polnem delovnem času je bruto 1.481,88 €. Prispevki z OZP so 381,77 €, akontacija 101,99 €, neto plača brez otrok pa 998,12 €. Delodajalca taka plača stane 1.751,16 € na mesec.",
  ],
  faq: [
    {
      pregunta: "Kdaj se minimalna plača spremeni?",
      respuesta: "Znesek določi minister, pristojen za delo, in ga objavi najkasneje do 31. januarja. Uskladi se najmanj z rastjo cen življenjskih potrebščin, kot določa Zakon o minimalni plači.",
    },
    {
      pregunta: "Ali se malica in prevoz štejeta v minimalno plačo?",
      respuesta: "Ne. Po pojasnilu na gov.si v minimalno plačo ni mogoče vštevati povračil stroškov za prehrano, prevoz in službena potovanja, niti regresa, odpravnin in jubilejnih nagrad.",
    },
    {
      pregunta: "Kolikšen je regres pri minimalni plači?",
      respuesta: "Regres za letni dopust po 131. členu ZDR-1 znaša najmanj višino minimalne plače, torej {{si.minimalna-placa}}, sorazmerno z mesecem zaposlitve in delovnim časom.",
    },
  ],
  glosario: [
    { termino: "Minimalna plača", definicion: "Najnižje plačilo za delo v polnem delovnem času, določeno z zakonom." },
    { termino: "Sorazmerni del", definicion: "Del zneska, ki ustreza krajšemu delovnemu času ali krajšemu obdobju." },
  ],
});
