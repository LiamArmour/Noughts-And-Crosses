(function () {
    'use strict';
    describe('Testing the game model service', function () {
        var playerSelection,
            gameModel,
            gameProxyStub,
            sandbox,
            $q,
            $interval,
            $stateSpy,
            winner1Data = {gameboard:'111111111', outcome:'Win', winner:'2'};

        beforeEach(function () {
            module('ui.router')
            module('Tombola.Games.NoughtsAndCrosses.Game');
            module(function ($provide) {
                $provide.value('PlayerSelection', mocks.PlayerSelection);
                $provide.value('GameProxy', mocks.GameProxy);
                $provide.value('$state', mocks.$state);
            });

            sandbox = sinon.sandbox.create();
            $stateSpy = sinon.sandbox.spy(mocks.$state, 'go');

            inject(function ($injector) {
                playerSelection = $injector.get('PlayerSelection');
                gameProxyStub = $injector.get('GameProxy');
                gameModel = $injector.get('GameModel');
                $interval = $injector.get('$interval');
                $q = $injector.get('$q');
            });
        });

        it('ensure the starting player is player one', function(){
            gameModel.currentPlayer.should.equal('1');
        });

        it('ensure the gameboard loads up empty', function(){
            gameModel.gameBoard.should.equal('000000000');
        });

        it('ensure the there is no game winner at the start', function(){
            gameModel.gameWinner.should.equal('');
        });

        it('ensure there is 2 starting players to begin the game', function(){
            gameModel.playerSelection.should.deep.equal(mocks.PlayerSelection);
        });

        it('Ensures game board values are set', function () {
            var deferred = $q.defer();

            gameProxyStub = sinon.sandbox.stub(mocks.GameProxy, 'apiCall', function(foo, bar){
                console.log(foo);
                console.log(bar)
                return deferred.promise;
            });
            
            gameModel.makeNewGame();

            deferred.resolve(winner1Data);
            gameModel.gameBoard.should.equal(winner1Data.gameboard);
            gameModel.gameWinner.should.equal(winner1Data.winner);
        });

        //describe('New Game Updates on player 1 win', function(){
        //
        //
        //
        //    //it('Ensures the game state transfers to game winner', function () {
        //    //    $interval.flush(5000);
        //    //    mocks.$state.go.should.be.calledOnce;
        //    //    mocks.$state.go.should.be.calledWith('gameWin');
        //    //});
        //});

        afterEach(function(){
            sandbox.restore();
        });
    });
}());