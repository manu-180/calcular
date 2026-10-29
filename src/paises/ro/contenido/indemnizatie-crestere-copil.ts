import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ro.indemnizatie-crestere-copil",
  h1: "Calculator indemnizație creștere copil",
  title: "Calculator indemnizație creștere copil {{anio}}",
  description:
    "Calculați indemnizația lunară pentru creșterea copilului: {{ro.indemnizatie-copil[procent]}} % din venitul net mediu din ultimele 12 luni, între minim și maxim.",
  intro: [
    "Părintele aflat în concediu pentru creșterea copilului primește o indemnizație lunară calculată din venitul net mediu.",
    "Calculatorul aplică procentul și limitele lunare.",
  ],
  comoSeCalcula: [
    "Se ia venitul net mediu lunar din ultimele 12 luni înainte de naștere.",
    "Indemnizația este {{ro.indemnizatie-copil[procent]}} % din acest venit, dar cel puțin {{ro.indemnizatie-copil[minim]}} lei și cel mult {{ro.indemnizatie-copil[maxim]}} lei.",
  ],
  faq: [
    {
      pregunta: "Cât este indemnizația maximă pentru creșterea copilului?",
      respuesta: "{{ro.indemnizatie-copil[maxim]}} lei pe lună.",
    },
  ],
  glosario: [
    { termino: "Concediu de creștere a copilului", definicion: "Concediul plătit pe care îl poate lua un părinte după naștere." },
  ],
});
