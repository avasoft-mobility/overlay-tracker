import React, { FC, useEffect, useState } from 'react';
import SampleStores from '../models/Stores/Events';
import HttpResult from '../helpers/http/HttpResult';
import HttpStatus from '../models/utils/HttpResult';
import SampleServices from '../services/SampleService';
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

const HomePage: FC = () => {
  const steps: Events[] = [
    {
      "session_guid": "sess-74512698asa5",
      "event_name": "Entry",
      "event_timestamp": "2/2/2022 12:13:39",
      "pay_load": "clicked",
      "scrapped_data": "False"
  },
  {
    "session_guid": "sess-74512698asa5",
    "event_name": "Processing",
    "event_timestamp": "2/2/2022 12:13:39",
    "pay_load": "clickeddddddddddddddddddddddddddddddddddddddddddddddddd",
    "scrapped_data": "False"
},
{
  "session_guid": "sess-74512698asa5",
  "event_name": "Entry",
  "event_timestamp": "2/2/2022 12:13:39",
  "pay_load": "clicked",
  "scrapped_data": "False"
},
{
  "session_guid": "sess-74512698asa5",
  "event_name": "Processing",
  "event_timestamp": "2/2/2022 12:13:39",
  "pay_load": "clicked",
  "scrapped_data": "False"
},
{
  "session_guid": "sess-74512698asa5",
  "event_name": "Checking",
  "event_timestamp": "2/2/2022 12:13:39",
  "pay_load": "clicked",
  "scrapped_data": "False"
},
{
  "session_guid": "sess-74512698asa5",
  "event_name": "Exit",
  "event_timestamp": "2/2/2022 12:13:39",
  "pay_load": "clicked",
  "scrapped_data": "False"
},
  ];
  let induvidualData: any[] = [];
  let Oldvalue: number = 0;
  const [stepUI, setStepUI] = useState<Events[]>(steps);
  const [activeStep, setActiveStep] = useState<number[]>([]);
  const [splittedEvents, setsplittedEvents] = useState([]);
  let count = 0;

  const EventTypeReturn = (event: string) => {
    var eetype: string = EventTypeEnum[event];
    var etype: EventTypeEnum = EventTypeEnum[eetype];
    var enumValue = Object.keys(EventTypeEnum).map(key => EventTypeEnum[etype]);
    if ((Number)(enumValue[0]) > Oldvalue) {
      Oldvalue = (Number)(enumValue[0]);
      return true;
    }
    count++;
    Oldvalue = (Number)(enumValue[0]);
    return false;
  }

  useEffect(() => {
    splitting();
  }, []);

  const splitting = () => {

    let splittedData = [];
    steps.map((step, index) => {
      if (EventTypeReturn(step.event_name)) {
        if (splittedData.length != 0) {
          if (induvidualData.length != 0)
            induvidualData.push(step);
          if (steps.length - 1 == index) {
            splittedData.push(induvidualData);
            induvidualData = [];
          }
        } else {
          induvidualData.push(step)
        }
      } else {
        splittedData.push(induvidualData);
        induvidualData = [];
        induvidualData.push(step);
        if (steps.length == index) {
          splittedData.push(induvidualData);
          induvidualData = [];
        }
      }

    });

    let activeStepListIndex = [];
    for (let i = 0; i < splittedData.length; i++) {
      activeStepListIndex.push(steps.length+1);
    }
    setActiveStep(activeStepListIndex);
    setsplittedEvents(splittedData);
  }

  const handleNext = () => {
    // setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleClick = (indices: number, index: number) => {
    const activeList = [...activeStep];
    activeList[indices] = index;
    setActiveStep(activeList);
  }

  const handleBack = () => {
    // setActiveStep((prevActiveStep) => prevActiveStep - 1);
  }

  return (
    <Box className='container' sx={{ maxWidth: 400, marginLeft: 10, marginTop: 5 }}>

        {splittedEvents.map((flow, indices) => {
          return <Stepper className='parent' activeStep={activeStep[indices]} orientation={'vertical'} key={indices}>
            {flow.map((step, index) => (
              <Step key={index}>
                <StepLabel className='child' onClick={() => { handleClick(indices, index) }}>
                  <div>
                    {step.event_name}
                    <p style={{
                      margin: 0,
                      fontSize: 12
                    }}>abc</p>
                  </div>
                </StepLabel>
                <StepContent >
                  <Typography className='childcontent'>{step.pay_load}</Typography>
                  <Box sx={{ mb: 2 }}>
                    <div>
                      <Button
                        variant="contained"
                        onClick={handleNext}
                        sx={{ mt: 1, mr: 1 }}
                      >
                        {index === stepUI.length - 1 ? 'Finish' : 'Next'}
                      </Button>
                      <Button
                        disabled={index === 0}
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
        })}


    </Box>

  )
}

export default HomePage
