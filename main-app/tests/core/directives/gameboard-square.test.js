(function () {
    'use strict';
    describe('Gamebaord sqaure directive test', function() {
        var $compile,
            $rootScope;

        beforeEach(function(){
            module('Tombola.Games.NoughtsAndCrosses.Game');
            inject(function(_$compile_, _$rootScope_){
                $compile = _$compile_;
                $rootScope = _$rootScope_;
            });
        });

        it('Ensure that the game board square directive inputs data for square 4', function() {
            var directiveElement = '<game-board-square square-number="3" class="cell"></game-board-square>';

            $rootScope.gameBoard = function(){return [0,0,0,1,0,0,0,0,0];};
            var element = $compile(directiveElement)($rootScope);
            $rootScope.$digest();

            var subElement = element.find('div');

            subElement.attr('class').should.equal('cell player');
            subElement.attr('ng-click').should.equal('model.takeTurn(3)');
        });

    });
}());