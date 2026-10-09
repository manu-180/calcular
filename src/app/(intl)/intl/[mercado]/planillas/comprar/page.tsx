import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ventaIntlActiva } from "@/lib/pagos";
import { productoIntlDe } from "@/lib/pagos/catalogo-intl";
import { rutaIntl } from "@/motor/seo";
import type { CodigoMercado } from "@/motor/tipos";
import { contextoSitio } from "@/motor/ui/contexto";
import { IconoFlecha } from "@/motor/ui/Iconos";
import { Migas } from "@/motor/ui/Sitio";
import { registro } from "@/paises";
import { precioIntl, textosPlanillas } from "../_textos";

export const dynamic = "force-dynamic";

export const metadata: Metadata = { robots: { index: false, follow: false } };

type Props = { params: Promise<{ mercado: string }>; searchParams: Promise<Record<string, string | string[] | undefined>> };

const uno = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) ?? "";

const OCULTO = { position: "absolute", left: "-10000px", width: "1px", height: "1px", overflow: "hidden" } as const;

export default async function ComprarPlanillaIntl({ params, searchParams }: Props) {
  const { mercado } = await params;
  const sp = await searchParams;
  const ctx = contextoSitio(registro, mercado as CodigoMercado);
  const p = ctx ? productoIntlDe(ctx.mercado.codigo, uno(sp.p)) : null;
  if (!ctx || !p) notFound();
  const m = ctx.mercado;
  const t = textosPlanillas(m);
  const clave = uno(sp.error) || uno(sp.pago);
  const aviso = clave in t.errores ? t.errores[clave as keyof typeof t.errores] : null;
  const activa = ventaIntlActiva();
  return (
    <div className="cy-pagina">
      <Migas
        etiqueta={ctx.textos.migas.etiqueta}
        items={[
          { nombre: m.nombre, href: rutaIntl(m.codigo) },
          { nombre: t.migaPlanillas, href: rutaIntl(m.codigo, "planillas") },
          { nombre: p.tituloCorto, href: rutaIntl(m.codigo, `planillas/${p.slug}`) },
        ]}
      />
      <header className="cy-heroe cy-heroe-chico">
        <h1 className="cy-titular">{t.comprarTitulo(p)}</h1>
        <p className="cy-bajada">{activa ? t.comprarBajada : t.errores.pronto}</p>
      </header>
      {aviso ? (
        <p className="cy-aviso" role="alert">
          {aviso}
        </p>
      ) : null}
      {activa ? (
        <form method="post" action="/api/pagos/checkout" className="cy-calc-form">
          <input type="hidden" name="p" value={p.id} />
          <input type="hidden" name="ruta" value={rutaIntl(m.codigo, `planillas/${p.slug}`)} />
          <div style={OCULTO} aria-hidden="true">
            <label htmlFor="cy-sitio">Sitio web</label>
            <input id="cy-sitio" name="sitio" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
          </div>
          <div className="cy-campo">
            <label htmlFor="cy-email" className="cy-campo-etiqueta">
              {t.etiquetaEmail}
            </label>
            <div className="cy-entrada">
              <input id="cy-email" name="email" type="email" required autoComplete="email" inputMode="email" maxLength={254} />
            </div>
            <p className="cy-campo-ayuda">{t.privacidad}</p>
          </div>
          <button type="submit" className="cy-boton cy-boton-principal">
            <span>
              {t.seguirPago} ({precioIntl(p, m.locale)})
            </span>
            <span className="cy-boton-icono">
              <IconoFlecha />
            </span>
          </button>
          <p className="cy-vacio">{t.pagoUnico}</p>
        </form>
      ) : null}
    </div>
  );
}
