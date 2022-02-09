import React, { FC, useEffect, useState } from 'react';
import './HomePage.css';
import {
  Container,
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
import { DateRange } from '@mui/icons-material';

const HomePage: FC = () => {
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [page, setPage] = React.useState(0);
  const [spinner, setSpinner] = React.useState<boolean>(false);
  const [content, setContent] = React.useState<OverlayTrackingModel[]>([]);
  let date = new Date();
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
        // developing the app.
        // eslint-disable-next-line no-console
        console.log((error as Error).message);
      });
  }, []);

  // const content: OverlayTrackingModel[] = [
  //   {
  //     customer_guid: 'cus-784512',
  //     lease_id: '4512369',
  //     lease_guid: 'les-4512698',
  //     location_guid: 'loc-798451369',
  //     session_guid: 'sess-7451a88',
  //     overlay_start_time: '12/02/2021 12:00PM',
  //     overlay_end_time: '12/02/2021 1:00PM',
  //   },
  //   {
  //     customer_guid: 'cus-784512',
  //     lease_id: '300000',
  //     lease_guid: 'les-4512698',
  //     location_guid: 'loc-798451369',
  //     session_guid: 'sess-7451a88',
  //     overlay_start_time: '12/02/2021 12:00PM',
  //     overlay_end_time: '12/02/2021 1:00PM',
  //   },
  //   {
  //     customer_guid: 'cus-784512',
  //     lease_id: '4512369',
  //     lease_guid: 'les-4512698',
  //     location_guid: 'loc-798451369',
  //     session_guid: 'sess-7451a88',
  //     overlay_start_time: '12/02/2021 12:00PM',
  //     overlay_end_time: '12/02/2021 1:00PM',
  //   },
  //   {
  //     customer_guid: 'cus-784512',
  //     lease_id: '4512369',
  //     lease_guid: 'les-4512698',
  //     location_guid: 'loc-798451369',
  //     session_guid: 'sess-7451a88',
  //     overlay_start_time: '12/02/2021 12:00PM',
  //     overlay_end_time: '12/02/2021 1:00PM',
  //   },
  //   {
  //     customer_guid: 'cus-784512',
  //     lease_id: '4512369',
  //     lease_guid: 'les-4512698',
  //     location_guid: 'loc-798451369',
  //     session_guid: 'sess-7451a88',
  //     overlay_start_time: '12/02/2021 12:00PM',
  //     overlay_end_time: '12/02/2021 1:00PM',
  //   },
  //   {
  //     customer_guid: 'cus-784512',
  //     lease_id: '4512369',
  //     lease_guid: 'les-4512698',
  //     location_guid: 'loc-798451369',
  //     session_guid: 'sess-7451a88',
  //     overlay_start_time: '12/02/2021 12:00PM',
  //     overlay_end_time: '12/02/2021 1:00PM',
  //   },
  //   {
  //     customer_guid: 'cus-784512',
  //     lease_id: '300000',
  //     lease_guid: 'les-4512698',
  //     location_guid: 'loc-798451369',
  //     session_guid: 'sess-7451a88',
  //     overlay_start_time: '12/02/2021 12:00PM',
  //     overlay_end_time: '12/02/2021 1:00PM',
  //   },
  //   {
  //     customer_guid: 'cus-784512',
  //     lease_id: '4512369',
  //     lease_guid: 'les-4512698',
  //     location_guid: 'loc-798451369',
  //     session_guid: 'sess-7451a88',
  //     overlay_start_time: '12/02/2021 12:00PM',
  //     overlay_end_time: '12/02/2021 1:00PM',
  //   },
  //   {
  //     customer_guid: 'cus-784512',
  //     lease_id: '4512369',
  //     lease_guid: 'les-4512698',
  //     location_guid: 'loc-798451369',
  //     session_guid: 'sess-7451a88',
  //     overlay_start_time: '12/02/2021 12:00PM',
  //     overlay_end_time: '12/02/2021 1:00PM',
  //   },
  //   {
  //     customer_guid: 'cus-784512',
  //     lease_id: '4512369',
  //     lease_guid: 'les-4512698',
  //     location_guid: 'loc-798451369',
  //     session_guid: 'sess-7451a88',
  //     overlay_start_time: '12/02/2021 12:00PM',
  //     overlay_end_time: '12/02/2021 1:00PM',
  //   },
  //   {
  //     customer_guid: 'cus-784512',
  //     lease_id: '4512369',
  //     lease_guid: 'les-4512698',
  //     location_guid: 'loc-798451369',
  //     session_guid: 'sess-7451a88',
  //     overlay_start_time: '12/02/2021 12:00PM',
  //     overlay_end_time: '12/02/2021 1:00PM',
  //   },
  //   {
  //     customer_guid: 'cus-784512',
  //     lease_id: '300000',
  //     lease_guid: 'les-4512698',
  //     location_guid: 'loc-798451369',
  //     session_guid: 'sess-7451a88',
  //     overlay_start_time: '12/02/2021 12:00PM',
  //     overlay_end_time: '12/02/2021 1:00PM',
  //   },
  //   {
  //     customer_guid: 'cus-784512',
  //     lease_id: '4512369',
  //     lease_guid: 'les-4512698',
  //     location_guid: 'loc-798451369',
  //     session_guid: 'sess-7451a88',
  //     overlay_start_time: '12/02/2021 12:00PM',
  //     overlay_end_time: '12/02/2021 1:00PM',
  //   },
  //   {
  //     customer_guid: 'cus-784512',
  //     lease_id: '4512369',
  //     lease_guid: 'les-4512698',
  //     location_guid: 'loc-798451369',
  //     session_guid: 'sess-7451a88',
  //     overlay_start_time: '12/02/2021 12:00PM',
  //     overlay_end_time: '12/02/2021 1:00PM',
  //   },
  //   {
  //     customer_guid: 'cus-784512',
  //     lease_id: '4512369',
  //     lease_guid: 'les-4512698',
  //     location_guid: 'loc-798451369',
  //     session_guid: 'sess-7451a88',
  //     overlay_start_time: '12/02/2021 12:00PM',
  //     overlay_end_time: '12/02/2021 1:00PM',
  //   },
  //   {
  //     customer_guid: 'cus-784512',
  //     lease_id: '4512369',
  //     lease_guid: 'les-4512698',
  //     location_guid: 'loc-798451369',
  //     session_guid: 'sess-7451a88',
  //     overlay_start_time: '12/02/2021 12:00PM',
  //     overlay_end_time: '12/02/2021 1:00PM',
  //   },
  //   {
  //     customer_guid: 'cus-784512',
  //     lease_id: '300000',
  //     lease_guid: 'les-4512698',
  //     location_guid: 'loc-798451369',
  //     session_guid: 'sess-7451a88',
  //     overlay_start_time: '12/02/2021 12:00PM',
  //     overlay_end_time: '12/02/2021 1:00PM',
  //   },
  //   {
  //     customer_guid: 'cus-784512',
  //     lease_id: '4512369',
  //     lease_guid: 'les-4512698',
  //     location_guid: 'loc-798451369',
  //     session_guid: 'sess-7451a88',
  //     overlay_start_time: '12/02/2021 12:00PM',
  //     overlay_end_time: '12/02/2021 1:00PM',
  //   },
  //   {
  //     customer_guid: 'cus-784512',
  //     lease_id: '4512369',
  //     lease_guid: 'les-4512698',
  //     location_guid: 'loc-798451369',
  //     session_guid: 'sess-7451a88',
  //     overlay_start_time: '12/02/2021 12:00PM',
  //     overlay_end_time: '12/02/2021 1:00PM',
  //   },
  //   {
  //     customer_guid: 'cus-784512',
  //     lease_id: '4512369',
  //     lease_guid: 'les-4512698',
  //     location_guid: 'loc-798451369',
  //     session_guid: 'sess-7451a88',
  //     overlay_start_time: '12/02/2021 12:00PM',
  //     overlay_end_time: '12/02/2021 1:00PM',
  //   },
  // ];

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
    console.log(sessionGuid);
    //e.currentTarget.focus();
    let path = `/tracker`;
    navigate(path, { state: { trackerGuid: sessionGuid } });
    alert(sessionGuid);
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
        <Typography
          variant="h2"
          className="HeaderText"
          fontFamily="'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif"
          fontWeight="bold"
          component="h2"
          color="Blue"
        >
          Overlay User Tracker
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
                <TableHead className="TableHeader">
                  <TableRow>
                    <TableCell
                      className="TableHeaderContent"
                      style={{
                        textAlign: 'center',
                        fontWeight: 'bold',
                      }}
                    >
                      Customer Guid
                    </TableCell>
                    <TableCell
                      className="TableHeaderContent"
                      style={{
                        textAlign: 'center',
                        fontWeight: 'bold',
                      }}
                      align="right"
                    >
                      Lease ID
                    </TableCell>
                    <TableCell
                      className="TableHeaderContent"
                      style={{
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
                        textAlign: 'center',
                        fontWeight: 'bold',
                      }}
                      align="right"
                    >
                      User Overlay Start Time
                    </TableCell>
                    <TableCell
                      className="TableHeaderContent"
                      style={{
                        textAlign: 'center',
                        fontWeight: 'bold',
                      }}
                      align="right"
                    >
                      Overlay End Time
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
          <Oval color="#00BFFF" height={100} width={100} />
        </Grid>
      ) : null}
    </Stack>
  );
};
export default HomePage;
