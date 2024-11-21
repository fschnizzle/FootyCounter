// let saveEl = document.getElementById("save-el")
// let countEl = document.getElementById("count-el")
let scores = [[0,0],[0,0],[0,0],[0,0]]
let currentQuarter = 1;

let totalGoalsEl = document.getElementById("total-goals-el");
let totalBehindsEl = document.getElementById("total-behinds-el");
let totalScoreEl = document.getElementById("total-score-el");
let currentQuarterEl = document.getElementById("current-quarter-el");
let endQuarterBtn = document.getElementById("end-quarter-btn");


function getQuarterScore(q){
    let g = scores[q][0];
    let b = scores[q][1]
    let t = 0;
    t += g*6
    t += b
    return t
}

function totalGoals(){
    let totalGoals = 0;
    for (i=0; i<scores.length; i++){
        totalGoals += scores[i][0];
    }
    return totalGoals;
}
function totalBehinds(){
    let totalBehinds = 0;
    for (i=0; i<scores.length; i++){
        totalBehinds += scores[i][1];
    }
    return totalBehinds;
}
function totalScore(){
    let totalScore = 0;
    totalScore += totalGoals()*6;
    totalScore += totalBehinds();
    return totalScore;
}

function updateScore(gb, command){
    q = currentQuarter;
    // Check if correct values are given
    if (gb != 'g' & gb != 'b'){
        console.log("Update Scores Failed - Incorrect score type value given")
    }
    else if (q != 1 & q != 2 & q != 3 & q != 4){
        console.log("Update Scores Failed - Incorrect quarter value given")
    }
    
    // Check if goal or behind is being updated
    let index = null;
    if (gb == 'g'){
        index = 0;
    } else if (gb == 'b'){
        index = 1;
    }
    
    // Check whether to increment or decrement (+ or -)
    q -= 1; // Convert to zero based index
    if (command == '+'){
        scores[q][index] += 1;     
    }
    else if (command == '-'){
        if (scores[q][index] > 0){ // Ensure decrement does not decreased to less than 0
            scores[q][index] -= 1;   
        }
    }
    
    updateQuarter();
}

function endQuarter(){
    let QBQel = document.getElementById("QBQ-el");
    let quarter = currentQuarter - 1;
    let g = scores[quarter][0];
    let b = scores[quarter][1];
    let t = getQuarterScore(quarter);

    QBQel.innerText += "\nQ" + (currentQuarter) + ": " + g + " . " + b + " . " + t;
    currentQuarter += 1;
    currentQuarterEl.textContent = currentQuarter;

    // After 3rd quarter update these elems: <button id="save-btn" onclick="endQuarter()">END Q<span id="current-quarter-el"></span></button>
    console.log(scores);
    if (currentQuarter == 4){
        endQuarterBtn.innerHTML = "END GAME";
    } 
    if (currentQuarter == 5){
        endGame();
    }
}

function endGame(){
    console.log("Game is over");
    endQuarterBtn.innerHTML = "RESET";
    endQuarterBtn.setAttribute("onclick", "resetGame()");
    return;
}


function updateQuarter(){
    currentQuarterEl.textContent = currentQuarter;
    totalGoalsEl.textContent = totalGoals();
    totalBehindsEl.textContent = totalBehinds();
    totalScoreEl.textContent = totalScore();
}

function resetGame(){
    scores = [[0,0],[0,0],[0,0],[0,0]];
    currentQuarter = 1;
    updateQuarter();
    let QBQel = document.getElementById("QBQ-el");
    QBQel.textContent = "";
    console.log("Game has been reset");
    endQuarterBtn.innerHTML = "END Q<span id='current-quarter-el'></span>";
    endQuarterBtn.setAttribute("onclick", "endQuarter()");
    currentQuarterEl = document.getElementById("current-quarter-el");
    currentQuarterEl.textContent = currentQuarter;
}

updateQuarter();