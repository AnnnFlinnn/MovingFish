$(document).ready(function(){
  
$(".left").click(function(){
  $(".fish").animate({"left": "-=50px"},0); 
});
   
$(".right").click(function(){
  $(".fish").animate({"left": "+=50px"},0); 
  $(".fish").stop();
  });
  
$(".top").click(function(){
  $(".fish").animate({"top": "-=50px"},0);
  });
  
$(".botton").click(function(){
  $(".fish").animate({"top": "+=50px"},0);
  });

$(".topleft").click(function(){
  $(".fish").animate({"top": "-48px"},0);
  $(".fish").animate({"left": "0px"},0);
  });
  
$(".bottomright").click(function(){
  $(".fish").animate({"top": "335px"},0);
  $(".fish").animate({"left": "1236px"},0);
  });
  
});

$("#go").click(function(){
  var a1 = '+=700px'
  $(".fish").animate({left: a1}, 2000);
});
   
$("#stop").click(function(){ 
  $(".fish").stop();
});

$("#first").click(function(){ 
		var x=0, y=0;
		 var sx='', sy='';
		 var x0=0, y0=0;
		 var rev=0, l=0;; // 
		 var lmax=8; // количество проходов туда+обратно


		 var fishx = 178;
		 var fishy = 178; 
		 var fishy1 = 48;
		 var fishy2 = 48; 
		  
		 var xb=0;
		 var yb=0;
		  
		 var xe=0+1414-fishx;
		 var ye=0+465-fishy;
		   
		x=xb;
		y=Math.round((ye-yb)/2);
		sx = (x-x0)>0?''+(x-x0).toString()+'px':''+(x0-x).toString()+'px';
		sy = (y-y0)>0?''+(y-y0).toString()+'px':''+(y0-y).toString()+'px';
		//alert (sx +' ; '+ sy);
		$(".fish").stop();  
		$(".fish").css("left", sx); 
		$(".fish").css("top", sy); 

});
   

   
$("#back").click(function(){
   
  $(".fish").animate({left: '-=100px'}, 2000);
   
});

function TrackFxSin(x, xb, yb, xe, ye){
  return Math.round(((ye-yb)/2) * Math.sin((180*4/(xe-xb)) * x * Math.PI/180))
}

function TrackFxEllipce(x, rev, xb, yb, xe, ye){
  var result;
  result = (rev==0?1:-1)* Math.round(
    ((ye-yb)/2) * Math.sqrt( 
     (1 - (Math.pow((x-((xe-xb)/2)), 2) / (Math.pow(((xe-xb)/2), 2))))
    )
  );
  return result
}

$("#auto").click(function(){
  
		 var x=0, y=0;
		 var sx='', sy='';
		 var x0=0, y0=0;
		 var rev=0, l=0;; // 
		 var lmax=2; // количество проходов туда+обратно


		 var fishx = 178;//размер картинки рыбки
		 var fishy = 178;//размер картинки рыбки 
		 var fishy1 = 48;//расстояние от верхнего края картинки до верхнего плавника.
		 var fishy2 = 48;//расстояние от нижнего края картинки до нижнего плавника. 
		  
		 // область в которой будут плавать рыбы не выплывая за размеры аквариума
		 var xb=0;
		 var yb=0;
		 var xe=0+1414-fishx;
		 var ye=0+465-fishy;

		// установим рыбок на исходную позицию
		x=xb;
		y=Math.round((ye-yb)/2);
		
		//sx = (x-x0)>0?''+(x-x0).toString()+'px':''+(x0-x).toString()+'px';
		//sy = (y-y0)>0?''+(y-y0).toString()+'px':''+(y0-y).toString()+'px';
		
		var pos = calcPosition(x,y);

		$(".fish").css({"left":pos.sx,"top":pos.sy}); 
		  
		  
		while (l < lmax) {
		  
		  if (rev == 0) {
			 y = TrackFxSin(x, xb, yb, xe, ye) ;
			 if (rev == 1) {y=(-1)*y;}
		  }
		  else
			y = TrackFxEllipce(x, rev, xb, yb, xe, ye) ;
		  
		  //x = (3673*x0+1753) % 4;
		  //y = (79*y0+241) % 4;
		  //alert(x +' ; '+y);
		 // l=l+1;
		 
		 
		  // start animate
		  // 	params:
		  //			x, y
		  // 	properties:
		  //			x0, y0
		  
		  
			// calc position
			sx = (x-x0)>0?'+='+(x-x0).toString()+'px':'-='+(x0-x).toString()+'px';
			sy = (y-y0)>0?'+='+(y-y0).toString()+'px':'-='+(y0-y).toString()+'px';
		  // end calc position
		  
		  
			$(".fish").animate({"left": sx}, 2); 
			$(".fish").animate({"top": sy}, 2); 
		  // end animate

		  x0 = x;
		  y0 = y;
			
		   if (rev == 0) {
			x=x+4;
		  }
		  else {
			x=x-4;
		  }
		  if (x >= xe) {
			rev = 1;
			l=l+1;
			x = xe;
		  }
		  if (x < 0) {
			rev = 0;
			x = 0;
			l=l+1;
		  }
		 
		  
		 }
 

  
   
});





function Fish(){
	
	// приватные параметры - доступны для изменения только из методов
	var x0 = 0;
	var y0 = 0;
	
	// приватный метод - доступен для вызова только изнутри текущей области видимости
	function calcPosition(x,y){
		var result = {
						sx: "",
						sy: ""
					};
		
		result.sx = (x-x0)>0?'+='+(x-x0).toString()+'px':'-='+(x0-x).toString()+'px';
		result.sy = (y-y0)>0?'+='+(y-y0).toString()+'px':'-='+(y0-y).toString()+'px';
		
		return result;
	
	}
	
	
	
	// эта функция позволяет вызывать методы снаружи
	function fishHandle(){
			
	};
	
	// method
	fishHandle.moveTo = function (x,y){
		var pos = calcPosition(x,y);
		
		$(".fish").animate({"left": sx}, 2); 
		$(".fish").animate({"top": sy}, 2); 
	}
	
	fishHandle.resetPosition(){
		
	}
	
	
	return fishHandle;
};
//}();

fish1 = Fish();
fish2 = Fish();
fish3 = Fish();


fish1.resetPosition();
fish1.moveTo(x1,y1);

///


Fish.moveTo(x1,y1);

