# Genera src/paises/mw/datos.json y series.json con los valores leídos en las fuentes primarias (2026-10-27).
# Correr desde la raíz del repo: python scripts/paises/mw/gen_datos.py
import json
import re
import os
from datetime import datetime

HOY = "2026-10-27"
AQUI = os.path.dirname(os.path.abspath(__file__))
MRA = "Malawi Revenue Authority"
MOL = "Ministry of Labour"


def fuente(organismo, titulo, url, nota=None):
    f = {"organismo": organismo, "titulo": titulo, "url": url, "tipo": "primaria", "verificadoEl": HOY}
    if nota:
        f["nota"] = nota
    return f


F_MEDIDAS = fuente(
    MRA,
    "Public Notice: new tax measures under the amended Taxation and Value Added Tax laws (March 2026)",
    "https://www.mra.mw/admin/storage/download_files/1774423425_NEW%20TAX%20MEASURES%20UNDER%20AMENDED%20TAXATION%20AND%20VALUE%20ADDED%20TAX%20LAWS%20%20March%202026.pdf",
    "The Taxation (Amendment) and VAT (Amendment) (No. 2) Acts 2025 apply from 30 December 2025. The MRA PAYE calculator on mra.mw lists the same monthly bands.",
)
F_IVA = fuente(
    "Parliament of Malawi (published by MRA)",
    "Value Added Tax (Amendment) (No. 2) Act, 2025 (Act No. 37 of 2025), published 30 December 2025",
    "https://www.mra.mw/admin/storage/download_files/1767960417_Value%20Adde%20Tax%20(Amendment)%20(NO.%202)%20ACT.pdf",
    "Section 9 of the VAT Act: 16.5 replaced by 17.5.",
)
F_WHT = fuente(
    MRA,
    "Withholding Tax: specified rates (Fourteenth Schedule to the Taxation Act)",
    "https://www.mra.mw/view/withholding-tax",
    "Same rates as the MRA Withholding Tax brochure for April 2023 to March 2024. The winnings rows of the page predate the 2025 amendment and are not used.",
)
F_FBT = fuente(MRA, "Understanding Fringe Benefit Tax", "https://www.mra.mw/view/understanding-fringe-benefit-tax")
F_TEVET = fuente(
    MRA,
    "TEVET Levy: employers remit 1% of the basic annual payroll",
    "https://www.mra.mw/view/tevet-levy",
    "MRA has collected the levy for TEVETA since 1 November 2015.",
)
F_TEVET_MULTA = fuente(
    MRA,
    "TEVET Levy compliance: 20% penalty on unpaid levy (TEVET Act, section 21(1))",
    "https://www.mra.mw/view/tevet-levy-compliance",
)
F_PRES = fuente(
    MRA,
    "Understanding Presumptive Tax brochure (April 2023 to March 2024)",
    "https://www.mra.mw/admin/storage/downloads/Presumptive_Tri-Fold_English_2023-2024.pdf",
    "The current MRA page on presumptive tax (mra.mw/view/business-presumptive-tax) shows the same K12.5 million ceiling, K170,000 and K225,000 rows.",
)
F_CPI = fuente(
    MRA,
    "Public Notice: use of consumer price indices for adjusting the basis of a capital asset (CPIs to September 2026)",
    "https://www.mra.mw/admin/storage/download_files/1792486281_USE%20OF%20CONSUMER%20PRICE%20INDICES%20(CPIs)%20FOR%20ADJUSTING%20BASIS%20OF%20A%20CAPITAL%20ASSET%20UNDER%20SECTION%202%20OF%20THE%20TAXATION%20ACT%20-%20OCtober%202026.pdf",
    "Continuous NSO CPI series with 1970 = 100, published by MRA on 20 October 2026.",
)
F_EA = fuente(
    MOL,
    "Employment Act, 2000 (Act No. 6 of 2000)",
    "https://www.labour.gov.mw/images/documents/employment-act.pdf",
    "Text of the Act as published on 19 May 2000 and posted by the Ministry of Labour.",
)
F_PEN = fuente(
    MOL,
    "Pension Act, 2023 (Act No. 6 of 2023), section 12: minimum contribution rates",
    "https://www.labour.gov.mw/images/documents/Malawi-Pension-Act_2023.pdf",
    "Section 12 of the Pension Act, 2011 (Cap. 55:02) set the same minimums of 10% and 5%.",
)
F_RBM = fuente(
    "Reserve Bank of Malawi",
    "Exchange rates: US dollar buying, middle and selling rates",
    "https://www.rbm.mw/Statistics/MajorRates/",
)

DESDE_2026 = "2025-12-30"
EA_DESDE = "2000-05-19"
ANIO_FISCAL = "2026-04-01"


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


