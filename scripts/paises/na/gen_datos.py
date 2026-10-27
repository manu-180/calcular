import json
HOY = "2026-10-27"
GZ = "https://archive.gazettes.africa/archive/na/"
SALIDA = r"C:/MisProyectos/Armagedon/calcular-pais-na/src/paises/na/datos.json"


def f(org, tit, url, nota=None):
    d = {"organismo": org, "titulo": tit, "url": url, "tipo": "primaria", "verificadoEl": HOY}
    if nota:
        d["nota"] = nota
    return d


GG = "Government Gazette of the Republic of Namibia"
LA_URL = GZ + "2007/na-government-gazette-dated-2007-12-31-no-3971.pdf"


def la(sec):
    return f(GG, f"Labour Act, 2007 (Act No. 11 of 2007), {sec}, Government Gazette No. 3971", LA_URL)


ITA = f(GG, "Income Tax Amendment Act, 2024 (Act No. 4 of 2024), Schedule 4 paragraph 1, Government Gazette No. 8442",
        GZ + "2024/na-government-gazette-dated-2024-09-16-no-8442.pdf",
        "Applies from the year of assessment starting 1 March 2024. No later amendment to the rates was gazetted up to 16 October 2026. NamRA's online calculator (itas.namra.org.na/tax/income-tax/calculator) uses the same bands.")
NAMRA_IND = f("Namibia Revenue Agency", "Taxation of individuals who earn a salary (brochure, rates as of 1 March 2024)",
              "https://itas.namra.org.na/assets/documents/other-forms/Tax%20on%20Individuals%20Brochure.pdf",
              "The brochure sets the cap at N$150,000 from the 2023 tax year. NamRA's online calculator applies the same cap.")
SSC95 = f(GG, "Regulations under the Social Security Act, 1994, regulation 8: Government Notice No. 198, Government Gazette No. 1181 of 1 November 1995",
          GZ + "1995/na-government-gazette-dated-1995-11-01-no-1181.pdf",
          "The Social Security Commission's employer portal (ssc.org.na) applies a combined rate of 1.8% for every period since 1995.")
GN275 = f(GG, "Amendment of regulations under Social Security Act, 1994: Government Notice No. 275 of 2024, Government Gazette No. 8461",
          GZ + "2024/na-government-gazette-dated-2024-10-01-no-8461.pdf")
GN236_URL = GZ + "2026/na-government-gazette-dated-2026-07-15-no-8975.pdf"
GN305 = f(GG, "Amendment of regulations under Social Security Act: Government Notice No. 305 of 2026, regulation 9(1), Government Gazette No. 9037",
          GZ + "2026/na-government-gazette-dated-2026-09-29-no-9037.pdf")
WAGE = f(GG, "Wage Order for Setting National Minimum Wage for Employees: Government Notice No. 218 of 2024, as amended by Government Notice No. 6 of 2025 (Government Gazette No. 8562)",
         GZ + "2025/na-government-gazette-dated-2025-01-15-no-8562.pdf",
         "Original order in Government Gazette No. 8409: " + GZ + "2024/na-government-gazette-dated-2024-08-07-no-8409.pdf. Government Notice No. 265 of 2025 changed only paragraph 6 (deductions).")
NTA = f("Namibia Training Authority", "VET Levy", "https://www.nta.com.na/vet-levy/")
ITAS_TAXES = "https://itas.namra.org.na/taxes"


def esc(*rows):
    return [{"desde": d, "hasta": h, "tasa": t} for (d, h, t) in rows]


def num(id_, nombre, unidad, valor, fuente, desde="2008-11-01"):
    return {"id": id_, "nombre": nombre, "tipo": "numero", "unidad": unidad,
            "tramos": [{"estado": "verificado", "desde": desde, "valor": valor, "fuente": fuente}]}


