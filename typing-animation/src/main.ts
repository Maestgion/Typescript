import './style.css'
import Typewriter from './typewriter'


const typewriter = new Typewriter(document.querySelector(".whitespace") as HTMLDivElement || null, {
    loop : true,
    typingSpeed: 10,
    deletingSpeed: 10,

})


typewriter
  .typeSentence("Helllloo Anujjj!!!")
  .pauseFor(1000)
  .typeSentence("\n\n Wanna listen your favourite songss!??")
  .deleteChars(7)
  .typeSentence("Okie then, ")
  .pauseFor(150)
  .deleteAll()
  .typeSentence("Here we go!!!")
  .pauseFor(1000)
  .typeSentence("\n\n Playing Kesariya!")
  .pauseFor(1000)
  .typeSentence("\n\n Next in the queue: Apna bana le!")
  .pauseFor(1000)
  .deleteAll()
  .start()
