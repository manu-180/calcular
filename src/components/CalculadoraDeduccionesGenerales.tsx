"use client";

import { useMemo, useState } from "react";
import { ANIO_FISCAL_VIGENTE } from "@/data/deducciones-generales";
import { calcularDeduccionesGenerales } from "@/lib/deducciones-generales";
import { formatARS } from "@/lib/formato";

const claseInput =
  "mt-2 w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-zinc-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200";

const num = (s: string) => Number(s.replace(/\./g, "").replace(",", ".")) || 0;

type CampoProps = {
  id: string;
  label: string;
  ayuda: string;
  value: string;
  onChange: (v: string) => void;
};

function Campo({ id, label, ayuda, value, onChange }: CampoProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold text-zinc-800">
        {label}
      </label>
      <p className="mt-0.5 text-xs text-zinc-500">{ayuda}</p>
      <input
        id={id}
        inputMode="numeric"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={claseInput}
      />
    </div>
  );
}

export function CalculadoraDeduccionesGenerales() {
  const [bruto, setBruto] = useState("3500000");
  const [conyuge, setConyuge] = useState(false);
  const [hijos, setHijos] = useState("0");
  const [prepagaMensual, setPrepagaMensual] = useState("180000");
  const [honorarios, setHonorarios] = useState("600000");
  const [reintegros, setReintegros] = useState("0");
  const [seguroVida, setSeguroVida] = useState("400000");
  const [seguroRetiro, setSeguroRetiro] = useState("0");
  const [donaciones, setDonaciones] = useState("0");
  const [hipotecario, setHipotecario] = useState("0");

  const res = useMemo(
    () =>
      calcularDeduccionesGenerales({
        brutoMensual: num(bruto),
        conyuge,
        hijos: num(hijos),
        prepagaAnual: num(prepagaMensual) * 12,
        honorariosFacturadosAnual: num(honorarios),
        honorariosReintegradosAnual: num(reintegros),
        seguroVidaAnual: num(seguroVida),
        seguroRetiroAnual: num(seguroRetiro),
        donacionesAnual: num(donaciones),
        interesesHipotecariosAnual: num(hipotecario),
      }),
    [bruto, conyuge, hijos, prepagaMensual, honorarios, reintegros, seguroVida, seguroRetiro, donaciones, hipotecario],
  );

  const conPago = res.lineas.filter((l) => l.pagado > 0);

  return (
    <div className="rounded-2xl border border-emerald-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <Campo
          id="bruto"
          label="Tu sueldo bruto mensual"
          ayuda="Define la base del 5% y tu alícuota: cuánto te vuelve."
          value={bruto}
          onChange={setBruto}
        />
        <div className="grid grid-cols-2 gap-3">
          <div>
            <span className="block text-sm font-semibold text-zinc-800">Cónyuge a cargo</span>
            <label className="mt-4 flex items-center gap-2 text-sm text-zinc-700">
              <input type="checkbox" checked={conyuge} onChange={(e) => setConyuge(e.target.checked)} />
              Sí
            </label>
          </div>
          <Campo id="hijos" label="Hijos a cargo" ayuda="Menores de 18." value={hijos} onChange={setHijos} />
        </div>

        <Campo
          id="prepaga"
          label="Cuota de prepaga por mes"
          ayuda="Tuya y de tus cargas de familia. Se multiplica por 12."
          value={prepagaMensual}
          onChange={setPrepagaMensual}
        />
        <Campo
          id="honorarios"
          label="Honorarios médicos facturados en el año"
          ayuda="Médicos, odontólogos, psicólogos, kinesiólogos, internación…"
          value={honorarios}
          onChange={setHonorarios}
        />
        <Campo
          id="reintegros"
          label="De eso, lo que te reintegraron"
          ayuda="Lo que te devolvió la prepaga u obra social no entra."
          value={reintegros}
          onChange={setReintegros}
        />
        <Campo
          id="vida"
          label="Seguro de vida pagado en el año"
          ayuda="Primas de seguros para caso de muerte y mixtos."
          value={seguroVida}
          onChange={setSeguroVida}
        />
        <Campo
          id="retiro"
          label="Seguro de retiro pagado en el año"
          ayuda="Planes de retiro privados bajo control de la SSN."
          value={seguroRetiro}
          onChange={setSeguroRetiro}
        />
        <Campo
          id="donaciones"
          label="Donaciones del año"
          ayuda="A entidades exentas reconocidas por ARCA, bancarizadas."
          value={donaciones}
          onChange={setDonaciones}
        />
        <Campo
          id="hipotecario"
          label="Intereses de crédito hipotecario del año"
          ayuda="Sólo por la compra o construcción de tu vivienda."
          value={hipotecario}
          onChange={setHipotecario}
        />
      </div>

      <div className="mt-6 space-y-4 border-t border-zinc-100 pt-5">
        <p className="text-sm text-zinc-600">
          Base del 5% estimada: <strong>{formatARS(res.baseCincoPorCiento, 0)}</strong> al año → cada límite del 5% es{" "}
          <strong>{formatARS(res.topeCincoPorCiento, 2)}</strong>, por separado para prepaga, honorarios y donaciones.
        </p>

        {conPago.length > 0 ? (
          <div className="overflow-x-auto rounded-xl border border-zinc-200">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-zinc-50 text-left text-zinc-700">
                  <th className="px-3 py-2 font-semibold">Concepto</th>
                  <th className="px-3 py-2 font-semibold">Pagado</th>
                  <th className="px-3 py-2 font-semibold">Límite</th>
                  <th className="px-3 py-2 font-semibold">Deducís</th>
                  <th className="px-3 py-2 font-semibold">Queda afuera</th>
                </tr>
              </thead>
              <tbody>
                {conPago.map((l) => (
                  <tr key={l.id} className="border-t border-zinc-100 align-top">
                    <td className="px-3 py-2 text-zinc-800">
                      <span className="font-medium">{l.concepto}</span>
                      <span className="block text-xs text-zinc-500">
                        {l.inciso} · {l.limiteDescripcion}
                      </span>
                    </td>
                    <td className="px-3 py-2 text-zinc-900">{formatARS(l.pagado, 0)}</td>
                    <td className="px-3 py-2 text-zinc-900">{formatARS(l.limite, 0)}</td>
                    <td className="px-3 py-2 font-semibold text-emerald-700">{formatARS(l.deducible, 0)}</td>
                    <td className="px-3 py-2 text-zinc-700">
                      {l.excedente > 0 ? formatARS(l.excedente, 0) : "—"}
                      {l.excedente > 0 && l.excedenteDiferible && (
                        <span className="block text-xs text-emerald-700">se deduce en años siguientes</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-sm text-zinc-500">Cargá algún gasto para ver cuánto entra.</p>
        )}

        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl bg-zinc-50 p-4">
            <p className="text-xs text-zinc-500">Deducís en {ANIO_FISCAL_VIGENTE}</p>
            <p className="text-xl font-bold text-zinc-900">{formatARS(res.totalDeducible, 0)}</p>
          </div>
          <div className="rounded-xl bg-emerald-50 p-4">
            <p className="text-xs text-emerald-800">Te vuelve de Ganancias</p>
            <p className="text-xl font-bold text-emerald-800">{formatARS(res.ahorroAnual, 0)}</p>
          </div>
          <div className="rounded-xl bg-zinc-50 p-4">
            <p className="text-xs text-zinc-500">Por cada $100 deducidos</p>
            <p className="text-xl font-bold text-zinc-900">
              {formatARS(res.alicuotaEfectiva * 100, 0)}
            </p>
          </div>
        </div>

        {!res.impuestoSin.pagaGanancias && (
          <p className="rounded-lg border border-rose-200 bg-rose-50/70 p-3 text-sm text-rose-900">
            Con ese sueldo no pagás Ganancias, así que ninguna deducción te devuelve plata: no es un reintegro ni se
            acumula para otro año.
          </p>
        )}
        <p className="text-xs text-zinc-500">
          Estimación anual para relación de dependencia con el mismo motor de la calculadora de Ganancias. Si tenés
          otros ingresos o quebrantos, la base del 5% cambia.
        </p>
      </div>
    </div>
  );
}
