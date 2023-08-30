import Apple from "./Apple.js"

export default class Scenario {
    
    constructor(width, height, window){
        this.width  = width;
        this.height = height;
        this.struct = null;
        this.constructScenarioStruct();
        this.window = window
        this.snake
        this.apple = new Apple()
        this.callbacksListeners = (event) => this.handleKeys(event)
    }

    constructScenarioStruct(){
        const qtColumns = this.width;
        const qtLines   = this.height;
        const scenario = document.createElement('table')
        for(let lines = 0 ; lines < qtLines; lines++){
            let line = document.createElement('tr')
            for(let columns = 0 ; columns < qtColumns; columns++){
                let column = document.createElement('td')
                column.setAttribute("id",`${columns},${lines}`)
                line.append(column)
            }
            scenario.append(line)
        }
        this.struct = scenario
    }   
    
    renderScenario(){
        const scenario = this.window.document.getElementById("scenario")
        scenario.append(this.struct)
    }

    cleanMap(){
        let snake = this.window.document.getElementsByClassName('snake')
        for(let i = 0; i < snake.length ; i++){
            snake[i].classList.remove('snake')
        }
    }

    createListeners(){
        this.window.document.addEventListener("keydown", this.callbacksListeners, false)
    }

    handleKeys(event){
        if(event.keyCode == 39){ // To Rigth
            this.snake.right()
            this.renderSnake()
        } else if(event.keyCode == 38){
            this.snake.up()
            this.renderSnake()
        } else if(event.keyCode == 37){
            this.snake.left()
            this.renderSnake()
        } else if(event.keyCode == 40){
            this.snake.down()
            this.renderSnake()
        }
        this.heatApple()
        console.log(this.snake.toString())
    }

    setSnake(snake){
        this.snake = snake
    }

    renderSnake(){
        this.cleanMap()
        let body = [...this.snake.body]
        let head = [...this.snake.head()]
        body.unshift(head)
        body.forEach(b => {
            const s = this.window.document.getElementById(b.toString())
            s.classList.add('snake')
        });
    }

    heatApple(){
        if(
            this.snake.head()[0] === this.apple.position[0] &&
            this.snake.head()[1] === this.apple.position[1]
        ) {
            this.cleanApple()
            this.snake.eat()
            this.renderSnake()
            this.spawApple()
        }
    }

    cleanApple(){
        this.window.document.getElementsByClassName('apple')[0].classList.remove('apple')
    }

    spawSnake(){
        this.snake.init(this)
    }

    spawApple(){
        this.apple.setPosition(this)
        this.renderApple()
    }

    renderApple(){
        const apple = this.window.document.getElementById(this.apple.position.toString())
        apple.classList.add('apple')
    }
     
}