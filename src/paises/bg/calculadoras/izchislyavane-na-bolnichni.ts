import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { netoOtBruto, REQ_ZAPLATA } from "../lib/zaplata";

export default definirCalculadora({
  id: "bg.izchislyavane-na-bolnichni",
  mercado: "bg",
  concepto: "propio",
  slug: "izchislyavane-na-bolnichni",
  estado: "publicado",
  requiere: { ...REQ_ZAPLATA, "bg.bolnichni": "mapa", "bg.bolnichni-dni-rabotodatel": "numero", "bg.bolnichni-period": "numero" },
  campos: [
    { id: "dohod", tipo: "moneda", etiqueta: "Среден брутен месечен доход за последните 18 месеца", min: 0, porDefecto: 1500 },
    { id: "dniMesets", tipo: "entero", etiqueta: "Работни дни средно в месец", min: 15, max: 23, porDefecto: 21 },
    { id: "dni", tipo: "entero", etiqueta: "Работни дни в болничния", min: 1, max: 260, porDefecto: 10 },
    { id: "stazh", tipo: "si-no", etiqueta: "Имате поне 6 месеца осигурителен стаж за този риск", porDefecto: true },
  ],
  calcular(e, v, { redondear }) {
    if (e.dohod <= 0) throw new ErrorEntrada("Въведете доход над нула.", "dohod");
    if (e.dni <= 0) throw new ErrorEntrada("Въведете поне един работен ден.", "dni");
    const m = v["bg.bolnichni"];
    const dohod = Math.min(e.dohod, v["bg.maks-osig-dohod"]);
    const neto = netoOtBruto(dohod, { rabotnik: v["bg.vnoski-rabotnik"], zdravna: v["bg.zdravna-vnoska"], danak: v["bg.danak-dohodi"], maks: v["bg.maks-osig-dohod"] }, redondear).neto;
    const brutoDen = e.dohod / e.dniMesets;
    const dniFirma = Math.min(e.dni, v["bg.bolnichni-dni-rabotodatel"]);
    const firmaDen = redondear((brutoDen * enMapa(m, "rabotodatel")) / 100);
    const firma = redondear(firmaDen * dniFirma);
    const pregrada = (dohod / e.dniMesets) * (enMapa(m, "noi") / 100);
    const netoDen = neto / e.dniMesets;
    const noiDen = redondear(Math.min(pregrada, netoDen));
    const dniNoi = e.stazh ? e.dni - dniFirma : 0;
    const noi = redondear(noiDen * dniNoi);
    const observaciones: string[] = [];
    if (!e.stazh) observaciones.push("Без 6 месеца стаж НОИ не плаща обезщетение, освен ако сте под 18 години или причината е трудова злополука или професионална болест.");
    return { obshto: redondear(firma + noi), firma, firmaDen, noi, noiDen, dniNoi, observaciones };
  },
  resultado: [
    { clave: "obshto", etiqueta: "Общо за болничния", formato: "moneda", destacada: true },
    { clave: "firma", etiqueta: "Плаща работодателят", formato: "moneda" },
    { clave: "firmaDen", etiqueta: "На ден от работодателя", formato: "moneda" },
    { clave: "noi", etiqueta: "Плаща НОИ", formato: "moneda" },
    { clave: "noiDen", etiqueta: "На ден от НОИ", formato: "moneda" },
    { clave: "dniNoi", etiqueta: "Дни, платени от НОИ", formato: "dias" },
  ],
});
