import AboutMe from './components/AboutMe/AboutMe.tsx';
import Footer from './components/Footer/Footer.tsx';
import Header from './components/Header/Header.component.tsx';

// import styles from './App.module.css';

function App() {
    return (
        <>
            <Header />
            <main className="home">
                <AboutMe />
            </main>
            <Footer />
        </>
    );
}

export default App;
