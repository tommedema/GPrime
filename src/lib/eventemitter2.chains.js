if (!EventEmitter2) throw 'EventEmitter2 unknown.';

//unordered event chain (emitted once)
EventEmitter2.prototype.oncechain = function() {
    var emitter = this;
    
    //get arguments array
    var args = Array.prototype.slice.call(arguments);
    
    //get callback
    var cb = args.pop();
    
    //keep track of events
    var events = {};
    
    //checks if we are ready to go
    var checkPending = function() {
        for (var event in events) {
            if (events.hasOwnProperty(event) && events[event].pending) {
                return;
            }
        }
        
        //all events fired
        var evargs = [];
        for (var event in events) {
            if (events.hasOwnProperty(event)) {
                evargs = evargs.concat(event.args);
            }
        }
        
        //done
        cb.apply(this, evargs);
    };
    
    //listen to all events once
    args.forEach(function(event) {
        events[event] = {
            pending: true,
            args: null
        };
        emitter.once(event, function() {
            events[event].pending = false;
            events[event].args = Array.prototype.slice.call(arguments);
            checkPending();
        });
    });
    
};