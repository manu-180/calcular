import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "bn.corporate-tax-calculator",
  mercado: "bn",
  concepto: "propio",
  slug: "corporate-tax-calculator",
  estado: "publicado",
  requiere: {
    "bn.corporate-tax-rate": "numero",
    "bn.threshold-first-band": "numero",
    "bn.threshold-first-share": "numero",
    "bn.threshold-second-band": "numero",
    "bn.threshold-second-share": "numero",
    "bn.new-company-exempt": "numero",
    "bn.new-company-years": "numero",
    "bn.return-failure-fine": "numero",
  },
  campos: [
    { id: "ingreso", tipo: "moneda", etiqueta: "Chargeable income for the year of assessment", min: 0, porDefecto: 500000, ayuda: "Profit after allowable deductions and capital allowances." },
    {
      id: "tipo",
      tipo: "opcion",
      etiqueta: "Company",
      porDefecto: "existing",
      opciones: [
        { valor: "existing", etiqueta: "Existing company" },
        { valor: "new", etiqueta: "Newly incorporated, in its first 3 years of assessment" },
      ],
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.ingreso <= 0) throw new ErrorEntrada("Enter the chargeable income.", "ingreso");
    const tasa = v["bn.corporate-tax-rate"];
    const primera = v["bn.threshold-first-band"];
    const segunda = v["bn.threshold-second-band"];
    const exenta = v["bn.new-company-exempt"];
    const compartirSegunda = v["bn.threshold-second-share"];
    let tramo1 = 0;
    let tramo2 = 0;
    let tramo3 = 0;
    let exento = 0;
    if (e.tipo === "new") {
      exento = Math.min(e.ingreso, exenta);
      const resto = e.ingreso - exento;
      tramo2 = redondear(porcentaje(porcentaje(Math.min(resto, segunda), tasa), compartirSegunda));
      tramo3 = redondear(porcentaje(Math.max(resto - segunda, 0), tasa));
    } else {
      tramo1 = redondear(porcentaje(porcentaje(Math.min(e.ingreso, primera), tasa), v["bn.threshold-first-share"]));
      tramo2 = redondear(porcentaje(porcentaje(Math.min(Math.max(e.ingreso - primera, 0), segunda), tasa), compartirSegunda));
      tramo3 = redondear(porcentaje(Math.max(e.ingreso - primera - segunda, 0), tasa));
    }
    const impuesto = redondear(tramo1 + tramo2 + tramo3);
    return {
      impuesto,
      tramo1,
      tramo2,
      tramo3,
      exento: redondear(exento),
      despues: redondear(e.ingreso - impuesto),
      tasaEfectiva: (impuesto / e.ingreso) * 100,
      completo: redondear(porcentaje(e.ingreso, tasa)),
    };
  },
  resultado: [
    { clave: "impuesto", etiqueta: "Corporate income tax", formato: "moneda", destacada: true },
    { clave: "tramo1", etiqueta: "Tax on the first slice (reduced)", formato: "moneda", ocultarSiCero: true },
    { clave: "tramo2", etiqueta: "Tax on the next slice (half rate)", formato: "moneda", ocultarSiCero: true },
    { clave: "tramo3", etiqueta: "Tax on the rest (full rate)", formato: "moneda", ocultarSiCero: true },
    { clave: "exento", etiqueta: "Income exempt under the new company relief", formato: "moneda", ocultarSiCero: true },
    { clave: "despues", etiqueta: "Income after tax", formato: "moneda" },
    { clave: "tasaEfectiva", etiqueta: "Effective tax rate", formato: "porcentaje", decimales: 2 },
    { clave: "completo", etiqueta: "Tax at the full rate with no threshold", formato: "moneda" },
  ],
});
