import React, { FC, useEffect, useState } from 'react';
import SampleStores from '../models/Stores/Events';
import HttpResult from '../helpers/http/HttpResult';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import './HomePage.css'
import Events from '../models/Stores/Events';
import EventTypeEnum from '../models/utils/EventTypeEnum';
import LogTracker from '../services/LogTracker';
import HttpStatus from '../models/utils/HttpStatus';

const HomePage: FC = () => {
  let induvidualData: any[] = [];
  let Oldvalue: number = 0;
  const [stepUI, setStepUI] = useState<Events[]>([]);
  const [activeStep, setActiveStep] = useState<number[]>([]);
  const [splittedEvents, setsplittedEvents] = useState([]);
      // eslint-disable-next-line no-restricted-globals
  const sessionGuid = location.href.split('tracker/')[1];
  const EventTypeReturn = (event: string) => {
    var eetype: number = EventTypeEnum[event];
    if (eetype >= Oldvalue) {
      Oldvalue = eetype;
      return true;
    }
    Oldvalue = eetype;
    return false;
  }

  useEffect(() => {
    LogTracker.getAllEvents(sessionGuid)
      .then((response: HttpResult<Events[]>) => {
        if (response.status === HttpStatus.Success) {
          // access the data through `response.data`
          setStepUI(response.data);
          splitting(response.data);
        }
      })
      .catch((error) => {
        console.log((error as Error).message);
      });

  }, []);

  const splitting = (data) => {
    let splittedData = [];
    data.map((step, index) => {
      if (EventTypeReturn(step.event_name)) {
        if (splittedData.length != 0) {
          if (induvidualData.length != 0)
            induvidualData.push(step);
          if (data.length - 1 == index) {
            splittedData.push(induvidualData);
            induvidualData = [];
          }
        } else {
          induvidualData.push(step);
          if (data.length - 1 == index) {
            splittedData.push(induvidualData);
            induvidualData = [];
          }
        }
      } else {

        splittedData.push(induvidualData);
        induvidualData = [];
        induvidualData.push(step);
        if (data.length - 1 == index) {
          splittedData.push(induvidualData);
          induvidualData = [];
        }
      }

    });

    let activeStepListIndex = [];
    for (let i = 0; i < splittedData.length; i++) {
      activeStepListIndex.push(data.length+1);
    }
    setActiveStep(activeStepListIndex);
    setsplittedEvents(splittedData);
    console.log(splittedData)
  }

  const handleNext = () => {
    // setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleClick = (indices: number, index: number) => {
    const activeList = [...activeStep];
    if(index == activeList[indices]){
      activeList[indices] = stepUI.length+1
      setActiveStep(activeList);
    }
    else{
      activeList[indices] = index;
      setActiveStep(activeList);
    }
  }

  const handleBack = () => {
    // setActiveStep((prevActiveStep) => prevActiveStep - 1);
  }

  return (
    <Box className='container' sx={{ marginLeft: 10, marginTop: 5 }}>

        {splittedEvents.map((flow, indices) => {
          return (<div className='parent'>
            <Stepper activeStep={activeStep[indices]} orientation={'vertical'} key={indices}>
            {flow.map((step, index) => (
              <Step key={index}>
                <StepLabel className='child' onClick={() => { handleClick(indices, index) }}>
                  <div>
                    {step.event_name}
                    <p style={{
                      margin: 0,
                      fontSize: 12
                    }}>{step.event_timestamp}</p>
                  </div>
                </StepLabel>
                <StepContent >
                  <Typography className='childcontent'>{step.pay_load}</Typography>
                  <Typography className='childcontent'>{step.scrapped_data}</Typography>
                  <Box sx={{ mb: 2 }}>
                    <div>
                      <Button
                        variant="contained"
                        size="small"
                        onClick={handleNext}
                        sx={{ mt: 1, mr: 1 }}
                      >
                        {index === stepUI.length - 1 ? 'Finish' : 'Next'}
                      </Button>
                      <Button
                        disabled={index === 0}
                        size="small"
                        onClick={handleBack}
                        sx={{ mt: 1, mr: 1 }}
                      >
                        Back
                      </Button>
                    </div>
                  </Box>
                </StepContent>
              </Step>
            ))}
          </Stepper>
          </div>)

        })}


    </Box>

  )
}

export default HomePage
