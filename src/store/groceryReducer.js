import { createSlice } from "@reduxjs/toolkit";

const initialGroceryState = {
  groceryList: [],
  isModalOpen: false,
  modalContent: "",
  isEditing: false,
  groceryItem: "",
  editID: null,
};

const grocerySlice = createSlice({
  name: "grocery",
  initialState: initialGroceryState,
  reducers: {
    addItem(state, action) {
      const newGroceryList = [...state.groceryList, action.payload];

      state.groceryList = newGroceryList;
      state.isModalOpen = true;
      state.modalContent = "item added";
      state.groceryItem = "";
    },
    removeItem(state, action) {
      const newGroceryList = state.groceryList.filter(
        (groceryItem) => groceryItem.id !== action.payload
      );
      state.groceryList = newGroceryList;
      state.modalContent = "item removed";
      state.isModalOpen = true;
    },
    clearItems(state) {
      state.groceryList = [];
      state.modalContent = "items cleared";
      state.isModalOpen = true;
    },
    editItem(state) {
      const newGroceryList = state.groceryList.map((groceryItem) => {
        if (groceryItem.id === state.editID) {
          groceryItem.name = state.groceryItem;
        }
        return groceryItem;
      });
      state.groceryList = newGroceryList;
      state.isEditing = false;
      state.groceryItem = "";
      state.isModalOpen = false;
    },
    editingMode(state, action) {
      state.modalContent = "enter new name";
      state.groceryItem = action.payload.name;
      state.isEditing = true;
      state.editID = action.payload.id;
      state.isModalOpen = true;
    },
    inputOnChange(state, action) {
      state.groceryItem = action.payload;
    },
    closeModal(state) {
      state.isModalOpen = false;
    },
    noValue(state) {
      state.modalContent = "please enter a value";
      state.isModalOpen = true;
    },
  },
});

export const groceryActions = grocerySlice.actions;

export default grocerySlice.reducer;
