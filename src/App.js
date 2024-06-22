import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from './pages/Dashboard'
import CourseList from './pages/CourseList'
import CourseDetails from './pages/CourseDetails'
import './App.css';

function App() {
  return (
    <div>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CourseList />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="course-details" element={<CourseDetails />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
