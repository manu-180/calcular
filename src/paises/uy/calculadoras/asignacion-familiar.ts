import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "uy.asignacion-familiar",
  mercado: "uy",
  concepto: "propio",
  slug: "asignacion-familiar",
  estado: "publicado",
  requiere: {
    "uy.afam-15084": "mapa",
  },
  campos: [
    {
      id: "ingresos",
      tipo: "moneda",
      etiqueta: "Ingresos nominales del hogar por mes",
      ayuda: "Sumá los sueldos, jubilaciones y otros ingresos de quienes viven en el hogar.",
      min: 0,
    },
    { id: "hijos", tipo: "entero", etiqueta: "Hijos o menores a cargo", min: 1, max: 15, porDefecto: 1 },
    { id: "discapacidad", tipo: "entero", etiqueta: "De ellos, cuántos tienen alguna discapacidad", min: 0, max: 15, porDefecto: 0 },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.hijos < 1) throw new ErrorEntrada("Tiene que haber al menos un hijo o menor a cargo.", "hijos");
    if (entrada.discapacidad > entrada.hijos) throw new ErrorEntrada("No pueden ser más que los hijos a cargo.", "discapacidad");
    const t = valores["uy.afam-15084"];
    const tope1 = enMapa(t, "tope1");
    const tope2 = redondear(enMapa(t, "tope2") + enMapa(t, "adicional") * Math.max(0, entrada.hijos - 2));
    const porHijo = entrada.ingresos <= tope1 ? enMapa(t, "monto1") : entrada.ingresos <= tope2 ? enMapa(t, "monto2") : 0;
    const mensual = redondear(porHijo * (entrada.hijos + entrada.discapacidad));
    const observaciones: string[] = [];
    if (porHijo === 0) observaciones.push("Con esos ingresos no se cobra la asignación, pero se mantiene el derecho a la atención materno infantil del BPS.");
    observaciones.push("Se paga cada dos meses. Hay otra asignación, la del Plan de Equidad, para hogares vulnerables, con montos distintos.");
    return { porHijo, topeHogar: tope2, mensual, bimestral: redondear(mensual * 2), observaciones };
  },
  resultado: [
    { clave: "porHijo", etiqueta: "Monto por hijo, por mes", formato: "moneda" },
    { clave: "topeHogar", etiqueta: "Tope de ingresos para tu hogar", formato: "moneda" },
    { clave: "mensual", etiqueta: "Asignación por mes", formato: "moneda" },
    { clave: "bimestral", etiqueta: "Cobro cada dos meses", formato: "moneda", destacada: true },
  ],
});
