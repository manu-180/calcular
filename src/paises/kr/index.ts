import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import takeHomePay from "./calculadoras/take-home-pay";
import contenidoTakeHomePay from "./contenido/take-home-pay";
import socialInsurance from "./calculadoras/social-insurance";
import contenidoSocialInsurance from "./contenido/social-insurance";
import minimumWage from "./calculadoras/minimum-wage";
import contenidoMinimumWage from "./contenido/minimum-wage";
import weeklyHolidayPay from "./calculadoras/weekly-holiday-pay";
import contenidoWeeklyHolidayPay from "./contenido/weekly-holiday-pay";
import datos from "./datos.json";
import { detectores } from "./fuentes";
import { mercado } from "./mercado";
import { novedades } from "./novedades";
import series from "./series.json";

export default definirPais({
  mercado,
  datos,
  series,
  avisos,
  calculadoras: [
    { definicion: takeHomePay, contenido: contenidoTakeHomePay, cliente: () => import("./calculadoras/take-home-pay.cliente") },
    { definicion: socialInsurance, contenido: contenidoSocialInsurance, cliente: () => import("./calculadoras/social-insurance.cliente") },
    { definicion: minimumWage, contenido: contenidoMinimumWage, cliente: () => import("./calculadoras/minimum-wage.cliente") },
    { definicion: weeklyHolidayPay, contenido: contenidoWeeklyHolidayPay, cliente: () => import("./calculadoras/weekly-holiday-pay.cliente") },
  ],
  universales: { todas: true, ajustes: [{ id: "iva", datos: { tasa: "kr.vat" } }] },
  novedades,
  detectores,
});
