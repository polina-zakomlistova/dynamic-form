import React, { Suspense, FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { routeConfig } from 'shared/config/routeConfig/Routes';

const AppRouter: FC = () => (
    <Suspense fallback={<div>Loading...</div>}>
        <Routes>
            {Object.values(routeConfig).map(({ element, path }) => (
                <Route
                    key={path}
                    path={path}
                    element={(
                        <Suspense fallback={<div>Loading...</div>}>
                            {element}
                        </Suspense>
                    )}
                />
            ))}
        </Routes>
    </Suspense>
);

export default AppRouter;
