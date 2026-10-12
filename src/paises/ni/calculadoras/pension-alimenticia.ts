import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "ni.pension-alimenticia",
  mercado: "ni",
  concepto: "pension-alimentos",
  slug: "pension-alimenticia",
  estado: "publicado",
  requiere: {
    "ni.pension-alimenticia": "mapa",
    "ni.pension-alimenticia-minimo": "numero",
    "ni.pension-alimenticia-mora": "numero",
    "ni.salario-minimo": "mapa",
  },
  campos: [
    { id: "hijos", tipo: "entero", etiqueta: "Hijos que reciben la pensión", min: 1, max: 15, porDefecto: 1 },
    {
      id: "trabajo",
      tipo: "opcion",
      etiqueta: "Quien paga la pensión",
      opciones: [
        { valor: "estable", etiqueta: "Tiene trabajo estable" },
        { valor: "sin-estable", etiqueta: "No tiene trabajo estable" },
      ],
      porDefecto: "estable",
    },
    { id: "ingreso", tipo: "moneda", etiqueta: "Ingreso neto mensual de quien paga", min: 0, requerido: false, ayuda: "Lo que cobra después del INSS y el IR. Solo si tiene trabajo estable." },
    { id: "sector", tipo: "opcion-dato", dato: "ni.salario-minimo", etiqueta: "Sector de su oficio o profesión", porDefecto: "comercio-servicios-basicos" },
    { id: "otros", tipo: "si-no", etiqueta: "También reclaman otras personas (cónyuge, padres)", porDefecto: false },
    { id: "mesesAtraso", tipo: "entero", etiqueta: "Meses que lleva atrasada una cuota", ayuda: "Dejalo en 0 si está al día.", min: 0, max: 120, porDefecto: 0 },
  ],
  calcular(entrada, valores, { redondear }) {
    const p = valores["ni.pension-alimenticia"];
    const observaciones: string[] = ["Es orientativo: el monto lo fija el juez o el Ministerio de la Familia según las necesidades y los ingresos reales."];
    let porcentajeAplicado: number | null = null;
    let mensual: number;
    let porHijo: number;
    if (entrada.trabajo === "estable") {
      if (entrada.ingreso === null) throw new ErrorEntrada("Poné el ingreso neto mensual de quien paga.", "ingreso");
      const deHijos = enMapa(p, entrada.hijos === 1 ? "un-hijo" : entrada.hijos === 2 ? "dos-hijos" : "tres-o-mas");
      porcentajeAplicado = Math.min(enMapa(p, "maximo"), deHijos + (entrada.otros ? enMapa(p, "otros") : 0));
      mensual = redondear(porcentaje(entrada.ingreso, porcentajeAplicado));
      porHijo = redondear(porcentaje(entrada.ingreso, Math.min(deHijos, porcentajeAplicado)) / entrada.hijos);
    } else {
      const minimo = enMapa(valores["ni.salario-minimo"], entrada.sector);
      porHijo = redondear(porcentaje(minimo, valores["ni.pension-alimenticia-minimo"]));
      mensual = redondear(porHijo * entrada.hijos);
      observaciones.push("Sin trabajo estable, el mínimo es una parte del salario mínimo de su sector por cada hijo. El juez puede fijar más según sus bienes.");
    }
    const recargo = redondear(porcentaje(mensual, valores["ni.pension-alimenticia-mora"]) * entrada.mesesAtraso);
    if (entrada.mesesAtraso > 0) observaciones.push(`Una cuota atrasada suma un ${valores["ni.pension-alimenticia-mora"]} % por cada mes de atraso.`);
    return { porcentaje: porcentajeAplicado, mensual, porHijo, recargo, observaciones };
  },
  resultado: [
    { clave: "porcentaje", etiqueta: "Porcentaje de los ingresos netos", formato: "porcentaje" },
    { clave: "mensual", etiqueta: "Pensión mensual", formato: "moneda", destacada: true },
    { clave: "porHijo", etiqueta: "Por cada hijo", formato: "moneda" },
    { clave: "recargo", etiqueta: "Recargo por los meses de atraso", formato: "moneda", ocultarSiCero: true },
  ],
});
