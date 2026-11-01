import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "is.tryggingagjald",
  mercado: "is",
  concepto: "propio",
  slug: "tryggingagjald",
  estado: "publicado",
  requiere: { "is.tryggingagjald": "numero", "is.tryggingagjald-sjomenn": "numero", "is.lifeyrir-motframlag": "numero" },
  campos: [
    { id: "laun", tipo: "moneda", etiqueta: "Launagreiðslur", min: 0, porDefecto: 700000 },
    { id: "motframlag", tipo: "si-no", etiqueta: "Með mótframlagi í lífeyrissjóð í stofni", ayuda: "Í dæmi Skattsins reiknast gjaldið af launum að viðbættu mótframlagi.", porDefecto: true },
    { id: "sjomadur", tipo: "si-no", etiqueta: "Laun sjómanns á fiskiskipi", porDefecto: false },
  ],
  calcular(e, v, { redondear }) {
    if (e.laun <= 0) throw new ErrorEntrada("Sláðu inn upphæð hærri en núll.", "laun");
    const stofn = e.laun + (e.motframlag ? redondear(porcentaje(e.laun, v["is.lifeyrir-motframlag"])) : 0);
    const hlutfall = e.sjomadur ? v["is.tryggingagjald-sjomenn"] : v["is.tryggingagjald"];
    return { stofn, hlutfall, gjald: redondear(porcentaje(stofn, hlutfall)) };
  },
  resultado: [
    { clave: "stofn", etiqueta: "Gjaldstofn", formato: "moneda" },
    { clave: "hlutfall", etiqueta: "Hlutfall", formato: "porcentaje", decimales: 2 },
    { clave: "gjald", etiqueta: "Tryggingagjald", formato: "moneda", destacada: true },
  ],
});
