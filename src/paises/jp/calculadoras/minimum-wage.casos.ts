import { definirCasos } from "@/motor/calculo";
import calculadora from "./minimum-wage";

export default definirCasos(calculadora, [
  {
    nombre: "東京都（令和8年10月1日発効）",
    origen: { tipo: "oficial", url: "https://www.mhlw.go.jp/content/11200000/001753404.pdf", detalle: "東京都の令和8年度地域別最低賃金は1,280円（改定前1,226円）、発効日は令和8年10月1日。160時間で204,800円。" },
    fecha: "2026-10-17",
    entrada: { region: "tokyo", horas: 160, jikyu: 1250 },
    esperado: { hora: 1280, mensual: 204800, anual: 2457600, diferencia: -30 },
  },
  {
    nombre: "沖縄県、発効日前",
    origen: { tipo: "oficial", url: "https://www.mhlw.go.jp/content/11200000/001753404.pdf", detalle: "沖縄県の改定後1,086円は令和8年12月2日発効。10月17日時点では改定前の1,023円。" },
    fecha: "2026-10-17",
    entrada: { region: "okinawa", horas: 160, jikyu: null },
    esperado: { hora: 1023, diferencia: null },
  },
  {
    nombre: "沖縄県、発効日後",
    origen: { tipo: "oficial", url: "https://www.mhlw.go.jp/content/11200000/001753404.pdf", detalle: "令和8年12月2日から1,086円。" },
    fecha: "2026-12-15",
    entrada: { region: "okinawa", horas: 100, jikyu: 1100 },
    esperado: { hora: 1086, mensual: 108600, diferencia: 14 },
  },
]);
