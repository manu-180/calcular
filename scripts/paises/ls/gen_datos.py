# Genera src/paises/ls/datos.json. Todos los valores se leyeron el 2026-10-27 en fuente primaria.
#   python -I scripts/paises/ls/gen_datos.py
import json

HOY = "2026-10-27"
RSL = "Revenue Services Lesotho"


def f(org, titulo, url, nota=None):
    d = {"organismo": org, "titulo": titulo, "url": url, "tipo": "primaria", "verificadoEl": HOY}
    if nota:
        d["nota"] = nota
    return d


EST_2627 = f(RSL, "Income Tax Structure for the period starting 1 April 2026 (Legal Notice No. 24 of 2026)",
             "https://www.rsl.org.ls/sites/default/files/2026-09/2026%20-2027%20Income%20Tax%20structure%201.pdf")
EST_2526 = f(RSL, "Income Tax Structure for the period starting 1 April 2025 (Legal Notice No. 50 of 2025)",
             "https://www.rsl.org.ls/sites/default/files/2026-09/2025-2026%20Income%20Tax%20structure.pdf")
ITA_URL = "https://www.rsl.org.ls/sites/default/files/2026-09/Income%20Tax%20Act%201993%20%20Updated%20up%20to%201%20April%202012.pdf"
TASAS = f(RSL, "Tax Rates", "https://www.rsl.org.ls/tax-rates")
LA_URL = "https://www.rsl.org.ls/sites/default/files/2024-06/LABOUR%20ACT%20N0.3%20OF%202024.pdf"
LA_NOTA = "Copia del Gazette Extraordinary Vol. 69 No. 22 publicada por RSL. La Ley rige desde su publicación, el 2 de abril de 2024."


def ita(seccion, nota=None):
    return f(RSL, f"Income Tax Act No. 9 of 1993 (consolidated to 1 April 2012), {seccion}", ITA_URL, nota)


def la(seccion):
    return f(RSL, f"Labour Act No. 3 of 2024, {seccion}", LA_URL, LA_NOTA)


def numero(id, nombre, unidad, desde, valor, fuente, **extra):
    d = {"id": id, "nombre": nombre, "tipo": "numero", "unidad": unidad}
    d.update(extra)
    d["tramos"] = [{"estado": "verificado", "desde": desde, "valor": valor, "fuente": fuente}]
    return d


def mapa(id, nombre, unidad, desde, valor, etiquetas, fuente):
    return {"id": id, "nombre": nombre, "tipo": "mapa", "unidad": unidad, "etiquetas": etiquetas,
            "tramos": [{"estado": "verificado", "desde": desde, "valor": valor, "fuente": fuente}]}


