import { aplicarEscalaMarginal, definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { filaDe, susuanKouchu } from "../lib/geshui";

export default definirCalculadora({
  id: "cn.laowu-baochou-geshui",
  mercado: "cn",
  concepto: "retencion-honorarios",
  slug: "laowu-baochou-geshui",
  estado: "publicado",
  requiere: {
    "cn.yukou-laowu-shuilv": "escala",
    "cn.yukou-feiyong-ding": "numero",
    "cn.yukou-feiyong-menkan": "numero",
    "cn.laowu-feiyong-bili": "numero",
    "cn.gaochou-jianan-bili": "numero",
    "cn.yukou-gaochou-lv": "numero",
  },
  campos: [
    { id: "shouru", tipo: "moneda", etiqueta: "每次收入（税前）", min: 0, porDefecto: 10000 },
    {
      id: "leixing",
      tipo: "opcion",
      etiqueta: "所得类型",
      opciones: [
        { valor: "laowu", etiqueta: "劳务报酬" },
        { valor: "gaochou", etiqueta: "稿酬" },
        { valor: "texu", etiqueta: "特许权使用费" },
      ],
      porDefecto: "laowu",
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.shouru <= 0) throw new ErrorEntrada("请填写每次收入金额。", "shouru");
    const feiyong = e.shouru <= v["cn.yukou-feiyong-menkan"] ? v["cn.yukou-feiyong-ding"] : redondear(porcentaje(e.shouru, v["cn.laowu-feiyong-bili"]));
    const yu = Math.max(0, e.shouru - feiyong);
    const suode = redondear(e.leixing === "gaochou" ? porcentaje(yu, v["cn.gaochou-jianan-bili"]) : yu);
    let shui: number;
    let tasa: number;
    let kouchu = 0;
    if (e.leixing === "laowu") {
      const escala = v["cn.yukou-laowu-shuilv"];
      shui = aplicarEscalaMarginal(escala, suode);
      tasa = suode > 0 ? filaDe(escala, suode).tasa : 0;
      kouchu = suode > 0 ? susuanKouchu(escala, suode) : 0;
    } else {
      tasa = v["cn.yukou-gaochou-lv"];
      shui = porcentaje(suode, tasa);
    }
    const yukou = redondear(shui);
    return { yukou, shuihou: redondear(e.shouru - yukou), feiyong, suode, tasa, kouchu };
  },
  resultado: [
    { clave: "yukou", etiqueta: "应预扣预缴个税", formato: "moneda", destacada: true },
    { clave: "shuihou", etiqueta: "税后到手", formato: "moneda" },
    { clave: "feiyong", etiqueta: "减除费用", formato: "moneda" },
    { clave: "suode", etiqueta: "预扣预缴应纳税所得额", formato: "moneda" },
    { clave: "tasa", etiqueta: "预扣率", formato: "porcentaje", decimales: 0 },
    { clave: "kouchu", etiqueta: "速算扣除数", formato: "moneda", ocultarSiCero: true },
  ],
});
