import { useContext } from 'react';
import StoreContext from 'app/providers/context/store';
import RootStore from 'app/providers/store/config/store';

export default function useStore(...list: (keyof RootStore)[]) {
    const stores = useContext(StoreContext);
    return list.map((name) => stores[name]);
}
