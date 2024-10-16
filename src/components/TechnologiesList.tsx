import React from "react";
import '../css/TechnologiesList.css'; // Asegúrate de crear este archivo CSS

// Definir el tipo de la prop
interface Technology {
    id: number;
    nombre_Tecnologia: string;
    imagen: string; // Este sería un string de base64
    nombre_Cat_Tecnologia: string;
}

// Definir las props para el componente
interface TechnologiesListProps {
    technologies: Technology[];
}

// Agrupar las tecnologías por categoría y mostrar los íconos
const TechnologiesList: React.FC<TechnologiesListProps> = ({ technologies }) => {
    // Agrupar tecnologías por categoría usando reduce
    const groupedTechnologies = technologies.reduce((acc: any, technology: Technology) => {
        const category = technology.nombre_Cat_Tecnologia;
        if (!acc[category]) acc[category] = [];
        acc[category].push(technology);
        return acc;
    }, {});

    return (
        <div className="technologies-list">
            <h1>TECNOLOGÍAS</h1>
            {Object.keys(groupedTechnologies).map((category) => (
                <div key={category} className="category-group">
                    <h3>{category}</h3>
                    <div className="technologies-icons">
                        {groupedTechnologies[category].map((tech: Technology) => (
                            <div key={tech.id} className="technology-item">
                                <img
                                    src={`data:image/png;base64,${tech.imagen}`}
                                    alt={tech.nombre_Tecnologia}
                                    className="technology-icon"
                                />
                                <p>{tech.nombre_Tecnologia}</p>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TechnologiesList;