import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "cn.chanjia",
  mercado: "cn",
  concepto: "propio",
  slug: "chanjia",
  estado: "publicado",
  requiere: {
    "cn.chanjia": "mapa",
  },
  campos: [
    {
      id: "qingxing",
      tipo: "opcion",
      etiqueta: "情形",
      opciones: [
        { valor: "shengyu", etiqueta: "生育" },
        { valor: "liuchan-xiao", etiqueta: "怀孕未满4个月流产" },
        { valor: "liuchan-da", etiqueta: "怀孕满4个月流产" },
      ],
      porDefecto: "shengyu",
    },
    { id: "nanchan", tipo: "si-no", etiqueta: "难产", porDefecto: false, visibleSi: { qingxing: ["shengyu"] } },
    { id: "taishu", tipo: "entero", etiqueta: "生育婴儿数", min: 1, max: 6, porDefecto: 1, visibleSi: { qingxing: ["shengyu"] } },
  ],
  calcular(e, v) {
    const m = v["cn.chanjia"];
    if (e.qingxing !== "shengyu") return { tianshu: enMapa(m, e.qingxing), chanqian: 0, zengjia: 0 };
    const taishu = e.taishu ?? 1;
    if (taishu < 1) throw new ErrorEntrada("婴儿数至少是1。", "taishu");
    const zengjia = (e.nanchan ? enMapa(m, "nanchan") : 0) + (taishu - 1) * enMapa(m, "duotai");
    return { tianshu: enMapa(m, "jiben") + zengjia, chanqian: enMapa(m, "chanqian"), zengjia };
  },
  resultado: [
    { clave: "tianshu", etiqueta: "产假天数", formato: "dias", destacada: true },
    { clave: "chanqian", etiqueta: "其中产前可以休", formato: "dias", ocultarSiCero: true },
    { clave: "zengjia", etiqueta: "难产或多胞胎增加的天数", formato: "dias", ocultarSiCero: true },
  ],
});
