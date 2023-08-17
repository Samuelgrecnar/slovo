const maxWordLength = 5
const maxTries = 6
let word = ''
let tries = 1
let solution = allWords[allWords.length * Math.random() | 0].toLocaleLowerCase()
let noAccentSolution = noAccents(solution)
let noAccentWords = allWords.map(x => noAccents(x))
let lettersInRow = {
    correct: [],
    present:[],
    wrong:[]
}
    document.addEventListener('keydown', (event) =>{
        if(event.key === 'Enter'){
            submitWord()
        } 
        else if(event.key === 'Backspace'){
            removeLetter()
        }
        else {
            addLetter(event.key)
        }
    })
   
    const submitWord = () => {
        if(word.length != maxWordLength) return
        if(! noAccentWords.includes(noAccents(word))){
            animateRowShake(currentRow())
            return

        }

        findLettersInRow()
        highlightLetters(currentRow())
        animateTileReveal(currentRow())
        setTimeout(() => {
            judgeResoult()
        }, 1500);
    }
    const addLetter = (character) => {
        if(word.length >= maxWordLength) return
        if (/^\p{L}$/u.test(character)){
            word = word + character
            word = word.toLowerCase()

            let tile = currentTile()
            tile.innerHTML = character
            animateTileBounce(tile)
        }
    }
    const removeLetter = () => {
        if(word.length <= 0) return
        let tile = currentTile()
        tile.innerHTML = ''
        tile.className = 'tile'
        word = word.slice(0, -1)
    }
    const currentTile = () => {
        return currentRow().querySelector(' :nth-child(' + word.length + ')')    
    }
    const currentRow = () => {
        return document.querySelector('.row:nth-child(' + tries + ')')
    }
    const judgeResoult = () => {
        if(noAccents(word) === noAccentSolution){
            animateTileDance(currentRow())
            setTimeout(() => {
                alert('WIN!🥳') 
            }, 1700);

        }
        else if(tries >= maxTries){
            alert('😢 riešenie bolo: ' + solution.toUpperCase())
            youVeryMuchLose()
        }
        else{
            word = ''
            tries++
        }
    
    }
    const findLettersInRow = () => {
        let present = [];
        let correct = [];
        let wrong = [];
    
        [...word].forEach((letter, index) => {
            letter = noAccents(letter)
    
            if (noAccentSolution.charAt(index) === letter) {
                correct.push(letter)
            }
            else if (noAccentSolution.includes(letter)) {
                present.push(letter)
            }
            else {
                wrong.push(letter)
            }
        })
    
        lettersInRow = {
            present,
            correct,
            wrong
        }
    }
function noAccents (str) {
	return str.normalize("NFD").replace(/\p{Diacritic}/gu, "");
}