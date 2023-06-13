// action elements in form of the functions
type ActionItem = ()=>Promise<void> 

export default class Typewriter{
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
                this.#element.innerText+=string[i]
                i++
                if(i>=string.length)
                {
                    clearInterval(intervalId)
                    resolve()
                }
            }, this.#typingSpeed)
        })

        return this
    }

    // deleting characters 

    deleteChars(number: number)
    {
        this.#addAction(resolve=>{
            let i=0
            const intervalId = setInterval(()=>{
                this.#element.innerText = this.#element.innerText.slice(0, -1)
                i++
                if(i>=number)
                {
                    clearInterval(intervalId)
                    resolve()

                }
            }, this.#deletingSpeed)
        })

        return this
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

        return this
    }

    // pause
    pauseFor(duration: number)
    {
        this.#addAction(resolve=>{
            setTimeout(resolve, duration)
        })

        return this
    }

    // start
    async start()
    {
        let cb = this.#action.shift()
        while(cb!=null)
        {
            await cb()
            if(this.#loop){
                this.#action.push(cb)
            }

            cb = this.#action.shift()
        }

        return this
    }

    // adding action to the actions array by using a callback function cb which returns nothing

    #addAction(cb: (resolve:()=>void)=>void) 
    {
        this.#action.push(()=>new Promise(cb))
    }




}

