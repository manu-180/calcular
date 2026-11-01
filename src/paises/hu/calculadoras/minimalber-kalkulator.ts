import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { NINCS_KEDVEZMENY, nettoBer } from "../lib/ber";

export default definirCalculadora({
  id: "hu.minimalber-kalkulator",
  mercado: "hu",
  concepto: "salario-minimo",
  slug: "minimalber-kalkulator",
  estado: "publicado",
  requiere: {
    "hu.minimalber": "mapa",
    "hu.garantalt-berminimum": "mapa",
    "hu.szja": "numero",
    "hu.tb-jarulek": "numero",
    "hu.szocho": "numero",
    "hu.fiatalok-kedvezmenye-hatar": "numero",
    "hu.csaladi-kedvezmeny": "mapa",
    "hu.csaladi-kedvezmeny-beteg": "numero",
    "hu.elso-hazasok-kedvezmenye": "numero",
  },
  campos: [
    {
      id: "fajta",
      tipo: "opcion",
      etiqueta: "Melyik bérminimum vonatkozik rád?",
      opciones: [
        { valor: "minimalber", etiqueta: "Minimálbér" },
        { valor: "garantalt", etiqueta: "Garantált bérminimum (legalább középfokú végzettséget igénylő munkakör)" },
      ],
      porDefecto: "minimalber",
    },
    { id: "hetiOra", tipo: "numero", etiqueta: "Heti munkaidő (óra)", ayuda: "A teljes munkaidőt heti 40 órával számoljuk. Részmunkaidőben a havi bérminimum arányosan kevesebb.", min: 1, max: 40, porDefecto: 40 },
  ],
  calcular(e, v, { redondear }) {
    if (e.hetiOra <= 0 || e.hetiOra > 40) throw new ErrorEntrada("A heti munkaidő 1 és 40 óra között lehet.", "hetiOra");
    const t = e.fajta === "garantalt" ? v["hu.garantalt-berminimum"] : v["hu.minimalber"];
    const arany = e.hetiOra / 40;
    const havi = redondear(enMapa(t, "havi") * arany);
    const sz = nettoBer(
      havi,
      NINCS_KEDVEZMENY,
      {
        szja: v["hu.szja"],
        tb: v["hu.tb-jarulek"],
        hatar25: v["hu.fiatalok-kedvezmenye-hatar"],
        csaladi: v["hu.csaladi-kedvezmeny"],
        csaladiBeteg: v["hu.csaladi-kedvezmeny-beteg"],
        elsoHazasok: v["hu.elso-hazasok-kedvezmenye"],
        minimalber: enMapa(v["hu.minimalber"], "havi"),
      },
      redondear,
    );
    return {
      havi,
      netto: sz.netto,
      heti: redondear(enMapa(t, "heti") * arany),
      napi: redondear(enMapa(t, "napi") * arany),
      orai: enMapa(t, "orai"),
      eves: redondear(havi * 12),
      munkaltatoiKoltseg: redondear(havi + (havi * v["hu.szocho"]) / 100),
    };
  },
  resultado: [
    { clave: "havi", etiqueta: "Havi bruttó bérminimum", formato: "moneda", destacada: true },
    { clave: "netto", etiqueta: "Nettó, kedvezmények nélkül", formato: "moneda" },
    { clave: "heti", etiqueta: "Hetibér", formato: "moneda" },
    { clave: "napi", etiqueta: "Napibér", formato: "moneda" },
    { clave: "orai", etiqueta: "Órabér", formato: "moneda" },
    { clave: "eves", etiqueta: "Éves bruttó", formato: "moneda" },
    { clave: "munkaltatoiKoltseg", etiqueta: "A munkáltató havi költsége (bér és szocho)", formato: "moneda" },
  ],
});
