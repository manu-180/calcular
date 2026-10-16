import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { anioFiscal, etiquetaAnio, impuestoSalarios, tope, totalAsignaciones } from "../lib/impuestos";
import { aporteMensual } from "../lib/mpf";

export default definirCalculadora({
  id: "hk.take-home-pay",
  mercado: "hk",
  concepto: "sueldo-neto",
  slug: "take-home-pay",
  estado: "publicado",
  requiere: {
    "hk.mpf-rate": "numero",
    "hk.mpf-min-relevant-income": "numero",
    "hk.mpf-max-relevant-income": "numero",
    "hk.salaries-tax-rates": "escala",
    "hk.standard-rates": "escala",
    "hk.basic-allowance": "mapa",
    "hk.married-allowance": "mapa",
    "hk.child-allowance": "mapa",
    "hk.single-parent-allowance": "mapa",
    "hk.dependent-parent-60": "mapa",
    "hk.dependent-parent-55": "mapa",
    "hk.deduction-limits": "mapa",
  },
  campos: [
    { id: "sueldo", tipo: "moneda", etiqueta: "Monthly salary", min: 0, porDefecto: 30000 },
    { id: "bono", tipo: "moneda", etiqueta: "Bonus or double pay in the year", min: 0, porDefecto: 0 },
    {
      id: "estado",
      tipo: "opcion",
      etiqueta: "Marital status",
      opciones: [
        { valor: "single", etiqueta: "Single, or married and taxed separately" },
        { valor: "married", etiqueta: "Married and your spouse has no income" },
      ],
      porDefecto: "single",
    },
    { id: "hijos", tipo: "entero", etiqueta: "Children you maintain", min: 0, max: 9, porDefecto: 0 },
  ],
  calcular(entrada, v, { redondear, fecha }) {
    if (entrada.sueldo <= 0) throw new ErrorEntrada("Enter your monthly salary.", "sueldo");
    const reglas = { tasa: v["hk.mpf-rate"], minimo: v["hk.mpf-min-relevant-income"], maximo: v["hk.mpf-max-relevant-income"] };
    const mpfMes = redondear(aporteMensual(entrada.sueldo, reglas).empleado);
    const mpfMesBono = redondear(aporteMensual(entrada.sueldo + entrada.bono, reglas).empleado);
    const mpfAnual = entrada.bono > 0 ? mpfMes * 11 + mpfMesBono : mpfMes * 12;
    const ingresoAnual = entrada.sueldo * 12 + entrada.bono;
    const anio = anioFiscal(fecha);
    const r = impuestoSalarios(
      ingresoAnual - tope(mpfAnual, enMapa(v["hk.deduction-limits"], "mpf")),
      totalAsignaciones(
        {
          basica: v["hk.basic-allowance"],
          casado: v["hk.married-allowance"],
          hijo: v["hk.child-allowance"],
          monoparental: v["hk.single-parent-allowance"],
          padres60: v["hk.dependent-parent-60"],
          padres55: v["hk.dependent-parent-55"],
        },
        { casado: entrada.estado === "married", monoparental: false, hijos: entrada.hijos, hijosRecientes: 0, padres60: 0, padres60Conviven: 0, padres55: 0, padres55Conviven: 0 },
        anio,
      ),
      v["hk.salaries-tax-rates"],
      v["hk.standard-rates"],
    );
    const impuestoAnual = redondear(r.impuesto);
    const impuestoMes = redondear(impuestoAnual / 12);
    const netoMes = redondear(entrada.sueldo - mpfMes);
    return {
      netoMes,
      mpfMes,
      impuestoAnual,
      impuestoMes,
      despuesImpuesto: redondear(netoMes - impuestoMes),
      netoAnual: redondear(ingresoAnual - mpfAnual - impuestoAnual),
      observaciones: [
        "Salaries tax isn't taken from your pay. The IRD bills it on a demand note, normally in two instalments, so it helps to set the monthly amount aside.",
        `The tax uses the ${etiquetaAnio(anio)} allowances and only MPF as a deduction.`,
      ],
    };
  },
  resultado: [
    { clave: "netoMes", etiqueta: "Monthly pay after MPF", formato: "moneda", destacada: true },
    { clave: "mpfMes", etiqueta: "Your MPF contribution each month", formato: "moneda" },
    { clave: "impuestoAnual", etiqueta: "Estimated salaries tax for the year", formato: "moneda" },
    { clave: "impuestoMes", etiqueta: "Tax to set aside each month", formato: "moneda" },
    { clave: "despuesImpuesto", etiqueta: "Monthly pay after MPF and tax", formato: "moneda" },
    { clave: "netoAnual", etiqueta: "Yearly pay after MPF and tax", formato: "moneda" },
  ],
});
