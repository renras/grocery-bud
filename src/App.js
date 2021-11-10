import React, { useEffect, useRef, useReducer } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import Modal from "./Modal";
import { reducer } from "./state";
import { defaultState } from "./state";

function App() {
  const modal = useRef(null);
  const [state, dispatch] = useReducer(reducer, defaultState);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (state.groceryItem && !state.isEditing) {
      const newItem = {
        id: new Date().getTime().toString(),
        name: state.groceryItem,
      };
      dispatch({ type: "ADD_ITEM", payload: newItem });
    } else if (state.groceryItem && state.isEditing) {
      dispatch({ type: "EDIT_ITEM" });
    } else {
      dispatch({ type: "NO_VALUE" });
    }
  };

  useEffect(() => {
    try {
      if (
        state.modalContent === "item removed" ||
        state.modalContent === "items cleared"
      ) {
        modal.current.style.backgroundColor = "#ff9999";
      } else {
        modal.current.style.backgroundColor = "#e9fce9";
      }
    } catch (error) {}
  });

  const closeModal = () => {
    dispatch({ type: "CLOSE_MODAL" });
  };

  return (
    <main>
      {state.isModalOpen && (
        <Modal
          closeModal={closeModal}
          modal={modal}
          modalContent={state.modalContent}
        />
      )}
      <h1>Grocery Bud</h1>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          name="groceryItem"
          id="groceryItem"
          value={state.groceryItem}
          onChange={(e) =>
            dispatch({ type: "INPUT_ON_CHANGE", payload: e.target.value })
          }
          placeholder="e.g. eggs"
        />
        <button type="submit">{state.isEditing ? "edit" : "submit"}</button>
      </form>
      <section>
        {state.groceryList.map((groceryItem) => {
          return (
            <div className="groceryItem" key={groceryItem.id}>
              <p>{groceryItem.name}</p>
              <span>
                <FontAwesomeIcon
                  className="editIcon"
                  onClick={() =>
                    dispatch({ type: "EDITING_MODE", payload: groceryItem })
                  }
                  icon={faEdit}
                />
                <FontAwesomeIcon
                  className="trashIcon"
                  onClick={() =>
                    dispatch({ type: "REMOVE_ITEM", payload: groceryItem.id })
                  }
                  icon={faTrash}
                />
              </span>
            </div>
          );
        })}
      </section>
      {state.groceryList.length > 0 && (
        <button
          className="clearItemsButton"
          onClick={() => dispatch({ type: "CLEAR_ITEMS" })}
        >
          Clear Items
        </button>
      )}
    </main>
  );
}

export default App;
