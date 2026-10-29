# Arma src/paises/gm/datos.json. Cada valor sale de la fuente indicada, leída el día de VERIFICADO.
import json
from pathlib import Path

VERIFICADO = "2026-10-27"
HOY = VERIFICADO

GRA_TABLA = {"organismo": "GRA", "titulo": "Income Tax Table 2025", "url": "https://www.gra.gm/download-file/2a69ec11-c633-11ef-b086-029254d29bb1", "tipo": "primaria", "verificadoEl": VERIFICADO}
GRA_FAQ = {"organismo": "GRA", "titulo": "Domestic Taxes FAQs", "url": "https://www.gra.gm/domestic-faqs", "tipo": "primaria", "verificadoEl": VERIFICADO}
GRA_VAT = {"organismo": "GRA", "titulo": "Value Added Tax brochure", "url": "https://www.gra.gm/download-file/8d0cfa28-d217-11ed-9b31-029254d29bb1", "tipo": "primaria", "verificadoEl": VERIFICADO}
GRA_CGT = {"organismo": "GRA", "titulo": "Capital Gains Tax brochure", "url": "https://www.gra.gm/download-file/8d0c6de0-d217-11ed-9b31-029254d29bb1", "tipo": "primaria", "verificadoEl": VERIFICADO}
GRA_RENTA = {"organismo": "GRA", "titulo": "Rental Income Tax brochure", "url": "https://www.gra.gm/download-file/8d0ce2c1-d217-11ed-9b31-029254d29bb1", "tipo": "primaria", "verificadoEl": VERIFICADO}
GRA_DIV = {"organismo": "GRA", "titulo": "Dividend Income Tax brochure", "url": "https://www.gra.gm/download-file/8d0c84c3-d217-11ed-9b31-029254d29bb1", "tipo": "primaria", "verificadoEl": VERIFICADO}
GRA_FBT = {"organismo": "GRA", "titulo": "Fringe Benefits Tax brochure", "url": "https://www.gra.gm/download-file/8d0ca971-d217-11ed-9b31-029254d29bb1", "tipo": "primaria", "verificadoEl": VERIFICADO}
GRA_INFORMAL = {"organismo": "GRA", "titulo": "Informal Sector Income Tax brochure", "url": "https://www.gra.gm/download-file/8d0cb474-d217-11ed-9b31-029254d29bb1", "tipo": "primaria", "verificadoEl": VERIFICADO}
MOF_EXPAT = {"organismo": "Ministry of Finance and Economic Affairs (publicado por la GRA)", "titulo": "Expatriate Quota Pay Roll Tax Notice, 2026", "url": "https://www.gra.gm/download-file/221f7a81-6596-11f1-b086-029254d29bb1", "tipo": "primaria", "verificadoEl": VERIFICADO}
SSHFC_NPF = {"organismo": "SSHFC", "titulo": "National Provident Fund", "url": "https://www.sshfc.gm/national-provident-fund", "tipo": "primaria", "verificadoEl": VERIFICADO}
SSHFC_FPS = {"organismo": "SSHFC", "titulo": "Federated Pension Scheme", "url": "https://www.sshfc.gm/federated-pension-scheme", "tipo": "primaria", "verificadoEl": VERIFICADO}
SSHFC_IICF = {"organismo": "SSHFC", "titulo": "Industrial Injuries Compensation Fund", "url": "https://www.sshfc.gm/industrial-injury-compensation-fund", "tipo": "primaria", "verificadoEl": VERIFICADO}
LABOUR = {"organismo": "National Assembly", "titulo": "Labour Act, 2023", "url": "https://assembly.gm/documents/16/download", "tipo": "primaria", "verificadoEl": VERIFICADO, "nota": "El texto no trae fecha de sanción; 12 de junio de 2023 es la fecha de adopción que registra NATLEX (OIT)."}
LABOUR_DESDE = "2023-06-12"


def numero(id, nombre, unidad, valor, fuente, desde=HOY, nota=None):
    f = dict(fuente)
    if nota:
        f["nota"] = nota
    return {"id": id, "nombre": nombre, "tipo": "numero", "unidad": unidad, "tramos": [{"estado": "verificado", "desde": desde, "valor": valor, "fuente": f}]}


def mapa(id, nombre, unidad, valores, etiquetas, fuente, desde=HOY, nota=None):
    f = dict(fuente)
    if nota:
        f["nota"] = nota
    return {"id": id, "nombre": nombre, "tipo": "mapa", "unidad": unidad, "etiquetas": etiquetas, "tramos": [{"estado": "verificado", "desde": desde, "valor": valores, "fuente": f}]}


