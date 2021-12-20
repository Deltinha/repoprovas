import { Route, Routes } from 'react-router-dom';
import Classes from './screens/Classes';
import ClassExams from './screens/ClassExams';
import Home from './screens/Home';
import ProfessorExams from './screens/ProfessorExams';
import Professors from './screens/Professors';
import UploadExam from './screens/UploadExam';

export default function AppRouter() {
  return (
    <>
      {/* <Header /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upload" element={<UploadExam />} />
        <Route path="/professors" element={<Professors />} />
        <Route path="/professors/:id" element={<ProfessorExams />} />
        <Route path="/classes" element={<Classes />} />
        <Route path="/classes/:id" element={<ClassExams />} />
      </Routes>
    </>
  );
}
