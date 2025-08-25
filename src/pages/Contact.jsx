import CTA  from "../components/CTA";
import { Box } from "@mui/material";
import ContactForm  from "../components/ContactForm";
import Questions  from "../components/Questions";
export default function Contact() {
  return (
    <>
    <Box sx={{ backgroundColor: "background.default"}}>  
      <ContactForm/>
      <Questions/>
    <CTA/>
    </Box>
    </>
  );
}
