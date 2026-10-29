import { aplicarEscala, definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "tg.taxe-professionnelle-unique",
  mercado: "tg",
  concepto: "regimen-simplificado",
  slug: "taxe-professionnelle-unique",
  estado: "publicado",
  requiere: {
    "tg.tpu-taux": "mapa",
    "tg.tpu-minimum": "numero",
    "tg.tpu-seuils": "mapa",
    "tg.tpu-forfait-commerce": "escala",
    "tg.tpu-forfait-services": "escala",
  },
  campos: [
    {
      id: "ca",
      tipo: "moneda",
      etiqueta: "Chiffre d'affaires annuel",
      min: 0,
      porDefecto: 12000000,
      ayuda: "Toutes les ventes ou prestations de l'année.",
    },
    {
      id: "activite",
      tipo: "opcion",
      etiqueta: "Activité",
      opciones: [
        { valor: "commerce", etiqueta: "Commerce" },
        { valor: "services", etiqueta: "Prestations de services" },
        { valor: "production", etiqueta: "Production ou artisanat" },
      ],
      porDefecto: "commerce",
    },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.ca < 0) throw new ErrorEntrada("Le chiffre d'affaires ne peut pas être négatif.", "ca");
    const seuils = v["tg.tpu-seuils"];
    if (entrada.ca > seuils.maximum) {
      return {
        regime: "Régime du réel",
        tpu: null,
        tauxEffectif: null,
        observaciones: ["Au-delà de ce chiffre d'affaires, l'activité relève du régime du réel et non de la TPU."],
      };
    }
    if (entrada.ca <= seuils.forfaitaire) {
      if (entrada.activite === "production") {
        return {
          regime: "TPU forfaitaire",
          tpu: null,
          tauxEffectif: null,
          observaciones: ["Pour les artisans, la TPU forfaitaire est un montant fixe selon l'activité et la localité (article 135 du CGI)."],
        };
      }
      const bareme = entrada.activite === "services" ? v["tg.tpu-forfait-services"] : v["tg.tpu-forfait-commerce"];
      const tpu = redondear(aplicarEscala(bareme, entrada.ca));
      return {
        regime: "TPU forfaitaire",
        tpu,
        tauxEffectif: entrada.ca > 0 ? Math.round((tpu / entrada.ca) * 10000) / 100 : null,
        observaciones: [] as string[],
      };
    }
    const taux = entrada.activite === "services" ? v["tg.tpu-taux"].services : v["tg.tpu-taux"]["production-commerce"];
    const tpu = Math.max(redondear(porcentaje(entrada.ca, taux)), v["tg.tpu-minimum"]);
    return {
      regime: "TPU déclarative",
      tpu,
      tauxEffectif: Math.round((tpu / entrada.ca) * 10000) / 100,
      observaciones: [] as string[],
    };
  },
  resultado: [
    { clave: "tpu", etiqueta: "TPU de l'année", formato: "moneda", destacada: true },
    { clave: "regime", etiqueta: "Régime", formato: "texto" },
    { clave: "tauxEffectif", etiqueta: "Part du chiffre d'affaires", formato: "porcentaje", decimales: 2 },
  ],
});
