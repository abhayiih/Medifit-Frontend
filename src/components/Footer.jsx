import { Box, Typography, Grid, Link, IconButton, Stack, Divider, styled } from "@mui/material";
import { Facebook, Instagram, Twitter, YouTube, Email, Phone, LocationOn } from "@mui/icons-material";
import Logo from "../assets/medifit-logo.svg";


export const CommonFooterSection = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(1),
}));

export const CommonFooterList = ({ title, items }) => (
  <Box>
    <Typography variant="h6" gutterBottom>{title}</Typography>
    {items.map((item, index) => (
      <Typography key={index} variant="body2">{item}</Typography>
    ))}
  </Box>
);

export const CommonSocialStack = ({ icons }) => (
  <Stack direction="row" spacing={2} justifyContent="center">
    {icons.map(({ icon, name }, index) => (
      <IconButton key={index} color="primary" aria-label={name}>
        {icon}
      </IconButton>
    ))}
  </Stack>
);

export default function Footer() {
  const pages = ["Home", "Shop", "About", "Contact", "Blog", "Privacy policy", "FAQs"];
  const utility = ["Style guide", "Instruction", "Changelog", "Licenses", "Link in bio", "Error 404", "Password protected"];
  const socialMediaIcons = [
    { icon: <Facebook />, name: "Facebook" },
    { icon: <Instagram />, name: "Instagram" },
    { icon: <Twitter />, name: "Twitter" },
    { icon: <YouTube />, name: "YouTube" },
  ];

  return (
    <Box sx={{ backgroundColor: "background.footer", color: "text.primary", pt: 8, pb: 4, px: { xs: 3, sm: 6, md: 10 } }}>
      <Grid container spacing={{ xs: 4, sm: 6, md: 8 }} justifyContent="center">

        {/* LEFT */}
        <Grid size={{ xs: 12, sm: 4, md: 3 }} sx={{ pr: { md: 4 } }}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 6, sm: 6 }}>
              <CommonFooterList title="Pages" items={pages} />
            </Grid>
            <Grid size={{ xs: 6, sm: 6 }}>
              <CommonFooterList title="Utility" items={utility} />
            </Grid>
          </Grid>
        </Grid>

        {/* MIDDLE */}
        <Grid size={{ xs: 12, sm: 4, md: 3 }}>
          <Box textAlign="center">
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", mb: 3 }}>
              <img src={Logo} alt="Medifit Logo" style={{ width: 60, height: 37 }} />
              <Typography variant="h4" sx={{ ml: -1 }}>Medifit</Typography>
            </Box>

            <Typography variant="body2" sx={{ mb: 3, maxWidth: 260, mx: "auto" }}>
              We provide the ultimate solution for your online store and all the healthcare needs.
            </Typography>

            <CommonSocialStack icons={socialMediaIcons} />
          </Box>
        </Grid>

        {/* RIGHT */}
        <Grid size={{ xs: 12, sm: 4, md: 3 }} sx={{ pl: { md: 4 } }}>
          <CommonFooterSection>
            <Typography variant="h6" gutterBottom>Address</Typography>
            <Typography variant="body2" sx={{ display: "flex", alignItems: "flex-start" }}>
              <LocationOn fontSize="small" sx={{ mr: 1, mt: 0.3 }} />
              1640 Parker Rd, Allentown, New Mexico 31134
            </Typography>
          </CommonFooterSection>

          <CommonFooterSection>
            <Typography variant="h6" gutterBottom>Contact</Typography>
            <Typography variant="body2" sx={{ display: "flex", mb: 1 }}>
              <Email fontSize="small" sx={{ mr: 1 }} /> hello@gmail.com
            </Typography>
            <Typography variant="body2" sx={{ display: "flex" }}>
              <Phone fontSize="small" sx={{ mr: 1 }} /> (209) 555-0104
            </Typography>
          </CommonFooterSection>
        </Grid>
      </Grid>

      <Divider sx={{ my: 4, borderColor: "#ccc" }} />
      <Box textAlign="center">
        <Typography variant="body2" sx={{ fontSize: "0.85rem" }}>
          Design by <Link href="#" underline="hover">Webestica</Link>, Powered by <Link href="#" underline="hover">Webflow</Link>
        </Typography>
      </Box>
    </Box>
  );
}
