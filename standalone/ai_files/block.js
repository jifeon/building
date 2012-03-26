(function($){$.fn.block = function(options){function operations(options, dom){this.dom = dom;
// #############################################
   
   // properties
   
   // methods
   this.showhide = function()
   {
    var obj = this;
   
	if(this.shown)
	{
		obj.fade.show();
		this.dom.animate({height: this.height}, this.speed, function(){
		obj.shown = false;
		obj.button.html('����������');
		});
	}
	else
		this.dom.animate({height: this.origin_height}, this.speed, function(){
		obj.shown = true;
		obj.button.html('��������');
		obj.fade.hide();
		});
   }
   
   // constructor
   this.__construct = function(options)
   {
    // ����� ��� �������� this.dom
	this.height = options.height;
	this.controller = $(options.controller);
	this.button = $('.oob_li_bottom_text', this.controller);
	this.fade = $('.oob_left_info_open', this.controller);
	
	this.origin_height = this.dom.height();
	
	this.speed = options.speed || 300;
	
	if(this.origin_height > this.height)
	{
		this.dom.css('height', this.height);
		this.controller.css('display', 'block');
		
		var obj = this;
		this.button.bind('click', function(){obj.showhide()});
		
		this.shown = false;
	}
	else
	 this.shown = true;
   }
   this.__construct(options);
   
// #############################################   
}return new operations(options, this);}})( jQuery );