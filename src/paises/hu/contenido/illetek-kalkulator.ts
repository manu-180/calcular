import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "hu.illetek-kalkulator",
  h1: "Illeték kalkulátor lakásvásárláshoz",
  title: "Illeték kalkulátor: vagyonszerzési illeték lakásvásárlásnál",
  description:
    "Mennyi illetéket fizetsz a lakás után? Általános kulcs {{hu.illetek-kulcs[alap]}}, lakáscsere, új lakás és a 35 év alattiak első lakásának kedvezménye.",
  intro: [
    "Lakás vagy más ingatlan vásárlásakor visszterhes vagyonátruházási illetéket kell fizetni. Az általános mérték a forgalmi érték {{hu.illetek-kulcs[alap]}} része, ingatlanonként egymilliárd forintig.",
    "Kevesebbet fizetsz, ha közben eladsz egy másik lakást, ha új lakást veszel attól, aki értékesítésre építette, vagy ha 35 év alatti vagy, és ez az első lakásod.",
  ],
  comoSeCalcula: [
    "Illeték = forgalmi érték × {{hu.illetek-kulcs[alap]}}. Az egymilliárd forint feletti rész után {{hu.illetek-kulcs[felett]}}, ingatlanonként legfeljebb {{hu.illetek-hatarok[maximum]}}.",
    "Lakáscsere: ha a vásárlás előtti öt évben vagy utána egy éven belül eladsz egy lakást, csak a két forgalmi érték különbözete után fizetsz.",
    "Új lakás: illetékmentes, ha a forgalmi értéke legfeljebb {{hu.illetek-hatarok[uj-lakas-mentes]}}. Ha legfeljebb {{hu.illetek-hatarok[uj-lakas-kedvezmeny]}}, a mentes összegnek megfelelő illetéket nem kell megfizetni.",
    "35 év alatti első lakásszerző: ha a lakás forgalmi értéke legfeljebb {{hu.illetek-hatarok[fiatal]}}, az illeték legfeljebb {{hu.illetek-fiatal-kedvezmeny}} mértékben csökken.",
  ],
  ejemplo: [
    "Egy 40 millió forintos használt lakás után 1 600 000 Ft illeték jár. Ha előtte eladtál egy 30 millió forintos lakást, csak 400 000 Ft.",
  ],
  faq: [
    {
      pregunta: "Mennyi az illeték lakásvásárlásnál?",
      respuesta: "A forgalmi érték {{hu.illetek-kulcs[alap]}} része. Egy 30 millió forintos lakásnál ez 1 200 000 Ft.",
    },
    {
      pregunta: "Mikor nem kell illetéket fizetni új lakás után?",
      respuesta: "Ha a lakást értékesítésre építették, és a forgalmi értéke legfeljebb {{hu.illetek-hatarok[uj-lakas-mentes]}}.",
    },
    {
      pregunta: "Hogyan csökken az illeték lakáscserénél?",
      respuesta: "Ha a vásárlás előtt öt éven belül vagy utána egy éven belül eladsz egy lakást, az illeték alapja a két lakás forgalmi értékének különbözete.",
    },
  ],
  glosario: [
    { termino: "Forgalmi érték", definicion: "Az ingatlan piaci értéke, általában a vételár." },
    { termino: "Visszterhes vagyonátruházási illeték", definicion: "Az ingatlan megvásárlása után fizetendő illeték." },
  ],
});
