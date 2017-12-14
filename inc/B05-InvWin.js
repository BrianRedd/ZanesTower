

Zincs++;
ZVERappend[20] = "B05";
// ******VERSION******
ZVER[20] = 0.030

//INVENTORY WINDOW LAYER
//Images[ica]-[ica+4] belong to Items being Carried
//Images[iwo]-[iwo+4] belong to Items being Worn
document.write("<div id='InvWin' style='position:absolute; z-index:5; left:"+(50)+"; ");
document.write("top:10; width:250; height:370; background-color:lightblue;");
document.write(" visibility:hidden'>");
document.write("<center><b>"+ffont+"><br>INVENTORY CONTROL WINDOW</p></font></b></center><hr>");
document.write("<table width='200' border='1' cellspacing='0' cellpadding='0' align='center'>");
document.write("<tr><td width='100'>");
document.write("<table width='100' border='0' cellspacing='0' cellpadding='0'");
document.write(" align='center'><tr>");
document.write("<td width='100' colspan='2'><u><b><center>"+ffont+">CARRIED</font></center></b></u><tr>");
document.write("<tr><td width='50'><center><p><b>"+ffont+">IN<br>HAND</font>");
document.write("</p></b></center><td width='50'><center>");
document.write("<a href='javascript:useItem();'><img src='images/");
document.write("items/0.gif' width='50' height='50' border='0'></a></center>");
for (i=1;i<5;i++) {
	document.write("<tr><td width='50'><center><h2>"+ffont+">"+i+"</font></h2></center>");
	document.write("<td width='50'><center>");
	document.write("<a href='javascript:InvRearrange("+i+");'>");
	document.write("<img src='images/items/0.gif' width='50' ");
	document.write("height='50' border='0'></a></center>");
}
document.write("</tr></table>");
document.write("<td width='100'>");
document.write("<table width='100' border='0' cellspacing='0' cellpadding='0' align='center'>");
document.write("<tr><td width='100' colspan='2'><u><b><center>"+ffont+">WORN</font>");
document.write("</center></b></u><tr>");
for (i=0;i<5;i++) {
	document.write("<tr><td width='50'><center><p><b>"+ffont+">"+WEARstr[i]+"</font></b></p>");
	document.write("</center><td width='50'><center>");
	document.write("<a href='javascript:unDonItem("+i+");'>");
	document.write("<img src='images/items/0.gif' width='50'");
	document.write(" height='50' border='0'></a></center>");
}
document.write("</tr></table>");
document.write("</tr></table><center>");
document.write("<p>"+ffont+">Items carried: </font><img src='images/numbers/r0.gif' width='15' height='30'>");
document.write("<p><form name='newform'>");
document.write("<input type='button' value='Drop Item' onClick='DropItem();'> ");
document.write("<input type='button' value='Rotate' onClick='RotateInvWin();'> ");
document.write("<input type='button' value='Close' onClick='HideInvWin();'>");
document.write("</form></center></div>");


