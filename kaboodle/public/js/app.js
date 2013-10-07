window.app = angular.module('mean', ['ngCookies', 'ngResource', 'ui.bootstrap', 'ui.route', 'mean.system','mean.articles', 'mean.projects']);
console.log ("loading modules");
angular.module('mean.system', []);
angular.module('mean.projects',[]);
angular.module('mean.articles', []);
console.log ("Done Loading Modules");