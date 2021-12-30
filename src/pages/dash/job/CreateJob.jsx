import React, { useState } from 'react';
import { styled, Box } from '@mui/system';
import ModalUnstyled from '@mui/base/ModalUnstyled';
import {
  Button,
  FormControl,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { AddCircleOutlined } from '@mui/icons-material';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import auth from '../../../auth';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';

const StyledModal = styled(ModalUnstyled)`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Backdrop = styled('div')`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const style = {
  width: { lg: '50vw' },
  bgcolor: '#fff',
  p: 2,
  px: 4,
  pb: 3,
  mt: '15px',
  height: { lg: '90vh' },
  overflowY: 'scroll',
};

function CreateJob({ setReload }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  {
    /* Define fields */
  }
  const [jobTitle, setJobTitle] = useState('');
  const [lastDateOfApply, setLastDateOfApply] = useState(new Date());
  const [level, setLevel] = useState('');
  const [shift, setShift] = useState('');
  const [location, setLocation] = useState('');
  const [vacancies, setVacancies] = useState('');
  const [jobType, setJobType] = useState('');
  const [jobDescription, setJobDescription] = useState('');

  const handleReset = () => {
    setJobTitle('');
    setLastDateOfApply(new Date());
    setLevel('');
    setShift('');
    setLocation('');
    setVacancies('');
    setJobType('');
    setJobDescription('');
  };

  function handleReSubmit() {
    auth.createJob(
      {
        jobTitle,
        lastDateOfApply,
        shift,
        level,
        vacancies,
        location,
        jobType,
        jobDescription,
      },
      () => {
        auth.getJobs();
      }
    );
    handleReset();
    setReload(true);
  }

  const handleSubmit = () => {
    auth.createJob(
      {
        jobTitle,
        lastDateOfApply,
        shift,
        level,
        vacancies,
        location,
        jobType,
        jobDescription,
      },
      () => {
        auth.getJobs();
      }
    );

    handleClose();
    handleReset();
    setReload(true);
  };

  return (
    <>
      <Box sx={{ width: '100%', pt: 3 }}>
        <Grid container spacing={2} sx={{ width: '100%' }}>
          <Grid item md={10} />
          <Grid item md={2}>
            <Button
              fullWidth
              variant="contained"
              color="success"
              size="large"
              sx={{ py: '0.95rem', px: '2.19rem' }}
              startIcon={<AddCircleOutlined />}
              onClick={handleOpen}
            >
              CREATE JOB
            </Button>
          </Grid>
        </Grid>
      </Box>
      <StyledModal
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={open}
        onClose={handleClose}
        BackdropComponent={Backdrop}
      >
        <Box sx={style}>
          <Box
            sx={{
              pt: 2,
            }}
            style={{ width: '100%' }}
          >
            <Typography align="center" variant="h4" fontWeight="bold">
              CREATE JOB
            </Typography>
            <Grid
              container
              direction={'column'}
              spacing={2}
              sx={{ width: '100%', px: 3, pt: 3 }}
            >
              <Grid
                item
                container
                sx={{
                  width: '100%',
                  display: 'flex',
                  justify: 'center',
                  alignItems: 'center',
                }}
              >
                <Grid item md={3}>
                  <Typography variant="body1" fontWeight="semiBold">
                    Job Title:
                  </Typography>
                </Grid>
                <Grid item md={9}>
                  <TextField
                    name="job_title"
                    id="job_title"
                    fullWidth
                    onClick={(e) => setJobTitle(e.target.value)}
                  />
                </Grid>
              </Grid>
              <Grid
                item
                container
                sx={{
                  width: '100%',
                  display: 'flex',
                  justify: 'center',
                  alignItems: 'center',
                }}
              >
                <Grid item md={3}>
                  <Typography variant="body1" fontWeight="semiBold">
                    Last date of apply:
                  </Typography>
                </Grid>
                <Grid item md={9}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DesktopDatePicker
                      value={lastDateOfApply}
                      minDate={new Date()}
                      onChange={(newValue) => setLastDateOfApply(newValue)}
                      renderInput={(params) => (
                        <TextField {...params} fullWidth />
                      )}
                    />
                  </LocalizationProvider>
                </Grid>
              </Grid>
              <Grid
                item
                container
                sx={{
                  width: '100%',
                  display: 'flex',
                  justify: 'center',
                  alignItems: 'center',
                }}
              >
                <Grid item md={3}>
                  <Typography variant="body1" fontWeight="semiBold">
                    Level:
                  </Typography>
                </Grid>
                <Grid item md={9}>
                  <TextField
                    name="level"
                    id="level"
                    fullWidth
                    onChange={(e) => setLevel(e.target.value)}
                  />
                </Grid>
              </Grid>
              <Grid
                item
                container
                sx={{
                  width: '100%',
                  display: 'flex',
                  justify: 'center',
                  alignItems: 'center',
                }}
              >
                <Grid item md={3}>
                  <Typography variant="body1" fontWeight="semiBold">
                    Shift:
                  </Typography>
                </Grid>
                <Grid item md={9}>
                  <FormControl sx={{ minWidth: '100%' }}>
                    <Select
                      labelId="select-shift"
                      id="select-shift"
                      onChange={(e) => setShift(e.target.value)}
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
              </Grid>
              <Grid
                item
                container
                sx={{
                  width: '100%',
                  display: 'flex',
                  justify: 'center',
                  alignItems: 'center',
                }}
              >
                <Grid item md={3}>
                  <Typography variant="body1" fontWeight="semiBold">
                    Location:
                  </Typography>
                </Grid>
                <Grid item md={9}>
                  <TextField
                    name="location"
                    id="location"
                    fullWidth
                    onClick={(e) => setLocation(e.target.value)}
                  />
                </Grid>
              </Grid>
              <Grid
                item
                container
                sx={{
                  width: '100%',
                  display: 'flex',
                  justify: 'center',
                  alignItems: 'center',
                }}
              >
                <Grid item md={3}>
                  <Typography variant="body1" fontWeight="semiBold">
                    Vacancies:
                  </Typography>
                </Grid>
                <Grid item md={9}>
                  <TextField
                    type="number"
                    name="vacancy"
                    id="vacancy"
                    fullWidth
                    onChange={(e) => setVacancies(e.target.value)}
                  />
                </Grid>
              </Grid>
              <Grid
                item
                container
                sx={{
                  width: '100%',
                  display: 'flex',
                  justify: 'center',
                  alignItems: 'center',
                }}
              >
                <Grid item md={3}>
                  <Typography variant="body1" fontWeight="semiBold">
                    Job Type:
                  </Typography>
                </Grid>
                <Grid item md={9}>
                  <FormControl sx={{ minWidth: '100%' }}>
                    <Select
                      labelId="select-type"
                      id="select-type"
                      onChange={(e) => setJobType(e.target.value)}
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
                      <MenuItem value="internship">
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
              </Grid>
              <Grid
                item
                container
                sx={{
                  width: '100%',
                  display: 'flex',
                  justify: 'center',
                  alignItems: 'center',
                }}
              >
                <Grid item md={3}>
                  <Typography variant="body1" fontWeight="semiBold">
                    Job Description:
                  </Typography>
                </Grid>
                <Grid item md={9}>
                  <CKEditor
                    editor={ClassicEditor}
                    onChange={(e, editor) =>
                      setJobDescription(editor.getData())
                    }
                  />
                </Grid>
              </Grid>
              <Grid
                item
                container
                sx={{
                  width: '100%',
                  display: 'flex',
                  justify: 'center',
                  alignItems: 'center',
                }}
              >
                <Grid item md={3}></Grid>
                <Grid item md={9} sx={{ px: 20 }}>
                  <div
                    style={{
                      marginTop: '2rem',
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <Button
                      variant="contained"
                      size="large"
                      sx={{ backgroundColor: '#182F59', color: '#fff' }}
                      onClick={handleReSubmit}
                    >
                      Save and add another
                    </Button>
                    <Button
                      variant="contained"
                      size="large"
                      sx={{ backgroundColor: '#182F59', color: '#fff' }}
                      onClick={handleSubmit}
                    >
                      Save
                    </Button>
                  </div>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </StyledModal>
    </>
  );
}

export default CreateJob;
