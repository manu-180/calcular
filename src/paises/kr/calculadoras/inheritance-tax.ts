import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { impuestoBasico, piso, truncar10 } from "../lib/impuestos";

export default definirCalculadora({
  id: "kr.inheritance-tax",
  mercado: "kr",
  concepto: "propio",
  slug: "inheritance-tax",
  estado: "publicado",
  requiere: {
    "kr.gift-inheritance-tax-brackets": "escala",
    "kr.inheritance-deductions": "mapa",
    "kr.gift-inheritance-minimum": "numero",
    "kr.filing-tax-credit": "numero",
  },
  campos: [
    { id: "jaesan", tipo: "moneda", etiqueta: "상속재산 총액(시가)", min: 0, porDefecto: 2000000000 },
    { id: "chaemu", tipo: "moneda", etiqueta: "채무와 장례비용", min: 0, porDefecto: 0 },
    { id: "baeuja", tipo: "si-no", etiqueta: "배우자가 있어요", porDefecto: true },
    { id: "baeujaGaek", tipo: "moneda", etiqueta: "배우자가 실제로 상속받는 금액", min: 0, porDefecto: 0, visibleSi: { baeuja: [true] } },
    { id: "janyeo", tipo: "entero", etiqueta: "자녀 수", min: 0, max: 20, porDefecto: 2 },
    { id: "singo", tipo: "si-no", etiqueta: "기한 안에 신고해요(신고세액공제)", porDefecto: true },
  ],
  calcular(e, v) {
    if (e.jaesan <= 0) throw new ErrorEntrada("상속재산 총액을 입력하세요.", "jaesan");
    const m = v["kr.inheritance-deductions"];
    const gravable = Math.max(0, e.jaesan - e.chaemu);
    const personal = enMapa(m, "basic") + enMapa(m, "child") * e.janyeo;
    // 일괄공제: el mayor entre 5억 y 기초공제 + 인적공제, salvo que el cónyuge herede solo (제21조 ②).
    const soloConyuge = e.baeuja && e.janyeo === 0;
    const general = soloConyuge ? personal : Math.max(enMapa(m, "lump"), personal);
    let conyuge = 0;
    if (e.baeuja) {
      // Tope del 배우자 상속공제 por la parte legal del cónyuge (1,5 frente a 1 por hijo), sin los ajustes
      // por donaciones previas del 제19조.
      const legal = e.janyeo > 0 ? piso((gravable * 1.5) / (1.5 + e.janyeo)) : gravable;
      const real = e.baeujaGaek ?? 0;
      conyuge = real < enMapa(m, "spouse-min") ? enMapa(m, "spouse-min") : Math.max(enMapa(m, "spouse-min"), Math.min(real, legal, enMapa(m, "spouse-max")));
    }
    const deducciones = Math.min(gravable, general + conyuge);
    const base = gravable - deducciones;
    const calculado = base < v["kr.gift-inheritance-minimum"] ? 0 : impuestoBasico(base, v["kr.gift-inheritance-tax-brackets"]);
    const credito = e.singo ? piso((calculado * v["kr.filing-tax-credit"]) / 100) : 0;
    const impuesto = truncar10(calculado - credito);
    const observaciones = [
      "금융재산 상속공제, 동거주택 상속공제, 10년 안에 미리 증여한 재산의 합산은 반영하지 않았어요.",
      "상속개시일이 속하는 달의 말일부터 6개월 안에 신고해야 신고세액공제를 받아요.",
    ];
    return { impuesto, gravable, general, conyuge, deducciones, base, calculado, credito, observaciones };
  },
  resultado: [
    { clave: "impuesto", etiqueta: "납부할 상속세", formato: "moneda", destacada: true },
    { clave: "gravable", etiqueta: "상속세 과세가액", formato: "moneda" },
    { clave: "general", etiqueta: "일괄공제 또는 기초·인적공제", formato: "moneda" },
    { clave: "conyuge", etiqueta: "배우자 상속공제", formato: "moneda", ocultarSiCero: true },
    { clave: "base", etiqueta: "과세표준", formato: "moneda" },
    { clave: "calculado", etiqueta: "산출세액", formato: "moneda" },
    { clave: "credito", etiqueta: "신고세액공제", formato: "moneda" },
  ],
});
