# Genera src/paises/bz/datos.json. Cada valor verificado fue leido en su fuente primaria el 2026-10-29.
import json

HOY = "2026-10-29"
LAB = ("Ministry of Labour", "Labour Act, Chapter 297, Revised Edition 2020 (laws as at 31 December 2020)", "https://www.ruraltransformation.gov.bz/docs/39/Labour_Act.pdf")
MW = ("Government of Belize Press Office", "Press release PR378/22: Minimum Wage Increases for All Categories of Workers (S.I. 169 and 170 of 2022)", "https://www.pressoffice.gov.bz/wp-content/uploads/2019/12/Dec-22-PR378-22-Minimum-Wage-Increases-for-All-Categories-of-Workers.pdf")
SSB = ("Social Security Board", "Contribution & Benefit Schedule, effective 4 April 2022", "https://socialsecurity.org.bz/wp-content/uploads/2022/03/Cont_Ben_Schedule.pdf")
SSB2 = ("Social Security Board", "Contributions: weekly contribution schedule and who pays", "https://socialsecurity.org.bz/contributions/")
BTS = ("Belize Tax Service", "Orientation Manual for Issuers of Electronic Tax Documents, version 1.3, May 2026 (standard-rated supplies taxed at 12.5%)", "https://media.bts.gov.bz/uploads/Orientation_Manual_for_Issuers_of_Electronic_Tax_Documents_v_1_30_2026_05_20_ac8fd13e93.pdf")
CBB = ("Central Bank of Belize", "Belize Commemorates 50 Years of Exchange Rate Stability (BZ$2 to US$1 since 1976)", "https://www.centralbank.org.bz/detail-pages/news/2026/05/11/belize-commemorates-50-years-of-exchange-rate-stability")


def f(t, nota=None):
    d = {"organismo": t[0], "titulo": t[1], "url": t[2], "tipo": "primaria", "verificadoEl": HOY}
    if nota:
        d["nota"] = nota
    return d


def num(id, nombre, unidad, valor, desde, fuente, extra=None):
    return {"id": f"bz.{id}", "nombre": nombre, "tipo": "numero", "unidad": unidad,
            "tramos": [{"estado": "verificado", "desde": desde, "valor": valor, "fuente": f(fuente, extra)}]}


L = "2020-12-31"
datos = []
datos.append(num("gst-rate", "General Sales Tax: standard rate", "%", 12.5, "2026-05-20", BTS, "The BTS manual defines standard-rated supplies as taxed at 12.5% and works its examples at 12.5%."))
datos.append(num("usd-peg", "Belize dollars per US dollar (fixed rate)", "BZD", 2, "1976-05-11", CBB))
datos.append(num("minimum-wage-hourly", "National minimum wage per hour", "BZD", 5, "2023-01-01", MW, "Applies to all categories of workers."))
datos.append(num("normal-week-hours", "Maximum hours of actual work in a week", "horas", 45, L, LAB, "Labour Act section 116(1)."))
datos.append(num("normal-day-hours", "Maximum hours of actual work in a day", "horas", 9, L, LAB, "Labour Act section 116(1)."))
datos.append(num("overtime-factor", "Overtime, Sunday, rest day and ordinary public holiday: multiple of the ordinary rate", "factor", 1.5, L, LAB, "Labour Act section 118(1)(b), (c) and (d)."))
datos.append(num("overtime-double-factor", "Christmas Day, Good Friday and Easter Monday: multiple of the ordinary rate", "factor", 2, L, LAB, "Labour Act section 118(1)(a)."))
datos.append(num("annual-leave-weeks", "Annual holiday after each year of employment", "semanas", 2, L, LAB, "Two working weeks, Labour Act section 127."))
datos.append(num("average-pay-divisor", "Average pay: total remuneration divided by", "numero", 26, L, LAB, "Labour Act section 126: average pay is one twenty-sixth of total remuneration."))
datos.append(num("holiday-pay-minimum-months", "Months of employment needed for holiday pay on leaving", "meses", 3, L, LAB, "Labour Act section 130(1)."))
datos.append(num("sick-leave-days", "Paid sick leave in any twelve months", "dias", 16, L, LAB, "Working days, Labour Act section 131(1)."))
datos.append(num("sick-leave-qualifying-days", "Days of service in the last twelve months needed for paid sick leave", "dias", 60, L, LAB, "Labour Act section 131(1)."))
datos.append(num("maternity-weeks", "Maternity leave on full pay", "semanas", 14, L, LAB, "Labour Act section 177(1)."))
datos.append(num("maternity-before-max", "Maternity leave before the expected date of confinement: maximum", "semanas", 7, L, LAB, "Labour Act section 177(1)(a)."))
datos.append(num("maternity-before-mandatory", "Mandatory leave before the expected date of confinement", "semanas", 2, L, LAB, "Labour Act section 177(1)(c)."))
datos.append(num("maternity-after-mandatory", "Mandatory leave after the expected date of confinement", "semanas", 7, L, LAB, "Labour Act section 177(1)(c)."))
datos.append(num("maternity-qualifying-days", "Days with the same employer in the last twelve months for paid maternity leave", "dias", 150, L, LAB, "Labour Act section 177(1) and (2)."))
datos.append({"id": "bz.notice-weeks", "nombre": "Notice of termination in weeks, by length of service", "tipo": "mapa", "unidad": "semanas",
              "etiquetas": {"short": "More than 2 weeks, up to 6 months", "medium": "More than 6 months, up to 2 years", "long": "More than 2 years, up to 5 years", "senior": "More than 5 years"},
              "tramos": [{"estado": "verificado", "desde": L, "valor": {"short": 1, "medium": 2, "long": 4, "senior": 8}, "fuente": f(LAB, "Labour Act section 37(2).")}]})
