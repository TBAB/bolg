

day_arr=["Sunday", "Monday", "Tuesday","Wednesday","Thursday","Friday","Saturday"];
month_arr=["January","February","March","April","May","June","July","August","September","October","November","December"];

function indicator(size, cns, clockd)
{
  if(clockd.hasOwnProperty("indicate_color")){cns.strokeStyle=clockd["indicate_color"];}else{cns.strokeStyle="#333";}
  cns.lineWidth=2;

  for(var a=0;a<12;a++)
  {
    var r=parseInt(a)*0.523;
    var calc=Math.cos(r-1.57);
    var y=Math.sin(r-1.57);

    if(a%3==0){var ekstra=size/50;}else{var ekstra=0;}
    cns.beginPath();
    cns.moveTo(calc*(size/3+ekstra)+(size/2),y*(size/3+ekstra)+(size/2));
    cns.lineTo(calc*size/3.25+(size/2),y*size/3.25+(size/2));
    cns.stroke();
    cns.fill();
    cns.closePath();
  }
}

function time_add(x, y, size, cns, clockd)
{
  if(!clockd.hasOwnProperty("time_add"))
  {
    return;
  }
  
  var now=new Date();
  var time_off=(clockd.hasOwnProperty("timeoffset"))?clockd["timeoffset"]:0;
  now.setTime(now.getTime()+time_off*1000);
  var sec=now.getSeconds();
  var min=now.getMinutes();
  var hour=(clockd.hasOwnProperty("time_24h") && clockd["time_24h"])?now.getHours():now.getHours()%12;

  if(hour==0){hour=12;}
  if(hour<10){hour="0"+hour;}
  if(min<10){min="0"+min;}
  if(sec<10){sec="0"+sec;}
  cns.lineWidth=1;
  cns.fillStyle=(clockd.hasOwnProperty("time_add_color")?clockd["time_add_color"]:"#fff");
  cns.textBaseline="middle";
  cns.textAlign="center";
  cns.font=size/15+"px Arial";

  switch(parseInt(clockd["time_add"]))
  {
    case 1:
      cns.fillText(hour+":"+min+":"+sec,x,y);
    break;
    case 2:
      cns.fillText(hour+":"+min,x,y);
    break;
    case 3:
      hour=now.getHours();
        if(hour<10){hour="0"+hour;}
    cns.fillText(hour+":"+min+":"+sec,x,y);
    break;
    default:
      hour=now.getHours();
      if(hour<10){hour="0"+hour;}
      cns.fillText(hour+":"+min,x,y);
  }
}

function date_add(x, y, size, cns, clockd)
{
  if(!clockd.hasOwnProperty("date_add"))
  {
    return;
  }
  
  var now=new Date();
  var time_off=(clockd.hasOwnProperty("timeoffset"))?clockd["timeoffset"]:0;
  now.setTime(now.getTime()+time_off*1000);
  var day=now.getDate();
  var year=now.getFullYear();
  var month=now.getMonth()+1;

  if((month)<10){month="0"+(month);}
  if(day<10){day="0"+day;}

  cns.lineWidth=1;
  cns.fillStyle=clockd["date_add_color"];
  cns.textBaseline="middle";
  cns.textAlign="center";
  cns.font=size/20+"px Arial";

  switch(parseInt(clockd["date_add"]))
  {
    case 1:
      cns.fillText(day+"/"+month+"/"+year,x,y);
    break;
    case 2:
      cns.fillText(month+"/"+day+"/"+year,x,y);
    break;
    case 3:
      day=now.getDay();
      cns.fillText(day_arr[day],x,y);
    break;
    case 4:
      month=now.getMonth();
      cns.fillText(month_arr[month]+" "+day,x,y);
    break;
    default:
      month=now.getMonth();
      cns.fillText(day+" "+month_arr[month],x,y);
  }
}


