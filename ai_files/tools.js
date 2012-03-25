/*
 дополнительные функции JS
 */

// определение платформы
//(/(win|mac|linux|sunos|solaris|iphone)/.exec(navigator.platform.toLowerCase()) || [u])[0].replace('sunos', 'solaris') 

// клонирование объекта
// newobj = jQuery.extend(true, {}, source_object);
 
/*
var rusChars = new Array('а','б','в','г','д','е','ё','ж','з','и','й','к','л','м','н','о','п','р','с','т','у','ф','х','ч','ц','ш','щ','э','ю','\я','ы','ъ','ь', ' ', '\'', '\"', '\#', '\$', '\%', '\&', '\*', '\,', '\:', '\;', '\<', '\>', '\?', '\[', '\]', '\^', '\{', '\}', '\|', '\!', '\@', '\(', '\)', '\-', '\=', '\+', '\/', '\\');
var transChars = new Array('a','b','v','g','d','e','jo','zh','z','i','j','k','l','m','n','o','p','r','s','t','u','f','h','ch','c','sh','csh','e','ju','ja','y','', '', '_', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '');

function translit(from)
  {
  from = from.toLowerCase();
  var to = "";
  var len = from.length;
  var character, isRus;
  for(var i=0; i < len; i++)
    {
    character = from.charAt(i,1);
    isRus = false;
    for(var j=0; j < rusChars.length; j++)
      {
      if(character == rusChars[j])
        {
        isRus = true;
        break;
        }
      }
    to += (isRus) ? transChars[j] : character;
    }
	
   return to;
 };
*/
 
 /////////////////////////////////////////
 // инверсия строки
 String.prototype.inverse = function()
 {
   newstr = '';
   for(i = this.length-1; i >= 0; i--)
    newstr += this.charAt(i);
  
   return newstr;
 };

 /////////////////////////////////////////
 // знак числа
 Math.sign = function(val)
 {
  if(val < 0)
   return -1;
  
  return 1;
 };

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ТУТАЧКИ у нас навешивание функционала на DOM-элементы
 
