// Contador.jsx
import React, { useReducer } from "react";
import useGlobalReducer from "./../hooks/useGlobalReducer"; // Importa el hook personalizado


function Contador() {
  const { store, dispatch } = useGlobalReducer();
  const { contador, mensaje, personajes } = store;


 
  return (
    <div className=" text-center mt-5">
      <h1>Contador: {store.contador}</h1>
      <button className="btn btn-primary m-2" onClick={() => dispatch({ type: "incrementar" })}>+1</button>
      <button className="btn btn-primary m-2" onClick={() => dispatch({ type: "decrementar" })}>-1</button>
      
  
    </div>
  );
}

export default Contador;
