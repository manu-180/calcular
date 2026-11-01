import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "cz.priplatek-za-prescas",
  mercado: "cz",
  concepto: "horas-extra",
  slug: "priplatek-za-prescas",
  estado: "publicado",
  requiere: { "cz.priplatky": "mapa" },
  campos: [
    { id: "mzda", tipo: "moneda", etiqueta: "Vaše mzda za hodinu", min: 0, porDefecto: 250 },
    {
      id: "vydelek",
      tipo: "moneda",
      etiqueta: "Průměrný hodinový výdělek",
      ayuda: "Příplatky se počítají z průměrného výdělku za předchozí čtvrtletí. Pokud ho neznáte, zadejte hodinovou mzdu.",
      min: 0,
      porDefecto: 250,
    },
    { id: "prescas", tipo: "numero", etiqueta: "Hodiny práce přesčas", min: 0, porDefecto: 10 },
    { id: "noc", tipo: "numero", etiqueta: "Hodiny noční práce (22 až 6 hodin)", min: 0, porDefecto: 0 },
    { id: "vikend", tipo: "numero", etiqueta: "Hodiny práce v sobotu a v neděli", min: 0, porDefecto: 0 },
    { id: "svatek", tipo: "numero", etiqueta: "Hodiny práce ve svátek proplacené místo náhradního volna", min: 0, porDefecto: 0 },
  ],
  calcular(e, v, { redondear }) {
    if (e.mzda <= 0 || e.vydelek <= 0) throw new ErrorEntrada("Zadejte hodinovou mzdu i průměrný výdělek vyšší než nula.", "mzda");
    if (e.prescas + e.noc + e.vikend + e.svatek <= 0) throw new ErrorEntrada("Zadejte aspoň jednu hodinu práce.", "prescas");
    const p = v["cz.priplatky"];
    const zaPrescas = redondear((e.vydelek * e.prescas * enMapa(p, "prescas")) / 100);
    const zaNoc = redondear((e.vydelek * e.noc * enMapa(p, "noc")) / 100);
    const zaVikend = redondear((e.vydelek * e.vikend * enMapa(p, "vikend")) / 100);
    const zaSvatek = redondear((e.vydelek * e.svatek * enMapa(p, "svatek")) / 100);
    const priplatky = redondear(zaPrescas + zaNoc + zaVikend + zaSvatek);
    return {
      priplatky,
      zaPrescas,
      zaNoc,
      zaVikend,
      zaSvatek,
      prescasCelkem: redondear(e.mzda * e.prescas + zaPrescas),
      observaciones: [
        "Jde o zákonné minimum. Hodiny se mohou překrývat, například noční přesčas ve svátek má nárok na všechny příplatky.",
        "Místo příplatku za přesčas se můžete se zaměstnavatelem dohodnout na náhradním volnu.",
      ],
    };
  },
  resultado: [
    { clave: "priplatky", etiqueta: "Příplatky celkem", formato: "moneda", destacada: true },
    { clave: "zaPrescas", etiqueta: "Příplatek za přesčas", formato: "moneda", ocultarSiCero: true },
    { clave: "zaNoc", etiqueta: "Příplatek za noční práci", formato: "moneda", ocultarSiCero: true },
    { clave: "zaVikend", etiqueta: "Příplatek za sobotu a neděli", formato: "moneda", ocultarSiCero: true },
    { clave: "zaSvatek", etiqueta: "Příplatek za svátek", formato: "moneda", ocultarSiCero: true },
    { clave: "prescasCelkem", etiqueta: "Za přesčasové hodiny celkem (mzda a příplatek)", formato: "moneda" },
  ],
});
