import { definirCasos } from "@/motor/calculo";
import suspensionIgss from "./suspension-igss";

export default definirCasos(suspensionIgss, [
  {
    nombre: "Enfermedad de 10 días",
    origen: { tipo: "recalculado", detalle: "Acuerdo 468 arts. 25 y 30: diario 4500 / 30 = 150; dos tercios = 100; paga desde el cuarto día: 7 días = 700." },
    fecha: "2026-10-12",
    entrada: { motivo: "enfermedad", salario: 4500, dias: 10 },
    esperado: { diario: 150, subsidio: 100, diasPagados: 7, total: 700 },
  },
  {
    nombre: "Accidente con salario alto: tope diario",
    origen: { tipo: "recalculado", detalle: "Diario 300; dos tercios 200 pasa el tope de Q150 (art. 54). Accidente: desde el segundo día (Acuerdo 1002 art. 23), 4 días = 600." },
    fecha: "2026-10-12",
    entrada: { motivo: "accidente", salario: 9000, dias: 5 },
    esperado: { subsidio: 150, diasPagados: 4, total: 600 },
  },
  {
    nombre: "Salario diario menor al mínimo del subsidio",
    origen: { tipo: "recalculado", detalle: "Diario 10, menor que Q12: subsidio 100 % = 10. Enfermedad de 4 días: 1 día pagado." },
    fecha: "2026-10-12",
    entrada: { motivo: "enfermedad", salario: 300, dias: 4 },
    esperado: { subsidio: 10, diasPagados: 1, total: 10 },
  },
]);
