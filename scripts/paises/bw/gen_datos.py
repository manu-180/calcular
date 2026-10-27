# Genera src/paises/bw/datos.json. Cada valor se leyó en la fuente que lleva al lado.
# Uso: python -I scripts/paises/bw/gen_datos.py
import json
import pathlib

HOY = "2026-10-27"
RAIZ = pathlib.Path(__file__).resolve().parents[3]

TT = {
    "organismo": "BURS",
    "titulo": "Tax Table and Guidance Notes (for employee's income), effective from 1st July 2026",
    "url": "https://www.burs.org.bw/images/Tax%20Table_2026.pdf",
    "tipo": "primaria",
    "verificadoEl": HOY,
}
TT_V = dict(TT, nota="Part V: rates for tax years 2020/2021 to 2025/2026.")
TT_REG = dict(TT, nota="Part III, Income Tax Regulations (employment), regulation 24: motor vehicle benefit.")
ITA = {
    "organismo": "BURS",
    "titulo": "Income Tax Act, 2026 (Act No. 13 of 2026), Gazette of 1st July 2026, commencement 01.07.2026",
    "url": "https://www.burs.org.bw/index.php/tax/tax-laws-2026?download=954:income-tax-act-amendment-2026",
    "tipo": "primaria",
    "verificadoEl": HOY,
}
VAT = {
    "organismo": "BURS",
    "titulo": "Value Added Tax Act, 2026 (Act No. 15 of 2026) and Part Commencement Date Order (S.I. 95 of 2026)",
    "url": "https://www.burs.org.bw/index.php/tax/tax-laws-2026?download=958:value-added-tax-act-2026",
    "tipo": "primaria",
    "verificadoEl": HOY,
}
BILL = {
    "organismo": "ILO (copia del Gazette)",
    "titulo": "Employment and Labour Relations Bill, 2025 (Bill No. 10 of 2025), Gazette Extraordinary of 6th June 2025",
    "url": "https://www.ilo.org/sites/default/files/2025-10/Extraordinary%20%20Bill%20x.pdf",
    "tipo": "secundaria",
    "verificadoEl": HOY,
}
MOTIVO_BILL = (
    "Solo lo leímos en el proyecto de ley publicado en 2025 (copia en ilo.org). La ley rige desde el "
    "1/9/2026 según Daily News del Gobierno, pero no encontramos el texto final sancionado ni la orden "
    "de comienzo en un sitio oficial de Botswana."
)


def escala(filas):
    out = []
    for i, (desde, tasa) in enumerate(filas):
        hasta = filas[i + 1][0] if i + 1 < len(filas) else None
        out.append({"desde": desde, "hasta": hasta, "tasa": tasa})
    return out


RES_2021 = escala([(0, 0), (48000, 5), (84000, 12.5), (120000, 18.75), (156000, 25)])
RES_2027 = escala([(0, 0), (48000, 5), (84000, 12.5), (120000, 18.75), (156000, 25), (400000, 27.5)])
NORES_2021 = escala([(0, 5), (84000, 12.5), (120000, 18.75), (156000, 25)])
NORES_2027 = escala([(0, 5), (84000, 12.5), (120000, 18.75), (156000, 25), (400000, 27.5)])
CGT = escala([(0, 0), (36000, 5), (84000, 12.5), (120000, 18.75), (156000, 25), (400000, 27.5)])


def ver(desde, valor, fuente, hasta=None):
    t = {"estado": "verificado", "desde": desde}
    if hasta:
        t["hasta"] = hasta
    t.update({"valor": valor, "fuente": fuente})
    return t


def nover(desde, valor, motivo, fuente=None):
    t = {"estado": "no-verificado", "desde": desde, "valor": valor, "motivo": motivo}
    if fuente:
        t["fuente"] = fuente
    return t


