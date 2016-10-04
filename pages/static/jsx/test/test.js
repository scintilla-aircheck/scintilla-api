var chai = require('chai');
var deepFreeze = require('deep-freeze-strict');

var expect = chai.expect;

function counter(state, action) {
    switch( action.type ) {
        case 'INCREMENT':
            return state + 1;
        default:
            return state;
    }
    return state;
}

describe('Reducer', function() {
    describe('counter()', function () {
        it('should increment and decrement the state', function () {
            const action = {type: 'INCREMENT'};

            deepFreeze(action);

            expect(
                counter(0, action)
            ).to.equal(1);

            expect(
                counter(1, action)
            ).to.equal(2);
        });
    });
});
