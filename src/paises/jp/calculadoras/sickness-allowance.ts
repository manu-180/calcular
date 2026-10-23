import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { nichigaku } from "../lib/kyufu";

export default definirCalculadora({
  id: "jp.sickness-allowance",
  mercado: "jp",
  concepto: "propio",
  slug: "sickness-allowance",
  estado: "publicado",
  requiere: {
    "jp.sickness-waiting-days": "numero",
    "jp.sickness-max-months": "numero",
  },
  campos: [
    { id: "promedio", tipo: "moneda", etiqueta: "支給開始日以前12か月の標準報酬月額の平均", min: 0, porDefecto: 300000 },
    { id: "dias", tipo: "entero", etiqueta: "病気やけがで連続して休んだ日数（待期を含む）", min: 1, max: 548, porDefecto: 30 },
    { id: "salario", tipo: "moneda", etiqueta: "休んだ期間に会社から支払われた給与の日額", min: 0, porDefecto: 0 },
  ],
  calcular(entrada, v) {
    if (entrada.promedio <= 0) throw new ErrorEntrada("標準報酬月額の平均を入力してください。", "promedio");
    const { base, diario } = nichigaku(entrada.promedio);
    const espera = v["jp.sickness-waiting-days"];
    const pagados = Math.max(0, entrada.dias - espera);
    const porDia = Math.max(0, diario - entrada.salario);
    const observaciones: string[] = [];
    if (entrada.dias <= espera) observaciones.push(`連続して${espera}日間休んだ後（待期）、4日目以降の休んだ日が支給の対象です。`);
    if (entrada.salario >= diario) observaciones.push("給与の日額が傷病手当金の日額以上なので、傷病手当金は支給されません。");
    return { total: porDia * pagados, diario, porDia, base, pagados, maximo: v["jp.sickness-max-months"], observaciones };
  },
  resultado: [
    { clave: "total", etiqueta: "傷病手当金の合計", formato: "moneda", destacada: true },
    { clave: "diario", etiqueta: "1日あたりの傷病手当金", formato: "moneda" },
    { clave: "porDia", etiqueta: "給与との差額を引いた1日あたりの支給額", formato: "moneda" },
    { clave: "pagados", etiqueta: "支給対象の日数（待期3日を除く）", formato: "dias" },
    { clave: "maximo", etiqueta: "支給期間（通算）", formato: "meses" },
  ],
});
