import React from "react";
import { motion } from "framer-motion"
import Button from '@mui/joy/Button';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { styled } from '@mui/joy';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from "react";


import Calculating from "../components/Calculating.js";


const VisuallyHiddenInput = styled('input')`clip: rect(0 0 0 0); clip-path: inset(50%); height: 1px; overflow: hidden; position: absolute; bottom: 0; left: 0; white-space: nowrap; width: 1px;`;

export default function Home(data) {


  useEffect(() => {
    window.scrollTo(0, 0);
    data.setFossilInstances([]);
    data.setFugitiveInstances([]);
    data.setElectricityInstances([]);
    data.setWaterInstances([]);
    data.setWasteInstances([]);
    data.setTravelInstances([]);
    data.setOffsetInstances([]);
    data.setResult(0);
  }, []);

  const [selectedFile, setSelectedFile] = useState(null);
  const [processedFile, setProcessedFile] = useState(null);
  const [errMsg, setErrMsg]=useState(null);
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setProcessedFile(null);
  };
  const handleProcessFile = async () => {

    data.setCalculating(true);
    if (selectedFile) {
      try {
        const worker = new Worker(new URL('../components/worker.js', import.meta.url));

        worker.onmessage = (e) => {
          const { error, fossilData, fugitiveData, electricityData, waterData, wasteData, travelData, offsetData } = e.data;
          if (error) {
            data.setErr(1);
            setErrMsg(error);
            worker.terminate();
          } else {
            data.setFossilInstances([...data.fossilInstances, ...fossilData]);
            data.setFugitiveInstances([...data.fugitiveInstances, ...fugitiveData]);
            data.setElectricityInstances([...data.electricityInstances, ...electricityData]);
            data.setWaterInstances([...data.waterInstances, ...waterData]);
            data.setWasteInstances([...data.wasteInstances, ...wasteData]);
            data.setTravelInstances([...data.travelInstances, ...travelData]);
            data.setOffsetInstances([...data.offsetInstances, ...offsetData]);
            data.setErr(null);
          }
          setProcessedFile(1);
          data.setCalculating(false);
          worker.terminate();
        };
        worker.postMessage({ file: selectedFile });
        
      } catch (error) {
        data.setErr(1);
        setErrMsg(error);
        setProcessedFile(1);
        data.setCalculating(false);
      }
    } else {
      alert('Please select an Excel file first.');
    }
  };

  function showResult(id) {
    navigate("/Result", { state: id });
    window.scrollTo(0, 0);
  }


  const navigate = useNavigate();

  function transferToCalculator() {
    navigate("/Calculator");
  }

  return (
    <>
    <Navbar></Navbar>
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }} className="main">
      <Calculating calculating={data.calculating} err={data.err} errMsg={errMsg}></Calculating>
      <div className="header">
        <div className="landingText">
          <h1><b>What is your Carbon Footprint?</b></h1>
          <h3 id="homeText">Get to know your Carbon Footprint using our Calculator.</h3>
        </div>
        
      </div>
     
      
      <div className="calculateDiv">
        <h1 id="calculate"><b>Calculate your Carbon Footprint</b></h1>
      </div>
      <div className="homeOptions">
        <div className="calculateByForm">
          <h2 style={{ textAlign: 'center' }}><b><FontAwesomeIcon icon={faPencil} />&nbsp;&nbsp;Fill out a Form</b></h2>
          <Button onClick={transferToCalculator} id="getStarted">Get Started</Button>
        </div>
        
        
      </div>
    </motion.div>
    <Footer></Footer>
    </>
  );
}