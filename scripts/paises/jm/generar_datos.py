"""Genera src/paises/jm/datos.json. Cada valor sale de la fuente citada en su tramo (leída el 2026-10-24).

Uso: python scripts/paises/jm/generar_datos.py
"""
import json
import os

HOY = "2026-10-24"
RAIZ = os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))

TAJ = "Tax Administration Jamaica"
PAYROLL = (
    "https://www.jamaicatax.gov.jm/documents/10194/105112/"
    "Pay+Roll+Taxes+and+Contribution+Rates-Employer+and+Employees_Dec2025.pdf/1d5554a1-b0e6-13bd-d16b-073c8216b753"
)
ADVISORY = (
    "https://www.jamaicatax.gov.jm/documents/10194/52231399/"
    "Technical_Advisory_Threshold+_042025.pdf/c4adbf81-8ddd-9a1b-9e8b-8bdc431162df"
)
RATES_2013_2028 = (
    "https://www.jamaicatax.gov.jm/documents/10194/15307403/"
    "INDIVIDUAL_INCOME_TAX_RATES_THRESHOLD_AND_EXEMPTIONS_2013-2028.pdf/c0987986-f35c-7106-85a4-d488a6f52627"
)
GCT = "https://www.jamaicatax.gov.jm/general-consumption-tax1"
FEES = "https://www.jamaicatax.gov.jm/rates-and-fees"
PROPERTY = (
    "https://www.jamaicatax.gov.jm/documents/10194/7675012/"
    "Feature_Layout_TAJ_Property_Tax_052022.pdf/f2d97afb-9274-e86d-5947-bea766d92f81"
)
JIS_MW_2026 = "https://jis.gov.jm/minimum-wage-moves-to-17000-up-from-16000/"
JIS_MW_2025 = "https://jis.gov.jm/minimum-wage-moves-to-16000-june-1/"
JIS_LABOUR = "https://jis.gov.jm/labour-laws/"
LMP = "https://www.mlss.gov.jm/wp-content/uploads/2024/07/Labour-Management-Procedures-LMP-JAMAICA-SPIRO-FINAL.pdf"
NHT_LOANS = "https://www.nht.gov.jm/index.php/loans"
NHT_LIMITS = "https://www.nht.gov.jm/index.php/loan-limits"


def f(organismo, titulo, url, nota=None):
    d = {"organismo": organismo, "titulo": titulo, "url": url, "tipo": "primaria", "verificadoEl": HOY}
    if nota:
        d["nota"] = nota
    return d


F_PAYROLL = f(TAJ, "Payroll Taxes and Statutory Contributions (Employee / Employer), December 2025", PAYROLL)
F_ADVISORY = f(TAJ, "Technical Advisory 042025/01/IT-TA: Increase in Income Tax Threshold April 1, 2025 to December 31, 2028", ADVISORY)
F_RATES = f(TAJ, "Individual Income Tax Rates, Threshold and Exemptions 2013-2028 (last updated April 2025)", RATES_2013_2028)
F_GCT = f(TAJ, "General Consumption Tax: history of the standard rate", GCT)
F_FEES = f(
    TAJ,
    "Rates and Fees: Stamp Duty related rates and fees",
    FEES,
    "The page gives no effective date. The tramo starts on the day we read it.",
)
F_PROPERTY = f(
    TAJ,
    "What you need to know about Property Tax (May 2022): Property Tax Rate Schedule as at April 1, 2017",
    PROPERTY,
)
F_MW_2026 = f(
    "Jamaica Information Service (Government of Jamaica)",
    "Minimum Wage Moves to $17,000, Up from $16,000 (House approves the National Minimum Wage (Amendment) Order, 2026)",
    JIS_MW_2026,
    "The Ministry of Labour has not yet posted the 2026 Order. The figures are the ones the Minister gave the House on June 23, 2026.",
)
F_MW_2025 = f("Jamaica Information Service (Government of Jamaica)", "Minimum Wage Moves to $16,000 June 1 (2025/26 Budget Debate)", JIS_MW_2025)
F_LMP = f(
    "Ministry of Labour and Social Security",
    "Labour Management Procedures, Jamaica SPIRO project (2024): summary of the National Minimum Wage Order, the Holidays with Pay Order and the Maternity Leave Act",
    LMP,
)
F_JIS_LABOUR = f(
    "Jamaica Information Service (Government of Jamaica)",
    "Labour Laws: Employment (Termination and Redundancy Payments) Act, amended 2022",
    JIS_LABOUR,
    "laws.moj.gov.jm is down for maintenance and the Legal Information Portal needs a captcha, so the notice periods were read in the Government's own summary of the Act.",
)
F_NHT_LOANS = f(
    "National Housing Trust",
    "Loans: NHT interest rates by weekly income band and years to repay",
    NHT_LOANS,
    "The page gives no effective date. The tramo starts on the day we read it.",
)
F_NHT_LIMITS = f("National Housing Trust", "Loan Limits (updated July 2025)", NHT_LIMITS)


