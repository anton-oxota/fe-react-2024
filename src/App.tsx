import AboutMe from './components/AboutMe/AboutMe.tsx';
import Footer from './components/Footer/Footer.tsx';
import HeaderComponent from './components/HeaderComponent/HeaderComponent.tsx';

// import styles from './App.module.css';

function App() {
    return (
        <>
            <HeaderComponent />
            <main className="home">
                <AboutMe />
            </main>
            <Footer />
        </>
    );
}

export default App;
