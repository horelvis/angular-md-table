if (MODE.ON_MDTABLE_TEST) {
    require('angular');
}

require('./vendor').default();
var tableModule = angular.module('ttmd.table', []);
require('./lib').default(tableModule);

