export const initialStore = () => {
  return {
    message: null,
    contador: 0,
   
    contacts: [], // Agregamos contactos
    agendas: { agendas: [] }, // Agregamos agendas
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

    

    case "guardar_agendas":
      return {
        ...store,
        agendas: action.payload, // Guarda las agendas en el estado
      };

    case "agregar_agenda": // Nuevo caso para agregar una sola agenda
      return {
        ...store,
        agendas: [...store.agendas.agendas, action.payload], // Agrega la nueva agenda al estado
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



const API_URL = "https://playground.4geeks.com/contact";

export async function obtenerContactos(dispatch, slug) {
  try {
    const response = await fetch(`${API_URL}/agendas/${slug}`);
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

export async function crearContacto(contacto, dispatch, slug) {
  try {
    const response = await fetch(`${API_URL}/agendas/${slug}/contacts`, {
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

export async function actualizarContacto(contacto, dispatch, slug) {
  try {
    const response = await fetch(
      `${API_URL}/agendas/${slug}/contacts/${contacto.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contacto),
      }
    );
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

export async function eliminarContacto(id, dispatch, slug) {
  try {
    const response = await fetch(`${API_URL}/agendas/${slug}/contacts/${id}`, {
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
export async function crearAgenda(slug, dispatch) {
  try {
    const response = await fetch(`${API_URL}/agendas/${slug}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("Respuesta de la API:", response); // Depuración

    if (!response.ok) {
      const errorData = await response.json(); // Intenta obtener más detalles del error
      console.error("Error al crear la agenda:", errorData); // Depuración
      throw new Error(errorData.message || "Error al crear la agenda");
    }

    const data = await response.json();
    console.log("Agenda creada:", data); // Depuración

    // Despacha la acción para agregar la nueva agenda al estado
    dispatch({
      type: "agregar_agenda",
      payload: data, // La nueva agenda creada
    });

    return data; // Devuelve la agenda creada
  } catch (error) {
    console.error("Error al crear la agenda, o ya existe :", error); // Depuración
    throw error; // Relanza el error para manejarlo en el componente
  }
}
