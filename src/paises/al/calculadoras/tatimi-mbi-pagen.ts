import { aplicarEscalaMarginal, definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { llogaritPagen, REQUIERE_PAGA, zbritjaPersonale } from "../lib/paga";

export default definirCalculadora({
  id: "al.tatimi-mbi-pagen",
  mercado: "al",
  concepto: "impuesto-renta",
  slug: "tatimi-mbi-pagen",
  estado: "publicado",
  requiere: { ...REQUIERE_PAGA, "al.kompensim-femije": "numero", "al.zbritje-arsim": "numero", "al.kufi-arsim": "numero" },
  campos: [
    { id: "paga", tipo: "moneda", etiqueta: "Paga bruto në muaj", min: 0, porDefecto: 90000 },
    { id: "femije", tipo: "entero", etiqueta: "Fëmijë në ngarkim nën 18 vjeç", min: 0, max: 15, porDefecto: 0, ayuda: "I kërkon anëtari i familjes me të ardhurat më të larta." },
    { id: "arsimi", tipo: "moneda", etiqueta: "Shpenzime vjetore për arsimin e fëmijëve", min: 0, porDefecto: 0 },
  ],
  calcular(e, v, { redondear }) {
    if (e.paga <= 0) throw new ErrorEntrada("Vendosni një pagë më të madhe se zero.", "paga");
    const p = llogaritPagen(e.paga, v, redondear);
    const vjetore = e.paga * 12;
    const zbritjaVjetore = zbritjaPersonale(e.paga, v["al.zbritje-personale"]) * 12;
    const kompensim = e.femije * v["al.kompensim-femije"];
    const arsimi = vjetore < v["al.kufi-arsim"] ? Math.min(e.arsimi, v["al.zbritje-arsim"]) : 0;
    const bazaVjetore = Math.max(0, vjetore - zbritjaVjetore - kompensim - arsimi);
    const tatimiVjetor = redondear(aplicarEscalaMarginal(v["al.tatim-punesim"], bazaVjetore));
    const mbajtur = redondear(p.tatimi * 12);
    const observaciones: string[] = [];
    if (e.arsimi > 0 && arsimi === 0) observaciones.push("Zbritja për arsimin vlen vetëm kur të ardhurat vjetore janë nën kufirin e ligjit.");
    return {
      tatimiMujor: p.tatimi,
      mbajtur,
      kompensim,
      arsimi,
      bazaVjetore,
      tatimiVjetor,
      kthim: redondear(Math.max(0, mbajtur - tatimiVjetor)),
      observaciones,
    };
  },
  resultado: [
    { clave: "tatimiMujor", etiqueta: "Tatimi mbi pagën në muaj", formato: "moneda", destacada: true },
    { clave: "mbajtur", etiqueta: "Tatimi i mbajtur në vit", formato: "moneda" },
    { clave: "kompensim", etiqueta: "Kompensimi për fëmijët", formato: "moneda", ocultarSiCero: true },
    { clave: "arsimi", etiqueta: "Zbritja për arsimin", formato: "moneda", ocultarSiCero: true },
    { clave: "bazaVjetore", etiqueta: "Baza tatimore vjetore", formato: "moneda" },
    { clave: "tatimiVjetor", etiqueta: "Tatimi vjetor sipas deklaratës", formato: "moneda" },
    { clave: "kthim", etiqueta: "Tatimi që mund të kërkoni mbrapsht", formato: "moneda", ocultarSiCero: true },
  ],
});
