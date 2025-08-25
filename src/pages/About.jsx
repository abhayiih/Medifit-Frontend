import CTA  from "../components/CTA";
import { Box } from "@mui/material";
import AboutUs  from "../components/AboutUs";
import HeroAbout  from "../components/HeroAbout";
import MissionSection from '../components/MissionSection'


export default function About() {
  return (
   <Box sx={{ backgroundColor: "background.default"}}>
    <HeroAbout/>
    <AboutUs/>  
    <MissionSection/>
    <CTA/>
    </Box>
  );
}
