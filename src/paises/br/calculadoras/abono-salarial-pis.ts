import { definirCalculadora, enMapa } from "@/motor/calculo";

export default definirCalculadora({
  id: "br.abono-salarial",
  mercado: "br",
  concepto: "propio",
  slug: "abono-salarial-pis",
  estado: "publicado",
  requiere: {
    "br.abono-limite": "numero",
    "br.abono-valor": "mapa",
  },
  campos: [
    { id: "media", tipo: "moneda", etiqueta: "Remuneração média mensal no ano-base", min: 0, porDefecto: 2000, ayuda: "Para o calendário de 2026, o ano-base é 2024." },
    { id: "meses", tipo: "entero", etiqueta: "Meses trabalhados com carteira no ano-base", min: 1, max: 12, porDefecto: 12 },
    { id: "cadastro", tipo: "si-no", etiqueta: "Estou inscrito no PIS/Pasep há pelo menos 5 anos", porDefecto: true },
  ],
  calcular(entrada, valores) {
    const limite = valores["br.abono-limite"];
    const observaciones: string[] = [];
    let direito = true;
    if (entrada.media > limite) {
      direito = false;
      observaciones.push("A remuneração média passou do limite do calendário, então não há abono.");
    }
    if (!entrada.cadastro) {
      direito = false;
      observaciones.push("É preciso estar inscrito no PIS/Pasep há pelo menos 5 anos.");
    }
    observaciones.push("Também é preciso ter trabalhado pelo menos 30 dias no ano-base e que a empresa tenha informado os dados no eSocial.");
    return {
      direito: direito ? "Sim" : "Não",
      valor: direito ? enMapa(valores["br.abono-valor"], String(entrada.meses)) : 0,
      observaciones,
    };
  },
  resultado: [
    { clave: "direito", etiqueta: "Tem direito ao abono", formato: "texto" },
    { clave: "valor", etiqueta: "Valor do abono", formato: "moneda", destacada: true },
  ],
});
