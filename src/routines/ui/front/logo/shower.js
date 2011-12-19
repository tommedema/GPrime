//shows original logo element

mediator.on('document.ready', function() {
    mediator.emit('lib.jquery', function(err, jQuery) {
        if (err) return mediator.emit('ui.err', err);
        
        //show original logo, parents and children
        var newLogo = jQuery('#hplogo');
        newLogo.add(newLogo.parents()).add(newLogo.find('*')).css('display', '');
        
    });
});