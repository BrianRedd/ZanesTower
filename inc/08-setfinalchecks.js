Zincs++;
ZVERappend[8] = "09";
// ******VERSION******
ZVER[8] = 0.143

// Check of Final Score;
function FinalScoreCheck() {
//	alert("Let's check that final score");

	fsmsg3 = "Base score: "+score; //20091201
	finalscore = score;
	
	temp = (hitpoints*5) * difficulty;
	if (hitpoints < 0) {
		temp =0;
		fsmsg3 += "<font color=red>";
		}
	fsmsg3 += "<br>Hit Point Bonus: "+temp;
	if (hitpoints < 0) fsmsg3 += "</font>";
	finalscore += temp;

	temp = (ITMspc[phlt]*4) * difficulty; //Healing Potion
	temp += (ITMspc[pstm]*20) * difficulty; //Stim Potion
	fsmsg3 += "<br>Potion Bonus: "+temp;
	finalscore += temp;
	
	//if (victory == 0 && inv[0] == 24) victory = 3; //"win" if carrying scroll
	if (uname == "TESTER") victory = 3;
	
	temp = victory*victory * totalrooms * 5 * difficulty;
	if (victory > 0) fsmsg3 += "<font color=green><b>";
	fsmsg3 += "<br>Victory Bonus: "+temp;
	if (victory > 0) fsmsg3 += "</b></font>";
	finalscore += temp;

	if (cheater > 0) {
	temp = Math.round(finalscore/(1+cheater));
	fsmsg3 += "<br><b><font color=red>Cheater Penalty: "+(temp - finalscore)+"</font></b>";
	finalscore = temp;
	}
	
//	alert(fsmsg3);

//	alert("I'm showing a final score of "+finalscore);
	}

// GAME OVER
function GameOver(status) {
//	alert("Win? "+status);
	FinalScoreCheck();
	if (status == 1) {
		fsmsg1= "CONGRATULATIONS! YOU ESCAPED!";
		fsmsg2= " Your final score is "+finalscore+"!";
		newinfo = fsmsg1+fsmsg2
		var nextlink = "winner.html";
		}
	if (status == 0) {
		fsmsg1= "The spirit Zane is disappointed in you. GAME OVER.";
		fsmsg2= " Your final score is "+finalscore+"!";
		newinfo = fsmsg1+fsmsg2
		var nextlink = "loser.html";
		}
	ViewRefresh();
	alert(newinfo);
//	alert("What's the next link? "+nextlink);
//	location.replace(nextlink);
	FinalScoreWindow();
	parent.NewWindow(nextlink);
	}

function FinalScoreWindow() {
//	alert("Final Score Window!");
	var fsfeat = "toolbar=no, status=no, width=250, height=400";
	FScoreWin=window.open('','FScoreWin', fsfeat);
	fsident = window.setTimeout("FScoreWin.close();",120000);
	FScoreWin.document.write('<table width="200" border="0" align="center" cellpadding="2"><tr><td colspan="2">');
	FScoreWin.document.write('<div align="center"><h3>'+fsmsg1+'</h3></div>');
	FScoreWin.document.write('</td></tr><tr><td><div align="right">Level</div>');
	var temp1 = "r1";
	if (difficulty == 2) temp1 = "a2";
	if (difficulty == 3) temp1 = "g3";
	FScoreWin.document.write('</td><td><div align="left"><img src="images/numbers/'+temp1+'.gif" width="25" height="50"></div>');
	FScoreWin.document.write('</td></tr><tr><td colspan="2"><div align="center">Score<br>');
	
	var tarcol = "a";
	if (finalscore < (500*difficulty)) tarcol = "r";
	var scdig = new Array(5);
	scdig[0] = Math.abs(parseInt(finalscore/10000));
	scdig[1] = parseInt((Math.abs(finalscore)-(scdig[0]*10000))/1000);
	scdig[2] = parseInt((Math.abs(finalscore)-(scdig[0]*10000)-(scdig[1]*1000))/100);
	scdig[3] = parseInt((Math.abs(finalscore)-(scdig[0]*10000)-(scdig[1]*1000)-(scdig[2]*100))/10);
	scdig[4] = Math.abs(finalscore)-(scdig0*10000)-(scdig[1]*1000)-(scdig[2]*100)-(scdig[3]*10);
	var temp2 = 0;
	var sccol = new Array(5);
	for (i=0; i<5; i++) {
		sccol[i] = "g";
		if (temp2 == 1) sccol[i] = tarcol;
		if (scdig[i] > 0) {
			sccol[i] = tarcol;
			temp2 = 1;
			}
		FScoreWin.document.write('<img src="images/numbers/'+sccol[i]+scdig[i]+'.gif" width="25" height="50">');
		}
	
	FScoreWin.document.write('<div align="center"><p>'+fsmsg3+'</p></div>');
	
	FScoreWin.document.write('</td></tr><tr><td colspan="2"><div align="center"><input type="button" value="OK" onClick="window.close();">');
	FScoreWin.document.write('</div></td></tr></table>');
}