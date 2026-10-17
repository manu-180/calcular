import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { rszBasis, STATUUT_OPCIONES } from "../lib/loon";

export default definirCalculadora({
  id: "be.loonkost-berekenen",
  mercado: "be",
  concepto: "costo-empleador",
  slug: "loonkost-berekenen",
  estado: "publicado",
  requiere: {
    "be.rsz-werkgever": "mapa",
    "be.vakantiegeld": "mapa",
  },
  campos: [
    { id: "bruto", tipo: "moneda", etiqueta: "Brutomaandloon", min: 0, porDefecto: 3000 },
    { id: "statuut", tipo: "opcion", etiqueta: "Statuut", opciones: STATUUT_OPCIONES, porDefecto: "bediende" },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.bruto <= 0) throw new ErrorEntrada("Vul een brutoloon boven nul in.", "bruto");
    const wg = v["be.rsz-werkgever"];
    const basis = rszBasis(entrada.bruto, entrada.statuut);
    const tarief = wg.basis + wg.loonmatiging;
    const rsz = redondear(porcentaje(basis, tarief));
    const vakantie = entrada.statuut === "arbeider" ? redondear(porcentaje(basis, wg["vakantie-arbeiders"])) : 0;
    const perMaand = redondear(entrada.bruto + rsz + vakantie);
    const dubbel = entrada.statuut === "bediende" ? redondear(porcentaje(entrada.bruto, v["be.vakantiegeld"]["dubbel-bediende"])) : 0;
    const perJaar = redondear(perMaand * 12 + dubbel);
    return {
      perMaand,
      bruto: entrada.bruto,
      rsz,
      tarief,
      vakantie,
      dubbel,
      perJaar,
      observaciones: [
        "Dit is de loonkost zonder RSZ-verminderingen. Veel werkgevers krijgen een structurele vermindering of een doelgroepvermindering, bijvoorbeeld voor eerste aanwervingen of lage lonen, en betalen dan minder.",
        "Niet inbegrepen: eindejaarspremie, maaltijdcheques, verzekering arbeidsongevallen, groepsverzekering, vervoerskosten en andere voordelen.",
      ],
    };
  },
  resultado: [
    { clave: "perMaand", etiqueta: "Loonkost per maand", formato: "moneda", destacada: true },
    { clave: "bruto", etiqueta: "Brutoloon", formato: "moneda" },
    { clave: "rsz", etiqueta: "Plus: werkgeversbijdragen RSZ", formato: "moneda" },
    { clave: "tarief", etiqueta: "Tarief werkgeversbijdragen", formato: "porcentaje" },
    { clave: "vakantie", etiqueta: "Plus: bijdrage voor het vakantiegeld van arbeiders", formato: "moneda", ocultarSiCero: true },
    { clave: "dubbel", etiqueta: "Dubbel vakantiegeld per jaar (bedienden)", formato: "moneda", ocultarSiCero: true },
    { clave: "perJaar", etiqueta: "Loonkost per jaar", formato: "moneda" },
  ],
});
