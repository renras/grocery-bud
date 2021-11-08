import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

function App() {
  const [groceryItem, setGroceryItem] = useState("");
  const [groceryList, setGroceryList] = useState([]);
  const [groceryItemIndex, setGroceryItemIndex] = useState(null);
  const [isCleared, setIsCleared] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isValueChanged, setIsValueChanged] = useState(false);

  const handleFormSubmit = (e) => {
    if (!isEditing) {
      e.preventDefault();
      setGroceryList([...groceryList, groceryItem]);
      setIsCleared(false);
      setIsAdded(true);
      setIsValueChanged(false);
    } else {
      e.preventDefault();
      const newGroceryList = groceryList.map((grocery, index) => {
        if (index === groceryItemIndex) {
          grocery = groceryItem;
        }
        return grocery;
      });
      setIsValueChanged(true);
      setIsAdded(false);
      setIsCleared(false);
      setGroceryList(newGroceryList);
      setIsEditing(false);
    }
    setGroceryItem("");
  };

  const handleClearItemsClick = () => {
    setGroceryList([]);
    setIsAdded(false);
    setIsCleared(true);
    setIsValueChanged(false);
  };

  const editGrocery = (index) => {
    setIsEditing(true);
    const newGrocery = groceryList.map((grocery, i) => {
      if (i === index) {
        setGroceryItem(grocery);
        setGroceryItemIndex(index);
      }
      return grocery;
    });
    setGroceryList(newGrocery);
  };

  const deleteGrocery = (index) => {
    let newGroceryList = groceryList.filter((grocery, i) => {
      return i !== index;
    });
    setGroceryList(newGroceryList);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsCleared(false);
      setIsAdded(false);
      setIsValueChanged(false);
    }, 3000);
    return () => {
      clearTimeout(timer);
    };
  }, [isCleared, isAdded, isValueChanged]);

  return (
    <main>
      {isAdded && <p className="alertForAddList">Item Added To The List</p>}
      {isCleared && <p className="alertForEmptyList">Empty List</p>}
      {isValueChanged && <p className="alertForValueChanged">Value Changed</p>}
      <h1>Grocery Bud</h1>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          name="groceryItem"
          id="groceryItem"
          value={groceryItem}
          onChange={(e) => setGroceryItem(e.target.value)}
          placeholder="e.g. eggs"
        />
        <button type="submit">{isEditing ? "Edit" : "Submit"}</button>
      </form>
      <section>
        {groceryList.map((groceryItem, index) => {
          return (
            <div className="groceryItem" key={index}>
              <p>{groceryItem}</p>
              <span>
                <FontAwesomeIcon
                  className="editIcon"
                  onClick={() => editGrocery(index)}
                  icon={faEdit}
                />
                <FontAwesomeIcon
                  className="trashIcon"
                  onClick={() => deleteGrocery(index)}
                  icon={faTrash}
                />
              </span>
            </div>
          );
        })}
      </section>
      {groceryList.length > 0 && (
        <button className="clearItemsButton" onClick={handleClearItemsClick}>
          Clear Items
        </button>
      )}
    </main>
  );
}

export default App;
