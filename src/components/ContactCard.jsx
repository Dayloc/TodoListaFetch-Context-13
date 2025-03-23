import React from "react";

function ContactCard({ contact, onEdit, onDelete }) {
  return (
    <div className="contact-card">
      <h3>{contact.name}</h3>
      <p>Teléfono: {contact.phone}</p>
      <p>Email: {contact.email}</p>
      <p>Dirección: {contact.address}</p>
      <button onClick={() => onEdit(contact)}>Editar</button>
      <button onClick={() => onDelete(contact.id)}>Eliminar</button>
    </div>
  );
}

export default ContactCard;