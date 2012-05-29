module.exports = SiteController.inherits( autodafe.Controller );

function SiteController( params ) {
  this._init( params );
}


SiteController.prototype.index = function( params, client ) {
  this.send_response( 'WebPlayer', client, {
    obj_name : 'building'
  } );
};


SiteController.prototype.house = function( params, client ) {
  this.send_response( 'WebPlayer', client, {
    obj_name : 'house'
  } );
};

SiteController.prototype.first_person = function( params, client ) {
  this.send_response( 'WebPlayer', client, {
    obj_name : 'first_person'
  } );
};

SiteController.prototype.hospital = function( params, client ) {
  this.send_response( 'WebPlayer', client, {
    obj_name : 'hospital'
  } );
};

SiteController.prototype.admiral = function( params, client ) {
  this.send_response( 'WebPlayer', client, {
    obj_name : 'admiral'
  } );
};