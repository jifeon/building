/////////////////////////////////////////////////////////////////
// данный класс размещает объекты недвижимости на яндекс.карте

function basemap(options)
{
  this.map = null;
  this.objects = null;
  this.obtypes = null;

  this.define_markstyles = function()
  {
    for(k in this.obtypes)
	{	
     markStyle = new YMaps.Style();
     markStyle.iconStyle = new YMaps.IconStyle();
     markStyle.iconStyle.href = this.obtypes[k].icon;
     markStyle.iconStyle.size = new YMaps.Point(28, 30);
     markStyle.iconStyle.offset = new YMaps.Point(-10, -30);
		
     //markStyle.balloonContentStyle = new YMaps.BalloonContentStyle(new YMaps.Template("<b>$[name]</b><div>$[description]</div>"));
	 
	 this.obtypes[k].mark_style = markStyle;
    }	
  }
  
  this.__construct = function(options)
  {  
   var obj = this;

   this.map = options.map;
   this.objects = options.objects;
   this.obtypes = options.obtypes;
   
   if(options.additdata != undefined)
   {
    this.container = $(options.additdata.container);
    this.lever = $(options.additdata.lever);
   
    this.lever.removeClass('cdb_show_map_link_inactive').addClass('cdb_show_map_link');
    this.lever.bind('click', function () {   
				if(obj.container.css('display') == 'none')
                 obj.container.slideDown();
				else
				 obj.container.slideUp();
				 
                obj.map.redraw(); // ѕерерисовка карты
                return false;
            });
   }
   
   this.define_markstyles();
  }
	
  this.add_mark = function(obj)
  {
   if(obj.centertothis)
    this.map.setCenter(new YMaps.GeoPoint(obj.x, obj.y));
  
   // клонируем объект
   var markStyle = $.extend(true, {}, this.obtypes['type_'+obj.type.toString()].mark_style);
   if(obj.nobaloon)
   {
	markStyle.hasBalloon = false;
	//markStyle.interactive = YMaps.Interactivity.NONE;
   }   
  
   var mark = new YMaps.Placemark(new YMaps.GeoPoint(obj.x, obj.y), {style: markStyle});
   mark.name = obj.name;
   
   mark.description = '<div class="map_balloon_container"><div class="map_balloon_title"><a href="'+obj.link+'">'+obj.name+'</a><div class="clear_both"></div></div><div class="map_balloon_address">'+obj.address+'</div><div class="map_balloon_pic"><a href="'+obj.link+'">'+obj.picture+'</a><div class="clear_both"></div></div></div>';
   
   //mark.description = '<table cellpadding="0" cellspacing="0" border="0" class="basemap_balloon"><tr><td class="bb_picture">'+(obj.picture ? '<a target="_blank" href="'+obj.link+'">'+obj.picture+'</a>' : '')+'</td><td class="bb_content"><div class="bb_c_name"><a target="_blank" href="'+obj.link+'">'+obj.name+'</a></div><div class="bb_c_address">'+obj.address+'</div><div class="bb_c_description"></div></div></td></tr></table>';
   this.map.addOverlay(mark);
  }

  this.render = function()
  {
   for(obj_ in this.objects)
    this.add_mark(this.objects[obj_]);
  }
	
  this.__construct(options);
};

