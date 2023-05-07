
class Cell
{
    constructor(value,hint)
    {
        this.value = value;
        this.hint = hint;
    }
}

function easyLevel()
{
    let easyPuzzle = [
        //row 1
        [
            new Cell(8,false), new Cell(7,true), new Cell(5,false),
            new Cell(3,false), new Cell(6,true), new Cell(1,false),
            new Cell(2,true), new Cell(4,false), new Cell(9,false)
        ],
        [
            new Cell(9,false), new Cell(2,true), new Cell(1,false),
            new Cell(7,false), new Cell(5,false), new Cell(4,false),
            new Cell(8,true), new Cell(6,false), new Cell(3,false)
        ],
        [
            new Cell(3,false), new Cell(4,true), new Cell(6,true),
            new Cell(8,true), new Cell(9,true), new Cell(2,false),
            new Cell(7,true), new Cell(1,true), new Cell(5,true)
        ],
        //row 2
        [
            new Cell(5,false), new Cell(8,true), new Cell(4,true),
            new Cell(7,true), new Cell(1,true), new Cell(3,false),
            new Cell(9,false), new Cell(2,false), new Cell(6,false)
        ],
        [
            new Cell(6,false), new Cell(9,true), new Cell(7,true),
            new Cell(2,false), new Cell(4,false), new Cell(8,false),
            new Cell(1,true), new Cell(3,true), new Cell(5,false)
        ],
        [
            new Cell(1,false), new Cell(2,false), new Cell(3,false),
            new Cell(6,false), new Cell(5,true), new Cell(9,true),
            new Cell(4,true), new Cell(8,true), new Cell(7,false)
        ],
        //row 3
        [
            new Cell(6,true), new Cell(9,true), new Cell(7,true),
            new Cell(1,false), new Cell(5,true), new Cell(8,true),
            new Cell(4,true), new Cell(3,true), new Cell(2,false)
        ],
        [
            new Cell(4,false), new Cell(1,false), new Cell(2,true),
            new Cell(3,false), new Cell(7,false), new Cell(9,false),
            new Cell(5,false), new Cell(8,true), new Cell(6,false)
        ],
        [
            new Cell(5,false), new Cell(3,false), new Cell(8,true),
            new Cell(2,false), new Cell(6,true), new Cell(4,false),
            new Cell(9,false), new Cell(7,true), new Cell(1,false)
        ],
    ];

    return shufflePuzzle(easyPuzzle);
}

function shufflePuzzle(puzzle)
{
    return puzzle;
}

function randomNumber( min, max )
{
    return Math.floor( Math.random() * ( max - min + 1) + min ) 
}