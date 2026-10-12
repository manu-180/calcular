import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { diasEntre, sumarDias } from "@/motor/vigencia";
import { sumarMeses } from "../reglas";

export default definirCalculadora({
  id: "ve.reposo-pre-y-postnatal",
  mercado: "ve",
  concepto: "propio",
  slug: "reposo-pre-y-postnatal",
  estado: "publicado",
  requiere: {
    "ve.prenatal-semanas": "numero",
    "ve.postnatal-semanas": "numero",
    "ve.adopcion-semanas": "numero",
    "ve.inamovilidad-anios": "numero",
  },
  campos: [
    {
      id: "caso",
      tipo: "opcion",
      etiqueta: "Tu caso",
      opciones: [
        { valor: "parto", etiqueta: "Embarazo" },
        { valor: "adopcion", etiqueta: "Adopción de un niño o niña menor de tres años" },
      ],
      porDefecto: "parto",
    },
    {
      id: "fechaProbable",
      tipo: "fecha",
      etiqueta: "Fecha probable de parto (o de la colocación familiar, si adoptas)",
    },
    {
      id: "fechaParto",
      tipo: "fecha",
      etiqueta: "Fecha real del parto, si ya nació (opcional)",
      requerido: false,
    },
  ],
  calcular(entrada, valores) {
    const inamovilidadMeses = valores["ve.inamovilidad-anios"] * 12;
    if (entrada.caso === "adopcion") {
      const dias = valores["ve.adopcion-semanas"] * 7;
      return {
        inicioPrenatal: null,
        diasPrenatal: null,
        parto: entrada.fechaProbable,
        diasPostnatal: dias,
        finDescanso: sumarDias(entrada.fechaProbable, dias - 1),
        finInamovilidad: sumarMeses(entrada.fechaProbable, inamovilidadMeses),
        observaciones: ["El descanso por adopción se cuenta desde el día en que te entregan al niño o la niña en colocación familiar."],
      };
    }
    const fpp = entrada.fechaProbable;
    const parto = entrada.fechaParto ?? fpp;
    const inicio = sumarDias(fpp, -valores["ve.prenatal-semanas"] * 7);
    if (parto < inicio) throw new ErrorEntrada("La fecha del parto no puede ser anterior al inicio del descanso prenatal.", "fechaParto");
    // Art. 338: el prenatal que no se usó porque el parto se adelantó se suma al postnatal.
    // Art. 337: si el parto se atrasa, el prenatal se alarga y el postnatal queda entero.
    const noUsados = parto < fpp ? diasEntre(parto, fpp) : 0;
    const postnatal = valores["ve.postnatal-semanas"] * 7 + noUsados;
    const observaciones: string[] = [];
    if (noUsados > 0) observaciones.push(`El parto se adelantó ${noUsados} días: esos días del prenatal se suman al postnatal.`);
    if (parto > fpp) observaciones.push("El parto se atrasó: el prenatal se alarga hasta el parto y el postnatal no se acorta.");
    observaciones.push("Si un médico indica que necesitas más reposo por enfermedad, el descanso se alarga.");
    return {
      inicioPrenatal: inicio,
      diasPrenatal: diasEntre(inicio, parto),
      parto,
      diasPostnatal: postnatal,
      finDescanso: sumarDias(parto, postnatal),
      finInamovilidad: sumarMeses(parto, inamovilidadMeses),
      observaciones,
    };
  },
  resultado: [
    { clave: "inicioPrenatal", etiqueta: "Empieza el descanso prenatal", formato: "fecha" },
    { clave: "diasPrenatal", etiqueta: "Días de descanso prenatal", formato: "dias" },
    { clave: "parto", etiqueta: "Fecha del parto o de la colocación", formato: "fecha" },
    { clave: "diasPostnatal", etiqueta: "Días de descanso postnatal o por adopción", formato: "dias" },
    { clave: "finDescanso", etiqueta: "Último día de descanso", formato: "fecha", destacada: true },
    { clave: "finInamovilidad", etiqueta: "Inamovilidad laboral hasta", formato: "fecha" },
  ],
});
