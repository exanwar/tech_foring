import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import AccountCircle from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useNavigate } from 'react-router-dom';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import {
  Avatar,
  Button,
  Container,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  Paper,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';
import {
  Delete,
  Edit,
  HomeOutlined,
  Search,
  VisibilityOutlined,
  WorkOutlined,
  PowerSettingsNew,
} from '@mui/icons-material';

import { styled } from '@mui/material/styles';
import Counters from './Counters';
import CreateJob from './job/CreateJob';
import moment from 'moment';
import auth from '../../auth';

export default function Layout({ children }) {
  const navigate = useNavigate();

  const drawerWidth = 80;

  const menuId = 'primary-search-account-menu';

  const [filterDate, setFilterDate] = useState(new Date());

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  const [jobs, setJobs] = useState([]);
  const [reload, setReload] = useState(false);

  const accessToken = localStorage.getItem('access');
  const getData = async () => {
    const response = await fetch(
      'https://tf-practical.herokuapp.com/api/job_post/',
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + accessToken,
        },
      }
    );
    const data = await response.json();
    console.log(data);
    setJobs(data);
    console.log(jobs);
    setReload(false);
  };

  const [search, setSearch] = useState('');
  const [type, setType] = useState('');
  const [shift, setShift] = useState('');
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    let user = localStorage.getItem('user');
    if (!user) {
      navigate('/login');
    } else {
      getData();
    }
  }, [reload]);

  function handleDelete(id) {
    auth.deletePost(id);
    setReload(true);
  }

  function handleLogout() {
    auth.logout(() => navigate('/login'));
  }

  function filterData() {
    let q = search ? search : null;
    let t = type ? type : null;
    let s = shift ? shift : null;
    let d = date ? moment(date).format('YYYY-MM-DD') : null;

    // console.log([
    //   {
    //     q: q,
    //     t: t,
    //     s: s,
    //     d: moment(d).format('YYYY-MM-DD'),
    //   },
    // ]);

    const data = jobs.filter((item) => {
      return (
        item.jobTitle.includes(q) && item.jobType === t && item.shift === s
      );
      // item.jobType.includes(t);
      // item.shift.includes(s);
      // item.lastDateOfApply.includes(d);
    });
    console.log(data);
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{ backgroundColor: '#182F59', px: 5, height: '4rem' }}
        elevation={20}
      >
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            MUI
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'flex' } }}>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={17} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              color="inherit"
            >
              <AccountCircle style={{ fontSize: 35 }} />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Box sx={{ display: 'flex', Width: '100%' }}>
        <Box
          width={drawerWidth}
          sx={{
            backgroundColor: '#fff',
            minHeight: `calc(100vh - 4rem)`,
            maxHeight: '100vh',
          }}
        >
          <Box
            sx={{
              py: 3,
            }}
            style={{ width: '100%' }}
          >
            <Grid
              container
              direction={'column'}
              spacing={2}
              sx={{
                display: 'flex',
                justify: 'center',
                alignItems: 'center',
              }}
            >
              <Grid item>
                <Button>
                  <Stack direction="column" spacing={0.75}>
                    <Avatar
                      sx={{
                        backgroundColor: '#fff',
                        border: ' 2px solid #182F59',
                      }}
                    >
                      <HomeOutlined style={{ color: '#182F59' }} />
                    </Avatar>
                    <Typography
                      align="center"
                      variant="body1"
                      sx={{
                        fontSize: '11px',
                        fontWeight: 'bold',
                        color: '#182F59',
                      }}
                    >
                      Dash
                    </Typography>
                  </Stack>
                </Button>
              </Grid>
              <Grid item>
                <Button>
                  <Stack direction="column" spacing={0.75}>
                    <Avatar
                      sx={{
                        backgroundColor: '#fff',
                        border: ' 2px solid #182F59',
                      }}
                    >
                      <WorkOutlined style={{ color: '#182F59' }} />
                    </Avatar>
                    <Typography
                      align="center"
                      variant="body1"
                      sx={{
                        fontSize: '11px',
                        fontWeight: 'bold',
                        color: '#182F59',
                      }}
                    >
                      Career
                    </Typography>
                  </Stack>
                </Button>
              </Grid>
              <Grid item>
                <Button onClick={handleLogout}>
                  <Stack direction="column" spacing={0.75}>
                    <Avatar
                      sx={{
                        backgroundColor: '#fff',
                        border: ' 2px solid #182F59',
                      }}
                    >
                      <PowerSettingsNew style={{ color: '#182F59' }} />
                    </Avatar>
                    <Typography
                      align="center"
                      variant="body1"
                      sx={{
                        fontSize: '11px',
                        fontWeight: 'bold',
                        color: '#182F59',
                      }}
                    >
                      Logout
                    </Typography>
                  </Stack>
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Container
          sx={{
            minWidth: `calc(100% - ${drawerWidth}px)`,
            maxWidth: '100vw',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justify: 'center',
            backgroundColor: '#EFF3F6',
          }}
        >
          <Counters />
          <CreateJob setReload={setReload} />
          <Box
            sx={{
              py: 3,
            }}
            style={{ width: '100%' }}
          >
            <Grid container spacing={2} sx={{ width: '100%' }}>
              <Grid item md={2}>
                <TextField
                  label="Search"
                  name="search"
                  id="search"
                  fullWidth
                  placeholder="search here..."
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="start">
                        <Search color="success" />
                      </InputAdornment>
                    ),
                  }}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                />
              </Grid>
              <Grid item md={2}>
                <FormControl sx={{ minWidth: '100%' }}>
                  <InputLabel id="select-by-type-label">
                    SELECT BY TYPE
                  </InputLabel>
                  <Select
                    labelId="select-by-type-label"
                    id="select-by-type"
                    label="SELECT BY TYPE"
                    onChange={(e) => {
                      setType(e.target.value);
                    }}
                  >
                    <MenuItem value="part_time">
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justify: 'space-between',
                        }}
                      >
                        Part Time
                      </div>
                    </MenuItem>
                    <MenuItem value="full_time">
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justify: 'space-between',
                        }}
                      >
                        Full Time
                      </div>
                    </MenuItem>
                    <MenuItem value="Internship">
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justify: 'space-between',
                        }}
                      >
                        Internship
                      </div>
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item md={2}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DesktopDatePicker
                    label="SELECT BY EXPIRE DATE"
                    value={date}
                    minDate={new Date('2000-01-01')}
                    onChange={(newValue) => setDate(newValue)}
                    renderInput={(params) => (
                      <TextField {...params} fullWidth />
                    )}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item md={2}>
                <FormControl sx={{ minWidth: '100%' }}>
                  <InputLabel id="select-by-shift-label">
                    SELECT BY SHIFT
                  </InputLabel>
                  <Select
                    labelId="select-by-shift-label"
                    id="select-by-shift"
                    label="SELECT BY SHIFT"
                    onChange={(e) => {
                      setShift(e.target.value);
                    }}
                  >
                    <MenuItem value="day">
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justify: 'space-between',
                        }}
                      >
                        Day
                      </div>
                    </MenuItem>
                    <MenuItem value="night">
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justify: 'space-between',
                        }}
                      >
                        Night
                      </div>
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item md={2}>
                <FormControl sx={{ minWidth: '100%' }}>
                  <InputLabel id="select-by-shift-label">
                    SELECT BY DEPARTMENT
                  </InputLabel>
                  <Select
                    labelId="select-by-shift-label"
                    id="select-by-shift"
                    label="SELECT BY DEPARTMENT"
                  >
                    <MenuItem value="">
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justify: 'space-between',
                        }}
                      >
                        Null
                      </div>
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item md={2}>
                <Button
                  fullWidth
                  variant="contained"
                  color="success"
                  size="large"
                  sx={{ py: '0.95rem', px: '4.4rem' }}
                  onClick={filterData}
                >
                  Filter
                </Button>
              </Grid>
            </Grid>
          </Box>
          <Box
            sx={{
              py: 3,
            }}
            style={{ width: '100%', display: 'flex', flexDirection: 'column' }}
          >
            <Box
              sx={{
                width: '100%',
                backgroundColor: '#182F59',
                color: '#fff',
                py: 3,
              }}
            >
              <Typography variant="h4" align="center" fontWeight="bold">
                RECENT JOB POST
              </Typography>
            </Box>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>POST NAME</StyledTableCell>
                    <StyledTableCell align="center">VACANCIES</StyledTableCell>
                    <StyledTableCell align="center">SHIFT</StyledTableCell>
                    <StyledTableCell align="center">TYPE</StyledTableCell>
                    <StyledTableCell align="center">POST DATE</StyledTableCell>
                    <StyledTableCell align="center">
                      EXPIRE DATE
                    </StyledTableCell>
                    <StyledTableCell align="center">LOCATION</StyledTableCell>
                    <StyledTableCell align="center">ACTIONS</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {jobs && jobs.length > 0 ? (
                    jobs.map((row) => (
                      <StyledTableRow key={row.id}>
                        <StyledTableCell component="th" scope="row">
                          {row.jobTitle}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row.vacancies}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row.shift === 'day'
                            ? 'Day'
                            : row.shift === 'night'
                            ? 'Night'
                            : ''}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row.jobType === 'internship'
                            ? 'Internship'
                            : row.shift === 'part_time'
                            ? 'Part Time'
                            : row.shift === 'part_time'
                            ? 'Full Time'
                            : ''}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row.postDate}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row.lastDateOfApply}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row.location}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          <Box style={{ width: '100%' }}>
                            <IconButton aria-label="delete" size="small">
                              <Edit fontSize="inherit" color="success" />
                            </IconButton>
                            <IconButton aria-label="delete" size="small">
                              <Delete
                                fontSize="inherit"
                                color="error"
                                onClick={handleDelete(row.id)}
                              />
                            </IconButton>
                            <IconButton aria-label="delete" size="small">
                              <VisibilityOutlined
                                fontSize="inherit"
                                color="primary"
                              />
                            </IconButton>
                          </Box>
                        </StyledTableCell>
                      </StyledTableRow>
                    ))
                  ) : (
                    <Typography align="center">Loading</Typography>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