function clock_dots(size, cns, clockd)
{
  cns.clearRect(0,0,size,size);

  cns.beginPath();

  //背景颜色
  if(clockd.hasOwnProperty("bg_color")){cns.fillStyle=clockd["bg_color"];}else{cns.fillStyle="rgba(0,0,0,.0)";}
  cns.rect(0,0,size,size);
  cns.fill();
  cns.closePath();
  if(clockd.hasOwnProperty("bgLoaded") && clockd.bgLoaded==1){if(clockd.hasOwnProperty("bg_opacity")){cns.globalAlpha=clockd["bg_opacity"];cns.drawImage(clockd.bgImage,0,0,size,size);cns.globalAlpha=1;}}

  if((clockd.hasOwnProperty("indicate") && clockd.indicate==true) || !clockd.hasOwnProperty("indicate"))
  {
  indicator(size, cns, clockd);
  }

  if(clockd.hasOwnProperty("time_add") && clockd.time_add)
  {
  time_add((size/2),size/6*3, size, cns, clockd);
  }

  if(clockd.hasOwnProperty("date_add") && clockd.date_add)
  {
  date_add((size/2),size/6*3+size/10, size, cns, clockd);
  }

  var now=new Date();
  var time_off=(clockd.hasOwnProperty("timeoffset"))?clockd["timeoffset"]:0;
  now.setTime(now.getTime()+time_off*1000);
  var milisec=now.getMilliseconds();
  var sec=now.getSeconds();
  var min=now.getMinutes();
  var hour=now.getHours()%12;
  
  cns.fillStyle=(clockd.hasOwnProperty("dial3_color"))?clockd["dial3_color"]:"#333333";
  cns.strokeStyle=(clockd.hasOwnProperty("dial3_color"))?clockd["dial3_color"]:"#333333";
  cns.lineCap="round";
  for(var a=0;a<(sec+1);a++)
  {
    var r=parseInt(a)*0.1046;
    var calc=Math.cos(r-1.57)*(size/2.8);
    var y=Math.sin(r-1.57)*(size/2.8);

    cns.beginPath();
    cns.arc(calc+(size/2),y+(size/2),size/100,0,6.28,0);
    cns.fill();
    cns.closePath();
  }

  cns.fillStyle=(clockd.hasOwnProperty("dial2_color"))?clockd["dial2_color"]:"#333333";
  cns.strokeStyle=(clockd.hasOwnProperty("dial2_color"))?clockd["dial2_color"]:"#333333";
  cns.lineCap="round";

  for(var a=0;a<(min+1);a++)
  {
    var r=parseInt(a)*0.1046;
    var calc=Math.cos(r-1.57)*(size/3.4);
    var y=Math.sin(r-1.57)*(size/3.4);

    cns.beginPath();
    cns.arc(calc+(size/2),y+(size/2),size/100,0,6.28,0);
    cns.fill();
    cns.closePath();
  }

  cns.fillStyle=(clockd.hasOwnProperty("dial1_color"))?clockd["dial1_color"]:"#333333";
  cns.strokeStyle=(clockd.hasOwnProperty("dial1_color"))?clockd["dial1_color"]:"#333333";
  cns.lineCap="round";

  for(var a=0;a<(hour+1);a++)
  {
    var r=parseInt(a)*0.523;
    var calc=Math.cos(r-1.57)*(size/4.5);
    var y=Math.sin(r-1.57)*(size/4.5);

    cns.beginPath();
    cns.arc(calc+(size/2),y+(size/2),size/100,0,6.28,0);
    cns.fill();
    cns.closePath();
  }

  clockd.timer=setTimeout(function(){clock_dots(size, cns, clockd)},50);
}

// 时钟的颜色
  clockd_={
			  "indicate": true,
			  "indicate_color": "#8990ff",
			  "dial1_color": "#49d01d",
			  "dial2_color": "#5bbbff",
			  "dial3_color": "#f8fdff",
			  "time_add": 1,
			  "time_24h": true,
			  "date_add":3,
			  "date_add_color": "#fff",
			};
	 
	
	  var c = document.getElementById('clock_');
	  cns_ = c.getContext('2d');			
	  clock_dots(100,cns_,clockd_);