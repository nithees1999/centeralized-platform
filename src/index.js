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
import MyDealsData from './Components/MyDealsData';
import DecisionRules from './Components/DecisionRules';
import MaintenanceOverAdvance from './Components/ToleranceRules/MaintenanceOverAdvance';
import GAPIsNotPermitted from './Components/ToleranceRules/GAPIsNotPermitted';
import ServiceContractOverAdvance from './Components/ToleranceRules/ServiceContractOverAdvance';
import GapAmountOverAdvance from './Components/ToleranceRules/GapAmountOverAdvance';
import OtherAmountsOverAdvance from './Components/ToleranceRules/OtherAmountsOverAdvance';
import Halo from './Components/ToleranceRules/Halo';
import TermProtection from './Components/ToleranceRules/TermProtection';
import WindshieldProtection from './Components/ToleranceRules/WindshieldProtection';
import TheftProtectionFeeExceedsLimit from './Components/ToleranceRules/TheftProtectionFeeExceedsLimit';
import EVTaxCredit from './Components/ToleranceRules/EVTaxCredit';
import ModelIsNotEligibleForSentinel from './Components/ToleranceRules/ModelIsNotEligibleForSentinel';
import TireAndWheelProtectionExceedsLimit from './Components/ToleranceRules/TireAndWheelProtectionExceedsLimit';
import DentProtection from './Components/ToleranceRules/DentProtection';
import KeyReplacementProtection from './Components/ToleranceRules/KeyReplacementProtection';
import ModelIsNotValidForTaxCredit from './Components/ToleranceRules/ModelIsNotValidForTaxCredit';
import InvalidExcessiveWearAndUse from './Components/ToleranceRules/InvalidExcessiveWearAndUse';
import ActiveAHFCAccountWithDuplicateVIN from './Components/ToleranceRules/ActiveAHFCAccountWithDuplicateVIN';
import AdvanceExceedsApproval from './Components/ToleranceRules/AdvanceExceedsApproval';
import MandatoryChecklistItemsAreNotMarkedComplete from './Components/ToleranceRules/MandatoryChecklistItemsAreNotMarkedComplete';
import ContractSalesProgramDoesNotMatchApprovedSalesProgramOrSalesProgramReturnedErrors from './Components/ToleranceRules/ContractSalesProgramDoesNotMatchApprovedSalesProgramOrSalesProgramReturnedErrors';
import CollateralAgeIsGreaterThanParameter from './Components/ToleranceRules/CollateralAgeIsGreaterThanParameter';
import MaximumMileageIsGreaterThanParameter from './Components/ToleranceRules/MaximumMileageIsGreaterThanParameter';
import VINIsNotCertified from './Components/ToleranceRules/VINIsNotCertified';
import InvalidVIN from './Components/ToleranceRules/InvalidVIN';
import OrigenateDuplicateVIN from './Components/ToleranceRules/OrigenateDuplicateVIN';
import DuplicateVIN from './Components/ToleranceRules/DuplicateVIN';
import SentinelExceedsLimit from './Components/ToleranceRules/SentinelExceedsLimit';
import CapitalizedCostReductionCashMustBeGreaterThanOrEqualToEVtaxCredit from './Components/ToleranceRules/CapitalizedCostReductionCashMustBeGreaterThanOrEqualToEVtaxCredit';
import VINValidationNotCompleted from './Components/ToleranceRules/VINValidationNotCompleted';
import ContractDateIsFutureDated from './Components/ToleranceRules/ContractDateIsFutureDated';
import ContractRateGreaterThanMaxAllowedByMoreThanParameter from './Components/ToleranceRules/ContractRateGreaterThanMaxAllowedByMoreThanParameter';
import ContractRateExceedsUsuryRate from './Components/ToleranceRules/ContractRateExceedsUsuryRate';
import DealerParticipationExceedsMaxSpread from './Components/ToleranceRules/DealerParticipationExceedsMaxSpread';

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
        path: "MyDealsData",
        element: <MyDealsData />,
      },
      {
        path: "DecisionRules",
        element: <DecisionRules />,
      },
      {
        path: "MaintenanceOverAdvance",
        element: <MaintenanceOverAdvance />,
      },
      {
        path: "GAPIsNotPermitted",
        element: <GAPIsNotPermitted />,
      },
      {
        path: "ServiceContractOverAdvance",
        element: <ServiceContractOverAdvance />,
      },
      {
        path: "GapAmountOverAdvance",
        element: <GapAmountOverAdvance />,
      },
      {
        path: "OtherAmountsOverAdvance",
        element: <OtherAmountsOverAdvance />,
      },
      {
        path: "Halo",
        element: <Halo />,
      },
      {
        path: "TermProtection",
        element: <TermProtection />,
      },
      {

        path: "WindshieldProtection",
        element: <WindshieldProtection />,
      },
      {

        path: "TheftProtectionFeeExceedsLimit",
        element: <TheftProtectionFeeExceedsLimit />,
      },
      {
        path: "EVTaxCredit",
        element: <EVTaxCredit />,
      },
      {
        path: "ModelIsNotEligibleForSentinel",
        element: <ModelIsNotEligibleForSentinel />,
      },
      {
        path: "TireAndWheelProtectionExceedsLimit",
        element: <TireAndWheelProtectionExceedsLimit />,
      },
      {
        path: "DentProtection",
        element: <DentProtection />,
      },
      {
        path: "KeyReplacementProtection",
        element: <KeyReplacementProtection />,
      },
      {
        path: "SentinelExceedsLimit",
        element: <SentinelExceedsLimit />,
      },
      {
        path: "ModelIsNotValidForTaxCredit",
        element: <ModelIsNotValidForTaxCredit />,
      },
      {
        path: "InvalidExcessiveWearAndUse",
        element: <InvalidExcessiveWearAndUse />,
      },
      {
        path: "ActiveAHFCAccountWithDuplicateVIN",
        element: <ActiveAHFCAccountWithDuplicateVIN/>,
      },
      
      {
        path: "AdvanceExceedsApproval",
        element: <AdvanceExceedsApproval/>,
      },
      {
        path: "MandatoryChecklistItemsAreNotMarkedComplete",
        element: <MandatoryChecklistItemsAreNotMarkedComplete/>,
      },
      {
        path: "ContractSalesProgramDoesNotMatchApprovedSalesProgramOrSalesProgramReturnedErrors",
        element: <ContractSalesProgramDoesNotMatchApprovedSalesProgramOrSalesProgramReturnedErrors/>,
      },
      {
        path: "CollateralAgeIsGreaterThanParameter",
        element: <CollateralAgeIsGreaterThanParameter/>,
      },
      {
        path: "MaximumMileageIsGreaterThanParameter",
        element: <MaximumMileageIsGreaterThanParameter/>,
      },
      {
        path: "VINIsNotCertified",
        element: <VINIsNotCertified/>,
      },
      {
        path: "InvalidVIN",
        element: <InvalidVIN/>,
      },
      {
        path: "OrigenateDuplicateVIN",
        element: <OrigenateDuplicateVIN/>,
      },
      {
        path: "DuplicateVIN",
        element: <DuplicateVIN/>,
      },
      {
        path: "CapitalizedCostReductionCashMustBeGreaterThanOrEqualToEVtaxCredit",
        element: <CapitalizedCostReductionCashMustBeGreaterThanOrEqualToEVtaxCredit />,
      },
      {
        path: "VINValidationNotCompleted",
        element: <VINValidationNotCompleted />,
      },
      {
        path: "ContractDateIsFutureDated",
        element: <ContractDateIsFutureDated />,
      },
      {
        path: "ContractRateGreaterThanMaxAllowedByMoreThanParameter",
        element: <ContractRateGreaterThanMaxAllowedByMoreThanParameter />,
      },
      {
        path: "ContractRateExceedsUsuryRate",
        element: <ContractRateExceedsUsuryRate />,
      },
      {
        path: "DealerParticipationExceedsMaxSpread",
        element: <DealerParticipationExceedsMaxSpread />,
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
