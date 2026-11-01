import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "ee.koondamishuvitis",
  mercado: "ee",
  concepto: "indemnizacion-despido",
  slug: "koondamishuvitis",
  estado: "publicado",
  requiere: { "ee.koondamine-tooandja": "numero", "ee.koondamine-tootukassa": "mapa" },
  campos: [
    { id: "palk", tipo: "moneda", etiqueta: "Keskmine töötasu kuus", min: 0, porDefecto: 2000 },
    { id: "aastad", tipo: "numero", etiqueta: "Töösuhte kestus selle tööandja juures (aastad)", min: 0, max: 60, porDefecto: 12 },
  ],
  calcular(e, v, { redondear }) {
    if (e.palk <= 0) throw new ErrorEntrada("Sisesta töötasu, mis on suurem kui null.", "palk");
    if (e.aastad < 0) throw new ErrorEntrada("Aastate arv ei saa olla negatiivne.", "aastad");
    const tooandja = redondear(e.palk * v["ee.koondamine-tooandja"]);
    const kuud = e.aastad < 5 ? 0 : enMapa(v["ee.koondamine-tootukassa"], e.aastad > 10 ? "ule10" : "kuni10");
    const tootukassa = redondear(e.palk * kuud);
    return { kokku: redondear(tooandja + tootukassa), tooandja, tootukassa, tootukassaKuud: kuud };
  },
  resultado: [
    { clave: "kokku", etiqueta: "Hüvitised kokku bruto", formato: "moneda", destacada: true },
    { clave: "tooandja", etiqueta: "Tööandja maksab", formato: "moneda" },
    { clave: "tootukassa", etiqueta: "Töötukassa maksab", formato: "moneda", ocultarSiCero: true },
    { clave: "tootukassaKuud", etiqueta: "Töötukassa hüvitis", formato: "meses", ocultarSiCero: true },
  ],
});
