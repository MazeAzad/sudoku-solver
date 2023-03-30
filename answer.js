const solveSudoku =(board)=>
{   
    
    const digitsMap=new Map();
    const digitArray=["1","2","3","4","5","6","7","8","9"];
    for(let i=1; i<=9;++i)
    {
        digitsMap.set(`${i}`,i);
    }
   
    const answer=(row,column,bRow,bColumn,rowCheck,columnCheck,BoxCheck,rowBoxHigh,columnBoxHigh)=>{
        if(bRow==-1)
        {
                if(column>=9) return answer(row+1,0,bRow,bColumn,true,false,false,rowBoxHigh,columnBoxHigh);
                if(row>=9) return board;
                if(digitsMap.has(board[row][column])) return answer(row,column+1,bRow,bColumn,true,false,false,rowBoxHigh,columnBoxHigh);
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
                let lowRow= q*3;
                let highRow= lowRow+2;
                q=Math.floor(column/3);
                let lowColumn=q*3;
                let highColumn=lowColumn+2;
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
                  return answer(row,column,row,column,true,false,false,rowBoxHigh,columnBoxHigh);
                }
                else
                {
                    board[row][column]=possibleAnswers[0];
                }
                return answer(row,column+1,bRow,bColumn,true,false,false,rowBoxHigh,columnBoxHigh,rowBoxHigh,columnBoxHigh);
        }
        else 
        {     
          
                if(rowCheck)
                {   
                  
                    if(column<=0) 
                    {
                        
                        return answer(row,bColumn,bRow,bColumn,false,true,false,rowBoxHigh,columnBoxHigh);
                    }
                    else
                    {   
                         return answer(row,column-1,bRow,bColumn,true,false,false,rowBoxHigh,columnBoxHigh);
                    }
                   
                }
 
                if(columnCheck)
                {     
                    if(row<=0)
                    {
                    columnCheck=false;
                    BoxCheck=true;
                    let q=Math.floor(row/3);
                    let lowRow=q*3;
                    q=Math.floor(bColumn/3);
                    let lowColumn=q*3;
                    firsTime=true;
                    return answer(lowRow,lowColumn,bRow,bColumn,false,false,true,lowRow+2,lowColumn+2);
                    }
                    return answer(row-1,column,bRow,bColumn,false,true,false,rowBoxHigh,columnBoxHigh)
                }
                if(BoxCheck)
                {   if(row===rowBoxHigh) return board;
                    if(column===columnBoxHigh) return answer(row+1,column-2,bRow,bColumn,false,false,true,rowBoxHigh,columnBoxHigh);
                    return answer(row,column+1,bRow,bColumn,false,false,true,rowBoxHigh,columnBoxHigh)
                }
    
        }
        
    }
     return answer(0,0,-1,-1,true,false,false,-1,-1);
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
