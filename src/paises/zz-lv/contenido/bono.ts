import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "zz-lv.bono",
  h1: "Pusgada prēmijas kalkulators Zetalandē",
  title: "Pusgada prēmija Zetalandē: cik saņemsiet",
  description: "Aprēķiniet pusgada prēmiju pēc sava reģiona minimālās algas un piemaksas {{zz.bonificacion}}, ar oficiālām vērtībām, datumu un avotu.",
  intro: [
    "Pusgada prēmija ir papildu atalgojums, ko darba devējs maksā divreiz gadā.",
    "Ja strādājāt visu pusgadu, saņemsiet vienu mēneša algu un piemaksu {{zz.bonificacion}}.",
  ],
  comoSeCalcula: [
    "Aprēķina pamats ir mēneša bruto alga. Ja tā ir mazāka par minimālo jūsu reģionā, ņem minimālo algu.",
    "Šo algu reizina ar nostrādāto mēnešu skaitu un dala ar sešiem.",
    "Mazos uzņēmumos prēmija ir uz pusi mazāka.",
    "Prēmijai pieskaita piemaksu {{zz.bonificacion}}.",
  ],
  faq: [
    { pregunta: "Cik liela ir minimālā alga Ziemeļu reģionā?", respuesta: "{{zz.minimo@norte}}, spēkā no: {{zz.minimo@norte#desde}}." },
    { pregunta: "Kā ir, ja nenostrādāju visu pusgadu?", respuesta: "Saņemsiet proporcionālu daļu atbilstoši nostrādātajiem mēnešiem." },
    { pregunta: "Vai piemaksu maksā vienmēr?", respuesta: "Jā. Tā ir {{zz.bonificacion}} no prēmijas, un uzņēmums to maksā kopā ar prēmiju." },
  ],
  glosario: [
    { termino: "Pusgada prēmija", definicion: "Papildu atalgojums, kas likumā noteikts izmaksai jūlijā un decembrī." },
    { termino: "Minimālā alga", definicion: "Mazākā atlīdzība par pilnu darba dienu katrā reģionā." },
  ],
});
