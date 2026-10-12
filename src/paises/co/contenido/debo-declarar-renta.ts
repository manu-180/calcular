import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "co.debo-declarar-renta",
  h1: "¿Tengo que declarar renta?",
  title: "¿Debo declarar renta en 2026? Calculadora de topes",
  description:
    "Revisa si tienes que declarar renta: compara tus ingresos, patrimonio, consumos y consignaciones con los topes en UVT del año gravable.",
  intro: [
    "Tienes que declarar renta si en el año pasas alguno de los topes de la DIAN: ingresos, patrimonio, consumos con tarjeta, compras o consignaciones. Basta con pasar uno.",
    "Los topes están en UVT. Elige el año gravable y escribe tus valores: te decimos si estás obligado y por qué.",
  ],
  comoSeCalcula: [
    "Ingresos brutos: si llegan a {{co.declarar-topes[ingresos]}}, declaras.",
    "Patrimonio bruto al 31 de diciembre: si pasa de {{co.declarar-topes[patrimonio]}}, declaras.",
    "Consumos con tarjeta, compras y consumos, o consignaciones: si alguno pasa de {{co.declarar-topes[consignaciones]}}, declaras.",
    "Si eres responsable de IVA, declaras siempre.",
    "Cada tope en UVT se pasa a pesos con la UVT del año gravable. En 2026 se declara el año 2025.",
  ],
  ejemplo: [
    "Para el año gravable 2025 (UVT de $49.799), el tope de ingresos es $69.718.600 y el de patrimonio, $224.095.500. Si ganaste $70.000.000, tienes que declarar.",
  ],
  faq: [
    {
      pregunta: "¿Cuál es el tope de ingresos para declarar renta en 2026?",
      respuesta: "Para el año gravable 2025, que se declara en 2026, son {{co.declarar-topes[ingresos]}} con la UVT de 2025: $69.718.600.",
    },
    {
      pregunta: "¿Si me pasé en un solo tope ya tengo que declarar?",
      respuesta: "Sí. Basta con superar uno de los topes para estar obligado.",
    },
    {
      pregunta: "¿Cuándo vence la declaración?",
      respuesta: "Depende de los dos últimos dígitos de tu NIT. En 2026 los vencimientos van de agosto a octubre, según el calendario de la DIAN.",
    },
    {
      pregunta: "¿Qué pasa si declaro tarde?",
      respuesta: "Pagas una sanción por extemporaneidad por cada mes o fracción de retraso. Puedes calcularla con nuestra calculadora de sanción.",
    },
  ],
  glosario: [
    { termino: "Año gravable", definicion: "El año de los ingresos que declaras. Se declara al año siguiente." },
    { termino: "Patrimonio bruto", definicion: "Todo lo que tienes a tu nombre, sin restar deudas." },
  ],
});