# Informal Sector Income Tax: monto anual por oficio (Informal Sector Regulation 2007, enmendada en 2015).
OFICIOS = [
    ("painters", "Painters and sign writers", 3200),
    ("firewood-charcoal", "Firewood and charcoal vendors", 3000),
    ("bicycle-mechanics", "Bicycle mechanics", 1500),
    ("electronics-repair", "Radio, TV and mobile phone repairers", 5000),
    ("barbers", "Barbers", 2000),
    ("masons", "Masons", 5000),
    ("building-contractors", "Building contractors", 10000),
    ("electricians", "Electrical workers", 5000),
    ("plumbers", "Plumbers", 5000),
    ("video-shops", "Video and DVD shop owners", 5000),
    ("dvd-vendors", "DVD and cassette vendors or rentals", 1000),
    ("newspaper-vendors", "Newspaper vendors", 1000),
    ("telecentres", "Telecentre and cyber cafe operators", 5000),
    ("beach-bars", "Beach bar proprietors", 5000),
    ("handicrafts", "Handicraft, batik and wood carving vendors", 4000),
    ("fishmongers", "Fishmongers (individuals)", 2000),
    ("canoe-owners", "Canoe owners", 5000),
    ("fruit-vegetable-vendors", "Flower, fruit and vegetable vendors", 3000),
    ("market-stalls", "Market stalls", 3000),
    ("tyre-repairs", "Vehicle tyre repairers", 2000),
    ("market-butchers", "Market butchers", 3500),
    ("market-fish-vendors", "Market fish vendors", 2000),
    ("motor-mechanics", "Motor mechanics", 5000),
    ("carpenters", "Carpenters", 5000),
    ("bakery-ovens", "Bakery oven owners", 5000),
    ("bakery-others", "Other bakeries", 3000),
    ("iron-benders", "Iron benders", 2500),
    ("welders", "Welders", 10000),
    ("tailors-1", "Tailors with one machine", 1500),
    ("tailors-2", "Tailors with two machines", 2500),
    ("tailors-3", "Tailors with three machines or more", 5000),
    ("butchers-cattle", "Butchers (cattle)", 5000),
    ("butchers-small", "Butchers (small ruminants)", 3000),
    ("cattle-dealers", "Cattle dealers (cattle)", 10000),
    ("small-ruminant-dealers", "Dealers in small ruminants", 5000),
    ("meat-roasters", "Meat roasters (afra)", 3000),
    ("forex-bureaus", "Foreign exchange bureaus", 30000),
    ("hairdressers-small", "Hairdressers (small shops)", 2000),
    ("salon-owners", "Salon owners", 10000),
    ("blacksmiths", "Blacksmiths", 1500),
    ("goldsmiths", "Gold and silver smiths", 5000),
    ("photographers", "Freelance photographers", 2000),
    ("photo-studios", "Photo studio owners", 5000),
    ("visiting-artists", "Visiting musicians, artistes and entertainers (non-Gambians)", 50000),
    ("gambian-musicians", "Gambian musicians", 5000),
    ("drivers", "Taxi, gele-gele and van drivers", 3000),
    ("corner-shops", "Corner shops", 3000),
    ("others", "Other trades not listed", 5000),
]

NOTICE = {
    "monthly-months": (1, "Paid monthly (months)"),
    "biweekly-short-weeks": (2, "Paid every two weeks, under six years (weeks)"),
    "biweekly-long-months": (1, "Paid every two weeks, six years or more (months)"),
    "weekly-short-weeks": (1, "Paid weekly, under two years (weeks)"),
    "weekly-mid-weeks": (2, "Paid weekly, two to six years (weeks)"),
    "weekly-long-months": (1, "Paid weekly, six years or more (months)"),
    "daily-short-days": (1, "Paid daily or hourly, under six months (days)"),
    "daily-mid-weeks": (1, "Paid daily or hourly, six months to two years (weeks)"),
    "daily-long-weeks": (2, "Paid daily or hourly, two to six years (weeks)"),
    "six-years-months": (2, "Six years or more of continuous service (months)"),
    "employee-six-years-months": (1, "Notice the employee gives after six years (months)"),
    "fixed-term-days": (14, "Fixed-term contract (days)"),
}

