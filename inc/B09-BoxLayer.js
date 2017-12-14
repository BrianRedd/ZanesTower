

Zincs++;
ZVERappend[24] = "B09";
// ******VERSION******
ZVER[24] = 0.024

//TREASURE BOX LAYER
document.write('<div id="BoxLayer" style="position:absolute; width:300; height:300; ');
document.write('z-index:3; left: '+boxleft+'; top: '+boxtop+'; ');
document.write('background-image: url(images/TreasureBox.jpg); ');
document.write('layer-background-image: url(images/TreasureBox.jpg); visibility:hidden; ');
document.write('border: 1px none #000000">');
document.write('<center>');
document.write('<table border="0" width="270" height="300" align="center">');
for (i1=0; i1<5; i1++) {
	document.write('<tr>');
	for (i2=0; i2<5;i2++) {
		document.write('<td><a href="javascript:TreasureBox('+((i1*5)+i2)+');">');
		temp = box[(i1*5)+i2];
		if (temp == 0) temp = 99;
		document.write('<img src="images/items/'+temp+'.GIF" width="50" ');
		document.write('height="50" border="0"></a></td>');
        }
	document.write('</tr>');
	}
document.write('</table></center>')
document.write('</div>');
//if (boomstick == 1) document.images[ibx+wrlr-1].src = "images/items/"+box[wrlr-1]+".gif";
//document.images[ibx+scroll-1].src="images/items/"+box[scroll-1]+".gif";
document.images[ibx+24].src="images/items/98.gif";


