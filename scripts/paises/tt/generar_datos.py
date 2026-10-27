# Genera src/paises/tt/datos.json. La tabla del NIS se copia de la planilla oficial del NIBTT
# ("Earnings Classes and Contributions from 05 January 2026", tasa 16,2 %).
import json
from pathlib import Path

HOY = "2026-10-27"


def fuente(organismo, titulo, url, nota=None):
    f = {"organismo": organismo, "titulo": titulo, "url": url, "tipo": "primaria", "verificadoEl": HOY}
    if nota:
        f["nota"] = nota
    return f


IRD = "Inland Revenue Division, Ministry of Finance"
F_DED = fuente(IRD, "Deductions and Required Supporting Documents (Individual Income Tax)", "https://www.ird.gov.tt/individual/deductions-and-required-supporting-documents")
F_SEV = fuente(IRD, "General Guidelines for Severance and Gratuity", "https://www.ird.gov.tt/general-guidelines-for-severance-gratuity")
F_TASAS = fuente(IRD, "General Guidelines for Severance and Gratuity", "https://www.ird.gov.tt/general-guidelines-for-severance-gratuity",
                 "The page gives the individual rates: 25% up to $1,000,000 and 30% in excess of $1,000,000. It does not give the date they started.")
F_HS = fuente(IRD, "Health Surcharge", "https://www.ird.gov.tt/health-surcharge", "The page shows the rates in force without a start date.")
F_VAT = fuente(IRD, "Value Added Tax (VAT)", "https://www.ird.gov.tt/VAT", "The page shows the standard rate and the registration threshold without a start date.")
F_SD = fuente(IRD, "Stamp Duty Rates (with effect from October 1st 2008)", "https://www.ird.gov.tt/news/stamp-duty-rates")
F_SDFAQ = fuente(IRD, "Stamp Duty FAQs", "https://www.ird.gov.tt/stamp-duty/FAQs")
F_NIS = fuente("National Insurance Board of Trinidad and Tobago", "Earnings Classes and Contributions from 05 January 2026 (contribution rate of 16.2%)",
               "https://nibtt.net/Contribution_Rates/NISContributions_20260105.pdf")
F_MW = fuente("Government Printer (Trinidad and Tobago Gazette)", "Legal Notice No. 390 of 2023, Minimum Wages (Amendment) Order, 2023",
              "https://www.printery.gov.tt/e-gazette/2023/Legal%20Notices/Legal%20Notice%20No.%20390%20of%202023.pdf")
F_MPA = fuente("Ministry of the Attorney General and Legal Affairs", "Maternity Protection Act, Chap. 45:57, sections 9(1) to 9(3)",
               "https://laws.gov.tt/ttdll-web2/revision/download/79174?type=act",
               "Consolidated text updated to December 31, 2014, including Act 7 of 2012.")

# Clase: (semanal desde, semanal hasta, mensual desde, mensual hasta, aporte semanal del empleado, del empleador)
NIS = [
    (200, 339.99, 867, 1472.99, 14.60, 29.20),
    (340, 449.99, 1473, 1949.99, 21.30, 42.60),
    (450, 609.99, 1950, 2642.99, 28.60, 57.20),
    (610, 759.99, 2643, 3292.99, 37.00, 74.00),
    (760, 929.99, 3293, 4029.99, 45.60, 91.20),
    (930, 1119.99, 4030, 4852.99, 55.40, 110.80),
    (1120, 1299.99, 4853, 5632.99, 65.30, 130.60),
    (1300, 1489.99, 5633, 6456.99, 75.30, 150.60),
    (1490, 1709.99, 6457, 7409.99, 86.40, 172.80),
    (1710, 1909.99, 7410, 8276.99, 97.70, 195.40),
    (1910, 2139.99, 8277, 9272.99, 109.40, 218.80),
    (2140, 2379.99, 9273, 10312.99, 122.00, 244.00),
    (2380, 2629.99, 10313, 11396.99, 135.30, 270.60),
    (2630, 2919.99, 11397, 12652.99, 149.90, 299.80),
    (2920, 3137.99, 12653, 13599.99, 163.60, 327.20),
    (3138, None, 13600, None, 169.50, 339.00),
]


def escala_nis(col_desde, col_hasta, col_aporte):
    return [{"desde": c[col_desde], "hasta": c[col_hasta], "tasa": 0, "cuotaFija": c[col_aporte]} for c in NIS]


def numero(id, nombre, unidad, valor, desde, f, revision=None):
    d = {"id": id, "nombre": nombre, "tipo": "numero", "unidad": unidad,
         "tramos": [{"estado": "verificado", "desde": desde, "valor": valor, "fuente": f}]}
    if revision:
        d["proximaRevision"] = revision
    return d


def escala(id, nombre, unidad, filas, desde, f, revision=None):
    d = {"id": id, "nombre": nombre, "tipo": "escala", "unidad": unidad,
         "tramos": [{"estado": "verificado", "desde": desde, "valor": filas, "fuente": f}]}
    if revision:
        d["proximaRevision"] = revision
    return d


