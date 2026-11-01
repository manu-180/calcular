import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "cz.pausalni-dan",
  h1: "Paušální daň {{anio}}: kalkulačka pásma a úspory",
  title: "Paušální daň {{anio}}: pásmo, záloha a srovnání",
  description:
    "Zjistěte, do kterého pásma paušální daně patříte, kolik zaplatíte měsíčně a za rok a jestli se vám paušální režim vyplatí proti běžnému přiznání.",
  intro: [
    "Paušální daň nahrazuje daňové přiznání a přehledy pro ČSSZ a zdravotní pojišťovnu jednou měsíční platbou finančnímu úřadu. Výše záleží na pásmu, do kterého vás zařadí příjmy a jejich druh.",
    "Kalkulačka určí nejnižší pásmo, na které máte nárok, a porovná roční platbu s daní a pojištěním v běžném režimu s paušálními výdaji.",
  ],
  comoSeCalcula: [
    "První pásmo: příjmy do {{cz.pausalni-dan-limity[prvni-obecne]}}, do {{cz.pausalni-dan-limity[prvni-60]}} při převaze příjmů s výdaji 80 % nebo 60 % a do {{cz.pausalni-dan-limity[prvni-80]}} při převaze příjmů s výdaji 80 %. Záloha {{cz.pausalni-dan[prvni]}} měsíčně.",
    "Druhé pásmo: příjmy do {{cz.pausalni-dan-limity[druhe-obecne]}}, nebo do {{cz.pausalni-dan-limity[druhe-60]}} při převaze příjmů s výdaji 80 % nebo 60 %. Záloha {{cz.pausalni-dan[druhe]}} měsíčně.",
    "Třetí pásmo: příjmy do {{cz.pausalni-dan-limity[treti]}} bez ohledu na druh. Záloha {{cz.pausalni-dan[treti]}} měsíčně.",
    "Převahou se rozumí aspoň 75 % příjmů ze samostatné činnosti.",
  ],
  ejemplo: [
    "Živnostník s příjmy 1 000 000 Kč patří do prvního pásma a platí {{cz.pausalni-dan[prvni]}} měsíčně, tedy 109 944 Kč za rok. V běžném režimu s výdaji 60 % by zaplatil 133 064 Kč.",
  ],
  faq: [
    {
      pregunta: "Kolik je paušální daň v roce 2026?",
      respuesta: "V prvním pásmu {{cz.pausalni-dan[prvni]}} měsíčně, ve druhém {{cz.pausalni-dan[druhe]}} a ve třetím {{cz.pausalni-dan[treti]}}. Částka v prvním pásmu platí zpětně od ledna 2026, přeplatek z první poloviny roku se vrací.",
    },
    {
      pregunta: "Z čeho se paušální záloha skládá?",
      respuesta: "V prvním pásmu z daně {{cz.pausalni-dan-slozky[prvni-dan]}}, sociálního pojištění {{cz.pausalni-dan-slozky[prvni-socialni]}} a zdravotního pojištění {{cz.pausalni-dan-slozky[prvni-zdravotni]}}.",
    },
    {
      pregunta: "Kdo nemůže do paušálního režimu?",
      respuesta: "Plátce DPH, společník veřejné obchodní společnosti nebo komplementář komanditní společnosti a podnikatel v insolvenci. Příjmy ze samostatné činnosti nesmí přesáhnout {{cz.pausalni-dan-limity[treti]}}.",
    },
    {
      pregunta: "Kdy se platí paušální záloha?",
      respuesta: "Každý měsíc nejpozději do 20. dne daného měsíce na účet finančního úřadu.",
    },
  ],
  glosario: [
    { termino: "Paušální režim", definicion: "Způsob placení daně a pojištění OSVČ jednou měsíční částkou bez daňového přiznání a přehledů." },
    { termino: "Pásmo", definicion: "Úroveň paušální daně podle výše a druhu příjmů." },
  ],
});