datos.append(num("severance-weeks-mid", "Severance pay per complete year, 5 to 10 years of service", "semanas", 1, L, LAB, "Weeks of wages, Labour Act section 183(1)(a)."))
datos.append(num("severance-weeks-long", "Severance pay per complete year, over 10 years of service", "semanas", 2, L, LAB, "Weeks of wages, Labour Act section 183(1)(b) and (3)."))
datos.append(num("severance-min-years", "Years of continuous service before severance pay starts", "anios", 5, L, LAB, "Labour Act section 183(1)(a)."))
datos.append(num("severance-long-years", "Years of continuous service for the higher severance rate", "anios", 10, L, LAB, "Labour Act section 183(1)(b)."))

# Seguridad social: escalas semanales. cuotaFija = monto en BZD; tasa 0.
bandas = [(0, 69.99, 55, 1.03, 4.47), (70, 109.99, 90, 1.69, 7.31), (110, 139.99, 130, 2.44, 10.56), (140, 179.99, 160, 3.94, 12.06),
          (180, 219.99, 200, 5.94, 14.06), (220, 259.99, 240, 7.94, 16.06), (260, 299.99, 280, 9.94, 18.06), (300, 339.99, 320, 11.94, 20.06),
          (340, 379.99, 360, 13.98, 22.02), (380, 419.99, 400, 16.15, 23.85), (420, 459.99, 440, 18.45, 25.55), (460, 499.99, 480, 20.86, 27.14),
          (500, None, 520, 23.40, 28.60)]


def escala(id, nombre, idx):
    filas = [{"desde": b[0], "hasta": b[1], "tasa": 0, "cuotaFija": b[idx]} for b in bandas]
    return {"id": f"bz.{id}", "nombre": nombre, "tipo": "escala", "unidad": "BZD",
            "tramos": [{"estado": "verificado", "desde": "2022-04-04", "valor": filas,
                        "fuente": f(SSB, "Figures by weekly earnings band. The first band on the current contributions page matches the schedule.")}]}


datos.append(escala("ssb-insurable-earnings", "Social security: weekly insurable earnings by weekly earnings band", 2))
datos.append(escala("ssb-employee-weekly", "Social security: weekly employee contribution by weekly earnings band", 3))
datos.append(escala("ssb-employer-weekly", "Social security: weekly employer contribution by weekly earnings band", 4))
datos.append(num("ssb-total-rate", "Social security: total contribution rate on insurable earnings", "%", 10, "2022-04-04", SSB, "Employee and employer shares together; the split by band is in the weekly schedule."))
datos.append(num("ssb-wage-ceiling", "Social security: weekly wage ceiling (top insurable earnings)", "BZD", 520, "2022-04-04", SSB))
datos.append(num("ssb-injury-only-weekly", "Social security: weekly employer contribution for employment injury cover only", "BZD", 2.6, "2022-04-04", SSB,
                 "For people aged 60 to 64 who receive a Social Security benefit and for everyone aged 65 and over."))
datos.append(num("ssb-payment-day", "Social security: contributions due by this day of the following month", "numero", 14, "2026-10-29", SSB2,
                 "The Board states that payments and the monthly Contribution Statement are due by the 14th day of each month for the previous month worked."))

# No verificados: impuesto a la renta de personas empleadas.
NV = "Act No. 40 of 2024 (Income and Business Tax Amendment Act 2024) could not be opened: the National Assembly site returned an error and the BTS pages load only in a browser. "


def nv(id, nombre, unidad, valor, motivo, url, titulo, org):
    return {"id": f"bz.{id}", "nombre": nombre, "tipo": "numero", "unidad": unidad,
            "tramos": [{"estado": "no-verificado", "desde": "2025-01-01", "valor": valor, "motivo": motivo,
                        "fuente": {"organismo": org, "titulo": titulo, "url": url, "tipo": "secundaria", "verificadoEl": HOY}}]}


datos.append(nv("income-tax-exemption", "Employment income: annual amount exempt from income tax", "BZD", 29000,
                NV + "Press reports and payroll guides give 29,000 from 1 January 2025 but disagree on the relief between 29,001 and 32,000. The page itself was seen only as a search result.",
                "https://www.thereporter.bz/post/income-tax-threshold-raised-wider-relief-for-middle-class-workers", "Income tax threshold raised", "The Reporter (press)"))
datos.append(nv("income-tax-rate", "Employment income: income tax rate above the exempt amount", "%", 25,
                NV + "Section 20 of Chapter 55 (25%) was read in the 2020 edition, but Act No. 40 of 2024 repeals and replaces provisions, so the current rate is unconfirmed.",
                "https://www.agm.gov.bz/uploads/laws/63976e6032352_Cap_55_Income_and_Business_Tax_Act.pdf", "Income and Business Tax Act, Chapter 55, Revised Edition 2020 (before Act No. 40 of 2024)", "Attorney General's Ministry"))

with open("src/paises/bz/datos.json", "w", newline="\n") as fh:
    json.dump({"mercado": "bz", "datos": datos}, fh, indent=2, ensure_ascii=False)
    fh.write("\n")
print(len(datos))
