import { createContext, useContext, useState } from "react";
import {
  getEntitiesRequest,
  getEntityRequest,
  createEntityRequest,
  updateEntityRequest,
  deleteEntityRequest,
} from "../api/entities";

const EntitiesContext = createContext();

export const useEntities = () => {
  const context = useContext(EntitiesContext);

  if (!context) {
    throw new Error("useEntities debe estar dentro de un EntitiesProvider!");
  }

  return context;
};

export function EntitiesProvider({ children }) {
  const [element, setElement] = useState([]);

  const getElement = async (url) => {
    try {
      const res = await getEntitiesRequest(url);
      setElement(res.data);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const createElement = async (url, element) => {
    await createEntityRequest(url, element);
  };

  const updateElement = async (url, element) => {
    await updateEntityRequest(url, element);
  };

  const deleteElement = async (url, id) => {
    try {
      const res = await deleteEntityRequest(url, id);
      console.log(element);
      if (res.status === 204) setElement(element.filter((el) => el.id !== id));
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  // S de singular
  const getElementS = async (url, id) => {
    try {
      const res = await getEntityRequest(url, id);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <EntitiesContext.Provider
      value={{
        element,
        getElement,
        getElementS,
        createElement,
        updateElement,
        deleteElement,
      }}
    >
      {children}
    </EntitiesContext.Provider>
  );
}
