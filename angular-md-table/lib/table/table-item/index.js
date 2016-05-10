export default (ngModule) => {
    "use strict";

    require('./mobile/index').default(ngModule);
    require('./desktop/index').default(ngModule);
    require('./table-item').default(ngModule);

    /*if (MODE.ON_TTPC_TEST) {
        require('./table-item.test')(ngModule);
    }*/
}
