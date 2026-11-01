import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "si.izracun-regresa",
  h1: "Regres {{anio}}: izračun zneska in obdavčitve",
  title: "Regres {{anio}}: najmanj {{si.minimalna-placa}}, izračun",
  description: "Regres za letni dopust znaša najmanj {{si.minimalna-placa}}. Izračunajte sorazmerni del in neobdavčeni znesek do povprečne plače {{si.povprecna-placa}}.",
  intro: [
    "Regres za letni dopust mora biti po 131. členu ZDR-1 najmanj enak minimalni plači. Zdaj je to {{si.minimalna-placa}}. Izplačan mora biti najkasneje do 1. julija.",
    "Regres je brez dohodnine in prispevkov do višine zadnje znane povprečne mesečne plače. Po zadnjih podatkih SURS je ta {{si.povprecna-placa}}, kar velja za ta mesec: {{si.povprecna-placa#desde}}.",
  ],
  comoSeCalcula: [
    "Najnižji regres = minimalna plača × delež delovnega časa × meseci zaposlitve / 12.",
    "Če je pravica do dopusta le sorazmerna, delavcu pripada le sorazmerni del regresa (četrti odstavek 131. člena ZDR-1).",
    "Del nad povprečno mesečno plačo se všteva v davčno osnovo (44. člen ZDoh-2) in v osnovo za prispevke (144. člen ZPIZ-2).",
  ],
  ejemplo: [
    "Delavec s 75 odstotki delovnega časa je zaposlen šest mesecev v letu. Najnižji regres je 1.481,88 € × 0,75 × 6 / 12, torej 555,71 €.",
    "Regres 3.000,00 € pri povprečni plači 2.695,56 € pomeni 304,44 € zneska z dohodnino in prispevki.",
  ],
  faq: [
    {
      pregunta: "Do kdaj mora delodajalec izplačati regres?",
      respuesta: "Najkasneje do 1. julija tekočega leta. Kolektivna pogodba dejavnosti lahko pri nelikvidnosti določi poznejši rok, a najkasneje do 1. novembra (131. člen ZDR-1).",
    },
    {
      pregunta: "Ali pripada regres tudi pri krajšem delovnem času?",
      respuesta: "Da, sorazmerno delovnemu času. Izjema je krajši delovni čas po 67. členu ZDR-1, kjer gre polni regres.",
    },
    {
      pregunta: "Je zimski regres isto kot regres za dopust?",
      respuesta: "Ne. Zimski regres je ločena pravica po ZPZR in znaša polovico minimalne plače. Izračunate ga na svoji strani.",
    },
  ],
  glosario: [
    { termino: "Regres", definicion: "Izplačilo delavcu, ki ima pravico do letnega dopusta." },
    { termino: "Povprečna mesečna plača", definicion: "Povprečna bruto plača zaposlenih v Sloveniji, ki jo objavlja SURS." },
  ],
});
