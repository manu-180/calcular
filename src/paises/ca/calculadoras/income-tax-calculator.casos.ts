import { definirCasos } from "@/motor/calculo";
import calculadora from "./income-tax-calculator";

export default definirCasos(calculadora, [
  {
    "nombre": "Ontario employee, $70,000",
    "origen": {
      "tipo": "recalculado",
      "detalle": "CPP (70,000 − 3,500) × 5.95% = 3,956.75, base 3,291.75, enhanced 665. EI 68,900 × 1.63% = 1,123.07. A = 69,335. Federal: 58,523 × 14% + 10,812 × 20.5% = 10,409.68 less 14% × (16,452 + 1,501 + 3,291.75 + 1,123.07) = 3,131.49 → 7,278.19. Ontario: 53,891 × 5.05% + 15,444 × 9.15% = 4,134.63 less 5.05% × (12,989 + 3,291.75 + 1,123.07) = 878.89 → 3,255.74; no surtax; health premium capped at 600; no reduction → 3,855.73 (3,855.74 before rounding of the parts)."
    },
    "fecha": "2026-10-14",
    "entrada": {
      "provincia": "on",
      "empleo": 70000,
      "otros": 0,
      "rrsp": 0
    },
    "esperado": {
      "federal": 7278.19,
      "provincial": 3855.73,
      "total": 11133.92,
      "gravable": 69335,
      "marginal": 29.65
    },
    "tolerancia": 0.011
  },
  {
    "nombre": "BC employee, $40,000 with the BC tax reduction",
    "origen": {
      "tipo": "recalculado",
      "detalle": "A = 40,000 − 365 = 39,635. BC: 39,635 × 5.6% = 2,219.56 less 5.6% × (13,216 + 1,806.75 + 652) = 877.79 → 1,341.77. Reduction 690 − (39,635 − 25,570) × 3.56% = 189.29. BC tax 1,152.48."
    },
    "fecha": "2026-10-14",
    "entrada": {
      "provincia": "bc",
      "empleo": 40000,
      "otros": 0,
      "rrsp": 0
    },
    "esperado": {
      "federal": 2691.25,
      "provincial": 1152.49,
      "total": 3843.74
    },
    "tolerancia": 0.011
  },
  {
    "nombre": "Alberta, $100,000 with $5,000 RRSP",
    "origen": {
      "tipo": "recalculado",
      "detalle": "CPP max 4,230.45 + CPP2 416; A = 100,000 − 5,000 − 711 − 416 = 93,873. Alberta: 61,200 × 8% + 32,673 × 10% = 8,163.30 less 8% × (22,769 + 3,519.45 + 1,123.07) = 2,192.92 → 5,970.38; supplemental credit 0 because 2,192.92 < 4,896."
    },
    "fecha": "2026-10-14",
    "entrada": {
      "provincia": "ab",
      "empleo": 100000,
      "otros": 0,
      "rrsp": 5000
    },
    "esperado": {
      "provincial": 5970.38,
      "federal": 12276.6,
      "gravable": 93873
    },
    "tolerancia": 0.011
  },
  {
    "nombre": "Ontario, $15,000: no tax",
    "origen": {
      "tipo": "recalculado",
      "detalle": "Credits (BPA 16,452 federal, 12,989 Ontario plus CPP and EI) exceed tax on 14,885 of taxable income."
    },
    "fecha": "2026-10-14",
    "entrada": {
      "provincia": "on",
      "empleo": 15000,
      "otros": 0,
      "rrsp": 0
    },
    "esperado": {
      "total": 0,
      "federal": 0,
      "provincial": 0
    }
  },
  {
    "nombre": "Manitoba, $300,000: BPA phase-out",
    "origen": {
      "tipo": "recalculado",
      "detalle": "Federal and Manitoba BPAs reduced: Manitoba BPA 15,780 − (298,873 − 200,000) × 15,780 / 200,000 = 7,978.92."
    },
    "fecha": "2026-10-14",
    "entrada": {
      "provincia": "mb",
      "empleo": 300000,
      "otros": 0,
      "rrsp": 0
    },
    "esperado": {
      "total": 114742.28,
      "marginal": 51.25
    },
    "tolerancia": 0.011
  },
  {
    "nombre": "Negative income",
    "origen": {
      "tipo": "recalculado",
      "detalle": "Negative amounts are rejected."
    },
    "fecha": "2026-10-14",
    "entrada": {
      "provincia": "on",
      "empleo": -1,
      "otros": 0,
      "rrsp": 0
    },
    "esperaError": true
  }
]);
