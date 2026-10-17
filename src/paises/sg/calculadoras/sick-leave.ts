import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "sg.sick-leave",
  mercado: "sg",
  concepto: "propio",
  slug: "sick-leave",
  estado: "publicado",
  requiere: {
    "sg.licencia-ambulatoria": "mapa",
    "sg.licencia-hospitalizacion": "mapa",
    "sg.meses-minimos-licencias": "numero",
  },
  campos: [
    { id: "meses", tipo: "entero", etiqueta: "Completed months of service with your employer", min: 0, porDefecto: 6 },
    { id: "usados", tipo: "entero", etiqueta: "Outpatient sick leave days already taken this year", min: 0, porDefecto: 0 },
  ],
  calcular(entrada, v) {
    if (entrada.meses < 0) throw new ErrorEntrada("Enter your months of service.", "meses");
    const minimo = v["sg.meses-minimos-licencias"];
    const amb = v["sg.licencia-ambulatoria"];
    const hosp = v["sg.licencia-hospitalizacion"];
    const tope = Math.max(...Object.keys(amb).map(Number));
    if (entrada.meses < minimo) {
      return {
        ambulatoria: 0,
        hospitalizacion: 0,
        quedanAmbulatoria: 0,
        quedanHospitalizacion: 0,
        observaciones: [`Paid sick leave starts after ${minimo} months of service with your employer.`],
      };
    }
    const clave = String(Math.min(entrada.meses, tope));
    const ambulatoria = enMapa(amb, clave);
    const hospitalizacion = enMapa(hosp, clave);
    const usados = Math.min(entrada.usados, ambulatoria);
    const observaciones = [
      "Hospitalisation leave includes the outpatient sick leave you take, so every outpatient day also comes off the hospitalisation total.",
    ];
    return {
      ambulatoria,
      hospitalizacion,
      quedanAmbulatoria: ambulatoria - usados,
      quedanHospitalizacion: hospitalizacion - usados,
      observaciones,
    };
  },
  resultado: [
    { clave: "ambulatoria", etiqueta: "Paid outpatient sick leave a year", formato: "dias", destacada: true },
    { clave: "hospitalizacion", etiqueta: "Paid hospitalisation leave a year (including outpatient)", formato: "dias" },
    { clave: "quedanAmbulatoria", etiqueta: "Outpatient days left", formato: "dias" },
    { clave: "quedanHospitalizacion", etiqueta: "Hospitalisation days left", formato: "dias" },
  ],
});