def num(id_, nombre, unidad, tramos, **extra):
    d = {"id": id_, "nombre": nombre, "tipo": "numero", "unidad": unidad}
    d.update(extra)
    d["tramos"] = tramos
    return d


def t(desde, valor, fuente, hasta=None):
    d = {"estado": "verificado", "desde": desde}
    if hasta:
        d["hasta"] = hasta
    d["valor"] = valor
    d["fuente"] = fuente
    return d


def nv(desde, valor, motivo):
    return {"estado": "no-verificado", "desde": desde, "valor": valor, "motivo": motivo}


datos = []

# PAYE e impuesto a la renta.
datos.append(
    num(
        "jm.paye-threshold-monthly",
        "Monthly income tax threshold for PAYE",
        "JMD",
        [
            t("2024-04-01", 141674, F_PAYROLL, "2025-03-31"),
            t("2025-04-01", 149948, F_ADVISORY, "2026-03-31"),
            t("2026-04-01", 158530, F_ADVISORY, "2027-03-31"),
            t("2027-04-01", 166958, F_ADVISORY),
        ],
        proximaRevision="2027-04-01",
    )
)
datos.append(
    num(
        "jm.income-tax-threshold",
        "Effective annual income tax threshold for the year of assessment",
        "JMD",
        [
            t("2024-01-01", 1650090, F_RATES, "2024-12-31"),
            t("2025-01-01", 1774554, F_ADVISORY, "2025-12-31"),
            t("2026-01-01", 1876614, F_ADVISORY, "2026-12-31"),
            t("2027-01-01", 1978212, F_ADVISORY, "2027-12-31"),
            t("2028-01-01", 2003496, F_ADVISORY),
        ],
        proximaRevision="2027-01-01",
    )
)
datos.append(num("jm.income-tax-rate", "Income tax rate above the threshold", "%", [t("2017-01-01", 25, F_RATES)]))
datos.append(num("jm.income-tax-higher-rate", "Income tax rate on statutory income above $6 million a year", "%", [t("2017-01-01", 30, F_RATES)]))
datos.append(num("jm.income-tax-higher-band", "Annual statutory income where the 30% rate starts", "JMD", [t("2017-01-01", 6000000, F_RATES)]))
datos.append(num("jm.income-tax-higher-band-monthly", "Monthly statutory income where the 30% rate starts", "JMD", [t("2017-01-01", 500000, F_RATES)]))
datos.append(
    num(
        "jm.age-exemption",
        "Age exemption for people 65 and over",
        "JMD",
        [t("2024-01-01", 207530, F_RATES, "2024-12-31"), t("2025-01-01", 250040, F_ADVISORY)],
    )
)
datos.append(
    num(
        "jm.pension-exemption",
        "Pension income exemption",
        "JMD",
        [t("2024-01-01", 207530, F_RATES, "2024-12-31"), t("2025-01-01", 250040, F_ADVISORY)],
    )
)

# Aportes sobre la nómina.
for id_, nombre, valor in [
    ("jm.nis-employee-rate", "NIS contribution, employee", 3),
    ("jm.nis-employer-rate", "NIS contribution, employer", 3),
    ("jm.nht-employee-rate", "NHT contribution, employee", 2),
    ("jm.nht-employer-rate", "NHT contribution, employer", 3),
    ("jm.education-tax-employee-rate", "Education Tax, employee", 2.25),
    ("jm.education-tax-employer-rate", "Education Tax, employer", 3.5),
    ("jm.heart-rate", "HEART/NSTA Trust contribution, employer", 3),
]:
    datos.append(num(id_, nombre, "%", [t("2024-04-01", valor, F_PAYROLL)]))
datos.append(num("jm.nis-ceiling", "Annual wage ceiling for NIS contributions", "JMD", [t("2024-04-01", 5000000, F_PAYROLL)]))
datos.append(
    num(
        "jm.heart-payroll-threshold",
        "Annual payroll above which the employer pays HEART/NSTA Trust",
        "JMD",
        [t("2024-04-01", 173328, F_PAYROLL)],
    )
)