WHT = {
    "royalties": (20, "Royalties"),
    "rent": (20, "Rent"),
    "supplies": (3, "Supplies to traders and institutions (food and other goods)"),
    "commission": (20, "Commission"),
    "haulage": (10, "Carriage and haulage"),
    "farm-produce": (1, "Sale of farm produce (final tax)"),
    "building": (10, "Contractors in the building industry"),
    "entertainment": (20, "Public entertainment"),
    "services": (20, "Services"),
    "interest": (20, "Interest"),
    "fees": (20, "Fees"),
}

datos = [
    escala(
        "mw.paye-bands",
        "Monthly PAYE bands",
        "MWK",
        [(0, 170000, 0, None), (170000, 1570000, 30, None), (1570000, 10000000, 35, None), (10000000, None, 40, None)],
        F_MEDIDAS,
        DESDE_2026,
    ),
    escala(
        "mw.personal-tax-bands",
        "Annual personal income tax bands",
        "MWK",
        [(0, 2040000, 0, None), (2040000, None, 30, None)],
        F_MEDIDAS,
        DESDE_2026,
    ),
    numero("mw.vat", "VAT standard rate", "%", 17.5, F_IVA, DESDE_2026),
    numero("mw.transfer-levy-rate", "Levy on mobile money and bank transfers", "%", 0.05, F_MEDIDAS, DESDE_2026),
    numero("mw.transfer-levy-threshold", "Mobile money transfers above this amount pay the levy", "MWK", 100000, F_MEDIDAS, DESDE_2026),
    numero("mw.winnings-tax", "Withholding tax on betting, gambling and lottery winnings", "%", 15, F_MEDIDAS, DESDE_2026),
    mapa("mw.wht-rates", "Withholding tax rates", "%", {k: v[0] for k, v in WHT.items()}, {k: v[1] for k, v in WHT.items()}, F_WHT, "2023-04-01"),
    numero("mw.fbt-rate", "Fringe benefit tax rate", "%", 30, F_FBT, ANIO_FISCAL),
    numero("mw.fbt-vehicle", "Taxable value of a motor vehicle a year, share of original cost", "%", 15, F_FBT, ANIO_FISCAL),
    numero("mw.fbt-school-fees", "Taxable value of school fees paid to the school, share of cost", "%", 50, F_FBT, ANIO_FISCAL),
    numero("mw.fbt-housing-owned", "Share of the taxable value for housing the employer owns", "%", 50, F_FBT, ANIO_FISCAL),
    numero("mw.fbt-housing-unfurnished", "Minimum taxable value of unfurnished housing, share of salary", "%", 10, F_FBT, ANIO_FISCAL),
    numero("mw.fbt-housing-furnished", "Minimum taxable value of furnished housing, share of salary", "%", 12, F_FBT, ANIO_FISCAL),
    numero("mw.tevet-rate", "TEVET levy, share of the basic payroll", "%", 1, F_TEVET, "2015-11-01"),
    numero("mw.tevet-penalty", "Penalty on unpaid TEVET levy", "%", 20, F_TEVET_MULTA, "2015-11-01"),
    escala(
        "mw.presumptive-tax",
        "Presumptive tax a year by annual turnover",
        "MWK",
        [(0, 4000000, 0, 0), (4000000, 7000000, 0, 110000), (7000000, 10000000, 0, 170000), (10000000, 12500000, 0, 225000)],
        F_PRES,
        "2023-04-01",
    ),
    numero("mw.cgt-provisional-rate", "Provisional tax on a capital gain", "%", 30, F_CPI, "2026-10-20"),
    numero("mw.pension-employee", "Minimum pension contribution, employee", "%", 5, F_PEN, "2023-02-10"),
    numero("mw.pension-employer", "Minimum pension contribution, employer", "%", 10, F_PEN, "2023-02-10"),
    numero("mw.overtime-ordinary", "Ordinary overtime, times the hourly wage", "factor", 1.5, F_EA, EA_DESDE),
    numero("mw.overtime-day-off", "Day-off overtime, times the hourly wage", "factor", 2, F_EA, EA_DESDE),
    numero("mw.overtime-holiday", "Public holiday overtime, times the hourly wage", "factor", 2, F_EA, EA_DESDE),
    numero("mw.weekly-hours-limit", "Maximum normal hours a week, excluding overtime", "horas", 48, F_EA, EA_DESDE),
    numero("mw.leave-six-day-week", "Annual leave for a six-day week", "dias", 18, F_EA, EA_DESDE),
    numero("mw.leave-five-day-week", "Annual leave for a five-day week", "dias", 15, F_EA, EA_DESDE),
    numero("mw.sick-full-pay", "Sick leave on full pay a year", "semanas", 4, F_EA, EA_DESDE),
    numero("mw.sick-half-pay", "Sick leave on half pay a year", "semanas", 8, F_EA, EA_DESDE),
    numero("mw.sick-qualifying", "Continuous service before sick leave applies", "meses", 12, F_EA, EA_DESDE),
    numero("mw.maternity-weeks", "Maternity leave on full pay", "semanas", 8, F_EA, EA_DESDE),
    numero("mw.maternity-cycle", "Maternity leave applies once in every", "anios", 3, F_EA, EA_DESDE),
    numero("mw.notice-long-service", "Years of service after which notice is one month for every pay period", "anios", 5, F_EA, EA_DESDE),
    numero("mw.notice-mid-service", "Years of service after which weekly and daily paid staff get a fortnight", "anios", 2, F_EA, EA_DESDE),
    numero("mw.notice-short-service", "Months of service after which daily and hourly paid staff get a week", "meses", 6, F_EA, EA_DESDE),
    numero("mw.notice-fixed-term", "Minimum notice for a fixed-term contract", "dias", 14, F_EA, EA_DESDE),
    {
        "id": "mw.severance-weeks",
        "nombre": "Severance allowance, weeks of wages for each completed year",
        "tipo": "mapa",
        "unidad": "semanas",
        "etiquetas": {"years-1-5": "Years 1 to 5", "years-6-10": "Years 6 to 10", "years-11-plus": "Year 11 onwards"},
        "tramos": [
            {
                "estado": "no-verificado",
                "desde": "2010-01-01",
                "valor": {"years-1-5": 2, "years-6-10": 3, "years-11-plus": 4},
                "motivo": "The Ministry of Labour only posts the 2000 text of the Employment Act, whose First Schedule was later replaced. The amended schedule is on MalawiLII, which blocks every request from our environment behind a Cloudflare check; we only saw fragments of it in search results.",
            }
        ],
    },
]

