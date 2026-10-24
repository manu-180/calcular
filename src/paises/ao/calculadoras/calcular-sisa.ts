import { definirCalculadora, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "ao.calcular-sisa",
  mercado: "ao",
  concepto: "propio",
  slug: "calcular-sisa",
  estado: "publicado",
  requiere: {
    "ao.ip-transmissao": "numero",
    "ao.ip-habitacao-isencao": "numero",
    "ao.ip-habitacao-reducao-limite": "numero",
    "ao.ip-habitacao-reducao": "numero",
  },
  campos: [
    { id: "preco", tipo: "moneda", etiqueta: "Preço da compra (valor declarado)", min: 0, porDefecto: 80000000 },
    { id: "patrimonial", tipo: "moneda", etiqueta: "Valor patrimonial na matriz", min: 0, requerido: false, ayuda: "Se for maior do que o preço, o imposto calcula-se sobre ele." },
    { id: "habitacao", tipo: "si-no", etiqueta: "O imóvel é para habitação", porDefecto: true },
  ],
  calcular(entrada, valores, { redondear }) {
    const base = Math.max(entrada.preco, entrada.patrimonial ?? 0);
    const taxaGeral = valores["ao.ip-transmissao"];
    let taxa = taxaGeral;
    const observaciones: string[] = [];
    if (entrada.habitacao && base <= valores["ao.ip-habitacao-isencao"]) {
      taxa = 0;
      observaciones.push("A compra de habitação até este valor está isenta de Imposto Predial em 2026.");
    } else if (entrada.habitacao && base <= valores["ao.ip-habitacao-reducao-limite"]) {
      taxa = taxaGeral - porcentaje(taxaGeral, valores["ao.ip-habitacao-reducao"]);
      observaciones.push("Na compra de habitação neste escalão de valor, a taxa fica reduzida a metade em 2026.");
    }
    return {
      imposto: redondear(porcentaje(base, taxa)),
      base,
      taxa,
      observaciones,
    };
  },
  resultado: [
    { clave: "imposto", etiqueta: "Imposto Predial sobre a transmissão (antiga SISA)", formato: "moneda", destacada: true },
    { clave: "base", etiqueta: "Valor tributável", formato: "moneda" },
    { clave: "taxa", etiqueta: "Taxa aplicada", formato: "porcentaje", decimales: 1 },
  ],
});
