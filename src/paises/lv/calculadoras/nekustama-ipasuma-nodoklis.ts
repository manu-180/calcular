import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "lv.nekustama-ipasuma-nodoklis",
  mercado: "lv",
  concepto: "propio",
  slug: "nekustama-ipasuma-nodoklis",
  estado: "publicado",
  requiere: { "lv.nin-min": "numero", "lv.nin-max": "numero" },
  campos: [
    { id: "vertiba", tipo: "moneda", etiqueta: "Kadastrālā vērtība", min: 0, porDefecto: 60000 },
    { id: "likme", tipo: "porcentaje", etiqueta: "Jūsu pašvaldības likme", min: 0, porDefecto: 0.2, ayuda: "Pašvaldība to nosaka saistošajos noteikumos. Skatiet tos pašvaldības tīmekļvietnē." },
  ],
  calcular(e, v, { redondear }) {
    if (e.vertiba <= 0) throw new ErrorEntrada("Ievadiet kadastrālo vērtību, kas lielāka par nulli.", "vertiba");
    if (e.likme < v["lv.nin-min"] || e.likme > v["lv.nin-max"]) {
      throw new ErrorEntrada(`Likmei jābūt robežās no ${v["lv.nin-min"]} līdz ${v["lv.nin-max"]} procentiem.`, "likme");
    }
    const gada = redondear(porcentaje(e.vertiba, e.likme));
    return { gada, menesi: redondear(gada / 12) };
  },
  resultado: [
    { clave: "gada", etiqueta: "Nodoklis gadā", formato: "moneda", destacada: true },
    { clave: "menesi", etiqueta: "Vidēji mēnesī", formato: "moneda" },
  ],
});