(function($){

  /////////////////////////////////////////
  // получает координаты элемента на странице
  // применение: $('selector').coords();
  $.fn.coords = function()
  {
	var box = this.get(0).getBoundingClientRect();
	var body = document.body;
	var docElem = document.documentElement;
	     
	var scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop;
	var scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft;
     
	var clientTop = docElem.clientTop || body.clientTop || 0;
	var clientLeft = docElem.clientLeft || body.clientLeft || 0;
	     
	var top  = box.top +  scrollTop - clientTop;
	var left = box.left + scrollLeft - clientLeft;
     
	return { y: Math.round(top), x: Math.round(left) };
  };
  
  /////////////////////////////////////////
  // отсекает все не-цифровые символы в input
  // применение: $('selector')._uinteger_only();
  $.fn.uinteger_only = function()
  {
	 if(!this.is('input[type="text"]'))
	  return false;
  
		function uint(event)
		{
			key = event.keyCode || event.which;

			allowed = [37, 39, 8, 46, 35, 36, 13];
			for(var index in allowed)
			if(allowed[index] == key)
				return true;
 
			if(key >= 48 && key <= 57)
				return true;
  
			if(key >= 96 && key <= 105) // numpad
				return true;
  
			return false;
		}
		
		this.keydown(function(event){return uint(event);});
  };

  /////////////////////////////////////////
  // устанавливает значение по-умолчанию 
  // для input text
  // form - указатель на форму. отслеживает момент
  // submit`а формы и очищает input от значения по-умолчанию
  // применение $('input').default_value('Поиск...', $(form));  
  $.fn.default_value = function(dval, form)
  {
	 //if(!this.is('input[type="text"]') || !dval)
	 // return false;
	 
     var obj = this;
	 
	 if(obj.val() == '')
	  obj.val(dval);
	 
     this.bind('change', function(){
		if(!obj.val().length)
		 obj.val(dval);
	 });
	 this.bind('focusin', function(){
		if(obj.val() == dval)
		 obj.val('');
	 });
	 this.bind('focusout', function(){
		if(!obj.val().length)
		 obj.val(dval);
	 });
	 
	 if(form)
	 {
	  form.bind('submit', function(){
		if(obj.val() == dval)
			obj.val('');
	  });
	 }
  };

  /////////////////////////////////////////
  // заполняет select значениями по ключу
  // хэш-массива  
  $.fn.fill_by_key = function(key, list, empty_label)
  {
	 var sel = $(this);
	 
	 if(!sel.is('select'))
	  return false;
	 
	 var k = 0;
	 key = 'item_'+key;
	 
	 //alert(list[key]);
	 sel.empty();
	 if(empty_label)
	  sel.append('<option>'+empty_label+'</option>');
	 for(k in list[key])
          if(list[key][k].text != undefined)
	   sel.append('<option value="'+list[key][k].val+'">'+list[key][k].text+'</option>');
  };

  /////////////////////////////////////////
  // масштабирует изображение в браузере
  // $('img').resample({height: 200, width: 300});
  $.fn.resample = function(params)
  {
	var obj = $(this);
	if(!obj.is('img'))
		return this;
 
	var picture_h = params.height;
	var picture_w = params.width;

	var w = obj.width();
	var h = obj.height();
		
	//alert('H: '+h+' W: '+w);

	var k_width = picture_w/w;

	if(k_width >= 1)
		return this;

	w = k_width*w;
	h = k_width*h; // уменьшили высоту на тот же коэффициент
		
	// теперь смотрим, умещается ли высота, и уменьшаем ширину
	var k_height = picture_h/h;
	if(k_height < 1)
	{
		h = k_height*h;
		w = k_height*w; // уменьшили ширину на тот же коэффициент
	}
		
	obj.css('height', Math.round(h));
	obj.css('width', Math.round(w));  
  };
	
  $.fn.maxHeight = function()
  {
	var max = -1;
	$(this).each(function(){
		var h = $(this).height();
		
		if(h > max)
		 max = h;
	});
	
	return max;
  }
	
  $.extend({

    implode: function(delim, arr)
    {
     var str = '';
     var i = 0;
 
     for(i = 0; i < arr.length; i++)
      if(arr[i] != undefined)
       str += arr[i].toString()+(i < arr.length - 1 ? delim : '');

     return str;
    },

  /////////////////////////////////////////
  // разбивает строку на триады и собирает обратно  	
    price_triada: function(act, value)
    {
		value = value.toString();
	
		if(act == 'from')
		{
			return value.replace(/\s+/gi, '');
		}
		else if(act == 'to')
		{
			value = value.replace(/\s+/gi, '').inverse();
			
			newstr = '';
			for(i=0;i<value.length;i++)
			{
				if(i > 0 && (i % 3 == 0))
				 newstr += ' ';
				 
				newstr += value.charAt(i);
			}
			
			return newstr.inverse();
		}
   
		return '';
	},

  preload_images: function(a)
  { 
    var d=document; 
  
    if(d.images)
    {
     if(!d.MM_p)
      d.MM_p=new Array();
   
     var i, j = d.MM_p.length;//, a = _preload_images.arguments; 
   
     for(i = 0; i < a.length; i++)
      if (a[i].indexOf("#")!=0)
	  {
	   d.MM_p[j]=new Image;
	   d.MM_p[j++].src=a[i];
	  }
    }
  },
  
  is_ie8: function()
  {
   return $.browser.msie && $.browser.version.substr(0,1) == '8';
  }
	
  });
  
})( jQuery );


/*
/////////////////////////////////////////
// координаты курсора на странице
var mouseX = 0;
var mouseY = 0;
function mousePageXY(e){
    if (!e) e = window.event;
        if (e.pageX || e.pageY){
            mouseX = e.pageX;
            mouseY = e.pageY;
        }else if (e.clientX || e.clientY){
            mouseX = e.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft) - document.documentElement.clientLeft;
            mouseY = e.clientY + (document.documentElement.scrollTop || document.body.scrollTop) - document.documentElement.clientTop;
        }
    }
document.onmousemove = function(e){mousePageXY(e)};
*/