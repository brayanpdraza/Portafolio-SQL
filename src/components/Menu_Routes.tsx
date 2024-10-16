import { useEffect, Suspense,useState } from 'react';
import {useLocation, Link} from 'react-router-dom';
import fetchDataoption from  '../methods/fetchDataoption';

export default function Menu_Routes(){
    const location = useLocation();
    const [data, setData] = useState<any[]>([]);
    const [loadingData, setLoadingData] = useState(true);
    const [loadingConfig, setLoadingConfig] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [APIUrl, setAPIUrl] = useState<string | null>(null);
    useEffect(() => {
        const fetchConfig = async () => {
            try {

                const response = await fetch('/config.json');
                // Verifica si la respuesta es exitosa
                if (!response.ok) {
                    throw new Error('Error en la respuesta de la red');
                }
        
                const config = await response.json();
                // Verifica que la variable global exista y no esté vacía
                if (!config.apiUrl) {
                    throw new Error('La variable global URL está vacía o no existe');
                }    
                setAPIUrl(config.apiUrl);
            } catch (error) {
                setError(`Error 125125: ${error}`);
            } finally {
                setLoadingConfig(false); // Configuración ha terminado de cargar
            }
        };
    
        fetchConfig();
    }, [location.pathname]); // Solo se ejecuta una vez al montar el componente

    useEffect(() => {
        if(APIUrl){
            const fetchApiData = async () => {
                try {
                    const result = await fetchDataoption(`${APIUrl}/Consulta_Usuarios_Todos`);
                    setData(result);
                } catch (err) {
                    setError(`Error 458330: ${err}`);
                } finally {
                    setLoadingData(false);
                }
            };
            fetchApiData()
        }
    }, [APIUrl]);

    if (loadingConfig) return <div>Cargando configuración...</div>;
    if (loadingData) return <div>Cargando datos de los Usuarios...</div>;
    if (error) return <div>{error}</div>;
    if (data.length === 0) return <div>No Usuarios disponibles.</div>;
    return (
        <div className='app'>
        <h1>USUARIOS SISTEMA</h1>
        <Suspense fallback={<div>Loading...</div>}>
            <ul className="user-list">
                {data?.map((user: any) => (
                    <li key={user.id} className="user-card">
                        <Link to={`/Usuario/${user.nombre}`}>
                            <img src={`data:image/png;base64,${user.foto}`} alt={user.nombre} className="user-image" />
                            <div className="user-info">
                                <h2>{user.nombre}</h2>
                            </div>
                        </Link>
                        <p className="user-career">{user.carrera} / {user.profesion}</p>
                    </li>
                ))}
            </ul>
        </Suspense>
    </div>
    );
}