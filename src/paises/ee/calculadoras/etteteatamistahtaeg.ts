import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { sumarDias } from "@/motor/vigencia";

export default definirCalculadora({
  id: "ee.etteteatamistahtaeg",
  mercado: "ee",
  concepto: "preaviso",
  slug: "etteteatamistahtaeg",
  estado: "publicado",
  requiere: { "ee.etteteatamine": "mapa", "ee.etteteatamine-tootaja": "numero" },
  campos: [
    { id: "kes", tipo: "opcion", etiqueta: "Kes töölepingu üles ütleb?", opciones: [{ valor: "tooandja", etiqueta: "Tööandja (erakorraline ülesütlemine)" }, { valor: "tootaja", etiqueta: "Töötaja (korraline ülesütlemine)" }], porDefecto: "tooandja" },
    { id: "aastad", tipo: "numero", etiqueta: "Töösuhte kestus (aastad)", min: 0, max: 60, porDefecto: 3 },
    { id: "kuupaev", tipo: "fecha", etiqueta: "Teatamise kuupäev", requerido: false },
  ],
  calcular(e, v) {
    if (e.aastad < 0) throw new ErrorEntrada("Aastate arv ei saa olla negatiivne.", "aastad");
    const klass = e.aastad < 1 ? "alla1" : e.aastad < 5 ? "kuni5" : e.aastad < 10 ? "kuni10" : "ule10";
    const paevad = e.kes === "tootaja" ? v["ee.etteteatamine-tootaja"] : enMapa(v["ee.etteteatamine"], klass);
    return { paevad, viimane: e.kuupaev ? sumarDias(e.kuupaev, paevad) : null };
  },
  resultado: [
    { clave: "paevad", etiqueta: "Etteteatamistähtaeg", formato: "dias", destacada: true },
    { clave: "viimane", etiqueta: "Tähtaeg lõpeb", formato: "fecha" },
  ],
});
