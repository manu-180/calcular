import { definirCalculadora, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "gt.impuesto-de-solidaridad",
  mercado: "gt",
  concepto: "propio",
  slug: "impuesto-de-solidaridad",
  estado: "publicado",
  requiere: {
    "gt.iso-tasa": "numero",
    "gt.iso-fraccion-base": "numero",
    "gt.iso-limite-activo": "numero",
  },
  campos: [
    { id: "activoNeto", tipo: "moneda", etiqueta: "Activo neto", min: 0, ayuda: "El del balance de apertura del año, o sea el cierre del año anterior." },
    { id: "ingresosBrutos", tipo: "moneda", etiqueta: "Ingresos brutos del año anterior", min: 0 },
  ],
  calcular(entrada, valores, { redondear }) {
    const fraccion = valores["gt.iso-fraccion-base"];
    const baseActivo = redondear(porcentaje(entrada.activoNeto, fraccion));
    const baseIngresos = redondear(porcentaje(entrada.ingresosBrutos, fraccion));
    const soloIngresos = entrada.activoNeto > entrada.ingresosBrutos * valores["gt.iso-limite-activo"];
    const usaIngresos = soloIngresos || baseIngresos >= baseActivo;
    const base = usaIngresos ? baseIngresos : baseActivo;
    const trimestral = redondear(porcentaje(base, valores["gt.iso-tasa"]));
    const observaciones = ["El ISO se paga dentro del mes siguiente a cada trimestre. Puede acreditarlo al ISR o acreditar el ISR al ISO."];
    if (soloIngresos) observaciones.push("Su activo neto es mucho mayor que sus ingresos, así que la ley manda calcularlo solo sobre los ingresos.");
    return { base, sobre: usaIngresos ? "Ingresos brutos" : "Activo neto", trimestral, anual: redondear(trimestral * 4), observaciones };
  },
  resultado: [
    { clave: "sobre", etiqueta: "Se calcula sobre", formato: "texto" },
    { clave: "base", etiqueta: "Base del trimestre", formato: "moneda" },
    { clave: "trimestral", etiqueta: "ISO de cada trimestre", formato: "moneda", destacada: true },
    { clave: "anual", etiqueta: "ISO del año", formato: "moneda" },
  ],
});
