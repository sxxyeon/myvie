import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import "../styles/globals.scss";
import { LoginProvider } from "./../context/LoginContext";
import { Suspense } from "react";
import TopButton from "@/components/common/TopButton";
export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <div id="wrap">
          <LoginProvider>
            <Header />
            <Suspense fallback={<div>Loading...</div>}>
              <div className="cont_wrap">{children}</div>
            </Suspense>
            <Footer />
          </LoginProvider>
          <TopButton />
        </div>
      </body>
    </html>
  );
}
