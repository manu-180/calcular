"""Escribe src/paises/us-es/lib/datos.ts: nombres en español de los datos y series de us, con sus etiquetas."""
import json
import pathlib

RAIZ = pathlib.Path(__file__).resolve().parents[3]

ESTADOS = {"single": "Soltero", "mfj": "Casado, declaración conjunta", "mfs": "Casado, declaración por separado", "hoh": "Cabeza de familia"}
MFJ_OTRO = {"mfj": "Casado, declaración conjunta", "other": "Otros estados civiles"}

NOMBRES = {
    "us.tax-brackets-single": ("Tasas del impuesto federal sobre el ingreso, soltero", None),
    "us.tax-brackets-mfj": ("Tasas del impuesto federal sobre el ingreso, casado con declaración conjunta", None),
    "us.tax-brackets-mfs": ("Tasas del impuesto federal sobre el ingreso, casado con declaración por separado", None),
    "us.tax-brackets-hoh": ("Tasas del impuesto federal sobre el ingreso, cabeza de familia", None),
    "us.standard-deduction": ("Deducción estándar", ESTADOS),
    "us.additional-standard-deduction": ("Deducción estándar adicional por 65 años o más o ceguera", {"married": "Casado o cónyuge sobreviviente", "unmarried": "No casado"}),
    "us.senior-deduction": ("Deducción adicional para mayores de 65, por persona elegible", None),
    "us.senior-deduction-threshold": ("MAGI desde el que se reduce la deducción para mayores", MFJ_OTRO),
    "us.senior-deduction-phaseout-rate": ("Reducción de la deducción para mayores por cada dólar de MAGI sobre el umbral", None),
    "us.tips-deduction-max": ("Deducción máxima por propinas que califican", None),
    "us.overtime-deduction-max": ("Deducción máxima por horas extras que califican", MFJ_OTRO),
    "us.tips-overtime-threshold": ("MAGI desde el que se reducen las deducciones por propinas y horas extras", MFJ_OTRO),
    "us.tips-overtime-phaseout-step": ("Reducción por cada 1,000 dólares completos de MAGI sobre el umbral", None),
    "us.cg-zero-max": ("Límite superior de la tasa de 0% para ganancias de capital a largo plazo", ESTADOS),
    "us.cg-15-max": ("Límite superior de la tasa de 15% para ganancias de capital a largo plazo", ESTADOS),
    "us.niit-rate": ("Tasa del impuesto sobre ingresos netos de inversión", None),
    "us.niit-threshold": ("Umbral del impuesto sobre ingresos netos de inversión", ESTADOS),
    "us.social-security-rate": ("Tasa del impuesto del Seguro Social, parte del empleado", None),
    "us.medicare-rate": ("Tasa del impuesto de Medicare, parte del empleado", None),
    "us.additional-medicare-rate": ("Tasa del impuesto adicional de Medicare", None),
    "us.additional-medicare-threshold": ("Umbral del impuesto adicional de Medicare", ESTADOS),
    "us.additional-medicare-withholding": ("Salarios desde los que el empleador retiene el impuesto adicional de Medicare", None),
    "us.social-security-wage-base": ("Base salarial del Seguro Social", None),
    "us.se-earnings-factor": ("Parte de la ganancia neta por cuenta propia sujeta al impuesto", None),
    "us.se-minimum": ("Ingreso neto mínimo para el impuesto sobre el trabajo por cuenta propia", None),
    "us.ctc-amount": ("Crédito tributario por hijo que califica", None),
    "us.actc-max": ("Parte reembolsable del crédito tributario por hijo", None),
    "us.odc-amount": ("Crédito por otros dependientes", None),
    "us.ctc-threshold": ("MAGI desde el que se reduce el crédito tributario por hijos", MFJ_OTRO),
    "us.ctc-phaseout-rate": ("Reducción del crédito por hijos por cada 1,000 dólares de MAGI sobre el umbral", None),
    "us.actc-earned-income-floor": ("Ingreso del trabajo necesario antes de que empiece el crédito reembolsable", None),
    "us.actc-rate": ("Tasa del crédito reembolsable sobre el ingreso del trabajo que supera el piso", None),
    "us.min-wage-federal": ("Salario mínimo federal", None),
    "us.overtime-hours": ("Horas semanales a partir de las que corren las horas extras (FLSA)", None),
    "us.overtime-multiplier": ("Multiplicador del pago de horas extras (FLSA)", None),
    "us.supplemental-rate": ("Tasa fija opcional de retención sobre salarios suplementarios", None),
    "us.supplemental-rate-over-1m": ("Tasa obligatoria de retención sobre salarios suplementarios de más de 1 millón", None),
    "us.supplemental-threshold": ("Salarios suplementarios desde los que se aplica la tasa obligatoria", None),
    "us.futa-rate": ("Tasa del impuesto FUTA", None),
    "us.futa-credit": ("Crédito máximo del FUTA por el impuesto estatal de desempleo", None),
    "us.futa-wage-base": ("Base salarial del FUTA por empleado", None),
    "us.401k-limit": ("Límite de aporte al 401(k)", None),
    "us.401k-catch-up": ("Aporte adicional (catch-up) al 401(k), 50 años o más", None),
    "us.401k-catch-up-60-63": ("Aporte adicional (catch-up) al 401(k), de 60 a 63 años", None),
    "us.ira-limit": ("Límite de aporte a una IRA", None),
    "us.ira-catch-up": ("Aporte adicional (catch-up) a una IRA, 50 años o más", None),
    "us.roth-phaseout-start": ("MAGI desde el que se reduce el límite de la Roth IRA", ESTADOS),
    "us.roth-phaseout-end": ("MAGI en el que el límite de la Roth IRA llega a cero", ESTADOS),
    "us.roth-minimum": ("Límite reducido mínimo de la Roth IRA antes de llegar a cero", None),
    "us.hsa-self-only": ("Límite de aporte a la HSA, cobertura individual", None),
    "us.hsa-family": ("Límite de aporte a la HSA, cobertura familiar", None),
    "us.hsa-catch-up": ("Aporte adicional a la HSA, 55 años o más", None),
    "us.rmd-age": ("Edad a la que empiezan las distribuciones mínimas requeridas", None),
    "us.pia-formula": ("Fórmula del PIA del Seguro Social para quienes son elegibles por primera vez en 2026", None),
    "us.estimated-tax-min": ("Impuesto adeudado después de la retención que obliga a hacer pagos estimados", None),
    "us.safe-harbor-current": ("Porcentaje seguro del impuesto de este año", None),
    "us.safe-harbor-prior": ("Porcentaje seguro del impuesto del año pasado", None),
    "us.safe-harbor-prior-high": ("Porcentaje seguro del impuesto del año pasado con AGI más alto", None),
    "us.safe-harbor-agi": ("AGI del año anterior desde el que se aplica la regla del 110%", {"mfs": "Casado, declaración por separado", "other": "Otros estados civiles"}),
    "us.mileage-business": ("Tarifa estándar por milla para negocios", None),
    "us.mileage-medical": ("Tarifa estándar por milla para fines médicos y mudanzas", None),
    "us.mileage-charity": ("Tarifa estándar por milla para caridad", None),
    "us.cpi-u": ("Índice de Precios al Consumidor (CPI-U)", None),
}

