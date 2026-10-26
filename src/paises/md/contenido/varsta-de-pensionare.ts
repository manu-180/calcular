import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "md.varsta-de-pensionare",
  h1: "Calculator vârsta de pensionare",
  title: "Vârsta de pensionare în Moldova: calculați data",
  description: "Aflați când atingeți vârsta standard de pensionare: {{md.varsta-pensionare[barbati]}} la bărbați și o vârstă care crește până în 2028 la femei.",
  intro: [
    "Vârsta standard de pensionare pentru femei crește cu câte șase luni în fiecare an, la 1 iulie, până ajunge în 2028 la {{md.varsta-pensionare[femei-2028]}}. Pentru bărbați este {{md.varsta-pensionare[barbati]}}.",
    "Introduceți data nașterii și calculatorul vă spune ziua în care atingeți vârsta cerută.",
  ],
  comoSeCalcula: [
    "Vârsta se verifică la data la care cereți pensia: trebuie să aveți vârsta în vigoare în acea zi.",
    "La femei, de la 1 iulie 2025 vârsta este {{md.varsta-pensionare[femei-2025]}}, de la 1 iulie 2026 {{md.varsta-pensionare[femei-2026]}}, de la 1 iulie 2027 {{md.varsta-pensionare[femei-2027]}} și de la 1 iulie 2028 {{md.varsta-pensionare[femei-2028]}}.",
    "Calculatorul caută prima zi în care vârsta dumneavoastră ajunge la cea cerută în acea zi.",
  ],
  faq: [
    {
      pregunta: "La ce vârstă ies la pensie femeile în 2026?",
      respuesta: "De la 1 iulie 2026, la {{md.varsta-pensionare[femei-2026]}}. De la 1 iulie 2027 vârsta devine {{md.varsta-pensionare[femei-2027]}}, iar din 1 iulie 2028, {{md.varsta-pensionare[femei-2028]}}.",
    },
    {
      pregunta: "Ajunge doar vârsta pentru pensie?",
      respuesta: "Nu. Pensia pentru limită de vârstă se acordă la vârsta standard și cu stagiul complet de cotizare cerut de lege.",
    },
    {
      pregunta: "Există pensionare mai devreme?",
      respuesta: "Da, pentru unele categorii: de exemplu, femeile care au născut și educat până la 8 ani cinci sau mai mulți copii se pensionează cu 3 ani mai devreme decât vârsta standard.",
    },
  ],
  glosario: [
    { termino: "Vârstă standard de pensionare", definicion: "Vârsta de la care se poate cere pensia pentru limită de vârstă, stabilită de Legea nr. 156/1998." },
    { termino: "Stagiu de cotizare", definicion: "Perioada în care s-au plătit contribuții de asigurări sociale." },
  ],
});
