import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "dk.am-bidrag",
  mercado: "dk",
  concepto: "aportes-seguridad-social",
  slug: "am-bidrag",
  estado: "publicado",
  requiere: {
    "dk.am-bidrag": "numero",
    "dk.atp-loenmodtager": "mapa",
    "dk.atp-arbejdsgiver": "mapa",
  },
  campos: [
    { id: "loen", tipo: "moneda", etiqueta: "Månedsløn før skat", min: 0, porDefecto: 40000 },
    { id: "pension", tipo: "porcentaje", etiqueta: "Din egen pensionsindbetaling i procent af lønnen", min: 0, max: 50, porDefecto: 0 },
    { id: "atp", tipo: "si-no", etiqueta: "Fuldt ATP-bidrag (mindst 117 timer om måneden)", porDefecto: true },
  ],
  calcular(e, v, { redondear }) {
    if (e.loen <= 0) throw new ErrorEntrada("Skriv en månedsløn, der er større end 0.", "loen");
    const pension = redondear(porcentaje(e.loen, e.pension));
    const atp = e.atp ? enMapa(v["dk.atp-loenmodtager"], "fuld") : 0;
    const atpArbejdsgiver = e.atp ? enMapa(v["dk.atp-arbejdsgiver"], "fuld") : 0;
    const grundlag = redondear(e.loen - pension - atp);
    const am = redondear(porcentaje(grundlag, v["dk.am-bidrag"]));
    return {
      am,
      amAar: redondear(am * 12),
      grundlag,
      pension,
      atp,
      atpArbejdsgiver,
      efterAm: redondear(grundlag - am),
    };
  },
  resultado: [
    { clave: "am", etiqueta: "Am-bidrag pr. måned", formato: "moneda", destacada: true },
    { clave: "amAar", etiqueta: "Am-bidrag pr. år", formato: "moneda" },
    { clave: "grundlag", etiqueta: "Am-grundlag (løn efter pension og ATP)", formato: "moneda" },
    { clave: "pension", etiqueta: "Egen pension pr. måned", formato: "moneda", ocultarSiCero: true },
    { clave: "atp", etiqueta: "Din ATP pr. måned", formato: "moneda", ocultarSiCero: true },
    { clave: "atpArbejdsgiver", etiqueta: "Arbejdsgiverens ATP pr. måned", formato: "moneda", ocultarSiCero: true },
    { clave: "efterAm", etiqueta: "Løn efter am-bidrag (før skat)", formato: "moneda" },
  ],
});
