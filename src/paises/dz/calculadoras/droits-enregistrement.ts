import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "dz.droits-enregistrement",
  mercado: "dz",
  concepto: "propio",
  slug: "droits-enregistrement",
  estado: "publicado",
  requiere: { "dz.droits-mutation": "mapa" },
  campos: [
    { id: "prix", tipo: "moneda", etiqueta: "Prix du bien immobilier", min: 0, porDefecto: 12000000, ayuda: "Prix exprimé dans l'acte." },
    {
      id: "operation",
      tipo: "opcion",
      etiqueta: "Type d'acte",
      opciones: [
        { valor: "vente", etiqueta: "Vente directe" },
        { valor: "promesse", etiqueta: "Promesse de vente puis acte de vente" },
      ],
      porDefecto: "vente",
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.prix <= 0) throw new ErrorEntrada("Indiquez un prix supérieur à zéro.", "prix");
    const t = v["dz.droits-mutation"];
    if (e.operation === "vente") {
      const droit = redondear(porcentaje(e.prix, t.vente));
      return { total: droit, vente: droit, promesse: null, concretisation: null, taux: t.vente };
    }
    const promesse = redondear(porcentaje(e.prix, t.promesse));
    const concretisation = redondear(porcentaje(e.prix, t.concretisation));
    return { total: redondear(promesse + concretisation), vente: null, promesse, concretisation, taux: t.promesse + t.concretisation };
  },
  resultado: [
    { clave: "total", etiqueta: "Droits d'enregistrement", formato: "moneda", destacada: true },
    { clave: "vente", etiqueta: "Droit sur l'acte de vente", formato: "moneda" },
    { clave: "promesse", etiqueta: "Droit sur la promesse de vente", formato: "moneda" },
    { clave: "concretisation", etiqueta: "Droit sur l'acte qui concrétise la promesse", formato: "moneda" },
    { clave: "taux", etiqueta: "Taux total", formato: "porcentaje", decimales: 1 },
  ],
});
