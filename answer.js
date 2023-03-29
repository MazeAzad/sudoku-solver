const solveSudoku =(board)=>
{   
    
    const digitsMap=new Map();
    const digitArray=["1","2","3","4","5","6","7","8","9"];
    for(let i=1; i<=9;++i)
    {
        digitsMap.set(`${i}`,i);
    }

    const answer=(row,column)=>{
        if(column>=9) return answer(row+1,0);
        if(row>=9) return board;
        if(digitsMap.has(board[row][column])) return answer(row,column+1);
        // find all possible answers
            // fist I find all the answered cells
            // the i eliminate them form the digits set;
        let answeredMap= new Map();
        for(let i=0; i<9; ++i)
        {
            if(board[row][i]!==".")
            {
                answeredMap.set(board[row][i],true);
            }
        }
        for(let j=0; j<9; ++j)
        {
            if(board[j][column]!==".")
            {
                answeredMap.set(board[j][column],true);
            }
        }
        let q= Math.floor(row/3);
        // console.log(`q for row ${q}`);
        let lowRow= q*3;
        let highRow= lowRow+2;
        q=Math.floor(column/3);
        // console.log(`q for column ${q}`);
        let lowColumn=q*3;
        let highColumn=lowColumn+2;
        // console.log(`row:${row} --------------------------- }`);
        // console.log(` low row ${lowRow}`);
        // console.log(` high row ${highRow}`);
        // console.log(` column:${column} -----------------------------------`)
        // console.log(` low column ${lowColumn}`);
        // console.log(` high column ${highColumn}`);

        for(let i=lowRow; i<=highRow; ++i)
        {
            for(let j=lowColumn; j<=highColumn ; ++j)
            {   
                if(board[i][j]!==".")
                {   
                    
                    answeredMap.set(board[i][j],true);
                }
            }
        }
        let possibleAnswers=[]
        for(let i=0;i<digitArray.length;++i)
        {
            if(answeredMap.has(digitArray[i]))
                continue;
            else 
            possibleAnswers.push(digitArray[i]);
        }
        if(possibleAnswers.length==0)
        {
            board[row][column]="*";
        }
        else
        {
            board[row][column]=possibleAnswers[0];
        }
        return answer(row,column+1);
    }
     return answer(0,0);
};
console.log(
    solveSudoku(
        [["5","3",".",".","7",".",".",".","."],
        ["6",".",".","1","9","5",".",".","."],
        [".","9","8",".",".",".",".","6","."],
        ["8",".",".",".","6",".",".",".","3"],
        ["4",".",".","8",".","3",".",".","1"],
        ["7",".",".",".","2",".",".",".","6"],
        [".","6",".",".",".",".","2","8","."],
        [".",".",".","4","1","9",".",".","5"],
        [".",".",".",".","8",".",".","7","9"]]
    )
    
);
