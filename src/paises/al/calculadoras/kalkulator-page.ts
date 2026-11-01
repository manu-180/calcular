import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { llogaritPagen, REQUIERE_PAGA } from "../lib/paga";

export default definirCalculadora({
  id: "al.kalkulator-page",
  mercado: "al",
  concepto: "sueldo-neto",
  slug: "kalkulator-page",
  estado: "publicado",
  requiere: { ...REQUIERE_PAGA, "al.paga-mesatare": "numero" },
  campos: [{ id: "bruto", tipo: "moneda", etiqueta: "Paga bruto në muaj", min: 0, porDefecto: 90000 }],
  calcular(e, v, { redondear }) {
    if (e.bruto <= 0) throw new ErrorEntrada("Vendosni një pagë bruto më të madhe se zero.", "bruto");
    const p = llogaritPagen(e.bruto, v, redondear);
    const observaciones: string[] = [];
    if (e.bruto < v["al.paga-minimale"]) observaciones.push("Kjo pagë është nën pagën minimale. Kontributet llogariten gjithsesi mbi pagën minimale, për punë mbi 87 orë në muaj.");
    if (e.bruto > v["al.paga-maksimale-kontribute"]) observaciones.push("Kontributi shoqëror ndalet te paga maksimale. Kontributi shëndetësor llogaritet mbi të gjithë pagën.");
    return {
      neto: p.neto,
      shoqerore: p.shoqerore,
      shendetesore: p.shendetesore,
      tatimi: p.tatimi,
      zbritja: p.zbritja,
      bazaTatimore: p.bazaTatimore,
      netoVjetore: redondear(p.neto * 12),
      kosto: p.kosto,
      observaciones,
    };
  },
  resultado: [
    { clave: "neto", etiqueta: "Paga neto në muaj", formato: "moneda", destacada: true },
    { clave: "shoqerore", etiqueta: "Sigurimet shoqërore", formato: "moneda" },
    { clave: "shendetesore", etiqueta: "Sigurimet shëndetësore", formato: "moneda" },
    { clave: "tatimi", etiqueta: "Tatimi mbi pagën", formato: "moneda" },
    { clave: "zbritja", etiqueta: "Zbritja nga baza tatimore", formato: "moneda" },
    { clave: "bazaTatimore", etiqueta: "Baza tatimore", formato: "moneda" },
    { clave: "netoVjetore", etiqueta: "Paga neto në vit", formato: "moneda" },
    { clave: "kosto", etiqueta: "Kostoja e punëdhënësit", formato: "moneda" },
  ],
  mundo: { bruto: "bruto", periodoBruto: "mes", neto: "neto", periodoNeto: "mes" },
});
