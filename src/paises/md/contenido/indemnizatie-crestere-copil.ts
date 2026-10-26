import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "md.indemnizatie-crestere-copil",
  h1: "Calculator indemnizație pentru creșterea copilului",
  title: "Indemnizația pentru creșterea copilului 2026",
  description: "Calculați indemnizația lunară pentru creșterea copilului după opțiunea aleasă: {{md.crestere-copil[trei-ani]}}, {{md.crestere-copil[24-luni]}} sau {{md.crestere-copil[12-luni]}} din venitul asigurat.",
  intro: [
    "După concediul de maternitate, unul dintre părinții asigurați poate primi o indemnizație lunară pentru creșterea copilului. Suma depinde de venit și de opțiunea aleasă.",
    "Calculatorul compară cele trei opțiuni și adaugă indemnizația pentru îngrijirea copilului până la 2 ani, care se acordă oricărui părinte.",
  ],
  comoSeCalcula: [
    "Baza de calcul este venitul mediu lunar asigurat din ultimele 12 luni înainte de luna nașterii, cu plafonul de {{md.plafon-salarii-medii}} salarii medii pe economie.",
    "Până la 3 ani: {{md.crestere-copil[trei-ani]}} din bază, dar nu mai puțin de {{md.crestere-copil-minim}}.",
    "24 de luni: {{md.crestere-copil[24-luni]}} în primele 12 luni (cel puțin dublul minimului) și {{md.crestere-copil[trei-ani]}} în următoarele 12 luni.",
    "12 luni: {{md.crestere-copil[12-luni]}} din bază, cel puțin triplul minimului.",
    "Separat, pentru fiecare copil până la 2 ani se plătește {{md.ingrijire-copil-2-ani}} pe lună, indiferent dacă părintele este asigurat.",
  ],
  faq: [
    {
      pregunta: "Pot schimba opțiunea după ce am ales-o?",
      respuesta: "Nu. Opțiunea aleasă la cerere nu mai poate fi modificată ulterior.",
    },
    {
      pregunta: "Ce stagiu de cotizare trebuie să am?",
      respuesta: "Cel puțin 3 ani. Cu mai puțin, aveți dreptul dacă aveți cel puțin 9 luni de stagiu în ultimele 24 de luni înainte de nașterea copilului.",
    },
    {
      pregunta: "Din venitul cărui părinte se calculează?",
      respuesta: "Al unuia dintre soți, cel care dă indemnizația mai mare.",
    },
  ],
  glosario: [
    { termino: "Indemnizația minimă", definicion: "Suma lunară cea mai mică pentru o persoană asigurată, acum {{md.crestere-copil-minim}}." },
    { termino: "Baza de calcul", definicion: "Venitul mediu lunar asigurat, plafonat, pe care se aplică procentul." },
  ],
});
