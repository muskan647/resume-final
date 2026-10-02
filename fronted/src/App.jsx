import { Routes, Route } from "react-router-dom";
import UploadForm from "./pages/UploadForm";
import Resume from "./pages/Resume";

function App() {
  return (
    <Routes>
      <Route path="/" element={<UploadForm />} />
      <Route path="/resume" element={<Resume />} />
    </Routes>
  );
}

export default App;
