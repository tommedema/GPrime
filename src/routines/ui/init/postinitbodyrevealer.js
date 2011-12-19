// reveals body as soon as original elements have been hidden

mediator.oncechain('ui.body.hidden', 'ui.original.hidden', 'document.ready', function() {
    mediator.emit('lib.jquery', function(err, jQuery) {
        if (err) return mediator.emit('ui.err', err);
    
        //reveal
        jQuery('#pr-bodyhider').remove();
        
        //event: revealed
        mediator.emit('ui.body.revealed');
    });
});