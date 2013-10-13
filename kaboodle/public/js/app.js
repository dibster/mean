window.app = angular.module('mean', ['ngCookies', 'ngResource', 'ui.bootstrap', 'ui.route', 'mean.system','mean.articles', 'mean.projects', 'mean.fields']);
console.log ("loading modules");
angular.module('mean.system', []);
angular.module('mean.projects',[]);
angular.module('mean.articles', []);
angular.module('mean.fields', []);
console.log ("Done Loading Modules");