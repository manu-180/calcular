import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "ge.dividendis-gadasakhadi",
  mercado: "ge",
  concepto: "propio",
  slug: "dividendis-gadasakhadi",
  estado: "publicado",
  requiere: { "ge.dividendi": "numero", "ge.mogeba": "numero" },
  campos: [
    {
      id: "modo",
      tipo: "opcion",
      etiqueta: "რა თანხას შეიყვანთ",
      opciones: [
        { valor: "dividendi", etiqueta: "გასანაწილებელი დივიდენდი" },
        { valor: "mogeba", etiqueta: "კომპანიის მოგება, გადასახადებამდე" },
      ],
      porDefecto: "dividendi",
    },
    { id: "tanxa", tipo: "moneda", etiqueta: "თანხა", min: 0, porDefecto: 10000 },
  ],
  calcular(e, v, { redondear }) {
    if (e.tanxa <= 0) throw new ErrorEntrada("შეიყვანეთ ნულზე მეტი თანხა.", "tanxa");
    const mogebis = e.modo === "mogeba" ? redondear((e.tanxa * v["ge.mogeba"]) / 100) : 0;
    const dividendi = redondear(e.tanxa - mogebis);
    const gadasakhadi = redondear((dividendi * v["ge.dividendi"]) / 100);
    const kheze = redondear(dividendi - gadasakhadi);
    return { kheze, gadasakhadi, mogebis, dividendi, jamuri: ((e.tanxa - kheze) / e.tanxa) * 100 };
  },
  resultado: [
    { clave: "kheze", etiqueta: "ხელზე მისაღები დივიდენდი", formato: "moneda", destacada: true },
    { clave: "gadasakhadi", etiqueta: "დივიდენდის გადასახადი", formato: "moneda" },
    { clave: "mogebis", etiqueta: "მოგების გადასახადი", formato: "moneda", ocultarSiCero: true },
    { clave: "dividendi", etiqueta: "დივიდენდი გადასახადამდე", formato: "moneda" },
    { clave: "jamuri", etiqueta: "ჯამური გადასახადი თანხიდან", formato: "porcentaje", decimales: 2 },
  ],
});
