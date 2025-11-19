// src/components/Layout.jsx
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";


export default function Layout({ children }) {
  return (
    <>
      <Header />       {/* Always appears at the top */}
      <main>{children}</main>  {/* Page-specific content */}
      <Footer />       {/* Always appears at the bottom */}
    </>
  );
}
