import { aplicarEscalaMarginal, definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "uy.irpf-profesional",
  mercado: "uy",
  concepto: "retencion-honorarios",
  slug: "irpf-profesional",
  estado: "publicado",
  requiere: {
    "uy.bpc": "numero",
    "uy.irpf-escala-anual": "escala",
    "uy.irpf-ficto-independientes": "numero",
    "uy.irpf-deducciones-umbral-anual": "numero",
    "uy.irpf-deducciones-tasa-baja": "numero",
    "uy.irpf-deducciones-tasa-alta": "numero",
    "uy.irpf-deduccion-hijo": "numero",
  },
  campos: [
    { id: "facturacion", tipo: "moneda", etiqueta: "Lo que facturás en el año, sin IVA", min: 0 },
    {
      id: "aportes",
      tipo: "moneda",
      etiqueta: "Aportes del año a tu caja (Profesional, BPS) y Fonasa",
      ayuda: "También el Fondo de Solidaridad si lo pagás.",
      min: 0,
      porDefecto: 0,
    },
    { id: "hijos", tipo: "entero", etiqueta: "Hijos menores a cargo", min: 0, max: 15, porDefecto: 0 },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.facturacion <= 0) throw new ErrorEntrada("Escribí lo que facturás en el año.", "facturacion");
    const bpc = valores["uy.bpc"];
    const renta = redondear(entrada.facturacion - porcentaje(entrada.facturacion, valores["uy.irpf-ficto-independientes"]));
    const escala = valores["uy.irpf-escala-anual"].map((f) => ({ desde: f.desde * bpc, hasta: f.hasta === null ? null : f.hasta * bpc, tasa: f.tasa }));
    const impuestoEscala = redondear(aplicarEscalaMarginal(escala, renta));
    const deducciones = redondear(entrada.aportes + entrada.hijos * valores["uy.irpf-deduccion-hijo"] * bpc);
    const tasaDeducciones = entrada.facturacion <= valores["uy.irpf-deducciones-umbral-anual"] * bpc ? valores["uy.irpf-deducciones-tasa-baja"] : valores["uy.irpf-deducciones-tasa-alta"];
    const descuento = redondear(porcentaje(deducciones, tasaDeducciones));
    const irpf = Math.max(0, redondear(impuestoEscala - descuento));
    return {
      renta,
      impuestoEscala,
      descuento,
      irpf,
      porMes: redondear(irpf / 12),
      efectiva: (irpf / entrada.facturacion) * 100,
      observaciones: [
        "Es el IRPF de tus servicios personales si no optaste por IRAE. Si también tenés sueldo, la DGI suma todo en la declaración anual."
      ],
    };
  },
  resultado: [
    { clave: "renta", etiqueta: "Renta gravada (facturación menos los gastos fictos)", formato: "moneda" },
    { clave: "impuestoEscala", etiqueta: "Impuesto por la escala anual", formato: "moneda" },
    { clave: "descuento", etiqueta: "Descuento por deducciones", formato: "moneda" },
    { clave: "irpf", etiqueta: "IRPF del año", formato: "moneda", destacada: true },
    { clave: "porMes", etiqueta: "Equivale por mes a", formato: "moneda" },
    { clave: "efectiva", etiqueta: "Parte de tu facturación", formato: "porcentaje" },
  ],
});