datos = [
    numero("tt.personal-allowance", "Personal allowance (resident individual)", "TTD", 90000, "2023-01-01", F_DED, "2027-01-01"),
    numero("tt.income-tax-rate", "Income tax rate on chargeable income up to the higher band", "%", 25, "2026-01-01", F_TASAS, "2027-01-01"),
    numero("tt.income-tax-higher-rate", "Income tax rate on chargeable income above the higher band", "%", 30, "2026-01-01", F_TASAS, "2027-01-01"),
    numero("tt.income-tax-higher-band", "Chargeable income taxed at the lower rate", "TTD", 1000000, "2026-01-01", F_TASAS, "2027-01-01"),
    numero("tt.nis-deductible-share", "Share of employee NIS contributions you can deduct", "%", 70, "2022-01-01", F_DED),
    numero("tt.pension-nis-deduction-cap", "Limit on the deduction for pension plans, annuities and 70% of NIS", "TTD", 60000, "2022-01-01", F_DED),
    numero("tt.severance-exemption", "Tax exemption for severance payments", "TTD", 500000, "2018-11-30", F_SEV),
    numero("tt.health-surcharge-high", "Health Surcharge, higher weekly rate", "TTD", 8.25, "2026-01-01", F_HS),
    numero("tt.health-surcharge-low", "Health Surcharge, lower weekly rate", "TTD", 4.80, "2026-01-01", F_HS),
    numero("tt.health-surcharge-threshold-monthly", "Monthly emoluments above which the higher Health Surcharge applies", "TTD", 469.99, "2026-01-01", F_HS),
    numero("tt.health-surcharge-threshold-weekly", "Weekly emoluments above which the higher Health Surcharge applies", "TTD", 109.00, "2026-01-01", F_HS),
    escala("tt.nis-employee-weekly", "NIS employee contribution a week, by weekly earnings", "TTD", escala_nis(0, 1, 4), "2026-01-05", F_NIS, "2027-01-04"),
    escala("tt.nis-employer-weekly", "NIS employer contribution a week, by weekly earnings", "TTD", escala_nis(0, 1, 5), "2026-01-05", F_NIS, "2027-01-04"),
    escala("tt.nis-employee-monthly", "NIS employee contribution a week, by monthly earnings", "TTD", escala_nis(2, 3, 4), "2026-01-05", F_NIS, "2027-01-04"),
    escala("tt.nis-employer-monthly", "NIS employer contribution a week, by monthly earnings", "TTD", escala_nis(2, 3, 5), "2026-01-05", F_NIS, "2027-01-04"),
    numero("tt.minimum-wage-hourly", "National minimum wage per hour", "TTD", 20.50, "2024-01-01", F_MW),
    numero("tt.minimum-wage-daily", "National minimum wage for an 8-hour day", "TTD", 164.00, "2024-01-01", F_MW),
    numero("tt.minimum-wage-weekly", "National minimum wage for a 40-hour week", "TTD", 820.00, "2024-01-01", F_MW),
    numero("tt.minimum-wage-monthly", "National minimum wage for a month (173.3334 hours)", "TTD", 3553.33, "2024-01-01", F_MW),
    numero("tt.vat-standard", "VAT standard rate", "%", 12.5, "2026-01-01", F_VAT),
    numero("tt.vat-registration-threshold", "VAT registration threshold (supplies in 12 months)", "TTD", 600000, "2026-01-01", F_VAT),
    escala("tt.stamp-duty-residential", "Stamp duty on residential property with a dwelling house", "TTD", [
        {"desde": 0, "hasta": 850000, "tasa": 0},
        {"desde": 850000, "hasta": 1250000, "tasa": 3},
        {"desde": 1250000, "hasta": 1750000, "tasa": 5},
        {"desde": 1750000, "hasta": None, "tasa": 7.5},
    ], "2008-10-01", F_SD),
    escala("tt.stamp-duty-land", "Stamp duty on residential land only", "TTD", [
        {"desde": 0, "hasta": 450000, "tasa": 0},
        {"desde": 450000, "hasta": 650000, "tasa": 2},
        {"desde": 650000, "hasta": 850000, "tasa": 5},
        {"desde": 850000, "hasta": None, "tasa": 7},
    ], "2008-10-01", F_SD),
    numero("tt.stamp-duty-first-home-exemption", "Stamp duty exemption for first-time homeowners (house and land)", "TTD", 1500000, "2019-01-01", F_SDFAQ),
    numero("tt.maternity-leave-weeks", "Maternity leave", "semanas", 14, "2012-01-01", F_MPA),
    numero("tt.maternity-leave-before-birth-weeks", "Weeks before the expected birth when leave can start", "semanas", 6, "2012-01-01", F_MPA),
    numero("tt.maternity-full-pay-months", "Months of maternity leave the employer pays in full", "meses", 1, "2012-01-01", F_MPA),
    numero("tt.maternity-half-pay-months", "Months of maternity leave the employer pays at half pay", "meses", 2, "2012-01-01", F_MPA),
]

salida = Path(__file__).resolve().parents[3] / "src" / "paises" / "tt" / "datos.json"
with open(salida, "w", encoding="utf-8", newline="\n") as f:
    json.dump({"mercado": "tt", "datos": datos}, f, ensure_ascii=False, indent=2)
    f.write("\n")
print(f"{len(datos)} datos en {salida}")
