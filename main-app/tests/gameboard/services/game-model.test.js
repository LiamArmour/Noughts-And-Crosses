(function () {
    'use strict';
    describe('Testing the game model service', function () {
        var playerSelection,
            gameModel,
            sandbox,
            $q,
            $stateSpy,
            $rootScope,
            getStartingPlayerSpy,
            gameApiMakeNewGameSpy,
            makeNewGameData = {"outcome":"Continue","gameboard":"000000000","winner":0};

        beforeEach(function () {
            module('ui.router');
            module('Tombola.Games.NoughtsAndCrosses.Game');
            module(function ($provide) {
                $provide.value('PlayerSelection', mocks.PlayerSelection);
                $provide.value('GameApi', mocks.GameApi);
                $provide.value('EndOfGameService', mocks.EndOfGameService)
                $provide.value('$state', mocks.$state);
            });

            sandbox = sinon.sandbox.create();
            $stateSpy = sinon.sandbox.spy(mocks.$state, 'go');
            getStartingPlayerSpy = sinon.sandbox.spy(mocks.PlayerSelection, 'getStartingPlayer');
            gameApiMakeNewGameSpy = sinon.sandbox.spy(mocks.GameApi, 'makeNewGame');

            inject(['$injector', function ($injector) {
                gameModel = $injector.get('GameModel');
                $q = $injector.get('$q');
                $rootScope = $injector.get('$rootScope');
            }]);
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
        //
        //it('showTheGame should safely launch the game', function(){
        //    var deferred = $q.defer();
        //    validatePlayerStub = sandbox.stub(mocks.PlayerType, 'validatePlayerType', function(){return true;});
        //    goSpy = sandbox.spy(mocks.$state, 'go');
        //    sandbox.stub(mocks.PlayerType, 'getPlayer1', function(){return {type:'human'};});
        //    sandbox.stub(mocks.PlayerType, 'getPlayer2', function(){return {type:'human'};});
        //    sandbox.stub(mocks.GameServerProxy, 'APICall', function(){return deferred.promise;});
        //
        //    $scope.showTheGame();
        //
        //    deferred.resolve({
        //        data:{
        //            gameboard:'000000000',
        //            outcome:'continue'
        //        }});
        //    $rootScope.$digest();
        //    validatePlayerStub.should.have.been.calledTwice;
        //    goSpy.should.have.been.calledOnce.calledWithExactly('game');
        //});

        it('Ensures the new game function is working', function(){
            var deferred = $q.defer();

            var apiCallStub = sinon.stub(mocks.GameApi, 'callApi');
            apiCallStub.returns(deferred.promise);

            gameModel.makeNewGame();
            deferred.resolve(makeNewGameData);
            $rootScope.$digest();

            getStartingPlayerSpy.should.have.been.calledOnce;

            gameApiMakeNewGameSpy.should.have.been.calledOnce.calledWithExactly('human',  'human', function(){});

        });

        it('Ensures the take turn function is working', function(){

            //
            //me.takeTurn = function (index){
            //
            //    if (!squareIsFree(index)) {
            //        return;
            //    }
            //    gameApi.takeTurn( me.currentPlayer,  index, updateGameBoard);
            //};

        });



        afterEach(function(){
            sandbox.restore();
        });
    });
}());