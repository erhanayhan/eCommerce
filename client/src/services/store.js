import axios from "axios";
import create from 'zustand'

export const useStore = create(set => ({
  products: [],
  selectedItems: [],
  localStorage:[],
  prepareProducts: async () => {
      const {data} = await axios.get("http://localhost:8080/products");
      set({products: data})     
  },
  setSelectedItems: (item) => set(state => ({ selectedItems: [...state.selectedItems, item] })),
  setLocalStoroge: (item) => set(state => ({ selectedlocalStorageItems: [...state.localStorage, item] }))
}))