import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "lv.vsaoi-kalkulators",
  mercado: "lv",
  concepto: "aportes-seguridad-social",
  slug: "vsaoi-kalkulators",
  estado: "publicado",
  requiere: {
    "lv.vsaoi-darba-nemejs": "mapa",
    "lv.vsaoi-darba-devejs": "mapa",
    "lv.vsaoi-maksimums": "numero",
    "lv.solidaritate-darba-nemejs": "numero",
    "lv.solidaritate-darba-devejs": "numero",
  },
  campos: [
    { id: "alga", tipo: "moneda", etiqueta: "Bruto alga mēnesī", min: 0, porDefecto: 1750 },
    { id: "kategorija", tipo: "opcion-dato", dato: "lv.vsaoi-darba-nemejs", etiqueta: "Kategorija", porDefecto: "vispariga" },
  ],
  calcular(e, v, { redondear }) {
    if (e.alga <= 0) throw new ErrorEntrada("Ievadiet bruto algu, kas lielāka par nulli.", "alga");
    const darbaNemejs = redondear(porcentaje(e.alga, enMapa(v["lv.vsaoi-darba-nemejs"], e.kategorija)));
    const darbaDevejs = redondear(porcentaje(e.alga, enMapa(v["lv.vsaoi-darba-devejs"], e.kategorija)));
    const gada = e.alga * 12;
    return {
      kopa: redondear(darbaNemejs + darbaDevejs),
      darbaNemejs,
      darbaDevejs,
      kopejaLikme: enMapa(v["lv.vsaoi-darba-nemejs"], e.kategorija) + enMapa(v["lv.vsaoi-darba-devejs"], e.kategorija),
      virsMaksimuma: redondear(Math.max(0, gada - v["lv.vsaoi-maksimums"])),
    };
  },
  resultado: [
    { clave: "kopa", etiqueta: "Kopā iemaksas mēnesī", formato: "moneda", destacada: true },
    { clave: "darbaNemejs", etiqueta: "Darba ņēmēja daļa", formato: "moneda" },
    { clave: "darbaDevejs", etiqueta: "Darba devēja daļa", formato: "moneda" },
    { clave: "kopejaLikme", etiqueta: "Kopējā likme", formato: "porcentaje" },
    { clave: "virsMaksimuma", etiqueta: "Gada ienākums virs maksimuma (solidaritātes nodoklis)", formato: "moneda", ocultarSiCero: true },
  ],
});
