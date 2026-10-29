"use client";
import { crearCalculadoraCliente } from "@/motor/cliente";
import taxesSurSalaires from "./taxes-sur-salaires";
export default crearCalculadoraCliente(taxesSurSalaires);
