export default (ngModule) => {
    require('./ttmdTable.scss');
    require('./pagination').default(ngModule);
    require('./actions').default(ngModule);
    require('./table-item').default(ngModule);
    require('./detail-view').default(ngModule);
    require('./ttmd-animation').default(ngModule);
    require('./ttmd-table').default(ngModule);
    require('./ttmdTable.provider.js').default(ngModule);
    require('./ttmdTable.filter.js').default(ngModule);
    require('./ttmdTable.constants.js').default(ngModule);

    if (MODE.ON_MDTABLE_TEST) {
        // require('./ttmd-table.test').default(ngModule);
         require('./ttmdTable.filter.test.js').default(ngModule);
       // require('./ttmdTable.provider.test.js').default(ngModule);
    }
}
