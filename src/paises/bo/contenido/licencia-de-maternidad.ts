import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "bo.licencia-de-maternidad",
  h1: "Calculadora de licencia de maternidad",
  title: "Licencia de maternidad en Bolivia: fechas y monto",
  description: "Calcule las fechas de su descanso de maternidad ({{bo.maternidad-dias[prenatal]}} antes y {{bo.maternidad-dias[postnatal]}} después del parto) y cuánto cobra.",
  intro: [
    "La trabajadora embarazada tiene un descanso de {{bo.maternidad-dias[prenatal]}} antes del parto y {{bo.maternidad-dias[postnatal]}} después, con el {{bo.maternidad-goce}} de su salario.",
    "Escriba la fecha probable de parto y su total ganado. Si va a pasar días del prenatal a después del parto, indíquelos.",
  ],
  comoSeCalcula: [
    "El descanso prenatal empieza {{bo.maternidad-dias[prenatal]}} antes de la fecha probable de parto y el postnatal dura {{bo.maternidad-dias[postnatal]}}.",
    "Con controles prenatales al día y certificado médico, puede pasar parte del prenatal al postnatal. El total no cambia.",
    "Cobra el {{bo.maternidad-goce}} de su salario diario (total ganado dividido 30) por todos los días del descanso.",
    "Hacen falta al menos {{bo.maternidad-cotizaciones-minimas}} aportes mensuales a la caja de salud en los 12 meses anteriores.",
  ],
  faq: [
    {
      pregunta: "¿Cuántos días de licencia de maternidad hay en Bolivia?",
      respuesta: "{{bo.maternidad-dias[prenatal]}} antes del parto y {{bo.maternidad-dias[postnatal]}} después (Ley N° 1516 de 2023), con el {{bo.maternidad-goce}} de su salario.",
    },
    {
      pregunta: "¿Puedo tomar menos días antes del parto y más después?",
      respuesta: "Sí. Desde la Ley N° 1516 puede pasar parte del descanso prenatal a después del parto, si tiene sus controles prenatales al día y el médico lo certifica.",
    },
    {
      pregunta: "¿Me pueden despedir durante el embarazo?",
      respuesta: "No. La madre y el padre tienen inamovilidad laboral desde el embarazo hasta que el hijo o la hija cumple un año.",
    },
    {
      pregunta: "¿Y la licencia de paternidad?",
      respuesta: "El padre tiene 3 días de licencia con goce de haber desde el nacimiento (D.S. N° 1212). Debe presentar el certificado de nacimiento.",
    },
  ],
  glosario: [
    { termino: "Descanso prenatal", definicion: "Los días de licencia antes del parto." },
    { termino: "Descanso postnatal", definicion: "Los días de licencia después del parto." },
    { termino: "Inamovilidad laboral", definicion: "Protección que impide despedir a la madre o al padre hasta el primer año del hijo." },
  ],
});
