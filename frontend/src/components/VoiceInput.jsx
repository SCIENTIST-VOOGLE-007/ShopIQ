import { useState } from "react"

function VoiceInput({onResult}){

const [listening,setListening]=useState(false)

const startVoice=()=>{

const recognition=new window.webkitSpeechRecognition()

recognition.lang="en-US"

recognition.start()

setListening(true)

recognition.onresult=(e)=>{

const text=e.results[0][0].transcript

onResult(text)

setListening(false)

}

}

return(

<button className={`voice-btn ${listening?"listening":""}`} onClick={startVoice}>

🎤 {listening?"Listening...":"Voice"}

</button>

)

}

export default VoiceInput