import { aplicarEscalaMarginal, definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { cien, sen } from "../lib/impuestos";

export default definirCalculadora({
  id: "jp.inheritance-tax",
  mercado: "jp",
  concepto: "propio",
  slug: "inheritance-tax",
  estado: "publicado",
  requiere: {
    "jp.inheritance-basic-exemption": "mapa",
    "jp.inheritance-tax": "escala",
    "jp.spouse-tax-relief": "numero",
  },
  campos: [
    { id: "isan", tipo: "moneda", etiqueta: "正味の遺産額（財産から債務と葬式費用を引いた額）", min: 0, porDefecto: 100000000 },
    { id: "conyuge", tipo: "si-no", etiqueta: "配偶者がいます", porDefecto: true },
    { id: "hijos", tipo: "entero", etiqueta: "子どもの人数（法定相続人になる子）", min: 1, max: 15, porDefecto: 2 },
  ],
  calcular(entrada, v) {
    if (entrada.isan <= 0) throw new ErrorEntrada("正味の遺産額を入力してください。", "isan");
    if (entrada.hijos < 1) throw new ErrorEntrada("子どもが1人以上いる場合の計算です。", "hijos");
    const herederos = entrada.hijos + (entrada.conyuge ? 1 : 0);
    const b = v["jp.inheritance-basic-exemption"];
    const kiso = b.fixed + b["per-heir"] * herederos;
    const kazei = Math.max(0, entrada.isan - kiso);
    const parteConyuge = entrada.conyuge ? 1 / 2 : 0;
    const parteHijo = (1 - parteConyuge) / entrada.hijos;
    const escala = v["jp.inheritance-tax"];
    const impuestoDe = (parte: number) => Math.floor(aplicarEscalaMarginal(escala, sen(kazei * parte)));
    const total = cien((entrada.conyuge ? impuestoDe(parteConyuge) : 0) + impuestoDe(parteHijo) * entrada.hijos);
    const conyugeAntes = Math.floor(total * parteConyuge);
    const pagar = total - conyugeAntes;
    const porHijo = Math.floor(pagar / entrada.hijos);
    const observaciones: string[] = [];
    if (entrada.conyuge) {
      const tope = Math.max(v["jp.spouse-tax-relief"], entrada.isan * parteConyuge);
      observaciones.push(`配偶者が法定相続分（2分の1）どおりに取得した場合です。配偶者の取得額が${Math.round(tope / 10000).toLocaleString("ja-JP")}万円までなら、配偶者の税額軽減で配偶者の相続税は0円になります。`);
    }
    if (kazei === 0) observaciones.push("遺産額が基礎控除以下なので、相続税はかかりません。");
    return {
      pagar,
      total,
      porHijo,
      conyugeAntes,
      kiso,
      kazei,
      herederos,
      observaciones,
    };
  },
  resultado: [
    { clave: "pagar", etiqueta: "納める相続税の合計（法定相続分どおりに分けた場合）", formato: "moneda", destacada: true },
    { clave: "total", etiqueta: "相続税の総額", formato: "moneda" },
    { clave: "porHijo", etiqueta: "子ども1人あたりの相続税", formato: "moneda" },
    { clave: "conyugeAntes", etiqueta: "配偶者の税額（税額軽減の前）", formato: "moneda", ocultarSiCero: true },
    { clave: "kiso", etiqueta: "基礎控除額", formato: "moneda" },
    { clave: "kazei", etiqueta: "課税遺産総額", formato: "moneda" },
    { clave: "herederos", etiqueta: "法定相続人の数", formato: "numero" },
  ],
});
