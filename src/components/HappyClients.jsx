import { Box, Typography } from "@mui/material";
import person1 from '../assets/person1.svg';
import person2 from '../assets/person2.svg';
import person3 from '../assets/person3.svg';
import person4 from '../assets/person4.svg';
import content from '../assets/content.svg';

export default function HappyClients() {
  const clients = [
    { logo: person1, name: "Alice Smith", role: "Manager" },
    { logo: person2, name: "John Doe", role: "Developer" },
    { logo: person3, name: "Emma Johnson", role: "Designer" },
    { logo: person4, name: "Michael Brown", role: "Analyst" },
  ];

  return (
    <Box sx={{ py: 8, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
      
      {/* Title */}
      <Typography sx={{ fontWeight: 700, fontSize: '3rem', textAlign: "center", color: "#503217" }}>
        Our Happy Clients
      </Typography>
      
      {/* Testimonial with top-left quote icon */}
      <Box sx={{ position: "relative", maxWidth: 1200, width: "100%" }}>
        {/* Top-left quote icon */}
        <Box
          component="img"
          src={content}
          alt="Quote Icon"
          sx={{ position: "absolute", top: 16, left: 16, width: 40, height: 40, zIndex: 1 }}
        />
        
        <Typography 
          sx={{ 
            backgroundColor: "#F2F2F2",
            color: "#8F7D6A",
            textAlign: "center",
            px: 6,   
            pt: 10,   
            pb: 8,   
            borderRadius: 2,
            position: "relative",
          }}
        >
          I’m so impressed with this online medical store. The product selection is extensive and the prices are great. I found everything I needed in one place. The ordering process was easy, delivery was prompt, and the items arrived in perfect condition. Plus, the customer service team was incredibly helpful.
        </Typography>
      </Box>

      {/* Clients row */}
      <Box sx={{ display: "flex", ml:6,gap: 10, flexWrap: "wrap", justifyContent: "center" }}>
        {clients.map((client, index) => (
          <Box 
            key={index} 
            sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 2, minWidth: 250 }}
          >
            <Box
              component="img"
              src={client.logo}
              alt={client.name}
              sx={{ width: 80, height: 80, borderRadius: "50%" }}
            />
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography sx={{ fontWeight: 600, color: "#503217" }}>
                {client.name}
              </Typography>
              <Typography sx={{ fontSize: '0.875rem', color: "#8F7D6A" }}>
                {client.role}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
