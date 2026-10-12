import { aplicarEscalaMarginal, definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "uy.devolucion-irpf",
  mercado: "uy",
  concepto: "propio",
  slug: "devolucion-irpf",
  estado: "publicado",
  requiere: {
    "uy.bpc": "numero",
    "uy.irpf-escala-anual": "escala",
    "uy.irpf-deducciones-umbral-anual": "numero",
    "uy.irpf-deducciones-tasa-baja": "numero",
    "uy.irpf-deducciones-tasa-alta": "numero",
    "uy.irpf-deduccion-hijo": "numero",
    "uy.irpf-deduccion-hijo-discapacidad": "numero",
  },
  campos: [
    {
      id: "ingresos",
      tipo: "moneda",
      etiqueta: "Sueldos nominales del año, sin aguinaldo ni salario vacacional",
      ayuda: "Sumá lo que cobraste de enero a diciembre en tus recibos.",
      min: 0,
    },
    { id: "aguinaldoSv", tipo: "moneda", etiqueta: "Aguinaldo y salario vacacional del año", min: 0, porDefecto: 0 },
    {
      id: "aportes",
      tipo: "moneda",
      etiqueta: "Aportes personales del año (montepío, Fonasa y FRL)",
      ayuda: "Incluí los aportes que te descontaron del aguinaldo.",
      min: 0,
      porDefecto: 0,
    },
    { id: "hijos", tipo: "entero", etiqueta: "Hijos menores a cargo", min: 0, max: 15, porDefecto: 0 },
    { id: "hijosDiscapacidad", tipo: "entero", etiqueta: "Hijos con discapacidad a cargo", min: 0, max: 15, porDefecto: 0 },
    { id: "compartida", tipo: "si-no", etiqueta: "La deducción por hijos se comparte con el otro progenitor", porDefecto: false },
    {
      id: "otras",
      tipo: "moneda",
      etiqueta: "Otras deducciones del año",
      ayuda: "Fondo de Solidaridad, Caja de Profesionales o cuotas de préstamo hipotecario de la vivienda, si te corresponden.",
      min: 0,
      porDefecto: 0,
    },
    { id: "retenciones", tipo: "moneda", etiqueta: "IRPF que te retuvieron en el año", min: 0, porDefecto: 0 },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.ingresos <= 0) throw new ErrorEntrada("Escribí lo que cobraste en el año.", "ingresos");
    const bpc = valores["uy.bpc"];
    const escala = valores["uy.irpf-escala-anual"].map((f) => ({ desde: f.desde * bpc, hasta: f.hasta === null ? null : f.hasta * bpc, tasa: f.tasa }));
    const impuestoEscala = redondear(aplicarEscalaMarginal(escala, entrada.ingresos));
    let tasaMaxima = 0;
    for (const f of escala) if (entrada.ingresos > f.desde) tasaMaxima = f.tasa;
    const factor = entrada.compartida ? 0.5 : 1;
    const deduccionHijos = redondear((entrada.hijos * valores["uy.irpf-deduccion-hijo"] + entrada.hijosDiscapacidad * valores["uy.irpf-deduccion-hijo-discapacidad"]) * bpc * factor);
    const deducciones = redondear(entrada.aportes + deduccionHijos + entrada.otras);
    const tasaDeducciones = entrada.ingresos <= valores["uy.irpf-deducciones-umbral-anual"] * bpc ? valores["uy.irpf-deducciones-tasa-baja"] : valores["uy.irpf-deducciones-tasa-alta"];
    const descuento = redondear(porcentaje(deducciones, tasaDeducciones));
    const sobreRentas = redondear(impuestoEscala - descuento);
    // BPS, ajuste anual: si el impuesto sobre las rentas da cero o menos, el aguinaldo y el salario vacacional no pagan.
    const sobreAguinaldo = sobreRentas > 0 ? redondear(porcentaje(entrada.aguinaldoSv, tasaMaxima)) : 0;
    const impuesto = Math.max(0, redondear(sobreRentas + sobreAguinaldo));
    const saldo = redondear(impuesto - entrada.retenciones);
    return {
      impuestoEscala,
      tasaMaxima,
      deducciones,
      tasaDeducciones,
      descuento,
      sobreAguinaldo,
      impuesto,
      devolucion: saldo < 0 ? -saldo : 0,
      aPagar: saldo > 0 ? saldo : 0,
      observaciones: [
        "Es la liquidación de una persona con un solo empleador. Con varios trabajos, alquileres o intereses, la DGI suma todo y el resultado puede cambiar.",
        "Si tributás como núcleo familiar, las escalas son otras.",
      ],
    };
  },
  resultado: [
    { clave: "impuestoEscala", etiqueta: "Impuesto por la escala anual", formato: "moneda" },
    { clave: "tasaMaxima", etiqueta: "Tu tasa más alta", formato: "porcentaje" },
    { clave: "deducciones", etiqueta: "Deducciones del año", formato: "moneda" },
    { clave: "tasaDeducciones", etiqueta: "Tasa sobre deducciones", formato: "porcentaje" },
    { clave: "descuento", etiqueta: "Descuento por deducciones", formato: "moneda" },
    { clave: "sobreAguinaldo", etiqueta: "Impuesto sobre aguinaldo y salario vacacional", formato: "moneda" },
    { clave: "impuesto", etiqueta: "IRPF del año", formato: "moneda" },
    { clave: "devolucion", etiqueta: "Te devuelven", formato: "moneda", destacada: true, ocultarSiCero: true },
    { clave: "aPagar", etiqueta: "Te falta pagar", formato: "moneda", destacada: true, ocultarSiCero: true },
  ],
});
