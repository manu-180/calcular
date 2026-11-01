import { definirTextos } from "@/motor/edicion";
import calculadora from "../../om/calculadoras/final-settlement";
import { DIAS_MES, FIN, INICIO, MENSAJES_SERVICIO, NACIONALIDAD, SIN_GOCE } from "../comun";

export default definirTextos(calculadora, {
  calculadora: "om-en.final-settlement",
  slug: "final-settlement",
  campos: {
    nacionalidad: NACIONALIDAD,
    basico: { etiqueta: "Last monthly basic wage" },
    total: { etiqueta: "Last total monthly wage", ayuda: "Basic wage plus all allowances." },
    inicio: INICIO,
    fin: FIN,
    articulo40: { etiqueta: "Dismissed without notice under article 40" },
    sinGoce: SIN_GOCE,
    vacaciones: { etiqueta: "Unused annual leave balance, in days" },
    pendientes: { etiqueta: "Days worked and not yet paid" },
    preaviso: { etiqueta: "Notice days the employer did not give", ayuda: "If the employer ended the contract without giving the full notice period." },
    diasMes: DIAS_MES,
  },
  filas: {
    total: { etiqueta: "Total amount owed" },
    gratificacion: { etiqueta: "End-of-service gratuity" },
    vacaciones: { etiqueta: "Pay for the leave balance" },
    sueldo: { etiqueta: "Pay for unpaid days" },
    preaviso: { etiqueta: "Notice compensation" },
    anios: { etiqueta: "Service counted" },
  },
  mensajes: {
    ...MENSAJES_SERVICIO,
    "أدخل آخر أجر أساسي شهري.": "Enter the last monthly basic wage.",
    "الأجر الشامل لا يقل عن الأجر الأساسي.": "The total wage cannot be lower than the basic wage.",
    "العماني في القطاع الخاص لا تُحسب له مكافأة نهاية الخدمة من صاحب العمل، لأنه مؤمن عليه في صندوق الحماية الاجتماعية.":
      "Omani private sector workers get no end-of-service gratuity from the employer, because they are insured with the Social Protection Fund.",
  },
});
