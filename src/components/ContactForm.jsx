import { Box, Typography, Grid, TextField, InputAdornment, styled } from '@mui/material';
import { Phone, Email, AccessTime } from '@mui/icons-material';
import { CommonButton } from "./CommonComponents";
import handd from '../assets/handd.svg';

const ContactFormWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  paddingTop: theme.spacing(8),
  paddingBottom: theme.spacing(6),
  paddingX: theme.spacing(3),
  color: theme.palette.text.primary,
}));

export default function ContactForm() {
  return (
    <ContactFormWrapper>
      <Grid container spacing={6} justifyContent="center">
        {/* Title and Subtitle */}
        <Grid size={{ xs: 12, md: 8 }} textAlign="center">
          <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
            Contact Us
          </Typography>
          <Typography variant="body1">
            Have questions or need support? Get in touch with our team — we're here to help!
          </Typography>
        </Grid>

        {/* Full Name & Email */}
        <Grid container spacing={3} size={{ xs: 12, md: 8 }} justifyContent="center">
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField label="Full Name" variant="outlined" fullWidth />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              label="Email Address"
              variant="outlined"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>

        {/* Phone & Schedule to Receive Call */}
        <Grid container spacing={3} size={{ xs: 12, md: 8 }} justifyContent="center">
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              label="Phone Number"
              variant="outlined"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Phone />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              label="Schedule to Receive Call"
              variant="outlined"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccessTime />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>

        {/* Message Box */}
        <Grid size={{ xs: 12, md: 8 }} sx={{ mt: 3 }}>
          <TextField
            label="Message"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
          />
        </Grid>

        {/* Submit Button with Icon, left-aligned */}
        <Grid size={{ xs: 12, md: 8 }}>
          <CommonButton
            variant="contained"
            endIcon={<img src={handd} alt="hand icon" style={{ width: 24, height: 24 }} />}
            sx={{
              px: 3,
              py: 1.2,
              width: 'auto', // shrink to content
              minWidth: 0,
            }}
          >
            Submit
          </CommonButton>
        </Grid>
      </Grid>
    </ContactFormWrapper>
  );
}
