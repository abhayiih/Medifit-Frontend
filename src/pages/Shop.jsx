import CTA  from "../components/CTA";
import Review from "../components/Review";
import { Box } from "@mui/material";
import Recent from "../components/Recent";
import AboutUs  from "../components/AboutUs";
import ShopHero from '../components/ShopHero'
import FeatureIcons from '../components/FeatureIcons'

export default function Shop() {
  return (
    <>
     <Box sx={{ backgroundColor: "background.default"}}>  
      <ShopHero/>
      <FeatureIcons/>
       <Review/>
       <Recent title="Recent Products"/>
        <CTA/>
        </Box>
   
     
    </>
  );
}
