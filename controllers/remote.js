module.exports = Remote.inherits( global.autodafe.Controller );

function Remote( params ) {
  this._init( params );
}


Remote.prototype.show = function(response, request){
  response.view_name('remote').send({
    obj_name : request.params.model || 'ember',
    width    : request.params.width || 700,
    height   : request.params.height || 400
  } );
}