
let puzzle;
let gameStack;
let currentActiveSubGrid;
let errors;
let hints;

function startGame()
{
    hints = 3
    errors = 0;
    updateErrors();
    setHints();
    gameStack = [];
    addGrids();
    selectLevel(0);
    currentActiveSubGrid = document.getElementById('grid00');
    
    removeSubGridClass('active-sub-grid');
    removeSubGridClass('highlight-sub-grid');
    removeSubGridClass('animate__animated');
    removeSubGridClass('animate__headShake');
    let subGridValue = parseInt(currentActiveSubGrid.childNodes[0].innerText);
    let grid = currentActiveSubGrid.parentNode;
    
    highlightGrid(grid, currentActiveSubGrid);
    highlightAdjacentGrids(currentActiveSubGrid);
    highlightSameNumbers(subGridValue);
    currentActiveSubGrid.classList.add('active-sub-grid');
}

function setHints()
{
    let bHints = document.getElementById("hints");
    bHints.innerHTML = hints
}

function getHint()
{
    if(hints!=0 && !isGameOver())
    {
        hints--;
        setHints();
        let unsolved = getUnsolvedSubgrids();
        let randomUnsolved = randomNumber(0,unsolved.length-1);
        let hint = unsolved[randomUnsolved];
        let hintGridsId = getGridSubGridIDs(hint);
        let hintNumber = puzzle[hintGridsId[1]][hintGridsId[0]].value;

        hint.childNodes[0].innerHTML = hintNumber;
        hint.childNodes[0].style.visibility = "visible";
        hint.classList.add('animate__animated');
        hint.classList.add('animate__headShake');
        hint.classList.add('right-guess');

        lockGame();
    }
}

//add the grid divs to the board div
function addGrids()
{
    let board = document.querySelector(".board");

    for(let i = 0; i < 9; i++)
    {
        let grid = document.createElement('div');
        grid.classList.add('grid');
        grid.id = "grid"+i;
        addSubGrids(grid);
        board.appendChild(grid);
    }
}

//add the subgrids divs to the grid divs
function addSubGrids(grid)
{
    for(let i = 0; i < 9; i++)
    {
        let subGrid = document.createElement('div');
        subGrid.onclick = highlightSelection;
        subGrid.classList.add('sub-grid');
        subGrid.id = grid.id+""+i;
        let p = document.createElement('p');
        p.innerText = "0";
        p.style.visibility = "hidden";
        subGrid.appendChild(p);
        grid.appendChild(subGrid);
    }
}

//highlight the subgrid selected by the user and all related subgrids
function highlightSelection(evt)
{
    if(!isGameOver())
    {
        if(typeof myTimer === 'undefined')
        {
            pausePlay();
        }
    }
    removeSubGridClass('active-sub-grid');
    removeSubGridClass('highlight-sub-grid');
    removeSubGridClass('animate__animated');
    removeSubGridClass('animate__headShake');
    
    let selectedsubGrid = evt.currentTarget;
    let subGridValue = parseInt(selectedsubGrid.childNodes[0].innerText);
    let grid = selectedsubGrid.parentNode;
    
    highlightGrid(grid, selectedsubGrid);
    highlightAdjacentGrids(selectedsubGrid);
    highlightSameNumbers(subGridValue);
    selectedsubGrid.classList.add('active-sub-grid');
    currentActiveSubGrid = selectedsubGrid;
}

//remove a particular css class from all the subgrids
function removeSubGridClass(subClass)
{
    let subGrids = document.querySelectorAll('.sub-grid');
    for(let i = 0; i < subGrids.length; i++)
    {
        subGrids[i].classList.remove(subClass);
    }
}

//highlight all the adjacent subgrids of the selected subgrid
function highlightAdjacentGrids(subGrid)
{
    let gridId = getGridSubGridIDs(subGrid)[1];
    let subGridId = getGridSubGridIDs(subGrid)[0];
    
    let adjacentGrid1, adjacentGrid2;

    switch(gridId%3)
    {
        case 0:
            adjacentGrid1 = document.getElementById('grid'+ (gridId+1));
            adjacentGrid2 = document.getElementById('grid'+(gridId+2));
            break;
        case 1:
            adjacentGrid1 = document.getElementById('grid'+(gridId-1));
            adjacentGrid2 = document.getElementById('grid'+(gridId+1));
            break;
        case 2:
            adjacentGrid1 = document.getElementById('grid'+(gridId-1));
            adjacentGrid2 = document.getElementById('grid'+(gridId-2));
            break;
    }

    highlightAdjacentHorizontalGrids(adjacentGrid1,subGridId);
    highlightAdjacentHorizontalGrids(adjacentGrid2,subGridId);

    switch( Math.floor(gridId/3) )
    {
        case 0:
            adjacentGrid1 = document.getElementById('grid'+ (gridId+3));
            adjacentGrid2 = document.getElementById('grid'+(gridId+6));
            break;
        case 1:
            adjacentGrid1 = document.getElementById('grid'+(gridId+3));
            adjacentGrid2 = document.getElementById('grid'+(gridId-3));
            break;
        case 2:
            adjacentGrid1 = document.getElementById('grid'+(gridId-3));
            adjacentGrid2 = document.getElementById('grid'+(gridId-6));
            break;
    }

    highlightAdjacentVerticalGrids(adjacentGrid1,subGridId);
    highlightAdjacentVerticalGrids(adjacentGrid2,subGridId);
}

