import { Route, Routes } from 'react-router-dom';
import UploadExam from './screens/UploadExam';

export default function AppRoutes() {
  return (
    <>
      {/* <Header /> */}
      <Routes>
        <Route path="/upload" element={<UploadExam />} />
      </Routes>
    </>
  );
}
