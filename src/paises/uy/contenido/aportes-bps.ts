import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "uy.aportes-bps",
  h1: "Calculadora de aportes al BPS",
  title: "Aportes BPS 2026: cuánto te descuentan del sueldo",
  description:
    "Calculá tus aportes personales al BPS: montepío del {{uy.aporte-jubilatorio}}, Fonasa según tu familia y FRL del {{uy.frl}}. Con el tope de aportación vigente.",
  intro: [
    "De tu sueldo nominal se descuentan tres aportes: el jubilatorio (montepío), el Fonasa y el Fondo de Reconversión Laboral. Escribí tu sueldo y te mostramos cada uno.",
    "El Fonasa cambia según cuánto ganás y si tenés hijos o cónyuge a cargo. Por eso te pedimos esos datos.",
  ],
  comoSeCalcula: [
    "Montepío: {{uy.aporte-jubilatorio}} del sueldo, hasta el tope de aportación de {{uy.tope-aportes}}.",
    "Fonasa: si ganás hasta {{uy.fonasa-umbral}} se usa una tabla y si ganás más, otra. Las tasas van de {{uy.fonasa-hasta[sin]}} a {{uy.fonasa-mas[ambos]}}.",
    "Fondo de Reconversión Laboral: {{uy.frl}} del sueldo.",
    "El total es lo que el BPS se queda de tu nominal antes del IRPF.",
  ],
  ejemplo: [
    "Con un sueldo de $ 50.000 sin hijos ni cónyuge: montepío $ 7.500, Fonasa $ 2.250 y FRL $ 50. En total, $ 9.800 (19,6 % del sueldo).",
  ],
  faq: [
    {
      pregunta: "¿Cuánto se descuenta de BPS en Uruguay?",
      respuesta: "{{uy.aporte-jubilatorio}} de montepío, entre {{uy.fonasa-hasta[sin]}} y {{uy.fonasa-mas[ambos]}} de Fonasa y {{uy.frl}} de FRL. Después se resta el IRPF, si te toca.",
    },
    {
      pregunta: "¿Qué es el montepío?",
      respuesta: "Es el aporte jubilatorio personal. Se reparte entre el BPS y tu AFAP, si estás en el régimen mixto.",
    },
    {
      pregunta: "¿Por qué el Fonasa me descuenta más que a un compañero?",
      respuesta: "Porque depende de tu sueldo y de tu familia. Si ganás más de {{uy.fonasa-umbral}} o tenés hijos o cónyuge a cargo, la tasa sube.",
    },
    {
      pregunta: "¿Hay un tope para los aportes?",
      respuesta: "Sí, para el aporte jubilatorio: no se aporta por encima de {{uy.tope-aportes}} por mes. El Fonasa y el FRL no tienen tope.",
    },
    {
      pregunta: "¿El aguinaldo también paga aportes?",
      respuesta: "Sí. El aguinaldo paga montepío y FRL igual que el sueldo. Para elegir la tasa de Fonasa no se tiene en cuenta.",
    },
  ],
  glosario: [
    { termino: "BPS", definicion: "Banco de Previsión Social. Cobra los aportes y paga jubilaciones y subsidios." },
    { termino: "Fonasa", definicion: "Fondo Nacional de Salud. Con tu aporte tenés cobertura en tu mutualista." },
    { termino: "FRL", definicion: "Fondo de Reconversión Laboral. Financia cursos de capacitación del INEFOP." },
  ],
});
