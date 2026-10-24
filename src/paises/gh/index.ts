import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import bonusTax from "./calculadoras/bonus-tax";
import contenidoBonusTax from "./contenido/bonus-tax";
import capitalGainsTax from "./calculadoras/capital-gains-tax";
import contenidoCapitalGainsTax from "./contenido/capital-gains-tax";
import casualWorkerTax from "./calculadoras/casual-worker-tax";
import contenidoCasualWorkerTax from "./contenido/casual-worker-tax";
import employerCost from "./calculadoras/employer-cost";
import contenidoEmployerCost from "./contenido/employer-cost";
import exchangeRate from "./calculadoras/exchange-rate";
import contenidoExchangeRate from "./contenido/exchange-rate";
import giftTax from "./calculadoras/gift-tax";
import contenidoGiftTax from "./contenido/gift-tax";
import minimumWage from "./calculadoras/minimum-wage";
import contenidoMinimumWage from "./contenido/minimum-wage";
import modifiedTaxationScheme from "./calculadoras/modified-taxation-scheme";
import contenidoModifiedTaxationScheme from "./contenido/modified-taxation-scheme";
import overtimeTax from "./calculadoras/overtime-tax";
import contenidoOvertimeTax from "./contenido/overtime-tax";
import payeCalculator from "./calculadoras/paye-calculator";
import contenidoPayeCalculator from "./contenido/paye-calculator";
import rentTax from "./calculadoras/rent-tax";
import contenidoRentTax from "./contenido/rent-tax";
import ssnitContribution from "./calculadoras/ssnit-contribution";
import contenidoSsnitContribution from "./contenido/ssnit-contribution";
import ssnitPension from "./calculadoras/ssnit-pension";
import contenidoSsnitPension from "./contenido/ssnit-pension";
import takeHomePay from "./calculadoras/take-home-pay";
import contenidoTakeHomePay from "./contenido/take-home-pay";
import vatCalculator from "./calculadoras/vat-calculator";
import contenidoVatCalculator from "./contenido/vat-calculator";
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
    { definicion: bonusTax, contenido: contenidoBonusTax, cliente: () => import("./calculadoras/bonus-tax.cliente") },
    { definicion: capitalGainsTax, contenido: contenidoCapitalGainsTax, cliente: () => import("./calculadoras/capital-gains-tax.cliente") },
    { definicion: casualWorkerTax, contenido: contenidoCasualWorkerTax, cliente: () => import("./calculadoras/casual-worker-tax.cliente") },
    { definicion: employerCost, contenido: contenidoEmployerCost, cliente: () => import("./calculadoras/employer-cost.cliente") },
    { definicion: exchangeRate, contenido: contenidoExchangeRate, cliente: () => import("./calculadoras/exchange-rate.cliente") },
    { definicion: giftTax, contenido: contenidoGiftTax, cliente: () => import("./calculadoras/gift-tax.cliente") },
    { definicion: minimumWage, contenido: contenidoMinimumWage, cliente: () => import("./calculadoras/minimum-wage.cliente") },
    { definicion: modifiedTaxationScheme, contenido: contenidoModifiedTaxationScheme, cliente: () => import("./calculadoras/modified-taxation-scheme.cliente") },
    { definicion: overtimeTax, contenido: contenidoOvertimeTax, cliente: () => import("./calculadoras/overtime-tax.cliente") },
    { definicion: payeCalculator, contenido: contenidoPayeCalculator, cliente: () => import("./calculadoras/paye-calculator.cliente") },
    { definicion: rentTax, contenido: contenidoRentTax, cliente: () => import("./calculadoras/rent-tax.cliente") },
    { definicion: ssnitContribution, contenido: contenidoSsnitContribution, cliente: () => import("./calculadoras/ssnit-contribution.cliente") },
    { definicion: ssnitPension, contenido: contenidoSsnitPension, cliente: () => import("./calculadoras/ssnit-pension.cliente") },
    { definicion: takeHomePay, contenido: contenidoTakeHomePay, cliente: () => import("./calculadoras/take-home-pay.cliente") },
    { definicion: vatCalculator, contenido: contenidoVatCalculator, cliente: () => import("./calculadoras/vat-calculator.cliente") },
  ],
  universales: "todas",
  novedades,
  detectores,
});
