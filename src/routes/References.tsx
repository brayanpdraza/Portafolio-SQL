import React from 'react';
import { useOutletContext } from "react-router-dom";


interface Ref_Experience {
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
    const {ref_Experience} = useOutletContext<{ref_Experience: Ref_Experience[]}>(); 
    return (
        <div className="experience-list">
            <h1>REFERENCIAS LABORALES</h1>
            {ref_Experience.length > 0 ? (
            ref_Experience.map((ref_Exp: any) => (
                <div key={ref_Exp.id} className="experience-card">
                <h3>{ref_Exp.nombre} <span>@ {ref_Exp.empresa}</span></h3>
                <p className="cargo">
                <strong>Cargo:</strong> {ref_Exp.cargo}
                </p>
                <p className="correo">
                <strong>Correo:</strong> <a href={`mailto:${ref_Exp.correo}`}>{ref_Exp.correo}</a>
                </p>
                <p className="telefono">
                <strong>Telefono:</strong> {ref_Exp.telefono}
                </p>
                <p className="relacion">
                <strong>Relacion:</strong> {ref_Exp.relacion}
                </p>
                </div>
            ))
            ) : (
            <p>No hay Referencias Laborales disponibles.</p>
            )}
      </div>
    );
};

export default Experience;