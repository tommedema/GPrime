var path            = require('path'),
    fs              = require('fs'),
    dive            = require('dive'),
    sourcePath      = path.resolve('./src'),
    manifestPath    = path.join(sourcePath, 'manifest.json'),
    routinesDir     = path.join(sourcePath, 'routines'),
    building;
    
//build immediately
console.log('building...');
building = true;
build(function() {
    building = false;
});

//build on changes
/*
fs.watch(sourcePath, function(event, filename) {
    if (!building) {
        console.log('building after change detected...');
        building = true;
        build(function() {
            building = false;
        });
    }
});
*/
    
//function to build project
function build(cb) {

    //get file
    fs.readFile(manifestPath, 'utf8', function _update(err, data) {
        if (err) throw err;
        
        //get manifest
        var manifest = JSON.parse(data);
        
        //flush and reset domain matches
        var matchentry  = manifest['content_scripts'][0]['matches'] = [],
            domains     = manifest['content_scripts'][0]['domains'] || [];
        domains.forEach(function _add(domain) {
            matchentry.push(
                                '*://www.google.' + domain + '/',
                                '*://google.' + domain + '/',
                                '*://www.google.' + domain + '/search*',
                                '*://google.' + domain + '/search*'
                            );
        });
        
        //flush and reset js entry
        var jsentry     = [],
            bootfiles   = (manifest['content_scripts'][0]['bootjs'] || []),
            postbfiles  = (manifest['content_scripts'][0]['postbootjs'] || []);
        
        //add boot files
        bootfiles.forEach(function _add(bfile) {
            jsentry.push(bfile);
        });
        
        //add routines
        dive(routinesDir, {recursive: true, all: false, directories: false}, function _addRoutine(err, routine) {
            if (err) throw err;
            
            //add routine
            jsentry.push(path.relative(sourcePath, routine).replace(new RegExp('\\\\', 'g'), '/'));
            
        }, function _complete() {
            
            //add post-boot files
            postbfiles.forEach(function _add(bfile) {
                jsentry.push(bfile);
            });
            
            //remove duplicates and set new js field
            manifest['content_scripts'][0]['js'] = jsentry = jsentry.filter(function _checkUnique(element, index, arr) {
                return jsentry.lastIndexOf(element) === index;
            });
            
            //get string back
            var manifestStr = JSON.stringify(manifest, null, 4);
            
            //update file
            fs.writeFile(manifestPath, manifestStr, 'utf8', function _finish(err) {
                if (err) throw err;
                
                //done
                console.log('build done');
                if (cb) cb();
            });
        });
    });
}