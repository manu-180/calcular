import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { netoOtBruto, REQ_ZAPLATA } from "../lib/zaplata";

export default definirCalculadora({
  id: "bg.obezshtenie-za-maychinstvo",
  mercado: "bg",
  concepto: "propio",
  slug: "obezshtenie-za-maychinstvo",
  estado: "publicado",
  requiere: { ...REQ_ZAPLATA, "bg.minimalna-zaplata": "numero", "bg.maychinstvo-protsent": "numero", "bg.maychinstvo-dni": "numero", "bg.maychinstvo-period": "numero", "bg.otglezhdane-dete": "numero" },
  campos: [
    { id: "dohod", tipo: "moneda", etiqueta: "Среден брутен месечен доход за последните 24 месеца", min: 0, porDefecto: 1500 },
    { id: "dniMesets", tipo: "entero", etiqueta: "Работни дни средно в месец", min: 15, max: 23, porDefecto: 21 },
    { id: "kalendarni", tipo: "entero", etiqueta: "Календарни дни обезщетение", min: 1, max: 410, porDefecto: 410 },
  ],
  calcular(e, v, { redondear }) {
    if (e.dohod <= 0) throw new ErrorEntrada("Въведете доход над нула.", "dohod");
    if (e.kalendarni > v["bg.maychinstvo-dni"]) throw new ErrorEntrada("Срокът е до 410 дни.", "kalendarni");
    const dohod = Math.min(e.dohod, v["bg.maks-osig-dohod"]);
    const neto = netoOtBruto(dohod, { rabotnik: v["bg.vnoski-rabotnik"], zdravna: v["bg.zdravna-vnoska"], danak: v["bg.danak-dohodi"], maks: v["bg.maks-osig-dohod"] }, redondear).neto;
    const pregrada = (dohod / e.dniMesets) * (v["bg.maychinstvo-protsent"] / 100);
    const netoDen = neto / e.dniMesets;
    const minDen = v["bg.minimalna-zaplata"] / e.dniMesets;
    const den = redondear(Math.max(Math.min(pregrada, netoDen), minDen));
    const rabotniDni = Math.round((e.kalendarni * 5) / 7);
    return {
      mesechno: redondear(den * e.dniMesets),
      den,
      rabotniDni,
      obshto: redondear(den * rabotniDni),
      sledTova: v["bg.otglezhdane-dete"],
    };
  },
  resultado: [
    { clave: "mesechno", etiqueta: "Обезщетение за среден месец", formato: "moneda", destacada: true },
    { clave: "den", etiqueta: "Обезщетение на работен ден", formato: "moneda" },
    { clave: "rabotniDni", etiqueta: "Работни дни приблизително", formato: "dias" },
    { clave: "obshto", etiqueta: "Сума за целия период приблизително", formato: "moneda" },
    { clave: "sledTova", etiqueta: "След това: обезщетение за отглеждане на дете на месец", formato: "moneda" },
  ],
});
