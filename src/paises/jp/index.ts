import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import takeHomePay from "./calculadoras/take-home-pay";
import contenidoTakeHomePay from "./contenido/take-home-pay";
import incomeTax from "./calculadoras/income-tax";
import contenidoIncomeTax from "./contenido/income-tax";
import residentTax from "./calculadoras/resident-tax";
import contenidoResidentTax from "./contenido/resident-tax";
import socialInsurance from "./calculadoras/social-insurance";
import contenidoSocialInsurance from "./contenido/social-insurance";
import employmentInsurance from "./calculadoras/employment-insurance";
import contenidoEmploymentInsurance from "./contenido/employment-insurance";
import consumptionTax from "./calculadoras/consumption-tax";
import contenidoConsumptionTax from "./contenido/consumption-tax";
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
    { definicion: incomeTax, contenido: contenidoIncomeTax, cliente: () => import("./calculadoras/income-tax.cliente") },
    { definicion: residentTax, contenido: contenidoResidentTax, cliente: () => import("./calculadoras/resident-tax.cliente") },
    { definicion: socialInsurance, contenido: contenidoSocialInsurance, cliente: () => import("./calculadoras/social-insurance.cliente") },
    { definicion: employmentInsurance, contenido: contenidoEmploymentInsurance, cliente: () => import("./calculadoras/employment-insurance.cliente") },
    { definicion: consumptionTax, contenido: contenidoConsumptionTax, cliente: () => import("./calculadoras/consumption-tax.cliente") },
  ],
  universales: "todas",
  novedades,
  detectores,
});
