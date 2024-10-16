import Menu_Routes from '../components/Menu_Routes';

export default function Home(){
    return(
        <div className="mainContainer">
            <div className="content-wrapper">
                <div className="content">
            <div className="home-content"> {/* Nuevo contenedor */}
            <Menu_Routes />

                <h1>Home</h1>
                <p>Hola, Bienvenido</p>
            </div>
                </div>
            </div>
        </div>
    );
}