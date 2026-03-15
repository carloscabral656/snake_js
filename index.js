import Scenario from "./entities/Scenario.js"
import Snake from "./entities/Snake.js"

// Dimensões menores para o cenário (colunas, linhas)
let scenario = new Scenario(30, 40, window)
scenario.constructScenarioStruct()
scenario.renderScenario()
scenario.createBoundaries()
scenario.createAvailableScenarioApple()

let snake = new Snake()
scenario.setSnake(snake)
scenario.createCrawl()
scenario.createListeners()
scenario.spawSnake()
scenario.spawApple()




