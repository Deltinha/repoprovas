import { Route, Routes } from 'react-router-dom';
import ProfessorExams from './screens/ProfessorExams';
import Professors from './screens/Professors';
import UploadExam from './screens/UploadExam';

export default function AppRoutes() {
  return (
    <>
      {/* <Header /> */}
      <Routes>
        <Route path="/upload" element={<UploadExam />} />
        <Route path="/professors" element={<Professors />} />
        <Route path="/professors/:id" element={<ProfessorExams />} />
      </Routes>
    </>
  );
}
