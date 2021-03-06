////////////////////
//helper functions//
////////////////////
/*function to determine if more
for loops must be run*/	
var hasMoreKeys = function(obj) {
	    try {
	    	if(Object.keys(obj));
		}
		catch(err) {
	    	return false
		}
	if(Object.keys(obj).length === 0) return false;
    return true;
	};
 /*handles event to show/hide subkeys and values*/
var showStuff = function(e) {
    e.stopPropagation();
    var currentID = this.id;
    var childrenArr = this.children;
    if(childrenArr.length>0 && document.getElementById(childrenArr[0].id).style.display === 'none'){
    	for(var i =0; i<childrenArr.length; i++){
    		var childID = childrenArr[i].id;
    		document.getElementById(childID).style.display = 'block';
    	}
    }else if(document.getElementById(currentID).style.display === 'block'){
    	for (var i = 0; i < childrenArr.length; i++) {
    		var childID = childrenArr[i].id;
    		// console.log('minifier firing');
    		document.getElementById(childID).style.display = 'none';
    	}
    }    
};//end of showStuff


var appendFunc = function(){//eventually write this to save some space
}

var littleFunc = function(littleObject, parentDivID){
	if(hasMoreKeys(littleObject)){
		for(var i=0; i<Object.keys(littleObject).length; i++) {
			var keyName = Object.keys(littleObject)[i];/*iterating through first layer of keys, keyName is the i-th index of the returned array*/
			var keyNameValue = littleObject[keyName];
			var appendChildDIV = document.createElement('DIV');
			var kNV = keyNameValue.toString();
			if(kNV == '[object Object]') kNV = '';
			var t = document.createTextNode(keyName  + ' : ' + kNV);
			appendChildDIV.appendChild(t);
			appendChildDIV.className = 'indent';
			appendChildDIV.id = keyName + parentDivID;
			document.getElementById(parentDivID).appendChild(appendChildDIV);
			appendChildDIV.onclick = showStuff;
			// console.log('parentDivID :', parentDivID);
			// console.log('appendChildDIV.id : ', appendChildDIV.id);
			document.getElementById(appendChildDIV.id).style.display = 'none';
			if (hasMoreKeys(littleObject[keyName])) {
				littleFunc(littleObject[keyName], appendChildDIV.id);
				}
			}//end of for loop
		}//end of if statement
	};//end littleFunc

var bigFunc = function(calledObj){
	if(hasMoreKeys(calledObj)){
		for(var i=0; i<Object.keys(calledObj).length; i++) {
			var keyName = Object.keys(calledObj)[i];/*iterating through first layer of keys, keyName is the i-th index of the returned array*/
			// console.log(keyName);
			var appendDIV = document.createElement('DIV');
			var t = document.createTextNode(keyName);
			appendDIV.appendChild(t);
			appendDIV.className = 'indent';
			appendDIV.id = keyName;
			document.getElementById("myDiv").appendChild(appendDIV);
			document.getElementById(appendDIV.id).style.display = 'none';
			appendDIV.onclick = showStuff;
			console.log(appendDIV);
			if (hasMoreKeys(calledObj[keyName])) {
				littleFunc(calledObj[keyName], appendDIV.id);
				}	
			}//end of for loop
			// console.log(i)
		}//end of first if
	};//end of bigFunc

bigFunc(data);
document.getElementById('myDiv').onclick = showStuff;// initiates hide/show
