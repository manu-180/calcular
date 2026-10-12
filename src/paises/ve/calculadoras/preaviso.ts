import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { sumarDias } from "@/motor/vigencia";
import { textoTiempo, tiempoTrabajado } from "../reglas";

export default definirCalculadora({
  id: "ve.preaviso",
  mercado: "ve",
  concepto: "preaviso",
  slug: "preaviso",
  estado: "publicado",
  requiere: {
    "ve.preaviso-dias-1-mes": "numero",
    "ve.preaviso-dias-6-meses": "numero",
    "ve.preaviso-dias-1-anio": "numero",
  },
  campos: [
    { id: "fechaIngreso", tipo: "fecha", etiqueta: "Fecha de ingreso" },
    { id: "fechaAviso", tipo: "fecha", etiqueta: "Fecha en que entregas la renuncia", porDefecto: "hoy" },
  ],
  calcular(entrada, valores) {
    if (entrada.fechaAviso < entrada.fechaIngreso) {
      throw new ErrorEntrada("La fecha de la renuncia tiene que ser igual o posterior a la de ingreso.", "fechaAviso");
    }
    // Art. 81: el tiempo que cuenta es el trabajado hasta que avisas.
    const t = tiempoTrabajado(entrada.fechaIngreso, entrada.fechaAviso);
    const meses = t.anios * 12 + t.meses;
    const dias =
      meses >= 12
        ? valores["ve.preaviso-dias-1-anio"]
        : meses >= 6
          ? valores["ve.preaviso-dias-6-meses"]
          : meses >= 1
            ? valores["ve.preaviso-dias-1-mes"]
            : 0;
    const observaciones = [
      "El preaviso es para quien renuncia sin causa en un contrato por tiempo indeterminado. Si te retiras por una causa justificada, no hace falta.",
      "Si no das el preaviso, la empresa igual te tiene que pagar todo lo que ganaste hasta tu último día. La LOTTT no prevé un descuento por eso.",
    ];
    if (dias === 0) observaciones.unshift("Con menos de un mes de trabajo no tienes que dar preaviso.");
    return { tiempo: textoTiempo(t), dias, ultimoDia: sumarDias(entrada.fechaAviso, dias), observaciones };
  },
  resultado: [
    { clave: "tiempo", etiqueta: "Tiempo trabajado al renunciar", formato: "texto" },
    { clave: "dias", etiqueta: "Días de preaviso", formato: "dias", destacada: true },
    { clave: "ultimoDia", etiqueta: "Fecha en que puedes dejar de trabajar", formato: "fecha" },
  ],
});
