import { definirCalculadora, enMapa, porcentaje } from "@/motor/calculo";
import { sumarDias } from "@/motor/vigencia";
import { DIAS_MES } from "../prestaciones";

const DIAS_SEMANA = 7;

export default definirCalculadora({
  id: "ni.licencia-por-maternidad",
  mercado: "ni",
  concepto: "propio",
  slug: "licencia-por-maternidad",
  estado: "publicado",
  requiere: {
    "ni.maternidad-semanas": "mapa",
    "ni.subsidio-maternidad": "numero",
  },
  campos: [
    { id: "parto", tipo: "fecha", etiqueta: "Fecha probable del parto", ayuda: "La que figura en el certificado médico." },
    { id: "salario", tipo: "moneda", etiqueta: "Salario mensual", min: 0 },
    { id: "multiple", tipo: "si-no", etiqueta: "Es un embarazo múltiple (mellizos o más)", porDefecto: false },
  ],
  calcular(entrada, valores, { redondear }) {
    const semanas = valores["ni.maternidad-semanas"];
    const antes = enMapa(semanas, "prenatal");
    const despues = enMapa(semanas, entrada.multiple ? "postnatal-multiple" : "postnatal");
    const dias = (antes + despues) * DIAS_SEMANA;
    const total = redondear((entrada.salario / DIAS_MES) * dias);
    const inss = redondear(porcentaje(total, valores["ni.subsidio-maternidad"]));
    return {
      inicio: sumarDias(entrada.parto, -antes * DIAS_SEMANA),
      fin: sumarDias(entrada.parto, despues * DIAS_SEMANA - 1),
      semanas: antes + despues,
      total,
      inss,
      empleador: redondear(total - inss),
      observaciones: [
        "Si el parto llega antes, los días de descanso que no usaste antes del parto se suman después.",
        "El INSS paga su parte si cotizaste 16 semanas dentro de las 39 anteriores al parto, y la calcula con tu promedio de las últimas cotizaciones. El empleador completa hasta tu salario.",
        "El descanso cuenta como tiempo trabajado para la antigüedad, las vacaciones y el aguinaldo.",
      ],
    };
  },
  resultado: [
    { clave: "inicio", etiqueta: "Empieza el descanso", formato: "fecha" },
    { clave: "fin", etiqueta: "Último día de descanso", formato: "fecha" },
    { clave: "semanas", etiqueta: "Semanas de descanso", formato: "numero" },
    { clave: "inss", etiqueta: "Subsidio del INSS (estimado)", formato: "moneda" },
    { clave: "empleador", etiqueta: "Lo que completa el empleador", formato: "moneda" },
    { clave: "total", etiqueta: "Total que cobrás en el descanso", formato: "moneda", destacada: true },
  ],
});
