import React, { useState, useContext } from "react";
import { crearContacto, actualizarContacto } from "./../store";
import useGlobalReducer from "./../hooks/useGlobalReducer";
import { useNavigate } from "react-router-dom";

function AddContact({ contactToEdit }) {
  const { store, dispatch } = useGlobalReducer();
  const navigate = useNavigate();

  const [contact, setContact] = useState(
    contactToEdit || {
      name: "",
      phone: "",
      email: "",
      address: "",
    }
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (contactToEdit) {
      await actualizarContacto(contact, dispatch);
    } else {
      await crearContacto(contact, dispatch);
    }
    navigate("/contact"); // Redirige a la lista de contactos
  };

  return (
    <div>
      <h1>{contactToEdit ? "Editar Contacto" : "Agregar Contacto"}</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre"
          value={contact.name}
          onChange={(e) => setContact({ ...contact, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Teléfono"
          value={contact.phone}
          onChange={(e) => setContact({ ...contact, phone: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={contact.email}
          onChange={(e) => setContact({ ...contact, email: e.target.value })}
        />
        <input
          type="text"
          placeholder="Dirección"
          value={contact.address}
          onChange={(e) => setContact({ ...contact, address: e.target.value })}
        />
        <button type="submit">
          {contactToEdit ? "Actualizar" : "Agregar"}
        </button>
      </form>
    </div>
  );
}

export default AddContact;
