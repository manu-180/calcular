import { aplicarEscala, definirCalculadora, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "gt.isr-regimen-simplificado",
  mercado: "gt",
  concepto: "retencion-honorarios",
  slug: "isr-regimen-simplificado",
  estado: "publicado",
  requiere: {
    "gt.isr-simplificado-escala": "escala",
    "gt.iva": "numero",
    "gt.isr-simplificado-minimo-retencion": "numero",
  },
  campos: [
    { id: "monto", tipo: "moneda", etiqueta: "Monto facturado", min: 0, ayuda: "El de una factura o el total del mes." },
    { id: "incluyeIva", tipo: "si-no", etiqueta: "El monto ya incluye el IVA", porDefecto: true },
  ],
  calcular(entrada, valores, { redondear }) {
    const tasaIva = valores["gt.iva"];
    const base = entrada.incluyeIva ? redondear(entrada.monto / (1 + tasaIva / 100)) : entrada.monto;
    const iva = entrada.incluyeIva ? redondear(entrada.monto - base) : redondear(porcentaje(base, tasaIva));
    const isr = redondear(aplicarEscala(valores["gt.isr-simplificado-escala"], base));
    const minimo = valores["gt.isr-simplificado-minimo-retencion"];
    const observaciones = ["El ISR se calcula sobre el monto sin IVA."];
    observaciones.push(
      base < minimo
        ? "Por un monto menor al mínimo de retención, el cliente no está obligado a retenerle: usted paga el ISR directo a la SAT."
        : "Si su cliente es agente de retención, le descuenta este ISR al pagarle y le entrega la constancia.",
    );
    return { base, iva, isr, minimo, recibe: redondear(base + iva - isr), observaciones };
  },
  resultado: [
    { clave: "base", etiqueta: "Monto sin IVA", formato: "moneda" },
    { clave: "iva", etiqueta: "IVA", formato: "moneda" },
    { clave: "isr", etiqueta: "ISR", formato: "moneda", destacada: true },
    { clave: "recibe", etiqueta: "Recibe si le retienen el ISR", formato: "moneda" },
    { clave: "minimo", etiqueta: "Mínimo de factura para la retención (sin IVA)", formato: "moneda" },
  ],
});
