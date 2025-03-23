import React, { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { obtenerYGuardarPersonajes } from "./../store";
function GetPersonajes() {
  const { store, dispatch } = useGlobalReducer();
  const { personajes } = store;
  console.log({ personajes });

  useEffect(() => {
    obtenerYGuardarPersonajes(dispatch);
  }, []);


  return <div>
    {
      personajes.map((personaje) => {
        return <div key={personaje.id}>
          <h2>{personaje.name}</h2>
          <img src={personaje.image} alt={personaje.name} />
        </div>;
      })
    }
  </div>;
}

export default GetPersonajes;
