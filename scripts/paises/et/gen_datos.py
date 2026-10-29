# Genera src/paises/et/datos.json. Cada valor se leyó en la fuente primaria que lo acompaña.
# Uso: python -I scripts/paises/et/gen_datos.py
import json
import pathlib

HOY = "2026-10-27"

P1395 = {
    "organismo": "Federal Negarit Gazette (Ministry of Revenue)",
    "titulo": "Income Tax (Amendment) Proclamation No. 1395/2025, Federal Negarit Gazette No. 64, 1 September 2025",
    "url": "https://www.mor.gov.et/DomesticProclamations/1786970364007-582645424-pdf-%C3%A1%C2%8A%C2%A0%C3%A1%C2%8B%C2%8B%C3%A1%C2%8C%C2%85-%C3%A1%C2%89%C2%81%C3%A1%C2%8C%C2%A5%C3%A1%C2%88%C2%AD-1395-2017.pdf",
}
P1341 = {
    "organismo": "Federal Negarit Gazette (Ministry of Revenue)",
    "titulo": "Value Added Tax Proclamation No. 1341/2024, Federal Negarit Gazette No. 61, 21 August 2024",
    "url": "https://www.mor.gov.et/DomesticProclamations/1755160957456-480715100-pdf-%C3%A1%C2%8A%C2%A0%C3%A1%C2%8B%C2%8B%C3%A1%C2%8C%C2%85-%C3%A1%C2%89%C2%81%C3%A1%C2%8C%C2%A5%C3%A1%C2%88%C2%AD-341-2016.pdf",
}
P1156 = {
    "organismo": "Federal Negarit Gazette (FAOLEX copy)",
    "titulo": "Labour Proclamation No. 1156/2019, Federal Negarit Gazette No. 89, 5 September 2019",
    "url": "https://faolex.fao.org/docs/pdf/eth204430.pdf",
}
POESSA = {
    "organismo": "Private Organizations Employees Social Security Administration (POESSA)",
    "titulo": "Pension: contributions and service pension (Proclamation 1268/2014 E.C.)",
    "url": "https://www.poessa.gov.et/?page_id=443",
}

INGRESO_2025 = "2025-07-08"  # Art. 4(3) de la 1395/2025: rige para ingresos desde el 8 de julio de 2025
RETENCION_2025 = "2025-08-07"  # Art. 4(2): retención del Art. 97 desde el 7 de agosto de 2025
IVA_2024 = "2024-08-21"
TRABAJO_2019 = "2019-09-05"
APORTES = "2025-07-08"  # la página de POESSA no da fecha de inicio: solo afirmamos el año fiscal en curso


def fuente(base, detalle):
    return {**base, "titulo": f"{base['titulo']}, {detalle}", "tipo": "primaria", "verificadoEl": HOY}


def numero(id_, nombre, unidad, valor, desde, base, detalle, **extra):
    return {
        "id": f"et.{id_}",
        "nombre": nombre,
        "tipo": "numero",
        "unidad": unidad,
        **extra,
        "tramos": [{"estado": "verificado", "desde": desde, "valor": valor, "fuente": fuente(base, detalle)}],
    }


def escala(id_, nombre, limites, tasas, desde, base, detalle):
    filas = []
    for i, tasa in enumerate(tasas):
        filas.append({"desde": 0 if i == 0 else limites[i - 1], "hasta": limites[i] if i < len(limites) else None, "tasa": tasa})
    return {
        "id": f"et.{id_}",
        "nombre": nombre,
        "tipo": "escala",
        "unidad": "ETB",
        "tramos": [{"estado": "verificado", "desde": desde, "valor": filas, "fuente": fuente(base, detalle)}],
    }


TASAS = [0, 15, 20, 25, 30, 35]

