import { aplicarEscalaMarginal, definirCalculadora, enMapa, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "pe.gastos-deducibles",
  mercado: "pe",
  concepto: "propio",
  slug: "gastos-deducibles",
  estado: "publicado",
  requiere: {
    "pe.uit": "numero",
    "pe.gasto-deducible": "mapa",
    "pe.tope-gastos-deducibles": "numero",
    "pe.deduccion-renta-trabajo": "numero",
    "pe.escala-renta-trabajo": "escala",
  },
  campos: [
    {
      id: "ingresos",
      tipo: "moneda",
      etiqueta: "Tus ingresos de trabajo del año",
      ayuda: "Sueldos, gratificaciones y bonificaciones. Si das recibos por honorarios, súmalos después de restar su deducción del 20 %.",
      min: 0,
    },
    { id: "restaurantes", tipo: "moneda", etiqueta: "Gastos en restaurantes, bares y hoteles", min: 0, requerido: false },
    { id: "medicos", tipo: "moneda", etiqueta: "Médicos y odontólogos", min: 0, requerido: false },
    { id: "servicios", tipo: "moneda", etiqueta: "Otros profesionales y oficios con recibo por honorarios", min: 0, requerido: false },
    { id: "alquiler", tipo: "moneda", etiqueta: "Alquiler de tu vivienda", min: 0, requerido: false },
    { id: "essaludHogar", tipo: "moneda", etiqueta: "EsSalud que pagaste por tu trabajadora del hogar", min: 0, requerido: false },
  ],
  calcular(entrada, valores, { redondear }) {
    const uit = valores["pe.uit"];
    const pct = valores["pe.gasto-deducible"];
    const porTipo = {
      restaurantes: redondear(porcentaje(entrada.restaurantes ?? 0, enMapa(pct, "restaurantes"))),
      medicos: redondear(porcentaje(entrada.medicos ?? 0, enMapa(pct, "medicos"))),
      servicios: redondear(porcentaje(entrada.servicios ?? 0, enMapa(pct, "servicios"))),
      alquiler: redondear(porcentaje(entrada.alquiler ?? 0, enMapa(pct, "alquiler"))),
      essaludHogar: redondear(porcentaje(entrada.essaludHogar ?? 0, enMapa(pct, "essalud-hogar"))),
    };
    const suma = redondear(porTipo.restaurantes + porTipo.medicos + porTipo.servicios + porTipo.alquiler + porTipo.essaludHogar);
    const tope = redondear(valores["pe.tope-gastos-deducibles"] * uit);
    const deduccion = Math.min(suma, tope);
    const escala = valores["pe.escala-renta-trabajo"].map((f) => ({ ...f, desde: f.desde * uit, hasta: f.hasta === null ? null : f.hasta * uit }));
    const base = Math.max(0, entrada.ingresos - valores["pe.deduccion-renta-trabajo"] * uit);
    const impuestoSin = redondear(aplicarEscalaMarginal(escala, base));
    const impuestoCon = redondear(aplicarEscalaMarginal(escala, Math.max(0, base - deduccion)));
    const observaciones: string[] = [];
    if (suma > tope) observaciones.push(`Tus gastos pasan el tope de ${valores["pe.tope-gastos-deducibles"]} UIT: solo se deduce hasta el tope.`);
    if (base === 0) {
      observaciones.push(`Con ingresos de hasta ${valores["pe.deduccion-renta-trabajo"]} UIT en el año no pagas impuesto a la renta de trabajo, así que la deducción no te devuelve nada.`);
    }
    observaciones.push("Solo cuentan los gastos con comprobante electrónico a tu nombre (DNI o RUC) y, desde S/ 2,000, pagados con medio de pago bancario.");
    return { ...porTipo, suma, tope, deduccion, impuestoSin, impuestoCon, ahorro: redondear(impuestoSin - impuestoCon), observaciones };
  },
  resultado: [
    { clave: "restaurantes", etiqueta: "Deducible por restaurantes y hoteles", formato: "moneda", ocultarSiCero: true },
    { clave: "medicos", etiqueta: "Deducible por médicos y odontólogos", formato: "moneda", ocultarSiCero: true },
    { clave: "servicios", etiqueta: "Deducible por otros profesionales", formato: "moneda", ocultarSiCero: true },
    { clave: "alquiler", etiqueta: "Deducible por alquiler", formato: "moneda", ocultarSiCero: true },
    { clave: "essaludHogar", etiqueta: "Deducible por EsSalud del hogar", formato: "moneda", ocultarSiCero: true },
    { clave: "deduccion", etiqueta: "Deducción adicional que aplicas", formato: "moneda" },
    { clave: "tope", etiqueta: "Tope de la deducción adicional", formato: "moneda" },
    { clave: "impuestoSin", etiqueta: "Impuesto del año sin gastos deducibles", formato: "moneda" },
    { clave: "impuestoCon", etiqueta: "Impuesto del año con gastos deducibles", formato: "moneda" },
    { clave: "ahorro", etiqueta: "Impuesto que te ahorras (o te devuelven)", formato: "moneda", destacada: true },
  ],
});
