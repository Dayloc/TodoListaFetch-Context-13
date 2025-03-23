export const initialStore = () => {
  return {
    message: null,
    contador: 0,
    personajes: [],
    contacts: [], // Cambiamos personajes por contacts
    agendas: [], // Agregamos agendas
  };
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case "incrementar":
      return {
        ...store,
        contador: store.contador + 1, // Incrementa el contador
      };

    case "decrementar":
      return {
        ...store,
        contador: store.contador - 1, // Decrementa el contador
      };

    case "mensaje":
      return {
        ...store,
        message: "Hola prueba", // Actualiza el mensaje
      };

    case "guardar_personajes":
      return {
        ...store,
        personajes: action.payload, // Guarda los personajes en el estado
      };

    case "guardar_agendas":
      return {
        ...store,
        agendas: action.payload, // Guarda las agendas en el estado
      };

    case "guardar_contactos":
      return {
        ...store,
        contacts: action.payload, // Guarda los contactos en el estado
      };

    case "agregar_contacto":
      return {
        ...store,
        contacts: [...store.contacts, action.payload], // Agrega un nuevo contacto
      };

    case "actualizar_contacto":
      return {
        ...store,
        contacts: store.contacts.map((contact) =>
          contact.id === action.payload.id ? action.payload : contact
        ), // Actualiza un contacto existente
      };

    case "eliminar_contacto":
      return {
        ...store,
        contacts: store.contacts.filter(
          (contact) => contact.id !== action.payload
        ), // Elimina un contacto
      };

    default:
      throw new Error("Unknown action.");
  }
}

export async function getPersonajes() {
  try {
    const response = await fetch("https://rickandmortyapi.com/api/character");
    if (!response.ok) {
      throw new Error("Error al obtener los personajes");
    }
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

export async function obtenerYGuardarPersonajes(dispatch) {
  try {
    const personajes = await getPersonajes();
    dispatch({
      type: "guardar_personajes",
      payload: personajes,
    });
  } catch (error) {
    console.error("Error al obtener y guardar los personajes:", error);
  }
}

const API_URL = "https://playground.4geeks.com/contact";

export async function obtenerContactos(dispatch) {
  try {
    const response = await fetch(`${API_URL}/agendas/your_agenda_name/contacts`);
    if (!response.ok) {
      throw new Error("Error al obtener los contactos");
    }
    const data = await response.json();
    dispatch({
      type: "guardar_contactos",
      payload: data.contacts,
    });
  } catch (error) {
    console.error("Error al obtener los contactos:", error);
  }
}

export async function crearContacto(contacto, dispatch) {
  try {
    const response = await fetch(`${API_URL}/agendas/your_agenda_name/contacts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contacto),
    });
    if (!response.ok) {
      throw new Error("Error al crear el contacto");
    }
    const data = await response.json();
    dispatch({
      type: "agregar_contacto",
      payload: data,
    });
  } catch (error) {
    console.error("Error al crear el contacto:", error);
  }
}

export async function actualizarContacto(contacto, dispatch) {
  try {
    const response = await fetch(`${API_URL}/agendas/your_agenda_name/contacts/${contacto.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contacto),
    });
    if (!response.ok) {
      throw new Error("Error al actualizar el contacto");
    }
    const data = await response.json();
    dispatch({
      type: "actualizar_contacto",
      payload: data,
    });
  } catch (error) {
    console.error("Error al actualizar el contacto:", error);
  }
}

export async function eliminarContacto(id, dispatch) {
  try {
    const response = await fetch(`${API_URL}/agendas/your_agenda_name/contacts/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Error al eliminar el contacto");
    }
    dispatch({
      type: "eliminar_contacto",
      payload: id,
    });
  } catch (error) {
    console.error("Error al eliminar el contacto:", error);
  }
}

export async function obtenerAgendas(dispatch) {
  try {
    const response = await fetch(`${API_URL}/agendas`);
    if (!response.ok) {
      throw new Error("Error al obtener las agendas");
    }
    const data = await response.json();
    dispatch({
      type: "guardar_agendas",
      payload: data,
    });
  } catch (error) {
    console.error("Error al cargar las agendas:", error);
  }
}