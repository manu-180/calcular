# Genera src/paises/zm/datos.json con los valores leídos en las fuentes primarias (2026-10-26).
# Correr desde la raíz del repo: python scripts/paises/zm/gen_datos.py
import json

HOY = "2026-10-26"
ZRA = "Zambia Revenue Authority"
ZRA_UP = "https://www.zra.org.zm/wp-content/uploads/2026/06/"


def fuente(organismo, titulo, url, nota=None):
    f = {"organismo": organismo, "titulo": titulo, "url": url, "tipo": "primaria", "verificadoEl": HOY}
    if nota:
        f["nota"] = nota
    return f


F_PAYE = fuente(ZRA, "Pay As You Earn (PAYE) leaflet: example calculation with the 2026 tax bands", ZRA_UP + "PAYE.pdf")
F_TOT = fuente(ZRA, "Turnover Tax leaflet: rates and example for January 2026", ZRA_UP + "Turnover-Tax.pdf")
F_RENT = fuente(ZRA, "Rental Income Tax leaflet: rates, monthly bands and 2026 examples", ZRA_UP + "Rental-Income-Tax.pdf")
F_PTT = fuente(ZRA, "Property Transfer Tax leaflet: applicable rates", ZRA_UP + "Property-Transfer.pdf")
F_MMTL = fuente(ZRA, "Mobile Money Transaction Levy leaflet: chargeable rates", ZRA_UP + "Mobile-Money-Transaction-Levy.pdf")
F_VAT = fuente(ZRA, "Introduction to Value Added Tax leaflet", ZRA_UP + "Introduction-to-VAT.pdf")
F_SDL = fuente(ZRA, "Skills Development Levy leaflet", "https://www.zra.org.zm/wp-content/uploads/2023/06/Skills-Development-Levy.pdf")
F_PRES = fuente(ZRA, "Tax information: Presumptive Tax for public service vehicles", "https://www.zra.org.zm/tax-information/")
F_ZRA_CALC = fuente(ZRA, "ZRA PAYE calculator (NAPSA line)", "https://www.zra.org.zm/paye-calculator/")
F_NHIMA = fuente(
    "National Health Insurance Management Authority",
    "NHIMA FAQs, question 29: how are premiums calculated?",
    "https://nhima.co.zm/elementor-1783/",
)
F_ECA = fuente(
    "Ministry of Labour and Social Security",
    "The Employment Code Act, No. 3 of 2019",
    "https://www.mlss.gov.zm/wp-content/uploads/2023/07/The-Employment-Code-Act-No.-3-of-2019.pdf",
)
F_SI48 = fuente(
    "Ministry of Labour and Social Security",
    "Statutory Instrument No. 48 of 2023: Employment Code (Minimum Wages and Conditions of Employment) (General) Order, 2023",
    "https://www.mlss.gov.zm/wp-content/uploads/2023/12/IS-NO.48.pdf",
)

ECA_DESDE = "2019-04-11"
SI48_DESDE = "2024-01-01"


def numero(id_, nombre, unidad, valor, fuente_, desde, **extra):
    d = {"id": id_, "nombre": nombre, "tipo": "numero", "unidad": unidad}
    d.update(extra)
    d["tramos"] = [{"estado": "verificado", "desde": desde, "valor": valor, "fuente": fuente_}]
    return d


def mapa(id_, nombre, unidad, valor, etiquetas, fuente_, desde):
    return {
        "id": id_,
        "nombre": nombre,
        "tipo": "mapa",
        "unidad": unidad,
        "etiquetas": etiquetas,
        "tramos": [{"estado": "verificado", "desde": desde, "valor": valor, "fuente": fuente_}],
    }


def escala(id_, nombre, unidad, filas, fuente_, desde):
    valor = [{"desde": a, "hasta": b, "tasa": t, **({"cuotaFija": c} if c is not None else {})} for a, b, t, c in filas]
    return {
        "id": id_,
        "nombre": nombre,
        "tipo": "escala",
        "unidad": unidad,
        "tramos": [{"estado": "verificado", "desde": desde, "valor": valor, "fuente": fuente_}],
    }


