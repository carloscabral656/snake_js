export default class Snake {

    constructor(){
        this.body = []
        this.length = 5
        this.alive = true
        this.velocity = 700
    }

    head(){
        return this.body[0]
    }

    generateHead(scenario){
        const x = Math.floor(Math.random() *  scenario.width)
        const y = Math.floor(Math.random() *  scenario.height)
        return [x, y]
    }

    init(scenario) {
        let [x, y] = this.generateHead(scenario)
        this.body.push([x, y])
        this.createBody()
    }

    createBody(){
        let head = this.head()
        let x = head[0]
        let y = head[1]
        for(let i = 0 ; i < (this.length-1) ; i++){
            y++
            this.body.push([x, y])
        }
    }

    blockReverseMovement(nextMoviment){
        return (
            nextMoviment[0] === this.body[1][0] &&
            nextMoviment[1] === this.body[1][1]
        )
    }

    headHeatBody(head){
        return this.body.some((b, i, _) => {
            if(i !== 0){
                return (
                    b[0] === head[0] &&
                    b[1] === head[1]
                )
            }
        })
    }

    direction(){
        let head = this.head()
        let second = this.body[1]
        if(
            head[0] === second[0] &&
            (head[1]+1) === second[1]
        ){
            
            return "up"
        } else if(
            (head[0]+1) === second[0] &&
            head[1] === second[1]
        ) {
            return "left"
        } else if(
            (head[0]-1) === second[0] &&
            head[1] === second[1]
        ) {
            return "right"
        } else if (
            head[0] === second[0] &&
            (head[1]-1) === second[1]
        ){
            return "down"
        }
    }

    up(){
        let currenthead = this.head()
        let nextHead = [currenthead[0], currenthead[1]-1]
        if(this.blockReverseMovement(nextHead)) return;
        if(!this.headHeatBody(nextHead)){
            this.body.unshift(nextHead)
            this.body.pop()
        }else{
            this.die()
        }
    }

    right(){
        let currenthead = this.head()
        let nextHead = [currenthead[0]+1, currenthead[1]]
        if(this.blockReverseMovement(nextHead)) return;
        if(!this.headHeatBody(nextHead)){
            this.body.unshift(nextHead)
            this.body.pop()
        } else {
            this.die()
        }
    }

    left(){
        let currenthead = this.head()
        let nextHead = [currenthead[0]-1, currenthead[1]]
        if(this.blockReverseMovement(nextHead)) return;
        if(!this.headHeatBody(nextHead)){
            this.body.unshift(nextHead)
            this.body.pop()
        }else{
            this.die()
        }
    }

    down(){
        let currenthead = this.head()
        let nextHead = [currenthead[0], currenthead[1]+1]
        if(this.blockReverseMovement(nextHead)) return;
        if(!this.headHeatBody(nextHead)){
            this.body.unshift(nextHead)
            this.body.pop()
        }else{
            this.die()
        }
    }

    eat(){
        let last = this.body[this.body.length-1]
        this.body.push([last[0], last[1]-1])
        this.velocity += 50
    }

    crawl(){
        this.body.push([last[0], last[1]-1])
    }

    die(){
        this.alive = false
    }
    
    isAlive() { return this.alive === true }

    toString(){
        let head = this.head()
        const snake = {
            head: head,
            body: this.body
        }
        return snake
    }

}