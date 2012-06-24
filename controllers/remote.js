module.exports = Remote.inherits( autodafe.Controller );

function Remote( params ) {
  this._init( params );
}


Remote.prototype.show = function(params, client){
  this.send_response( 'remote', client, {
    obj_name : params.model || 'ember',
    width    : params.width || 700,
    height   : params.height || 400
  } );
}