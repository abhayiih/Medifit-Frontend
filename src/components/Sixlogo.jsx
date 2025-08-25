import { Box, Card, CardContent, Typography, Link } from "@mui/material";
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import logoo1 from '../assets/logoo1.svg';
import logoo2 from '../assets/logoo2.svg';
import logoo3 from '../assets/logoo3.svg';
import logoo4 from '../assets/logoo4.svg';
import logoo5 from '../assets/logoo5.svg';
import logoo6 from '../assets/logoo6.svg';

import card1 from '../assets/card1.svg';
import card2 from '../assets/card2.svg';
import card3 from '../assets/card3.svg';

const logos = [
  { src: logoo1, name: "Medicine", items: 32 },
  { src: logoo2, name: "Health Care", items: 20 },
  { src: logoo3, name: "Beauty Care", items: 30 },
  { src: logoo4, name: "Fitness", items: 35 },
  { src: logoo5, name: "Lab Equipment", items: 25 },
  { src: logoo6, name: "Medkits", items: 25 },
];

const products = [
  { title: "Hand Sanitizer Collection", image: card1, link: "/shop" },
  { title: "Face Wash Sale Collection", image: card2, link: "/shop" },
  { title: "Facial Mask Deals - Save up to 50%", image: card3, link: "/shop" },
];

export default function LogoCards() {
  return (
    <Box sx={{ py: 8, display: "flex", flexDirection: "column", gap: 6 }}>
      
      {/* First row: 6 logo cards  */}
      <Box sx={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 4 }}>
        {logos.map((logo, index) => (
          <Card
            key={index}
            sx={{ minWidth: 150, textAlign: "center",backgroundColor: "background.default" }}
          >
            <CardContent sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <img src={logo.src} alt={logo.name} style={{ width: 60, height: 60, marginBottom: 8 }} />
              <Typography variant="h6">{logo.name}</Typography>
              <Typography color="text.secondary">{logo.items} items</Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

    
      <Box sx={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 3 }}>
        {products.map((product, index) => (
          <Card 
            key={index} 
            sx={{ display: "flex", minWidth: 300, maxWidth: 350, height: 180, backgroundColor: "#F2F2F2" }}
          >
            
            {/* Left side: title in middle, button at bottom */}
            <CardContent sx={{ 
              flex: 1, 
              display: "flex", 
              flexDirection: "column", 
              justifyContent: "space-between", 
              py: 2
            }}>
              <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
                <Typography 
                  sx={{ color: "#503217", fontSize: '1.25rem', fontWeight: 600 }}
                >
                  {product.title}
                </Typography>
              </Box>
              
              {/* Button text with icon */}
              <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                <Link
                  to={product.link} 
                  underline="none"
                  sx={{ color: "#503217", fontWeight: 500, display: 'flex', alignItems: 'center', gap: 0.5 }}
                >
                  {index === 0 
                    ? <ShoppingBagIcon fontSize="small" /> 
                    : <RemoveRedEyeIcon fontSize="small" />}
                  {index === 0 ? "Shop Now" : "Discover Now"}
                </Link>
                {/* Small line below text */}
                <Box sx={{ width: 100, height: "2px", backgroundColor: "#503217", mt: 0.5 }} />
              </Box>
            </CardContent>

            {/* Right side: image */}
            <Box
              component="img"
              src={product.image}
              alt={product.title}
              sx={{ width: "35%", height: "100%", objectFit: "contain" }}
            />
          </Card>
        ))}
      </Box>
    </Box>
  );
}
