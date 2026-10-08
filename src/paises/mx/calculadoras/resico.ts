import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "mx.resico",
  mercado: "mx",
  concepto: "regimen-simplificado",
  slug: "resico",
  estado: "publicado",
  requiere: {
    "mx.tasas-resico": "escala",
    "mx.tope-resico": "numero",
  },
  campos: [
    { id: "ingresos", tipo: "moneda", etiqueta: "Ingresos cobrados en el mes, sin IVA", min: 0, ayuda: "Solo lo que ya cobraste y facturaste en el mes." },
    { id: "retenido", tipo: "moneda", etiqueta: "ISR que te retuvieron empresas en el mes", min: 0, porDefecto: 0, ayuda: "Si facturas a personas morales, aparece en tus facturas como ISR retenido." },
  ],
  calcular(entrada, valores, { redondear }) {
    const tope = valores["mx.tope-resico"];
    if (entrada.ingresos > tope) throw new ErrorEntrada("Con esos ingresos ya no puedes tributar en el RESICO.", "ingresos");
    const tabla = valores["mx.tasas-resico"];
    let fila = tabla[0];
    for (const f of tabla) if (entrada.ingresos >= f.desde) fila = f;
    const isr = redondear((entrada.ingresos * fila.tasa) / 100);
    return {
      tasa: entrada.ingresos > 0 ? fila.tasa : 0,
      isr,
      retenido: entrada.retenido,
      pagar: redondear(Math.max(0, isr - entrada.retenido)),
      observaciones: ["La tasa se aplica a todo lo que cobraste en el mes, sin deducciones."],
    };
  },
  resultado: [
    { clave: "tasa", etiqueta: "Tasa que te toca", formato: "porcentaje" },
    { clave: "isr", etiqueta: "ISR del mes", formato: "moneda" },
    { clave: "retenido", etiqueta: "ISR que ya te retuvieron", formato: "moneda", ocultarSiCero: true },
    { clave: "pagar", etiqueta: "ISR a pagar", formato: "moneda", destacada: true },
  ],
});