datos = [
    {
        "id": "ls.income-tax-bands",
        "nombre": "Income tax rates for resident individuals (yearly chargeable income)",
        "tipo": "escala",
        "unidad": "LSL",
        "proximaRevision": "2027-04-01",
        "tramos": [
            {"estado": "verificado", "desde": "2025-04-01", "hasta": "2026-03-31",
             "valor": [{"desde": 0, "hasta": 74040, "tasa": 20}, {"desde": 74040, "hasta": None, "tasa": 30}],
             "fuente": EST_2526},
            {"estado": "verificado", "desde": "2026-04-01",
             "valor": [{"desde": 0, "hasta": 77760, "tasa": 20}, {"desde": 77760, "hasta": None, "tasa": 30}],
             "fuente": EST_2627},
        ],
    },
    {
        "id": "ls.tax-credit",
        "nombre": "Non-refundable tax credit for resident individuals (a year)",
        "tipo": "numero",
        "unidad": "LSL",
        "proximaRevision": "2027-04-01",
        "tramos": [
            {"estado": "verificado", "desde": "2025-04-01", "hasta": "2026-03-31", "valor": 11640, "fuente": EST_2526},
            {"estado": "verificado", "desde": "2026-04-01", "valor": 12240, "fuente": EST_2627},
        ],
    },
    numero("ls.superannuation-cap", "Cap on deductible contributions to an employer superannuation fund", "%", "2025-04-01", 20,
           ita("section 95(3)", "Empleado y empleador juntos hasta el 20 % del ingreso laboral; primero cuenta lo del empleado (s. 95(4)).")),
    mapa("ls.vat-rates", "VAT rates", "%", "2026-04-01",
         {"standard": 15, "electricity": 10, "zero": 0},
         {"standard": "Standard rate (most goods and services, telecommunications)", "electricity": "Electricity",
          "zero": "Zero-rated (exports and basic commodities)"}, TASAS),
    numero("ls.standard-rate", "Standard rate of tax", "%", "2025-04-01", 25,
           ita("sections 2 and 99(1)",
               "Sección 2: «standard rate of tax» = 25 %. Sección 99(1): los pagos únicos de un fondo de pensión que cumple "
               "las condiciones tributan a esa tasa salvo que se elija sumarlos al ingreso. La página Pay As You Earn de RSL "
               "repite «standard rate 25%».")),
    mapa("ls.company-tax-rates", "Company income tax rates", "%", "2026-04-01",
         {"other": 25, "manufacturing": 10, "farming": 10},
         {"other": "Other companies", "manufacturing": "Manufacturing company", "farming": "Commercial farming"}, TASAS),
    mapa("ls.withholding-rates", "Withholding tax rates on contract payments", "%", "2026-04-01",
         {"resident-contractor": 5, "non-resident-contractor": 10, "technical-rsa": 7.5},
         {"resident-contractor": "Resident contractor", "non-resident-contractor": "Non-resident contractor",
          "technical-rsa": "Non-resident technical services (South Africa)"}, TASAS),
    numero("ls.fbt-rate", "Fringe benefits tax rate", "%", "2026-04-01", 40,
           f(RSL, "Tax Rates (Fringe Benefit Tax)", TASAS["url"],
             "La página Tax Rates dice 40 %. La fórmula A × 1/(1 − B) sale de la sección 117 de la Income Tax Act.")),
    numero("ls.car-benefit-rate", "Car fringe benefit: share of the car's market value a year", "%", "2026-04-01", 15,
           ita("section 119(2)")),
    numero("ls.housing-benefit-cap", "Housing fringe benefit cap (share of yearly remuneration)", "%", "2026-04-01", 20,
           ita("section 120(3)")),
    mapa("ls.pay-multipliers", "Minimum pay multipliers", "factor", "2024-04-02",
         {"overtime": 1.25, "rest-day": 2, "public-holiday": 2},
         {"overtime": "Overtime", "rest-day": "Work on your weekly rest day", "public-holiday": "Work on a public holiday"},
         la("sections 185 and 186")),
    mapa("ls.hours-divisor", "Hours used to turn wages into an hourly rate", "horas", "2024-04-02",
         {"monthly": 195, "weekly": 45, "monthly-watchman": 260, "weekly-watchman": 60},
         {"monthly": "Monthly contract", "weekly": "Weekly contract", "monthly-watchman": "Watchman or security guard, monthly",
          "weekly-watchman": "Watchman or security guard, weekly"},
         la("section 187")),
    mapa("ls.daily-hours", "Normal hours of work on a full day", "horas", "2024-04-02",
         {"five-day": 9, "six-day": 8},
         {"five-day": "Five-day week", "six-day": "Six-day week"},
         la("section 186(1)")),
    numero("ls.leave-days-per-month", "Annual leave earned per month of continuous employment", "dias", "2024-04-02", 1,
           la("section 188(1)")),
    numero("ls.leave-minimum-days", "Minimum annual leave a year (working days)", "dias", "2024-04-02", 12,
           la("section 188(1)")),
    numero("ls.leave-pay-minimum-months", "Months of service needed to be paid for untaken leave on termination", "meses", "2024-04-02", 3,
           la("section 188(4)")),
    mapa("ls.sick-leave", "Paid sick leave", "dias", "2024-04-02",
         {"full-pay-second-half": 12, "full-pay-yearly": 12, "half-pay-yearly": 24},
         {"full-pay-second-half": "Full pay, months 7 to 12", "full-pay-yearly": "Full pay, each year after 12 months",
          "half-pay-yearly": "Half pay, each year after 12 months"},
         la("section 190")),
    mapa("ls.notice-weeks", "Notice period for short service (weeks)", "semanas", "2024-04-02",
         {"under-6-months": 1, "6-to-12-months": 2},
         {"under-6-months": "Less than six months", "6-to-12-months": "Six months to under a year"},
         la("section 130(1)")),
    numero("ls.notice-months", "Notice period after one year or more of service", "meses", "2024-04-02", 1,
           la("section 130(1)(a)")),
    numero("ls.severance-weeks", "Severance pay: weeks of wages for each completed year", "semanas", "2024-04-02", 2,
           la("section 136")),
    mapa("ls.maternity-weeks", "Maternity leave around confinement (weeks)", "semanas", "2024-04-02",
         {"before": 7, "after": 7, "after-illness": 8, "stillbirth": 3},
         {"before": "Before the expected date", "after": "After the birth", "after-illness": "After the birth, if unfit from illness",
          "stillbirth": "Stillbirth"},
         la("section 191")),
    numero("ls.paternity-days", "Paternity leave", "dias", "2024-04-02", 14, la("section 191(8)")),
    numero("ls.nursing-months", "Months of paid nursing time after returning to work", "meses", "2024-04-02", 6,
           la("section 192(1)")),
]

with open("src/paises/ls/datos.json", "w", encoding="utf-8", newline="\n") as fh:
    json.dump({"mercado": "ls", "datos": datos}, fh, ensure_ascii=False, indent=2)
    fh.write("\n")
print(len(datos), "datos")
