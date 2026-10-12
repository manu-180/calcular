import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

const MESES = ["1", "2", "3", "4", "5", "6"] as const;

export default definirCalculadora({
  id: "uy.seguro-de-paro",
  mercado: "uy",
  concepto: "propio",
  slug: "seguro-de-paro",
  estado: "publicado",
  requiere: {
    "uy.paro-porcentajes": "mapa",
    "uy.paro-jornales": "mapa",
    "uy.paro-topes": "mapa",
    "uy.paro-suspension": "numero",
    "uy.paro-suspension-jornales": "numero",
    "uy.paro-tope-suspension": "numero",
    "uy.paro-minimo": "numero",
    "uy.paro-suplemento": "numero",
    "uy.paro-divisor-jornal": "numero",
  },
  campos: [
    {
      id: "causal",
      tipo: "opcion",
      etiqueta: "Por qué vas al seguro de paro",
      opciones: [
        { valor: "despido", etiqueta: "Despido" },
        { valor: "suspension", etiqueta: "Suspensión total (te mandan al seguro sin despedirte)" },
      ],
      porDefecto: "despido",
    },
    {
      id: "modalidad",
      tipo: "opcion",
      etiqueta: "Cómo cobrabas",
      opciones: [
        { valor: "mensual", etiqueta: "Mensual" },
        { valor: "jornalero", etiqueta: "Por día o por hora (jornalero)" },
      ],
      porDefecto: "mensual",
    },
    {
      id: "monto",
      tipo: "moneda",
      etiqueta: "Promedio mensual nominal de los últimos 6 meses",
      ayuda: "Mensuales: el promedio de lo que cobraste por mes, sin aguinaldo. Jornaleros: poné el total cobrado en los 6 meses.",
      min: 0,
    },
    {
      id: "familia",
      tipo: "si-no",
      etiqueta: "Tenés cónyuge, concubino, hijos u otros familiares a cargo",
      ayuda: "Te suma un 20 %. No corresponde si esos familiares ganan más de una BPC.",
      porDefecto: false,
    },
    { id: "mayor50", tipo: "si-no", etiqueta: "Tenés 50 años o más", ayuda: "Si te despiden con 50 años o más, el seguro se extiende seis meses.", porDefecto: false },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.monto <= 0) throw new ErrorEntrada("Escribí cuánto cobrabas.", "monto");
    const suplemento = entrada.familia ? 1 + valores["uy.paro-suplemento"] / 100 : 1;
    const minimo = valores["uy.paro-minimo"];
    const jornal = entrada.monto / valores["uy.paro-divisor-jornal"];
    const meses: (number | null)[] = [];
    if (entrada.causal === "despido") {
      for (const m of MESES) {
        const base = entrada.modalidad === "mensual" ? porcentaje(entrada.monto, enMapa(valores["uy.paro-porcentajes"], m)) : enMapa(valores["uy.paro-jornales"], m) * jornal;
        const acotado = Math.min(Math.max(base, minimo), enMapa(valores["uy.paro-topes"], m));
        meses.push(redondear(acotado * suplemento));
      }
    } else {
      const base = entrada.modalidad === "mensual" ? porcentaje(entrada.monto, valores["uy.paro-suspension"]) : valores["uy.paro-suspension-jornales"] * jornal;
      const mes = redondear(Math.min(Math.max(base, minimo), valores["uy.paro-tope-suspension"]) * suplemento);
      meses.push(mes, mes, mes, mes, null, null);
    }
    const total = redondear(meses.reduce<number>((s, x) => s + (x ?? 0), 0));
    const extension = entrada.causal === "despido" && entrada.mayor50 && entrada.modalidad === "mensual" ? redondear((meses[5] ?? 0) * 6) : null;
    const observaciones: string[] = [];
    if (entrada.modalidad === "mensual" && entrada.monto * 0.4 < minimo) observaciones.push("El mínimo de la tabla es para una jornada completa. Si trabajabas menos horas, el BPS lo achica en proporción.");
    if (entrada.causal === "suspension") observaciones.push("Por suspensión el seguro dura hasta cuatro meses y paga lo mismo todos los meses.");
    if (entrada.mayor50 && entrada.modalidad === "jornalero") observaciones.push("Con 50 años o más también tenés una extensión. Consultá los jornales extra en el BPS.");
    observaciones.push("El BPS descuenta del subsidio el aporte personal y el Fonasa.");
    return { mes1: meses[0], mes2: meses[1], mes3: meses[2], mes4: meses[3], mes5: meses[4], mes6: meses[5], total, extension, observaciones };
  },
  resultado: [
    { clave: "mes1", etiqueta: "Mes 1", formato: "moneda" },
    { clave: "mes2", etiqueta: "Mes 2", formato: "moneda" },
    { clave: "mes3", etiqueta: "Mes 3", formato: "moneda" },
    { clave: "mes4", etiqueta: "Mes 4", formato: "moneda" },
    { clave: "mes5", etiqueta: "Mes 5", formato: "moneda" },
    { clave: "mes6", etiqueta: "Mes 6", formato: "moneda" },
    { clave: "total", etiqueta: "Total del seguro de paro (nominal)", formato: "moneda", destacada: true },
    { clave: "extension", etiqueta: "Extensión por tener 50 años o más (6 meses más)", formato: "moneda" },
  ],
});
