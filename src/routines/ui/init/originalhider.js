//hides original elements as soon as possible

mediator.on('document.ready', function() {
    mediator.emit('lib.jquery', function(err, jQuery) {
        if (err) return mediator.emit('ui.err', err);
    
        //hide
        jQuery('body *').css('display', 'none');
        
        //event: original hidden
        mediator.emit('ui.original.hidden');
    });
});