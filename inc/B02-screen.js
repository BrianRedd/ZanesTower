

Zincs++;
ZVERappend[17] = "B02";
// ******VERSION******
ZVER[17] = 0.141

//Table
document.write("<table width='"+tabwid+"' border='0' cellspacing='0' cellpadding='0' align='center'>");
document.write("<tr valign='top'><td rowspan='2' width='"+cw1+"'><div align='center'><p>");
//Compass
document.write("<img src='images/compass/blank.gif' width='"+compdim+"' height='"+compdim+"'></font></p>");
document.write("<p align='right'>"+ffont+" size='-1'><b>Hit Points:");
document.write("<img src='"+numsrc+"' width='"+bnw+"' height='"+bnh+"'>");
document.write("<img src='"+numsrc+"' width='"+bnw+"' height='"+bnh+"'>");
document.write("<img src='images/spacer.gif' width='"+snw+"'><br>");
document.write("</b></font><b>"+ffont+" size='-2'>");
//Rooms Seen
document.write("<p align='right'>Rooms Seen: <img src='"+numsrc+"' width='"+snw+"' height='"+snh+"'>");
document.write("<img src='"+numsrc+"' width='"+snw+"' height='"+snh+"'>");
document.write("<img src='"+numsrc+"' width='"+snw+"' height='"+snh+"'>");
document.write("<img src='images/spacer.gif' width='"+snw+"'><br>");
document.write("<center>(out of "+totalrooms+")<br></center>");
//Monsters Killed
document.write("<p align='right'>Monsters Killed: <img src='"+numsrc+"' width='"+snw+"' height='"+snh+"'>");
document.write("<img src='"+numsrc+"' width='"+snw+"' height='"+snh+"'>");
document.write("<img src='images/spacer.gif' width='"+snw+"'><br>");
document.write("<center>(out of "+totalmons+")<br></center>");
//Tower Level
document.write("<p align='right'>Tower Level: <img src='"+numsrc+"' width='"+snw+"' height='"+snh+"'>");
document.write("<img src='"+numsrc+"' width='"+snw+"' height='"+snh+"'>");
document.write("<img src='images/spacer.gif' width='"+snw+"'><br>");
document.write("<p align='right'>Hours awake: <img src='"+numsrc+"' width='"+snw+"' height='"+snh+"'>");
document.write("<img src='images/spacer.gif' width='"+snw+"'>");
document.write("</font></b></p></div><p align='center'></p></td>");
//3D VIEW AREAS
document.write("<td width='"+cw2+"' rowspan='2'><a href='javascript:left();' >");
document.write("<img src='images/dark.gif' width='"+ww+"' height='"+wh+"' border='0' ");
if (difficulty == 1) document.write("alt='Turn Left (A or 4)'");
document.write("></a>");
document.write("</td><td width='"+cw3+"' rowspan='2'><a href='javascript:up();' >");
document.write("<img src='images/dark.gif' width='"+tbw+"' height='"+tbh+"' border='0' ");
if (difficulty == 1) document.write("alt='Go or Look Up (E or 9)'");
document.write("></a>");
document.write("<br><a href='javascript:forward();' >");
document.write("<img src='images/dark.gif' width='"+fww+"' height='"+fwh+"' border='0' ");
if (difficulty == 1) document.write("alt='Act, Look, or Go Forward (W or 8)'");
document.write("></a><br>");
document.write("<a href='javascript:down();' >");
document.write("<img src='images/dark.gif' width='"+tbw+"' height='"+tbh+"' border='0' ");
if (difficulty == 1) document.write("alt='Act, Look, or Go Down (C or 3)'");
document.write("></a></td>");
document.write("<td width='"+cw4+"' rowspan='2'><a href='javascript:right();'>");
document.write("<img src='images/dark.gif' width='"+ww+"' height='"+wh+"' border='0' ");
if (difficulty == 1) document.write("alt='Turn Right (D or 6)'");
document.write("></a></td>");
document.write("<td width='"+cw5+"' rowspan='2'><div align='center'>");
//Game Clock
document.write("<p><b>"+ffont+" size='-1'><u>GAME CLOCK</u></b><br>");
document.write("<img src='"+numsrc+"' width='"+bnw+"' height='"+bnh+"'>");
document.write("<img src='"+numsrc+"' width='"+bnw+"' height='"+bnh+"'>");
document.write("<img src='images/numbers/rdot.gif' width='"+dotw+"' height='"+doth+"'>");
document.write("<img src='"+numsrc+"' width='"+bnw+"' height='"+bnh+"'>");
document.write("<img src='"+numsrc+"' width='"+bnw+"' height='"+bnh+"'>");
document.write("</font><br>");
//Score Board
document.write("<b>"+ffont+" size='-1'><u>Score</u></b><br>");
document.write("<img src='"+numsrc+"' width='"+snw+"' height='"+snh+"'>");
document.write("<img src='"+numsrc+"' width='"+snw+"' height='"+snh+"'>");
document.write("<img src='"+numsrc+"' width='"+snw+"' height='"+snh+"'>");
document.write("<img src='"+numsrc+"' width='"+snw+"' height='"+snh+"'>");
document.write("<img src='"+numsrc+"' width='"+snw+"' height='"+snh+"'>");
document.write("</font><br>");
//Inventory
document.write(ffont+" size='-1'><br><u>Inventory</u></font><br>");
document.write("<a href='javascript:useItem();'>");
document.write("<img src='images/items/0.gif' width='"+itmwidth+"' height");
document.write("='"+itmheight+"' border='0' ");
if (difficulty == 1) document.write("alt='Click to use Item in Hand (U or 5)'");
document.write("></a> ");
document.write('<a href="javascript:InvWindow();" onMouseOut="MM_swapImgRestore()" onMouseOver="MM_swapImage(');
document.write("'inv','','images/buttons/inventory-ro.gif',1");
document.write(')" ><img name="inv" border="0" src="images/buttons/');
document.write('inventory.gif" width="'+itmwidth+'" height="'+itmheight+'"');
if (difficulty == 1) document.write(' alt="Open Inventory Window (I)"');
document.write('></a></p><p>');
//Buttons
document.write('<a href="javascript:DropItem();" onMouseOut="MM_swapImgRestore()" onMouseOver="MM_swapImage(');
document.write("'dro','','images/buttons/dropitem-ro.gif',1");
document.write(')" ><img name="dro" border="0" src="images/buttons/');
document.write('dropitem.gif" width="'+butwid+'" height="'+buthei+'"');
if (difficulty == 1) document.write(' alt="Drop Item In Hand (H or Sh+D)"');
document.write('></a><br>');
document.write('<a href="javascript:RotateInvWin();" onMouseOut="MM_swapImgRestore()" onMouseOver="MM_swapImage(');
document.write("'rot','','images/buttons/rotateinv-ro.gif',1");
document.write(')" ><img name="rot" border="0" src="images/buttons/');
document.write('rotateinv.gif" width="'+butwid+'" height="'+buthei+'"');
if (difficulty == 1) document.write(' alt="Change Item in Hand (R)"');
document.write('></a></p><p>');
document.write('<a href="javascript:nap();" onMouseOut="MM_swapImgRestore()" onMouseOver="MM_swapImage(');
document.write("'rest','','images/buttons/rest-ro.gif',1");
document.write(')" ><img name="rest" border="0" src="images/buttons/');
document.write('rest.gif" width="'+butwid+'" height="'+buthei+'"');
if (difficulty == 1) document.write(' alt="Rest for a Spell, cure some fatigue (Sh+R)"');
document.write('></a><a href="javascript:shhhh();" onMouseOut="MM_swapImgRestore()" onMouseOver="MM_swapImage(');
document.write("'listen','','images/buttons/listen-ro.gif',1");
document.write(')" ><img name="listen" border="0" src="images/buttons/');
document.write('listen.gif" width="'+butwid+'" height="'+buthei+'"');
if (difficulty == 1) document.write(' alt="Shhh! Do you hear that? (L)"');
document.write('></a></p><p>');
document.write('<a href="javascript:retreat();" onMouseOut="MM_swapImgRestore()" onMouseOver="MM_swapImage(');
document.write("'ret','','images/buttons/retreat-ro.gif',1");
document.write(')" ><img name="ret" border="0" src="images/buttons/');
document.write('retreat.gif" width="'+butwid+'" height="'+buthei+'"');
if (difficulty == 1) document.write(' alt="Run Away! Run Away! (S or 2)"');
document.write('></a><br>');
document.write('<a href="javascript:aboutface();" onMouseOut="MM_swapImgRestore()" onMouseOver="MM_swapImage(');
document.write("'tur','','images/buttons/turnaround-ro.gif',1");
document.write(')" ><img name="tur" border="0" src="images/buttons/');
document.write('turnaround.gif" width="'+butwid+'" height="'+buthei+'"');
if (difficulty == 1) document.write(' alt="Turn a complete 180"');
document.write('></a></p><p>');
document.write('<a href="javascript:quitbutton();" onMouseOut="MM_swapImgRestore()" onMouseOver="MM_swapImage(');
document.write("'qut','','images/buttons/quit-ro.gif',1");
document.write(')" ><img name="qut" border="0" src="images/buttons/');
document.write('quit.gif" width="'+butwid/2+'" height="'+buthei+'"');
if (difficulty == 1) document.write(' alt="Mommy, I wanna go home! (Sh+Q)"');
document.write('></a><a href="javascript:helpbutton();" onMouseOut="MM_swapImgRestore()" onMouseOver="MM_swapImage(');
document.write("'hlp','','images/buttons/help-ro.gif',1");
document.write(')" ><img name="hlp" border="0" src="images/buttons/');
document.write('help.gif" width="'+butwid/2+'" height="'+buthei+'"');
if (difficulty == 1) document.write(' alt="HELP!!! (?)"');
document.write('></a><br><tr valign="top"></tr>');
document.write('</table>');


