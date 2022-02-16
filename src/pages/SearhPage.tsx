import {
  Grid,
  Stack,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Container,
} from '@mui/material';
import React, { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Buttons from '../Components/Buttons';
import SearchBox from '../Components/SearchBox';
import HttpResult from '../helpers/http/HttpResult';
import OverlayTrackingModel from '../models/Stores/OverlayTrackingModel';
import HttpStatus from '../models/utils/HttpStatus';
import LogTracking from '../services/LogTracking';
import { Oval } from 'react-loader-spinner';
import Typography from '@mui/material/Typography';
import logo from '../assets/AcimaLogo.png';

const SearchPage: FC = () => {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [searchContent, setSearchContent] = useState<OverlayTrackingModel[]>([]);
  const [spinner, setSpinner] = useState<boolean>(false);

  useEffect(() => {
    setSpinner(true);
    // eslint-disable-next-line no-restricted-globals
    const searchText = location.href.split('search/')[1];
    LogTracking.getAllUserTrackingLogs(searchText)
      .then((response: HttpResult<OverlayTrackingModel[]>) => {
        if (response.status === HttpStatus.Success) {
          // access the data through `response.data`
          setSearchContent(response.data);
          console.log(searchContent);
          setSpinner(false);
        } else {
          setSpinner(false);
        }
      })
      .catch((error) => {
        // Used console log for demonstration purpose. Do not use console.log when you're
        console.log((error as Error).message);
      });
  }, []);

  const OnRowClicked = (sessionGuid: string) => {
    navigate(`/tracker/${sessionGuid}`);
  };

  const navigate = useNavigate();
  const BackClicked = () => {
    navigate(`/`);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const OnSearchingUser = (searchText: string) => {
    LogTracking.getAllUserTrackingLogs(searchText)
      .then((response: HttpResult<OverlayTrackingModel[]>) => {
        if (response.status === HttpStatus.Success) {
          // access the data through `response.data`
          setSearchContent(response.data);
          console.log(searchContent);
        }
      })
      .catch((error) => {
        // Used console log for demonstration purpose. Do not use console.log when you're
        console.log((error as Error).message);
      });
  };
  return (
    <Stack style={{marginLeft: '40px', marginRight: '40px'}}>
      {!spinner ? (
        <Stack>

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
            Search
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
              
            </Typography>

            </div>

          

           
          </div>


<div>

<div style={{ float:'right', width: '350px', marginLeft: 'auto', marginBottom: '30px' }}>
            <SearchBox clicked={OnSearchingUser}></SearchBox>
          </div>

          <div
            style={{
              float:'left',
              marginRight: 'auto',
              marginTop: '20px',
              alignItems: 'baseline',
            }}
          >
            <Buttons text="Back" onClick={() => BackClicked()}></Buttons>
          </div>

</div>

       
        </Stack>
      ) : null}
      {!spinner ? (
        <Grid
          style={{
            alignContent: 'center',
            alignSelf: 'center',
          }}
        >
          <Paper>
            <TableContainer sx={{ marginTop: 2}} component={Paper}>
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
                        padding: '0px'
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
                      Lease GUID
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
                      onClick={() => {
                        OnRowClicked(row.session_guid);
                      }}
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
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={searchContent.length}
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
            marginTop: 200,
          }}
        >
          <Oval color="#005b96" height={100} width={100} secondaryColor="" />
        </Grid>
      ) : null}
    </Stack>
  );
};

export default SearchPage;
