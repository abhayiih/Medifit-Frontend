import { Box, Typography } from "@mui/material";
import WarrantyIcon from '../assets/warranty.svg';
import DeliveryIcon from '../assets/delivery.svg';
import SupportIcon from '../assets/support.svg';
import Vector from '../assets/Vector.svg';
import ShieldCheck from '../assets/shieldcheck.svg';

export default function Logo() {
  const items = [
    {
      icon:DeliveryIcon ,
      overlayIcon: Vector,
      title: "30 Days Warranty",
      subtitle: "Enjoy peace of mind with warranty",
    },
    {
      icon:WarrantyIcon ,
      overlayIcon: ShieldCheck,
      title: "Exchange Policy",
      subtitle: "You’re satisfied with your purchase",
    },
    {
      icon: SupportIcon,
      title: "Secure Payment",
      subtitle: "Shop with confidence every time",
    },
  ];

  return (
    <Box 
      sx={{ 
        display: "flex",          // flex container
        justifyContent: "center", // center items horizontally
        width: "65%",            // container takes full page width
        py: 6,
        backgroundColor: "#F2F2F2",
      ml:37
        

      }}
    >
      <Box sx={{ display: "flex", gap: 4 }}>
        {items.map((item, index) => (
          <Box 
            key={index} 
            sx={{ display: "flex", alignItems: "center", gap: 2 }}
          >
            {/* Logo with optional overlay */}
            <Box sx={{ position: "relative", width: 80, height: 80 }}>
              <Box
                component="img"
                src={item.icon}
                alt={item.title}
                sx={{ width: "100%", height: "100%" }}
              />
              {item.overlayIcon && (
                <Box
                  component="img"
                  src={item.overlayIcon}
                  alt="Overlay Icon"
                  sx={{
                    position: "absolute",
                    width: 40,
                    height: 40,
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                />
              )}
            </Box>

            {/* Right: Title + Subtitle */}
            <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <Typography sx={{ fontWeight: 600, fontSize: '1rem', color: '#503217' }}>
                {item.title}
              </Typography>
              <Typography sx={{ fontSize: '0.875rem', color: '#503217', mt: 0.5 }}>
                {item.subtitle}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
