//hides the body during initialization

mediator.on('postboot', function() {
    
    //hides the entire body
    var hideBody = function(head) {
    
        style = document.createElement('style'),
        rules = document.createTextNode('body { display: none; }');
        style.setAttribute('id', 'pr-bodyhider');
        style.type = 'text/css';
        if (style.styleSheet) {
            style.styleSheet.cssText = rules.nodeValue;
        }
        else {
            style.appendChild(rules);
        }
        head.appendChild(style);
        
        //event: body hidden
        mediator.emit('ui.body.hidden');
    };
    
    //inject logic to hide original interface as soon as possible (before document ready)
    var head    = document.getElementsByTagName('head'),
        iv      = head[0] ? hideBody(head[0]) : setInterval(function() {
            if (head[0]) {
                clearInterval(iv);
                hideBody(head[0]);
            }
        }, 0);
});