# Genera src/paises/lk/datos.json. Cada valor lleva la fuente donde se leyó.
# Uso: python scripts/paises/lk/generar_datos.py
import json
from pathlib import Path

HOY = "2026-10-26"
IRD = "https://www.ird.gov.lk/en/publications/"


def f(organismo, titulo, url, nota=None):
    d = {"organismo": organismo, "titulo": titulo, "url": url, "tipo": "primaria", "verificadoEl": HOY}
    if nota:
        d["nota"] = nota
    return d


APIT = f("Inland Revenue Department", "APIT Tax Table No. 01 (2025/2026): monthly tax deductions from regular profits from primary employment",
         IRD + "APIT_Tax_Tables/2025-2026/Table%20-%201/02.%20APIT_2526_Table_01_Text.pdf",
         "The summarized table gives each band as a percentage of monthly pay less a fixed relief. The fixed amount of each row here is that formula written from the start of the band.")
ACT_2025 = f("Inland Revenue Department", "Inland Revenue (Amendment) Act, No. 2 of 2025",
             IRD + "Acts_Income%20Tax_2017/IR_Act_No_02-2025_E.pdf")
CONS = f("Inland Revenue Department", "Consolidated text of the Inland Revenue Act, No. 24 of 2017 (amendments up to 31 March 2025)",
         IRD + "Acts_Income%20Tax_2017/IRA_Cons_Act_-_2025_Changes.pdf")
ACT_2026 = f("Inland Revenue Department", "Inland Revenue (Amendment) Act, No. 11 of 2026 (certified on 3 June 2026), section 36",
             IRD + "Acts_Income%20Tax_2017/IR_Act_No_11-2026_E.pdf",
             "Section 36 is not in the table of section 1(3), so it applies from the date the Bill became an Act: 3 June 2026.")
IT_PAGE = f("Inland Revenue Department", "Income Tax (IT): personal relief",
            "https://www.ird.gov.lk/en/Type%20of%20Taxes/SitePages/Income%20Tax.aspx?menuid=1201")
VAT_PAGE = f("Inland Revenue Department", "Value Added Tax (VAT): rates and registration threshold",
             "https://www.ird.gov.lk/en/Type%20of%20Taxes/SitePages/Value%20Added%20Tax%20(VAT).aspx?menuid=1204")
SSCL_PAGE = f("Inland Revenue Department", "Social Security Contribution Levy (SSCL): rate, liable turnover and threshold",
              "https://www.ird.gov.lk/en/Type%20of%20Taxes/SitePages/Social%20Security%20Contribution%20Levy%20(SSCL).aspx?menuid=1206")
EPF = f("Central Bank of Sri Lanka", "Employees' Provident Fund: contribution rates",
        "https://www.cbsl.gov.lk/en/employees-provident-fund")
ETF = f("Employees' Trust Fund Board", "Notice: mandatory electronic payment of ETF contributions (2026)",
        "https://etfb.lk/wp-content/uploads/2026/04/NOTICE-Mandatory-Electronic-Payment-English.pdf")
SALARIO = f("Department of Labour", "Notice on the National Minimum Wage of Workers (Amendment) Act, No. 11 of 2025",
            "https://labourdept.gov.lk/wp-content/uploads/2025/07/minimum-wages-ammend-2025-july.pdf")

SIN_LEY_LABORAL = ("Could not read the Act in an official source: labourdept.gov.lk serves empty pages, lawnet.gov.lk has a "
                   "certificate for another host and documents.gov.lk refuses the TLS connection. Seen only in payroll guides.")


def numero(id_, nombre, unidad, tramos, **extra):
    return {"id": id_, "nombre": nombre, "tipo": "numero", "unidad": unidad, **extra, "tramos": tramos}


def t(desde, valor, fuente, hasta=None):
    d = {"estado": "verificado", "desde": desde}
    if hasta:
        d["hasta"] = hasta
    d["valor"] = valor
    d["fuente"] = fuente
    return d


def nv(desde, valor, motivo):
    return {"estado": "no-verificado", "desde": desde, "valor": valor, "motivo": motivo}


def fila(desde, hasta, tasa, cuota=0):
    return {"desde": desde, "hasta": hasta, "tasa": tasa, "cuotaFija": cuota}


# Tabla 1: impuesto = tasa x sueldo - alivio. Escrito desde el inicio del tramo: cuota = tasa x desde - alivio.
def apit(desde, tasa, alivio):
    return round(tasa / 100 * desde - alivio, 2)


