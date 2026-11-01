import { definirCalculadora, ErrorEntrada, enMapa } from "@/motor/calculo";

export default definirCalculadora({
  id: "sk.vypocet-dovolenky",
  mercado: "sk",
  concepto: "vacaciones",
  slug: "vypocet-dovolenky",
  estado: "publicado",
  requiere: { "sk.dovolenka": "mapa" },
  campos: [
    { id: "vymera", tipo: "opcion-dato", dato: "sk.dovolenka", etiqueta: "Výmera dovolenky", porDefecto: "zakladna" },
    { id: "dniTyzdenne", tipo: "entero", etiqueta: "Pracovné dni v týždni", min: 1, max: 7, porDefecto: 5 },
    { id: "mesiace", tipo: "entero", etiqueta: "Celé mesiace pracovného pomeru v roku", min: 1, max: 12, porDefecto: 12 },
  ],
  calcular(e, v) {
    if (e.mesiace > 12) throw new ErrorEntrada("Rok má najviac 12 mesiacov.", "mesiace");
    const tyzdne = enMapa(v["sk.dovolenka"], e.vymera);
    const zaRok = tyzdne * e.dniTyzdenne;
    return { dni: Math.round(((zaRok * e.mesiace) / 12) * 100) / 100, zaRok, tyzdne };
  },
  resultado: [
    { clave: "dni", etiqueta: "Dovolenka v pracovných dňoch", formato: "numero", decimales: 2, destacada: true },
    { clave: "zaRok", etiqueta: "Dovolenka za celý rok", formato: "dias" },
    { clave: "tyzdne", etiqueta: "Výmera v týždňoch", formato: "semanas" },
  ],
});
