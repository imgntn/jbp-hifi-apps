{
    gameName:'chess',
    matURL:'',
    spawnStyle: 'arranged',
    snapToGrid:true,
    startingArrangement: [
        ['1:rook', '1:knight', '1:bishop', '1:queen', '1:king', '1:bishop', '1:knight', '1:rook'],
        ['1:pawn', '1:pawn', '1:pawn', '1:pawn', '1:pawn', '1:pawn', '1:pawn', '1:pawn'],
        ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
        ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
        ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
        ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
        ['2:rook', '2:knight', '2:bishop', '2:queen', '2:king', '2:bishop', '2:knight', '2:rook'],
        ['2:pawn', '2:pawn', '2:pawn', '2:pawn', '2:pawn', '2:pawn', '2:pawn', '2:pawn'],
    ],
    //array of objects.  one object per player (i.e. dif color pieces)
    pieces: [{
        king: '',
        queen: '',
        rook: '',
        bishop: '',
        knight: '',
        pawn: ''
    }, {
        king: '',
        queen: '',
        rook: '',
        bishop: '',
        knight: '',
        pawn: ''
    }]
}