datos = [
    {
        "id": "gm.paye-bands",
        "nombre": "Annual employment income tax bands",
        "tipo": "escala",
        "unidad": "GMD",
        "proximaRevision": "2027-01-01",
        "tramos": [
            {
                "estado": "verificado",
                "desde": "2025-01-01",
                "valor": [
                    {"desde": 0, "hasta": 36000, "tasa": 0},
                    {"desde": 36000, "hasta": 46000, "tasa": 5},
                    {"desde": 46000, "hasta": 56000, "tasa": 10},
                    {"desde": 56000, "hasta": 66000, "tasa": 15},
                    {"desde": 66000, "hasta": 76000, "tasa": 20},
                    {"desde": 76000, "hasta": None, "tasa": 25},
                ],
                "fuente": {**GRA_TABLA, "nota": "Las tasas salen de la tabla mensual de la GRA (de D3,000 a D100,000 al mes) y coinciden con el folleto de PAYE, su ejemplo de D50,000 al mes y la fórmula (ingreso - 76,000) x 25% + 5,000. El umbral exento de D36,000 lo confirma la FAQ de la GRA."},
            }
        ],
    },
    numero("gm.vat-rate", "Standard VAT rate", "%", 15, GRA_VAT),
    numero("gm.vat-registration-threshold", "Taxable supplies a year that make VAT registration compulsory", "GMD", 2000000, GRA_VAT),
    numero("gm.vat-voluntary-threshold", "Taxable supplies a year from which voluntary VAT registration is allowed", "GMD", 1000000, GRA_VAT),
    numero("gm.npf-employee-rate", "National Provident Fund contribution deducted from the employee", "%", 5, SSHFC_NPF),
    numero("gm.npf-employer-rate", "National Provident Fund contribution paid by the employer", "%", 10, SSHFC_NPF),
    numero("gm.npf-late-penalty-rate", "Penalty on late SSHFC contributions for each month or part of a month", "%", 2.5, SSHFC_NPF),
    numero("gm.fps-rate", "Federated Pension Scheme contribution paid by the employer", "%", 15, SSHFC_FPS),
    numero("gm.iicf-rate", "Industrial Injuries Compensation Fund contribution paid by the employer", "%", 1, SSHFC_IICF),
    numero("gm.iicf-cap", "Maximum Industrial Injuries Compensation Fund contribution a month", "GMD", 15, SSHFC_IICF, nota="La página dice «maximum contribution ceiling of D15»; las contribuciones se pagan cada mes."),
    mapa("gm.cgt-rates", "Capital gains tax rates", "%", {"individual-gain": 15, "individual-consideration": 5, "company-gain": 25, "company-consideration": 10},
         {"individual-gain": "Individuals, share of the gain", "individual-consideration": "Individuals, share of the price", "company-gain": "Companies, partnerships and trustees, share of the gain", "company-consideration": "Companies, partnerships and trustees, share of the price"}, GRA_CGT),
    numero("gm.cgt-exempt-gain", "Capital gain up to which no capital gains tax is due", "GMD", 24000, GRA_CGT),
    mapa("gm.rental-tax-rates", "Rental income tax rates on gross rent", "%", {"residential": 8, "commercial": 15}, {"residential": "Residential rent", "commercial": "Commercial rent"}, GRA_RENTA),
    numero("gm.dividend-tax-rate", "Dividend income tax rate", "%", 15, GRA_DIV),
    numero("gm.fringe-benefits-rate", "Fringe benefits tax rate", "%", 27, GRA_FBT),
    numero("gm.corporate-tax-rate", "Corporation income tax rate on net profit", "%", 27, GRA_FAQ),
    mapa("gm.minimum-tax-turnover", "Minimum tax on turnover", "%", {"audited": 1, "unaudited": 2}, {"audited": "Audited accounts", "unaudited": "Other accounts"}, GRA_FAQ),
    numero("gm.presumptive-turnover-limit", "Business turnover a year under which the 3% final turnover tax applies", "GMD", 500000, GRA_FAQ),
    numero("gm.presumptive-rate", "Final turnover tax for small businesses", "%", 3, GRA_FAQ),
    mapa("gm.informal-sector-tax", "Informal sector income tax a year by trade", "GMD", {k: v for k, _, v in OFICIOS}, {k: e for k, e, _ in OFICIOS}, GRA_INFORMAL),
    mapa("gm.expatriate-payroll-tax", "Expatriate quota payroll tax a year per expatriate", "GMD", {"ecowas": 30000, "other": 100000},
         {"ecowas": "ECOWAS citizen or special status", "other": "Not an ECOWAS citizen"}, MOF_EXPAT, desde="2026-03-10",
         nota="Aviso firmado por el ministro el 10 de marzo de 2026 (fecha manuscrita). La FAQ de la GRA todavía muestra los montos anteriores (D10,000 y D50,000), que no se cargaron."),
    mapa("gm.notice-periods", "Minimum notice periods under section 91", "numero", {k: v for k, (v, _) in NOTICE.items()}, {k: e for k, (_, e) in NOTICE.items()}, LABOUR, desde=LABOUR_DESDE),
    numero("gm.redundancy-notice-months", "Notice for a redundancy dismissal", "meses", 6, LABOUR, desde=LABOUR_DESDE),
    numero("gm.severance-months-per-year", "Severance pay in months of basic pay for each year served", "meses", 2, LABOUR, desde=LABOUR_DESDE),
    numero("gm.fixed-term-gratuity-rate", "Minimum gratuity on a fixed-term contract, share of basic pay earned", "%", 25, LABOUR, desde=LABOUR_DESDE),
    numero("gm.maternity-leave-months", "Paid maternity leave", "meses", 6, LABOUR, desde=LABOUR_DESDE),
    numero("gm.paternity-leave-days", "Paid paternity leave in working days", "dias", 10, LABOUR, desde=LABOUR_DESDE),
    numero("gm.retirement-age", "Retirement age for employees", "anios", 60, LABOUR, desde=LABOUR_DESDE),
]

salida = Path(__file__).resolve().parents[3] / "src" / "paises" / "gm" / "datos.json"
with open(salida, "w", encoding="utf-8", newline="\n") as f:
    json.dump({"mercado": "gm", "datos": datos}, f, ensure_ascii=False, indent=2)
    f.write("\n")
print(salida, len(datos))
