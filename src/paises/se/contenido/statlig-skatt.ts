import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "se.statlig-skatt",
  h1: "Räkna ut statlig skatt och brytpunkt",
  title: "Statlig skatt 2026: brytpunkt och skatt på din lön",
  description:
    "Se om du betalar statlig inkomstskatt och hur mycket. Skiktgränsen är {{se.skiktgrans}} och skatten {{se.statlig-inkomstskatt}} på det som ligger över.",
  intro: [
    "Statlig inkomstskatt betalar du bara på den del av lönen som ligger över brytpunkten. Kalkylatorn visar hur mycket det blir per år och var gränsen går för just ditt år.",
    "Brytpunkten är skiktgränsen plus grundavdraget. Därför ligger den lite högre än skiktgränsen, som gäller den beskattningsbara inkomsten.",
  ],
  comoSeCalcula: [
    "Lönen räknas om till en årsinkomst och avrundas nedåt till hela hundratal kronor.",
    "Grundavdraget dras av. Vid höga inkomster är det {{se.grundavdrag[lagsta]}} prisbasbelopp, och prisbasbeloppet är {{se.prisbasbelopp}}.",
    "Det som blir kvar är den beskattningsbara förvärvsinkomsten. På den del som överstiger {{se.skiktgrans}} tas statlig skatt ut med {{se.statlig-inkomstskatt}}.",
    "Skatten tas ut först när underlaget är minst 200 kronor över skiktgränsen.",
  ],
  ejemplo: [
    "Med 80 000 kronor i månaden blir årsinkomsten 960 000 kronor. Efter grundavdraget återstår 942 600 kronor, och 299 600 kronor av dem ligger över skiktgränsen. Statlig skatt blir 59 920 kronor per år.",
  ],
  faq: [
    {
      pregunta: "Vad är skillnaden mellan skiktgräns och brytpunkt?",
      respuesta:
        "Skiktgränsen gäller den beskattningsbara inkomsten, alltså efter grundavdraget. Brytpunkten är den lön före avdrag där statlig skatt börjar, och den är skiktgränsen plus grundavdraget.",
    },
    {
      pregunta: "Betalar jag statlig skatt på hela lönen om jag passerar brytpunkten?",
      respuesta: "Nej. Statlig skatt tas bara ut på den del som ligger över skiktgränsen. Lönen under gränsen beskattas som förut.",
    },
    {
      pregunta: "Gäller samma brytpunkt för pensionärer?",
      respuesta: "Nej. Den som har fyllt 66 år vid årets början har ett högre grundavdrag och därför en högre brytpunkt. Kalkylatorn räknar för den som är yngre.",
    },
    {
      pregunta: "Räknas kommunalskatten in här?",
      respuesta: "Nej, den här sidan visar bara den statliga skatten. Hela skatten på lönen ser du i kalkylatorn för lön efter skatt.",
    },
  ],
  glosario: [
    { termino: "Statlig inkomstskatt", definicion: "Skatt till staten på förvärvsinkomster över skiktgränsen." },
    { termino: "Skiktgräns", definicion: "Den beskattningsbara inkomst där statlig skatt börjar." },
    { termino: "Brytpunkt", definicion: "Den årsinkomst före grundavdrag där statlig skatt börjar." },
  ],
});
