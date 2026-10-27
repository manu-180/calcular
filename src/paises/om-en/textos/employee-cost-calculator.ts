import { definirTextos } from "@/motor/edicion";
import calculadora from "../../om/calculadoras/employee-cost-calculator";
import { NACIONALIDAD } from "../comun";

export default definirTextos(calculadora, {
  calculadora: "om-en.employee-cost-calculator",
  slug: "employee-cost-calculator",
  campos: {
    salario: { etiqueta: "Total monthly wage", ayuda: "Basic wage plus all allowances." },
    nacionalidad: NACIONALIDAD,
    otros: { etiqueta: "Other monthly costs", ayuda: "Such as health insurance, permit fees or housing the company provides." },
  },
  filas: {
    mensual: { etiqueta: "Monthly cost to the employer" },
    aportes: { etiqueta: "Employer contributions to the Fund" },
    porcentaje: { etiqueta: "Contributions as a share of the wage" },
    anual: { etiqueta: "Cost per year" },
  },
  mensajes: {
    "أدخل الأجر الشهري الشامل.": "Enter the total monthly wage.",
    "لا تُسدد اليوم اشتراكات في صندوق الحماية الاجتماعية عن غير العماني، لكن صاحب العمل يتحمل مكافأة نهاية الخدمة عند انتهاء العلاقة.":
      "No Social Protection Fund contributions are paid today for non-Omani staff, but the employer owes an end-of-service gratuity when the job ends.",
  },
});
