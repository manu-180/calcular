import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { tatimiBiznesit } from "../lib/biznes";

export default definirCalculadora({
  id: "al.biznesi-i-vogel",
  mercado: "al",
  concepto: "regimen-simplificado",
  slug: "biznesi-i-vogel",
  estado: "publicado",
  requiere: {
    "al.kufi-zero": "numero",
    "al.kufi-regjim": "numero",
    "al.regjim-vecante": "mapa",
    "al.tatim-biznes": "escala",
    "al.zbritje-personale": "mapa",
    "al.paga-minimale": "numero",
    "al.kontribute-vetepunesuar": "mapa",
  },
  campos: [
    { id: "qarkullimi", tipo: "moneda", etiqueta: "Qarkullimi në vit", min: 0, porDefecto: 8000000 },
    {
      id: "metoda",
      tipo: "opcion",
      etiqueta: "Si i njihni shpenzimet?",
      opciones: [
        { valor: "faktura", etiqueta: "Me dokumentacion dhe fatura" },
        { valor: "prodhim", etiqueta: "Regjim i veçantë: veprimtari prodhuese" },
        { valor: "shumice", etiqueta: "Regjim i veçantë: tregtim me shumicë" },
        { valor: "pakice", etiqueta: "Regjim i veçantë: tregtim me pakicë, transport individual" },
        { valor: "bar", etiqueta: "Regjim i veçantë: bare, restorante" },
        { valor: "sherbime", etiqueta: "Regjim i veçantë: shërbime, artizanat, zejtari" },
      ],
      porDefecto: "pakice",
    },
    { id: "shpenzime", tipo: "moneda", etiqueta: "Shpenzimet në vit", min: 0, porDefecto: 0, visibleSi: { metoda: ["faktura"] } },
  ],
  calcular(e, v, { redondear }) {
    if (e.qarkullimi <= 0) throw new ErrorEntrada("Vendosni qarkullimin vjetor.", "qarkullimi");
    if (e.metoda !== "faktura" && e.qarkullimi > v["al.kufi-regjim"]) throw new ErrorEntrada("Regjimi i veçantë vlen vetëm për qarkullim deri në 10 milionë lekë. Zgjidhni shpenzimet me fatura.", "metoda");
    const shpenzime = e.metoda === "faktura" ? (e.shpenzime ?? 0) : (e.qarkullimi * enMapa(v["al.regjim-vecante"], e.metoda)) / 100;
    if (shpenzime > e.qarkullimi) throw new ErrorEntrada("Shpenzimet nuk mund të jenë më të mëdha se qarkullimi.", "shpenzime");
    const fitimi = redondear(e.qarkullimi - shpenzime);
    const tatimi = e.qarkullimi <= v["al.kufi-zero"] ? 0 : redondear(tatimiBiznesit(fitimi, v["al.zbritje-personale"], v["al.tatim-biznes"]));
    const k = v["al.kontribute-vetepunesuar"];
    const min = v["al.paga-minimale"];
    const kontribute = redondear((((min * enMapa(k, "shoqerore")) / 100 + (2 * min * enMapa(k, "shendetesore")) / 100)) * 12);
    return { tatimi, fitimi, kontribute, mbetet: redondear(fitimi - tatimi - kontribute) };
  },
  resultado: [
    { clave: "tatimi", etiqueta: "Tatimi në vit", formato: "moneda", destacada: true },
    { clave: "fitimi", etiqueta: "Fitimi i tatueshëm", formato: "moneda" },
    { clave: "kontribute", etiqueta: "Kontributet minimale në vit", formato: "moneda" },
    { clave: "mbetet", etiqueta: "Ju mbetet pas tatimit dhe kontributeve", formato: "moneda" },
  ],
});
