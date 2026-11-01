import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "lv.mikrouznemuma-nodoklis",
  mercado: "lv",
  concepto: "regimen-simplificado",
  slug: "mikrouznemuma-nodoklis",
  estado: "publicado",
  requiere: {
    "lv.mikro-likme": "numero",
    "lv.mikro-socialajai-dalai": "numero",
    "lv.pvn-slieksnis": "numero",
  },
  campos: [
    { id: "apgrozijums", tipo: "moneda", etiqueta: "Apgrozījums par periodu", min: 0, porDefecto: 3000 },
    { id: "izdevumi", tipo: "moneda", etiqueta: "Izdevumi par to pašu periodu", min: 0, porDefecto: 500, ayuda: "Nodoklis tos neņem vērā, bet tie parāda, cik jums paliek." },
    { id: "gadaApgrozijums", tipo: "moneda", etiqueta: "Paredzamais gada apgrozījums", min: 0, porDefecto: 36000 },
  ],
  calcular(e, v, { redondear }) {
    if (e.apgrozijums <= 0) throw new ErrorEntrada("Ievadiet apgrozījumu, kas lielāks par nulli.", "apgrozijums");
    const nodoklis = redondear(porcentaje(e.apgrozijums, v["lv.mikro-likme"]));
    const piezimes = e.gadaApgrozijums > v["lv.pvn-slieksnis"] ? ["Paredzamais apgrozījums pārsniedz PVN reģistrācijas slieksni. VID norāda, ka mikrouzņēmumu nodoklim plānotais apgrozījums to nedrīkst pārsniegt."] : [];
    return {
      nodoklis,
      socialajam: redondear(porcentaje(nodoklis, v["lv.mikro-socialajai-dalai"])),
      paliek: redondear(e.apgrozijums - e.izdevumi - nodoklis),
      observaciones: piezimes,
    };
  },
  resultado: [
    { clave: "nodoklis", etiqueta: "Mikrouzņēmumu nodoklis", formato: "moneda", destacada: true },
    { clave: "socialajam", etiqueta: "No tā sociālajām iemaksām", formato: "moneda" },
    { clave: "paliek", etiqueta: "Paliek pēc izdevumiem un nodokļa", formato: "moneda" },
  ],
});
