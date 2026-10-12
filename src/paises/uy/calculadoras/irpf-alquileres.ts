import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "uy.irpf-alquileres",
  mercado: "uy",
  concepto: "propio",
  slug: "irpf-alquileres",
  estado: "publicado",
  requiere: {
    "uy.bpc": "numero",
    "uy.irpf-arrendamientos": "numero",
    "uy.irpf-arrendamientos-exento": "numero",
  },
  campos: [
    { id: "alquiler", tipo: "moneda", etiqueta: "Alquiler que cobrás por mes", min: 0 },
    { id: "meses", tipo: "entero", etiqueta: "Meses alquilados en el año", min: 1, max: 12, porDefecto: 12 },
    {
      id: "gastos",
      tipo: "moneda",
      etiqueta: "Gastos deducibles del año",
      ayuda: "Comisión de la inmobiliaria con IVA, honorarios del contrato, Contribución Inmobiliaria e Impuesto de Primaria.",
      min: 0,
      porDefecto: 0,
    },
    {
      id: "otrasRentas",
      tipo: "si-no",
      etiqueta: "Tenés otras rentas de capital de más de 3 BPC en el año",
      ayuda: "Por ejemplo, intereses o dividendos. Si las tenés, no corre la exoneración.",
      porDefecto: false,
    },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.alquiler <= 0) throw new ErrorEntrada("Escribí cuánto cobrás de alquiler.", "alquiler");
    const bruto = redondear(entrada.alquiler * entrada.meses);
    const limite = redondear(valores["uy.irpf-arrendamientos-exento"] * valores["uy.bpc"]);
    const renta = Math.max(0, redondear(bruto - entrada.gastos));
    const exento = bruto <= limite && !entrada.otrasRentas;
    const impuesto = exento ? 0 : redondear(porcentaje(renta, valores["uy.irpf-arrendamientos"]));
    const observaciones: string[] = [];
    if (exento) observaciones.push("Tus alquileres del año no pasan el límite: podés quedar exonerado, siempre que autorices el levantamiento del secreto bancario.");
    observaciones.push("Si tenés otros alquileres o rentas de capital, se suman en la declaración jurada y el resultado puede cambiar.");
    return { bruto, limite, renta, impuesto, porMes: redondear(impuesto / entrada.meses), exento: exento ? "Sí" : "No", observaciones };
  },
  resultado: [
    { clave: "bruto", etiqueta: "Alquileres del año", formato: "moneda" },
    { clave: "limite", etiqueta: "Límite de la exoneración", formato: "moneda" },
    { clave: "exento", etiqueta: "Quedás exonerado", formato: "texto" },
    { clave: "renta", etiqueta: "Renta gravada (alquileres menos gastos)", formato: "moneda" },
    { clave: "impuesto", etiqueta: "IRPF del año por alquileres", formato: "moneda", destacada: true },
    { clave: "porMes", etiqueta: "IRPF por mes alquilado", formato: "moneda" },
  ],
});
