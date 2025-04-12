import React, { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { crearAgenda, obtenerAgendas } from "../services/Fetchs.js"; // Importa la función crearAgenda
import Agendas from "./Agendas.jsx";


export const Home = () => {
  const { store, dispatch } = useGlobalReducer();
  const [newAgendaSlug, setNewAgendaSlug] = useState(""); // Estado para el input del slug
  const [loading, setLoading] = useState(false); // Estado para manejar la carga
  const [error, setError] = useState(null); // Estado para manejar errores

  const handleCreateAgenda = async () => {
    if (!newAgendaSlug) {
      alert("Por favor, ingresa un nombre para la agenda.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await crearAgenda(newAgendaSlug, dispatch); // Crea la agenda
      obtenerAgendas(dispatch); // Actualiza la lista de agendas
      setNewAgendaSlug(""); // Limpia el input después de crear la agenda
    } catch (error) {
      setError("Error al crear la agenda. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-center mt-5">
      <h1>Hello Rigo!!</h1>
    
      {/* Input para crear una nueva agenda */}
      <div className="mb-4">
        <input
          type="text"
          value={newAgendaSlug}
          onChange={(e) => setNewAgendaSlug(e.target.value)}
          placeholder="Nombre de la nueva agenda"
          className="form-control w-50 mx-auto"
        />
        <button
          onClick={handleCreateAgenda}
          className="btn btn-primary mt-2"
          disabled={loading}
        >
          {loading ? "Creando..." : "Crear Agenda"}
        </button>
        {error && <p className="text-danger mt-2">{error}</p>}
      </div>

      {/* Componente Agendas */}
      <Agendas />
    </div>
  );
};
