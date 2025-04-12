import React, { useEffect } from "react";

import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Link } from "react-router-dom";
import { obtenerAgendas } from "../services/Fetchs.js";

function Agendas() {
  const { store, dispatch } = useGlobalReducer();
  const { agendas } = store;

 

  useEffect(() => {
    obtenerAgendas(dispatch);
  }, [dispatch]);
  const listaAgendas = agendas?.agendas || [];

  return (
    <div className="container mt-5">
      <div className="text-center">
        <h2 className="mb-4">Agendas</h2>
        {listaAgendas.length === 0 ? (
          <p className="text-muted">No hay agendas disponibles.</p>
        ) : (
          <ul className="list-unstyled">
            {listaAgendas.map((agenda) => (
              <li key={agenda.id} className="mb-4 p-3 border rounded shadow-sm">
                <div className="text-start">
                  <Link
                    to={`/contact/${agenda.slug}`}
                    className="text-decoration-none"
                  >
                    <h3 className="mb-2 text-primary">{agenda.slug}</h3>
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Agendas;