//highlight all the vertical adjacent subgrids of the selected subgrid
function highlightAdjacentVerticalGrids( adjacentGrid,subGridId)
{
    let position = subGridId%3;

    for(let i = 0; i < adjacentGrid.childNodes.length; i++)
    {
        if(position == i%3)
        {
            adjacentGrid.childNodes[i].classList.add('highlight-sub-grid');
        }
    }
}

//highlight all the horizontal adjacent subgrids of the selected subgrid
function highlightAdjacentHorizontalGrids(adjacentGrid, subGridId)
{
    let position = Math.floor(subGridId/3);

    for(let i = 0; i < adjacentGrid.childNodes.length; i++)
    {
        if(position == Math.floor(i/3))
        {
            adjacentGrid.childNodes[i].classList.add('highlight-sub-grid');
        }
    }
}

//highlight all the subgrids on the given grid
function highlightGrid(grid)
{
    for(let i = 0; i < grid.childNodes.length; i++)
    {
        grid.childNodes[i].classList.add('highlight-sub-grid');
    }
}

//highlight all the subgrids that contains the same number of the selected subgrid
function highlightSameNumbers(number)
{
    let subGrids = document.querySelectorAll('.sub-grid');

    for(let i = 0; i < subGrids.length; i++)
    {
        let subGridNum = parseInt(subGrids[i].childNodes[0].innerText);
        if(number ==  subGridNum)
        {
            subGrids[i].classList.add('active-sub-grid');
            subGrids[i].classList.add('animate__animated');
            subGrids[i].classList.add('animate__headShake');
        }
        
    }

}

/*gets the desire level dificulty and aply it to the grid
  0=easy 1:medium 2: hard*/
function selectLevel(level)
{
    resetTimer();

    if(typeof myTimer === 'undefined')
    {
        pausePlay();
    }

    let levelSelector0 = document.getElementById('level-selector-0');
    let levelSelector1 = document.getElementById('level-selector-1');
    let levelSelector2 = document.getElementById('level-selector-2');
    
    /*switch(level)
    {
        case 0:
            levelSelector0.classList.add('under-line');
            levelSelector1.classList.remove('under-line');
            levelSelector2.classList.remove('under-line');
            break;
        case 1:
            levelSelector0.classList.remove('under-line');
            levelSelector1.classList.add('under-line');
            levelSelector2.classList.remove('under-line');
            break;
        case 2:
            levelSelector0.classList.remove('under-line');
            levelSelector1.classList.remove('under-line');
            levelSelector2.classList.add('under-line');
            break;
    }*/

    puzzle = easyLevel();
    for(let i = 0; i < puzzle.length;i++)
    {
        let subGrids = document.getElementById('grid'+i).childNodes;
        for( let y = 0; y< subGrids.length; y++)
        {
            subGrids[y].childNodes[0].innerText = puzzle[i][y].hint? puzzle[i][y].value:0;
            subGrids[y].childNodes[0].style.visibility = puzzle[i][y].hint?"visible":"hidden";
        }
    }
}

