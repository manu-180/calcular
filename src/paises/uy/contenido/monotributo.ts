import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "uy.monotributo",
  h1: "Calculadora de monotributo: cuánto pagás por mes al BPS",
  title: "Monotributo en Uruguay 2026: cuánto se paga por mes",
  description:
    "Calculá cuánto pagás de monotributo al BPS: aportes jubilatorios de {{uy.monotributo-jubilatorio}} más el aporte de salud según tu cobertura y tu familia.",
  intro: [
    "El monotributo es un régimen para pequeños emprendimientos: pagás una cuota fija por mes al BPS en lugar de aportar sobre lo que facturás.",
    "La cuota tiene dos partes: los aportes jubilatorios, que son iguales para todos, y el aporte de salud, que depende de si elegís cobertura por el Fonasa y de quiénes tenés a cargo.",
  ],
  comoSeCalcula: [
    "Aportás sobre un sueldo ficto de {{uy.monotributo-ficto}} por mes (5 BFC). Sobre ese monto salen los aportes jubilatorios y el FRL: {{uy.monotributo-jubilatorio}}.",
    "Si elegís la opción al SNIS (cobertura de salud por el Fonasa), el aporte de salud va de {{uy.monotributo-salud[snis]}} a {{uy.monotributo-salud[snis-conyuge-hijos]}} según tengas cónyuge o hijos a cargo.",
    "Si no la elegís, pagás {{uy.monotributo-salud[sin-snis]}} de seguro de enfermedad, con o sin hijos.",
    "Son los valores mínimos del BPS para un titular sin dependientes, desde el {{uy.monotributo-jubilatorio#desde}}.",
  ],
  ejemplo: ["Sin cónyuge ni hijos y con cobertura del Fonasa: $ 2.088 + $ 4.239 = $ 6.327 por mes."],
  faq: [
    {
      pregunta: "¿Cuánto se paga de monotributo en 2026?",
      respuesta:
        "Los aportes jubilatorios son {{uy.monotributo-jubilatorio}} por mes. A eso se suma la salud: {{uy.monotributo-salud[sin-snis]}} sin cobertura del Fonasa, o entre {{uy.monotributo-salud[snis]}} y {{uy.monotributo-salud[snis-conyuge-hijos]}} con ella.",
    },
    {
      pregunta: "¿Qué es la opción al SNIS?",
      respuesta: "Es elegir que el monotributo te dé cobertura de salud por el Fonasa, con mutualista. Para que tu cónyuge o concubino tenga cobertura, vos también tenés que hacer la opción.",
    },
    {
      pregunta: "¿Y si somos dos socios?",
      respuesta: "La sociedad de hecho también puede ser monotributista, con hasta dos socios (o tres si son familiares) y sin dependientes. Cada socio aporta sobre su propio sueldo ficto.",
    },
    {
      pregunta: "¿Cuándo cambian los montos?",
      respuesta: "Una vez por año, en enero, cuando se actualiza la base ficta de contribución. El BPS publica la tabla nueva con los valores del año.",
    },
  ],
  glosario: [
    { termino: "BFC", definicion: "Base ficta de contribución. El monotributo aporta sobre 5 BFC." },
    { termino: "SNIS", definicion: "Sistema Nacional Integrado de Salud: la cobertura de salud del Fonasa." },
    { termino: "FRL", definicion: "Fondo de Reconversión Laboral." },
  ],
});
