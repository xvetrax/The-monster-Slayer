new Vue({
    el: '#app',
    data: {
        playerHealt: 100,
        monsterHealt: 100,
        gameIsRunning: false
    },
    methods: {
        startGame: function() {
            this.gameIsRunning = true;
            this.playerHealt = 100;
            this.monsterHealt = 100;
        },
        attack: function() {
            
            this.monsterHealt -= this.calculateDamage(3, 10);
            
            if (this.checkWin() ){
                return;
            }
             
            this.playerHealt -= this.calculateDamage(5, 12);

            this.checkWin();
        },
        specialAttack: function() {

        },
        heal: function() {

        },
        giveUp: function() {

        },
        calculateDamage: function(min, max) {
            return  Math.max(Math.floor(Math.random() * max) + 1, min);
        },

        checkWin: function() {
            if (this.monsterHealt <= 0) {
                if (confirm('You Won! New Game?')) {
                    this.startGame();
                }else {
                    this.gameIsRunning = false;
                }
              return true;
            } else if (this.playerHealt <= 0) {
                if (confirm('You Lost! New Game?')) {
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