datos = [
    {"id": "na.income-tax-bands", "nombre": "Income tax rates for individuals", "tipo": "escala", "unidad": "NAD", "proximaRevision": "2027-03-01",
     "nota": "An Income Tax Amendment Bill that revises the bands was tabled in 2026. Until it is passed and gazetted, these bands apply.",
     "tramos": [{"estado": "verificado", "desde": "2024-03-01",
                 "valor": esc((0, 100000, 0), (100000, 150000, 18), (150000, 350000, 25), (350000, 550000, 28), (550000, 850000, 30), (850000, 1550000, 32), (1550000, None, 37)),
                 "fuente": ITA}]},
    num("na.retirement-deduction-cap", "Yearly cap on pension, provident, retirement annuity and education policy deductions", "NAD", 150000, NAMRA_IND, "2023-03-01"),
    num("na.ssc-employee-rate", "Social Security employee contribution (Maternity Leave, Sick Leave and Death Benefit Fund)", "%", 0.9, SSC95, "1995-11-01"),
    num("na.ssc-employer-rate", "Social Security employer contribution (Maternity Leave, Sick Leave and Death Benefit Fund)", "%", 0.9, SSC95, "1995-11-01"),
    {"id": "na.ssc-ceiling", "nombre": "Maximum monthly basic wage for Social Security contributions", "tipo": "numero", "unidad": "NAD", "proximaRevision": "2027-03-01",
     "tramos": [
         {"estado": "verificado", "desde": "2025-03-01", "hasta": "2026-02-28", "valor": 11000, "fuente": GN275},
         {"estado": "verificado", "desde": "2026-03-01", "hasta": "2027-02-28", "valor": 12500,
          "fuente": f(GG, "Amendment of regulations under Social Security Act, 1994: Government Notice No. 236 of 2026, Government Gazette No. 8975", GN236_URL,
                      "Published on 15 July 2026 with effect from 1 March 2026. The Social Security Commission's employer portal applies N$12,500 from 1 September 2026.")},
         {"estado": "verificado", "desde": "2027-03-01", "hasta": "2028-02-29", "valor": 14000,
          "fuente": f(GG, "Government Notice No. 236 of 2026, table of maximum basic salary, Government Gazette No. 8975", GN236_URL)},
         {"estado": "verificado", "desde": "2028-03-01", "hasta": "2029-02-28", "valor": 15000,
          "fuente": f(GG, "Government Notice No. 236 of 2026, table of maximum basic salary, Government Gazette No. 8975", GN236_URL)},
         {"estado": "verificado", "desde": "2029-03-01", "valor": 16000,
          "fuente": f(GG, "Government Notice No. 236 of 2026, table of maximum basic salary, Government Gazette No. 8975", GN236_URL)}]},
    num("na.ssc-floor", "Minimum monthly basic wage for Social Security contributions", "NAD", 500, GN275, "2025-03-01"),
    num("na.ssc-maternity-rate", "Social Security maternity benefit as a share of basic wage", "%", 100, GN305, "2026-10-01"),
    num("na.ssc-maternity-cap", "Maximum Social Security maternity benefit a month", "NAD", 20000, GN305, "2026-10-01"),
    {"id": "na.minimum-wage", "nombre": "National minimum wage per hour", "tipo": "mapa", "unidad": "NAD", "proximaRevision": "2027-01-01",
     "etiquetas": {"general": "Most employees", "domestic": "Domestic workers", "agricultural": "Agricultural workers", "security": "Security workers"},
     "tramos": [
         {"estado": "verificado", "desde": "2025-01-01", "hasta": "2025-12-31", "valor": {"general": 18, "domestic": 12, "agricultural": 10, "security": 13.5}, "fuente": WAGE},
         {"estado": "verificado", "desde": "2026-01-01", "hasta": "2026-12-31", "valor": {"general": 18, "domestic": 15, "agricultural": 14, "security": 16}, "fuente": WAGE},
         {"estado": "verificado", "desde": "2027-01-01", "valor": {"general": 18, "domestic": 18, "agricultural": 18, "security": 18}, "fuente": WAGE}]},
    num("na.max-weekly-hours", "Maximum ordinary hours of work a week", "horas", 45, la("section 16(1)(a)")),
    num("na.weeks-per-month", "Weeks in a month for converting pay rates", "factor", 4.333, la("section 10(3), Table 1")),
    num("na.overtime-factor", "Overtime pay multiplier", "factor", 1.5, la("section 17(2)")),
    num("na.overtime-sunday-holiday-factor", "Overtime multiplier on a Sunday or public holiday you normally work", "factor", 2, la("section 17(2)")),
    num("na.night-work-rate", "Night work allowance (20h00 to 07h00)", "%", 6, la("section 19(1)")),
    num("na.sunday-factor", "Pay multiplier for Sunday work", "factor", 2, la("section 21(5)")),
    num("na.public-holiday-factor", "Pay multiplier for work on a public holiday that is not a normal work day", "factor", 2, la("section 22(7)")),
    num("na.annual-leave-weeks", "Annual leave a year", "semanas", 4, la("section 23(2)")),
    {"id": "na.sick-leave-days", "nombre": "Sick leave per 36-month cycle", "tipo": "mapa", "unidad": "dias",
     "etiquetas": {"five-days": "Five-day week", "six-days": "Six-day week"},
     "tramos": [{"estado": "verificado", "desde": "2008-11-01", "valor": {"five-days": 30, "six-days": 36}, "fuente": la("section 24(1) and section 1 (sick leave cycle)")}]},
    num("na.sick-leave-first-year-divisor", "Days worked for each sick leave day in the first year", "dias", 26, la("section 24(1)")),
    num("na.maternity-weeks", "Maternity leave", "semanas", 12, la("section 26(1)")),
    num("na.severance-weeks-per-year", "Severance pay for each year of continuous service", "semanas", 1, la("section 35(3)")),
    {"id": "na.notice-period", "nombre": "Minimum notice period", "tipo": "mapa", "unidad": "numero",
     "etiquetas": {"days-up-to-4-weeks": "Days, employed four weeks or less", "weeks-up-to-1-year": "Weeks, employed more than four weeks and up to one year", "months-over-1-year": "Months, employed more than one year"},
     "tramos": [{"estado": "verificado", "desde": "2008-11-01", "valor": {"days-up-to-4-weeks": 1, "weeks-up-to-1-year": 1, "months-over-1-year": 1}, "fuente": la("section 30(1)")}]},
    {"id": "na.transfer-duty-natural", "nombre": "Transfer duty for natural persons (property other than agricultural land)", "tipo": "escala", "unidad": "NAD",
     "tramos": [{"estado": "verificado", "desde": "2024-10-01",
                 "valor": esc((0, 1100000, 0), (1100000, 1580000, 1), (1580000, 3150000, 5), (3150000, 12100000, 8), (12100000, None, 11)),
                 "fuente": f(GG, "Transfer Duty Amendment Act, 2024 (Act No. 6 of 2024), section 3, Government Gazette No. 8444",
                             GZ + "2024/na-government-gazette-dated-2024-09-16-no-8444.pdf",
                             "In force from 1 October 2024 (Government Notice No. 280 of 2024, Gazette No. 8460).")}]},
    num("na.transfer-duty-other", "Transfer duty for buyers who are not natural persons", "%", 12,
        f("Namibia Revenue Agency", "Stamp and Transfer Duties brochure (14 July 2024)",
          "https://itas.namra.org.na/assets/documents/other-forms/Stamp%20and%20Transfer%20Duties%20-%2014%20July%202024.pdf",
          "The Transfer Duty Amendment Act, 2024 changed only the rates for natural persons, so the 12% for other buyers in this brochure still applies."), "2024-10-01"),
    {"id": "na.stamp-duty-transfer", "nombre": "Stamp duty on transfer deeds for natural persons", "tipo": "mapa", "unidad": "NAD",
     "etiquetas": {"exempt-up-to": "Exempt up to", "per-1000": "Duty for every N$1,000 or part above the exempt amount"},
     "tramos": [{"estado": "verificado", "desde": "2024-10-01", "valor": {"exempt-up-to": 1100000, "per-1000": 10},
                 "fuente": f(GG, "Stamp Duties Amendment Act, 2024 (Act No. 7 of 2024), section 4, Government Gazette No. 8445",
                             GZ + "2024/na-government-gazette-dated-2024-09-16-no-8445.pdf",
                             "In force from 1 October 2024 (Government Notice No. 279 of 2024, Gazette No. 8460).")}]},
    num("na.corporate-tax-rate", "Company income tax rate (non-mining)", "%", 30,
        f(GG, "Income Tax Amendment Act, 2024 (Act No. 4 of 2024), Schedule 4 paragraph 3(1)(a), Government Gazette No. 8442",
          GZ + "2024/na-government-gazette-dated-2024-09-16-no-8442.pdf",
          "30 cents per dollar for years of assessment starting on or after 1 January 2025; 31 cents for years starting in 2024."), "2025-01-01"),
    {"id": "na.withholding-tax", "nombre": "Withholding tax on payments to non-residents", "tipo": "mapa", "unidad": "%",
     "etiquetas": {"services": "Management, consultancy and entertainment fees", "interest": "Interest", "royalties": "Royalties",
                   "dividends-25": "Dividends to a company holding at least 25%", "dividends-other": "Other dividends"},
     "tramos": [{"estado": "verificado", "desde": "2024-07-14",
                 "valor": {"services": 10, "interest": 10, "royalties": 10, "dividends-25": 10, "dividends-other": 20},
                 "fuente": f("Namibia Revenue Agency", "Types of taxes: withholding tax on interest, services and royalties, and non-resident shareholders tax", ITAS_TAXES,
                             "The same rates appear in the NamRA brochure Withholding Tax on Services (14 July 2024).")}]},
    num("na.vet-levy-rate", "Vocational Education and Training levy", "%", 1, NTA, "2014-04-01"),
    num("na.vet-levy-threshold", "Yearly payroll from which employers pay the VET levy", "NAD", 1000000, NTA, "2014-04-01"),
    num("na.vat", "VAT standard rate", "%", 15, f("Namibia Revenue Agency", "Types of taxes: Value Added Tax", ITAS_TAXES), "2000-11-27"),
]

with open(SALIDA, "w", newline="\n", encoding="utf-8") as fh:
    json.dump({"mercado": "na", "datos": datos}, fh, indent=2, ensure_ascii=False)
    fh.write("\n")
print(len(datos))
