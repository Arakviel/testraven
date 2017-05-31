var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: false});
var testController = require('./testController');
//тут подключаються разные модули, и файлы которые нужны для юзания.

module.exports = function(app) {
var user;
  app.get('/', function(req, res){
    res.render('index');
  });

  app.post('/test', urlencodedParser, function(req,res){
  //  global.counter++;
    global.counter = 1;
    global.stage = 1;
    global.points = 0;
    user= req.body;
    //рендерим первый уровень.
    var pic = '/Raven/a'+global.counter+'/'+ global.stage + '.jpg';
    res.render('test', {data: user, count:global.counter, picture:pic});
    //LOG PART
    console.log("Current state---------");
    console.log("counter " + global.counter);
    console.log("stage " + global.stage);
    console.log("points " + global.points);
    //LOG PART

  });

  //Визивается когда форма отправляет запрос ПОСТ. Это может быть при нажатии кнопки
  app.post('/test/go', urlencodedParser, function(req,res){
    global.counter++;
    global.stage++;
    //чекаем есть ли правильный ответ, если есть то плюсуем один.
    if(global.answers[global.stage] === req.body.a) {
      global.points++;
    }
    //смотрим чтоб не зайти за 60й уровень, дальше нету теста.
    if(global.stage > 60){
      res.render('end', {data:user, points:global.points, iq:Math.floor((global.points/60)*100)});
    } else {
    //загружаем фоточку в соотвецтвии с тем где у нас игрок.
    var pic = '/Raven/a'+ global.counter +'/'+ global.stage + '.jpg';
    res.render('go',{data:user, count:global.counter, picture:pic}); 

    //LOG PART
    console.log("Current state---------");
    console.log("Answer: " + req.body.a);
    console.log("Correct: " + global.answers[global.stage]);
    console.log("counter " + global.counter);
    console.log("stage " + global.stage);
    console.log("points " + global.points);
  }
  //  console.log("Answer: " +req.body.a);
  //  console.log("Correct: " +global.answers[global.stage]);
  //  console.log("Points: " +global.points );
  });
  //если юзверь зайдет на несуществующую страницу то вылетает такая вот штука
  app.get('*', function(req, res, next) {
  var err = new Error();
  err.status = 404;
  next(err);
});

  app.use(function(err, req, res, next) {
  if(err.status !== 404) {
    return next();
  }
  //с таким вот сообщением
  res.send(err.message || 'Что то не так :(');
});


};
