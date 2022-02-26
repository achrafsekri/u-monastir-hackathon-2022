import React from 'react'
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import seance from './seance';
import Step1 from './step1';
import Step2 from './step2';
import Step3 from './Step3';
import FormControl from '@mui/material/FormControl';
import { display } from '@mui/system';
import { Hidden } from '@mui/material';
import complet from './global_state';

const theme = createTheme({
  palette: {
    primary: {
      main:'#673ab7',
    },
    secondary: {
      main: '#673ab7',
    },
  },
});

const steps = ['Nomer la seance', 'selectionner la classe','selectionner la TD et TP'];

export default function HorizontalLinearStepper(props) {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const[completed,setcompleted]=useState('');

  const isStepOptional = (step) => {
    return ;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    if(activeStep==2 && seance.td===''){
      window.alert('Sélectionner au moins un TD')
    }
    else{
    if(activeStep==1 && seance.filiere===''){
      window.alert("Sélectionner au moins une Classe");
    }
    else{
    if(seance.matiere==='')
      {(window.alert('doner un nom pour la seance'))}
      else{
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
    }}
    if(activeStep === 2)  
    {setcompleted('none');
    props.change();
  }
  }
    
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box sx={{ width: '100%'}} display={completed}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (()=>setcompleted('none')
        // <React.Fragment>
        //   <Typography sx={{ mt: 2, mb: 1 }}>
        //     All steps completed - you&apos;re finished
        //   </Typography>
        //   <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
        //     <Box sx={{ flex: '1 1 auto' }} />
        //     <Button onClick={handleReset}>Reset</Button>
        //   </Box>
        // </React.Fragment>
      ) : (
        <React.Fragment>
          {/* form here */}
          <Box sx={{ display: 'flex', width:'inherit',height:'inherit',justifyContent:'center',alignItems:'center', pt: 2 }}>
          {activeStep === 0 ? (
            <Step1/>
          ):(activeStep === 1 ? <Step2/>:<Step3/>)}
          </Box>
          {/* contenet above */}
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </Button>
            )}

            <Button type='submit' onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}
