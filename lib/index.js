var Luc = require('luc');

function createGetterFn(fn) {
    var called, ret;

    return function() {
        if(!called) {
            called = true;
            ret = fn();
        }

        return ret;
    };
}

function lazyObject(config, defineProps) {
    var obj = {};
    defineProps = defineProps || {};

    Luc.Object.each(config, function(property, fn) {
        var defineConfig = Luc.mix({
            get: createGetterFn(fn)
        }, defineProps);

        Object.defineProperty(obj, property, defineConfig);
    });

    return obj;
}

function lazyRequire(config, requireFn) {
    var lazyConfig = {};

    Luc.Object.each(config, function(property, requirePath) {
       lazyConfig[property] = function() {
           return requireFn(requirePath);
       };
    });

    return lazyObject(lazyConfig, {enumerable: true});
}

exports.lazyRequire = function(requireFn) {
    return function(config) {
        return lazyRequire(config, requireFn);
    }
};
