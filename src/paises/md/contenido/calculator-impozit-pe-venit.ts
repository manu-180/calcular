import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "md.calculator-impozit-pe-venit",
  h1: "Calculator impozit pe venit {{anio}}",
  title: "Impozitul pe venit {{anio}}: calculator anual cu scutiri",
  description: "Calculați impozitul pe venit pe un an: cota de {{md.impozit-venit}}, scutirea personală de {{md.scutire-personala}} și scutirile pentru persoane întreținute.",
  intro: [
    "Impozitul pe venit al persoanelor fizice are o singură cotă, de {{md.impozit-venit}}. Se plătește pe venitul rămas după scutiri și după prima medicală reținută din salariu.",
    "Calculatorul vă arată impozitul pe tot anul, util pentru declarația anuală sau ca să verificați ce a reținut angajatorul.",
  ],
  comoSeCalcula: [
    "Din venitul brut se scade prima de asigurare medicală de {{md.prima-medicala}}, dacă venitul este salariu.",
    "Se scad scutirile: {{md.scutire-personala}} (sau {{md.scutire-majorata}} pentru scutirea majorată), {{md.scutire-intretinut}} pentru fiecare persoană întreținută și {{md.scutire-intretinut-dizabilitate}} pentru una cu dizabilitate.",
    "Scutirea personală se acordă doar dacă venitul anual impozabil nu trece de {{md.plafon-scutire}}.",
    "Pe suma rămasă se aplică {{md.impozit-venit}}.",
  ],
  faq: [
    {
      pregunta: "Care este cota impozitului pe venit în 2026?",
      respuesta: "{{md.impozit-venit}} pentru veniturile persoanelor fizice, inclusiv salariile.",
    },
    {
      pregunta: "Cine pierde dreptul la scutirea personală?",
      respuesta: "Persoanele cu venit anual impozabil mai mare de {{md.plafon-scutire}}.",
    },
    {
      pregunta: "Ce este scutirea majorată?",
      respuesta: "O scutire personală mai mare, de {{md.scutire-majorata}} pe an, pentru categoriile de persoane enumerate la art. 33 alin. (2) din Codul fiscal.",
    },
  ],
  glosario: [
    { termino: "Venit impozabil", definicion: "Venitul rămas după scăderea primei medicale și a scutirilor, pe care se aplică impozitul." },
    { termino: "Scutire", definicion: "Sumă anuală stabilită de Codul fiscal pentru care nu se plătește impozit pe venit." },
  ],
});
