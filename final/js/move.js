var playernum = $("#playerNumber").val();
var com = 0;
var playerMoney = [$("#startMoney").val(), $("#startMoney").val(), $("#startMoney").val(), $("#startMoney").val()];
var playerpos = [0, 0, 0, 0];

var playericon = [document.getElementById("red"), document.getElementById("yellow"), document.getElementById("green"), document.getElementById("blue")];
var playercolor = [document.getElementById("red").id, document.getElementById("yellow").id, document.getElementById("green").id, document.getElementById("blue").id];
var playername = [document.getElementById("red").name, document.getElementById("yellow").name, document.getElementById("green").name, document.getElementById("blue").name];
var bankruptcheck = [false, false, false, false];
var injailcheck = [false, false, false, false];
//var playercolor = [document.getElementValue("player1"), document.getElementValue("player2"), document.getElementValue("player3"), document.getElementValue("player4")];
var turn = 1;
var bankrupt = 0;
var givemoney = false;

var blockx = [1050, 947, 844, 741, 638, 535, 432, 329, 226, 123, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 123, 226, 329, 432, 535, 638, 741, 844, 947, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050];
var blocky = [670, 670, 670, 670, 670, 670, 670, 670, 670, 670, 670, 575, 523, 469, 416, 363, 310, 257, 204, 151, 98, 98, 98, 98, 98, 98, 98, 98, 98, 98, 98, 151, 204, 257, 310, 363, 416, 469, 523, 575];
//var p1$ = 15000;

var jsImg = new Array("image/dice1.jpg", "image/dice2.jpg", "image/dice3.jpg", "image/dice4.jpg", "image/dice5.jpg", "image/dice6.jpg");

function randomdice() {
    //陣列的長度 * 介於0~1間數字 ，然後在取 floor 當照片索引值
    var imgIndex = Math.floor(Math.random() * jsImg.length);
    document.getElementById("dice1").src = jsImg[imgIndex];
    document.getElementById("dice2").src = jsImg[imgIndex];
}
var go;
var startmove;

function move() {
    playericon[turn - 1].style.left = (posx + leftdif) + "px";
    playericon[turn - 1].style.top = (posy + topdif) + "px";
    leftdif += (blockx[playerpos[turn - 1]] - posx) / 100;
    topdif += (blocky[playerpos[turn - 1]] - posy) / 100;
}

function wait() {

}

var blocktype = [
        [0, "澎湖", 2, "金門", 4, "台北火車站", "桃園", 3, "新竹", "北埔", 0, "苗栗", "風力發電廠", "南投", "日月潭", "台中火車站", "彰化", 2, "雲林", "嘉義", 0, "台南", 3, "高雄", "屏東", "高雄火車站", "墾丁", "宜蘭", "自來水廠", "花蓮", 5, "合歡山", "台東", 2, "知本", "台東火車站", 3, "陽明山", 4, "台北"],
        [0, 600, 0, 600, 0, 2000, 1000, 0, 1000, 1200, 0, 1400, 1500, 1400, 1600, 2000, 1800, 0, 1800, 2000, 0, 2200, 0, 2200, 2400, 2000, 2600, 2600, 1500, 2800, 0, 3000, 3000, 0, 3200, 2000, 0, 3500, 0, 4000],
        [0]
    ]
    //名字、價格、所有者、
    //0=無效果,2=命運,3=機會,4=繳稅,5=進監獄 
