import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from './App';
import Home from './Components/Home';
import VinGenerator from './Components/VinGenerator';
import Dealer from './Components/Dealer';
import Origenate from './Components/Origenate';
import AutoApproval from './Components/AutoApproval';
import CustomerProfile from './Components/CustomerProfile';
import Fcl from './Components/Fcl';
import Residual from './Components/Residual';
import Checklist from './Components/Checklist';
import DecisionRules from './Components/DecisionRules';
import MaintenanceOverAdvance from './Components/ToleranceRules/MaintenanceOverAdvance';
import GAPIsNotPermitted from './Components/ToleranceRules/GAPIsNotPermitted';
import ServiceContractOverAdvance from './Components/ToleranceRules/ServiceContractOverAdvance';
import GapAmountOverAdvance from './Components/ToleranceRules/GapAmountOverAdvance';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "VinGenerator",
        element: <VinGenerator />,
      },
      {
        path: "Dealer",
        element: <Dealer />,
      },
      {
        path: "Origenate",
        element: <Origenate />,
      },
      {
        path: "AutoApproval",
        element: <AutoApproval />,
      },
      {
        path: "CustomerProfile",
        element: <CustomerProfile />,
      },
      {
        path: "Fcl",
        element: <Fcl />,
      },
      {
        path: "Residual",
        element: <Residual />,
      },
      {
        path: "Checklist",
        element: <Checklist />,
      },
      {
        path: "DecisionRules",
        element: <DecisionRules />,
      },
      {
        path: "MaintenanceOverAdvance",
        element: <MaintenanceOverAdvance/>,
      },
      {
        path: "GAPIsNotPermitted",
        element: <GAPIsNotPermitted/>,
      },
      {
        path: "ServiceContractOverAdvance",
        element: <ServiceContractOverAdvance/>,
      },
      {
        path: "GapAmountOverAdvance",
        element: <GapAmountOverAdvance/>,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
