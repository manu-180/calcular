import { definirCalculadora, enMapa, porcentaje } from "@/motor/calculo";
import { DIAS_MES } from "../prestaciones";

export default definirCalculadora({
  id: "ni.permisos-laborales",
  mercado: "ni",
  concepto: "propio",
  slug: "permisos-laborales",
  estado: "publicado",
  requiere: {
    "ni.permisos-dias": "mapa",
    "ni.permiso-enfermedad-familiar-minimo": "numero",
  },
  campos: [
    { id: "motivo", tipo: "opcion-dato", dato: "ni.permisos-dias", etiqueta: "Motivo del permiso", porDefecto: "fallecimiento" },
    { id: "salario", tipo: "moneda", etiqueta: "Salario mensual", min: 0 },
  ],
  calcular(entrada, valores, { redondear }) {
    const dias = enMapa(valores["ni.permisos-dias"], entrada.motivo);
    const diario = redondear(entrada.salario / DIAS_MES);
    const familiar = entrada.motivo === "enfermedad-familiar";
    const pagoDiario = familiar ? redondear(porcentaje(diario, valores["ni.permiso-enfermedad-familiar-minimo"])) : diario;
    const observaciones = familiar
      ? [
          "El salario de estos días se acuerda con el empleador, pero no puede ser menor que la mitad de tu salario ordinario. Mostramos ese mínimo.",
          "Son hasta seis días laborables y necesitás constancia médica de que tu presencia es indispensable.",
        ]
      : ["Es el máximo de la ley, en días hábiles seguidos y con tu salario completo. Presentá el comprobante (acta de defunción o de matrimonio)."];
    observaciones.push("Para ir a consulta médica, tuya o de tus hijos, también tenés permiso con el salario completo.");
    return { dias, pagoDiario, total: redondear(pagoDiario * dias), observaciones };
  },
  resultado: [
    { clave: "dias", etiqueta: "Días de permiso", formato: "dias" },
    { clave: "pagoDiario", etiqueta: "Pago por cada día de permiso", formato: "moneda" },
    { clave: "total", etiqueta: "Total pagado por el permiso", formato: "moneda", destacada: true },
  ],
});
