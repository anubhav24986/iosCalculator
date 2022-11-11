import { createContext, useContext } from 'react';
import calculatorStore from './calculatorStore';

const store = {
    calStore: new calculatorStore(),
}

export const StoreContext = createContext(store);

export const UseStore = () => {
    return useContext<typeof store>(StoreContext);
}

export default store;
