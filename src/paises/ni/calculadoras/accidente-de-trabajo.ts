import { definirCalculadora } from "@/motor/calculo";
import { DIAS_MES } from "../prestaciones";

export default definirCalculadora({
  id: "ni.accidente-de-trabajo",
  mercado: "ni",
  concepto: "propio",
  slug: "accidente-de-trabajo",
  estado: "publicado",
  requiere: {
    "ni.riesgo-indemnizacion-dias": "numero",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Último salario mensual del trabajador", min: 0, ayuda: "Si era variable, el promedio de los últimos seis meses." },
    {
      id: "caso",
      tipo: "opcion",
      etiqueta: "Qué pasó",
      opciones: [
        { valor: "muerte", etiqueta: "El trabajador murió" },
        { valor: "incapacidad", etiqueta: "Quedó con incapacidad total y permanente" },
      ],
      porDefecto: "muerte",
    },
    { id: "inss", tipo: "si-no", etiqueta: "Estaba inscrito en el INSS", porDefecto: false },
  ],
  calcular(entrada, valores, { redondear }) {
    const dias = valores["ni.riesgo-indemnizacion-dias"];
    const diario = redondear(entrada.salario / DIAS_MES);
    const observaciones: string[] = [];
    if (entrada.inss) {
      observaciones.push("Con el trabajador inscrito, las prestaciones las paga el INSS por el seguro de riesgos profesionales (pensiones y subsidios), no esta indemnización del empleador.");
      return { dias, diario, indemnizacion: 0, cuotas: 0, observaciones };
    }
    const indemnizacion = redondear(diario * dias);
    observaciones.push("Se paga en cuotas iguales al salario y en las mismas fechas en que se pagaba, contadas desde la muerte o desde que se determina la incapacidad.");
    observaciones.push(entrada.caso === "muerte" ? "La cobran las personas que dependían del trabajador." : "La cobra la persona que cuida al trabajador o quien determinen las autoridades.");
    observaciones.push("El reclamo prescribe a los dos años.");
    return { dias, diario, indemnizacion, cuotas: redondear(dias / DIAS_MES), observaciones };
  },
  resultado: [
    { clave: "dias", etiqueta: "Días de salario que fija la ley", formato: "dias" },
    { clave: "diario", etiqueta: "Salario diario", formato: "moneda" },
    { clave: "cuotas", etiqueta: "Meses de pago", formato: "numero", decimales: 2, ocultarSiCero: true },
    { clave: "indemnizacion", etiqueta: "Indemnización a cargo del empleador", formato: "moneda", destacada: true },
  ],
});
