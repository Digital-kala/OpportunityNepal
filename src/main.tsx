import './index.css';
import './colour.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createHashRouter,
  RouterProvider
} from 'react-router-dom';

import { Home, Opportunity, About } from './pages';

const router = createHashRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/opportunity",
    element: <Opportunity />,
  },
  {
    path: "/about",
    element: <About />,
  }
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);