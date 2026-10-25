import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { nahoru } from "../lib/mzda";

export default definirCalculadora({
  id: "cz.duchodova-kalkulacka",
  mercado: "cz",
  concepto: "jubilacion",
  slug: "duchodova-kalkulacka",
  estado: "publicado",
  requiere: {
    "cz.duchod-zakladni-vymera": "numero",
    "cz.duchod-redukcni-hranice": "mapa",
    "cz.duchod-zapocet": "mapa",
    "cz.duchod-sazba-za-rok": "numero",
    "cz.vychovne": "numero",
  },
  campos: [
    {
      id: "ovz",
      tipo: "moneda",
      etiqueta: "Průměrný měsíční výdělek za celý pracovní život (v dnešních cenách)",
      ayuda: "ČSSZ ho počítá jako osobní vyměřovací základ z výdělků od roku 1986 přepočtených na dnešní mzdovou úroveň.",
      min: 0,
      porDefecto: 40000,
    },
    { id: "roky", tipo: "entero", etiqueta: "Doba důchodového pojištění v celých letech", min: 0, max: 60, porDefecto: 40 },
    { id: "deti", tipo: "entero", etiqueta: "Počet vychovaných dětí (výchovné)", min: 0, max: 15, porDefecto: 0 },
  ],
  calcular(e, v) {
    if (e.ovz <= 0) throw new ErrorEntrada("Zadejte průměrný výdělek vyšší než nula.", "ovz");
    const h = v["cz.duchod-redukcni-hranice"];
    const z = v["cz.duchod-zapocet"];
    const h1 = enMapa(h, "prvni");
    const h2 = enMapa(h, "druha");
    const vypocetniZaklad = nahoru((Math.min(e.ovz, h1) * enMapa(z, "do-prvni")) / 100 + (Math.max(0, Math.min(e.ovz, h2) - h1) * enMapa(z, "do-druhe")) / 100);
    const zakladni = v["cz.duchod-zakladni-vymera"];
    const vypoctena = nahoru((vypocetniZaklad * v["cz.duchod-sazba-za-rok"] * e.roky) / 100);
    const procentni = Math.max(vypoctena, zakladni);
    const vychovne = v["cz.vychovne"] * e.deti;
    const observaciones: string[] = [];
    if (e.roky < 35) observaciones.push("Na starobní důchod v řádném důchodovém věku potřebujete obvykle aspoň 35 let pojištění.");
    if (vypoctena < zakladni) observaciones.push("Vypočtená procentní výměra je nižší než zákonné minimum, proto se zvyšuje na výši základní výměry.");
    observaciones.push("Jde o odhad pro důchod přiznaný v roce 2026. Přesnou částku spočítá ČSSZ z vašich skutečných výdělků a dob pojištění.");
    return {
      duchod: zakladni + procentni + vychovne,
      zakladni,
      procentni,
      vychovne,
      vypocetniZaklad,
      observaciones,
    };
  },
  resultado: [
    { clave: "duchod", etiqueta: "Odhad starobního důchodu za měsíc", formato: "moneda", destacada: true },
    { clave: "zakladni", etiqueta: "Základní výměra", formato: "moneda" },
    { clave: "procentni", etiqueta: "Procentní výměra", formato: "moneda" },
    { clave: "vychovne", etiqueta: "Výchovné", formato: "moneda", ocultarSiCero: true },
    { clave: "vypocetniZaklad", etiqueta: "Výpočtový základ", formato: "moneda" },
  ],
});
