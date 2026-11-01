"use client";
import { crearCalculadoraCliente } from "@/motor/cliente";
import convertisseurDollarFcfa from "./convertisseur-dollar-fcfa";
export default crearCalculadoraCliente(convertisseurDollarFcfa);
