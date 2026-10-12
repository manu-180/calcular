import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "uy.sueldo-nominal",
  h1: "De líquido a nominal: calculá el sueldo nominal",
  title: "Pasar de líquido a nominal en Uruguay (2026)",
  description:
    "Decinos cuánto querés cobrar en mano y te decimos qué sueldo nominal necesitás, con aportes al BPS, Fonasa e IRPF de 2026. Sirve para negociar un sueldo.",
  intro: [
    "Si te ofrecen un sueldo o vas a negociar uno, casi siempre se habla en nominal. Acá hacés la cuenta al revés: ponés el líquido que querés cobrar y te mostramos el nominal que hace falta.",
    "Usamos los mismos descuentos que el BPS aplica a todos: montepío, Fonasa, Fondo de Reconversión Laboral e IRPF.",
  ],
  comoSeCalcula: [
    "Probamos sueldos nominales hasta encontrar el más bajo que, después de los descuentos, deja el líquido que pediste.",
    "Los descuentos son {{uy.aporte-jubilatorio}} de montepío (hasta el tope de {{uy.tope-aportes}}), el Fonasa según tu sueldo y tu familia, {{uy.frl}} de FRL y el IRPF del mes.",
    "El IRPF usa la BPC de {{uy.bpc}} para armar las franjas.",
  ],
  ejemplo: ["Para cobrar $ 40.200 líquidos sin hijos ni cónyuge necesitás un nominal de $ 50.000."],
  faq: [
    {
      pregunta: "¿Hay una cuenta rápida para pasar de líquido a nominal?",
      respuesta: "Si no pagás IRPF, dividí el líquido entre lo que queda después de los aportes. Por ejemplo, con aportes del 19,6 % se divide entre 0,804. Con IRPF la cuenta ya no es directa: usá la calculadora.",
    },
    {
      pregunta: "¿Por qué a veces sube más el nominal de lo que esperaba?",
      respuesta: "Porque al pasar ciertos montos cambia la tasa del Fonasa o del IRPF. En esos saltos, para cobrar un poco más en mano hace falta subir bastante el nominal.",
    },
    {
      pregunta: "¿Qué descuentos no incluye?",
      respuesta: "Los que no son de ley: cuota sindical, préstamos, retenciones por pensión alimenticia o seguros que pagás por recibo.",
    },
  ],
  glosario: [
    { termino: "Nominal", definicion: "El sueldo antes de los descuentos. Es el que figura en el contrato." },
    { termino: "Líquido", definicion: "Lo que te depositan después de aportes e IRPF." },
  ],
});