datos = [
    escala("employment-income-tax", "Monthly employment income tax (Schedule A)", [2000, 4000, 7000, 10000, 14000], TASAS, INGRESO_2025, P1395, "Article 1(6), new Article 11"),
    escala("rental-income-tax", "Annual rental income tax for individuals (Schedule B)", [24000, 48000, 84000, 120000, 168000], TASAS, INGRESO_2025, P1395, "Article 1(8), new Article 14(2)"),
    escala("business-income-tax", "Annual business income tax for individuals (Schedule C)", [24000, 48000, 84000, 120000, 168000], TASAS, INGRESO_2025, P1395, "Article 1(10), new Article 19(2)"),
    numero("dividend-tax", "Tax on dividends paid to a resident", "%", 15, INGRESO_2025, P1395, "new Article 57(1)"),
    numero("interest-tax", "Tax on interest earned by a resident", "%", 10, INGRESO_2025, P1395, "new Article 58(1)"),
    numero("royalty-tax", "Tax on royalties earned by a resident", "%", 10, INGRESO_2025, P1395, "new Article 56(1)(a)"),
    numero("royalty-art-tax", "Tax on royalties from art and culture", "%", 5, INGRESO_2025, P1395, "new Article 56(1)(b)"),
    numero("winnings-tax", "Tax on winnings from games of chance", "%", 20, INGRESO_2025, P1395, "new Article 59(1)"),
    numero("withholding-rate", "Withholding tax on supplies of goods and services", "%", 3, RETENCION_2025, P1395, "Article 1(36), new Article 97(1)"),
    numero("withholding-goods-threshold", "Withholding threshold for goods (one transaction or contract)", "ETB", 20000, RETENCION_2025, P1395, "new Article 97(1)(a)"),
    numero("withholding-services-threshold", "Withholding threshold for services (one contract)", "ETB", 10000, RETENCION_2025, P1395, "new Article 97(1)(b)"),
    numero("withholding-no-tin-rate", "Withholding rate when the supplier gives no TIN or business licence", "%", 30, RETENCION_2025, P1395, "Article 1(37), new Article 97(4)"),
    numero("vat", "VAT standard rate", "%", 15, IVA_2024, P1341, "Article 8(2)(b)"),
    numero("vat-threshold", "VAT registration threshold (12 months of taxable supplies)", "ETB", 2000000, IVA_2024, P1341, "Article 12(2)"),
    numero("pension-employee", "Employee pension contribution (private sector)", "%", 7, APORTES, POESSA, "section 2"),
    numero("pension-employer", "Employer pension contribution (private sector)", "%", 11, APORTES, POESSA, "section 2"),
    numero("pension-base-rate", "Service pension for the first 10 years of service", "%", 30, APORTES, POESSA, "worked example of the service pension"),
    numero("pension-yearly-rate", "Service pension for each year after the first 10", "%", 1.25, APORTES, POESSA, "worked example of the service pension"),
    numero("pension-min-years", "Minimum service for a service pension", "anios", 10, APORTES, POESSA, "conditions for a service pension"),
    numero("retirement-age", "Retirement age", "anios", 60, APORTES, POESSA, "conditions for a service pension"),
    numero("pension-salary-months", "Months of salary averaged for the pension", "meses", 36, APORTES, POESSA, "worked example of the service pension"),
    {
        "id": "et.overtime-rates",
        "nombre": "Overtime pay multipliers",
        "tipo": "mapa",
        "unidad": "factor",
        "etiquetas": {
            "day": "Overtime between 6 a.m. and 10 p.m.",
            "night": "Overtime between 10 p.m. and 6 a.m.",
            "rest-day": "Work on your weekly rest day",
            "holiday": "Overtime on a public holiday",
        },
        "tramos": [{"estado": "verificado", "desde": TRABAJO_2019, "valor": {"day": 1.5, "night": 1.75, "rest-day": 2, "holiday": 2.5}, "fuente": fuente(P1156, "Article 68(1)")}],
    },
    numero("holiday-pay-rate", "Pay for each hour worked on a public holiday", "factor", 2, TRABAJO_2019, P1156, "Article 75(1)"),
    numero("weekly-hours", "Maximum normal hours a week", "horas", 48, TRABAJO_2019, P1156, "Article 61(2)"),
    numero("daily-hours", "Maximum normal hours a day", "horas", 8, TRABAJO_2019, P1156, "Article 61(2)"),
    numero("overtime-daily-cap", "Maximum overtime a day", "horas", 4, TRABAJO_2019, P1156, "Article 67(2)"),
    numero("overtime-weekly-cap", "Maximum overtime a week", "horas", 12, TRABAJO_2019, P1156, "Article 67(2)"),
    numero("annual-leave-base", "Annual leave for the first year of service", "dias", 16, TRABAJO_2019, P1156, "Article 77(1)(a)"),
    numero("annual-leave-step", "Years of service for each extra day of annual leave", "anios", 2, TRABAJO_2019, P1156, "Article 77(1)(b)"),
    numero("days-in-month", "Days of service counted as one month for leave", "dias", 26, TRABAJO_2019, P1156, "Article 77(3)"),
    numero("severance-first-year", "Severance pay for the first year of service", "dias", 30, TRABAJO_2019, P1156, "Article 40(2)"),
    numero("severance-extra-share", "Severance increase for each additional year (share of the first-year amount)", "factor", 1 / 3, TRABAJO_2019, P1156, "Article 40(3)"),
    numero("severance-cap", "Severance pay cap", "meses", 12, TRABAJO_2019, P1156, "Article 40(3)"),
    numero("severance-closure-extra", "Extra pay on closure or reduction of workforce", "dias", 60, TRABAJO_2019, P1156, "Article 40(4)"),
    numero("compensation-no-notice", "Compensation when the worker leaves under Article 32(1)", "dias", 30, TRABAJO_2019, P1156, "Article 41(1)"),
    numero("compensation-harassment", "Compensation when the worker leaves under Article 32(1)(b)", "dias", 90, TRABAJO_2019, P1156, "Article 41(2)"),
    numero("severance-min-years-resign", "Service needed for severance on resignation, sickness or death", "anios", 5, TRABAJO_2019, P1156, "Article 39(1)(h)"),
    numero("notice-first-year", "Employer notice: service up to one year", "meses", 1, TRABAJO_2019, P1156, "Article 35(1)(a)"),
    numero("notice-up-to-nine", "Employer notice: more than one and up to nine years", "meses", 2, TRABAJO_2019, P1156, "Article 35(1)(b)"),
    numero("notice-over-nine", "Employer notice: more than nine years", "meses", 3, TRABAJO_2019, P1156, "Article 35(1)(c)"),
    numero("notice-redundancy", "Employer notice: reduction of workforce", "meses", 2, TRABAJO_2019, P1156, "Article 35(1)(d)"),
    numero("probation-days", "Maximum probation period", "dias", 60, TRABAJO_2019, P1156, "Article 11(3)"),
    numero("sick-full-months", "Sick leave on full pay", "meses", 1, TRABAJO_2019, P1156, "Article 86(1)"),
    numero("sick-half-months", "Sick leave on half pay", "meses", 2, TRABAJO_2019, P1156, "Article 86(2)"),
    numero("sick-half-rate", "Pay during the half-pay months of sick leave", "%", 50, TRABAJO_2019, P1156, "Article 86(2)"),
    numero("sick-unpaid-months", "Sick leave without pay", "meses", 3, TRABAJO_2019, P1156, "Article 86(3)"),
    numero("maternity-prenatal", "Paid prenatal leave", "dias", 30, TRABAJO_2019, P1156, "Article 88(3)"),
    numero("maternity-postnatal", "Paid postnatal leave", "dias", 90, TRABAJO_2019, P1156, "Article 88(3)"),
    numero("paternity-leave", "Paid paternity leave", "dias", 3, TRABAJO_2019, P1156, "Article 81(2)"),
]

salida = pathlib.Path(__file__).resolve().parents[3] / "src" / "paises" / "et" / "datos.json"
with open(salida, "w", encoding="utf-8", newline="\n") as f:
    json.dump({"mercado": "et", "datos": datos}, f, ensure_ascii=False, indent=2)
    f.write("\n")
print(f"{len(datos)} datos -> {salida}")
