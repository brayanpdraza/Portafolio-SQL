import { Suspense, useEffect, useState } from "react";
import { useLocation,Outlet, useParams,useNavigate  } from "react-router-dom";
import fetchDataoption from  '../methods/fetchDataoption';
import {Link} from 'react-router-dom';
import UserMenu from '../components/User_Menu';
import TabsMenuUsuario from "../components/TabsMenuUsuario"; 
import HomeButton from '../components/HomeButton'; 


export default function Usuario() {
    const navigate = useNavigate();
    const location = useLocation();
    const params = useParams();
    const nombreUsuario = encodeURIComponent(`${params.username}`);
    const [activeTab, setActiveTab] = useState("about");
    const [data, setData] = useState<any[]>([]);
    const [userAbout, setUserAbout] = useState<{ carrera: string; profesion: string;correo: string;telefono: string; ciudad: string; about: string;} | null>(null); 
    const [userMenu, setUserMenu] = useState<{ foto: string; nombre: string; descripcion: string } | null>(null);
    const [userTechnologies , setTechnologies] = useState<any[]>([]);
    const [expLaboral , setExp_Laboral] = useState<any[]>([]);
    const [refExp_Laboral , setRefExp_Laboral] = useState<any[]>([]);
    const [proyects, setProyects] = useState<any[]>([]);
    const [loadingConfig, setLoadingConfig] = useState(true);
    const [loadingData, setLoadingData] = useState(true);
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
        // Solo ejecutar cuando APIUrl esté disponible
        if (APIUrl) {
            
            const fetchApiData = async () => {
                try {
                    const result = await fetchDataoption(`${APIUrl}/Consulta_Usuarios_Nombre`, { Usuario: nombreUsuario });
                    const proyectos = await fetchDataoption(`${APIUrl}/Consulta_Proyecto_Usuario`, { Usuario: nombreUsuario });
                    const technologiesResponse = await fetchDataoption(`${APIUrl}/Consulta_Usuarios_Tecnologias_Nombre_Usuario_INNER`, { Usuario: nombreUsuario });
                    const expLaboralResponse = await fetchDataoption(`${APIUrl}/Consulta_Usuarios_Exp_Laboral_Nombre_Usuario_INNER`, { Usuario: nombreUsuario });
                    const refExpLaboralResponse = await fetchDataoption(`${APIUrl}/Consulta_Usuarios_Ref_Exp_Laboral_Nombre_Usuario_INNER`, { Usuario: nombreUsuario });
    
                    setData(result);
                    if (result.length > 0) {
                        const user = result[0]; // Toma el primer usuario si hay resultados
                        setUserAbout({
                            carrera: user.carrera,
                            profesion: user.profesion,
                            correo: user.correo,
                            telefono: user.telefono,
                            ciudad: user.ciudad,
                            about: user.about,
                        });
    
                        setUserMenu({
                            foto: user.foto,
                            nombre: user.nombre,
                            descripcion: user.descripcion,
                        });
                    }
                    setProyects(proyectos);
                    setTechnologies(technologiesResponse);
                    setExp_Laboral(expLaboralResponse);
                    setRefExp_Laboral(refExpLaboralResponse);
                } catch (err) {
                    setError(`Error 812694: ${err}`);
                } finally {
                    setLoadingData(false); // Datos han terminado de cargar
                }
            };
    
            fetchApiData();
        }
    }, [APIUrl, nombreUsuario]);

    useEffect(() => {
        const pathSegments = location.pathname.split("/");
        const lastSegment = pathSegments.pop(); // Obtén el último segmento
    
        if (lastSegment === "proyects") {
            // Si estamos en /Usuario/{nombreUsuario}/proyects o /Usuario/{nombreUsuario}/proyects/{id}, el tab debe ser "proyects"
            if (activeTab !== "proyects") {
                setActiveTab("proyects");
            }
        } else if (!isNaN(Number(lastSegment))) {
            // Si el último segmento es un número, estamos viendo un proyecto específico, pero el tab sigue siendo "proyects"
            if (activeTab !== "proyects") {
                setActiveTab("proyects");
            }
        } else if (lastSegment === nombreUsuario) {
            // Si el último segmento es el nombre de usuario, mostramos los proyects
            if (activeTab !== "proyects") {
                setActiveTab("proyects");
            }
        } else if (lastSegment && lastSegment !== activeTab) {
            // Para cualquier otro segmento de ruta
            setActiveTab(lastSegment);
        }
    }, [location.pathname, activeTab, nombreUsuario]);

    if (loadingConfig) return <div>Cargando configuración...</div>;
    if (loadingData) return <div>Cargando datos del usuario...</div>;
    if (error) return <div>{error}</div>;
    if (data.length === 0) return <div>No hay datos disponibles para este usuario.</div>;

    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
        if (tab === "proyects") {
            navigate(`/Usuario/${nombreUsuario}`); // Cambia la URL
        } else {
            navigate(`/Usuario/${nombreUsuario}/${tab}`); // Cambia la URL
        }
    };

    const handleHomeClick = () => {
        // Lógica para manejar el clic en "Inicio"
        navigate(`/`); // Cambia la URL
        // Aquí puedes implementar la navegación correspondiente
    };

    return (
        <div>
            
            <div className="header"> {/* Crea un contenedor para el botón y el menú */}
                <HomeButton onClick={handleHomeClick} />
                <div className="tabs-container"> {/* Contenedor para las pestañas */}
                    <TabsMenuUsuario activeTab={activeTab} onTabChange={handleTabChange} />
                </div>
            </div>

            <UserMenu Usuario={userMenu}/>

            <div className="mainContainer">

                {activeTab === "about" && (
                    <div className="content-wrapper"> {/* Flex container para sidebar y contenido */}
                        <div className="content">
                            <Outlet context={{ user: userAbout, userTechnologies: userTechnologies }} />
                        </div>
                   </div>
                )}

                {activeTab === "proyects" && (
                        <div className="content-wrapper"> {/* Flex container para sidebar y contenido */}
                             <Suspense fallback={<div>Loading...</div>}>
                                 <div className="sidebar">
                                     {proyects.map((proyect: any) => (
                                        <div key={proyect.id} className="sidebar-item">
                                           <Link 
                                               to={`/Usuario/${nombreUsuario}/proyects/${proyect.id}`} 
                                               className={location.pathname === `/Usuario/${nombreUsuario}/proyects/${proyect.id}` ? 'active' : ''}
                                           >
                                               <div className="sidebar-item-content">
                                                   <img 
                                                       src={`data:image/jpeg;base64,${proyect.imagen_Portada}`} 
                                                       alt={proyect.nombre} 
                                                       className="sidebar-image" 
                                                   />
                                                   <span className="sidebar-title">{proyect.titulo}</span>
                                               </div>
                                           </Link>
                                       </div>
                                     ))}
                                 </div>      
                                 <div className="content">
                                     <Outlet context={{ apiUrl:APIUrl}} />
                                 </div>  
                             </Suspense>     
                        </div>                              
                )}

                {activeTab === "experience" && (
                   <div className="content-wrapper"> {/* Flex container para sidebar y contenido */}
                        <div className="content">
                            <Outlet context={{ experience: expLaboral}} />
                        </div>
                    </div>
                )}  
                {activeTab === "references" && (
                    <div className="content-wrapper"> {/* Flex container para sidebar y contenido */}
                        <div className="content">
                         <Outlet context={{ ref_Experience: refExp_Laboral}} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}