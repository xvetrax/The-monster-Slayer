new Vue({
  el: "#app",
  data: {
    playerHealt: 100,
    monsterHealt: 100,
    gameIsRunning: false,
    turns: []
  },
  methods: {
    startGame: function() {
      this.gameIsRunning = true;
      this.playerHealt = 100;
      this.monsterHealt = 100;
      this.turns = [];
    },
    attack: function() {
      var damage = this.calculateDamage(3, 10);
      this.monsterHealt -= damage;
      this.turns.unshift({
        isPlayer: true,
        text: "Player hit the Monster for " + damage
      });
      if (this.checkWin()) {
        return;
      }

      this.monsterAttack();
    },
    specialAttack: function() {
      var damage = this.calculateDamage(10, 20);
      this.monsterHealt -= damage;
      this.turns.unshift({
        isPlayer: true,
        text: "Player hit the Monster hard for " + damage
      });
      if (this.checkWin()) {
        return;
      }
      this.monsterAttack();
    },
    heal: function() {
      if (this.playerHealt <= 90) {
        this.playerHealt += 10;
      } else {
        this.playerHealt = 100;
      }
      this.turns.unshift({
        isPlayer: true,
        text: "Player heals for 10"
      });
      this.monsterAttack();
    },
    giveUp: function() {
      this.gameIsRunning = false;
    },
    monsterAttack: function() {
      var damage = this.calculateDamage(5, 12);
      this.playerHealt -= damage;
      this.checkWin();
      this.turns.unshift({
        isPlayer: false,
        text: "monster hit the Player for " + damage
      });
    },

    calculateDamage: function(min, max) {
      return Math.max(Math.floor(Math.random() * max) + 1, min);
    },

    checkWin: function() {
      if (this.monsterHealt <= 0) {
        if (confirm("You Won! New Game?")) {
          this.startGame();
        } else {
          this.gameIsRunning = false;
        }
        return true;
      } else if (this.playerHealt <= 0) {
        if (confirm("You Lost! New Game?")) {
          this.startGame();
        } else {
          this.gameIsRunning = false;
        }
        return true;
      }
      return false;
    }
  }
});
