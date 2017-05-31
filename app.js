const express = require('express'); // используем фреймворк Експресс
var ravenController = require('./controllers/ravenController'); //это как инклуд в Ц

var app = express();
global.counter = 1;   //читальщик страниц в коде
global.points = 0;	  // балы за правильный ответ
global.stage = 1;     //снизу массив с парвильними ответами
global.answers = [null,null,'4','5','1','2','6','3','6','2','1','3','4','5',
                  '2','6','1','2','1','3','5','6','4','3','4','5',
                  '6','2','3','6','6','4','5','1','6','6','1','2',
                  '3','4','3','6','6','6','5','4','1','2','5','6',
                  '6','6','6','2','1','5','1','6','3','2','4','5'];
app.set('view engine', 'ejs'); //Для рендеринга страницы используем EJS

app.use(express.static(__dirname + '/assets')); //делаем папку ассетс статической
app.use("/test", express.static('assets')); 


ravenController(app); //визиваем контроллер в другом файлу под таким же названием

app.listen(3000); // Запускаем наш сервак на порте 3к.
console.log('Listening on 3000.'); //просто лог в консольку, ничего странного.
