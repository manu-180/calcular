import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "hu.csaladi-adokedvezmeny-kalkulator",
  h1: "Családi adókedvezmény kalkulátor",
  title: "Családi adókedvezmény kalkulátor: mennyivel több a nettó?",
  description:
    "Egy gyermek után {{hu.csaladi-kedvezmeny[1]}}, kettő után {{hu.csaladi-kedvezmeny[2]}}, három után {{hu.csaladi-kedvezmeny[3]}} gyermekenként. Számold ki, mennyi marad nálad.",
  intro: [
    "A családi kedvezmény az SZJA alapját csökkenti, havonta és kedvezményezett eltartottanként. Az összeg attól függ, hány eltartott van a családban.",
    "Ha a béredből nem jön ki a teljes kedvezmény, a fennmaradó rész {{hu.szja}} része a TB-járulékot csökkenti. A kalkulátor ezt is beszámítja.",
  ],
  comoSeCalcula: [
    "Kedvezmény havonta: a gyermekek száma szorozva az eltartottak száma szerinti összeggel. Egy eltartottnál {{hu.csaladi-kedvezmeny[1]}}, kettőnél {{hu.csaladi-kedvezmeny[2]}}, háromnál vagy többnél {{hu.csaladi-kedvezmeny[3]}}.",
    "Tartósan beteg vagy súlyosan fogyatékos gyermek után a kedvezmény ennyivel több: {{hu.csaladi-kedvezmeny-beteg}}.",
    "A kedvezmény értéke a nettó bérben: a levont összeg {{hu.szja}} része, amíg a béredből telik.",
    "Ami az SZJA-ból már nem jön le, annak {{hu.szja}} része a TB-járulékból jön le (családi járulékkedvezmény).",
  ],
  ejemplo: [
    "Két gyermek és 500 000 Ft bruttó bér: a kedvezmény 533 320 Ft. Az SZJA 75 000 Ft-ról nullára csökken, és a TB-járulékból is lejön 4998 Ft. Havonta 79 998 Ft-tal több a nettó.",
  ],
  faq: [
    {
      pregunta: "Mennyi a családi adókedvezmény egy gyermek után?",
      respuesta: "Az adóalap-kedvezmény havonta {{hu.csaladi-kedvezmeny[1]}}. A nettó béredben ez havi 20 001 Ft többletet jelent, ha a béredből telik rá.",
    },
    {
      pregunta: "Mennyi jár három gyermek után?",
      respuesta: "Gyermekenként {{hu.csaladi-kedvezmeny[3]}} adóalap-kedvezmény, összesen 1 320 000 Ft havonta. Ennek értéke havi 198 000 Ft, de ennyit csak elég magas bérből vagy két szülő bérét együtt számolva lehet érvényesíteni.",
    },
    {
      pregunta: "Megoszthatjuk a kedvezményt a házastársammal?",
      respuesta: "Igen. A jogosultak közösen is igénybe vehetik, és a jogosult megoszthatja a vele egy háztartásban élő házastársával vagy élettársával. Ehhez az adóbevallásban közös nyilatkozat kell.",
    },
    {
      pregunta: "Ki a kedvezményezett eltartott?",
      respuesta: "Az a gyermek, aki után családi pótlékot kapsz. Eltartottnak számít az is, akit a családi pótlék összegének megállapításánál figyelembe vesznek, akkor is, ha utána már nem jár pótlék.",
    },
  ],
  glosario: [
    { termino: "Adóalap-kedvezmény", definicion: "Az az összeg, amennyivel az SZJA alapja csökken." },
    { termino: "Családi járulékkedvezmény", definicion: "A fel nem használt családi kedvezmény adóértéke, ami a TB-járulékot csökkenti." },
  ],
});
