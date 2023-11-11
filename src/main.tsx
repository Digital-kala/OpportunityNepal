import './index.css';
import './colour.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createHashRouter,
  RouterProvider
} from 'react-router-dom';

import { Home, OpportunitySearch, Opportunity, About } from './pages';

const router = createHashRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/opportunity",
    element: <OpportunitySearch />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/opportunity/:id",
    element: <Opportunity />,
  }
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);