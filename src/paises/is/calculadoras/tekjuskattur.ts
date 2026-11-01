import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { skatturAfStofni } from "../lib/laun";

export default definirCalculadora({
  id: "is.tekjuskattur",
  mercado: "is",
  concepto: "impuesto-renta",
  slug: "tekjuskattur",
  estado: "publicado",
  requiere: {
    "is.skattthrep-ars": "escala",
    "is.personuafslattur-ars": "numero",
    "is.lifeyrir-launamadur": "numero",
    "is.utsvar-stadgreidsla": "numero",
  },
  campos: [
    { id: "tekjur", tipo: "moneda", etiqueta: "Launatekjur á ári", min: 0, porDefecto: 8400000 },
    { id: "lifeyrir", tipo: "si-no", etiqueta: "Dreginn er frá 4% lífeyrissjóður", porDefecto: true },
    { id: "nyting", tipo: "porcentaje", etiqueta: "Nýting persónuafsláttar", min: 0, max: 200, porDefecto: 100 },
  ],
  calcular(e, v, { redondear }) {
    if (e.tekjur <= 0) throw new ErrorEntrada("Sláðu inn tekjur hærri en núll.", "tekjur");
    const stofn = e.tekjur - (e.lifeyrir ? redondear(porcentaje(e.tekjur, v["is.lifeyrir-launamadur"])) : 0);
    const reiknadur = skatturAfStofni(stofn, v["is.skattthrep-ars"], redondear);
    const afslattur = redondear(porcentaje(v["is.personuafslattur-ars"], e.nyting));
    const skattur = Math.max(0, reiknadur - afslattur);
    const utsvar = redondear(porcentaje(stofn, v["is.utsvar-stadgreidsla"]));
    return {
      stofn,
      reiknadur,
      afslattur,
      skattur,
      utsvar: skattur >= utsvar ? utsvar : null,
      hlutfall: (skattur / e.tekjur) * 100,
    };
  },
  resultado: [
    { clave: "stofn", etiqueta: "Skattstofn", formato: "moneda" },
    { clave: "reiknadur", etiqueta: "Reiknaður skattur í þrepum", formato: "moneda" },
    { clave: "afslattur", etiqueta: "Persónuafsláttur", formato: "moneda" },
    { clave: "skattur", etiqueta: "Skattur á ári", formato: "moneda", destacada: true },
    { clave: "utsvar", etiqueta: "Þar af útsvar miðað við meðaltal", formato: "moneda" },
    { clave: "hlutfall", etiqueta: "Meðalskatthlutfall", formato: "porcentaje", decimales: 1 },
  ],
});
