import * as React from 'react';
import { Box, Grid, Typography, TextField, Stack } from '@mui/material';

export default function Questions() {
  return (
    <Box sx={{ px: { xs: 2, md: 4 }, py: { xs: 3, md: 6 }, maxWidth: 1200, mx: 'auto' }}>
      <Grid container spacing={4}>
        {/* Left Part: Title */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 3, color: '#503217' }}>
            Frequently Asked Questions
          </Typography>
        </Grid>

        {/* Right Part: Input Fields */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Stack spacing={2}>
            {/* First Input Field with Typography inside */}
            <TextField
              fullWidth
              multiline
              minRows={4}
              variant="outlined"
              InputProps={{
                readOnly: true,
              }}
              value={`What products do you offer?\nWe offer a wide range of medical supplies, including prescription medications, over-the-counter products, supplements, and personal care items.`}
            />

            {/* Second Input Field */}
            <TextField
              fullWidth
              multiline
              minRows={2}
              variant="outlined"
              InputProps={{ readOnly: true }}
              value="How can I place an order?"
            />

            {/* Third Input Field */}
            <TextField
              fullWidth
              multiline
              minRows={2}
              variant="outlined"
              InputProps={{ readOnly: true }}
              value="Do you provide home delivery?"
            />

            {/* Fourth Input Field */}
            <TextField
              fullWidth
              multiline
              minRows={2}
              variant="outlined"
              InputProps={{ readOnly: true }}
              value="Can I return or exchange products?"
            />
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
