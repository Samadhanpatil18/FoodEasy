import { useEffect, useState, useRef } from 'react'
import { hightlightsSlides } from '/src/constants/data.js';
import pauseImg from '/src/assets/images/pause.svg';
import playImg from '/src/assets/images/play.svg';
import replayImg from '/src/assets/images/replay.svg';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const VideoCarousel = () => {

  const videoRef = useRef([]);
  const videoSpanRef = useRef([]);
  const videoDivRef = useRef([]);

  const [video, setVideo] = useState({
    isEnd : false,
    startPlay : false,
    isPlaying : false,
    videoId : 0 ,
    isLastVideo : false
  })

  const { isEnd, startPlay, isPlaying, videoId, isLastVideo } = video;
  
  const [loadedData,setLoadedData] = useState([]);

  useGSAP (() => {

    gsap.to('#slider', {
      transform : `translateX(${-100 * videoId}%)`,
      duration : 2,
      ease : 'power2.inOut',
    })

    gsap.to('#video', {
      startAt : "top10%",
      scrollTrigger: {
        trigger: '#video',
        toggleActions: 'restart none none none',
      },
      onComplete: () => {
        setVideo((pre) => ({
          ...pre,
          startPlay: true,
          isPlaying: true,
        }))
      }
    })
  }, [isEnd, videoId])

  useEffect(() => {
    if (loadedData.length > 4) {
      if(!isPlaying) {
        videoRef.current[videoId].pause();
      } else {
        startPlay && videoRef.current[videoId].play();
      }
    }
  },[startPlay, isPlaying, videoId, loadedData])

  const handleLoadedMetaData = (i, e) => {
    setLoadedData((pre) => [...pre, e])
  };

  useEffect (() => {
    let currentProgress = 0;
    let span = videoSpanRef.current;

    if(span[videoId]) {
      // animate the progress of the video
      let anim = gsap.to(span[videoId], {
        onUpdate: () => {
          const progress = Math.ceil(anim.progress() * 100);
          if(progress != currentProgress){
            currentProgress = progress;

            gsap.to(videoDivRef.current[videoId], {
              width : window.innerWidth < 1000 ? '10vw' : '4vw'
            })

            gsap.to(span[videoId], {
              width : `${currentProgress}%`,
              backgroundColor : 'white'
            })
          }
        },
        onComplete: () => {
          if(isPlaying) {
            gsap.to(videoDivRef.current[videoId], {
              width: '12px'
            })
            gsap.to(span[videoId], {
              backgroundColor: '#afafaf'
            })
          }
        }
      })

      if (videoId === 0) {
        anim.restart();
      }

      const animUpdate = () => {
        if (videoRef.current && videoRef.current[videoId]) {
          const videoElement = videoRef.current[videoId];
          const videoDuration = hightlightsSlides[videoId].videoDuration;
          
          // Ensure the video has started playing
          if (videoElement.currentTime !== undefined) {
            anim.progress(videoElement.currentTime / videoDuration);
          }
        }
      }

      if(isPlaying) {
        gsap.ticker.add(animUpdate)
      } else {
        gsap.ticker.remove(animUpdate)
      }
    }
  }, [videoId, startPlay])

  function handleProcess(type, i){
    switch(type) {
      case 'video-end':
        setVideo((pre) => ({...pre, isEnd: true, videoId: i + 1 }))
        break;
      case 'video-last':
        setVideo((pre) => ({...pre, isLastVideo: true,}))
        break;
        case 'video-reset':
          setVideo((pre) => ({...pre, isLastVideo: false, videoId: 0}))
          break;
      case 'play':
        setVideo((pre) => ({...pre, isPlaying: !pre.isPlaying}))
        break;
      case 'pause':
        setVideo((pre) => ({...pre, isPlaying: !pre.isPlaying}))
        break;
      default:
        return video;
    }
  }
  
  return (
    <>
    <div id='carousel-div' className="flex items-center">
      {
        hightlightsSlides.map((list,i) => (
          <div id="slider" className='sm:pr-20 pr-10' key={list.id}>
            <div className="video-carousel-container">
              <div className="w-full h-full flex-center rounded-3xl overflow-hidden bg-black">
                <video id='video' preload='auto' muted playsInline={true} 
                ref={(el) => (videoRef.current[i] = el)}
                className={`pointer-events-none opacity-85`}
                onEnded={() => 
                  i !== 4 ?
                  handleProcess('video-end', i) :
                  handleProcess('video-last', i)
                }
                onPlay={() => {
                  setVideo ((prevVideo) => ({
                    ...prevVideo, isPlaying: true
                  }))
                }} 
                onLoadedMetadata={(e) => handleLoadedMetaData(i, e)}
                >
                  <source src={list.video} type='video/mp4' />
                </video>
              </div>

              <div className="absolute top-12 left-[5%]">
                {
                  list.textLists.map((text) => (
                    <p key={text} className='font-medium text-lg sm:text-xl lg:text-2xl text-white font-bold'>
                      {text}
                    </p>
                  ))
                }
              </div>
            </div>
          </div>
        ))
      }
    </div>
    <div className="flex-center relative mt-10">
      <div id='carousel-progressbar' className="py-5 px-7 flex-center rounded-full backdrop-blur bg-blue-200">
      {videoRef.current.map((_,i) => (
          <span key={i} ref={(el) => (videoDivRef.current[i] = el)} className='relative w-3 h-3 bg-gray-200 rounded-full mx-2 cursor-pointer'> 
            <span className="absolute w-full h-full rounded-full" key={i} ref={(el) => (videoSpanRef.current[i] = el)} />
          </span>
      ))}
      </div>
      <button type="button" className='control-btn bg-blue'>
        <img src={
          isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg
        } 
        alt={ isLastVideo ? "replay" : !isPlaying ? "play" : "pause" }
        onClick={ isLastVideo ? () => handleProcess('video-reset') :
          !isPlaying ? () => handleProcess('play') : () => handleProcess('pause') } 
        />
      </button>
    </div>
    </>
  )
}

export default VideoCarousel;