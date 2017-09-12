
if(Array.prototype.equals){
    console.warn("About to override existing method");
}
Array.prototype.equals = function(array) {
    //Check if array was given
    if(!array) return false;
    //Check if lengths matches
    if(this.length != array.length) return false;
    for(var i = 0, l=this.length; i < l; i++){
        //Check if we have nested arrays
        if(this[i] instanceof Array && array[i] instanceof Array){
            //recurse into nested arrays
            if(!this[i].equals(array[i])) return false;
        }
        //Different object inctances will newver be equal
        else if(this[i] != array[i]) return false;
    }
    return true;
}
Object.defineProperty(Array.prototype, "equals", {enumerable: false});

module.exports = Array.prototype.equals;