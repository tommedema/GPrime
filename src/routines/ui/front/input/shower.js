//shows original input element

mediator.on('document.ready', function() {
    mediator.emit('lib.jquery', function(err, jQuery) {
        if (err) return mediator.emit('ui.err', err);
        
        //display original input container, parents and descendents
        var inputCont = jQuery('#sftab'); //#searchform > form > div.tsf-p > div:not([class]) > table > tbody > tr:first > td:first > table > tbody > tr > td:first
        inputCont.add(inputCont.parentsUntil('body')).add(inputCont.find('*')).css('display', '');
    });
});