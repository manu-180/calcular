import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import type { Dato, FechaISO } from "@/motor/tipos";
import { diasEntre, sumarDias, vigente } from "@/motor/vigencia";
import datos from "../datos.json";

// Sazba úroku z prodlení se určuje podle repo sazby z prvního dne pololetí, ve kterém prodlení
// začalo, a to může být dávno před dneškem. Motor podává jen sazbu platnou dnes, proto ověřené
// úseky repo sazby čteme přímo z datos.json.
const REPO = datos.datos.find((d) => d.id === "cz.repo-sazba") as unknown as Dato<"numero">;

export default definirCalculadora({
  id: "cz.urok-z-prodleni",
  mercado: "cz",
  concepto: "propio",
  slug: "urok-z-prodleni",
  estado: "publicado",
  requiere: { "cz.repo-sazba": "numero", "cz.urok-z-prodleni-prirazka": "numero" },
  campos: [
    { id: "castka", tipo: "moneda", etiqueta: "Dlužná částka", min: 0, porDefecto: 10000 },
    { id: "splatnost", tipo: "fecha", etiqueta: "Den splatnosti (poslední den, kdy se mělo zaplatit)", min: "2018-01-01", porDefecto: "2026-03-31" },
    { id: "zaplaceni", tipo: "fecha", etiqueta: "Den zaplacení", min: "2018-01-01", porDefecto: "hoy" },
  ],
  calcular(e, v, { redondear }) {
    if (e.castka <= 0) throw new ErrorEntrada("Zadejte dlužnou částku vyšší než nula.", "castka");
    if (e.zaplaceni <= e.splatnost) throw new ErrorEntrada("Den zaplacení musí být pozdější než den splatnosti.", "zaplaceni");
    const zacatek = sumarDias(e.splatnost, 1);
    const pololeti = `${zacatek.slice(0, 4)}-${zacatek.slice(5, 7) <= "06" ? "01" : "07"}-01` as FechaISO;
    const repo = vigente(REPO, pololeti);
    if (!repo) throw new ErrorEntrada("Pro toto období nemáme ověřenou repo sazbu ČNB.", "splatnost");
    const sazba = repo.valor + v["cz.urok-z-prodleni-prirazka"];
    const dny = diasEntre(e.splatnost, e.zaplaceni);
    const urok = redondear((e.castka * sazba * dny) / 100 / 365);
    return {
      urok,
      celkem: redondear(e.castka + urok),
      sazba,
      repo: repo.valor,
      dny,
      zacatek,
      observaciones: [
        "Sazba se určuje podle repo sazby ČNB platné první den kalendářního pololetí, ve kterém prodlení začalo, a zůstává stejná po celou dobu prodlení.",
        "U výživného pro nezletilé dítě platí prvních 6 měsíců jiná sazba (2,5 promile denně), kalkulačka ji nepočítá.",
      ],
    };
  },
  resultado: [
    { clave: "urok", etiqueta: "Úrok z prodlení", formato: "moneda", destacada: true },
    { clave: "celkem", etiqueta: "Dluh s úrokem", formato: "moneda" },
    { clave: "sazba", etiqueta: "Roční sazba úroku z prodlení", formato: "porcentaje", decimales: 2 },
    { clave: "repo", etiqueta: "Repo sazba ČNB na začátku pololetí", formato: "porcentaje", decimales: 2 },
    { clave: "dny", etiqueta: "Počet dní prodlení", formato: "dias", decimales: 0 },
    { clave: "zacatek", etiqueta: "První den prodlení", formato: "fecha" },
  ],
});
