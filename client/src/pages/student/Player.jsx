import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import { useParams } from 'react-router'
import { assets } from '../../assets/assets'
import humanizeDuration from 'humanize-duration'
import YouTube  from 'react-youtube'
import Footer from '../../components/student/Footer'
import Rating from '../../components/student/Rating'

const Player = () => {

  const {enrolledCourses, calculateChaptertime} = useContext(AppContext)
  const {courseId} = useParams()
  const [courseData, setCourseData] = useState(null)
  const [openSections, setOpenSections] = useState({})
  const [playerData, setPlayerData] = useState(null)
  
 
  const getCourseData = () =>{
    enrolledCourses.map((course)=>{
      if(course._id === courseId){
        setCourseData(course)
      }
    })
  }

  const toggleSection = (index) =>{
    setOpenSections((prev)=>(
      {...prev, [index]: !prev[index]}
    ))
  }

  useEffect(()=>{
    getCourseData()
  },[enrolledCourses])


  return (
    <>
    <div className='p-4 sm:p-10 flex flex-col-reverse md:grid md:grid-cols-2 gap-10 md:px-36'>
      {/*left column */}
      <div className='text-gray-800'>
        <h2 className='text-xl font-semibold'>Course Structure</h2>
  <div className='pt-5'>
                {courseData && courseData.courseContent.map((chapter, index)=>(
                  <div key={index} className='border border-gr bg-white mb-2 rounded'>
                    <div  className='flex items-center justify-between px-4 py-3 cursor-pointer select-none'>
                      <div className='flex items-center gap-2' onClick={()=> toggleSection(index)}>
                        <img className={`transform transition-transform ${openSections[index] ? "rotate-180" : ""}`} src={assets.down_arrow_icon}  alt="arrow icon" />
                        <p className='font-medium md:text-base text-sm'>{chapter.chapterTitle}</p>
                      </div>
                      <p className='text-sm md:text-default'>{chapter.chapterContent.length} lectures - {calculateChaptertime(chapter)}</p>
                    </div>

                    <div className={`overflow-hidden transition-all duration-300 ${openSections[index] ? "max-h-96":"max-h-0"}`}>
                      <ul className='list-disc md:pl-10 pl-4 pr-4 py-2 text-gray-600 border-t border-gray-300'>
                        {chapter.chapterContent.map((lecture, i)=>(
                          <li className='flex items-start gap-2 py-1' key={i}>
                            <img  src={false ? assets.blue_tick_icon :assets.play_icon} alt="play icon" className='w-4 h-4 mt-1' />
                            <div className='flex items-center justify-between w-full text-gray-800 text-xs md:text-default'>
                              <p>{lecture.lectureTitle}</p>
                              <div className='flex gap-2'>
                                {lecture.lectureUrl && <p
                                onClick={()=>setPlayerData({
                                 ...lecture, chapter:index+1, lecture:i+1
                                })} 
                                className='text-blue-500 cursor-pointer'>Watch</p>}
                                <p>{humanizeDuration(lecture.lectureDuration * 60 * 1000, {units:["h","m"]})}</p>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
              <div className='flex items-center gap-2 py-3 mt-10'>
                <h1 className='text-xl font-bold'>Rate this Course</h1>
                <Rating initialRating={0}/>
              </div>
      </div>

      {/*right column */}
      <div className="md:mt-10">
  {playerData ? (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Video embed */}
      <YouTube
        videoId={playerData.lectureUrl.split("/").pop()}
        iframeClassName="w-full aspect-video rounded-t-lg"
      />

      {/* Lecture details and Mark Complete button */}
      <div className="p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">

        {/* Lecture details */}
        <div>
          <p className="text-gray-800 font-semibold text-base">
            {playerData.chapter}.{playerData.lecture} {playerData.lectureTitle}
          </p>
          
        </div>

        {/* Mark Complete button */}
        <button
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-green-600 text-white rounded-md shadow-md transition-all duration-300"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          {false ? "Completed" : "Mark Completed"}
        </button>

      </div>
    </div>
  ) : (
    <img
      src={courseData ? courseData.courseThumbnail : ""}
      alt=""
      className="rounded-lg shadow-lg"
    />
  )}
</div>

    </div>
    <Footer/>
    </>
  )
}

export default Player