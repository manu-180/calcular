import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import takeHomePay from "./calculadoras/take-home-pay";
import contenidoTakeHomePay from "./contenido/take-home-pay";
import incomeTax from "./calculadoras/income-tax";
import contenidoIncomeTax from "./contenido/income-tax";
import socialSecurity from "./calculadoras/social-security";
import contenidoSocialSecurity from "./contenido/social-security";
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
    { definicion: socialSecurity, contenido: contenidoSocialSecurity, cliente: () => import("./calculadoras/social-security.cliente") },
  ],
  universales: { todas: true },
  novedades,
  detectores,
});
