// página prueba para ver como funciona el componente Mapa
import { Mapa } from "./Mapa";
import { MenuLateral } from "../MenuLateral/MenuLateral";
import React from 'react'

export const ShowMapa = () => {
  return (
      <MenuLateral>
          <Mapa lat={39.45474160} lon={-0.38329410}></Mapa>
      </MenuLateral>
  )
}

