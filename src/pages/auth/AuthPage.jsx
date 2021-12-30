import { Box, Button, ButtonGroup, Container, Grid } from '@mui/material';
import React, { useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import Common from './Common';
import './AuthPage.css';

function AuthPage() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    location.pathname === '/' && navigate('/login');
  }, []);
  return (
    <div
      style={{
        backgroundImage: `url(${
          process.env.PUBLIC_URL + '/assets/images/login-bg.png'
        })`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        minHeight: '100vh',
        minWidth: '100vw',
        maxWidth: '100vw',
        overflowX: 'hidden',
      }}
    >
      <div style={{ margin: '0 auto' }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mx: 10,
          }}
        >
          <Box
            sx={{
              mt: '50px',
              width: { xs: '90vw', md: '50vw' },
            }}
          >
            <Container
              maxWidth="sm"
              sx={{ display: 'flex', justify: 'center', alignItems: 'center' }}
            >
              <Grid
                container
                justify="center"
                alignItems="center"
                elevation={10}
              >
                <Grid item xs={12}>
                  <ButtonGroup
                    variant="contained"
                    aria-label="outlined success button group"
                    fullWidth
                  >
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => navigate('/login')}
                      sx={{
                        padding: '1rem',
                        backgroundColor:
                          location.pathname === '/login'
                            ? '#1B5E20'
                            : '#5BBC2E',
                      }}
                    >
                      SIGN IN
                    </Button>
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => navigate('/register')}
                      sx={{
                        padding: '1rem',
                        backgroundColor:
                          location.pathname === '/register'
                            ? '#1B5E20'
                            : '#5BBC2E',
                      }}
                    >
                      SIGN UP
                    </Button>
                  </ButtonGroup>
                </Grid>
              </Grid>
            </Container>

            {/* <Register /> */}
            <Outlet />
          </Box>
          <Box
            sx={{
              display: { xs: 'none', lg: 'flex' },
              flexDirection: 'column',
              mt: '50px',
              width: '50vw',
              minHeight: '90vh',
              alignItems: 'center',
              justify: 'center',
            }}
          >
            <Common />
          </Box>
        </Box>
      </div>
    </div>
  );
}

export default AuthPage;
