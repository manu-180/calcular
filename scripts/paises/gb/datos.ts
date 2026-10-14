import { writeFileSync } from "node:fs";
import path from "node:path";

const HOY = "2026-10-14";
const ANIO_FISCAL = { desde: "2026-04-06", hasta: "2027-04-05" } as const;

type Fuente = { organismo: string; titulo: string; url: string; tipo: "primaria"; verificadoEl: string; nota?: string };
const fuente = (organismo: string, titulo: string, url: string, nota?: string): Fuente => ({ organismo, titulo, url, tipo: "primaria", verificadoEl: HOY, ...(nota ? { nota } : {}) });

const EMPLEADORES = fuente("HMRC", "Rates and thresholds for employers 2026 to 2027", "https://www.gov.uk/guidance/rates-and-thresholds-for-employers-2026-to-2027");
const INCOME_TAX = fuente("HMRC", "Income Tax rates and Personal Allowances", "https://www.gov.uk/income-tax-rates");
const SCOTLAND = fuente("HMRC", "Scottish Income Tax 2026 to 2027", "https://www.gov.uk/scottish-income-tax");
const SDLT = fuente("HMRC", "Stamp Duty Land Tax: residential property rates", "https://www.gov.uk/stamp-duty-land-tax/residential-property-rates");
const NMW = fuente("Department for Business and Trade", "National Minimum Wage and National Living Wage rates", "https://www.gov.uk/national-minimum-wage-rates");
const REDUNDANCY = fuente("Department for Business and Trade", "Redundancy: your rights, redundancy pay", "https://www.gov.uk/redundancy-your-rights/redundancy-pay");
const NOTICE = fuente("Department for Business and Trade", "Redundancy: your rights, notice periods", "https://www.gov.uk/redundancy-your-rights/notice-periods");
const HOLIDAY = fuente("Department for Business and Trade", "Holiday entitlement", "https://www.gov.uk/holiday-entitlement-rights");
const HOLIDAY_IRREGULAR = fuente(
  "Department for Business and Trade",
  "Holiday pay and entitlement reforms from 1 January 2024",
  "https://www.gov.uk/government/publications/simplifying-holiday-entitlement-and-holiday-pay-calculations/holiday-pay-and-entitlement-reforms-from-1-january-2024",
  "Para años de vacaciones que empiezan desde el 1 de abril de 2024.",
);
const SSP = fuente("HMRC", "Statutory Sick Pay (SSP): employer guide", "https://www.gov.uk/employers-sick-pay/entitlement", "Desde el 6 de abril de 2026 se paga desde el primer día y sin piso de ingresos (Employment Rights Act 2025).");
const SMP = fuente("Department for Work and Pensions", "Maternity pay and leave: pay", "https://www.gov.uk/maternity-pay-leave/pay");
const SELF_EMPLOYED = fuente("HMRC", "Self-employed National Insurance rates", "https://www.gov.uk/self-employed-national-insurance-rates");
const DIVIDENDS = fuente("HMRC", "Tax on dividends", "https://www.gov.uk/tax-on-dividends");
const CGT_RATES = fuente("HMRC", "Capital Gains Tax: what you pay it on, rates and allowances", "https://www.gov.uk/capital-gains-tax/rates");
const CGT_ALLOWANCE = fuente("HMRC", "Capital Gains Tax: allowances", "https://www.gov.uk/capital-gains-tax/allowances");
const VAT = fuente("HMRC", "VAT rates", "https://www.gov.uk/vat-rates");
const STATE_PENSION = fuente("Department for Work and Pensions", "The new State Pension: what you'll get", "https://www.gov.uk/new-state-pension/what-youll-get");
const STATE_PENSION_ELIG = fuente("Department for Work and Pensions", "The new State Pension: eligibility", "https://www.gov.uk/new-state-pension/eligibility");
const CHILD_BENEFIT = fuente("HMRC", "Child Benefit: what you'll get", "https://www.gov.uk/child-benefit/what-youll-get");
const HICBC = fuente("HMRC", "High Income Child Benefit Charge", "https://www.gov.uk/child-benefit-tax-charge");

