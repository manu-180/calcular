import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "mz.calcular-ispc",
  mercado: "mz",
  concepto: "regimen-simplificado",
  slug: "calcular-ispc",
  estado: "publicado",
  requiere: {
    "mz.ispc-comercio": "escala",
    "mz.ispc-servicos": "numero",
    "mz.ispc-liberais": "numero",
    "mz.ispc-excesso": "numero",
    "mz.ispc-limite": "numero",
    "mz.ispc-minimo": "numero",
  },
  campos: [
    {
      id: "actividade",
      tipo: "opcion",
      etiqueta: "Actividade",
      opciones: [
        { valor: "comercio", etiqueta: "Comércio, indústria, agricultura, pesca ou artesanato" },
        { valor: "servicos", etiqueta: "Serviços como canalização, carpintaria, barbearia ou mecânica" },
        { valor: "liberais", etiqueta: "Profissão liberal ou consultoria" },
      ],
      porDefecto: "comercio",
    },
    { id: "anual", tipo: "moneda", etiqueta: "Volume de negócios anual", min: 0, porDefecto: 800000, ayuda: "O do ano anterior, ou o previsto se começou a actividade este ano.", visibleSi: { actividade: ["comercio"] } },
    { id: "trimestre", tipo: "moneda", etiqueta: "Vendas ou serviços do trimestre", min: 0, porDefecto: 200000 },
    { id: "anteriores", tipo: "moneda", etiqueta: "Vendas dos trimestres anteriores deste ano", min: 0, porDefecto: 0 },
  ],
  calcular(entrada, valores, { redondear }) {
    const limite = valores["mz.ispc-limite"];
    let taxa: number;
    if (entrada.actividade === "comercio") {
      const anual = entrada.anual ?? 0;
      const escala = valores["mz.ispc-comercio"];
      const fila = [...escala].reverse().find((f) => anual >= f.desde) ?? escala[0];
      taxa = fila.tasa;
    } else {
      taxa = entrada.actividade === "servicos" ? valores["mz.ispc-servicos"] : valores["mz.ispc-liberais"];
    }
    if (entrada.anteriores > 0 && entrada.trimestre === 0) throw new ErrorEntrada("Indique as vendas do trimestre.", "trimestre");
    const acumulado = entrada.anteriores + entrada.trimestre;
    const excesso = Math.max(0, acumulado - Math.max(limite, entrada.anteriores));
    const normal = entrada.trimestre - excesso;
    const imposto = redondear(porcentaje(normal, taxa) + porcentaje(excesso, valores["mz.ispc-excesso"]));
    const pagar = imposto < valores["mz.ispc-minimo"] ? 0 : imposto;
    const observaciones: string[] = [];
    if (pagar === 0 && imposto > 0) observaciones.push("O imposto do trimestre fica abaixo do mínimo, por isso não há pagamento. A declaração trimestral continua obrigatória.");
    if (excesso > 0) observaciones.push("As vendas do ano passaram o limite do ISPC. A parte acima do limite paga a taxa agravada e no ano seguinte o regime deixa de se aplicar.");
    if (entrada.actividade === "comercio" && (entrada.anual ?? 0) > limite) observaciones.push("Com um volume de negócios anual acima do limite não pode optar pelo ISPC.");
    if (entrada.actividade === "liberais") observaciones.push("Os profissionais liberais só podem ficar no ISPC até cinco anos.");
    return { pagar, imposto, taxa, normal: redondear(normal), excesso: redondear(excesso), observaciones };
  },
  resultado: [
    { clave: "pagar", etiqueta: "ISPC a pagar no trimestre", formato: "moneda", destacada: true },
    { clave: "imposto", etiqueta: "Imposto calculado", formato: "moneda" },
    { clave: "taxa", etiqueta: "Taxa da actividade", formato: "porcentaje" },
    { clave: "normal", etiqueta: "Vendas tributadas à taxa da actividade", formato: "moneda" },
    { clave: "excesso", etiqueta: "Vendas acima do limite anual", formato: "moneda", ocultarSiCero: true },
  ],
});
