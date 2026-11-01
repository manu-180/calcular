import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { sumarDias } from "@/motor/vigencia";

export default definirCalculadora({
  id: "mn.ajlaas-garakh-medegdel",
  mercado: "mn",
  concepto: "preaviso",
  slug: "ajlaas-garakh-medegdel",
  estado: "publicado",
  requiere: {
    "mn.medegdel-khonog": "numero",
  },
  campos: [
    { id: "ognoo", tipo: "fecha", etiqueta: "Бичгээр мэдэгдсэн өдөр", porDefecto: "hoy" },
    { id: "khen", tipo: "opcion", etiqueta: "Хэн цуцалж байна вэ", opciones: [{ valor: "ajiltan", etiqueta: "Ажилтан" }, { valor: "olgogch", etiqueta: "Ажил олгогч" }], porDefecto: "ajiltan" },
    { id: "dundaj", tipo: "moneda", etiqueta: "Сарын дундаж цалин (олговор тооцоход)", min: 0, requerido: false },
  ],
  calcular(e, v, { redondear }) {
    if (e.dundaj !== null && e.dundaj < 0) throw new ErrorEntrada("Цалин сөрөг байж болохгүй.", "dundaj");
    const khonog = v["mn.medegdel-khonog"];
    return {
      duusakh: sumarDias(e.ognoo, khonog),
      khonog,
      olgovor: e.khen === "olgogch" && e.dundaj !== null ? redondear((e.dundaj / 30) * khonog) : null,
      observaciones: e.khen === "ajiltan" ? ["79.3 хэсгээр хугацааг тохиролцож богиносгож болно."] : ["Ажиллуулахгүй бол 80.5 хэсгээр олговор олгоно. Энд сарын дунджийг 30 хоногт хуваан ойролцоогоор бодов."],
    };
  },
  resultado: [
    { clave: "duusakh", etiqueta: "Хугацаа дуусах өдөр", formato: "fecha", destacada: true },
    { clave: "khonog", etiqueta: "Мэдэгдлийн хугацаа", formato: "dias" },
    { clave: "olgovor", etiqueta: "Ажиллуулахгүй бол олговор", formato: "moneda" },
  ],
});
