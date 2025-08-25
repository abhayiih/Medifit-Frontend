import { Box, Grid, Typography, styled } from '@mui/material';
import f1 from '../assets/f1.svg';
import f2 from '../assets/f2.svg';
import f3 from '../assets/f3.svg';
import f4 from '../assets/f4.svg';
import insta from '../assets/insta.svg';

const FollowWrapper = styled(Box)(({ theme }) => ({
  paddingTop: theme.spacing(8),
  paddingBottom: theme.spacing(8),
  marginLeft: theme.spacing(20),
  marginRight: theme.spacing(20),
}));

export default function Follow() {
  const images = [f1, f2, f3, f4];

  return (
    <FollowWrapper>
      {/* Title */}
      <Box textAlign="center" mb={4}>
        <Typography variant="h4" fontWeight="bold" sx={{ fontSize: '3rem' }}>
          Follow us @medifit
        </Typography>
      </Box>

      {/* Images Row */}
      <Grid container spacing={0} alignItems="flex-start">
        {images.map((img, index) => (
          <Grid
            key={index}
            size={{ xs: 6, sm: 3, md: 3 }}
            sx={{
              padding: 0,
              margin: 0,
              display: 'flex',
              justifyContent: 'center',
              position: 'relative',
              cursor: 'pointer',

              // Show logo on hover
              '&:hover .insta-logo': {
                opacity: 1,
              },
            }}
          >
            <Box
              component="img"
              src={img}
              alt={`follow icon ${index + 1}`}
              sx={{
                width: '120%',
                maxWidth: '250px',
                height: 'auto',
                objectFit: 'contain',
              }}
            />

            <Box
              component="img"
              src={insta}
              alt="instagram logo"
              className="insta-logo"
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '100px',
                height: '100px',
                opacity: 0,
                transition: 'opacity 0.3s ease',
              }}
            />
          </Grid>
        ))}
      </Grid>
    </FollowWrapper>
  );
}
