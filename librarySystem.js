	
var libraryStorage = {};

(function(){
	function librarySystem(libraryName, dependencies, callback){
	if(arguments.length >1){
		if(Array.isArray(dependencies) && typeof callback === 'function'){
			listOfDependencies = dependencies;
		
			libraryStorage[libraryName] = function(){
				listOfDependencies =  dependencies.map(function(dependency){
					return librarySystem(dependency);
				});
				return callback.apply(this, listOfDependencies);
			}
			
		}

		else{
			throw new TypeError("Type of function parameters is not valid.");
		}
		
	}

	else{
		if(typeof libraryStorage[libraryName] === 'function'){
			var libraryStoredAsFuntion = libraryStorage[libraryName];
			libraryStorage[libraryName] =  libraryStoredAsFuntion();	
		}
		return libraryStorage[libraryName];
	}	
}

window.librarySystem = librarySystem;

})();