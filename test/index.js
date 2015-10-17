var expect = require('expect.js'),
    laz = require('../lib'),
    sinon = require('sinon'),
    lazyRequire = laz.lazyRequire(require);

describe('lazyRequire', function() {

    beforeEach(function() {
        delete require.cache[require.resolve('./testDirs/a')];
        delete require.cache[require.resolve('./testDirs/b')];

        global.spyA = sinon.spy();
        global.spyB = sinon.spy();
    });

    afterEach(function() {
        delete global.spyA;
        delete global.spyB;
    });

    it('object has correct value', function() {
        var obj = lazyRequire({a:'./testDirs/a', c: './testDirs/b'});
        expect(obj).to.eql({a: 'a', c: 'b'});
    });

    it('requires are not evaluated till called', function() {
        var obj = lazyRequire({a:'./testDirs/a', b: './testDirs/b'});
        expect(global.spyA.callCount).to.be(0);
        expect(global.spyB.callCount).to.be(0);

        var a = obj.a;

        expect(global.spyA.callCount).to.be(1);
        expect(global.spyB.callCount).to.be(0);

        var b = obj.b;

        expect(global.spyA.callCount).to.be(1);
        expect(global.spyB.callCount).to.be(1);

    });
});

