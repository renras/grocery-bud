export const reducer = (state, action) => {
  if (action.type === "ADD_ITEM") {
    const newGroceryList = [...state.groceryList, action.payload];
    return {
      ...state,
      groceryList: newGroceryList,
      isModalOpen: true,
      modalContent: "item added",
      groceryItem: "",
    };
  }
  if (action.type === "REMOVE_ITEM") {
    const newGroceryList = state.groceryList.filter(
      (groceryItem) => groceryItem.id !== action.payload
    );
    return {
      ...state,
      groceryList: newGroceryList,
      modalContent: "item removed",
      isModalOpen: true,
    };
  }
  if (action.type === "CLEAR_ITEMS") {
    return {
      ...state,
      groceryList: [],
      modalContent: "items cleared",
      isModalOpen: true,
    };
  }
  if (action.type === "EDIT_ITEM") {
    const newGroceryList = state.groceryList.map((groceryItem) => {
      if (groceryItem.id === state.editID) {
        groceryItem.name = state.groceryItem;
      }
      return groceryItem;
    });
    return {
      ...state,
      groceryList: newGroceryList,
      isEditing: false,
      groceryItem: "",
      isModalOpen: false,
    };
  }
  if (action.type === "EDITING_MODE") {
    return {
      ...state,
      modalContent: "enter new name",
      groceryItem: action.payload.name,
      isEditing: true,
      editID: action.payload.id,
      isModalOpen: true,
    };
  }
  if (action.type === "INPUT_ON_CHANGE") {
    return {
      ...state,
      groceryItem: action.payload,
    };
  }
  if (action.type === "CLOSE_MODAL") {
    return {
      ...state,
      isModalOpen: false,
    };
  }
};

export const defaultState = {
  groceryList: [],
  isModalOpen: false,
  modalContent: "",
  isEditing: false,
  groceryItem: "",
  editID: null,
};
