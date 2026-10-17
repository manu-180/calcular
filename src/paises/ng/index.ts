import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import payeCalculator from "./calculadoras/paye-calculator";
import contenidoPayeCalculator from "./contenido/paye-calculator";
import netSalaryCalculator from "./calculadoras/net-salary-calculator";
import contenidoNetSalaryCalculator from "./contenido/net-salary-calculator";
import pensionCalculator from "./calculadoras/pension-calculator";
import contenidoPensionCalculator from "./contenido/pension-calculator";
import retirementSavingsAccountCalculator from "./calculadoras/retirement-savings-account-calculator";
import contenidoRetirementSavingsAccountCalculator from "./contenido/retirement-savings-account-calculator";
import nhfCalculator from "./calculadoras/nhf-calculator";
import contenidoNhfCalculator from "./contenido/nhf-calculator";
import employerCostCalculator from "./calculadoras/employer-cost-calculator";
import contenidoEmployerCostCalculator from "./contenido/employer-cost-calculator";
import minimumWage from "./calculadoras/minimum-wage";
import contenidoMinimumWage from "./contenido/minimum-wage";
import companyIncomeTaxCalculator from "./calculadoras/company-income-tax-calculator";
import contenidoCompanyIncomeTaxCalculator from "./contenido/company-income-tax-calculator";
import vatCalculator from "./calculadoras/vat-calculator";
import contenidoVatCalculator from "./contenido/vat-calculator";
import dollarToNaira from "./calculadoras/dollar-to-naira";
import contenidoDollarToNaira from "./contenido/dollar-to-naira";
import stampDutyOnTransfers from "./calculadoras/stamp-duty-on-transfers";
import contenidoStampDutyOnTransfers from "./contenido/stamp-duty-on-transfers";
import rentReliefCalculator from "./calculadoras/rent-relief-calculator";
import contenidoRentReliefCalculator from "./contenido/rent-relief-calculator";
import compensationForLossOfOffice from "./calculadoras/compensation-for-loss-of-office";
import contenidoCompensationForLossOfOffice from "./contenido/compensation-for-loss-of-office";
import fixedDepositCalculator from "./calculadoras/fixed-deposit-calculator";
import contenidoFixedDepositCalculator from "./contenido/fixed-deposit-calculator";
import treasuryBillCalculator from "./calculadoras/treasury-bill-calculator";
import contenidoTreasuryBillCalculator from "./contenido/treasury-bill-calculator";
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
    { definicion: payeCalculator, contenido: contenidoPayeCalculator, cliente: () => import("./calculadoras/paye-calculator.cliente") },
    { definicion: netSalaryCalculator, contenido: contenidoNetSalaryCalculator, cliente: () => import("./calculadoras/net-salary-calculator.cliente") },
    { definicion: pensionCalculator, contenido: contenidoPensionCalculator, cliente: () => import("./calculadoras/pension-calculator.cliente") },
    { definicion: retirementSavingsAccountCalculator, contenido: contenidoRetirementSavingsAccountCalculator, cliente: () => import("./calculadoras/retirement-savings-account-calculator.cliente") },
    { definicion: nhfCalculator, contenido: contenidoNhfCalculator, cliente: () => import("./calculadoras/nhf-calculator.cliente") },
    { definicion: employerCostCalculator, contenido: contenidoEmployerCostCalculator, cliente: () => import("./calculadoras/employer-cost-calculator.cliente") },
    { definicion: minimumWage, contenido: contenidoMinimumWage, cliente: () => import("./calculadoras/minimum-wage.cliente") },
    { definicion: companyIncomeTaxCalculator, contenido: contenidoCompanyIncomeTaxCalculator, cliente: () => import("./calculadoras/company-income-tax-calculator.cliente") },
    { definicion: vatCalculator, contenido: contenidoVatCalculator, cliente: () => import("./calculadoras/vat-calculator.cliente") },
    { definicion: dollarToNaira, contenido: contenidoDollarToNaira, cliente: () => import("./calculadoras/dollar-to-naira.cliente") },
    { definicion: stampDutyOnTransfers, contenido: contenidoStampDutyOnTransfers, cliente: () => import("./calculadoras/stamp-duty-on-transfers.cliente") },
    { definicion: rentReliefCalculator, contenido: contenidoRentReliefCalculator, cliente: () => import("./calculadoras/rent-relief-calculator.cliente") },
    { definicion: compensationForLossOfOffice, contenido: contenidoCompensationForLossOfOffice, cliente: () => import("./calculadoras/compensation-for-loss-of-office.cliente") },
    { definicion: fixedDepositCalculator, contenido: contenidoFixedDepositCalculator, cliente: () => import("./calculadoras/fixed-deposit-calculator.cliente") },
    { definicion: treasuryBillCalculator, contenido: contenidoTreasuryBillCalculator, cliente: () => import("./calculadoras/treasury-bill-calculator.cliente") },
  ],
  universales: "todas",
  novedades,
  detectores,
});
