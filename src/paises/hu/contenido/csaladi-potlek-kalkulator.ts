import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "hu.csaladi-potlek-kalkulator",
  h1: "Családi pótlék kalkulátor",
  title: "Családi pótlék kalkulátor: mennyi jár gyermekenként?",
  description:
    "Egy gyermek után {{hu.csaladi-potlek[egy]}}, két gyermeknél {{hu.csaladi-potlek[ketto]}}, háromnál {{hu.csaladi-potlek[tobb]}} gyermekenként. Egyedülállóknak és beteg gyermek után több.",
  intro: [
    "A családi pótlék havi összege attól függ, hány gyermek van a családban, egyedül neveled-e őket, és van-e köztük tartósan beteg vagy súlyosan fogyatékos gyermek.",
    "A kalkulátor összeadja a gyermekek után járó összegeket, és megmutatja az éves összeget is.",
  ],
  comoSeCalcula: [
    "Egygyermekes családnál {{hu.csaladi-potlek[egy]}}, egyedülállónál {{hu.csaladi-potlek[egy-egyedul]}}.",
    "Kétgyermekes családnál gyermekenként {{hu.csaladi-potlek[ketto]}}, egyedülállónál {{hu.csaladi-potlek[ketto-egyedul]}}.",
    "Három- vagy többgyermekes családnál gyermekenként {{hu.csaladi-potlek[tobb]}}, egyedülállónál {{hu.csaladi-potlek[tobb-egyedul]}}.",
    "Tartósan beteg vagy súlyosan fogyatékos gyermek után {{hu.csaladi-potlek[beteg]}}, egyedülállónál {{hu.csaladi-potlek[beteg-egyedul]}}.",
  ],
  ejemplo: [
    "Három gyermek, közülük egy tartósan beteg: két gyermek után 16 000 Ft, a beteg gyermek után 23 300 Ft jár, havonta összesen 55 300 Ft.",
  ],
  faq: [
    {
      pregunta: "Mennyi a családi pótlék két gyermek után?",
      respuesta: "Gyermekenként {{hu.csaladi-potlek[ketto]}}, összesen 26 600 Ft havonta. Egyedülálló szülőnél gyermekenként {{hu.csaladi-potlek[ketto-egyedul]}}.",
    },
    {
      pregunta: "Mennyi jár három gyermek után?",
      respuesta: "Gyermekenként {{hu.csaladi-potlek[tobb]}}, összesen 48 000 Ft havonta. Egyedülálló szülőnél gyermekenként {{hu.csaladi-potlek[tobb-egyedul]}}.",
    },
    {
      pregunta: "A családi pótlék és a családi adókedvezmény ugyanaz?",
      respuesta: "Nem. A családi pótlékot az állam folyósítja havonta. A családi adókedvezmény a szülő SZJA-ját csökkenti, és a nettó bérben jelenik meg.",
    },
  ],
  glosario: [
    { termino: "Családi pótlék", definicion: "Havi állami támogatás a gyermekneveléshez." },
    { termino: "Egyedülálló", definicion: "Aki házastárs vagy élettárs nélkül neveli a gyermekét." },
  ],
});