function addGameStack(selectedNumber)
{
    if(!isGameOver())
    {
        //if the game is paused the timer starts again
        if(typeof myTimer === 'undefined')
        {
            pausePlay();
        }

        let subGridId = parseInt( currentActiveSubGrid.id.substring(currentActiveSubGrid.id.length-1) );
        let gridId = parseInt( currentActiveSubGrid.id.substring(currentActiveSubGrid.id.length-2,currentActiveSubGrid.id.length-1) );
    
        let puzzleGrid = puzzle[gridId];
        removeSubGridClass('animate__animated');
        removeSubGridClass('animate__headShake');

        if(!puzzleGrid[subGridId].hint)
        {
            if(puzzleGrid[subGridId].value == selectedNumber)
            {
                currentActiveSubGrid.classList.remove('wrong-guess');
                currentActiveSubGrid.classList.add('right-guess');
                currentActiveSubGrid.childNodes[0].innerText = selectedNumber;
                currentActiveSubGrid.childNodes[0].style.visibility = "visible";
                currentActiveSubGrid.classList.add('animate__animated');
                currentActiveSubGrid.classList.add('animate__headShake');

                lockGame();
            }
            else
            {
                if(selectedNumber == 0)
                {
                    if(!currentActiveSubGrid.classList.contains('right-guess'))
                    {
                        currentActiveSubGrid.classList.remove('wrong-guess');
                        currentActiveSubGrid.childNodes[0].innerText = parseInt(selectedNumber) ;
                        currentActiveSubGrid.childNodes[0].style.visibility = "hidden";    
                    }
                }
                else
                {
                    if(!currentActiveSubGrid.classList.contains('right-guess'))
                    {
                        errors++;
                        if(errors == 3)
                        {
                            resetTimer();
                            showAlertMessage('Perdiste! 😢');
                        }

                        updateErrors();
                        currentActiveSubGrid.classList.add('wrong-guess');
                        currentActiveSubGrid.childNodes[0].innerText = parseInt(selectedNumber) ;
                        currentActiveSubGrid.childNodes[0].style.visibility = "visible";
                        currentActiveSubGrid.classList.add('animate__animated');
                        currentActiveSubGrid.classList.add('animate__headShake');    
                    }
                }
            
            }
            gameStack.push([selectedNumber,currentActiveSubGrid]);
        }
    }
}

//updates the errors span to show the current count of errors
function updateErrors()
{
    let errorsSpan = document.getElementById('errors').childNodes[1];
    errorsSpan.innerText = errors;
    if(errors == 3)
    {
        resetTimer();
    }
}

//it solves the whole puzzle
function solve()
{
    if(!isGameOver())
    {
        resetTimer();
        let subGrids = document.querySelectorAll('.sub-grid');
        for(let i = 0; i < subGrids.length; i++)
        {
            let subGridId = getGridSubGridIDs(subGrids[i])[0];
            let gridId = getGridSubGridIDs(subGrids[i])[1];
            subGrids[i].classList.remove("right-guess");
            subGrids[i].classList.remove("wrong-guess");
            let subGridChild = subGrids[i].childNodes[0];
            subGridChild.style.visibility = "visible";
            subGridChild.innerText = puzzle[gridId][subGridId].value;
            if(!puzzle[gridId][subGridId].hint)
            {
                subGrids[i].classList.add("right-guess");
            }
        }

        showAlertMessage('Inténtalo la próxima');
    }
}

//locks the game functionality when is over
function lockGame()
{
    if(isGameOver())
    {
        resetTimer();
        showAlertMessage('Felicidades! 🎉');
    }
}

function getUnsolvedSubgrids()
{
    let unsolved = [];
    let subGrids = document.querySelectorAll('.sub-grid');
    for(let i = 0; i < subGrids.length; i++)
    {
        if(subGrids[i].childNodes[0].style.visibility != "visible" ||
        subGrids[i].classList.contains('wrong-guess'))
        {
            unsolved.push(subGrids[i]);
        }
    }

    return unsolved;
}

function getPendingSubGrids()
{
    let pending = [];
    let subGrids = document.querySelectorAll('.sub-grid');
    for(let i = 0; i < subGrids.length; i++)
    {
        if(subGrids[i].childNodes[0].style.visibility != "visible"
        || subGrids[i].classList.contains('wrong-guess'))
        {
            unsolved.push(subGrids[i]);
        }
    }

    return pending;
}

function isGameOver()
{
    return getUnsolvedSubgrids().length == 0 || errors == 3;
}

function getGridSubGridIDs(subGrid)
{
    let Ids = [];
    Ids.push( parseInt(subGrid.id.substring(subGrid.id.length-1)) );
    Ids.push( parseInt(subGrid.id.substring(subGrid.id.length-2,subGrid.id.length-1)) );
    return Ids;
}

//displays the alert message at the end of the game
function showAlertMessage(msg)
{
    let alertMsgDiv = document.getElementById('alert-msg');
    let alertMsgText = document.getElementById('alert-msg-text');
    alertMsgDiv.style.display = 'block';
    alertMsgText.innerHTML = `<strong>Fin del juego: </strong>${msg} `;
}

window.addEventListener('load',startGame);

window.addEventListener("visibilitychange", (event) => {
    if (document.visibilityState != "visible") {
        if(typeof myTimer !== 'undefined')
        {
            pausePlay();
        }
    }
  });