import { Box } from "@mui/material";
import HeroHome from "../components/HeroHome";
import Follow from '../components/Follow'
import Recent from "../components/Recent";
import Store from "../components/Store";
import Sixlogo from '../components/Sixlogo'
import Logo from '../components/Logo'
import HappyClients from '../components/HappyClients'

export default function HomePage() {
  return (
    <>
      <Box  sx={{ backgroundColor: "background.default"}} >
        <HeroHome />
        <Sixlogo/>
        <Recent title="Latest Health Products" />
        <Logo/>
        <Store/>
        <HappyClients/>
        <Follow/>
      </Box>
    </>
  );
}
