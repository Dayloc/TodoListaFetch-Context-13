import React, { useEffect, useContext } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { obtenerContactos, eliminarContacto } from "../store";
import ContactCard from "../components/ContactCard";

function Contact() {
  const { store, dispatch } = useGlobalReducer();

  useEffect(() => {
    obtenerContactos(dispatch); // Obtener los contactos al cargar la vista
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("¿Estás seguro de eliminar este contacto?")) {
      eliminarContacto(id, dispatch);
    }
  };

  return (
    <div>
      <h1>Lista de Contactos</h1>
      {store.contacts.length === 0 ? (
        <p>No hay contactos disponibles.</p>
      ) : (
        store.contacts.map((contact) => (
          <ContactCard
            key={contact.id}
            contact={contact}
            onEdit={() => console.log("Editar:", contact)} // Implementa la lógica de edición
            onDelete={handleDelete}
          />
        ))
      )}
    </div>
  );
}

export default Contact;
