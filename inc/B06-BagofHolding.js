

Zincs++;
ZVERappend[21] = "B06";
// ******VERSION******
ZVER[21] = 0.021

//BAG OF HOLDING WINDOW LAYER
//Images[iba]-[iba+10] belong to Items in Bag of Holding
document.write("<div id='BagofHolding' style='position:absolute; z-index:6; left:"+(screen.width-800)+"; ");
document.write("top:10; width:250; height:375; background-color:lightgreen;");
document.write(" visibility:hidden'>");
document.write("<center><b>"+ffont+"><br>BAG OF HOLDING CONTENTS</font></b>");
document.write(ffont+"><br><i>(top of bag)</i></font></b>");
document.write("</center><hr>");
document.write('<table width="200" border="1" cellspacing="0" cellpadding="0" align="center">');
for (ir = 0; ir<5; ir++) {
document.write('<tr><td width="50"><center><b>'+ffont+'>'+(2*ir+1)+'</center></td><td width="50">');
document.write("<center><a href='javascript:BOHrearrange("+(2*ir)+");'>");
document.write('<img src="images/items/'+bag[2*ir]+'.gif" width="50" height="50" border="0">');
document.write('</a></center></td><td width="50">');
document.write('<center><b>'+ffont+'>'+(2*ir+2)+'</center><td width="50"><center>');
document.write("<a href='javascript:BOHrearrange("+(2*ir+1)+");'>");
document.write('<img src="images/items/'+bag[2*ir+1]+'.gif" width="50" height="50" border="0">');
document.write('</a></center></td></tr>');
}
document.write('</table>');
document.write(ffont+"><center><p><i>(bottom of bag)</i></p></center></font></b>");
document.write("<p><center><form name='bohform'>");
document.write("<input type='button' value='Remove Item' onClick='BOHRemove();'> ");
document.write("<input type='button' value='Close Window' onClick='BOHHideWin();'>");
document.write("</form></center></div>");


