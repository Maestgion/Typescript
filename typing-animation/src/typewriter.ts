// action elements in form of the functions
type ActionItem = ()=>Promise<void> 

export default class typewriter{
    #action: ActionItem[] = []
    #element: HTMLElement
    #typingSpeed: number
    #deletingSpeed: number
    #loop: boolean


    constructor(parent: HTMLElement, {loop=false, typingSpeed=50, deletingSpeed=50}={})
    {
        this.#element = document.createElement("div")
        parent.append(this.#element)
        this.#deletingSpeed = deletingSpeed
        this.#typingSpeed = typingSpeed
        this.#loop = loop
    }

    // displaying current string on the screen
    typeSentence(string:string)
    {
        this.#addAction(resolve=>{
            let i = 0;
            const intervalId = setInterval(()=>{
                this.#element.innerText += string[i]

                if(i>=string.length)
                {
                    clearInterval(intervalId)
                    resolve()
                }
            }, this.#typingSpeed)
        })
    }

    // deleting characters 

    deleteChars(number: number)
    {
        this.#addAction(resolve=>{
            let i=0
            const intervalId = setInterval(()=>{
                this.#element.innerText = this.#element.innerText.slice(0, -1)

                if(i>=number)
                {
                    clearInterval(intervalId)
                    resolve()

                }
            }, this.#deletingSpeed)
        })
    }

    // deleting whole senetence
    deleteAll()
    {
        this.#addAction(resolve=>{
            const intervalId = setInterval(()=>{
                this.#element.innerText = this.#element.innerText.slice(0, -1)
                if(this.#element.innerText.length===0)
                {
                    clearInterval(intervalId)
                    resolve()
                }
            }, this.#deletingSpeed)
        })
    }

    // pause
    pauseFor(duration: number)
    {
        this.#addAction(resolve=>{
            setTimeout(resolve, duration)
        })
    }

    // start
    start()
    {
        
    }

    // adding action to the actions array by using a callback function cb which returns nothing

    #addAction(cb: (resolve:()=>void)=>void) 
    {
        this.#action.push(()=>new Promise(cb))
    }




}

