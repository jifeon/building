module.exports = SiteController.inherits( autodafe.Controller );

function SiteController( params ) {
  this._init( params );
}


SiteController.prototype.before_action = function( action, response, request ){
  response.view_name( 'WebPlayer').send({
    obj_name : action
  });

  return false;
};

SiteController.prototype.admiral = function(){}
SiteController.prototype.house = function(){}
SiteController.prototype.lodma = function(){}
SiteController.prototype.hospital = function(){}
SiteController.prototype.first_person = function(){}
SiteController.prototype.building = function(){}
SiteController.prototype.ember = function(){}