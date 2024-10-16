import React from 'react';

interface HomeButtonProps {
    onClick: () => void;
}

const HomeButton: React.FC<HomeButtonProps> = ({ onClick }) => {
    return (
        <button className="home-button" onClick={onClick}>
            Inicio
        </button>
    );
};

export default HomeButton;