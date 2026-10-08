import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "uy.valor-ui",
  h1: "Valor de la UI hoy y conversor de UI y BPC a pesos",
  title: "UI hoy en Uruguay: valor de la Unidad Indexada a pesos",
  description:
    "La UI hoy vale {{uy.ui}} según el BCU. Convertí Unidades Indexadas y BPC a pesos uruguayos, o al revés, para alquileres, préstamos y multas.",
  intro: [
    "La Unidad Indexada (UI) vale hoy {{uy.ui}}, según el Banco Central del Uruguay. Sube todos los días con la inflación y se usa en préstamos hipotecarios, alquileres, multas y montos de leyes.",
    "La BPC es otra unidad que usan las leyes para topes y franjas. Elegí la unidad, escribí el monto y te lo pasamos a pesos, o al revés.",
  ],
  comoSeCalcula: [
    "Tomamos la UI del día que publica el Banco Central del Uruguay, con sus cuatro decimales.",
    "La BPC de este año es {{uy.bpc}}. Rige desde {{uy.bpc#desde}} y cambia una vez por año.",
    "Para pasar a pesos se multiplica el monto por el valor de la unidad y se redondea al centésimo.",
    "Para pasar de pesos a la unidad se divide el monto por ese valor.",
  ],
  ejemplo: ["Si un contrato dice 1.000 UI y la UI vale $ 6,656, hoy son 1.000 × 6,656 = $ 6.656."],
  faq: [
    {
      pregunta: "¿Cuánto vale la UI hoy?",
      respuesta: "{{uy.ui}}. Es el valor que publica el Banco Central del Uruguay para el día de hoy.",
    },
    {
      pregunta: "¿Cuánto vale la BPC en 2026?",
      respuesta: "{{uy.bpc}}, desde el {{uy.bpc#desde}}. Se ajusta una vez por año.",
    },
    {
      pregunta: "¿Por qué la UI cambia todos los días?",
      respuesta: "Porque sigue la inflación (el IPC). La variación del mes se reparte día a día, así que sube de a poco.",
    },
    {
      pregunta: "¿Se puede saber la UI de días que todavía no llegaron?",
      respuesta: "Sí, por algunas semanas. El BCU y el INE publican los valores por adelantado.",
    },
    {
      pregunta: "¿De dónde sale el valor que muestran?",
      respuesta: "De las cotizaciones del Banco Central del Uruguay. Son los mismos valores que publica el INE en su planilla de la UI.",
    },
    {
      pregunta: "¿Qué diferencia hay entre la UI y la BPC?",
      respuesta: "La UI cambia todos los días con la inflación. La BPC la fija el gobierno una vez por año y se usa para impuestos, aportes y prestaciones.",
    },
  ],
  glosario: [
    { termino: "UI", definicion: "Unidad Indexada. Unidad de cuenta que se ajusta por inflación, con valor diario en pesos." },
    { termino: "BPC", definicion: "Base de Prestaciones y Contribuciones. Valor anual en pesos que usan las leyes para topes y franjas." },
    { termino: "IPC", definicion: "Índice de los Precios del Consumo. Mide la inflación y lo publica el INE." },
  ],
});
