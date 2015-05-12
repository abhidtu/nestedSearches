var root=menu.categories;
var ii=0;
var parenthash={};
parenthash.categories={};
parenthash.products={};
parenthash.subitems={};

var hashmap = {};
hashmap.categories = {};
hashmap.products = {};
hashmap.subitems = {};

var array=[];
RecursiveTraversal('categories','categories',root,0,-1,array);

function RecursiveTraversal(firstparent,secondparent,root,depth,parent,array){
  
  if(!root)
     return;
  
  for(var i=0;i < root.length;i++){
  
   	var j=0,first;
   	for(key in root[i]){
   		first = (!j) ? key:first;
   		  	
   			hashmap[firstparent][root[i][first]] = {};
	        hashmap[firstparent][root[i][first]].hash=1;
		    hashmap[firstparent][root[i][first]].name=root[i].name;
	   	    hashmap[firstparent][root[i][first]].parent=parent;
	   	    	  			
				  			
				if(parent!=-1){
				  	if(!parenthash[firstparent][parent]){
				  			hashmap[secondparent][parent]['child'+firstparent] = [];
							parenthash[firstparent][parent]=1;
				  		}
					if(!j){ 
							hashmap[secondparent][parent]['child'+firstparent].push(root[i][first]);
						}
				}

			if(root[i][key] instanceof Array){
   				RecursiveTraversal(key,firstparent,root[i][key],depth+1,root[i][first],array);
   			}
   			j++;
   		}
   	}
}

	var SearchApp = angular.module('SearchApp',[]);

	SearchApp.controller('SearchAppController', ['$scope', '$http', function($scope, $http) {
		
		$scope.tree=menu;
		$scope.depth=0;
		$scope.hashmap=hashmap;

		$scope.searchmap=function(searchstring){

			for(categorykey in $scope.hashmap.categories){
				$scope.hashmap.categories[categorykey].fromparent=0;
				if($scope.hashmap.categories[categorykey].name.indexOf(searchstring)!=-1){
					$scope.hashmap.categories[categorykey].hash=1;
				}else{
					$scope.hashmap.categories[categorykey].hash=0;
				}
			}

			for(categorykey in $scope.hashmap.categories){
				if($scope.hashmap.categories[categorykey].hash){
					var parentcategoryid=$scope.hashmap.categories[categorykey].parent;
					SetParentsVisible(parentcategoryid);
				}
			}
			
			for(productkey in $scope.hashmap.products){
				$scope.hashmap.products[productkey].fromparent=0;
				if($scope.hashmap.products[productkey].name.indexOf(searchstring)!=-1){
					$scope.hashmap.products[productkey].hash=1;
					var parentcategoryid=$scope.hashmap.products[productkey].parent;
					SetParentsVisible(parentcategoryid);
				}else{
					$scope.hashmap.products[productkey].hash=0;
				}
			}

			for(subitemkey in $scope.hashmap.subitems){
				if($scope.hashmap.subitems[subitemkey].name.indexOf(searchstring)!=-1){
					$scope.hashmap.subitems[subitemkey].hash=1;
					var parentproductid=$scope.hashmap.subitems[subitemkey].parent;
					$scope.hashmap.products[parentproductid].hash=1;
					$scope.hashmap.products[parentproductid].fromparent=1;
					var parentcategoryid=$scope.hashmap.products[parentproductid].parent;
					SetParentsVisible(parentcategoryid);
				}else{
					$scope.hashmap.subitems[subitemkey].hash=0;
				}
			}

			for(categorykey in $scope.hashmap.categories){
				if($scope.hashmap.categories[categorykey].hash && $scope.hashmap.categories[categorykey].fromparent!=1){
					if($scope.hashmap.categories[categorykey].childcategories){
						RecurseChildren($scope.hashmap.categories[categorykey].childcategories);
					}
					if($scope.hashmap.categories[categorykey].childproducts){
						RecurseChildren($scope.hashmap.categories[categorykey].childproducts);
					}
				}
			}
			
			for(productkey in $scope.hashmap.products){
				if($scope.hashmap.products[productkey].hash && $scope.hashmap.products[productkey].fromparent!=1){
					if($scope.hashmap.products[productkey].childsubitems){
						RecurseChildren($scope.hashmap.products[productkey].childsubitems);
					}
				}
			}
		}	

		function SetParentsVisible(parentcategoryid){
			while(parentcategoryid!=-1){
				$scope.hashmap.categories[parentcategoryid].hash=1;
				$scope.hashmap.categories[parentcategoryid].fromparent=1;
				parentcategoryid=$scope.hashmap.categories[parentcategoryid].parent;
			}
		}

		function RecurseChildren(children){
			if(!children)
				return;

			for(var i=0; i < children.length;i++){
				if($scope.hashmap.categories[children[i]]){
					$scope.hashmap.categories[children[i]].hash=1;
					RecurseChildren($scope.hashmap.categories[children[i]].childcategories);
				}
				if($scope.hashmap.products[children[i]]){
					$scope.hashmap.products[children[i]].hash=1;
				}
				if($scope.hashmap.categories[children[i]]){
					RecurseChildren($scope.hashmap.categories[children[i]].childproducts);
				}
				if($scope.hashmap.subitems[children[i]]){
					$scope.hashmap.subitems[children[i]].hash=1;
				}
				if($scope.hashmap.products[children[i]]){
					RecurseChildren($scope.hashmap.products[children[i]].childsubitems);
				}
			}

		}

		test=$scope;
		}
	]);


	SearchApp.directive('ngSearch',['$animate',function($animate) {
	        var linkFunction = function($scope, $element, $attr) {
		    var ngRepeatExp = $attr.ngRepeat,
		    ngRepeatExp = ngRepeatExp.match(/^\s*([\s\S]+?)\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?\s*$/),
		    expression = ngRepeatExp[2].split('.')[1],
		    first;
		    for(key in $scope.$eval(ngRepeatExp[1])){
		    	first = key;
		    	break;
		    }
		    $scope.$watch(function() { 
		    		return $scope.hashmap[expression][$scope.$eval(ngRepeatExp[1])[first]].hash;
		    		}, function enableSearch(value){
		    	 $animate[(value) ? 'removeClass' : 'addClass']($element, 'ng-hide');
			});
		  };
	      return { 
	      		   link: linkFunction,
				   restrict: "A" 
		  };
	}]);
