import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { diasEntre, sumarDias } from "@/motor/vigencia";

function aniosCumplidos(desde: string, hasta: string): number {
  let anios = Number(hasta.slice(0, 4)) - Number(desde.slice(0, 4));
  if (hasta.slice(5) < desde.slice(5)) anios -= 1;
  return anios;
}

export default definirCalculadora({
  id: "sg.notice-period",
  mercado: "sg",
  concepto: "preaviso",
  slug: "notice-period",
  estado: "publicado",
  requiere: {
    "sg.preaviso-dias": "mapa",
  },
  campos: [
    { id: "inicio", tipo: "fecha", etiqueta: "Date you started the job", porDefecto: "2023-01-09" },
    { id: "aviso", tipo: "fecha", etiqueta: "Date notice is given", porDefecto: "hoy" },
  ],
  calcular(entrada, v) {
    if (entrada.aviso < entrada.inicio) throw new ErrorEntrada("The notice date has to be after the start date.", "aviso");
    const tabla = v["sg.preaviso-dias"];
    const dias = diasEntre(entrada.inicio, entrada.aviso);
    const anios = aniosCumplidos(entrada.inicio, entrada.aviso);
    const tramo = dias < 26 * 7 ? "menos-26-semanas" : anios < 2 ? "26-semanas-2-anios" : anios < 5 ? "2-5-anios" : "5-anios-o-mas";
    const preaviso = enMapa(tabla, tramo);
    const ultimoDia = sumarDias(entrada.aviso, preaviso - 1);
    return {
      preaviso,
      ultimoDia,
      antiguedad: anios,
      observaciones: [
        "This is the notice when your contract does not set one. If your contract has a notice period, that one applies, and it must be the same for you and your employer.",
        "The notice period includes the day notice is given, and also rest days, public holidays and non-working days.",
      ],
    };
  },
  resultado: [
    { clave: "preaviso", etiqueta: "Notice period", formato: "dias", destacada: true },
    { clave: "ultimoDia", etiqueta: "Last day of work", formato: "fecha" },
    { clave: "antiguedad", etiqueta: "Completed years of service", formato: "anios" },
  ],
});
