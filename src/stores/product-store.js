import { create } from 'zustand';

const productStore = create((set) => ({
    products: [],
    setProducts: (_products) => set(() => ({ products: _products })),
}));
export default productStore;
