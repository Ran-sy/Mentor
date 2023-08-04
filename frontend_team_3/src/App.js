import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from "./components/layout/footer/Footer";
import Routerl from "./router/router";
import { useLocation } from "react-router-dom";
import MyNavbar from "./components/layout/navbar/Navbar";


function App() {
  const location = useLocation();
  const showFooterOnPages = ['/register', '/login', 'Profiles']; // Add the paths of the pages you want to show the footer on.
  const shouldShowFooter = !showFooterOnPages.includes(location.pathname);

  const showNAvBarOnPages = ['/register', '/login', '/Profiles', '/']; // Add the paths of the pages you want to show the footer on.
  const shouldShowNavbar = !showNAvBarOnPages.includes(location.pathname);
  return (
    <div>
      {shouldShowNavbar && <MyNavbar />}
      <Routerl />
      {shouldShowFooter && <Footer />}
    </div>
  );
}
export default App;