module.exports = function(app, user){
	//простой файл на рендеринг, ничего магического.
  app.get('/test', function(req,res){
    res.render('test', {data: user});
  });

};
