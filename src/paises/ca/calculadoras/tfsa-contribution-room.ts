import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { validarIngreso } from "../lib/impuestos";

export default definirCalculadora({
  id: "ca.tfsa-contribution-room",
  mercado: "ca",
  concepto: "propio",
  slug: "tfsa-contribution-room",
  estado: "publicado",
  requiere: {
    "ca.tfsa-annual-limits": "mapa",
  },
  campos: [
    { id: "desde", tipo: "entero", etiqueta: "Year you turned 18 (or became a resident, if later)", min: 1950, max: 2100, porDefecto: 2009 },
    { id: "aportes", tipo: "moneda", etiqueta: "Total contributions you have made since then", min: 0, porDefecto: 0 },
    { id: "retiros", tipo: "moneda", etiqueta: "Total withdrawals made before this year", min: 0, porDefecto: 0 },
  ],
  calcular(entrada, v, { redondear, fecha }) {
    validarIngreso(entrada.aportes, "aportes");
    validarIngreso(entrada.retiros, "retiros");
    const limites = v["ca.tfsa-annual-limits"];
    const anioActual = Number(fecha.slice(0, 4));
    if (!(String(anioActual) in limites)) throw new ErrorEntrada({ codigo: "calculo-fallido" });
    if (entrada.desde > anioActual) throw new ErrorEntrada("That year is still to come.", "desde");
    let acumulado = 0;
    let anios = 0;
    for (let a = Math.max(2009, entrada.desde); a <= anioActual; a++) {
      acumulado += limites[String(a)] ?? 0;
      anios++;
    }
    const espacio = redondear(acumulado + entrada.retiros - entrada.aportes);
    const observaciones: string[] = [];
    if (espacio < 0) observaciones.push("Your contributions are above your room. Check your TFSA room statement in CRA My Account before you add more.");
    return {
      espacio,
      acumulado: redondear(acumulado),
      anual: limites[String(anioActual)],
      anios,
      observaciones,
    };
  },
  resultado: [
    { clave: "espacio", etiqueta: "TFSA contribution room available now", formato: "moneda", destacada: true },
    { clave: "acumulado", etiqueta: "Total dollar limits since you became eligible", formato: "moneda" },
    { clave: "anual", etiqueta: "Dollar limit this year", formato: "moneda" },
    { clave: "anios", etiqueta: "Years counted", formato: "numero", decimales: 0 },
  ],
});
