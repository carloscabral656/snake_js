import Apple from "./Apple.js";

export default class Scenario {
  constructor(width, height, window) {
    this.width = width;
    this.height = height;
    this.struct = [];
    this.scenario = null;
    this.bounderies = [];
    this.availableScenarioApple = [];
    this.window = window;
    this.snake;
    this.apple = new Apple();
    this.callbacksListeners = (event) => this.handleKeys(event);
    this.score = 0;
    this.crawlInterval = null;
  }

  calculateCellSize() {
    const availableHeight = this.window.innerHeight * 0.7;
    const availableWidth = this.window.innerWidth * 0.7;
    const cellSizeByHeight = Math.floor(availableHeight / this.height);
    const cellSizeByWidth = Math.floor(availableWidth / this.width);
    const size = Math.min(cellSizeByHeight, cellSizeByWidth);
    return size > 0 ? size : 1;
  }

  constructScenarioStruct() {
    const qtColumns = this.width;
    const qtLines = this.height;
    const cellSize = this.calculateCellSize();
    const scenario = document.createElement("table");
    for (let lines = 0; lines < qtLines; lines++) {
      let line = document.createElement("tr");
      for (let columns = 0; columns < qtColumns; columns++) {
        let column = document.createElement("td");
        column.setAttribute("id", `${columns},${lines}`);
         column.style.width = `${cellSize}px`;
         column.style.height = `${cellSize}px`;
        line.append(column);
        this.struct.push([columns, lines]);
      }
      scenario.append(line);
    }
    this.scenario = scenario;
  }

  renderScenario() {
    const scenario = this.window.document.getElementById("scenario");
    scenario.append(this.scenario);
  }

  createBoundaries() {
    for (let line = 0; line < this.height; line++) {
      for (let column = 0; column < this.width; column++) {
        if (
          column == 0 ||
          line == 0 ||
          column == this.width - 1 ||
          line == this.height - 1
        ) {
          let e = this.window.document.getElementById(`${column},${line}`);
          e.classList.add("bound");
          this.bounderies.push([column, line]);
        }
      }
    }
  }

  heatBound() {
    let [x, y] = this.snake.head();
    return this.bounderies.some(function (b) {
      return b[0] == x && b[1] == y;
    });
  }

  cleanSnake() {
    this.snake.body.forEach((b) => {
      let s = this.window.document.getElementById(b.toString());
      s.classList.remove("snake");
    });
  }

  renderSnake() {
    this.snake.body.forEach((b) => {
      let s = this.window.document.getElementById(b.toString());
      s.classList.add("snake");
    });
  }

  createListeners() {
    this.window.document.addEventListener(
      "keydown",
      this.callbacksListeners,
      false
    );
  }

  handleKeys(event) {
    this.cleanSnake();
    if (event.keyCode == 39) {
      this.snake.right();
    } else if (event.keyCode == 38) {
      this.snake.up();
    } else if (event.keyCode == 37) {
      this.snake.left();
    } else if (event.keyCode == 40) {
      this.snake.down();
    }
    this.renderSnake();
    this.heatApple();
    if (this.heatBound()) {
      this.snake.die();
    }
    this.checkGameOver();
  }

  setSnake(snake) {
    this.snake = snake;
  }

  updateScore() {
    const scoreElement = this.window.document.getElementById("score");
    if (scoreElement) {
      scoreElement.textContent = `Score: ${this.score}`;
    }
  }

  heatApple() {
    if (
      this.snake.head()[0] === this.apple.position[0] &&
      this.snake.head()[1] === this.apple.position[1]
    ) {
      this.cleanApple();
      this.snake.eat();
      this.renderSnake();
      this.score++;
      this.updateScore();
      this.spawApple();
    }
  }

  cleanApple() {
    this.window.document
      .getElementsByClassName("apple")[0]
      .classList.remove("apple");
  }

  spawSnake() {
    this.snake.init(this);
    this.renderSnake();
    this.updateScore();
  }

  spawApple() {
    let position = this.generatePositionApple();
    this.apple.setPosition(position);
    this.renderApple();
  }

  renderApple() {
    const apple = this.window.document.getElementById(
      this.apple.position.toString()
    );
    apple.classList.add("apple");
  }

  checkGameOver() {
    if (!this.snake.isAlive()) {
      if (this.crawlInterval !== null) {
        this.window.clearInterval(this.crawlInterval);
        this.crawlInterval = null;
      }
      this.window.document.removeEventListener(
        "keydown",
        this.callbacksListeners,
        false
      );
      alert("Game Over!!");
      this.window.location.reload();
    }
  }

  createCrawl() {
    this.crawlInterval = this.window.setInterval(() => {
      let d = this.snake.direction();
      if (d === "up") {
        this.cleanSnake();
        this.snake.up();
        this.renderSnake();
      } else if (d === "left") {
        this.cleanSnake();
        this.snake.left();
        this.renderSnake();
      } else if (d === "right") {
        this.cleanSnake();
        this.snake.right();
        this.renderSnake();
      } else if (d === "down") {
        this.cleanSnake();
        this.snake.down();
        this.renderSnake();
      }
      this.renderSnake();
      this.heatApple();
      if (this.heatBound()) {
        this.snake.die();
      }
      this.checkGameOver();
    }, 100);
  }

  createAvailableScenarioApple() {
    let availableScenario = this.struct.filter((s) => {
      return !this.bounderies.some((b) => {
        return s[0] === b[0] && s[1] === b[1];
      });
    });
    this.availableScenarioApple = availableScenario;
  }

  generatePositionApple() {
    let i = Math.floor(
      Math.random() * (this.availableScenarioApple.length - 1)
    );
    return this.availableScenarioApple[i];
  }
}
