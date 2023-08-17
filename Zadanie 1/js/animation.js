const animateTileBounce = (tile) => {
    tile.classList.add('is-field', 'animate__animated','animate__bounce' )
    
}
const animateTileReveal = (row) => {
        row.querySelectorAll('.tile').forEach((tile, index )=> {
        tile.classList.remove('animate__bounce', 'animate__flipInY')
        setTimeout(() => {
            tile.style.visibility = 'visible'
            tile.classList.add('animate__flipInY', `animate__delay-${index}s`)
        }, 0);
    });

}
const animateTileDance = (row) => {
    row.querySelectorAll('.tile').forEach((tile, index )=> {
    tile.innerHTML = solution.charAt(index)
    tile.classList.remove('animate__bounce', 'animate__flipInY', 'animate__tada')
    setTimeout(() => {
        tile.classList.add('animate__tada', `animate__delay-${index}s`)
    }, 0);
});
}
const animateRowShake = (row) => {
    row.classList.remove('animate__shakeX')
    setTimeout(() => {
        row.classList.add('animate__animated','animate__shakeX' )
        
    }, 0);
    
}
const youVeryMuchLose = () => {
    let board = document.querySelector('.board')
    board.classList.add('animate__animated', 'animate__hinge')
}

const highlightLetters = (row) => {
let presentLetters = []

    row.querySelectorAll('.tile').forEach((tile, index )=> {
    tile.style.visibility = 'hidden'
        let letter = noAccents(word.charAt(index))
         let colorClass = 'wrong'
         if(noAccentSolution.includes(letter)){
            if(!lettersInRow.correct.includes(letter) && !presentLetters.includes(letter)){
                colorClass = 'present'
                presentLetters.push(letter)
            }
         }
         if (noAccentSolution.charAt(index) === letter){
            colorClass = 'correct'
         }
        tile.classList.add(colorClass)
        })
        document.querySelectorAll('.keyboard .tile').forEach(tile => {
            let colorClass = ''
    
            if (lettersInRow.wrong.includes(tile.id)) colorClass = 'wrong'
            if (lettersInRow.present.includes(tile.id)) colorClass = 'present'
            if (lettersInRow.correct.includes(tile.id)) colorClass = 'correct'
    
            if (colorClass) tile.classList.add(colorClass)
        })
}
