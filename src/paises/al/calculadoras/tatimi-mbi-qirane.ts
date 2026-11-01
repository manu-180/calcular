import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "al.tatimi-mbi-qirane",
  mercado: "al",
  concepto: "propio",
  slug: "tatimi-mbi-qirane",
  estado: "publicado",
  requiere: { "al.tatim-investim": "numero" },
  campos: [
    { id: "qiraja", tipo: "moneda", etiqueta: "Qiraja në muaj", min: 0, porDefecto: 60000 },
    { id: "muaj", tipo: "entero", etiqueta: "Muaj me qira në vit", min: 1, max: 12, porDefecto: 12 },
  ],
  calcular(e, v, { redondear }) {
    if (e.qiraja <= 0) throw new ErrorEntrada("Vendosni një qira më të madhe se zero.", "qiraja");
    const mujor = redondear((e.qiraja * v["al.tatim-investim"]) / 100);
    const vjetor = redondear((e.qiraja * e.muaj * v["al.tatim-investim"]) / 100);
    return { mujor, neto: redondear(e.qiraja - mujor), vjetor, netoVjetor: redondear(e.qiraja * e.muaj - vjetor) };
  },
  resultado: [
    { clave: "mujor", etiqueta: "Tatimi në muaj", formato: "moneda", destacada: true },
    { clave: "neto", etiqueta: "Qiraja neto në muaj", formato: "moneda" },
    { clave: "vjetor", etiqueta: "Tatimi në vit", formato: "moneda" },
    { clave: "netoVjetor", etiqueta: "Qiraja neto në vit", formato: "moneda" },
  ],
});
