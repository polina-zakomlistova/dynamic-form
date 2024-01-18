import { AppRouter } from './providers/router';

import cls from './App.module.scss';

function App() {
    return (
        <div className={cls.App}>
            <header className={cls.header}>
                {}
            </header>
            <main className={cls.main}>
                <h1 className="visually-hidden">main</h1>
                <AppRouter />
            </main>
            <footer className={cls.footer}>
                {}
            </footer>
        </div>
    );
}

export default App;