$(() => {
    $('#start').on('click', () => {
        //alert("遊戲開始");
        document.getElementById("Title").style.visibility = "hidden";
        document.getElementById("input").style.visibility = "hidden";
        document.getElementById("board").style.visibility = "visible";
        document.getElementById("playerMoney").style.visibility = "visible";
        for (i = 1; i <= $("#playerNumber").val(); i++) {
            //  alert("已匯款");
            document.getElementById("player" + i + "Money").innerHTML = "player" + i + ": " + $("#startMoney").val();
        }
        document.getElementById("throwbutton").style.visibility = "visible";

    })

    $('#throw_dice').on('mouseenter', () => {
        go = setInterval("randomdice()", 20);
    })
    $('#throw_dice').on('mouseleave', () => {
        clearInterval(go);
    })

    $('#throw_dice').on('click', () => {
        document.getElementById("fatecard").src = "image/fate card.jpg";
        document.getElementById("fateword").innerHTML = "";
        document.getElementById("chancecard").src = "image/chance card.jpg";
        document.getElementById("chanceword").innerHTML = "";

        playernum = $("#playerNumber").val();
        while (givemoney == false) {
            playerMoney[0] = $("#startMoney").val();
            playerMoney[1] = $("#startMoney").val();
            playerMoney[2] = $("#startMoney").val();
            playerMoney[3] = $("#startMoney").val();
            givemoney = true;
        }
        var step1 = Math.floor((Math.random() * 6) + 1);
        var step2 = Math.floor((Math.random() * 6) + 1);
        var step = step1 + step2;
        //alert(playername[turn - 1] + "擲出" + step + "點");
        document.getElementById("dice1").src = "image/dice" + step1 + ".jpg";
        document.getElementById("dice2").src = "image/dice" + step2 + ".jpg";
        document.getElementById("totalstep").innerHTML = step;
        clearInterval(go);

        playerpos[turn - 1] += step;
        //alert("你在" + playerpos[turn - 1]);
        if (playerpos[turn - 1] >= 40) {
            alert("走了一圈 獲得2000元!");
            playerpos[turn - 1] -= 40;
            playerMoney[turn - 1] += 2000;
            document.getElementById("player1Money").innerHTML = playername[turn - 1] + ": " + playerMoney[turn - 1];
        }
        //var position = $('[name="player' + turn + '"]').offset();
        //alert(position);
        //var posx = position.left;
        //var posy = position.top;
        //var leftdif = (blockx[playerpos[turn - 1]] - posx) / 100;
        //var topdif = (blocky[playerpos[turn - 1]] - posy) / 100;

        playericon[turn - 1].style.left = blockx[playerpos[turn - 1]] + "px";
        playericon[turn - 1].style.top = blocky[playerpos[turn - 1]] + "px";

        setTimeout(() => {
            //alert("看看走到哪");
            if (playerpos[turn - 1] == 2 || playerpos[turn - 1] == 17 || playerpos[turn - 1] == 33) {
                alert("抽一張命運卡");
                playerMoney[turn - 1]++;
                playerMoney[turn - 1]--;
                var fatenum = Math.floor(Math.random() * 2);
                var fatetext;
                if (fatenum == 0) {
                    fatetext = '經營小本生意<br>獲得1000元';
                    playerMoney[turn - 1] += 1000;
                } else if (fatenum == 1) {
                    fatetext = '拘票<br>立即坐牢!';
                    playerpos[turn - 1] = 10;
                    playericon[turn - 1].style.left = blockx[10] + "px";
                    playericon[turn - 1].style.top = blocky[10] + "px";
                    injailcheck[turn - 1] = true;
                } else if (fatenum == 3) {
                    fatetext = '小偷光顧<br>損失500元';
                    playerMoney[turn - 1] -= 500;
                }
                document.getElementById(playername[turn - 1] + "Money").innerHTML = playername[turn - 1] + ": " + playerMoney[turn - 1];
                document.getElementById("fatecard").src = "image/white.png";
                document.getElementById("fateword").innerHTML = fatetext;
            } else if (playerpos[turn - 1] == 7 || playerpos[turn - 1] == 22 || playerpos[turn - 1] == 36) {
                alert("抽一張機會卡");
                playerMoney[turn - 1]++;
                playerMoney[turn - 1]--;
                var chancenum = Math.floor(Math.random() * 3);
                var chancetext;
                if (chancenum == 0) {
                    chancetext = '中樂透<br>獲得2000元';

                    playerMoney[turn - 1] += 2000;
                } else if (chancenum == 1) {
                    chancetext = '付學費<br>減少1500元';
                    playerMoney[turn - 1] -= 1500;
                } else if (chancenum == 2) {
                    chancetext = '申請獎學金<br>獲得2400元';
                    playerMoney[turn - 1] += 2400;
                }
                document.getElementById(playername[turn - 1] + "Money").innerHTML = playername[turn - 1] + ": " + playerMoney[turn - 1];
                document.getElementById("chancecard").src = "image/white.png";
                document.getElementById("chanceword").innerHTML = chancetext;
            } else if (playerpos[turn - 1] == 4 || playerpos[turn - 1] == 38) {
                alert("繳納所得稅 扣除2000元!");
                playerMoney[turn - 1] -= 2000;
                document.getElementById(playername[turn - 1] + "Money").innerHTML = playername[turn - 1] + ": " + playerMoney[turn - 1];
            } else if (playerpos[turn - 1] == 0 || playerpos[turn - 1] == 10 || playerpos[turn - 1] == 20) {

            } else if (playerpos[turn - 1] == 30) {
                alert("前往監獄 並暫停一回合!");
                playerpos[turn - 1] = 10;
                playericon[turn - 1].style.left = blockx[10] + "px";
                playericon[turn - 1].style.top = blocky[10] + "px";
                injailcheck[turn - 1] = true;
            } else if (blocktype[2][playerpos[turn - 1]] == null) {
                if (confirm("是否花" + blocktype[1][playerpos[turn - 1]] + "元購買" + blocktype[0][playerpos[turn - 1]]) == true) {
                    playerMoney[turn - 1] -= blocktype[1][playerpos[turn - 1]];
                    document.getElementById(playername[turn - 1] + "Money").innerHTML = playername[turn - 1] + ': ' + playerMoney[turn - 1];
                    blocktype[2][playerpos[turn - 1]] = turn;
                    //alert(playercolor[turn - 1]);
                    $("#" + blocktype[0][playerpos[turn - 1]]).css("background-color", playercolor[turn - 1]);
                    // alert("玩家" + turn + "已購買" + blocktype[0][playerpos[turn - 1]]);
                }
            } else if (blocktype[2][playerpos[turn - 1]] == turn) {
                alert("自己的地產 無須過路費");
            } else if (blocktype[2][playerpos[turn - 1]] != turn) {
                //alert("現在在" + playerpos[turn - 1]);
                var owner = blocktype[2][playerpos[turn - 1]];
                alert("經過player" + blocktype[2][playerpos[turn - 1]] + "的地產 支付過路費" + blocktype[1][playerpos[turn - 1]] + "元!");
                playerMoney[turn - 1] -= blocktype[1][playerpos[turn - 1]];
                playerMoney[blocktype[2][playerpos[turn - 1]] - 1] += blocktype[1][playerpos[turn - 1]];
                //alert("變成" + playerMoney[blocktype[2][playerpos[turn - 1]] - 1]);
                document.getElementById(playername[turn - 1] + "Money").innerHTML = playername[turn - 1] + ": " + playerMoney[turn - 1];
                document.getElementById(playername[blocktype[2][playerpos[turn - 1]] - 1] + "Money").innerHTML = playername[blocktype[2][playerpos[turn - 1]] - 1] + ": " + playerMoney[blocktype[2][playerpos[turn - 1]] - 1];
            }
            playericon[turn - 1].style.width = "17px";
            if (turn >= playernum) {
                turn = 0;
            }
            if (turn < playernum) {
                turn++;
                while (bankruptcheck[turn - 1] == true) {
                    turn++;
                }
                while (injailcheck[turn - 1] == true) {
                    injailcheck[turn - 1] = false;
                    turn++;
                }
                document.getElementById("playerthrow").innerHTML = "輪到" + playername[turn - 1];
                $("#playerthrow").css("color", playercolor[turn - 1]);
                /*  setTimeout(() => {
                      document.getElementById("fatecard").src = "image/fate card.jpg";
                      document.getElementById("fateword").innerHTML = "";
                      document.getElementById("chancecard").src = "image/chance card.jpg";
                      document.getElementById("chanceword").innerHTML = "";
                  }, 1000);*/
            }
            playericon[turn - 1].style.width = "35px";
            for (i = 0; i < playernum; i++) {
                if (playerMoney[i] <= 0) {
                    alert(playername[i] + "已破產!");
                    bankruptcheck[i] = true;
                    bankrupt++;
                }
            }
            if (bankrupt >= (playernum - 1)) {
                for (i = 0; i < playernum; i++) {
                    if (bankruptcheck[i] == false) {
                        alert(playername[i] + "獲勝!");
                        window.location.reload();
                    }
                }
            }


            //else { alert("輪到" + playername[turn - 1] + "擲骰"); }

        }, 100);
        //alert(playerpos[turn - 1]);
        //1 || 3 || 5 || 6 || 8 || 9 || 11 || 12 || 13 || 14 || 15 || 16 || 18 || 19 || 21 || 23 || 25 || 26 || 27 || 28 || 29 || 31 || 32 || 34 || 35 || 37 || 39
    })

})
