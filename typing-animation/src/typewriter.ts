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
}

