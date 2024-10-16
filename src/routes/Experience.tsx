import React from 'react';
import { useOutletContext } from "react-router-dom";


interface ExperienceI {
    id: string;
    cargo: string;
    empresa: string;
    years: string;
    months: string;
    fecha_Ini: string;
    fecha_Fin: string;
    descripcion: string;
}

const Experience: React.FC = () => {
    const { experience } = useOutletContext<{ experience: ExperienceI[] }>(); 
    console.log(experience);
    return (
        <div className="experience-list">
            <h1>EXPERIENCIA LABORAL</h1>
            {experience.length > 0 ? (
            experience.map((Experience: any) => (
                <div key={Experience.id} className="experience-card">
                    <h3>{Experience.cargo} <span>@ {Experience.empresa}</span></h3>
                    <p className="dates">
                        {Experience.fecha_Ini} &nbsp; • &nbsp; {Experience.fecha_Fin}  &nbsp;
                        <span>
                            ({Experience.years} {Experience.years === 1 ? 'año' : 'años'}, 
                            {Experience.months} {Experience.months === 1 ? 'mes' : 'meses'})
                        </span>
                    </p>
                    <p>{Experience.descripcion}</p>
                </div>
            ))
        ) : (
            <p>No hay experiencia disponible.</p>
        )}
    </div>
    );
};

export default Experience;