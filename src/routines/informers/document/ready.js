//emits document ready when it is

mediator.on('postboot', function() {
    mediator.emit('lib.jquery', function(err, jQuery) {
        if (err) return mediator.emit('document.ready.err', err);
        jQuery(function() {
        
            //event: document ready
            mediator.emit('document.ready');
        });
    });
});