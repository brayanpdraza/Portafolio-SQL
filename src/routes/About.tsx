import React from 'react';
import { useOutletContext } from "react-router-dom";
import TechnologiesList from "../components/TechnologiesList"; // Importar el nuevo componente

interface User {
    carrera: string;
    profesion: string;
    correo: string;
    telefono: string;
    ciudad: string;
    about: string;
}

interface UserTechnologies {
    id: number;
    imagen: string; // Este sería un string de base64
    nombre_Cat_Tecnologia: string;
    nombre_Tecnologia: string;
    descripcion_Cat_Tecnologia: string;

}

const About: React.FC = () => {
    const context = useOutletContext<{ user: User; userTechnologies: UserTechnologies[] }>();
    const { user, userTechnologies } = context; 

    return (
        <div className="about-container">
            <h1 >ABOUT ME</h1>

            <div className="about-info">
                <div className="about-details">
                    <h3>DATOS PERSONALES</h3>
                    <p><strong>Carrera:</strong> {user.carrera}</p>
                    <p><strong>Perfil:</strong> {user.profesion}</p>
                    <p><strong>Correo:</strong> {user.correo}</p>
                    <p><strong>Teléfono:</strong> {user.telefono}</p>
                    <p><strong>Ciudad:</strong> {user.ciudad}</p>
                </div>

                <div className="about-description">
                    <h3>ACERCA DE MÍ</h3>
                    <p>
                        {user.about.split('\n').map((line, index) => (
                            <React.Fragment key={index}>
                                {line.replace(/\\n/g, '')}
                            <br />
                            <br />
                            </React.Fragment>
                        ))}
                    </p>
                </div>
            </div>
            {userTechnologies.length > 0 && (
                <TechnologiesList technologies={userTechnologies} />
            )}
        </div>
    );
};

export default About;