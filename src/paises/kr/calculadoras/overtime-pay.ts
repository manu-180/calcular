import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "kr.overtime-pay",
  mercado: "kr",
  concepto: "horas-extra",
  slug: "overtime-pay",
  estado: "publicado",
  requiere: {
    "kr.overtime-premiums": "mapa",
    "kr.minimum-wage": "numero",
  },
  campos: [
    { id: "sigeup", tipo: "moneda", etiqueta: "통상시급", min: 0, porDefecto: 15000, ayuda: "월 통상임금을 209로 나눈 금액이에요." },
    { id: "yeonjang", tipo: "numero", etiqueta: "연장근로시간", min: 0, max: 300, porDefecto: 10 },
    { id: "yagan", tipo: "numero", etiqueta: "야간근로시간(오후 10시~오전 6시)", min: 0, max: 300, porDefecto: 0, ayuda: "연장근로나 휴일근로와 겹치는 시간도 여기에 넣으면 가산분이 더해져요." },
    { id: "hyuil", tipo: "numero", etiqueta: "휴일근로시간(하루 8시간 이내분)", min: 0, max: 300, porDefecto: 0 },
    { id: "hyuilChogwa", tipo: "numero", etiqueta: "휴일근로시간(하루 8시간 초과분)", min: 0, max: 300, porDefecto: 0 },
    { id: "ojin", tipo: "si-no", etiqueta: "상시 근로자 5명 이상 사업장이에요", porDefecto: true },
  ],
  calcular(e, v, { redondear }) {
    if (e.sigeup <= 0) throw new ErrorEntrada("통상시급을 입력하세요.", "sigeup");
    const p = v["kr.overtime-premiums"];
    const g = (clave: string) => (e.ojin ? enMapa(p, clave) / 100 : 0);
    const yeonjang = redondear(e.sigeup * e.yeonjang * (1 + g("extension")));
    const hyuil = redondear(e.sigeup * e.hyuil * (1 + g("holiday")));
    const hyuilChogwa = redondear(e.sigeup * e.hyuilChogwa * (1 + g("holiday-over8")));
    const yagan = redondear(e.sigeup * e.yagan * g("night"));
    const base = redondear(e.sigeup * (e.yeonjang + e.hyuil + e.hyuilChogwa));
    const total = yeonjang + hyuil + hyuilChogwa + yagan;
    const observaciones: string[] = [];
    if (!e.ojin) observaciones.push("상시 4명 이하 사업장에는 가산수당 규정이 적용되지 않아서 일한 시간만큼의 임금만 계산했어요.");
    if (e.sigeup < v["kr.minimum-wage"]) observaciones.push("입력한 통상시급이 올해 최저임금보다 낮아요.");
    return { total, yeonjang, yagan, hyuil, hyuilChogwa, gasan: total - base, observaciones };
  },
  resultado: [
    { clave: "total", etiqueta: "연장·야간·휴일근로수당 합계", formato: "moneda", destacada: true },
    { clave: "yeonjang", etiqueta: "연장근로수당", formato: "moneda", ocultarSiCero: true },
    { clave: "yagan", etiqueta: "야간근로 가산수당", formato: "moneda", ocultarSiCero: true },
    { clave: "hyuil", etiqueta: "휴일근로수당(8시간 이내)", formato: "moneda", ocultarSiCero: true },
    { clave: "hyuilChogwa", etiqueta: "휴일근로수당(8시간 초과)", formato: "moneda", ocultarSiCero: true },
    { clave: "gasan", etiqueta: "그중 가산분", formato: "moneda" },
  ],
});
