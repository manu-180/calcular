import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import type { FechaISO } from "@/motor/tipos";
import { sumarMeses } from "../reglas";

const CUOTAS_POR_ANIO = 12;
const ANIOS_ANTICIPO_MAX = 2;

function edadEn(nacimiento: FechaISO, fecha: FechaISO): number {
  let anios = 0;
  while (sumarMeses(nacimiento, (anios + 1) * 12) <= fecha) anios++;
  return anios;
}

export default definirCalculadora({
  id: "pa.jubilacion",
  mercado: "pa",
  concepto: "jubilacion",
  slug: "jubilacion",
  estado: "publicado",
  requiere: {
    "pa.jubilacion-edad-referencia": "mapa",
    "pa.jubilacion-cuotas": "mapa",
    "pa.jubilacion-tasa-reemplazo": "mapa",
    "pa.jubilacion-factor-anticipada": "mapa",
  },
  campos: [
    {
      id: "sexo",
      tipo: "opcion",
      etiqueta: "Sexo",
      opciones: [
        { valor: "mujeres", etiqueta: "Mujer" },
        { valor: "hombres", etiqueta: "Hombre" },
      ],
      porDefecto: "mujeres",
    },
    { id: "fechaNacimiento", tipo: "fecha", etiqueta: "Fecha de nacimiento" },
    { id: "fechaRetiro", tipo: "fecha", etiqueta: "Fecha en que quieres jubilarte", porDefecto: "hoy" },
    { id: "cuotas", tipo: "entero", etiqueta: "Cuotas aportadas en total", min: 0 },
    {
      id: "cuotasDespues",
      tipo: "entero",
      etiqueta: "De esas, cuotas aportadas después de cumplir la edad de jubilación",
      min: 0,
      porDefecto: 0,
    },
    {
      id: "salarioBase",
      tipo: "moneda",
      etiqueta: "Salario promedio de tus diez mejores años",
      ayuda: "El promedio mensual de los diez años en que más ganaste.",
      min: 0,
    },
  ],
  calcular(entrada, valores, { redondear }) {
    const { cuotas, cuotasDespues, salarioBase } = entrada;
    if (cuotasDespues > cuotas) throw new ErrorEntrada("Las cuotas después de la edad de jubilación no pueden ser más que el total.", "cuotasDespues");
    const edadReferencia = enMapa(valores["pa.jubilacion-edad-referencia"], entrada.sexo);
    const referencia = enMapa(valores["pa.jubilacion-cuotas"], "referencia");
    const minimo = enMapa(valores["pa.jubilacion-cuotas"], "minimo");
    const tasas = valores["pa.jubilacion-tasa-reemplazo"];
    const edad = edadEn(entrada.fechaNacimiento, entrada.fechaRetiro);
    const anticipo = Math.max(edadReferencia - edad, 0);
    const fechaEdad = sumarMeses(entrada.fechaNacimiento, edadReferencia * 12);

    if (anticipo > ANIOS_ANTICIPO_MAX) {
      throw new ErrorEntrada(`A esa fecha tendrías ${edad} años. Puedes jubilarte desde los ${edadReferencia - ANIOS_ANTICIPO_MAX} años con una pensión reducida.`, "fechaRetiro");
    }
    if (cuotas < minimo) {
      throw new ErrorEntrada(`Necesitas al menos ${minimo} cuotas para una pensión. Te faltan ${minimo - cuotas}.`, "cuotas");
    }

    let tasa: number;
    let tipo: string;
    if (cuotas >= referencia) {
      const antes = cuotas - cuotasDespues;
      const excesoAntes = Math.max(antes - referencia, 0);
      const excesoDespues = anticipo > 0 ? 0 : Math.max(cuotas - Math.max(antes, referencia), 0);
      tasa =
        enMapa(tasas, "basica") +
        Math.floor(excesoAntes / CUOTAS_POR_ANIO) * enMapa(tasas, "por-12-cuotas-antes") +
        Math.floor(excesoDespues / CUOTAS_POR_ANIO) * enMapa(tasas, "por-12-cuotas-despues");
      tipo = anticipo > 0 ? "Pensión anticipada" : "Pensión normal";
    } else {
      tasa = (enMapa(tasas, "basica") * cuotas) / referencia;
      tipo = anticipo > 0 ? "Pensión proporcional anticipada" : "Pensión proporcional";
    }
    const factor = anticipo > 0 ? enMapa(valores["pa.jubilacion-factor-anticipada"], String(anticipo)) : 1;
    const observaciones = [
      "Este cálculo es para el Subsistema Exclusivamente de Beneficio Definido. La Caja de Seguro Social aplica además un monto mínimo y uno máximo que no están incluidos.",
    ];
    if (anticipo > 0) observaciones.push(`Al retirarte ${anticipo} ${anticipo === 1 ? "año" : "años"} antes, la pensión se multiplica por un factor de reducción.`);
    if (cuotas < referencia) observaciones.push(`Con menos de ${referencia} cuotas la pensión es proporcional a las cuotas que tienes. Te faltan ${referencia - cuotas} para la pensión completa.`);
    return {
      edad,
      fechaEdad,
      tipo,
      tasa: redondear(tasa * factor),
      pension: redondear((salarioBase * tasa * factor) / 100),
      observaciones,
    };
  },
  resultado: [
    { clave: "edad", etiqueta: "Edad al jubilarte", formato: "anios" },
    { clave: "fechaEdad", etiqueta: "Cumples la edad de jubilación el", formato: "fecha" },
    { clave: "tipo", etiqueta: "Tipo de pensión", formato: "texto" },
    { clave: "tasa", etiqueta: "Porcentaje de tu salario base", formato: "porcentaje" },
    { clave: "pension", etiqueta: "Pensión mensual estimada", formato: "moneda", destacada: true },
  ],
});
