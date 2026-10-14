import { aplicarEscalaMarginal, definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import type { FilaEscala } from "@/motor/tipos";
import { libras } from "../lib/impuestos";

function desglose(escala: readonly FilaEscala[], precio: number, redondear: (n: number) => number): string[] {
  const lineas: string[] = [];
  for (const f of escala) {
    if (precio <= f.desde) break;
    const tope = f.hasta === null ? precio : Math.min(precio, f.hasta);
    const parte = tope - f.desde;
    lineas.push(`${f.tasa}% on ${libras(redondear(parte))}: ${libras(redondear((parte * f.tasa) / 100))}.`);
  }
  return lineas;
}

export default definirCalculadora({
  id: "gb.stamp-duty-calculator",
  mercado: "gb",
  concepto: "propio",
  slug: "stamp-duty-calculator",
  estado: "publicado",
  requiere: {
    "gb.sdlt-standard": "escala",
    "gb.sdlt-first-time-buyer": "escala",
    "gb.sdlt-first-time-buyer-cap": "numero",
    "gb.sdlt-additional-surcharge": "numero",
    "gb.sdlt-non-resident-surcharge": "numero",
  },
  campos: [
    { id: "precio", tipo: "moneda", etiqueta: "Property price", min: 0, porDefecto: 300000 },
    {
      id: "comprador",
      tipo: "opcion",
      etiqueta: "You are buying",
      opciones: [
        { valor: "home-mover", etiqueta: "Your only home (moving home)" },
        { valor: "first-time-buyer", etiqueta: "Your first home (first-time buyer)" },
        { valor: "additional", etiqueta: "An additional property or buy-to-let" },
      ],
      porDefecto: "home-mover",
    },
    { id: "noResidente", tipo: "si-no", etiqueta: "You are not a UK resident", porDefecto: false },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.precio <= 0) throw new ErrorEntrada("Enter the price of the property.", "precio");
    const observaciones: string[] = [];
    const tope = v["gb.sdlt-first-time-buyer-cap"];
    let escala = v["gb.sdlt-standard"];
    if (entrada.comprador === "first-time-buyer") {
      if (entrada.precio <= tope) escala = v["gb.sdlt-first-time-buyer"];
      else observaciones.push(`First-time buyer relief only applies up to ${libras(tope)}, so the standard rates apply to this price.`);
    }
    const base = redondear(aplicarEscalaMarginal(escala, entrada.precio));
    const recargoAdicional = entrada.comprador === "additional" ? redondear((entrada.precio * v["gb.sdlt-additional-surcharge"]) / 100) : 0;
    const recargoNoResidente = entrada.noResidente ? redondear((entrada.precio * v["gb.sdlt-non-resident-surcharge"]) / 100) : 0;
    const total = redondear(base + recargoAdicional + recargoNoResidente);
    observaciones.push(...desglose(escala, entrada.precio, redondear));
    return {
      total,
      base,
      recargoAdicional,
      recargoNoResidente,
      efectiva: (total / entrada.precio) * 100,
      observaciones,
    };
  },
  resultado: [
    { clave: "total", etiqueta: "Stamp Duty to pay", formato: "moneda", destacada: true },
    { clave: "base", etiqueta: "Stamp Duty at the main rates", formato: "moneda" },
    { clave: "recargoAdicional", etiqueta: "Surcharge for an additional property", formato: "moneda", ocultarSiCero: true },
    { clave: "recargoNoResidente", etiqueta: "Non-UK resident surcharge", formato: "moneda", ocultarSiCero: true },
    { clave: "efectiva", etiqueta: "Share of the price", formato: "porcentaje", decimales: 2 },
  ],
});
