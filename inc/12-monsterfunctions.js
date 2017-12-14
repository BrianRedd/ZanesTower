

Zincs++;
ZVERappend[12] = "12";
// ******VERSION******
ZVER[12] = 0.012

function MonForward() {
	if (ITMcls[inv[0]] == "w") {
		MonKombat();
		return;
		}
	hpck = hitpoints;
	MonAttack();
	InfoRefresh();
	newinfo = "You attempt to get around the "+MON[0][mon[xx][yy][zz]]
	if (hpck != hitpoints) {
		newinfo += " but it swats you back!";
		ViewRefresh();
		return;
		}
	newinfo += ".";
	InfoRefresh();
	d2 = rand(2);
	if (d2 == 0) left();
	else right();
	}

function MonLeft() {
	hpck = hitpoints;
	MonAttack();
	InfoRefresh();
	if (hpck != hitpoints) {
		newinfo = "You attempt to get around the "+MON[0][mon[xx][yy][zz]]+" but it swats you back!";
		ViewRefresh();
		return;
		}
	left();
	}

function MonRight() {
	hpck = hitpoints;
	MonAttack();
	InfoRefresh();
	if (hpck != hitpoints) {
		newinfo = "You attempt to get around the "+MON[0][mon[xx][yy][zz]]+" but it swats you back!";
		ViewRefresh();
		return;
		}
	right();
	}

function MonUp() {
	hpck = hitpoints;
	MonAttack();
	InfoRefresh();
	if (hpck != hitpoints) {
		newinfo = "You attempt to get around the "+MON[0][mon[xx][yy][zz]]+" but it swats you back!";
		ViewRefresh();
		return;
		}
	up();
	}

function MonDown() {
	hpck = hitpoints;
	MonAttack();
	InfoRefresh();
	if (hpck != hitpoints) {
		newinfo = "You attempt to get around the "+MON[0][mon[xx][yy][zz]]+" but it swats you back!";
		ViewRefresh();
		return;
		}
	down();
	}

function MonAbout() {
	hpck = hitpoints;
	MonAttack();
	InfoRefresh();
	if (hpck != hitpoints) {
		newinfo = "You attempt to get around the "+MON[0][mon[xx][yy][zz]]+" but it swats you back!";
		ViewRefresh();
		return;
		}
	}

function MonRetreat() {
	if (rxx >= 0 && ryy >= 0 && rzz >= 0) return;
	MonAttack();
	InfoRefresh();
	NextRoom();
	nrwo = NSEW + 2; //Behind you!
		if (nrwo > 3) nrwo = NSEW - 2;
	ff2 = wall[nrwo][xx][yy][zz];
	if (ff2 == 4) ff2 = 2;
	newinfo = "You back into a "+WALLstr[ff2]+"!"
	if (ff2 == 6) { // Closed Door
		newinfo += " You manage to work it open, while dodging the "+MON[0][mon[xx][yy][zz]]+".";
		wall[nrwo][xx][yy][zz] = 7;
		wall[NSEW][nrx[nrwo]][nry[nrwo]][zz] = 7;
		NSEW = rand(4);
		}
	if (ff2 >=7 && ff2 <=9) {
		rxx = nrx[nrwo];
		ryy = nry[nrwo];
		rzz = zz;
		newinfo = "The "+MON[0][mon[xx][yy][zz]]+" "+MON[1][mon[xx][yy][zz]]+" as you retreat through the "+WALLstr[ff2]+".";
		}
	InfoRefresh();
	}

function MonKombat() { // Can't get here unless you're using a weapon
	gofirst = 0;
	rxx = -1;
	ryy = -1;
	rzz = -1;
	monster = mon[xx][yy][zz];
	weap = inv[0];
	newinfo = "You rush the "+MON[0][monster]+", "+ITMstr[weap]+" in hand.";
	InfoRefresh();
	d81 = rand(8) + WEAspd[weap]; // you
	if (wear[4] == aflb) d81 += 2;
	d82 = rand(8) + MON[3][monster]; // them
	if (d81 >= d82) gofirst = 1;
	if (gofirst == 1) newinfo="You gain the initiative! ";
	else newinfo = "Your opponent attacks first! ";
	if (gofirst == 1) YourAttack();
	InfoRefresh();
	MonAttack();
	InfoRefresh();
	if (gofirst == 0) YourAttack();
	if (hp[xx][yy][zz] < 0) monlifechk();
	gametime += 1;
	ViewRefresh();
	}

