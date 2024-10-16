import { Suspense } from "react";
import '../css/Navbar.css'; // Asegúrate de crear este archivo CSS

interface userMenuProps {
    foto: string;        // URL de la imagen
    nombre: string;     // Título de la imagen
    descripcion: string; // Descripción de la imagen
}

export default function UserMenu({ Usuario }: { Usuario: userMenuProps | null}) {
    if (!Usuario) {
        return <div>Loading...</div>; // O cualquier otro mensaje o componente de carga
    }

    const { foto, nombre, descripcion } = Usuario; // Desestructuración del objeto Usuario
    const imageBase64 = foto ? `data:image/jpeg;base64,${foto}` : 'https://via.placeholder.com/100'; 

    return (
        <div>
            {/* Usar el componente TabsMenu */}
            <nav className="navbar">
                <div className="navbar-brand">
                    <h1>Portafolio de {nombre}</h1>
                    <Suspense fallback={<div>Loading...</div>}>
                        <div className="user-menu">
                            {imageBase64 && <img src={imageBase64} alt={`${nombre}'s profile`} className="user-photo" />}
                            <div className="user-details">
                                <h2>{nombre}</h2> {/* Muestra el título */}
                                <p><strong>{descripcion}</strong></p> {/* Muestra la descripción */}
                            </div>
                        </div>
                    </Suspense>
                </div>
            </nav>
        </div>
    );
}