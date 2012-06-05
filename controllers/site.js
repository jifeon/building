module.exports = SiteController.inherits( autodafe.Controller );

function SiteController( params ) {
  this._init( params );
}


SiteController.prototype.before_action = function( action, params, client ){
  this.send_response( 'WebPlayer', client, {
    obj_name : action
  } );

  return false;
};