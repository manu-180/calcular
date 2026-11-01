import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { AVISO_TAVANI, brutoNgaNeto, REQUIERE_PAGA } from "../lib/paga";

export default definirCalculadora({
  id: "al.paga-bruto-nga-neto",
  mercado: "al",
  concepto: "propio",
  slug: "paga-bruto-nga-neto",
  estado: "publicado",
  requiere: REQUIERE_PAGA,
  campos: [
    { id: "neto", tipo: "moneda", etiqueta: "Paga neto që dëshironi në muaj", min: 0, porDefecto: 80000 },
    { id: "tavani", tipo: "moneda", etiqueta: "Paga maksimale për kontributet (nuk është e detyrueshme)", min: 0, requerido: false, ayuda: "Vlen për paga të larta. Vendosni shifrën e fundit nga Administrata Tatimore. Nëse e lini bosh, kontributi shoqëror llogaritet mbi të gjithë pagën." },
  ],
  calcular(e, v, { redondear }) {
    if (e.neto <= 0) throw new ErrorEntrada("Vendosni një pagë neto më të madhe se zero.", "neto");
    const p = brutoNgaNeto(e.neto, v, redondear, e.tavani);
    if (!p) throw new ErrorEntrada("Kjo pagë neto është shumë e lartë për t'u llogaritur.", "neto");
    const observaciones: string[] = [];
    if (p.neto > e.neto) observaciones.push("Rezultati është paga bruto më e ulët e lejuar, ose e para që e arrin këtë neto. Neto del pak më e lartë se ajo që kërkuat.");
    if (e.tavani === null) observaciones.push(AVISO_TAVANI);
    return {
      bruto: p.bruto,
      netoReal: p.neto,
      shoqerore: p.shoqerore,
      shendetesore: p.shendetesore,
      tatimi: p.tatimi,
      kosto: p.kosto,
      observaciones,
    };
  },
  resultado: [
    { clave: "bruto", etiqueta: "Paga bruto që duhet", formato: "moneda", destacada: true },
    { clave: "netoReal", etiqueta: "Paga neto me këtë bruto", formato: "moneda" },
    { clave: "shoqerore", etiqueta: "Sigurimet shoqërore", formato: "moneda" },
    { clave: "shendetesore", etiqueta: "Sigurimet shëndetësore", formato: "moneda" },
    { clave: "tatimi", etiqueta: "Tatimi mbi pagën", formato: "moneda" },
    { clave: "kosto", etiqueta: "Kostoja e punëdhënësit", formato: "moneda" },
  ],
});
