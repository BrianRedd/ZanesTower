

Zincs++;
ZVERappend[16] = "B01";
// ******VERSION******
ZVER[16] = 0.020

var tabwid = 900; //Default Table Width
if (screen.width < 900) tabwid = 600;
var cw1 = Math.round(tabwid/6); //Column Width
var cw2 = cw1; //Column 2 Width
var cw3 = cw1*2; //Column 3 Width
var cw4 = cw1; //Column 4 Width
var cw5 = cw1; //Column 5 Width
var ffont = "<font face='Arial, Helvetica, sans-serif'"
var numsrc = "images/numbers/r0.gif"; //Default number graphic
var compdim = Math.round(2*cw1/3); //Compass Width and Height
var bnw = Math.round(compdim/4); //Number Width (Big Numbers)
var bnh = bnw*2; //Number Height (Big Numbers)
var snw = Math.round(3*bnw/5); //Number Width (Small Numbers)
var snh = snw*2; //Number Height (Small Numbers)
var dotw = Math.round(snw/4);
var doth = bnh;
var ww = cw2; // Wall Width
var wh = ww*3; // Wall Height
var tbw = cw3; // Top & Bottom Width
var tbh = Math.round(2*wh/9); //Top & Bottom Height
var fww = cw3; // Front Wall Width
var fwh = Math.round(5*wh/9); //Front Wall Height
var itmwidth = 50; //Item left-right size
var itmheight = 50; //Item up-down size
var itmleft = Math.floor((tabwid-itmwidth)/2);
var itmtop = Math.floor(375);
var butwid = Math.floor(cw5*.95);
var buthei = Math.floor(cw5/6.5);
var featwid = Math.floor(2*tabwid/3);
var feathei = wh;
var featleft = (Math.floor(tabwid/100)*100)/2-featwid/2;
var boxleft = (Math.floor(tabwid/100)*100)/2-150;
var boxtop = itmtop - 150;

