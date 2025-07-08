// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Home from "./Pages/Home";
// import OurServices from "./Pages/OurServices";
// import Jobs from "./Pages/Jobs";
// import JobDetails from "./Pages/JobDetails";
// import Internship from "./Pages/Internship";
// import Industries from "./Pages/Industries";
// import IndustriesDetails from "./Pages/IndustriesDetails";
// import Blogs from "./Pages/Blogs";
// import BlogsDetails from "./Pages/BlogsDetails";
// import Dashboard from "./Admin/Dashboard";
// import ServicesDetails from "./Pages/ServicesDetails";
// import Contact from "./Pages/Contact";
// import Resume from "./Pages/Resume";
// import { AuthProvider } from './AuthContext';

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/services" element={<OurServices />} />
//         <Route path="/jobs" element={<Jobs />} />
//         <Route path="/job/:id" element={<JobDetails />} />           {/* Dynamic job detail */}
//         <Route path="/internship" element={<Internship />} />
//         <Route path="/industries" element={<Industries />} />
//         <Route path="/industries/:id" element={<IndustriesDetails />} /> {/* Dynamic industry detail */}
//         <Route path="/blogs" element={<Blogs />} />
//         <Route path="/blog/:id" element={<BlogsDetails />} />        {/* Dynamic blog detail */}
//         <Route path="/dashboard" element={<Dashboard />} />
//         <Route path="/service/:id" element={<ServicesDetails/>} />
//         <Route path="/contact" element={<Contact/>} />
//         <Route path="/resume" element={<Resume/>} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;

// App.js
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import OurServices from "./Pages/OurServices";
import Jobs from "./Pages/Jobs";
import JobDetails from "./Pages/JobDetails";
import Internship from "./Pages/Internship";
import Industries from "./Pages/Industries";
import IndustriesDetails from "./Pages/IndustriesDetails";
import Blogs from "./Pages/Blogs";
import BlogsDetails from "./Pages/BlogsDetails";
import Dashboard from "./Admin/Dashboard";
import ServicesDetails from "./Pages/ServicesDetails";
import Contact from "./Pages/Contact";
import Resume from "./Pages/Resume";
import { AuthProvider } from '../src/Components/AuthContext';
import ProtectedRoute from '../src/Components/ProtectedRoute';
import About from "./Pages/About";
import Team from "./Pages/Team";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<OurServices />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/job/:id" element={<JobDetails />} />
          <Route path="/internship" element={<Internship />} />
          <Route path="/industries" element={<Industries />} />
          <Route path="/industries/:id" element={<IndustriesDetails />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/about" element={<About/>} />
          <Route path="/team" element={<Team/>} />
          <Route path="/blog/:id" element={<BlogsDetails />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/service/:id" element={<ServicesDetails />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/resume" element={<Resume />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
