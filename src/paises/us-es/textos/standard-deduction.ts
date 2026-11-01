import { definirTextos } from "@/motor/edicion";
import standardDeduction from "../../us/calculadoras/standard-deduction";
import { COMUN, ESTADO_CIVIL } from "../lib/comun";

export default definirTextos(standardDeduction, {
  calculadora: "us-es.standard-deduction",
  slug: "deduccion-estandar",
  campos: {
    estado: { etiqueta: "Estado civil para la declaración", opciones: ESTADO_CIVIL },
    mayores: { etiqueta: "Personas en la declaración de 65 años o más", ayuda: "Para 2026, nacidas antes del 2 de enero de 1962." },
    ciegos: { etiqueta: "Personas en la declaración que son ciegas" },
    itemizadas: { etiqueta: "Tus deducciones detalladas, para comparar", ayuda: "Intereses hipotecarios, impuestos estatales y locales hasta el tope, donaciones y gastos médicos altos." },
  },
  filas: {
    basica: { etiqueta: "Deducción estándar básica" },
    adicional: { etiqueta: "Monto adicional por edad o ceguera" },
    total: { etiqueta: "Tu deducción estándar" },
    conviene: { etiqueta: "Mejor opción" },
    diferencia: { etiqueta: "Diferencia entre las dos" },
  },
  ...COMUN,
});
