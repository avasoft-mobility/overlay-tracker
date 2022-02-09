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
    <Container>
      {!spinner ? (
        <Stack style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ width: '350px', marginLeft: 'auto', marginTop: '30px' }}>
            <SearchBox clicked={OnSearchingUser}></SearchBox>
          </div>

          <div
            style={{
              marginRight: 'auto',
              marginBottom: '20px',
              alignItems: 'baseline',
            }}
          >
            <Buttons text="Back" onClick={() => BackClicked()}></Buttons>
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
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="caption table">
                {/* Table Header */}
                <TableHead
                  style={{
                    backgroundColor: 'rgb(202, 202, 202)',
                  }}
                >
                  <TableRow>
                    <TableCell
                      style={{
                        textAlign: 'center',
                        fontWeight: 'bold',
                      }}
                    >
                      Customer GUID
                    </TableCell>
                    <TableCell
                      style={{
                        textAlign: 'center',
                        fontWeight: 'bold',
                      }}
                      align="right"
                    >
                      Lease ID
                    </TableCell>
                    <TableCell
                      style={{
                        textAlign: 'center',
                        fontWeight: 'bold',
                      }}
                      align="right"
                    >
                      Lease Guid
                    </TableCell>
                    <TableCell
                      style={{
                        textAlign: 'center',
                        fontWeight: 'bold',
                      }}
                      align="right"
                    >
                      Location GUID
                    </TableCell>
                    <TableCell
                      style={{
                        textAlign: 'center',
                        fontWeight: 'bold',
                      }}
                      align="right"
                    >
                      Session GUID
                    </TableCell>
                    <TableCell
                      style={{
                        textAlign: 'center',
                        fontWeight: 'bold',
                      }}
                      align="right"
                    >
                      User Overlay Start Time
                    </TableCell>
                    <TableCell
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
          <Oval color="#00BFFF" height={100} width={100} />
        </Grid>
      ) : null}
    </Container>
  );
};

export default SearchPage;
