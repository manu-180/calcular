import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";
import type { PuntoSerieTupla } from "@/motor/tipos";
import series from "../series.json";

const IPC = (series.series.find((s) => s.id === "mw.cpi")?.puntos ?? []) as unknown as readonly PuntoSerieTupla[];
const MESES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const OPCIONES_MES = MESES.map((m, i) => ({ valor: String(i + 1).padStart(2, "0"), etiqueta: m }));

export default definirCalculadora({
  id: "mw.capital-gains-tax-calculator",
  mercado: "mw",
  concepto: "propio",
  slug: "capital-gains-tax-calculator",
  estado: "publicado",
  requiere: {
    "mw.cpi": "serie",
    "mw.cgt-provisional-rate": "numero",
  },
  campos: [
    { id: "costo", tipo: "moneda", etiqueta: "What the asset cost you", min: 0, porDefecto: 1000000 },
    { id: "mesCompra", tipo: "opcion", etiqueta: "Month you bought or built it", opciones: OPCIONES_MES, porDefecto: "03" },
    { id: "anioCompra", tipo: "entero", etiqueta: "Year you bought or built it", min: 1991, max: 2100, porDefecto: 2015 },
    { id: "precio", tipo: "moneda", etiqueta: "Selling price", min: 0, porDefecto: 85000000 },
    { id: "mesVenta", tipo: "opcion", etiqueta: "Month of the sale", opciones: OPCIONES_MES, porDefecto: "06" },
    { id: "anioVenta", tipo: "entero", etiqueta: "Year of the sale", min: 1991, max: 2100, porDefecto: 2026 },
  ],
  calcular(e, v, { redondear }) {
    const ultimo = v["mw.cpi"];
    const compra = `${e.anioCompra}-${e.mesCompra}-01`;
    const venta = `${e.anioVenta}-${e.mesVenta}-01`;
    if (venta <= compra) throw new ErrorEntrada("The sale has to come after the month you bought the asset.", "anioVenta");
    if (venta > ultimo.fecha) throw new ErrorEntrada("The latest CPI published by the MRA is for an earlier month. Choose that month or an earlier one.", "anioVenta");
    const ipcCompra = IPC.find(([f]) => f === compra)?.[1];
    const ipcVenta = IPC.find(([f]) => f === venta)?.[1];
    if (ipcCompra === undefined) throw new ErrorEntrada("The monthly CPI here starts in January 1991. Choose that month or a later one.", "anioCompra");
    if (ipcVenta === undefined) throw new ErrorEntrada("There is no CPI for the month of the sale.", "anioVenta");
    // La MRA redondea el factor de indexación a dos decimales en los ejemplos de su aviso.
    const factor = Math.round((ipcVenta / ipcCompra) * 100) / 100;
    const base = redondear(e.costo * factor);
    const resultado = redondear(e.precio - base);
    const impuesto = resultado > 0 ? redondear(porcentaje(resultado, v["mw.cgt-provisional-rate"])) : 0;
    return {
      impuesto,
      factor,
      base,
      ganancia: resultado > 0 ? resultado : 0,
      perdida: resultado < 0 ? -resultado : 0,
    };
  },
  resultado: [
    { clave: "impuesto", etiqueta: "Provisional tax to pay", formato: "moneda", destacada: true },
    { clave: "factor", etiqueta: "Indexation factor", formato: "numero", decimales: 2 },
    { clave: "base", etiqueta: "Adjusted cost", formato: "moneda" },
    { clave: "ganancia", etiqueta: "Capital gain", formato: "moneda", ocultarSiCero: true },
    { clave: "perdida", etiqueta: "Capital loss", formato: "moneda", ocultarSiCero: true },
  ],
});