CATEGORIAS = {
    "cat1": "Category I: general worker, cleaner, helper, office orderly, service station attendant",
    "cat2": "Category II: security guard",
    "cat3": "Category III: assistant sales person, packer, book binder, printer",
    "cat4": "Category IV: driver, pump attendant, craft certificate holder",
    "cat5": "Category V: typist, receptionist, telephonist",
    "cat6": "Category VI: sales person",
    "cat7": "Category VII: qualified clerk, machine operator",
}

datos = [
    escala(
        "zm.paye-bands",
        "Monthly PAYE tax bands",
        "ZMW",
        [(0, 5100, 0, None), (5100, 7100, 20, None), (7100, 9200, 30, None), (9200, None, 37, None)],
        F_PAYE,
        "2026-01-01",
    ),
    numero("zm.napsa-rate", "NAPSA employee contribution rate", "%", 5, F_ZRA_CALC, "2026-01-01"),
    {
        "id": "zm.napsa-ceiling",
        "nombre": "NAPSA monthly earnings ceiling",
        "tipo": "numero",
        "unidad": "ZMW",
        "proximaRevision": "2027-01-01",
        "tramos": [
            {
                "estado": "no-verificado",
                "desde": "2026-01-01",
                "valor": 37236,
                "motivo": "Only seen in payroll vendor notices (Sage, PaySpace, Workpay). napsa.co.zm sits behind an Incapsula wall that blocks every request from our environment, including the Web Archive copies, and the ZRA PAYE calculator still uses an older ceiling.",
            }
        ],
    },
    numero("zm.nhima-rate", "NHIMA contribution rate (employee and employer, each)", "%", 1, F_NHIMA, "2026-01-01"),
    numero("zm.sdl-rate", "Skills Development Levy rate", "%", 0.5, F_SDL, "2017-01-01"),
    numero("zm.vat", "VAT standard rate", "%", 16, F_VAT, "2026-01-01"),
    numero("zm.vat-threshold", "VAT registration threshold a year", "ZMW", 800000, F_VAT, "2026-01-01"),
    numero("zm.tot-rate", "Turnover tax rate", "%", 5, F_TOT, "2026-01-01"),
    numero("zm.tot-exempt-monthly", "Turnover taxed at 0% each month", "ZMW", 2500, F_TOT, "2026-01-01"),
    numero("zm.tot-limit", "Turnover tax limit a year", "ZMW", 5000000, F_TOT, "2026-01-01"),
    escala(
        "zm.rental-bands-monthly",
        "Monthly rental income tax bands",
        "ZMW",
        [(0, 2500, 0, None), (2500, 66666.67, 4, None), (66666.67, None, 16, None)],
        F_RENT,
        "2026-01-01",
    ),
    escala(
        "zm.rental-bands-annual",
        "Annual rental income tax bands",
        "ZMW",
        [(0, 30000, 0, None), (30000, 800000, 4, None), (800000, None, 16, None)],
        F_RENT,
        "2026-01-01",
    ),
    mapa(
        "zm.ptt-rates",
        "Property transfer tax rates",
        "%",
        {"land": 8, "shares": 8, "ip": 8, "mining-licence": 10, "exploration-licence": 8, "processing-licence": 10},
        {
            "land": "Land, buildings and improvements",
            "shares": "Shares",
            "ip": "Intellectual property",
            "mining-licence": "Mining right for a mining licence",
            "exploration-licence": "Mining right for an exploration licence",
            "processing-licence": "Mineral processing licence",
        },
        F_PTT,
        "2026-01-01",
    ),
    escala(
        "zm.mmtl-bands",
        "Mobile money transaction levy per transaction",
        "ZMW",
        [
            (0, 150, 0, 0.32),
            (150, 300, 0, 0.40),
            (300, 500, 0, 0.80),
            (500, 1000, 0, 2),
            (1000, 3000, 0, 4),
            (3000, 5000, 0, 7.5),
            (5000, 10000, 0, 8),
            (10000, None, 0, 10),
        ],
        F_MMTL,
        "2026-01-01",
    ),
    mapa(
        "zm.presumptive-tax",
        "Presumptive tax a year per public service vehicle",
        "ZMW",
        {"36-49": 10368, "22-35": 7776, "18-21": 5184, "12-17": 2592, "under-12": 1296},
        {
            "36-49": "36 to 49 seats",
            "22-35": "22 to 35 seats",
            "18-21": "18 to 21 seats",
            "12-17": "12 to 17 seats",
            "under-12": "Fewer than 12 seats, taxis included",
        },
        F_PRES,
        "2026-01-01",
    ),
    mapa(
        "zm.minimum-wage-monthly",
        "Minimum basic pay a month by category",
        "ZMW",
        {"cat1": 1487, "cat2": 1487, "cat3": 1801.98, "cat4": 2119.23, "cat5": 2296.89, "cat6": 2680.92, "cat7": 2861.36},
        CATEGORIAS,
        F_SI48,
        SI48_DESDE,
    ),
    mapa(
        "zm.minimum-wage-hourly",
        "Minimum basic pay an hour by category",
        "ZMW",
        {"cat1": 7.15, "cat2": 7.15, "cat3": 8.66, "cat4": 10.19, "cat5": 11.04, "cat6": 12.89, "cat7": 13.76},
        CATEGORIAS,
        F_SI48,
        SI48_DESDE,
    ),
    numero("zm.transport-allowance", "Minimum transport allowance a month", "ZMW", 200, F_SI48, SI48_DESDE),
    numero("zm.lunch-allowance", "Minimum lunch allowance a month", "ZMW", 180, F_SI48, SI48_DESDE),
    numero("zm.housing-allowance-rate", "Minimum housing allowance (share of basic pay)", "%", 30, F_SI48, SI48_DESDE),
    numero("zm.night-differential", "Night shift differential (18:00 to 06:00)", "%", 15, F_SI48, SI48_DESDE),
    numero("zm.leave-days-per-month", "Annual leave earned per month", "dias", 2, F_ECA, ECA_DESDE),
    numero("zm.leave-pay-divisor", "Working days that divide full pay in the leave formula", "dias", 26, F_ECA, ECA_DESDE),
    numero("zm.weekly-hours", "Hours a week before overtime", "horas", 48, F_ECA, ECA_DESDE),
    numero("zm.guard-weekly-hours", "Hours a week before overtime for a watchperson or guard", "horas", 60, F_ECA, ECA_DESDE),
    numero("zm.overtime-factor", "Overtime rate", "factor", 1.5, F_ECA, ECA_DESDE),
    numero("zm.rest-day-factor", "Rate for a public holiday or weekly rest day", "factor", 2, F_ECA, ECA_DESDE),
    numero("zm.hourly-divisor", "Hours that divide monthly basic pay", "horas", 208, F_ECA, ECA_DESDE),
    numero("zm.guard-hourly-divisor", "Hours that divide monthly basic pay for a watchperson or guard", "horas", 240, F_ECA, ECA_DESDE),
    numero("zm.gratuity-rate", "Minimum gratuity on a long-term contract", "%", 25, F_ECA, ECA_DESDE),
    numero("zm.redundancy-months", "Months of basic pay per year served on redundancy or death in service", "meses", 2, F_ECA, ECA_DESDE),
    numero("zm.medical-discharge-months", "Months of basic pay per completed year on medical discharge", "meses", 3, F_ECA, ECA_DESDE),
    numero("zm.maternity-weeks", "Maternity leave", "semanas", 14, F_ECA, ECA_DESDE),
    numero("zm.maternity-multiple-weeks", "Extra maternity leave for a multiple birth", "semanas", 4, F_ECA, ECA_DESDE),
    numero("zm.maternity-after-birth-weeks", "Maternity leave that must follow the birth", "semanas", 6, F_ECA, ECA_DESDE),
    numero("zm.paternity-days", "Paternity leave", "dias", 5, F_ECA, ECA_DESDE),
    numero("zm.sick-days-short", "Sick leave days on full pay, then on half pay (short-term contract)", "dias", 26, F_ECA, ECA_DESDE),
    numero("zm.sick-months-long", "Sick leave months on full pay, then on half pay (long-term contract)", "meses", 3, F_ECA, ECA_DESDE),
    numero("zm.notice-days-short", "Notice for a contract of more than one month and up to three months", "dias", 14, F_ECA, ECA_DESDE),
    numero("zm.notice-days-long", "Notice for a contract of more than three months", "dias", 30, F_ECA, ECA_DESDE),
]

doc = {"mercado": "zm", "datos": datos}
with open("src/paises/zm/datos.json", "w", encoding="utf-8", newline="\n") as f:
    json.dump(doc, f, ensure_ascii=False, indent=2)
    f.write("\n")
print(len(datos), "datos")
