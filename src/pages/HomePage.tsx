import React, { FC, useEffect, useState } from 'react';
import './HomePage.css';
import {
  Grid,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';
import SearchBox from '../Components/SearchBox';
import { useNavigate } from 'react-router-dom';
import OverlayTrackingModel from '../models/Stores/OverlayTrackingModel';
import HttpResult from '../helpers/http/HttpResult';
import HttpStatus from '../models/utils/HttpStatus';
import LogTracking from '../services/LogTracking';
import { Oval } from 'react-loader-spinner';
import logo from '../assets/AcimaLogo.png';

const HomePage: FC = () => {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [spinner, setSpinner] = useState<boolean>(false);
  const [content, setContent] = useState<OverlayTrackingModel[]>([]);
  useEffect(() => {
    setSpinner(true);
    debugger;
    // console.log(String(Config.ROUTES.GAT_ALL_USER_TRACKING_LOGS + searchText));
    LogTracking.getRecentTenLogTracker()
      .then((response: HttpResult<OverlayTrackingModel[]>) => {
        if (response.status === HttpStatus.Success) {
          // access the data through `response.data`
          setContent(response.data);
          console.log(content);
          setSpinner(false);
        }
      })
      .catch((error) => {
        // Used console log for demonstration purpose. Do not use console.log when you're
        console.log((error as Error).message);
      });
  }, []);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const navigate = useNavigate();
  const routeChange = (searchText: string) => {
    navigate(`/search/${searchText}`);
  };
  const OnRowClicked = (sessionGuid: string) => {
    navigate(`/tracker/${sessionGuid}`);
  };
  return (
    <Stack
      id="HomePage"
      style={{
        display: 'flex',
        marginLeft: 50,
        marginRight: 50,
      }}
    >
      <Grid>

      <img src={logo} alt="Logo" height={30} text-align="center" />

        <Typography
          variant="h2"
          className="HeaderText"
          fontFamily="'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif"
          fontWeight="bold"
          component="h2"
          color="#005b96"
        >
          Overlay Activity Tracker
        </Typography>
      </Grid>
      <Grid width={600} marginTop={2} marginBottom={10}>
        <SearchBox clicked={routeChange} />
      </Grid>

      {!spinner ? (
        <Grid className="TableContainer">
          <Paper>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="caption table">
                {/* Table Header */}
                <TableHead className="TableHeader" style={{
                    backgroundColor: '#005b96',
                    color: '#ffffff',
                    padding: '0'
                    
                  }}>
                  <TableRow style={{
                    color: '#000000'
                  }}>
                    <TableCell
                      className="TableHeaderContent"
                      style={{
                        color: '#ffffff',
                        textAlign: 'left',
                        fontWeight: 'bold',
                      }}
                    >
                      Customer GUID
                    </TableCell>
                    <TableCell
                      className="TableHeaderContent"
                      style={{
                        color: '#ffffff',
                        textAlign: 'center',
                        fontWeight: 'bold',
                        padding: '0px'
                      }}
                      align="right"
                    >
                      Lease ID
                    </TableCell>
                    <TableCell
                      className="TableHeaderContent"
                      style={{
                        color: '#ffffff',
                        textAlign: 'center',
                        fontWeight: 'bold',
                      }}
                      align="right"
                    >
                      Lease GUID
                    </TableCell>
                    <TableCell
                      className="TableHeaderContent"
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
                      className="TableHeaderContent"
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
                      className="TableHeaderContent"
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
                      className="TableHeaderContent"
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
                  {content.map((row: OverlayTrackingModel) => (
                    <TableRow
                      hover
                      style={{
                        cursor: 'pointer',
                      }}
                      key={row.session_guid}
                      onClick={() => {
                        OnRowClicked(row.session_guid);
                      }}
                    >
                      <TableCell component="th" scope="row">
                        {row.customer_guid}
                      </TableCell>

                      <TableCell align="right">{row.lease_id}</TableCell>

                      <TableCell align="right">{row.lease_guid}</TableCell>

                      <TableCell align="right">{row.location_guid}</TableCell>

                      <TableCell align="right">{row.session_guid}</TableCell>

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
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={content.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </Grid>
      ) : null}
      {spinner ? (
        <Grid
          style={{
            display: 'flex',
            alignContent: 'center',
            justifyContent: 'center',
            marginTop: 0,
          }}
        >
          <Oval color="#005b96" height={100} width={100} secondaryColor="" />
        </Grid>
      ) : null}
    </Stack>
  );
};
export default HomePage;
