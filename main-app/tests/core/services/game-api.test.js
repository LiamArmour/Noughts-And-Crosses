(function () {
    'use strict';
    describe('Testing the game model service', function () {
        var playerSelection,
            gameModel,
            sandbox,
            $stateSpy,
            $rootScope;

        beforeEach(function () {
            module('ui.router');
            module('Tombola.Games.NoughtsAndCrosses.Game');
            module(function ($provide) {
                $provide.value('GameProxy', mocks.GameProxy);
                $provide.value('$state', mocks.$state);
            });

            sandbox = sinon.sandbox.create();
            $stateSpy = sinon.sandbox.spy(mocks.$state, 'go');

            inject(['$rootScope', '$injector', function (_$rootScope_, $injector) {
                $rootScope = _$rootScope_;
                gameModel = $injector.get('GameApi');
            }]);
        });

        it.skip(' New game game won sets values and ends', function () {

        });

        it.skip('Ensures the take turn function works', function () {

        });

        //me.makeNewGame = function (player1Type, player2Type, updateCallback) {
        //    callApi("newgame", createNewGameData(player1Type, player2Type), updateCallback);
        //};
        //
        //me.takeTurn = function (playerNumber, squareNumber, updateCallback) {
        //    callApi("makemove", createMakeMoveData(playerNumber, squareNumber), updateCallback);
        //};

        afterEach(function(){
            //sinon.stub.reset();
            sandbox.restore();
        });
    });
}());