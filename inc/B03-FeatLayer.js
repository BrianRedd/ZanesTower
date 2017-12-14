

Zincs++;
ZVERappend[18] = "B03";
// ******VERSION******
ZVER[18] = 0.105

//FEAT LAYER
var areashape = '<area shape="rect"'
document.write('<div id="FeatLayer" style="position:absolute; width:'+featwid+';');
document.write('z-index:1; height:'+feathei+'; left: '+featleft+'; top: 10">');
document.write("<img src='images/features/2"+NSEW+".gif' width='"+featwid+"' ");
document.write("height='"+feathei+"' border='0' usemap='#featmap'>");
document.write('<map name="featmap">');
document.write(areashape+' coords="0,0,'+ww+','+wh+'" href="javascript:left();" ');
if (difficulty == 1) document.write('alt="Turn Left (A or 4)"');
document.write('>'+areashape+' coords="'+ww+',0,'+(ww+tbw)+','+tbh+'" href="javascript:up();" ');
if (difficulty == 1) document.write('alt="Go or Look Up (E or 9)"');
document.write('>'+areashape+' coords="'+ww+','+tbh+','+(ww+tbw)+','+(tbh+fwh)+'" ');
document.write('href="javascript:forward();" ');
if (difficulty == 1) document.write('alt="Act, Look, or Go Forward (W or 8)"');
document.write('>'+areashape+' coords="'+ww+','+(tbh+fwh)+','+(ww+tbw)+','+(2*tbh+fwh)+'" ');
document.write('href="javascript:down();" ');
if (difficulty == 1) document.write('alt="Act, Look, or Go Down (C or 3)"');
document.write('>'+areashape+' coords="'+(ww+tbw)+',0,'+(2*ww+tbw)+','+(2*tbh+fwh)+'" ');
document.write('href="javascript:right();" ');
if (difficulty == 1) document.write('alt="Turn Right (D or 6)"');
document.write('></map>');
document.write("</div>");

