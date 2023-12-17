import { Outlet } from "react-router";
import Header from "../../components/header";
import Footer from "../../components/footer";

function CommonLayout() {
  return ( 
    <>
      <Header />
      <main className="main">
        <Outlet />
      </main>
      <Footer />
    </>
   );
}

export default CommonLayout;