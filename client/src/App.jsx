import React from 'react'
import { Route, Routes, useMatch } from 'react-router'
import Home from "./pages/student/Home"
import Loading from "./components/student/Loading"
import CoursesList from "./pages/student/CoursesList"
import CourseDetails from "./pages/student/CourseDetails"
import Player from "./pages/student/Player"
import Myenrollments from './pages/student/Myenrollments'
import Educator from './pages/educator/Educator'
import Dashboard from './pages/educator/Dashboard'
import StudentsEnrolled from './pages/educator/StudentsEnrolled'
import Mycourses from './pages/educator/Mycourses'
import AddCourse from './pages/educator/AddCourse'
import Navbar from './components/student/Navbar'
import "quill/dist/quill.snow.css";

const App = () => {

  const isEducatorRoute = useMatch('/educator/*');

  return (
    <div className='text-default bg-white min-h-screen'>

      {!isEducatorRoute && <Navbar/>}
      

    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/course-list' element={<CoursesList />} />
      <Route path='/course-list/:input' element={<CoursesList />} />
      <Route path='/course/:id' element={<CourseDetails />} />
      <Route path='/my-enrollments' element={<Myenrollments />} />
      <Route path='/player/:courseId' element={<Player />} />
      <Route path='loading/:path' element={<Loading />} />
      <Route path='/educator' element={<Educator/>}>
          <Route path='/educator' element={<Dashboard/>}/>
          <Route path='add-course' element={<AddCourse/>}/>
          <Route path='my-courses' element={<Mycourses/>}/>
          <Route path='student-enrolled' element={<StudentsEnrolled/>}/>
      </Route>
      
    </Routes>

    </div>
  )
}

export default App