datos = [
    {
        "id": "bw.paye-resident",
        "nombre": "Income tax rates for resident individuals (annual taxable income)",
        "tipo": "escala",
        "unidad": "BWP",
        "proximaRevision": "2027-07-01",
        "tramos": [
            ver("2020-07-01", RES_2021, TT_V, "2026-06-30"),
            ver("2026-07-01", RES_2027, dict(TT, nota="Part II, Table I. Same rates as Schedule 1 of the Income Tax Act, 2026.")),
        ],
    },
    {
        "id": "bw.paye-resident-2021-2026",
        "nombre": "Resident individual rates for tax years 2020/2021 to 2025/2026",
        "tipo": "escala",
        "unidad": "BWP",
        "tramos": [ver("2020-07-01", RES_2021, TT_V)],
    },
    {
        "id": "bw.paye-non-resident",
        "nombre": "Income tax rates for non-resident individuals (annual)",
        "tipo": "escala",
        "unidad": "BWP",
        "proximaRevision": "2027-07-01",
        "tramos": [
            ver("2020-07-01", NORES_2021, TT_V, "2026-06-30"),
            ver("2026-07-01", NORES_2027, dict(TT, nota="Part II, Table II, payments made annually.")),
        ],
    },
    {
        "id": "bw.cgt-individual",
        "nombre": "Rates of tax on the net aggregate gain of individuals",
        "tipo": "escala",
        "unidad": "BWP",
        "proximaRevision": "2027-07-01",
        "tramos": [ver("2026-07-01", CGT, dict(ITA, nota="Schedule 1, Part I, paragraph 2."))],
    },
    {
        "id": "bw.company-tax",
        "nombre": "Company income tax rates",
        "tipo": "mapa",
        "unidad": "%",
        "etiquetas": {
            "general": "Company (general rate)",
            "ifsc": "IFSC company, approved financial operations",
            "mutual": "Mutual association",
        },
        "proximaRevision": "2027-07-01",
        "tramos": [ver("2026-07-01", {"general": 24.5, "ifsc": 15, "mutual": 5}, dict(ITA, nota="Schedule 1, Part I, paragraph 3 (b), (c) and (d)."))],
    },
    {
        "id": "bw.wht-resident",
        "nombre": "Resident withholding tax rates",
        "tipo": "mapa",
        "unidad": "%",
        "etiquetas": {
            "dividends": "Dividends",
            "interest": "Interest",
            "directors-fees": "Director's fees",
            "construction": "Construction contract payments",
            "rent": "Rent",
            "commission": "Commission or brokerage",
        },
        "tramos": [
            ver(
                "2026-07-01",
                {"dividends": 10, "interest": 10, "directors-fees": 10, "construction": 3, "rent": 5, "commission": 10},
                dict(ITA, nota="Schedule 1, Part I, paragraph 7."),
            )
        ],
    },
    {
        "id": "bw.wht-non-resident",
        "nombre": "Non-resident withholding tax rates",
        "tipo": "mapa",
        "unidad": "%",
        "etiquetas": {
            "dividends": "Dividends",
            "interest": "Interest",
            "royalties": "Royalties",
            "technical-fees": "Technical fees",
            "insurance-premium": "Insurance premiums",
            "entertainer": "Payments to entertainers",
            "directors-fees": "Director's fees",
            "capital-gain": "Sale of an asset by a non-resident",
        },
        "tramos": [
            ver(
                "2026-07-01",
                {
                    "dividends": 10,
                    "interest": 15,
                    "royalties": 15,
                    "technical-fees": 15,
                    "insurance-premium": 3,
                    "entertainer": 10,
                    "directors-fees": 15,
                    "capital-gain": 10,
                },
                dict(ITA, nota="Schedule 1, Part I, paragraph 6."),
            )
        ],
    },
    {
        "id": "bw.wht-domestic-threshold",
        "nombre": "Yearly rent or commission below which no withholding applies",
        "tipo": "numero",
        "unidad": "BWP",
        "tramos": [ver("2026-07-01", 48000, dict(ITA, nota="Schedule 1, Part II, paragraphs 3 and 4, for sections 133 (4) (c) and 133 (6)."))],
    },
    {
        "id": "bw.vat",
        "nombre": "VAT standard rate",
        "tipo": "numero",
        "unidad": "%",
        "tramos": [ver("2026-07-01", 14, dict(VAT, nota="Section 7 (2) (b). In force from 1 July 2026 under S.I. 95 of 2026."))],
    },
    {
        "id": "bw.vat-registration-threshold",
        "nombre": "Compulsory VAT registration threshold (taxable supplies in 12 months)",
        "tipo": "numero",
        "unidad": "BWP",
        "tramos": [ver("2026-07-01", 1000000, dict(VAT, nota="Schedule 5, paragraph 2, for section 12 (2)."))],
    },
    {
        "id": "bw.gratuity-exempt-share",
        "nombre": "Non-taxable part of a gratuity, severance pay or retrenchment payment",
        "tipo": "numero",
        "unidad": "%",
        "tramos": [ver("2026-07-01", 50, dict(ITA, nota="Section 17 (3)."))],
    },
    {
        "id": "bw.lump-sum-exempt-share",
        "nombre": "Non-taxable part of a pension or provident fund lump sum",
        "tipo": "numero",
        "unidad": "%",
        "tramos": [ver("2026-07-01", 50, dict(ITA, nota="Section 19 (4)."))],
    },
    {
        "id": "bw.pension-deduction-cap",
        "nombre": "Cap on a resident's own retirement fund contributions",
        "tipo": "numero",
        "unidad": "%",
        "tramos": [ver("2026-07-01", 15, dict(ITA, nota="Section 28 (5): 15 per cent of taxable income."))],
    },
    {
        "id": "bw.car-benefit-rate",
        "nombre": "Yearly value of a company car as a share of its cost",
        "tipo": "numero",
        "unidad": "%",
        "tramos": [ver("2026-07-01", 10, TT_REG)],
    },
    {
        "id": "bw.annual-leave-days",
        "nombre": "Minimum paid annual leave earned per month",
        "tipo": "numero",
        "unidad": "dias",
        "tramos": [nover("2026-09-01", 1.25, MOTIVO_BILL, dict(BILL, nota="Section 219 (2) of the Bill."))],
    },
    {
        "id": "bw.overtime-rate",
        "nombre": "Overtime pay as a share of the normal rate",
        "tipo": "numero",
        "unidad": "%",
        "tramos": [nover("2026-09-01", 150, MOTIVO_BILL, dict(BILL, nota="Section 214 (4) of the Bill: one and a half times."))],
    },
    {
        "id": "bw.public-holiday-rate",
        "nombre": "Pay for work on a public holiday as a share of the normal rate",
        "tipo": "numero",
        "unidad": "%",
        "tramos": [nover("2026-09-01", 200, MOTIVO_BILL, dict(BILL, nota="Section 216 (3) (a) of the Bill: at least double. Work on a rest day: double, section 213."))],
    },
    {
        "id": "bw.overtime-divisor",
        "nombre": "Divisor to turn a monthly wage into a daily rate",
        "tipo": "mapa",
        "unidad": "dias",
        "etiquetas": {"5-days": "5 day week", "5-5-days": "5 and a half day week", "6-days": "6 day week"},
        "tramos": [nover("2026-09-01", {"5-days": 22, "5-5-days": 24, "6-days": 26}, MOTIVO_BILL, dict(BILL, nota="Section 214 (7) of the Bill."))],
    },
    {
        "id": "bw.notice-period-days",
        "nombre": "Minimum notice for workers paid daily or weekly",
        "tipo": "numero",
        "unidad": "dias",
        "tramos": [nover("2026-09-01", 7, MOTIVO_BILL, dict(BILL, nota="Section 166 (1) (a) of the Bill. Monthly paid: one month, section 166 (1) (b)."))],
    },
    {
        "id": "bw.minimum-wage-hourly",
        "nombre": "General minimum wage per hour",
        "tipo": "numero",
        "unidad": "BWP",
        "tramos": [
            nover(
                "2024-02-01",
                9.06,
                "Solo lo vimos en WageIndicator y Trading Economics, que citan la Regulation of Minimum Wages Order (S.I. 7 of 2024). No encontramos la orden en un sitio oficial.",
            )
        ],
    },
    {
        "id": "bw.transfer-duty",
        "nombre": "Transfer duty on immovable property",
        "tipo": "mapa",
        "unidad": "%",
        "etiquetas": {"citizen": "Citizen (on the value above P1 000 000)", "non-citizen": "Non-citizen"},
        "tramos": [
            nover(
                "2020-01-01",
                {"citizen": 5, "non-citizen": 30},
                "Solo lo vimos en el formulario TD01 de BURS (versión 2020), que no es la ley. No pudimos leer el texto vigente de la Transfer Duty Act.",
                {
                    "organismo": "BURS",
                    "titulo": "Declaration form for transfer of immovable property (TD01, VER002/2020)",
                    "url": "https://www.burs.org.bw/images/BURS_Delaration_form_for_Transfer_of_immovable_Property_TD01_1.pdf",
                    "tipo": "secundaria",
                    "verificadoEl": HOY,
                },
            )
        ],
    },
]

salida = RAIZ / "src" / "paises" / "bw" / "datos.json"
with open(salida, "w", encoding="utf-8", newline="\n") as f:
    json.dump({"mercado": "bw", "datos": datos}, f, ensure_ascii=False, indent=2)
    f.write("\n")
print(f"{len(datos)} datos -> {salida}")
