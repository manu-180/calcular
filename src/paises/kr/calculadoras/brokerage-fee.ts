import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { filaDe, piso } from "../lib/impuestos";

export default definirCalculadora({
  id: "kr.brokerage-fee",
  mercado: "kr",
  concepto: "propio",
  slug: "brokerage-fee",
  estado: "publicado",
  requiere: {
    "kr.brokerage-sale": "escala",
    "kr.brokerage-lease": "escala",
    "kr.brokerage-caps": "mapa",
    "kr.brokerage-rent-multipliers": "mapa",
    "kr.officetel-brokerage": "mapa",
    "kr.vat": "numero",
  },
  campos: [
    {
      id: "georae",
      tipo: "opcion",
      etiqueta: "거래 종류",
      opciones: [
        { valor: "sale", etiqueta: "매매·교환" },
        { valor: "lease", etiqueta: "전세·월세(임대차)" },
      ],
      porDefecto: "sale",
    },
    {
      id: "mulgeon",
      tipo: "opcion",
      etiqueta: "중개 대상",
      opciones: [
        { valor: "house", etiqueta: "주택(아파트, 빌라, 단독주택)" },
        { valor: "officetel", etiqueta: "주거용 오피스텔(전용 85제곱미터 이하)" },
      ],
      porDefecto: "house",
    },
    { id: "geumaek", tipo: "moneda", etiqueta: "매매가 또는 보증금", min: 0, porDefecto: 500000000 },
    { id: "wolse", tipo: "moneda", etiqueta: "월세", min: 0, porDefecto: 0, visibleSi: { georae: ["lease"] } },
  ],
  calcular(e, v) {
    if (e.geumaek <= 0 && (e.wolse ?? 0) <= 0) throw new ErrorEntrada("거래 금액을 입력하세요.", "geumaek");
    const arriendo = e.georae === "lease";
    let monto = e.geumaek;
    if (arriendo && (e.wolse ?? 0) > 0) {
      const mult = v["kr.brokerage-rent-multipliers"];
      monto = e.geumaek + (e.wolse ?? 0) * enMapa(mult, "normal");
      if (monto < enMapa(mult, "limite")) monto = e.geumaek + (e.wolse ?? 0) * enMapa(mult, "small");
    }
    let tasa: number;
    let tope: number | null = null;
    if (e.mulgeon === "officetel") {
      tasa = enMapa(v["kr.officetel-brokerage"], arriendo ? "lease" : "sale");
    } else {
      const escala = v[arriendo ? "kr.brokerage-lease" : "kr.brokerage-sale"];
      const fila = filaDe(escala, monto);
      tasa = fila.tasa;
      const indice = escala.indexOf(fila);
      const caps = v["kr.brokerage-caps"];
      const clave = `${arriendo ? "lease" : "sale"}${indice}`;
      if (indice < 2 && clave in caps) tope = enMapa(caps, clave);
    }
    const calculado = piso((monto * tasa) / 100);
    const honorario = tope === null ? calculado : Math.min(calculado, tope);
    return {
      honorario,
      conIva: piso((honorario * (100 + v["kr.vat"])) / 100),
      monto,
      tasa,
      tope,
      observaciones: ["법정 상한이에요. 실제 중개보수는 이 범위 안에서 중개사와 협의해 정해요. 중개사가 일반과세자면 부가가치세가 더해질 수 있어요."],
    };
  },
  resultado: [
    { clave: "honorario", etiqueta: "중개보수 상한(한쪽 기준)", formato: "moneda", destacada: true },
    { clave: "conIva", etiqueta: "부가가치세를 더한 금액", formato: "moneda" },
    { clave: "tasa", etiqueta: "상한요율", formato: "porcentaje", decimales: 1 },
    { clave: "tope", etiqueta: "한도액", formato: "moneda" },
    { clave: "monto", etiqueta: "거래금액", formato: "moneda" },
  ],
});
