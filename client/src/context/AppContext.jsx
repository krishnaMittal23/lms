import { createContext, useEffect, useState } from "react";
import { dummyCourses } from "../assets/assets";
import { useNavigate } from "react-router";
import humanizeDuration from "humanize-duration"


export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const currency = import.meta.env.VITE_CURRENCY;

    const navigate = useNavigate();

  const [allCourses, setAllCourses] = useState([]);

  const [isEducator, setisEducator] = useState(true);
  const [enrolledCourses, setenrolledCourses] = useState([]);



  const fetchAllCourses = async () => {
    console.log("fetching dummyCourses", dummyCourses);
    setAllCourses(dummyCourses);
  };

  const calculateRating = (course)=>{
    if(course.courseRatings.length ===0)return 0;
    let totalrating=0;
    course.courseRatings.forEach(rating => {
      totalrating+=rating.rating
    });

    return totalrating/course.courseRatings.length;
  }

  //fn to calculate course chapter time
  const calculateChaptertime = (chapter)=>{
    let time=0;
    chapter.chapterContent.map((lecture)=> time+=lecture.lectureDuration)
    return humanizeDuration(time * 60 *1000, {units: ["h","m"]})
  }

  //fn to calculate course duration
  const calculateCourseDuration = (course)=>{
    let time=0;
    course.courseContent.map((chapter)=> chapter.chapterContent.map((lecture)=> time+=lecture.lectureDuration))
    return humanizeDuration(time * 60 *1000, {units: ["h","m"]})
  }

  //total number of lectures in course
  const calculateNoOfLectures = (course)=>{
    let total=0;
    course.courseContent.forEach(chapter => {
      if(Array.isArray(chapter.chapterContent)){
        total+=chapter.chapterContent.length
      }
    });
    return total;
  }

  // fetch user enrolled courses
  const fetchUserEnrolledCourses = async()=>{
    setenrolledCourses(dummyCourses)
  }

  useEffect(() => {
    fetchAllCourses();
    fetchUserEnrolledCourses();
  }, []);

  

  const value = {
    currency,
    allCourses,
    navigate,
    calculateRating,
    isEducator,
    setisEducator,
    calculateChaptertime,
    calculateNoOfLectures,
    calculateCourseDuration,
    enrolledCourses,
    fetchUserEnrolledCourses
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};
