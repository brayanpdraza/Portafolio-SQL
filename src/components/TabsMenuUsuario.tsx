import React from 'react';

interface TabsMenuUsuarioProps {
    activeTab: string;
    onTabChange: (tab: string) => void;
}

const TabsMenuUsuario: React.FC<TabsMenuUsuarioProps> = ({ activeTab, onTabChange }) => {
    return (
        <nav className="tabs-menu">
            <button
                className={activeTab === "about" ? "tab active" : "tab"}
                onClick={() => onTabChange("about")}
            >
                About
            </button>
            <button
                className={activeTab === "proyects" ? "tab active" : "tab"}
                onClick={() => onTabChange("proyects")}
            >
                Proyectos
            </button>
            <button
                className={activeTab === "experience" ? "tab active" : "tab"}
                onClick={() => onTabChange("experience")}
            >
                Experiencia
            </button>
            <button
                className={activeTab === "references" ? "tab active" : "tab"}
                onClick={() => onTabChange("references")}
            >
                Referencias Laborales
            </button>
        </nav>
    );
};

export default TabsMenuUsuario;