assert len({d["id"] for d in datos}) == len(datos)

MESES = 12


def cifra(s):
    return float(s.replace(",", ""))


puntos_cpi = []
with open(os.path.join(AQUI, "entrada", "cpi-mra-2026-10.txt"), encoding="utf-8") as f:
    for linea in f:
        partes = linea.split()
        anio = int(partes[0])
        mensuales = partes[1 : 1 + MESES]
        if anio == 2026:
            mensuales = partes[1:]
        for i, v in enumerate(mensuales):
            puntos_cpi.append([f"{anio}-{i + 1:02d}-01", cifra(v)])
puntos_cpi.sort()

puntos_usd = []
with open(os.path.join(AQUI, "entrada", "usd-rbm-2026.txt"), encoding="utf-8") as f:
    for linea in f:
        _, _compra, medio, _venta, mes, dia, anio = linea.split()
        fecha = datetime.strptime(f"{anio} {mes} {dia}", "%Y %b %d").strftime("%Y-%m-%d")
        puntos_usd.append([fecha, float(medio)])
puntos_usd.sort()

series = {
    "mercado": "mw",
    "series": [
        {
            "id": "mw.usd",
            "nombre": "Reserve Bank of Malawi middle rate, kwacha per US dollar",
            "unidad": "MWK",
            "frecuencia": "diaria",
            "maxAntiguedadDias": 10,
            "fuente": F_RBM,
            "puntos": puntos_usd,
        },
        {
            "id": "mw.cpi",
            "nombre": "Consumer price index (1970 = 100)",
            "unidad": "numero",
            "frecuencia": "mensual",
            "maxAntiguedadDias": 70,
            "fuente": F_CPI,
            "puntos": puntos_cpi,
        },
    ],
}

raiz = os.path.abspath(os.path.join(AQUI, "..", "..", ".."))
destino = os.path.join(raiz, "src", "paises", "mw")
os.makedirs(destino, exist_ok=True)
with open(os.path.join(destino, "datos.json"), "w", encoding="utf-8", newline="\n") as f:
    json.dump({"mercado": "mw", "datos": datos}, f, ensure_ascii=False, indent=2)
    f.write("\n")
with open(os.path.join(destino, "series.json"), "w", encoding="utf-8", newline="\n") as f:
    texto = json.dumps(series, ensure_ascii=False, indent=2)
    texto = re.sub(r'\[\s+("\d{4}-\d{2}-\d{2}"),\s+([0-9.]+)\s+\]', r"[\1, \2]", texto)
    f.write(texto + "\n")
print(len(datos), "datos;", len(puntos_cpi), "puntos de IPC;", len(puntos_usd), "puntos de USD")
