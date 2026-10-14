import { definirCalculadora, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "es.baja-laboral",
  mercado: "es",
  concepto: "propio",
  slug: "baja-laboral",
  estado: "publicado",
  requiere: {
    "es.it-porcentajes": "mapa",
  },
  campos: [
    {
      id: "base",
      tipo: "moneda",
      etiqueta: "Base de cotización del mes anterior a la baja",
      min: 0,
      porDefecto: 1800,
      ayuda: "La de contingencias comunes de tu última nómina completa. Con salario mensual se divide entre 30.",
    },
    { id: "dias", tipo: "entero", etiqueta: "Días de baja", min: 1, porDefecto: 30 },
    {
      id: "tipo",
      tipo: "opcion",
      etiqueta: "Causa de la baja",
      opciones: [
        { valor: "comun", etiqueta: "Enfermedad común o accidente no laboral" },
        { valor: "profesional", etiqueta: "Accidente de trabajo o enfermedad profesional" },
      ],
      porDefecto: "comun",
    },
  ],
  calcular(entrada, valores, { redondear }) {
    const p = valores["es.it-porcentajes"];
    const diaria = redondear(entrada.base / 30);
    const d = entrada.dias;
    if (entrada.tipo === "profesional") {
      const diasPagados = Math.max(0, d - 1);
      const importe = redondear(diasPagados * redondear(porcentaje(diaria, p.profesional)));
      return {
        diaria,
        sinPrestacion: Math.min(d, 1),
        tramo60: 0,
        tramo75: diasPagados,
        total: importe,
        empresa: null,
        inss: null,
        observaciones: ["El día de la baja lo paga la empresa como salario. Desde el día siguiente cobras la prestación, que abona la mutua o el INSS a través de tu empresa."],
      };
    }
    const sinPrestacion = Math.min(d, 3);
    const tramo60 = Math.max(0, Math.min(d, 20) - 3);
    const tramo75 = Math.max(0, d - 20);
    const al60 = redondear(porcentaje(diaria, p["comun-dia-4-a-20"]));
    const al75 = redondear(porcentaje(diaria, p["comun-desde-dia-21"]));
    const total = redondear(tramo60 * al60 + tramo75 * al75);
    const empresa = redondear(Math.max(0, Math.min(d, 15) - 3) * al60);
    return {
      diaria,
      sinPrestacion,
      tramo60,
      tramo75,
      total,
      empresa,
      inss: redondear(total - empresa),
      observaciones: ["Los tres primeros días no hay prestación, aunque muchos convenios los pagan o completan la baja hasta el 100 % del sueldo."],
    };
  },
  resultado: [
    { clave: "total", etiqueta: "Prestación bruta por la baja", formato: "moneda", destacada: true },
    { clave: "diaria", etiqueta: "Base reguladora diaria", formato: "moneda" },
    { clave: "sinPrestacion", etiqueta: "Días sin prestación", formato: "dias", ocultarSiCero: true },
    { clave: "tramo60", etiqueta: "Días con prestación del día 4 al 20", formato: "dias", ocultarSiCero: true },
    { clave: "tramo75", etiqueta: "Días con prestación desde el día 21", formato: "dias", ocultarSiCero: true },
    { clave: "empresa", etiqueta: "A cargo de la empresa (días 4 a 15)", formato: "moneda" },
    { clave: "inss", etiqueta: "A cargo del INSS o la mutua (desde el día 16)", formato: "moneda" },
  ],
});
