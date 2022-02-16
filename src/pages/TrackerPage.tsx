import React, { FC, useEffect, useState } from 'react';
import SampleStores from '../models/Stores/Events';
import HttpResult from '../helpers/http/HttpResult';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import logo from '../assets/AcimaLogo.png';

import { Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import StepContent from '@mui/material/StepContent';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import './TrackerPage.css';
import Events from '../models/Stores/Events';
import EventTypeEnum from '../models/utils/EventTypeEnum';
import LogTracker from '../services/LogTracking';
import HttpStatus from '../models/utils/HttpStatus';
import Buttons from '../Components/Buttons';
import { useNavigate } from 'react-router-dom';
import { Container } from '@mui/material';
import { LocalFireDepartmentTwoTone } from '@mui/icons-material';
import SearchPage from './SearhPage';
import OverlayTrackingModel from '../models/Stores/OverlayTrackingModel';
import { margin } from '@mui/system';

const TrackerPage: FC = () => {
  let induvidualData: any[] = [];
  let Oldvalue: number = 0;
  const [stepUI, setStepUI] = useState<Events[]>([]);
  const [activeStep, setActiveStep] = useState<number[]>([]);
  const [splittedEvents, setsplittedEvents] = useState([]);
  // eslint-disable-next-line no-restricted-globals
  const sessionGuid = location.href.split('tracker/')[1];
  console.log(sessionGuid);
  const EventTypeReturn = (event: string) => {
    var eetype: number = EventTypeEnum[event];
    if (eetype >= Oldvalue) {
      Oldvalue = eetype;
      return true;
    }
    Oldvalue = eetype;
    return false;
  };

  const [open, setOpen] = React.useState(false);
  const [loader, setLoader] = React.useState(true);
  const [scroll, setScroll] = React.useState<DialogProps['scroll']>('paper');
  const [searchContent, setSearchContent] = useState<OverlayTrackingModel[]>([]);

  const handleClickOpen = (scrollType: DialogProps['scroll']) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClosePop = () => {
    setOpen(false);
  };
  useEffect(() => {
    LogTracker.getAllEvents(sessionGuid)
      .then((response: HttpResult<Events[]>) => {
        if (response.status === HttpStatus.Success) {
          // access the data through `response.data`
          setStepUI(response.data);
          splitting(response.data);
          console.log(response.data);
        }
      })
      .catch((error) => {
        console.log((error as Error).message);
      });
    LogTracker.getAllUserTrackingLogs(sessionGuid)
      .then((response: HttpResult<OverlayTrackingModel[]>) => {
        if (response.status === HttpStatus.Success) {
          // access the data through `response.data`
          setSearchContent(response.data);
          console.log(searchContent);
          setLoader(false);
        }
      })
      .catch((error) => {
        // Used console log for demonstration purpose. Do not use console.log when you're
        console.log((error as Error).message);
      });
  }, []);

  const splitting = (data) => {
    try {
      let splittedData = [];
      data.map((step, index) => {
        if (EventTypeReturn(step.event_name)) {
          if (splittedData.length != 0) {
            if (induvidualData.length != 0) induvidualData.push(step);
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
        activeStepListIndex.push(data.length + 1);
      }
      setActiveStep(activeStepListIndex);
      setsplittedEvents(splittedData);
      console.log(splittedData);
    } catch (ex) {
      console.log(ex);
    }
  };

  const handleNext = (indices: number, index: number) => {
    // setActiveStep((prevActiveStep) => prevActiveStep + 1);
    const activeList = [...activeStep];
    activeList[indices] = index + 1;
    setActiveStep(activeList);
  };
  const handleBack = (indices: number, index: number) => {
    // setActiveStep((prevActiveStep) => prevActiveStep + 1);
    const activeList = [...activeStep];
    activeList[indices] = index - 1;
    setActiveStep(activeList);
  };

  const handleClick = (indices: number, index: number) => {
    const activeList = [...activeStep];
    if (index == activeList[indices]) {
      activeList[indices] = stepUI.length + 1;
      setActiveStep(activeList);
    } else {
      if (activeList[indices] != 0) {
        for (let i = 0; i < activeList.length; i++) {
          if (i !== indices) {
            activeList[i] = stepUI.length + 1;
            setActiveStep(activeList);
          }
        }
      }
      activeList[indices] = index;
      setActiveStep(activeList);
    }
  };
  const navigate = useNavigate();
  const BackClicked = () => {
    navigate(`/`);
  };
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClickPop = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  // const PrettyPrintJson = ({data}) => {
  //   // (destructured) data could be a prop for example
  //   return ();
  //   <div><pre>{ JSON.stringify(step.scrapped_data, null, 2) }</pre></div>
  // }

  return (
    <Stack style={{marginLeft: '40px', marginRight: '40px'}}>
      {!loader ? (
        <>
           

          <div>

            <div style={{float: 'left', marginBottom:'10px'}}>
              <img
              src={logo}
              alt="Logo"
              height={30}
              text-align="center"
              style={{
                marginTop: '100px',
              }}
            />
          <Typography
            variant="h2"
            className="HeaderText"
            fontFamily="'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif"
            fontWeight="bold"
            component="h2"
            color="#005b96"
          >
            {`#${searchContent[0].lease_id}`}
          </Typography>

            <Typography
              variant="h6"
              className="HeaderText"
              fontFamily="'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif"
              fontWeight="bold"
              align="center"
              alignItems="center"
              component="h2"
              color="#005b96"
              style={{ float: 'left' }}
            >
              {`${stepUI[0].pay_load}`}
            </Typography>

            </div>

          

            <div style={{ marginBottom: '30px', float: 'right', marginTop: '150px' }}>
              <Buttons text="Back" onClick={() => BackClicked()}></Buttons>
            </div>
          </div>

          <TableContainer sx={{ marginTop: 2, marginBottom: 10 }} component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="caption table">
              {/* Table Header */}
              <TableHead
                style={{
                  backgroundColor: '#005b96',
                }}
              >
                <TableRow>
                  <TableCell
                    style={{
                      color: '#ffffff',
                      textAlign: 'left',
                      fontWeight: 'bold',
                    }}
                  >
                    Customer GUID
                  </TableCell>
                  <TableCell
                    style={{
                      color: '#ffffff',
                      textAlign: 'center',
                      fontWeight: 'bold',
                    }}
                    align="right"
                  >
                    Lease ID
                  </TableCell>
                  <TableCell
                    style={{
                      color: '#ffffff',
                      textAlign: 'center',
                      fontWeight: 'bold',
                    }}
                    align="right"
                  >
                    Lease Guid
                  </TableCell>
                  <TableCell
                    style={{
                      color: '#ffffff',
                      textAlign: 'center',
                      fontWeight: 'bold',
                    }}
                    align="right"
                  >
                    Location GUID
                  </TableCell>
                  <TableCell
                    style={{
                      color: '#ffffff',
                      textAlign: 'center',
                      fontWeight: 'bold',
                    }}
                    align="right"
                  >
                    Session GUID
                  </TableCell>
                  <TableCell
                    style={{
                      color: '#ffffff',
                      textAlign: 'center',
                      fontWeight: 'bold',
                    }}
                    align="right"
                  >
                    Session Start Time
                  </TableCell>
                  <TableCell
                    style={{
                      color: '#ffffff',
                      textAlign: 'center',
                      fontWeight: 'bold',
                    }}
                    align="right"
                  >
                    Session End Time
                  </TableCell>
                </TableRow>
              </TableHead>

              {/* Table Body
            Each Row in a table is a clickable row. So that the data of the clicked
            row can be passed to the next page
        */}
              <TableBody role="button" tabIndex={0}>
                {/* Iterating throught each element in the response object */}
                {searchContent.map((row: OverlayTrackingModel) => (
                  <TableRow
                    hover
                    style={{
                      cursor: 'pointer',
                    }}
                    key={row.session_guid}
                  >
                    <TableCell component="th" scope="row">
                      {row.customer_guid}
                    </TableCell>

                    <TableCell align="center">{row.lease_id}</TableCell>

                    <TableCell align="center">{row.lease_guid}</TableCell>

                    <TableCell align="center">{row.location_guid}</TableCell>

                    <TableCell align="center">{row.session_guid}</TableCell>

                    <TableCell align="right">
                      {new Date(row.overlay_start_time).toLocaleString()}
                    </TableCell>

                    <TableCell align="right">
                      {row.overlay_end_time == null
                        ? 'InComplete Session'
                        : new Date(row.overlay_start_time).toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box className="container" sx={{ marginLeft: 10, marginTop: 5, marginBottom: 5 }}>
            {splittedEvents.map((flow, indices) => {
              return (
                <div className="parent">
                  <Stepper activeStep={activeStep[indices]} orientation={'vertical'} key={indices}>
                    {flow.map((step, index) => (
                      <Step key={index}>
                        <StepLabel
                          className="child"
                          onClick={() => {
                            handleClick(indices, index);
                          }}
                        >
                          <div>
                            {step.event_name}
                            <p
                              style={{
                                margin: 0,
                                fontSize: 12,
                              }}
                            >
                              {step.event_timestamp}
                            </p>
                          </div>
                        </StepLabel>
                        <StepContent>
                          <Typography className="childcontent">{step.pay_load}</Typography>
                          {step.scrapped_data != null ? (
                            <Button onClick={handleClickOpen('paper')}>Details</Button>
                          ) : (
                            React.Fragment
                          )}
                          <Dialog
                            open={open}
                            onClose={handleClosePop}
                            scroll={scroll}
                            aria-labelledby="scroll-dialog-title"
                            aria-describedby="scroll-dialog-description"
                          >
                            <DialogTitle id="scroll-dialog-title">Scrapped Data</DialogTitle>
                            <DialogContent dividers={scroll === 'paper'}>
                              <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
                                {
                                  <div>
                                    <pre>
                                      {JSON.stringify(JSON.parse(step.scrapped_data), null, 2)
                                        .replaceAll(']', '')
                                        .replace('[', '')}
                                    </pre>
                                  </div>
                                }
                              </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                              <Button onClick={handleClosePop}>Cancel</Button>
                            </DialogActions>
                          </Dialog>
                          <Box sx={{ mb: 2 }}>
                            <div>
                              <Button
                                variant="contained"
                                size="small"
                                onClick={() => {
                                  handleNext(indices, index);
                                }}
                                sx={{ mt: 1, mr: 1 }}
                              >
                                {index === stepUI.length - 1 ? 'Finish' : 'Next'}
                              </Button>
                              <Button
                                disabled={index === 0}
                                size="small"
                                onClick={() => {
                                  handleBack(indices, index);
                                }}
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
                </div>
              );
            })}
          </Box>
        </>
      ) : (
        <Box className="loader" sx={{ display: 'flex' }}>
          <CircularProgress />
        </Box>
      )}
    </Stack>
  );
};

export default TrackerPage;
