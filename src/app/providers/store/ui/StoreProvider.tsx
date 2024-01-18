import React, { ReactNode, useMemo } from 'react';

import StoreContext from 'app/providers/context/store';
import { injectStores } from '@mobx-devtools/tools';

import RootStore from '../config/store';

interface StoreProviderProps {
    children?: ReactNode;
}

const StoreProvider = (props: StoreProviderProps) => {
    const { children } = props;

    const store = useMemo(() => new RootStore(), []);

    injectStores({
        store,
    });
    return (
        <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
    );
};

export default StoreProvider;
