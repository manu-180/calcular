import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "hu.tulora-kalkulator",
  h1: "Túlóra kalkulátor",
  title: "Túlóra kalkulátor: túlórapótlék 50 és 100 százalékkal",
  description:
    "Mennyit kapsz a túlórádért? Alapbér plusz bérpótlék: munkanapon {{hu.rendkivuli-munkaido-potlek[munkanap]}}, pihenőnapon és ünnepnapon {{hu.rendkivuli-munkaido-potlek[munkaszuneti]}}.",
  intro: [
    "A rendkívüli munkaidőre, köznyelven túlórára, az órabéren felül bérpótlék jár. Munkanapon a beosztáson felüli órákra a pótlék {{hu.rendkivuli-munkaido-potlek[munkanap]}}.",
    "Heti pihenőnapon {{hu.rendkivuli-munkaido-potlek[pihenonap]}} a pótlék, vagy {{hu.rendkivuli-munkaido-potlek[pihenonap-masik]}}, ha másik pihenőnapot kapsz helyette. Munkaszüneti napon {{hu.rendkivuli-munkaido-potlek[munkaszuneti]}}.",
  ],
  comoSeCalcula: [
    "Havibérnél az egy órára jutó alapbér a havi alapbér osztva ennyivel: {{hu.oraber-oszto}}.",
    "Alapbér a túlórákra = órabér × túlórák száma.",
    "Bérpótlék = az alapbér a túlórákra × a pótlék mértéke.",
    "Túlóradíj = alapbér + bérpótlék.",
  ],
  ejemplo: [
    "Havi 500 000 Ft alapbér mellett az órabér 2874 Ft. Tíz túlóra munkanapon: 28 736 Ft alapbér és 14 368 Ft pótlék, összesen 43 104 Ft bruttó.",
  ],
  faq: [
    {
      pregunta: "Mennyi a túlórapótlék?",
      respuesta: "Munkanapon {{hu.rendkivuli-munkaido-potlek[munkanap]}}, heti pihenőnapon {{hu.rendkivuli-munkaido-potlek[pihenonap]}} (vagy {{hu.rendkivuli-munkaido-potlek[pihenonap-masik]}} másik pihenőnappal), munkaszüneti napon {{hu.rendkivuli-munkaido-potlek[munkaszuneti]}}.",
    },
    {
      pregunta: "Kaphatok szabadidőt pénz helyett?",
      respuesta: "Igen, ha jogszabály vagy a munkaszerződés így rendelkezik. A szabadidő nem lehet rövidebb a túlóránál.",
    },
    {
      pregunta: "Hány óra túlóra rendelhető el egy évben?",
      respuesta: "Legfeljebb 250 óra. Írásbeli megállapodással további 150 óra, így összesen 400 óra is lehet. Kollektív szerződés 300 órát engedhet meg.",
    },
  ],
  glosario: [
    { termino: "Rendkívüli munkaidő", definicion: "A munkaidő-beosztáson felül elrendelt munka, köznyelven túlóra." },
    { termino: "Bérpótlék", definicion: "Az alapbéren felüli díjazás a túlóráért, az éjszakai vagy az ünnepnapi munkáért." },
  ],
});