datos = [
    {
        "id": "lk.apit-table-1",
        "nombre": "APIT Tax Table No. 01: monthly regular profits from primary employment",
        "tipo": "escala",
        "unidad": "LKR",
        "proximaRevision": "2027-04-01",
        "tramos": [t("2025-04-01", [
            fila(0, 150000, 0),
            fila(150000, 233333, 6, apit(150000, 6, 9000)),
            fila(233333, 275000, 18, apit(233333, 18, 37000)),
            fila(275000, 316667, 24, apit(275000, 24, 53500)),
            fila(316667, 358333, 30, apit(316667, 30, 72500)),
            fila(358333, None, 36, apit(358333, 36, 94000)),
        ], APIT)],
    },
    {
        "id": "lk.income-tax-bands",
        "nombre": "Income tax rates for individuals on taxable income (after personal relief)",
        "tipo": "escala",
        "unidad": "LKR",
        "proximaRevision": "2027-04-01",
        "tramos": [t("2025-04-01", [
            fila(0, 1000000, 6, 0),
            fila(1000000, 1500000, 18, 60000),
            fila(1500000, 2000000, 24, 150000),
            fila(2000000, 2500000, 30, 270000),
            fila(2500000, None, 36, 420000),
        ], ACT_2025)],
    },
    numero("lk.personal-relief", "Personal relief for a year of assessment", "LKR",
           [t("2025-04-01", 1800000, IT_PAGE)], proximaRevision="2027-04-01"),
    {
        "id": "lk.terminal-benefits-bands",
        "nombre": "Tax rates on retiring gratuity, commuted pension, ETF at retirement and compensation for loss of employment",
        "tipo": "escala",
        "unidad": "LKR",
        "tramos": [t("2020-01-01", [
            fila(0, 10000000, 0, 0),
            fila(10000000, 20000000, 6, 0),
            fila(20000000, None, 12, 600000),
        ], CONS)],
    },
    numero("lk.cgt-rate", "Tax rate on gains from the realisation of investment assets (individuals)", "%", [
        t("2018-04-01", 10, CONS, "2026-06-02"),
        t("2026-06-03", 15, ACT_2026),
    ]),
    numero("lk.wht-interest", "Advance income tax withheld on interest or discount", "%",
           [t("2025-04-01", 10, ACT_2025)]),
    numero("lk.wht-dividend", "Advance income tax withheld on dividends", "%",
           [t("2022-12-19", 15, CONS)]),
    numero("lk.wht-rent", "Advance income tax withheld on rent paid to a resident when monthly rent exceeds the limit", "%",
           [t("2023-10-01", 10, CONS)]),
    numero("lk.wht-rent-limit", "Monthly rent up to which no advance income tax is withheld", "LKR",
           [t("2023-10-01", 100000, CONS)]),
    numero("lk.vat", "VAT standard rate", "%", [
        t("2022-09-01", 15, VAT_PAGE, "2023-12-31"),
        t("2024-01-01", 18, VAT_PAGE),
    ]),
    numero("lk.vat-threshold-year", "VAT registration threshold for 12 months", "LKR",
           [t("2024-01-01", 60000000, VAT_PAGE)]),
    numero("lk.vat-threshold-quarter", "VAT registration threshold for a quarter", "LKR",
           [t("2024-01-01", 15000000, VAT_PAGE)]),
    numero("lk.sscl-rate", "Social Security Contribution Levy rate", "%",
           [t("2022-10-01", 2.5, SSCL_PAGE)]),
    {
        "id": "lk.sscl-liable-share",
        "nombre": "Share of turnover liable to SSCL by activity",
        "tipo": "mapa",
        "unidad": "%",
        "etiquetas": {
            "import": "Importing goods",
            "manufacture": "Manufacturing goods",
            "service": "Providing a service (other than financial services and land)",
            "distributor": "Registered distributor of a Sri Lankan manufacturer",
            "trade": "Wholesale or retail sale",
        },
        "tramos": [t("2022-10-01", {"import": 100, "manufacture": 85, "service": 100, "distributor": 25, "trade": 50}, SSCL_PAGE)],
    },
    numero("lk.sscl-threshold-quarter", "SSCL threshold: turnover for a quarter", "LKR",
           [t("2024-01-01", 15000000, SSCL_PAGE)]),
    numero("lk.sscl-threshold-year", "SSCL threshold: turnover for four consecutive quarters", "LKR",
           [t("2024-01-01", 60000000, SSCL_PAGE)]),
    numero("lk.epf-employee", "EPF: minimum employee contribution", "%", [t("2024-01-01", 8, EPF)]),
    numero("lk.epf-employer", "EPF: minimum employer contribution", "%", [t("2024-01-01", 12, EPF)]),
    numero("lk.etf-employer", "ETF: employer contribution", "%", [t("2024-01-01", 3, ETF)]),
    numero("lk.minimum-wage-monthly", "National minimum monthly wage", "LKR", [
        t("2025-04-01", 27000, SALARIO, "2025-12-31"),
        t("2026-01-01", 30000, SALARIO),
    ], proximaRevision="2027-01-01"),
    numero("lk.minimum-wage-daily", "National minimum daily wage", "LKR", [
        t("2025-04-01", 1080, SALARIO, "2025-12-31"),
        t("2026-01-01", 1200, SALARIO),
    ], proximaRevision="2027-01-01"),
    numero("lk.gratuity-months-per-year", "Gratuity: months of salary for each completed year of service", "factor",
           [nv("2024-01-01", 0.5, "Payment of Gratuity Act, No. 12 of 1983, section 6. " + SIN_LEY_LABORAL)]),
    numero("lk.gratuity-min-years", "Gratuity: completed years of service needed", "anios",
           [nv("2024-01-01", 5, "Payment of Gratuity Act, No. 12 of 1983, section 5. " + SIN_LEY_LABORAL)]),
    numero("lk.overtime-factor", "Overtime: multiple of the normal hourly rate", "factor",
           [nv("2024-01-01", 1.5, "Shop and Office Employees Act, No. 19 of 1954, section 3. " + SIN_LEY_LABORAL)]),
    numero("lk.overtime-monthly-divisor", "Overtime: hours a monthly salary is divided by to get the hourly rate", "horas",
           [nv("2024-01-01", 240, "Shop and Office Employees regulations. " + SIN_LEY_LABORAL)]),
]

salida = Path(__file__).resolve().parents[3] / "src" / "paises" / "lk" / "datos.json"
with open(salida, "w", encoding="utf-8", newline="\n") as fh:
    json.dump({"mercado": "lk", "datos": datos}, fh, ensure_ascii=False, indent=2)
    fh.write("\n")
print(salida)
