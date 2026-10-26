import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "dk.ejendomsvaerdiskat",
  mercado: "dk",
  concepto: "propio",
  slug: "ejendomsvaerdiskat",
  estado: "publicado",
  requiere: {
    "dk.ejendomsvaerdiskat-satser": "mapa",
    "dk.ejendomsvaerdiskat-graense": "numero",
    "dk.beskatningsgrundlag-andel": "numero",
  },
  campos: [
    {
      id: "vurdering",
      tipo: "moneda",
      etiqueta: "Ejendomsværdi (offentlig ejendomsvurdering)",
      ayuda: "Ejendomsværdien fra din vurdering. Skatten for et år beregnes af vurderingen fra året før.",
      min: 0,
      porDefecto: 3500000,
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.vurdering <= 0) throw new ErrorEntrada("Skriv en ejendomsværdi, der er større end 0.", "vurdering");
    const s = v["dk.ejendomsvaerdiskat-satser"];
    const graense = v["dk.ejendomsvaerdiskat-graense"];
    const grundlag = redondear(porcentaje(e.vurdering, v["dk.beskatningsgrundlag-andel"]));
    // Satserne er i promille.
    const alm = redondear((Math.min(grundlag, graense) * enMapa(s, "alm")) / 1000);
    const progressiv = redondear((Math.max(0, grundlag - graense) * enMapa(s, "progressiv")) / 1000);
    const skat = redondear(alm + progressiv);
    return {
      skat,
      maaned: redondear(skat / 12),
      grundlag,
      alm,
      progressiv,
      observaciones: ["Beregningen er uden skatterabat og nedslag, fx for pensionister eller for boliger købt senest 1. juli 1998. Din ejendomsskattebillet viser det endelige beløb."],
    };
  },
  resultado: [
    { clave: "skat", etiqueta: "Ejendomsværdiskat om året", formato: "moneda", destacada: true },
    { clave: "maaned", etiqueta: "Ejendomsværdiskat pr. måned", formato: "moneda" },
    { clave: "grundlag", etiqueta: "Beskatningsgrundlag", formato: "moneda" },
    { clave: "alm", etiqueta: "Almindelig sats", formato: "moneda" },
    { clave: "progressiv", etiqueta: "Progressiv sats over grænsen", formato: "moneda", ocultarSiCero: true },
  ],
});
