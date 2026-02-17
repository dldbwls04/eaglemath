import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Resources from './pages/Resources';
import LoginPage from './pages/LoginPage';
import AcademyIntro from './pages/AcademyIntro';
import Branches from './pages/Branches';
import ResultsArchive from './pages/ResultsArchive';
import ResultsDetail from './pages/ResultsDetail';
import Counseling from './pages/Counseling';
import Elementary from './pages/Elementary';
import Middle from './pages/Middle';
import Hwangso from './pages/Hwangso';
import KMA from './pages/KMA';
import CollegePrep from './pages/CollegePrep';
import Programs from './pages/Programs';
import Admission from './pages/Admission';
import CounselingLogs from './pages/CounselingLogs';

// Basic Protected Route Component
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return children;
};

// Placeholder for other pages to prevent 404s during demo
const PagePlaceholder = ({ title }) => (
  <div className="max-w-7xl mx-auto px-4 py-20">
    <h1 className="text-4xl font-bold text-slate-900 mb-6">{title}</h1>
    <p className="text-lg text-slate-600">준비 중인 페이지입니다.</p>
  </div>
);

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />

          {/* About Routes */}
          <Route path="about" element={<PagePlaceholder title="독수리수학 소개" />} />
          <Route path="about/intro" element={<AcademyIntro />} />
          <Route path="about/branches" element={<Branches />} />
          <Route path="about/results" element={<ResultsArchive />} />
          <Route path="about/results/:id" element={<ResultsDetail />} />

          {/* Elem/Middle Routes */}
          <Route path="elementary-middle" element={<PagePlaceholder title="초/중등부" />} />
          <Route path="elementary" element={<Elementary />} />
          <Route path="elementary/hwangso" element={<Hwangso />} />
          <Route path="middle" element={<Middle />} />
          <Route path="kma" element={<KMA />} />

          {/* High School Routes */}
          <Route path="high-school" element={<PagePlaceholder title="고등부" />} />
          <Route path="high-school/2028-admission" element={<CollegePrep />} />
          <Route path="high-school/programs" element={<Programs />} />

          {/* Resources Routes */}
          <Route path="resources" element={<PagePlaceholder title="학습자료" />} />
          <Route path="resources/counseling-logs" element={<CounselingLogs />} />
          <Route path="resources/exam-analysis" element={<PagePlaceholder title="기출문제 분석" />} />
          <Route path="resources/materials" element={
            <ProtectedRoute>
              <Resources />
            </ProtectedRoute>
          } />

          {/* Contact Routes */}
          <Route path="contact" element={<PagePlaceholder title="예약 & 문의" />} />
          <Route path="contact/admission" element={<Admission />} />
          <Route path="contact/counseling" element={<Counseling />} />

          {/* 404 */}
          <Route path="*" element={<PagePlaceholder title="페이지를 찾을 수 없습니다" />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
