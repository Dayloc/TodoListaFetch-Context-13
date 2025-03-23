import React, { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import {
  obtenerContactos,
  crearContacto,
  actualizarContacto,
  eliminarContacto,
  obtenerAgendas,
} from "../store"; // Importa las funciones CRUD
import Contador from "../components/Contador.jsx";
import GetPersonajes from "./GetPersonajes.jsx";

export const Home = () => {
  const { store, dispatch } = useGlobalReducer();
  const [nuevoContacto, setNuevoContacto] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });
  const [editando, setEditando] = useState(null); // Estado para manejar la edición
  const { agendas } = store;

  console.log({ agendas });

  // Obtener los contactos al cargar el componente
  useEffect(() => {
    obtenerContactos(dispatch);
    obtenerAgendas(dispatch);
  }, [dispatch]);

  // Manejar el envío del formulario (crear o actualizar contacto)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editando) {
      await actualizarContacto({ ...nuevoContacto, id: editando }, dispatch);
    } else {
      await crearContacto(nuevoContacto, dispatch);
    }
    setNuevoContacto({ name: "", phone: "", email: "", address: "" }); // Limpiar el formulario
    setEditando(null); // Salir del modo de edición
  };

  // Manejar la eliminación de un contacto
  const handleEliminar = (id) => {
    if (window.confirm("¿Estás seguro de eliminar este contacto?")) {
      eliminarContacto(id, dispatch);
    }
  };

  // Manejar la edición de un contacto
  const handleEditar = (contacto) => {
    setNuevoContacto(contacto);
    setEditando(contacto.id);
  };

  return (
    <div className="text-center mt-5">
      <h1>Hello Rigo!!</h1>

      {/*    <Contador /> */}

      {/* Lista de Contactos */}
      <h2>Lista de Contactos</h2>
      {store.contacts.length === 0 ? (
        <p>No hay contactos disponibles.</p>
      ) : (
        <ul>
          {store.contacts.map((contact) => (
            <li key={contact.id}>
              <h3>{contact.name}</h3>
              <p>Teléfono: {contact.phone}</p>
              <p>Email: {contact.email}</p>
              <p>Dirección: {contact.address}</p>
              <button onClick={() => handleEditar(contact)}>Editar</button>
              <button onClick={() => handleEliminar(contact.id)}>
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      )}
      <div>
        <h2>Agendas</h2>
        {agendas.length === 0 ? (
          <p>No hay agendas disponibles.</p>
        ) : (
          <ul>
            {agendas.agendas.map((agenda) => (
              <li key={agenda.id}>
                <h3>{agenda.slug}</h3>
                <p>Descripción: {agenda.description}</p>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Formulario para agregar/editar contactos */}
      <h2>{editando ? "Editar Contacto" : "Agregar Contacto"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre"
          value={nuevoContacto.name}
          onChange={(e) =>
            setNuevoContacto({ ...nuevoContacto, name: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Teléfono"
          value={nuevoContacto.phone}
          onChange={(e) =>
            setNuevoContacto({ ...nuevoContacto, phone: e.target.value })
          }
        />
        <input
          type="email"
          placeholder="Email"
          value={nuevoContacto.email}
          onChange={(e) =>
            setNuevoContacto({ ...nuevoContacto, email: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Dirección"
          value={nuevoContacto.address}
          onChange={(e) =>
            setNuevoContacto({ ...nuevoContacto, address: e.target.value })
          }
        />
        <button type="submit">{editando ? "Actualizar" : "Agregar"}</button>
      </form>

      {/*<GetPersonajes /> */}
    </div>
  );
};
