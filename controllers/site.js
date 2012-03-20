module.exports = SiteController.inherits( autodafe.Controller );

function SiteController( params ) {
  this._init( params );
}


SiteController.prototype.index = function( params, client ) {
  this.send_response( 'WebPlayer', client );
};