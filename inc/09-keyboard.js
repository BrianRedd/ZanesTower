

Zincs++;
ZVERappend[9] = "09";
// ******VERSION******
ZVER[9] = 0.101

document.onkeypress = keyhandler;

function keyhandler(e) {
    if (document.layers)
        Key = e.which;
    else
        Key = window.event.keyCode;

	//alert(Key);

    // "Key" is looking for ASCII value.
    // x.charCodeAt(0) gives ASCII value of 0th character (first) in string x.

    if (Key == "w".charCodeAt(0) || Key == "8".charCodeAt(0)) {
       	if (document.all["MonLayer"].style.visibility == 'visible') MonForward();
    	else forward();
    	}
    if (Key == "a".charCodeAt(0) || Key == "4".charCodeAt(0)) {
       	if (document.all["MonLayer"].style.visibility == 'visible') MonLeft();
    	else left();
    	}
    if (Key == "d".charCodeAt(0) || Key == "6".charCodeAt(0)) {
       	if (document.all["MonLayer"].style.visibility == 'visible') MonRight();
    	else right();
    	}
    if (Key == "s".charCodeAt(0) || Key == "2".charCodeAt(0)) {
    	retreat();
    	}
    if (Key == "c".charCodeAt(0) || Key == "3".charCodeAt(0)) {
       	if (document.all["MonLayer"].style.visibility == 'visible') MonDown();
    	else down();
    	}
    if (Key == "e".charCodeAt(0) || Key == "9".charCodeAt(0)) {
       	if (document.all["MonLayer"].style.visibility == 'visible') MonUp();
    	else up();
    	}
    if (Key == "u".charCodeAt(0) || Key == "5".charCodeAt(0)) {
       	if (document.all["BagofHolding"].style.visibility == 'visible') BOHHideWin();
    	else useItem();
    	}
    if (Key == "h".charCodeAt(0) || Key == "D".charCodeAt(0)) {
       	if (document.all["BagofHolding"].style.visibility == 'visible') BOHRemove();
    	else DropItem();
    	}
    if (Key == "r".charCodeAt(0)) {
    	RotateInvWin();
    	}
    if (Key == "l".charCodeAt(0)) {
    	shhhh();
    	}
    if (Key == "R".charCodeAt(0)) {
    	nap();
    	}
    if (Key == "i".charCodeAt(0)) {
    	if (document.all["InvWin"].style.visibility == 'visible') HideInvWin();
    	else InvWindow();
    	}
    if (Key == "p".charCodeAt(0) || Key == "1".charCodeAt(0)) {
    	if (document.all["BoxLayer"].style.visibility == 'visible') TreasureBox(0);
		else PickUpItem();
    	}
    if (Key == "Q".charCodeAt(0)) {
    	quitbutton();
    	}
    if (Key == "?".charCodeAt(0)) {
    	helpbutton();
    	}
    if (Key == "v".charCodeAt(0)) {
    	alert("Zane Version "+VERSION);
    	}
}

