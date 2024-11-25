import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppMainContent from "./component/AppMainContent";
import DetailsPage from "./pages/DetailsPage";
import NotFoundPage from "./pages/NotFoundPage";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppMainContent />} />
        <Route path="/details/:id" element={<DetailsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
