"use client";
import { crearCalculadoraCliente } from "@/motor/cliente";
import impuestoALaTransferencia from "./impuesto-a-la-transferencia";
export default crearCalculadoraCliente(impuestoALaTransferencia);
