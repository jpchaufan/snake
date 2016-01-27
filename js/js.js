function makeBoard(){
	var board = $('.snakeGame');
	var side = 40;
	var grid = side*side;
	var row = 1;
	while (row <= 40){
		for (var column = 1; column <= side; column++) {
			board.append('<div class="gridSq" row="' + row + '" col="' + column + '"></div>');
		};
		row += 1
	};
	
	
	
}
makeBoard();

function snakeGame(){
	var startingSize = 7
	var game = {
		paused: 1,
		food: [],
		score: startingSize,
		highscore: startingSize
	};
	var snake = {
		size: startingSize,
		position: [[20, 20]],
		direction: 'r'
	};
	function resetGame(){
		$('.snake').removeClass("snake");
		$('.food').removeClass("food");
		snake.size = startingSize;
		snake.position = [[20, 20]];
		snake.direction = 'r';
		game.paused = 0;
		game.food = [];
		game.score = 0;
		$('#current-score span').html(game.score);
		makeFood();
	};
	function initializeScore(){
		if (localStorage.getItem('highscore') != null){
			game.highscore = parseInt(localStorage.getItem('highscore'));
		}
		$('#current-score span').html(game.score);
		$('#high-score span').html(game.highscore);
	}
	function keepScore(){
		game.score = snake.size;
		
		if (game.score > game.highscore){
			game.highscore = game.score;
			localStorage.setItem('highscore', game.highscore);
		};
		$('#current-score span').html(game.score);
		$('#high-score span').html(game.highscore);
	};
	window.addEventListener('keydown', direct, false);
	function direct(e){
		if ((e.keyCode == '37') && snake.direction != 'r'){
			snake.direction = 'l';
		} else if ((e.keyCode == '38') && snake.direction != 'd'){
			snake.direction = 'u';
		} else if ((e.keyCode == '39') && snake.direction != 'l'){
			snake.direction = 'r';
		} else if ((e.keyCode == '40') && snake.direction != 'u'){
			snake.direction = 'd';
		} else if (e.keyCode == '32'){ //space bar - pause
			if (game.paused == 0){
				clearTimeout(time);
				game.paused = 1;
			} else {
				setTimeout(function(){
					move();
					game.paused = 0;
				},500);
				
			};
		};
	};
	window.addEventListener('keydown', startGame, false);
	function startGame(e){
		if (e.keyCode == '32'){
			$('.startMsg').remove();
			makeFood();
			window.removeEventListener('keydown', startGame, false);
		};
	};
	function checkSize(){
		if (snake.position.length > snake.size){
			snake.position.pop();
		};
	};
	function display(){
		var gridsq = $('.gridSq');
		//clear board
		$('.snake').removeClass("snake");
		
		//display snake
		for (var k = 0; k < snake.position.length; k++) {
			var xpos = snake.position[k][0];
			var ypos = snake.position[k][1];
			$('.gridSq[row=' + xpos + '][col=' + ypos + ']').addClass('snake');
		};	
	};
	function makeFood(){
		if (game.food <= 0){
			var delay = Math.random()*3000;
			setTimeout(function(){
				xpos = Math.floor((Math.random() * 40) + 1);
				ypos = Math.floor((Math.random() * 40) + 1);
				game.food.push([xpos, ypos]);
				$('.gridSq[row=' + xpos + '][col=' + ypos + ']').addClass('food');	
			}, delay);
		};
	};
	function eatFood(){
		for (var i = 0; i < game.food.length; i++) {
			if ((game.food[i][0] == snake.position[0][0]) && (game.food[i][1] == snake.position[0][1])){
				xpos = game.food[i][0];
				ypos = game.food[i][1];
				$('.gridSq[row=' + xpos + '][col=' + ypos + ']').removeClass('food');
				game.food.splice(i, 1);
				snake.size += 1;
				var randomFoodQuantity = Math.floor(Math.random()*5)+1;
				for (var i = 0; i < randomFoodQuantity; i++) {
					makeFood();
				};
				keepScore();
			}
		};
	}
	function collision(){
		var xpos = snake.position[0][0];
		var ypos = snake.position[0][1];
		if ((xpos > 40) || (xpos < 1) || (ypos > 40) || (ypos < 1)){
			resetGame();
		};
	};
	function selfCollision(){
		var xpos = snake.position[0][0];
		var ypos = snake.position[0][1];
		for (var i = 2; i < snake.position.length; i++) {
			if ((snake.position[i][0] == snake.position[0][0]) && (snake.position[i][1] == snake.position[0][1])){
				resetGame();
			};
		};
	};
	function move(){
		if (snake.direction == 'r'){
			snake.position.unshift([(snake.position[0][0]),(snake.position[0][1] + 1)]);		
		};
		if (snake.direction == 'l'){
			snake.position.unshift([(snake.position[0][0]),(snake.position[0][1] - 1)]);		
		};
		if (snake.direction == 'u'){
			snake.position.unshift([(snake.position[0][0] - 1),(snake.position[0][1])]);		
		};
		if (snake.direction == 'd'){
			snake.position.unshift([(snake.position[0][0] + 1),(snake.position[0][1])]);		
		};
		collision();
		selfCollision()
		eatFood();
		checkSize();
		display();
		
		time = setTimeout(function(){move();}, 250);
	};
	initializeScore()

	function earthquake(){
		var gameboard = $('.snakeGame');
		var gamelines = $('.gridSq');
		gameboard.css("background", "#573F09");
		gamelines.css("border-color", "1px dotted #573F09");
		setTimeout(function(){
			gameboard.css("background", "#cdcdcd");
			gamelines.css("border-color", "1px dotted #cdcdcd");
		},200);
		setTimeout(function(){
			gameboard.css("background", "#573F09");
			gamelines.css("border-color", "1px dotted #573F09");
		},400);
		setTimeout(function(){
			gameboard.css("background", "#cdcdcd");
			gamelines.css("border-color", "1px dotted #cdcdcd");
		},600);
		setTimeout(function(){
			gameboard.css("background", "#573F09");
			gamelines.css("border-color", "1px solid #573F09");
		},800);
		setTimeout(function(){
			gameboard.css("background", "#cdcdcd");
			gamelines.css("border-color", "1px dashed #cdcdcd");
		},1000);
		setTimeout(function(){
			gameboard.css("background", "#573F09");
			gamelines.css("border-color", "1px solid #573F09");
		},1200);
		setTimeout(function(){
			gameboard.css("background", "#cdcdcd");
			gamelines.css("border-color", "1px solid #cdcdcd");
		},1400);
		setTimeout(function(){
			gameboard.css("background", "#573F09");
			gamelines.css("border-color", "1px solid #573F09");
		},1600);
		setTimeout(function(){
			gameboard.removeAttr('style');
			gamelines.removeAttr('style');
		}, 1800);
		
	};
	
	
};

snakeGame();








