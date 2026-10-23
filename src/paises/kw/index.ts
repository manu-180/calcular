import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import currencyConverter from "./calculadoras/currency-converter";
import contenidoCurrencyConverter from "./contenido/currency-converter";
import discountRateCalculator from "./calculadoras/discount-rate-calculator";
import contenidoDiscountRateCalculator from "./contenido/discount-rate-calculator";
import employerCost from "./calculadoras/employer-cost";
import contenidoEmployerCost from "./contenido/employer-cost";
import goldZakatCalculator from "./calculadoras/gold-zakat-calculator";
import contenidoGoldZakatCalculator from "./contenido/gold-zakat-calculator";
import inflationCalculator from "./calculadoras/inflation-calculator";
import contenidoInflationCalculator from "./contenido/inflation-calculator";
import pifssCalculator from "./calculadoras/pifss-calculator";
import contenidoPifssCalculator from "./contenido/pifss-calculator";
import remittanceCalculator from "./calculadoras/remittance-calculator";
import contenidoRemittanceCalculator from "./contenido/remittance-calculator";
import takeHomePay from "./calculadoras/take-home-pay";
import contenidoTakeHomePay from "./contenido/take-home-pay";
import zakatCalculator from "./calculadoras/zakat-calculator";
import contenidoZakatCalculator from "./contenido/zakat-calculator";
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
    { definicion: currencyConverter, contenido: contenidoCurrencyConverter, cliente: () => import("./calculadoras/currency-converter.cliente") },
    { definicion: discountRateCalculator, contenido: contenidoDiscountRateCalculator, cliente: () => import("./calculadoras/discount-rate-calculator.cliente") },
    { definicion: employerCost, contenido: contenidoEmployerCost, cliente: () => import("./calculadoras/employer-cost.cliente") },
    { definicion: goldZakatCalculator, contenido: contenidoGoldZakatCalculator, cliente: () => import("./calculadoras/gold-zakat-calculator.cliente") },
    { definicion: inflationCalculator, contenido: contenidoInflationCalculator, cliente: () => import("./calculadoras/inflation-calculator.cliente") },
    { definicion: pifssCalculator, contenido: contenidoPifssCalculator, cliente: () => import("./calculadoras/pifss-calculator.cliente") },
    { definicion: remittanceCalculator, contenido: contenidoRemittanceCalculator, cliente: () => import("./calculadoras/remittance-calculator.cliente") },
    { definicion: takeHomePay, contenido: contenidoTakeHomePay, cliente: () => import("./calculadoras/take-home-pay.cliente") },
    { definicion: zakatCalculator, contenido: contenidoZakatCalculator, cliente: () => import("./calculadoras/zakat-calculator.cliente") },
  ],
  universales: "todas",
  novedades,
  detectores,
});
