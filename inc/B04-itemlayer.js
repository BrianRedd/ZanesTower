

Zincs++;
ZVERappend[19] = "B04";
// ******VERSION******
ZVER[19] = 0.104

//ITEM LAYER
document.write("<div id='itemlayer' style='position:absolute; z-index:2; left="+itmleft+"; top="+itmtop+"; width="+itmwidth+"; height="+itmheight+"; visibility=hidden'>");
document.write("<a href='javascript:PickUpItem()';><img src='images/items/1.gif' width='"+itmwidth+"' height='"+itmheight+"' border='0' ");
if (difficulty == 1) document.write("alt='Pick Me Up (P or 1)'");
document.write("></a></div>");