const anual = (valor: unknown, f: Fuente) => [{ estado: "verificado", ...ANIO_FISCAL, valor, fuente: f }];
const desde = (d: string, valor: unknown, f: Fuente) => [{ estado: "verificado", desde: d, valor, fuente: f }];
const PROXIMO = "2027-04-06";

const datos = [
  { id: "gb.personal-allowance", nombre: "Personal Allowance", tipo: "numero", unidad: "GBP", proximaRevision: PROXIMO, tramos: anual(12570, INCOME_TAX) },
  { id: "gb.personal-allowance-taper", nombre: "Income limit for Personal Allowance", tipo: "numero", unidad: "GBP", proximaRevision: PROXIMO, tramos: anual(100000, INCOME_TAX) },
  {
    id: "gb.income-tax-bands",
    nombre: "Income Tax bands on taxable income (after the Personal Allowance)",
    tipo: "escala",
    unidad: "GBP",
    regiones: ["england-wales-ni", "scotland"],
    proximaRevision: PROXIMO,
    tramos: [
      {
        estado: "verificado",
        region: "england-wales-ni",
        ...ANIO_FISCAL,
        valor: [
          { desde: 0, hasta: 37700, tasa: 20 },
          { desde: 37700, hasta: 125140, tasa: 40 },
          { desde: 125140, hasta: null, tasa: 45 },
        ],
        fuente: EMPLEADORES,
      },
      {
        estado: "verificado",
        region: "scotland",
        ...ANIO_FISCAL,
        valor: [
          { desde: 0, hasta: 3967, tasa: 19 },
          { desde: 3967, hasta: 16956, tasa: 20 },
          { desde: 16956, hasta: 31092, tasa: 21 },
          { desde: 31092, hasta: 62430, tasa: 42 },
          { desde: 62430, hasta: 125140, tasa: 45 },
          { desde: 125140, hasta: null, tasa: 48 },
        ],
        fuente: { ...EMPLEADORES, nota: "Coincide con https://www.gov.uk/scottish-income-tax (bandas sumando la Personal Allowance)." },
      },
    ],
  },
  { id: "gb.basic-rate-band", nombre: "Basic rate band (UK rates, used for dividends and gains)", tipo: "numero", unidad: "GBP", proximaRevision: PROXIMO, tramos: anual(37700, EMPLEADORES) },
  { id: "gb.additional-rate-threshold", nombre: "Additional rate threshold (taxable income)", tipo: "numero", unidad: "GBP", proximaRevision: PROXIMO, tramos: anual(125140, EMPLEADORES) },
  { id: "gb.ni-primary-threshold", nombre: "National Insurance Primary Threshold (annual)", tipo: "numero", unidad: "GBP", proximaRevision: PROXIMO, tramos: anual(12570, EMPLEADORES) },
  { id: "gb.ni-upper-earnings-limit", nombre: "National Insurance Upper Earnings Limit (annual)", tipo: "numero", unidad: "GBP", proximaRevision: PROXIMO, tramos: anual(50270, EMPLEADORES) },
  { id: "gb.ni-secondary-threshold", nombre: "National Insurance Secondary Threshold (annual)", tipo: "numero", unidad: "GBP", proximaRevision: PROXIMO, tramos: anual(5000, EMPLEADORES) },
  { id: "gb.ni-lower-earnings-limit-weekly", nombre: "National Insurance Lower Earnings Limit (weekly)", tipo: "numero", unidad: "GBP", proximaRevision: PROXIMO, tramos: anual(129, EMPLEADORES) },
  { id: "gb.ni-employee-main-rate", nombre: "Class 1 employee rate between the Primary Threshold and the Upper Earnings Limit", tipo: "numero", unidad: "%", proximaRevision: PROXIMO, tramos: anual(8, EMPLEADORES) },
  { id: "gb.ni-employee-upper-rate", nombre: "Class 1 employee rate above the Upper Earnings Limit", tipo: "numero", unidad: "%", proximaRevision: PROXIMO, tramos: anual(2, EMPLEADORES) },
  { id: "gb.ni-employer-rate", nombre: "Class 1 employer rate above the Secondary Threshold", tipo: "numero", unidad: "%", proximaRevision: PROXIMO, tramos: anual(15, EMPLEADORES) },
  { id: "gb.employment-allowance", nombre: "Employment Allowance", tipo: "numero", unidad: "GBP", proximaRevision: PROXIMO, tramos: anual(10500, EMPLEADORES) },
  {
    id: "gb.student-loan-thresholds",
    nombre: "Student and postgraduate loan repayment thresholds (annual)",
    tipo: "mapa",
    unidad: "GBP",
    etiquetas: { "plan-1": "Plan 1", "plan-2": "Plan 2", "plan-4": "Plan 4 (Scotland)", "plan-5": "Plan 5", postgraduate: "Postgraduate Loan" },
    proximaRevision: PROXIMO,
    tramos: anual({ "plan-1": 26900, "plan-2": 29385, "plan-4": 33795, "plan-5": 25000, postgraduate: 21000 }, EMPLEADORES),
  },
  { id: "gb.student-loan-rate", nombre: "Student loan deduction rate", tipo: "numero", unidad: "%", proximaRevision: PROXIMO, tramos: anual(9, EMPLEADORES) },
  { id: "gb.postgraduate-loan-rate", nombre: "Postgraduate loan deduction rate", tipo: "numero", unidad: "%", proximaRevision: PROXIMO, tramos: anual(6, EMPLEADORES) },
  { id: "gb.ssp-weekly-rate", nombre: "Statutory Sick Pay weekly rate", tipo: "numero", unidad: "GBP", proximaRevision: PROXIMO, tramos: anual(123.25, EMPLEADORES) },
  { id: "gb.ssp-earnings-percent", nombre: "Statutory Sick Pay as a share of average weekly earnings", tipo: "numero", unidad: "%", proximaRevision: PROXIMO, tramos: anual(80, SSP) },
  { id: "gb.ssp-max-weeks", nombre: "Maximum weeks of Statutory Sick Pay", tipo: "numero", unidad: "numero", tramos: desde("2026-04-06", 28, SSP) },
  {
    id: "gb.smp-standard-rate",
    nombre: "Statutory Maternity Pay standard weekly rate",
    tipo: "numero",
    unidad: "GBP",
    proximaRevision: "2027-04-04",
    tramos: [{ estado: "verificado", desde: "2026-04-05", hasta: "2027-04-03", valor: 194.32, fuente: EMPLEADORES }],
  },
  { id: "gb.smp-earnings-percent", nombre: "Statutory Maternity Pay as a share of average weekly earnings", tipo: "numero", unidad: "%", tramos: desde("2026-04-05", 90, SMP) },
  { id: "gb.smp-higher-weeks", nombre: "Weeks of Statutory Maternity Pay at 90% of earnings", tipo: "numero", unidad: "numero", tramos: desde("2026-04-05", 6, SMP) },
  { id: "gb.smp-total-weeks", nombre: "Total weeks of Statutory Maternity Pay", tipo: "numero", unidad: "numero", tramos: desde("2026-04-05", 39, SMP) },
  { id: "gb.class4-main-rate", nombre: "Class 4 rate between £12,570 and £50,270 of profits", tipo: "numero", unidad: "%", proximaRevision: PROXIMO, tramos: anual(6, SELF_EMPLOYED) },
  { id: "gb.class4-upper-rate", nombre: "Class 4 rate above £50,270 of profits", tipo: "numero", unidad: "%", proximaRevision: PROXIMO, tramos: anual(2, SELF_EMPLOYED) },
  { id: "gb.class4-lower-profits-limit", nombre: "Class 4 Lower Profits Limit", tipo: "numero", unidad: "GBP", proximaRevision: PROXIMO, tramos: anual(12570, SELF_EMPLOYED) },
  { id: "gb.class4-upper-profits-limit", nombre: "Class 4 Upper Profits Limit", tipo: "numero", unidad: "GBP", proximaRevision: PROXIMO, tramos: anual(50270, SELF_EMPLOYED) },
  { id: "gb.class2-small-profits-threshold", nombre: "Profit level where Class 2 is treated as paid", tipo: "numero", unidad: "GBP", proximaRevision: PROXIMO, tramos: anual(7105, SELF_EMPLOYED) },
  { id: "gb.class2-weekly-rate", nombre: "Voluntary Class 2 weekly rate", tipo: "numero", unidad: "GBP", proximaRevision: PROXIMO, tramos: anual(3.65, SELF_EMPLOYED) },
  { id: "gb.dividend-allowance", nombre: "Dividend Allowance", tipo: "numero", unidad: "GBP", proximaRevision: PROXIMO, tramos: anual(500, DIVIDENDS) },
  {
    id: "gb.dividend-rates",
    nombre: "Dividend tax rates",
    tipo: "mapa",
    unidad: "%",
    etiquetas: { basic: "Basic rate", higher: "Higher rate", additional: "Additional rate" },
    proximaRevision: PROXIMO,
    tramos: anual({ basic: 10.75, higher: 35.75, additional: 39.35 }, DIVIDENDS),
  },
  { id: "gb.cgt-annual-exempt-amount", nombre: "Capital Gains Tax annual exempt amount", tipo: "numero", unidad: "GBP", proximaRevision: PROXIMO, tramos: anual(3000, CGT_ALLOWANCE) },
  {
    id: "gb.cgt-rates",
    nombre: "Capital Gains Tax rates",
    tipo: "mapa",
    unidad: "%",
    etiquetas: { basic: "Within the basic rate band", higher: "Above the basic rate band" },
    proximaRevision: PROXIMO,
    tramos: anual({ basic: 18, higher: 24 }, CGT_RATES),
  },
  {
    id: "gb.sdlt-standard",
    nombre: "Stamp Duty Land Tax, residential rates",
    tipo: "escala",
    unidad: "GBP",
    tramos: desde(
      "2025-04-01",
      [
        { desde: 0, hasta: 125000, tasa: 0 },
        { desde: 125000, hasta: 250000, tasa: 2 },
        { desde: 250000, hasta: 925000, tasa: 5 },
        { desde: 925000, hasta: 1500000, tasa: 10 },
        { desde: 1500000, hasta: null, tasa: 12 },
      ],
      SDLT,
    ),
  },
  {
    id: "gb.sdlt-first-time-buyer",
    nombre: "Stamp Duty Land Tax, first-time buyer relief rates",
    tipo: "escala",
    unidad: "GBP",
    tramos: desde(
      "2025-04-01",
      [
        { desde: 0, hasta: 300000, tasa: 0 },
        { desde: 300000, hasta: null, tasa: 5 },
      ],
      SDLT,
    ),
  },
  { id: "gb.sdlt-first-time-buyer-cap", nombre: "Price limit for first-time buyer relief", tipo: "numero", unidad: "GBP", tramos: desde("2025-04-01", 500000, SDLT) },
  { id: "gb.sdlt-additional-surcharge", nombre: "Higher rates for additional dwellings (surcharge)", tipo: "numero", unidad: "%", tramos: desde("2024-10-31", 5, SDLT) },
  { id: "gb.sdlt-non-resident-surcharge", nombre: "Non-UK resident surcharge", tipo: "numero", unidad: "%", tramos: desde("2021-04-01", 2, SDLT) },
  {
    id: "gb.minimum-wage",
    nombre: "National Minimum Wage and National Living Wage (hourly)",
    tipo: "mapa",
    unidad: "GBP",
    etiquetas: { "21-and-over": "21 and over (National Living Wage)", "18-to-20": "18 to 20", "under-18": "Under 18", apprentice: "Apprentice" },
    proximaRevision: "2027-04-01",
    tramos: [
      { estado: "verificado", desde: "2025-04-01", hasta: "2026-03-31", valor: { "21-and-over": 12.21, "18-to-20": 10, "under-18": 7.55, apprentice: 7.55 }, fuente: NMW },
      { estado: "verificado", desde: "2026-04-01", valor: { "21-and-over": 12.71, "18-to-20": 10.85, "under-18": 8, apprentice: 8 }, fuente: NMW },
    ],
  },
  { id: "gb.redundancy-weekly-pay-cap", nombre: "Weekly pay cap for statutory redundancy pay", tipo: "numero", unidad: "GBP", proximaRevision: PROXIMO, tramos: desde("2026-04-06", 751, REDUNDANCY) },
  { id: "gb.redundancy-max-years", nombre: "Maximum years of service counted for redundancy pay", tipo: "numero", unidad: "anios", tramos: desde("1996-08-22", 20, REDUNDANCY) },
  { id: "gb.notice-max-weeks", nombre: "Maximum statutory notice from an employer", tipo: "numero", unidad: "numero", tramos: desde("1996-08-22", 12, NOTICE) },
  { id: "gb.holiday-weeks", nombre: "Statutory paid holiday a year", tipo: "numero", unidad: "numero", tramos: desde("2009-04-01", 5.6, HOLIDAY) },
  { id: "gb.holiday-max-days", nombre: "Cap on statutory paid holiday", tipo: "numero", unidad: "dias", tramos: desde("2009-04-01", 28, HOLIDAY) },
  { id: "gb.irregular-hours-accrual", nombre: "Holiday accrual for irregular hours and part-year workers", tipo: "numero", unidad: "%", tramos: desde("2024-04-01", 12.07, HOLIDAY_IRREGULAR) },
  { id: "gb.vat-rates", nombre: "VAT rates", tipo: "mapa", unidad: "%", etiquetas: { standard: "Standard rate", reduced: "Reduced rate", zero: "Zero rate" }, tramos: desde("2011-01-04", { standard: 20, reduced: 5, zero: 0 }, VAT) },
  { id: "gb.state-pension-full-weekly", nombre: "Full new State Pension (weekly)", tipo: "numero", unidad: "GBP", proximaRevision: PROXIMO, tramos: anual(241.3, STATE_PENSION) },
  { id: "gb.state-pension-full-years", nombre: "Qualifying years for the full new State Pension", tipo: "numero", unidad: "anios", tramos: desde("2016-04-06", 35, STATE_PENSION) },
  { id: "gb.state-pension-min-years", nombre: "Minimum qualifying years for any new State Pension", tipo: "numero", unidad: "anios", tramos: desde("2016-04-06", 10, STATE_PENSION_ELIG) },
  {
    id: "gb.child-benefit-rates",
    nombre: "Child Benefit weekly rates",
    tipo: "mapa",
    unidad: "GBP",
    etiquetas: { eldest: "Eldest or only child", additional: "Each additional child" },
    proximaRevision: PROXIMO,
    tramos: anual({ eldest: 27.05, additional: 17.9 }, CHILD_BENEFIT),
  },
  { id: "gb.hicbc-threshold", nombre: "High Income Child Benefit Charge threshold", tipo: "numero", unidad: "GBP", tramos: desde("2024-04-06", 60000, HICBC) },
  { id: "gb.hicbc-step", nombre: "Income over the threshold for each 1% of the charge", tipo: "numero", unidad: "GBP", tramos: desde("2024-04-06", 200, HICBC) },
];

const texto = JSON.stringify({ mercado: "gb", datos }, null, 2);
writeFileSync(path.join(process.cwd(), "src/paises/gb/datos.json"), `${texto}\n`);
console.log(`${datos.length} datos`);
