import { definirCalculadora, enMapa } from "@/motor/calculo";
import { DIAS_MES } from "../prestaciones";

export default definirCalculadora({
  id: "gt.permisos-con-goce-de-salario",
  mercado: "gt",
  concepto: "propio",
  slug: "permisos-con-goce-de-salario",
  estado: "publicado",
  requiere: {
    "gt.permisos-dias": "mapa",
  },
  campos: [
    { id: "motivo", tipo: "opcion-dato", dato: "gt.permisos-dias", etiqueta: "Motivo del permiso", porDefecto: "nacimiento" },
    { id: "salario", tipo: "moneda", etiqueta: "Salario mensual", min: 0 },
  ],
  calcular(entrada, valores, { redondear }) {
    const dias = enMapa(valores["gt.permisos-dias"], entrada.motivo);
    const diario = redondear(entrada.salario / DIAS_MES);
    return {
      dias,
      diario,
      pago: redondear(diario * dias),
      observaciones: ["Son días pagados: no se los pueden descontar del salario ni de las vacaciones. Su pacto colectivo puede dar más."],
    };
  },
  resultado: [
    { clave: "dias", etiqueta: "Días de permiso pagado", formato: "dias", destacada: true },
    { clave: "diario", etiqueta: "Salario diario", formato: "moneda" },
    { clave: "pago", etiqueta: "Lo que vale el permiso", formato: "moneda" },
  ],
});
