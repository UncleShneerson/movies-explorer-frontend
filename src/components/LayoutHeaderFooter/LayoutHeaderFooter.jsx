import Header from "../Header/Header";
import Footer from "../Footer/Footer";

function LayoutHeaderFooter ({children}) {
  return(
    <>
    <Header/>
      <main>{children}</main>
    <Footer/>
    </>
  )
}

export default LayoutHeaderFooter;