# GCT y propiedad.
datos.append(num("jm.gct-standard", "GCT standard rate", "%", [t("2020-04-01", 15, F_GCT)]))
datos.append(num("jm.transfer-tax-rate", "Transfer tax on the market value of land", "%", [t(HOY, 2, F_FEES)]))
datos.append(num("jm.stamp-duty-high", "Stamp duty on an agreement for sale, transfer or mortgage of $500,000 or more", "JMD", [t(HOY, 5000, F_FEES)]))
datos.append(num("jm.stamp-duty-low", "Stamp duty when the consideration is $499,999 or less", "JMD", [t(HOY, 100, F_FEES)]))
datos.append(num("jm.stamp-duty-band", "Consideration from which the $5,000 stamp duty applies", "JMD", [t(HOY, 500000, F_FEES)]))
datos.append(num("jm.stamp-duty-mortgage-surcharge", "Surcharge on the stamp duty of a mortgage of land (1/4 of the duty)", "%", [t(HOY, 25, F_FEES)]))


def fila(desde, hasta, tasa):
    return {"desde": desde, "hasta": hasta, "tasa": tasa}


base = [
    fila(0, 400000, 0),
    fila(400000, 800000, 0.5),
    fila(800000, 1500000, 0.55),
    fila(1500000, 3000000, 0.6),
    fila(3000000, 4500000, 0.65),
    fila(4500000, 7000000, 0.7),
    fila(7000000, 12000000, 0.75),
]
datos.append(
    {
        "id": "jm.property-tax-bands",
        "nombre": "Property tax on unimproved value up to $30 million (after the first $400,000)",
        "tipo": "escala",
        "unidad": "JMD",
        "tramos": [t("2017-04-01", base + [fila(12000000, None, 0.8)], F_PROPERTY)],
    }
)
datos.append(
    {
        "id": "jm.property-tax-bands-over-30m",
        "nombre": "Property tax on unimproved value above $30 million (after the first $400,000)",
        "tipo": "escala",
        "unidad": "JMD",
        "tramos": [t("2017-04-01", base + [fila(12000000, 30000000, 0.85), fila(30000000, None, 0.9)], F_PROPERTY)],
    }
)
datos.append(num("jm.property-tax-minimum", "Property tax on the first $400,000 of unimproved value", "JMD", [t("2017-04-01", 1000, F_PROPERTY)]))
datos.append(num("jm.property-tax-split", "Unimproved value where the higher property tax schedule starts", "JMD", [t("2017-04-01", 30000000, F_PROPERTY)]))

# Salario mínimo y jornada.
datos.append(
    num(
        "jm.minimum-wage-weekly",
        "National minimum wage for a 40-hour week",
        "JMD",
        [t("2025-06-01", 16000, F_MW_2025, "2026-06-30"), t("2026-07-01", 17000, F_MW_2026)],
        proximaRevision="2027-06-01",
    )
)
datos.append(
    num(
        "jm.minimum-wage-hourly",
        "National minimum wage per hour",
        "JMD",
        [t("2025-06-01", 400, F_MW_2026, "2026-06-30"), t("2026-07-01", 425, F_MW_2026)],
        proximaRevision="2027-06-01",
    )
)
datos.append(num("jm.normal-week-hours", "Hours in a normal week under the National Minimum Wage Order", "horas", [t("2024-06-01", 40, F_LMP)]))
datos.append(num("jm.overtime-multiplier", "Overtime rate (time and a half)", "factor", [t("2024-06-01", 1.5, F_LMP)]))
datos.append(num("jm.double-time-multiplier", "Rest day and public holiday rate (double time)", "factor", [t("2024-06-01", 2, F_LMP)]))

# Holidays with Pay Order.
datos.append(num("jm.vacation-min-days", "Days worked in the year needed to earn vacation leave", "dias", [t("2024-07-01", 110, F_LMP)]))
datos.append(num("jm.vacation-full-days", "Days worked above which the full vacation applies", "dias", [t("2024-07-01", 220, F_LMP)]))
datos.append(num("jm.leave-days-per", "Days worked for each day of vacation or sick leave", "dias", [t("2024-07-01", 22, F_LMP)]))
datos.append(num("jm.vacation-weeks", "Vacation leave after more than 220 days worked", "semanas", [t("2024-07-01", 2, F_LMP)]))
datos.append(num("jm.vacation-weeks-long-service", "Vacation leave with 10 or more years of service", "semanas", [t("2024-07-01", 3, F_LMP)]))
datos.append(num("jm.vacation-long-service-years", "Years of service for the longer vacation", "anios", [t("2024-07-01", 10, F_LMP)]))
datos.append(num("jm.sick-leave-weeks", "Sick leave with pay after the first 12 months", "semanas", [t("2024-07-01", 2, F_LMP)]))
datos.append(num("jm.sick-leave-first-months", "Months during which sick leave is earned day by day", "meses", [t("2024-07-01", 12, F_LMP)]))

