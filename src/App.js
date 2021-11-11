import React, { useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import Modal from "./Modal";
import { useSelector, useDispatch } from "react-redux";
import { groceryActions } from "./store/groceryReducer";

function App() {
  const dispatch = useDispatch();
  const modal = useRef(null);
  const groceryItem = useSelector((state) => state.grocery.groceryItem);
  const isEditing = useSelector((state) => state.grocery.isEditing);
  const modalContent = useSelector((state) => state.grocery.modalContent);
  const isModalOpen = useSelector((state) => state.grocery.isModalOpen);
  const groceryList = useSelector((state) => state.grocery.groceryList);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (groceryItem && !isEditing) {
      const newItem = {
        id: new Date().getTime().toString(),
        name: groceryItem,
      };
      dispatch(groceryActions.addItem(newItem));
    } else if (groceryItem && isEditing) {
      dispatch(groceryActions.editItem());
    } else {
      dispatch(groceryActions.noValue());
    }
  };

  useEffect(() => {
    try {
      if (modalContent === "item removed" || modalContent === "items cleared") {
        modal.current.style.backgroundColor = "#ff9999";
      } else {
        modal.current.style.backgroundColor = "#e9fce9";
      }
    } catch (error) {}
  });

  const closeModal = () => {
    dispatch(groceryActions.closeModal());
  };

  return (
    <main>
      {isModalOpen && (
        <Modal
          closeModal={closeModal}
          modal={modal}
          modalContent={modalContent}
        />
      )}
      <h1>Grocery Bud</h1>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          name="groceryItem"
          id="groceryItem"
          value={groceryItem}
          onChange={(e) =>
            dispatch(groceryActions.inputOnChange(e.target.value))
          }
          placeholder="e.g. eggs"
        />
        <button type="submit">{isEditing ? "edit" : "submit"}</button>
      </form>
      <section>
        {groceryList.map((groceryItem) => {
          return (
            <div className="groceryItem" key={groceryItem.id}>
              <p>{groceryItem.name}</p>
              <span>
                <FontAwesomeIcon
                  className="editIcon"
                  onClick={() =>
                    dispatch(groceryActions.editingMode(groceryItem))
                  }
                  icon={faEdit}
                />
                <FontAwesomeIcon
                  className="trashIcon"
                  onClick={() =>
                    dispatch(groceryActions.removeItem(groceryItem.id))
                  }
                  icon={faTrash}
                />
              </span>
            </div>
          );
        })}
      </section>
      {groceryList.length > 0 && (
        <button
          className="clearItemsButton"
          onClick={() => dispatch(groceryActions.clearItems())}
        >
          Clear Items
        </button>
      )}
    </main>
  );
}

export default App;
