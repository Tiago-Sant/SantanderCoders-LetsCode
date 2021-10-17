class Joquempo {
  constructor() {
    this.player1 = [];
    this.player2 = [];
    this.playerHistory = []
  }

  savePlays() {
    // save player history loss/win
  }

  clearPlayersHand() {
    this.playerHistory.player1.played = ''
    this.playerHistory.player2.played = ''
  }

  start(player1, player2) {
    this.player1 = player1;
    this.player2 = player2;
    this.playerHistory = {
      player1: { name: `${player1.name}`, played: `${player1._hand}`, score: { wins: 0, losses: 0 } },
      player2: { name: `${player2.name}`, played: `${player2._hand}`, score: { wins: 0, losses: 0 } }
    };

    this.clearPlayersHand()

    return console.log('Começou um novo jogo!')
  }

  updatePlayerPlayed(player, value) {
    this.playerHistory[player].played = [...this.playerHistory[player].played, value]
  }

  addScoreResult(player, result) {
    this.playerHistory[player].score[result] = this.playerHistory[player].score[result] + 1
  }

  updatePlayerScore(winner, loser) {

    this.addScoreResult(winner, 'wins')
    this.addScoreResult(loser, 'losses')

  }

  receivePlay(hand, playerName) {
    if (this.player1.name == playerName) {
      this.updatePlayerPlayed('player1', hand)
    } else {
      this.updatePlayerPlayed('player2', hand)
    }

    if (this.playerHistory.player1.played.length == this.playerHistory.player2.played.length) {
      console.log(this.result());
    }
  }

  checkHand() {

    const handP1 = this.player1._hand.toLowerCase()
    const handP2 = this.player2._hand.toLowerCase()

    const playedWinner = {
      'papel': 'pedra',
      'tesoura': 'papel',
      'pedra': 'tesoura'
    }

    if (playedWinner[handP1] === handP2) {
      return ['player1', 'player2']
    }

    if (handP1 === handP2) {
      return ['empate', 'empate']
    }

    return ['player2', 'player1']
  }

  getPlayerWins(player) {
    return this.playerHistory[player].score.wins
  }

  getPlayerName(player) {
    return this.playerHistory[player].name;
  }

  result() {
    const [winner, loser] = this.checkHand()
    if (winner === 'player1' || winner === 'player2') { this.updatePlayerScore(winner, loser) }

    const scorePlayer1 = this.getPlayerWins('player1')
    const scorePlayer2 = this.getPlayerWins('player2')
    const gameScore = `${this.player1.name} ${scorePlayer1} x ${scorePlayer2} ${this.player2.name}`

    return winner == 'empate' ? `Empatou! ${gameScore}` : `${this[winner].name} venceu! ${gameScore}`;
  }

  getTotalScore() {
    return `PLacar: ${this.getPlayerName('player1')} ${this.getPlayerWins('player1')} x ${this.getPlayerWins('player2')} ${this.getPlayerName('player2')}`
  }

  getWinner() {
    if (this.getPlayerWins('player1') === this.getPlayerWins('player2')) return `Empatou! ${this.getTotalScore()}`

    return this.getPlayerWins('player1') > this.getPlayerWins('player2') ?
      `${this.getPlayerName('player1')} venceu! ${this.getTotalScore()}` :
      `${this.getPlayerName('player2')} venceu! ${this.getTotalScore()}`
  }

  gameOver() {

    return `Acabou o Jogo! ${this.getWinner()}`
  }
}

class Player {
  constructor(name) {
    this.name = name
    this._hand = '';
  }

  play(game, hand) {
    this.setHandHistory(hand);
    game.receivePlay(hand, this.name)
  }

  setHandHistory(hand) {
    this._hand = hand;
  }

  getHandHistory() {
    return this._hand;
  }

  getPlayerHistory() {
    return this.playerHistory;
  }
}

  
  let vitoria = new Player('Vitoria')
  let pedro = new Player('Pedro')
  let jogo1 = new Joquempo()
  jogo1.start(vitoria, pedro);
  
  // copy/paste one by one to test conditionals
  // vitoria.play(jogo1, 'pedra')
  // pedro.play(jogo1, 'pedra')
  
  // vitoria.play(jogo1, 'pedra')
  // pedro.play(jogo1, 'papel')
  
  // vitoria.play(jogo1, 'tesoura')
  // pedro.play(jogo1, 'pedra')
  
  // vitoria.play(jogo1, 'pedra')
  // pedro.play(jogo1, 'tesoura')
  
  // console.log(jogo1.playerHistory);