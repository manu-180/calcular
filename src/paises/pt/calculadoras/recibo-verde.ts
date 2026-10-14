import { definirCalculadora, enMapa, porcentaje, porRegion } from "@/motor/calculo";

export default definirCalculadora({
  id: "pt.recibo-verde",
  mercado: "pt",
  concepto: "retencion-honorarios",
  slug: "recibo-verde",
  estado: "publicado",
  requiere: {
    "pt.iva-taxas": "mapa-por-region",
    "pt.recibo-verde-retencao": "mapa",
    "pt.iva-limite-isencao": "numero",
  },
  campos: [
    { id: "valor", tipo: "moneda", etiqueta: "Valor do serviço (sem IVA)", min: 0, porDefecto: 1000 },
    {
      id: "atividade",
      tipo: "opcion",
      etiqueta: "Atividade",
      opciones: [
        { valor: "artigo-151", etiqueta: "Profissão da tabela do artigo 151.º do Código do IRS" },
        { valor: "outros", etiqueta: "Outra prestação de serviços" },
      ],
      porDefecto: "artigo-151",
    },
    { id: "isentoIva", tipo: "si-no", etiqueta: "Está isento de IVA pelo artigo 53.º", porDefecto: false },
    { id: "regiao", tipo: "region", etiqueta: "Onde presta o serviço", porDefecto: "continente" },
    { id: "clienteRetem", tipo: "si-no", etiqueta: "O cliente tem contabilidade organizada (empresa)", porDefecto: true, ayuda: "Só essas entidades fazem retenção na fonte." },
    { id: "dispensa", tipo: "si-no", etiqueta: "Pediu dispensa de retenção na fonte", porDefecto: false, ayuda: "Possível quando prevê faturar no ano menos do que o limite de isenção de IVA." },
  ],
  calcular(entrada, valores, { redondear }) {
    const taxaIva = entrada.isentoIva ? 0 : enMapa(porRegion(valores["pt.iva-taxas"], entrada.regiao), "normal");
    const iva = redondear(porcentaje(entrada.valor, taxaIva));
    const taxaRetencao = entrada.clienteRetem && !entrada.dispensa ? enMapa(valores["pt.recibo-verde-retencao"], entrada.atividade) : 0;
    const retencao = redondear(porcentaje(entrada.valor, taxaRetencao));
    const total = redondear(entrada.valor + iva);
    const observaciones: string[] = [];
    if (!entrada.isentoIva) observaciones.push("Calculado com a taxa normal de IVA da região. Alguns serviços podem ter outra taxa ou isenção própria.");
    return {
      total,
      iva,
      retencao,
      recebe: redondear(total - retencao),
      taxaIva,
      taxaRetencao,
      observaciones,
    };
  },
  resultado: [
    { clave: "recebe", etiqueta: "Valor que recebe do cliente", formato: "moneda", destacada: true },
    { clave: "total", etiqueta: "Total do recibo (serviço + IVA)", formato: "moneda" },
    { clave: "iva", etiqueta: "IVA", formato: "moneda" },
    { clave: "retencao", etiqueta: "Retenção na fonte de IRS", formato: "moneda" },
    { clave: "taxaIva", etiqueta: "Taxa de IVA", formato: "porcentaje" },
    { clave: "taxaRetencao", etiqueta: "Taxa de retenção", formato: "porcentaje", decimales: 1 },
  ],
});
