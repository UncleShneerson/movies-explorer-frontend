import Header from "../Header/Header";
import Footer from "../Footer/Footer";

function LayoutHeaderFooter ({ innerComponent: Component, ...props }) {
  return(
    <>
    <Header/>
      <main><Component {...props} /></main>
    <Footer/>
    </>
  )
}

export default LayoutHeaderFooter;
