export type NombreProveedor = "mercadopago" | "paypal" | "stripe";

export type EstadoPago = "aprobado" | "pendiente" | "rechazado" | "reembolsado" | "contracargo";

export type ProductoVenta = {
  id: string;
  titulo: string;
  precioCentavos: number;
  // Precios que tuvo antes: valen para los pagos que no traen el precio con que se creó la orden.
  preciosAnterioresCentavos?: readonly number[];
  moneda: string;
};

export type PagoVerificado = {
  proveedor: NombreProveedor;
  id: string;
  ordenId: string | null;
  estado: EstadoPago | null;
  estadoProveedor: string;
  montoCentavos: number | null;
  moneda: string | null;
  referencia: string | null;
  email: string | null;
  fecha: string | null;
  // Lo que cobró la orden según nuestro propio registro al crearla (lo llena el proveedor que lo sepa).
  precioCobradoCentavos?: number | null;
};

export type CheckoutCreado = { id: string; urlPago: string };

export type PedidoCheckout = {
  producto: ProductoVenta;
  referencia: string;
  urlVuelta: string;
  urlCancelar: string;
  email?: string | null;
  idempotencia: string;
};

export type NotificacionEntrante = {
  url: URL;
  headers: Headers;
  cuerpo: string;
};

export interface ProveedorPago {
  readonly nombre: NombreProveedor;
  configurado(): boolean;
  crearCheckout(p: PedidoCheckout): Promise<CheckoutCreado>;
  confirmarPago(id: string): Promise<PagoVerificado | null>;
  consultarPago(id: string): Promise<PagoVerificado | null>;
  validarWebhook(n: NotificacionEntrante): Promise<boolean>;
}

export class ProveedorNoConfigurado extends Error {
  constructor(nombre: NombreProveedor) {
    super(`${nombre} no configurado`);
    this.name = "ProveedorNoConfigurado";
  }
}

export function centavos(valor: number | string | null | undefined): number | null {
  if (valor === null || valor === undefined || valor === "") return null;
  const s = typeof valor === "number" ? valor.toFixed(2) : valor.trim();
  if (!/^\d{1,9}(\.\d{1,2})?$/.test(s)) return null;
  const [ent, dec = ""] = s.split(".");
  return Number(ent) * 100 + Number(dec.padEnd(2, "0"));
}

export function decimal(centavosValor: number): string {
  return `${Math.floor(centavosValor / 100)}.${String(centavosValor % 100).padStart(2, "0")}`;
}

// El gate de entrega para cualquier proveedor: aprobado, monto exacto en centavos y moneda exacta. El
// monto se compara con el precio con que se creó la compra si el pago lo trae, y si no con cualquier
// precio que el producto haya tenido: subir un precio no puede dejar sin descarga a quien ya pagó.
export function preciosValidos(pago: Pick<PagoVerificado, "precioCobradoCentavos">, producto: ProductoVenta): readonly number[] {
  const cobrado = pago.precioCobradoCentavos;
  if (typeof cobrado === "number" && Number.isInteger(cobrado) && cobrado > 0) return [cobrado];
  return [producto.precioCentavos, ...(producto.preciosAnterioresCentavos ?? [])];
}

export function pagoCubre(pago: PagoVerificado | null | undefined, producto: ProductoVenta): boolean {
  return (
    !!pago &&
    pago.estado === "aprobado" &&
    pago.montoCentavos !== null &&
    preciosValidos(pago, producto).includes(pago.montoCentavos) &&
    pago.moneda === producto.moneda
  );
}
