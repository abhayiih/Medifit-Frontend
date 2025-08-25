import { Box } from "@mui/material";
import HeroHome2 from "../components/HeroHome2";
import OurStory from "../components/OurStory";
import Collections from "../components/Collections";
import Category from "../components/Category";
import Review from "../components/Review";
import Company from "../components/Company";
import Blog  from "../components/Blog";

export default function HomePage2() {
  return (
    <Box sx={{ backgroundColor: "background.default"}}>  
      <HeroHome2 />
      <Company />
      <OurStory />
      <Collections />
      <Category />
      <Review />
      <Blog/>
    </Box>
  );
}
