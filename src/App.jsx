import { Route, Routes } from "react-router-dom";

// Components
import LayoutHeader from "@components/layout-header";
import LayoutFooter from "@components/layout-footer";

// Pages
import HomePage from "@pages/HomePage";

function App() {
  return (
    <>
      <LayoutHeader />

      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>

      <LayoutFooter />
    </>
  );
}

export default App;
