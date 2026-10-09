import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { calcularSueldo, REQUIERE_SUELDO } from "../lib/sueldo";

const JORNADA_COMPLETA = 44;

export default definirCalculadora({
  id: "uy.trabajo-domestico",
  mercado: "uy",
  concepto: "trabajo-domestico",
  slug: "trabajo-domestico",
  estado: "publicado",
  requiere: {
    ...REQUIERE_SUELDO,
    "uy.domestico-minimo-mensual": "mapa",
    "uy.domestico-minimo-hora": "mapa",
    "uy.domestico-aportes-patronales": "mapa",
    "uy.domestico-bse": "numero",
  },
  campos: [
    { id: "categoria", tipo: "opcion-dato", dato: "uy.domestico-minimo-mensual", etiqueta: "Categoría", porDefecto: "general" },
    {
      id: "modalidad",
      tipo: "opcion",
      etiqueta: "Cómo se le paga",
      opciones: [
        { valor: "mensual", etiqueta: "Mensual (sueldo fijo por mes)" },
        { valor: "jornalero", etiqueta: "Jornalero (por hora o por día)" },
      ],
      porDefecto: "mensual",
    },
    {
      id: "horas",
      tipo: "numero",
      etiqueta: "Horas de trabajo",
      ayuda: "Si es mensual, las horas por semana (44 es jornada completa). Si es jornalero, las horas trabajadas en el mes.",
      min: 1,
      porDefecto: 44,
    },
    {
      id: "nominal",
      tipo: "moneda",
      etiqueta: "Sueldo nominal del mes",
      ayuda: "Lo que se le paga antes de descuentos. Si lo dejás vacío, calculamos con el mínimo de la categoría.",
      min: 0,
      requerido: false,
    },
    { id: "hijos", tipo: "si-no", etiqueta: "Tiene hijos menores a cargo en el Fonasa", porDefecto: false },
    { id: "conyuge", tipo: "si-no", etiqueta: "Tiene cónyuge o concubino a cargo en el Fonasa", porDefecto: false },
  ],
  calcular(entrada, valores, { redondear }) {
    const mensual = entrada.modalidad === "mensual";
    if (mensual && entrada.horas > JORNADA_COMPLETA) throw new ErrorEntrada("La jornada del trabajo doméstico es de hasta 44 horas por semana. Revisá las horas por semana.", "horas");
    if (!mensual && entrada.horas > 300) throw new ErrorEntrada("Revisá las horas trabajadas en el mes.", "horas");
    const minimo = mensual
      ? redondear((enMapa(valores["uy.domestico-minimo-mensual"], entrada.categoria) * Math.min(entrada.horas, JORNADA_COMPLETA)) / JORNADA_COMPLETA)
      : redondear(enMapa(valores["uy.domestico-minimo-hora"], entrada.categoria) * entrada.horas);
    const nominal = entrada.nominal ?? minimo;
    const r = calcularSueldo(valores, { nominal, hijos: entrada.hijos ? 1 : 0, hijosDiscapacidad: 0, conyuge: entrada.conyuge }, redondear);
    const tasas = valores["uy.domestico-aportes-patronales"];
    const jubilatorioPatronal = redondear(porcentaje(Math.min(nominal, r.topeAportes), enMapa(tasas, "jubilatorio")));
    const fonasaPatronal = redondear(porcentaje(nominal, enMapa(tasas, "fonasa")));
    const frlPatronal = redondear(porcentaje(nominal, enMapa(tasas, "frl")));
    const fondoGarantia = redondear(porcentaje(nominal, enMapa(tasas, "fgcl")));
    const bse = redondear(porcentaje(nominal, valores["uy.domestico-bse"]));
    const aportesPatronales = redondear(jubilatorioPatronal + fonasaPatronal + frlPatronal + fondoGarantia + bse);
    const observaciones: string[] = [];
    if (nominal < minimo) observaciones.push("El sueldo que pusiste está por debajo del mínimo de la categoría para esas horas.");
    observaciones.push("Si los aportes al Fonasa no alcanzan para pagar la cuota mutual, el empleador paga también la diferencia (complemento de cuota mutual). Ese monto no está incluido.");
    return {
      minimo,
      nominal,
      montepio: r.montepio,
      fonasa: r.fonasa,
      frl: r.frl,
      irpf: r.irpf,
      liquido: r.liquido,
      jubilatorioPatronal,
      fonasaPatronal,
      frlPatronal,
      fondoGarantia,
      bse,
      aportesPatronales,
      aportesBps: redondear(aportesPatronales + r.montepio + r.fonasa + r.frl),
      costoTotal: redondear(nominal + aportesPatronales),
      observaciones,
    };
  },
  resultado: [
    { clave: "minimo", etiqueta: "Mínimo de la categoría para esas horas", formato: "moneda" },
    { clave: "nominal", etiqueta: "Sueldo nominal", formato: "moneda" },
    { clave: "montepio", etiqueta: "Aporte jubilatorio (montepío)", formato: "moneda" },
    { clave: "fonasa", etiqueta: "Fonasa", formato: "moneda" },
    { clave: "frl", etiqueta: "Fondo de Reconversión Laboral", formato: "moneda" },
    { clave: "irpf", etiqueta: "IRPF", formato: "moneda", ocultarSiCero: true },
    { clave: "liquido", etiqueta: "Sueldo líquido de la trabajadora", formato: "moneda", destacada: true },
    { clave: "jubilatorioPatronal", etiqueta: "Aporte jubilatorio patronal", formato: "moneda" },
    { clave: "fonasaPatronal", etiqueta: "Fonasa patronal", formato: "moneda" },
    { clave: "frlPatronal", etiqueta: "FRL patronal", formato: "moneda" },
    { clave: "fondoGarantia", etiqueta: "Fondo de garantía de créditos laborales", formato: "moneda" },
    { clave: "bse", etiqueta: "Seguro de accidentes (BSE)", formato: "moneda" },
    { clave: "aportesPatronales", etiqueta: "Aportes a cargo del empleador", formato: "moneda" },
    { clave: "aportesBps", etiqueta: "Total de la factura del BPS (aportes de los dos)", formato: "moneda" },
    { clave: "costoTotal", etiqueta: "Costo total para el empleador", formato: "moneda", destacada: true },
  ],
});