# Maternity Leave Act.
datos.append(num("jm.maternity-leave-weeks", "Maternity leave", "semanas", [t("2024-07-01", 12, F_LMP)]))
datos.append(num("jm.maternity-paid-weeks", "Paid weeks of maternity leave", "semanas", [t("2024-07-01", 8, F_LMP)]))
datos.append(num("jm.maternity-qualifying-weeks", "Continuous employment needed for paid maternity leave", "semanas", [t("2024-07-01", 52, F_LMP)]))
datos.append(num("jm.maternity-extension-weeks", "Unpaid extension on medical grounds", "semanas", [t("2024-07-01", 14, F_LMP)]))
datos.append(num("jm.maternity-paid-times", "Times paid maternity leave can be taken with one employer", "numero", [t("2024-07-01", 3, F_LMP)]))

# Employment (Termination and Redundancy Payments) Act.
datos.append(
    {
        "id": "jm.notice-weeks",
        "nombre": "Minimum notice from the employer by length of continuous service",
        "tipo": "mapa",
        "unidad": "semanas",
        "etiquetas": {
            "under-5": "Less than 5 years",
            "5-10": "5 years to less than 10",
            "10-15": "10 years to less than 15",
            "15-20": "15 years to less than 20",
            "20-plus": "20 years or more",
        },
        "tramos": [t(HOY, {"under-5": 2, "5-10": 4, "10-15": 6, "15-20": 8, "20-plus": 12}, F_JIS_LABOUR)],
    }
)
datos.append(num("jm.employee-notice-weeks", "Notice an employee must give", "semanas", [t(HOY, 2, F_JIS_LABOUR)]))
MOTIVO_RED = (
    "Seen only in employer and payroll guides. The Act and its Regulations sit on laws.moj.gov.jm, which is down for "
    "maintenance, and the Legal Information Portal needs a captcha. The Government summary (JIS) does not give the amounts."
)
datos.append(num("jm.redundancy-weeks-first-10", "Redundancy pay for each of the first 10 years", "semanas", [nv("2022-01-01", 2, MOTIVO_RED)]))
datos.append(num("jm.redundancy-weeks-after-10", "Redundancy pay for each year after 10", "semanas", [nv("2022-01-01", 3, MOTIVO_RED)]))
datos.append(num("jm.redundancy-qualifying-weeks", "Continuous employment needed for redundancy pay", "semanas", [nv("2022-01-01", 104, MOTIVO_RED)]))

# NHT.
datos.append(
    {
        "id": "jm.nht-interest-rates",
        "nombre": "NHT mortgage interest rate by weekly income",
        "tipo": "escala",
        "unidad": "JMD",
        "tramos": [
            t(
                HOY,
                [fila(0, 30001, 0), fila(30001, 42001, 2), fila(42001, 100001, 4), fila(100001, None, 5)],
                F_NHT_LOANS,
            )
        ],
    }
)
datos.append(num("jm.nht-max-years", "Longest NHT repayment period", "anios", [t(HOY, 40, F_NHT_LOANS)]))
datos.append(num("jm.nht-open-market-limit", "NHT open market loan limit for one applicant", "JMD", [t("2025-07-01", 9000000, F_NHT_LIMITS)]))

# Licencia de vehículos (Rates and Fees de TAJ, Motor Vehicle & Driver's Licence Related Fees).
ETQ_CC = {
    "up-1199": "Not exceeding 1199cc",
    "1200-2999": "Exceeding 1199cc but not exceeding 2999cc",
    "3000-3999": "Exceeding 2999cc but not exceeding 3999cc",
    "over-3999": "Exceeding 3999cc",
}
for meses, valores in [
    (6, {"up-1199": 4620, "1200-2999": 6300, "3000-3999": 14400, "over-3999": 21825}),
    (12, {"up-1199": 9240, "1200-2999": 12600, "3000-3999": 28800, "over-3999": 43650}),
    (24, {"up-1199": 18480, "1200-2999": 25200, "3000-3999": 57600, "over-3999": 87650}),
]:
    datos.append(
        {
            "id": f"jm.car-licence-{meses}m",
            "nombre": f"Motor car licence fee for {meses} months by engine size",
            "tipo": "mapa",
            "unidad": "JMD",
            "etiquetas": ETQ_CC,
            "tramos": [t(HOY, valores, F_FEES)],
        }
    )
datos.append(num("jm.fitness-fee-car", "Certificate of fitness fee for a private car", "JMD", [t(HOY, 4500, F_FEES)]))

salida = os.path.join(RAIZ, "src", "paises", "jm", "datos.json")
with open(salida, "w", encoding="utf-8", newline="\n") as fh:
    json.dump({"mercado": "jm", "datos": datos}, fh, ensure_ascii=False, indent=2)
    fh.write("\n")
print(len(datos), "datos en", salida)
