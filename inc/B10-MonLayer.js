Zincs++;
ZVERappend[25] = "B10";
// ******VERSION******
ZVER[25] = 0.103

//MONster LAYER
var areashape = '<area shape="rect"'
document.write('<div id="MonLayer" style="position:absolute; width:'+featwid+';');
document.write('z-index:4; height:'+feathei+'; left: '+featleft+'; top: 10; visibility:hidden">');
document.write("<img src='images/monsters/0.gif' width='"+featwid+"' ");
document.write("height='"+feathei+"' border='0' usemap='#monmap'>");
document.write('<map name="monmap">');
document.write(areashape+' coords="0,0,'+ww+','+wh+'" href="javascript:MonLeft();"');
if (difficulty == 1) document.write('alt="Turn Left (A or 4)"');
document.write('>'+areashape+' coords="'+ww+',0,'+(ww+tbw)+','+tbh+'" href="javascript:MonUp();"');
if (difficulty == 1) document.write('alt="Look or Go Up (E or 9)"');
document.write('>'+areashape+' coords="'+ww+','+tbh+','+(ww+tbw)+','+(tbh+fwh)+'" ');
document.write('href="javascript:MonForward();"');
if (difficulty == 1) document.write('alt="Act, Look, or Go Forward (W or 8)"');
document.write('>'+areashape+' coords="'+ww+','+(tbh+fwh)+','+(ww+tbw)+','+(2*tbh+fwh)+'" ');
document.write('href="javascript:MonDown();"');
if (difficulty == 1) document.write('alt="Act, Look, or Go Down (C or 3)"');
document.write('>'+areashape+' coords="'+(ww+tbw)+',0,'+(2*ww+tbw)+','+(2*tbh+fwh)+'" ');
document.write('href="javascript:MonRight();"');
if (difficulty == 1) document.write('alt="Turn Right (D or 6)"');
document.write('></map>');
document.write("</div>");

