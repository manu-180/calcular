import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { calcularSueldo, REQUIERE_SUELDO } from "../lib/sueldo";

export default definirCalculadora({
  id: "uy.sueldo-nominal",
  mercado: "uy",
  concepto: "propio",
  slug: "sueldo-nominal",
  estado: "publicado",
  requiere: REQUIERE_SUELDO,
  campos: [
    { id: "liquido", tipo: "moneda", etiqueta: "Sueldo líquido que querés cobrar", min: 0 },
    { id: "hijos", tipo: "entero", etiqueta: "Hijos menores de 18 a tu cargo", min: 0, max: 15, porDefecto: 0 },
    {
      id: "conyuge",
      tipo: "si-no",
      etiqueta: "Tenés cónyuge o concubino a cargo en el Fonasa",
      porDefecto: false,
    },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.liquido <= 0) throw new ErrorEntrada("Escribí el sueldo líquido que querés cobrar.", "liquido");
    const situacion = (nominal: number) => calcularSueldo(valores, { nominal, hijos: entrada.hijos, hijosDiscapacidad: 0, conyuge: entrada.conyuge }, redondear);
    const bpc = valores["uy.bpc"];
    // El líquido no crece parejo: baja un poco al cruzar el umbral del Fonasa, el del incremento del 6 %
    // y el de la tasa de deducciones del IRPF. Se busca por tramos y se devuelve el menor nominal que llega.
    const cortes = [0, valores["uy.fonasa-umbral"] * bpc, valores["uy.irpf-incremento-umbral"] * bpc, valores["uy.irpf-deducciones-umbral"] * bpc].sort((a, b) => a - b);
    let nominal: number | null = null;
    for (let i = 0; i < cortes.length && nominal === null; i++) {
      let bajo = cortes[i];
      let alto = i + 1 < cortes.length ? cortes[i + 1] : Math.max(cortes[i] * 2, entrada.liquido * 3);
      if (situacion(alto).liquido < entrada.liquido) continue;
      while (alto - bajo > 0.005) {
        const medio = (bajo + alto) / 2;
        if (situacion(medio).liquido >= entrada.liquido) alto = medio;
        else bajo = medio;
      }
      nominal = redondear(Math.ceil(alto * 100) / 100);
    }
    if (nominal === null) throw new ErrorEntrada("No encontramos un sueldo nominal para ese líquido. Probá con otro monto.", "liquido");
    const s = situacion(nominal);
    return {
      nominal,
      montepio: s.montepio,
      fonasa: s.fonasa,
      frl: s.frl,
      irpf: s.irpf,
      liquido: s.liquido,
      observaciones: ["Es el nominal mínimo para cobrar ese líquido con los descuentos de ley. Tu recibo puede tener otros descuentos (cuota sindical, préstamos, pensión alimenticia)."],
    };
  },
  resultado: [
    { clave: "nominal", etiqueta: "Sueldo nominal que necesitás", formato: "moneda", destacada: true },
    { clave: "montepio", etiqueta: "Aporte jubilatorio", formato: "moneda" },
    { clave: "fonasa", etiqueta: "Fonasa", formato: "moneda" },
    { clave: "frl", etiqueta: "Fondo de Reconversión Laboral", formato: "moneda" },
    { clave: "irpf", etiqueta: "IRPF", formato: "moneda" },
    { clave: "liquido", etiqueta: "Líquido que cobrás con ese nominal", formato: "moneda" },
  ],
});
