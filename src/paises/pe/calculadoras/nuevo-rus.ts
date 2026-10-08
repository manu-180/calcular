import { definirCalculadora, enMapa } from "@/motor/calculo";

export default definirCalculadora({
  id: "pe.nuevo-rus",
  mercado: "pe",
  concepto: "regimen-simplificado",
  slug: "nuevo-rus",
  estado: "publicado",
  requiere: {
    "pe.nrus-cuota": "mapa",
    "pe.nrus-limite-mensual": "mapa",
    "pe.nrus-limite-anual": "numero",
  },
  campos: [
    { id: "ingresos", tipo: "moneda", etiqueta: "Ventas o ingresos del mes", min: 0 },
    { id: "compras", tipo: "moneda", etiqueta: "Compras del mes", ayuda: "Lo que compraste para tu negocio en el mes.", min: 0, porDefecto: 0 },
    {
      id: "acumulado",
      tipo: "moneda",
      etiqueta: "Ingresos acumulados en el año (opcional)",
      ayuda: "Suma de tus ingresos de enero hasta este mes. Sirve para saber si pasas el límite anual.",
      min: 0,
      requerido: false,
    },
  ],
  calcular(entrada, valores) {
    const limites = valores["pe.nrus-limite-mensual"];
    const cuotas = valores["pe.nrus-cuota"];
    const mayor = Math.max(entrada.ingresos, entrada.compras);
    const limiteAnual = valores["pe.nrus-limite-anual"];
    const observaciones: string[] = [];

    let categoria: string | null = null;
    if (mayor <= enMapa(limites, "categoria-1")) categoria = "categoria-1";
    else if (mayor <= enMapa(limites, "categoria-2")) categoria = "categoria-2";

    if (categoria === null) {
      observaciones.push("Tus ventas o compras del mes pasan el límite del Nuevo RUS. Tienes que cambiarte a otro régimen (RER, Régimen MYPE Tributario o general).");
    }
    if (entrada.acumulado !== null && entrada.acumulado > limiteAnual) {
      observaciones.push("Tus ingresos del año pasan el límite anual del Nuevo RUS. Tienes que cambiarte a otro régimen.");
    }

    return {
      categoria: categoria === "categoria-1" ? "Categoría 1" : categoria === "categoria-2" ? "Categoría 2" : "Fuera del Nuevo RUS",
      cuota: categoria === null ? null : enMapa(cuotas, categoria),
      cuotaAnual: categoria === null ? null : enMapa(cuotas, categoria) * 12,
      montoUsado: mayor,
      limiteMensual: enMapa(limites, "categoria-2"),
      limiteAnual,
      observaciones,
    };
  },
  resultado: [
    { clave: "categoria", etiqueta: "Tu categoría", formato: "texto" },
    { clave: "cuota", etiqueta: "Cuota a pagar este mes", formato: "moneda", destacada: true },
    { clave: "cuotaAnual", etiqueta: "Si pagas la misma cuota todo el año", formato: "moneda" },
    { clave: "montoUsado", etiqueta: "Monto que define la categoría (el mayor entre ventas y compras)", formato: "moneda" },
    { clave: "limiteMensual", etiqueta: "Límite mensual del Nuevo RUS", formato: "moneda" },
    { clave: "limiteAnual", etiqueta: "Límite anual del Nuevo RUS", formato: "moneda" },
  ],
});