function YourAttack() {
	InfoRefresh();
	ydmg = 0;
	yhit = 0;
	d10 = rand(10) + MON[3][monster] + fatdmg;
	temp = "swing";
	if (weap == wryg) {
		if (raycharge < rayset) {
			newinfo = "There is not enough power to fire the ray gun!";
			return;
			}
		if (rayset == 0 ) {
			newinfo = "The ray gun is currently powered down, and cannot fire!";
			return;
			}
		raycharge -= rayset;
		lastcharge = gametime;
		temp = "fire (remaining:"+Math.round((raycharge/raymax)*100)+"%)";
		}
	if (weap == wrlr) {
		if (rlammo < 1) {
			newinfo = "But the rocket launcher is empty! ";
			return;
			}
		rlammo -= 1;
		temp = "fire ("+rlammo+" left)";
		}
	if (d10 <= ITMspc[weap]) { // HIT OR MISS
		newinfo = "You "+temp+" and HIT! ";
		ydmg = rand(WEAdmg[weap]) + 1;
		if (weap == wryg) ydmg = ydmg * rayset;
		yhit = 1;
		}
	else {
		newinfo = "You "+temp+" and miss! ";
		yhit = 0;
		}
	if (weap == wrlr) {
		document.images[iac].src='images/action/boom.gif';
		if (document.layers) {
			document.layers["ActionLayer"].visibility='show';
			if (yhit == 1) document.layers["ActionLayer"].zIndex = '8';
			if (yhit == 0) document.layers["ActionLayer"].zIndex = '3';
			indent=window.setTimeout("document.layers['ActionLayer'].visibility='hide'", 3000);
			}
			else { //IE
			document.all["ActionLayer"].style.visibility='visible';
			if (yhit == 1) document.all["ActionLayer"].style.zIndex = '8';
			if (yhit == 0) document.all["ActionLayer"].style.zIndex = '3';
			indent=window.setTimeout("document.all['ActionLayer'].style.visibility = 'hidden'", 3000);
			}
			ydmg = rand(10) + rand(10) + 2;
		}
		if (yhit == 1) DoDmg(ydmg); // dmg is the dmg
		InfoRefresh();
		NSEW = rand(4);
	}

function MonAttack() {
	mdmg = 0;
	mhit = 0;
	armorpiercing = 0;
	monster = mon[xx][yy][zz];
	if (hp[xx][yy][zz] == 0) return;
	InfoRefresh();
	newinfo = "The "+MON[0][monster]+" "+MON[1][monster]+" and attacks! ";
	//HIT OR MISS
	d10 = rand(10) - fatdmg;
	if (wear[1] == apta) d10 -= 1;
	if (carry == 5) d10 -= 1;
	if (wear[4] == aflb) d10 += 1;
	if (d10 < MON[5][monster]) {
		newinfo += "The "+MON[0][monster]+" HITS!";
		mdmg = rand(MON[6][monster]) + MON[7][monster];
		mhit = 1;
		}
	else {
		newinfo += "The "+MON[0][monster]+" misses!";
		}
	InfoRefresh();
	if (mhit ==1) takeDmg(mdmg);
	}

function DoDmg(dmg) {
	monster = mon[xx][yy][zz]; // Target
	if (monster == 2) { // Werewolf
		temp = dmg;
		dmg = 0;
		if (inv[0] == wskn) dmg = temp; // silver dagger
		if (inv[0] == wryg) dmg = rayset; // ray gun
		if (inv[0] == wrlr) dmg = temp; // rocket launcher (fire, also bomb)
		}
	if (monster == 4) { // Slime Beast
		temp = dmg;
		dmg = 1;
		if (inv[0] == wtrc) dmg = temp*4;
		if (inv[0] == wrlr || inv[0] == wryg) dmg = temp;
		}
	if (monster == 9 || monster == 10) { // Robot or Skeleton
		if (inv[0] == wswd || inv[0] == wslh) dmg = Math.ceil(dmg/2); // sword or knife
		if (inv[0] == wrlr && monster == 9) dmg = dmg * 2; //rocket vs robot
		if (inv[0] == wryg && monster == 9) dmg = dmg * 2; //raygun vs robot
		if (inv[0] == wryg && monster == 10) dmg = 0; //raygun vs skeleton
		}
	if (monster == 13 && (inv[0] == wtrc || inv[0] == wryg)) dmg = 0; // Demon
	dmg -= MON[4][monster];
	if (dmg < 1) {
		dmg = 0;
		}
	hp[xx][yy][zz] -=dmg;
	if (hp[xx][yy][zz] == 0) hp[xx][yy][zz] = -1;
	InfoRefresh();
	newinfo = "You did "+dmg+" points of damage to the "+MON[0][monster]+"."
	}

function monlifechk() {
	if (hp[xx][yy][zz] <= 0) {
		monpoints = 0;
		for (i=2; i<8; i++) monpoints += MON[i][mon[xx][yy][zz]];
		InfoRefresh();
		newinfo = "The "+MON[0][mon[xx][yy][zz]]+" is dead (worth "+monpoints+" points)!";
		mon[xx][yy][zz] = 0;
		hp[xx][yy][zz] = 0;
		kills += 1;
		score += monpoints;
		document.images[iac].src='images/action/rip.gif';
			if (document.layers) {
				document.layers["ActionLayer"].visibility='show';
				indent=window.setTimeout("document.layers['ActionLayer'].visibility='hide'", 3000);
				}
			else { //IE
				document.all["ActionLayer"].style.visibility='visible';
				indent=window.setTimeout("document.all['ActionLayer'].style.visibility = 'hidden'", 3000);
				}
		}
	}

