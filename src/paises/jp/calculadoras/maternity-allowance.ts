import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { nichigaku } from "../lib/kyufu";

export default definirCalculadora({
  id: "jp.maternity-allowance",
  mercado: "jp",
  concepto: "propio",
  slug: "maternity-allowance",
  estado: "publicado",
  requiere: { "jp.maternity-allowance-days": "mapa" },
  campos: [
    { id: "promedio", tipo: "moneda", etiqueta: "支給開始日以前12か月の標準報酬月額の平均", min: 0, porDefecto: 300000 },
    { id: "multiple", tipo: "si-no", etiqueta: "多胎妊娠（双子以上）です", porDefecto: false },
    { id: "retraso", tipo: "entero", etiqueta: "出産が予定日より遅れた日数", min: 0, max: 30, porDefecto: 0 },
  ],
  calcular(entrada, v) {
    if (entrada.promedio <= 0) throw new ErrorEntrada("標準報酬月額の平均を入力してください。", "promedio");
    const { base, diario } = nichigaku(entrada.promedio);
    const d = v["jp.maternity-allowance-days"];
    const dias = (entrada.multiple ? d["prenatal-multiple"] : d.prenatal) + entrada.retraso + d.postnatal;
    return {
      total: diario * dias,
      diario,
      base,
      dias,
      observaciones: ["休んだ期間に給与が支払われ、その日額が出産手当金の日額より少ない場合は、差額が支給されます。"],
    };
  },
  resultado: [
    { clave: "total", etiqueta: "出産手当金の合計（産前産後をすべて休んだ場合）", formato: "moneda", destacada: true },
    { clave: "diario", etiqueta: "1日あたりの支給額", formato: "moneda" },
    { clave: "base", etiqueta: "標準報酬月額の平均の30分の1", formato: "moneda" },
    { clave: "dias", etiqueta: "支給対象の日数", formato: "dias" },
  ],
});
