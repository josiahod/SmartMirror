import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './pages/App';
import Code from './pages/Code';
import Leaderboard from './pages/Leaderboard';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
    {
    path: "/",
    element: <App/>
  }, 
  {
    path: "/Code",
    element: <Code/>
  },
  {
    path: "/Leaderboard",
    element: <Leaderboard/>
  }
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
      <RouterProvider router={router} />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
