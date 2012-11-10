
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' })
};

exports.poi = function(req, res){
    res.send(req.params.id);
};

exports.suggest = function(req, res){
    res.send('epic todo');
};
