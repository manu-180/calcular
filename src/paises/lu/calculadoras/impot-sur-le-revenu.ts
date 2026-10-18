import { aplicarEscala, definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { CLASSES, type Classe } from "../lib/salaire";

export default definirCalculadora({
  id: "lu.impot-sur-le-revenu",
  mercado: "lu",
  concepto: "impuesto-renta",
  slug: "impot-sur-le-revenu",
  estado: "publicado",
  requiere: {
    "lu.impot-classe-1": "escala",
    "lu.impot-classe-1a": "escala",
    "lu.impot-classe-2": "escala",
    "lu.fonds-emploi-impot": "mapa",
  },
  campos: [
    { id: "revenu", tipo: "moneda", etiqueta: "Revenu imposable annuel", min: 0, porDefecto: 60000, ayuda: "Revenu après les frais d'obtention, les dépenses spéciales et les abattements." },
    { id: "classe", tipo: "opcion", etiqueta: "Classe d'impôt", opciones: CLASSES, porDefecto: "1" },
  ],
  calcular(entrada, valores) {
    if (entrada.revenu < 0) throw new ErrorEntrada("Le revenu ne peut pas être négatif.", "revenu");
    const classe = entrada.classe as Classe;
    const escala = classe === "1" ? valores["lu.impot-classe-1"] : classe === "1a" ? valores["lu.impot-classe-1a"] : valores["lu.impot-classe-2"];
    const fonds = valores["lu.fonds-emploi-impot"];
    const base = Math.floor(entrada.revenu / 50) * 50;
    // ACD : impôt arrondi à l'euro inférieur, puis majoré pour le fonds pour l'emploi et arrondi de nouveau.
    const impot = Math.floor(Math.max(aplicarEscala(escala, base), 0) + 1e-6);
    const majore = base <= enMapa(fonds, `seuil-${classe}`) ? impot * 1.07 : impot * 1.09 - enMapa(fonds, `deduction-${classe}`);
    const total = Math.floor(Math.max(majore, 0) + 1e-6);
    return {
      total,
      impot,
      fonds: total - impot,
      base,
      moyen: entrada.revenu > 0 ? (total / entrada.revenu) * 100 : 0,
    };
  },
  resultado: [
    { clave: "total", etiqueta: "Impôt sur le revenu annuel", formato: "moneda", decimales: 0, destacada: true },
    { clave: "impot", etiqueta: "Impôt selon le barème", formato: "moneda", decimales: 0 },
    { clave: "fonds", etiqueta: "Contribution au fonds pour l'emploi", formato: "moneda", decimales: 0 },
    { clave: "base", etiqueta: "Revenu arrondi aux 50 euros inférieurs", formato: "moneda", decimales: 0 },
    { clave: "moyen", etiqueta: "Taux moyen", formato: "porcentaje", decimales: 2 },
  ],
});
