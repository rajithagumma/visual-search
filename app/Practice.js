import { useEffect, useState } from "react";

export default function Practice(){
    const array=[{src:'/Images/Stim.014.png',res:'N'},{src:'/Images/Stim.058.png',res:'Y'}];
    const [currentIndex,setCurrentIndex]=useState(0);
    const [feedback,setFeedback]=useState('');
    const [showFeedback,setShowFeedback]=useState(false);
    const [responses, setResponses]=useState([]);
    useEffect(()=>{
        const handleKeyPress=(event)=>{
            const key=event.key.toUpperCase();
            if (key==='Y' || key=='N'){
                handleResponse(key);
            }
        };
        window.addEventListener('keydown',handleKeyPress);
        return ()=>{
            window.removeEventListener('keydown',handleKeyPress);
        }
    },[currentIndex, responses]);
    const handleResponse=(userResponse)=>{
        const isCorrect=userResponse===array[currentIndex].res;
        const result= isCorrect ? 'Great, you got it right!': 'Incorrect.The red triangle was there, so the correct response was:Y';
        setResponses((prev)=>[
            ...prev,{image:array[currentIndex].src,userResponse,isCorrect}
        ]);
        setFeedback(result);
        setShowFeedback(true);
        setTimeout(()=>{
            setShowFeedback(false);
            if (currentIndex<array.length-1){
                setCurrentIndex((prev)=>prev+1);
            }
        },1000)
    }
    return (
        <div className='practice' style={{textAlign:"center"}}>
            <h1>Is there a red triangle?</h1>
            <h1>Y=yes,N=No</h1>
            <img src={array[currentIndex].src} alt={`img-${currentIndex}`} style={{width:'300px'}}/>
            {showFeedback && <h1>{feedback}</h1>}
        </div>
    );
}