import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { sumarMeses, textoTiempo, tiempoEntre } from "../lib/fechas";
import { diasDeVacacion } from "../lib/laboral";

export default definirCalculadora({
  id: "bo.antiguedad-laboral",
  mercado: "bo",
  concepto: "propio",
  slug: "antiguedad-laboral",
  estado: "publicado",
  requiere: {
    "bo.bono-antiguedad": "escala",
    "bo.vacaciones-dias": "mapa",
    "bo.quinquenio-anios": "numero",
  },
  campos: [
    { id: "ingreso", tipo: "fecha", etiqueta: "Fecha de ingreso" },
    { id: "hasta", tipo: "fecha", etiqueta: "Calcular hasta", porDefecto: "hoy" },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.hasta < entrada.ingreso) throw new ErrorEntrada("La fecha final tiene que ser posterior a la de ingreso.", "hasta");
    const t = tiempoEntre(entrada.ingreso, entrada.hasta);
    let tasaBono = 0;
    for (const f of valores["bo.bono-antiguedad"]) if (t.anios >= f.desde) tasaBono = f.tasa;
    const aniosQuinquenio = valores["bo.quinquenio-anios"];
    const quinquenios = Math.floor(t.anios / aniosQuinquenio);
    return {
      antiguedad: textoTiempo(t),
      anios: t.anios,
      aniosDecimales: redondear(t.anios + t.meses / 12 + t.dias / 360),
      tasaBono,
      vacacion: t.anios >= 1 ? diasDeVacacion(valores["bo.vacaciones-dias"], t.anios) : 0,
      quinquenios,
      proximoQuinquenio: sumarMeses(entrada.ingreso, (quinquenios + 1) * aniosQuinquenio * 12),
      observaciones: ["Contamos como el Ministerio de Trabajo: años, meses y días completos, sin contar el día final."],
    };
  },
  resultado: [
    { clave: "antiguedad", etiqueta: "Antigüedad", formato: "texto", destacada: true },
    { clave: "aniosDecimales", etiqueta: "En años", formato: "numero", decimales: 2 },
    { clave: "tasaBono", etiqueta: "Bono de antigüedad que le corresponde", formato: "porcentaje", decimales: 0 },
    { clave: "vacacion", etiqueta: "Días de vacación que ganó en su último aniversario", formato: "dias", decimales: 0 },
    { clave: "quinquenios", etiqueta: "Quinquenios consolidados", formato: "numero", decimales: 0 },
    { clave: "proximoQuinquenio", etiqueta: "Consolida el próximo quinquenio el", formato: "fecha" },
  ],
});
