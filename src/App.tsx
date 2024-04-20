import AboutMe from './components/AboutMe/AboutMe.tsx';
import { HeaderComponent } from './components/header/Header.component.tsx';

// import styles from './App.module.css';

function App() {
    return (
        <>
            <HeaderComponent />
            <main className="home">
                <AboutMe />
            </main>
        </>
    );
}

export default App;
