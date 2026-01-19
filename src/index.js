import ReactDOM from 'react-dom/client';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "../node_modules/bootstrap/dist/js/bootstrap.min.js"
import App from './App.js';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Ganeshji from './mantracategory/Ganeshji.js';
import Shivji from './mantracategory/Shivji.js';
import Vishnuji from './mantracategory/Vishnuji.js';
import GayatriMantra from './mantracategory/GayatriMantra.js';
import Mahamritunjay from './mantracategory/Mahamritunjay.js';
import Hanumanji from './mantracategory/Hanumanji.js';


  let myRoutes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/ganeshji", element: <Ganeshji /> },
      { path: "/shivji", element: <Shivji /> },
      {path:"/vishnuji", element:<Vishnuji/>},
      {path:"/gayatrimantra",element:<GayatriMantra/>},
      {path:"/mahamritunjayjap",element:<Mahamritunjay/>},
      {path:"/hanumanji",element:<Hanumanji/>}
    ]
  },
])
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={myRoutes}/>);
