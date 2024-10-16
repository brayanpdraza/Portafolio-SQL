
import { createBrowserRouter } from 'react-router-dom';
import Home from '../routes/Home';
import Error from '../routes/Error';
import Usuario from '../routes/Usuario';
import Proyects from '../routes/Proyects';
import About from '../routes/About';
import Experience from '../routes/Experience';
import References from '../routes/References';

const router = createBrowserRouter([
    {
      path: '/',
      element: <Home/>,
      errorElement: <Error/>
    },
    {
      path: '/Usuario/:username',
      element: <Usuario/>,
      children: [
        {
            path:"proyects/:proyectid",
            element:<Proyects/>,
        },  
        {
          path: 'about', // Ruta para About
          element: <About />,
        },
        {
          path: 'experience', // Ruta para Experience
          element: <Experience />,
        },  {
          path: 'references', // Ruta para Experience
          element: <References />,
        },
      ],
    },
  
  ]);
  


  export default router