// #############################################
// ������� ����
// �������:
// + jquery
// + jstools

(function($){$.fn.lavamenu = function(options){function operations(options, dom){this.dom = dom;
// #############################################
   
   // properties ����� �Ѩ ���������
   this.selected_item = -1; // �������� ����� ����. ��� ���������. �� ����� ��� � ���������� ������ -1
   this.current_item = -1; // ��� �������, �� ������� ������ ����� ������
   
   // methods
   this.show_selection = function(item)
   {
    var index = $(item).attr('item_index');
    var ai = this.items[index];
	var obj = this;

    var fx_delay = 0;
	var fx_duration = 0;	
	if(this.has_active()) // ������� ������ �������. ������ ����������� ��� ���� ����
	{
	 fx_duration = 300;
	 this.runner.stop(true).animate({left: ai.x, width: ai.width}, fx_duration);
	}
	else
	{
	 if(this.shown) // ������� ��� �������, ��� ����� �����������
	 {
	  fx_duration = 300;
	  this.runner.stop(true).show().css('opacity', 100).animate({left: ai.x, width: ai.width}, fx_duration, function(){});
	 }
	 else // ������� �� �� �������, ��� ���� ���������� �� ������ ������� � �������� ����������
	 {
	  fx_duration = 200;
	 
	  this.shown = true;
	  this.runner.stop(true).css('left', ai.x).css('width', ai.width).fadeIn(fx_duration, function(){});
	 }
	}
	
    if(this.need_chcolor())
	{
	 // ���� "���������" �������� ���� ���� ��������, � �������� ��������� ������
	 if(this.current_item != index && (this.current_item > 0))
	 {
	  $('a', this.items[this.current_item].dom).stop(true).animate({color: this.bgcolor}, 100);
	 }
	
	 // ������ ���� ����� ��������
	 $('a', ai.dom).delay(fx_delay).animate({color: this.fgcolor}, fx_duration);
	}
	
	this.current_item = index;
   }

   this.fade_selection = function(item)
   {
    var index = $(item).attr('item_index');
    var ai = this.items[index];
	var obj = this;
   
    var fx_delay = 0;
	var fx_duration = 0;
	if(this.has_active()) // ������� �������, �� ������ ����� ��������� �� ����, ������� ������� �� �������� �����
	{
	 /*
	 fx_delay = 200;
	 fx_duration = 300;
	
	 var active = this.items[this.selected_item];
	 this.runner.delay(fx_delay).animate({left: active.x, width: active.width}, fx_duration);
	 */
	 this.show_selection(this.items[this.selected_item].dom);
	}
	else // ��� ��������� �� ������ ���� �� ��� 300 ��, ����� �������� ������ � ������� ���� ������
	{
	 fx_delay = 300;
	 fx_duration = 200;
	
	 this.runner.delay(fx_delay).fadeOut(fx_duration, function(){obj.shown = false});
	}
	
    if(this.need_chcolor() && index != this.selected_item)
	{
	  $('a', ai.dom).delay(fx_delay).animate({color: this.bgcolor}, fx_duration);
	}
	
   }
   
   //########################################################
   
   this.eval_onselect = function(obj)
   {
    if(this.on_select !== undefined)
	 this.on_select(obj);
   }

   this.eval_ondeselect = function(obj)
   {
    if(this.on_deselect !== undefined)
	 this.on_deselect(obj);
   }
   
   this.has_active = function()
   {
	return this.selected_item > 0;
   }

   // ���������� �������, ����� ���� �������� ����� ����
   this.set_active = function()
   {
    if(this.selected_item < 0)
	 return;
	 
	var ai = this.items[this.selected_item];
	 
	this.eval_onselect(ai.dom);
	this.runner.css('left', ai.x).css('width', ai.width+'px').css('display', 'block');
	
	if(this.need_chcolor())
	  $('a', ai.dom).css('color', this.fgcolor);
	
	this.current_item = this.selected_item;
   }
   
   this.need_chcolor = function()
   {
	return this.bgcolor && this.fgcolor;
   }
   
   // constructor
   this.__construct = function(options)
   {
    // ����� ��� �������� this.dom
	this.runner = $(options.runner, this.dom);
	
	this.on_select = options.onSelect;
	this.on_deselect = options.onDeSelect;
	
	this.bgcolor = options.inactive_color || false;
	this.fgcolor = options.active_color || false;
	
	var obj = this;
	var index = -1;
	// ������ ���������� ������, �������� �� ���������� � ������
	this.items = [];
	$('li', this.dom).filter(':not('+options.slider+')').each(function(){
	
		var item = $(this);
		index++;
	
		// ���� ���� �������� ����� ����
		if(item.is(options.initial))
		{
			obj.selected_item = index;
			//return;
		}
	
		obj.items.push({
			dom: item,
			x: item.coords().x - obj.dom.coords().x,
			width: item.width()
		});
		
		$(this).attr('item_index', index);
		
		// � ����� ������� ����������� ���������
		$(this).bind('mouseover', function(){obj.show_selection(this)});
		$(this).bind('mouseout', function(){obj.fade_selection(this)});
	});
	
	this.set_active();
   }
   this.__construct(options);
   
// #############################################   
}return new operations(options, this);}})( jQuery );