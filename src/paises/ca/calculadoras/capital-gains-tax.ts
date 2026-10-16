import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { aportesEmpleado, impuestoAnual, PROVINCIAS, REQUIERE_RENTA, validarIngreso } from "../lib/impuestos";

export default definirCalculadora({
  id: "ca.capital-gains-tax",
  mercado: "ca",
  concepto: "propio",
  slug: "capital-gains-tax",
  estado: "publicado",
  requiere: {
    ...REQUIERE_RENTA,
    "ca.capital-gains-inclusion-rate": "numero",
  },
  campos: [
    { id: "provincia", tipo: "opcion", etiqueta: "Province or territory where you live", opciones: PROVINCIAS, porDefecto: "on" },
    { id: "venta", tipo: "moneda", etiqueta: "Selling price after selling costs", min: 0, porDefecto: 50000 },
    { id: "costo", tipo: "moneda", etiqueta: "What you paid (adjusted cost base)", min: 0, porDefecto: 30000 },
    { id: "empleo", tipo: "moneda", etiqueta: "Your employment income for 2026", min: 0, porDefecto: 70000 },
  ],
  calcular(entrada, v, { redondear }) {
    validarIngreso(entrada.venta, "venta");
    validarIngreso(entrada.costo, "costo");
    validarIngreso(entrada.empleo, "empleo");
    const ganancia = entrada.venta - entrada.costo;
    if (ganancia <= 0) throw new ErrorEntrada("There is no capital gain: the selling price is not above what you paid.", "venta");
    const inclusion = v["ca.capital-gains-inclusion-rate"];
    const gravable = redondear(porcentaje(ganancia, inclusion));
    const aportes = aportesEmpleado(entrada.empleo, v, false, entrada.provincia === "qc");
    const base = { provincia: entrada.provincia, empleo: entrada.empleo, otros: 0, deducciones: 0, aportes };
    const sin = impuestoAnual(base, v).total;
    const con = impuestoAnual({ ...base, otros: gravable }, v).total;
    const impuesto = redondear(con - sin);
    return {
      impuesto,
      neto: redondear(ganancia - impuesto),
      ganancia: redondear(ganancia),
      gravable,
      inclusion,
      efectiva: (impuesto / ganancia) * 100,
    };
  },
  resultado: [
    { clave: "impuesto", etiqueta: "Tax on this capital gain", formato: "moneda", destacada: true },
    { clave: "neto", etiqueta: "Gain you keep after tax", formato: "moneda" },
    { clave: "ganancia", etiqueta: "Capital gain", formato: "moneda" },
    { clave: "gravable", etiqueta: "Taxable capital gain", formato: "moneda" },
    { clave: "inclusion", etiqueta: "Inclusion rate", formato: "porcentaje", decimales: 0 },
    { clave: "efectiva", etiqueta: "Tax as a share of the whole gain", formato: "porcentaje", decimales: 2 },
  ],
});
