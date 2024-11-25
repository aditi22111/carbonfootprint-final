import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/Home.js";
import Calculator from "./pages/Calculator.js";
import Result from "./pages/Result.js";
import LoginForm from "./pages/Login.js";
import SignupForm from "./pages/Signup.js";
import { jwtDecode } from 'jwt-decode';

export default function App() {
  const navigate = useNavigate();
  const [calculating, setCalculating] = useState(false);
  const [err, setErr] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkAuth = () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token); // Correctly call the function using named import
        // Check if token is expired
        if (decodedToken.exp * 1000 > Date.now()) {
          setIsAuthenticated(true);  // Token is valid
        } else {
          setIsAuthenticated(false); // Token expired
          localStorage.removeItem('token');  // Clear token
        }
      } catch (error) {
        setIsAuthenticated(false);  // Token is invalid
        localStorage.removeItem('token');  // Clear token
      }
    } else {
      setIsAuthenticated(false); // No token found
    }
  };

  useEffect(() => {
    checkAuth(); // Check authentication on initial load
  }, []);

  const initialFossilInstance = {
    facilityName: "",
    year: "",
    month: "",
    fuelType: "",
    fuelUnit: "",
    fuelAmount: "",
    fuelNet: "",
  };
  const initialFugitiveInstance = {
    facilityName: "",
    year: "",
    month: "",
    applicationType: "",
    number: "",
    fugitiveNet: "",
  };
  const initialElectricityInstance = {
    facilityName: "",
    year: "",
    month: "",
    electricityType: "",
    electricitySource: "",
    electricityUnit: "",
    electricityAmount: "",
    electricityNet: "",
  };
  const initialWaterInstance = {
    facilityName: "",
    year: "",
    month: "",
    waterType: "",
    waterDischargeSite: "",
    waterUnit: "",
    waterAmount: "",
    waterNet: "",
  };
  const initialWasteInstance = {
    facilityName: "",
    year: "",
    month: "",
    wasteType: "",
    wasteTreatmentType: "",
    wasteUnit: "",
    wasteAmount: "",
    wasteNet: "",
  };
  const initialTravelInstance = {
    facilityName: "",
    year: "",
    month: "",
    travelType: "",
    airFlightLength: "",
    roadVehicleOwnership: "",
    roadVehicleType: "",
    roadFuelType: "",
    railType: "",
    travelDistance: "",
    travelNet: "",
  };
  const initialOffsetInstance = {
    facilityName: "",
    year: "",
    month: "",
    offsetTrees: "",
    offsetGrass: "",
    offsetSoil: "",
    offsetWater: "",
    offsetNet: "",
  };

  const [fossilInstances, setFossilInstances] = useState([initialFossilInstance]);
  const [fugitiveInstances, setFugitiveInstances] = useState([
    initialFugitiveInstance,
  ]);
  const [electricityInstances, setElectricityInstances] = useState([
    initialElectricityInstance,
  ]);
  const [waterInstances, setWaterInstances] = useState([initialWaterInstance]);
  const [wasteInstances, setWasteInstances] = useState([initialWasteInstance]);
  const [travelInstances, setTravelInstances] = useState([
    initialTravelInstance,
  ]);
  const [offsetInstances, setOffsetInstances] = useState([initialOffsetInstance]);
  const [result, setResult] = useState(0);

  return (
    <Routes>
      {/* Home Route */}
      <Route
        path="/home"
        element={
          <Home
            initialFossilInstance={initialFossilInstance}
            initialFugitiveInstance={initialFugitiveInstance}
            initialElectricityInstance={initialElectricityInstance}
            initialWaterInstance={initialWaterInstance}
            initialWasteInstance={initialWasteInstance}
            initialTravelInstance={initialTravelInstance}
            initialOffsetInstance={initialOffsetInstance}
            fossilInstances={fossilInstances}
            setFossilInstances={setFossilInstances}
            fugitiveInstances={fugitiveInstances}
            setFugitiveInstances={setFugitiveInstances}
            electricityInstances={electricityInstances}
            setElectricityInstances={setElectricityInstances}
            waterInstances={waterInstances}
            setWaterInstances={setWaterInstances}
            wasteInstances={wasteInstances}
            setWasteInstances={setWasteInstances}
            travelInstances={travelInstances}
            setTravelInstances={setTravelInstances}
            offsetInstances={offsetInstances}
            setOffsetInstances={setOffsetInstances}
            result={result}
            setResult={setResult}
            calculating={calculating}
            setCalculating={setCalculating}
            err={err}
            setErr={setErr}
          />
        }
      />

      {/* Calculator Route */}
      <Route
        path="/calculator"
        element={
          <Calculator
            initialFossilInstance={initialFossilInstance}
            initialFugitiveInstance={initialFugitiveInstance}
            initialElectricityInstance={initialElectricityInstance}
            initialWaterInstance={initialWaterInstance}
            initialWasteInstance={initialWasteInstance}
            initialTravelInstance={initialTravelInstance}
            initialOffsetInstance={initialOffsetInstance}
            fossilInstances={fossilInstances}
            setFossilInstances={setFossilInstances}
            fugitiveInstances={fugitiveInstances}
            setFugitiveInstances={setFugitiveInstances}
            electricityInstances={electricityInstances}
            setElectricityInstances={setElectricityInstances}
            waterInstances={waterInstances}
            setWaterInstances={setWaterInstances}
            wasteInstances={wasteInstances}
            setWasteInstances={setWasteInstances}
            travelInstances={travelInstances}
            setTravelInstances={setTravelInstances}
            offsetInstances={offsetInstances}
            setOffsetInstances={setOffsetInstances}
          />
        }
      />

      {/* Result Route */}
      <Route
        path="/result"
        element={
          <Result
            result={result}
            setResult={setResult}
            fossilInstances={fossilInstances}
            setFossilInstances={setFossilInstances}
            fugitiveInstances={fugitiveInstances}
            setFugitiveInstances={setFugitiveInstances}
            electricityInstances={electricityInstances}
            setElectricityInstances={setElectricityInstances}
            waterInstances={waterInstances}
            setWaterInstances={setWaterInstances}
            wasteInstances={wasteInstances}
            setWasteInstances={setWasteInstances}
            travelInstances={travelInstances}
            setTravelInstances={setTravelInstances}
            offsetInstances={offsetInstances}
            setOffsetInstances={setOffsetInstances}
          />
        }
      />

      {/* Login Route */}
      <Route
        path="/"
        element={
          <LoginForm
            onSuccess={() => navigate("/")} // Redirect to Home on successful login
          />
        }
      />

      {/* Signup Route */}
      <Route
        path="/signup"
        element={
          <SignupForm
            onSuccess={() => navigate("/login")} // Redirect to Login on successful signup
          />
        }
      />
    </Routes>
  );
}
