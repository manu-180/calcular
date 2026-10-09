import { definirCalculadora, enMapa } from "@/motor/calculo";

export default definirCalculadora({
  id: "uy.monotributo",
  mercado: "uy",
  concepto: "regimen-simplificado",
  slug: "monotributo",
  estado: "publicado",
  requiere: {
    "uy.monotributo-ficto": "numero",
    "uy.monotributo-jubilatorio": "numero",
    "uy.monotributo-salud": "mapa",
  },
  campos: [
    {
      id: "snis",
      tipo: "si-no",
      etiqueta: "Querés cobertura de salud por el Fonasa (opción al SNIS)",
      ayuda: "Si no la elegís, igual pagás un seguro de enfermedad más chico, pero sin mutualista por el monotributo.",
      porDefecto: true,
    },
    { id: "conyuge", tipo: "si-no", etiqueta: "Tenés cónyuge o concubino a cargo", porDefecto: false },
    { id: "hijos", tipo: "si-no", etiqueta: "Tenés hijos a cargo", porDefecto: false },
  ],
  calcular(entrada, valores, { redondear }) {
    const clave = !entrada.snis ? "sin-snis" : entrada.conyuge ? (entrada.hijos ? "snis-conyuge-hijos" : "snis-conyuge") : entrada.hijos ? "snis-hijos" : "snis";
    const jubilatorio = valores["uy.monotributo-jubilatorio"];
    const salud = enMapa(valores["uy.monotributo-salud"], clave);
    const total = redondear(jubilatorio + salud);
    const observaciones: string[] = [];
    if (!entrada.snis && (entrada.conyuge || entrada.hijos)) observaciones.push("Sin la opción al SNIS tu familia no queda cubierta por el monotributo: el aporte de salud es el mismo con o sin cargas.");
    return {
      montoGravado: valores["uy.monotributo-ficto"],
      jubilatorio,
      salud,
      total,
      anual: redondear(total * 12),
      observaciones,
    };
  },
  resultado: [
    { clave: "total", etiqueta: "Pago mensual al BPS", formato: "moneda", destacada: true },
    { clave: "jubilatorio", etiqueta: "Aportes jubilatorios y FRL", formato: "moneda" },
    { clave: "salud", etiqueta: "Aporte de salud", formato: "moneda" },
    { clave: "montoGravado", etiqueta: "Sueldo ficto sobre el que aportás", formato: "moneda" },
    { clave: "anual", etiqueta: "Total en el año", formato: "moneda" },
  ],
});