datos = json.load(open(RAIZ / "src" / "paises" / "us" / "datos.json", encoding="utf-8"))["datos"]
por_id = {d["id"]: d for d in datos}

entradas = dict(NOMBRES)
tabla = por_id["us.rmd-uniform-table"]["etiquetas"]
entradas["us.rmd-uniform-table"] = (
    "Tabla Uniforme de Vida (Uniform Lifetime Table), período de distribución por edad",
    {k: ("120 años o más" if k == "120" else f"{k} años") for k in tabla},
)
sustituciones = {
    "(no state minimum wage)": "(sin salario mínimo estatal)",
    "(businesses with sales over $110,000)": "(negocios con ventas de más de $110,000)",
    "(6 or more employees)": "(6 empleados o más)",
    "(NYC, Long Island and Westchester)": "(NYC, Long Island y Westchester)",
    "(rest of the state)": "(resto del estado)",
    "(employers with gross receipts of $405,000 or more)": "(empleadores con ingresos brutos de $405,000 o más)",
    "(standard)": "(general)",
    "(Portland metro)": "(área metropolitana de Portland)",
    "(nonurban counties)": "(condados no urbanos)",
}
estados_es = {}
for k, v in por_id["us.min-wage-state"]["etiquetas"].items():
    for a, b in sustituciones.items():
        v = v.replace(a, b)
    estados_es[k] = v.replace("District of Columbia", "Distrito de Columbia")
entradas["us.min-wage-state"] = ("Salario mínimo estatal por hora", estados_es)

faltan = [d["id"] for d in datos if d["id"] not in entradas]
if faltan:
    raise SystemExit(f"faltan nombres: {faltan}")


def js(s):
    return json.dumps(s, ensure_ascii=False)


lineas = ["export const AVISOS = {};", "", "export const DATOS = {"]
for id_, (nombre, etiquetas) in entradas.items():
    if etiquetas:
        lineas.append(f"  {js(id_)}: {{")
        lineas.append(f"    nombre: {js(nombre)},")
        lineas.append("    etiquetas: { " + ", ".join(f"{js(k)}: {js(v)}" for k, v in etiquetas.items()) + " },")
        lineas.append("  },")
    else:
        lineas.append(f"  {js(id_)}: {{ nombre: {js(nombre)} }},")
lineas += ["};", ""]
destino = RAIZ / "src" / "paises" / "us-es" / "lib" / "datos.ts"
with open(destino, "w", encoding="utf-8", newline="\n") as f:
    f.write("\n".join(lineas))
print(len(entradas), "datos")
