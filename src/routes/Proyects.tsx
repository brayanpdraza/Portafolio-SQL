import { Suspense, useEffect, useState } from "react";
import {  useParams,useOutletContext } from "react-router-dom";
import fetchDataoption from  '../methods/fetchDataoption';
import Carousel from "../components/Carousel";
import TechnologiesList from "../components/TechnologiesList";

export default function Proyects() {
    const { apiUrl } = useOutletContext<{ apiUrl: string;}>();
    const { username, proyectid } = useParams();
    const idproyecto = encodeURIComponent(`${proyectid}`);
    const [data, setData] = useState<any[]>([]);
    const [proyectImages, setProyectImages] = useState<{ imagen: string; titulo: string; descripcion: string; }[]>([]); // Define el estado para imágenes
    const [technologies, setTechnologies] = useState<any[]>([]);
    const [loadingData, setLoadingData] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!apiUrl) {
            setError("La URL de la API no se ha cargado correctamente. Valide.");
            return; // Salir del efecto si apiUrl es nulo
        }
    }, [apiUrl]);
    useEffect(() => {
        if(apiUrl){
            const fetchApiData = async () => {
                try {
                    const result = await fetchDataoption(`${apiUrl}/Consulta_Proyecto_id_User`, {id:idproyecto,Usuario:username });
                    const imagesResponse = await fetchDataoption(`${apiUrl}/Consulta_Proyectos_Imagenes_id`, { id: idproyecto });
                    const technologiesResponse = await fetchDataoption(`${apiUrl}/Consulta_Proyectos_Tecnologias_id_Proyecto_INNER`, { id: idproyecto }); // Petición para obtener tecnologías

                    setData(result);
                    setProyectImages(imagesResponse.map((img: any) => ({                 
                        imagen: img.imagen,
                        titulo: img.titulo,         
                        descripcion: img.descripcion 
                    })));
                    setTechnologies(technologiesResponse); 
                } catch (err) {
                    setError(`Error 458330: ${err}`);
                } finally {
                    setLoadingData(false);
                }
            };
            fetchApiData()
        }
    }, [apiUrl,idproyecto,username]);
    
    if (loadingData) return <div>Cargando datos del Proyecto...</div>;
    if (error) return <div>{error}</div>;
    if (data.length === 0) return <div>No hay datos disponibles para este proyecto.</div>;

    return (
        <div className="proyect-container">
            <h1>DETALLES DEL PROYECTO</h1>
            <Suspense fallback={<div>Loading...</div>}>
            {data.map((proyect: any) => (
            <div key={proyect.id}> 
                <h2>{proyect.titulo}</h2>
                <p>{proyect.descripcion}</p>
            </div>
        ))}
            <br/>
            {proyectImages.length > 0 ? (
                        <Carousel images={proyectImages} />
                    ) : (
                        <div><p>No hay imágenes disponibles.</p></div>
                    )}

            {/* Mostrar las tecnologías agrupadas por categoría */}
            {technologies.length > 0 && (
                <TechnologiesList technologies={technologies} />
            )}

            </Suspense>
        </div>
    );
};
