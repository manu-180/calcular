import { definirCalculadora, ErrorEntrada, porRegion } from "@/motor/calculo";
import { CAMPO_REGION } from "../lib/plata";

function dodajMjesece(iso: string, mjeseci: number): string {
  const [g, m, d] = iso.split("-").map(Number);
  const u = new Date(Date.UTC(g, m - 1 + mjeseci, d));
  return u.toISOString().slice(0, 10);
}

export default definirCalculadora({
  id: "ba.porodiljsko-odsustvo",
  mercado: "ba",
  concepto: "propio",
  slug: "porodiljsko-odsustvo",
  estado: "publicado",
  requiere: { "ba.porodiljsko": "numero-por-region", "ba.porodiljsko-blizanci-rs": "numero", "ba.porodiljsko-prije": "numero-por-region", "ba.porodiljsko-najkrace-fbih": "numero", "ba.porodiljsko-otac-rs": "numero", "ba.porodiljsko-prosjek-rs": "numero" },
  campos: [
    CAMPO_REGION,
    { id: "pocetak", tipo: "fecha", etiqueta: "Prvi dan odsustva", porDefecto: "hoy" },
    { id: "blizanci", tipo: "si-no", etiqueta: "Blizanci, treće ili naredno dijete", porDefecto: false, visibleSi: { region: ["rs"] } },
    { id: "plata", tipo: "moneda", etiqueta: "Prosječna plata u zadnjih 18 mjeseci", min: 0, porDefecto: 1500, visibleSi: { region: ["rs"] } },
  ],
  calcular(e, v, { redondear }) {
    if (e.region === "rs" && (e.plata ?? 0) <= 0) throw new ErrorEntrada("Unesite platu veću od nule.", "plata");
    const mjeseci = e.region === "rs" && e.blizanci ? v["ba.porodiljsko-blizanci-rs"] : porRegion(v["ba.porodiljsko"], e.region);
    const observaciones = e.region === "fbih" ? ["Visinu naknade u FBiH određuju kantonalni propisi, pa je ne računamo."] : [];
    return { kraj: dodajMjesece(e.pocetak, mjeseci), mjeseci, naknada: e.region === "rs" ? redondear(e.plata ?? 0) : null, observaciones };
  },
  resultado: [
    { clave: "kraj", etiqueta: "Odsustvo traje do", formato: "fecha", destacada: true },
    { clave: "mjeseci", etiqueta: "Trajanje", formato: "meses" },
    { clave: "naknada", etiqueta: "Mjesečna naknada plate", formato: "moneda" },
  ],
});
