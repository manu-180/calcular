"use client";
import { crearCalculadoraCliente } from "@/motor/cliente";
import convertisseurEuroFcfa from "./convertisseur-euro-fcfa";
export default crearCalculadoraCliente(convertisseurEuroFcfa);
