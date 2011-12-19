(function(exports) {
    exports.mediator = new EventEmitter2({wildcard: true});
})(typeof window !== 'undefined' ? window : exports);