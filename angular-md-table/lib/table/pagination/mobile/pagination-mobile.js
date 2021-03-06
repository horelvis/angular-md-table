class PaginationMobileController{
    constructor(){

    }

    more(){
        this.paginationCtrl.more();
    }

    previous(){
        this.paginationCtrl.previous();
    }
}

const PaginationMobileComponent = {
    bindings: {
        offset: '<'
    },
    controller: PaginationMobileController,
    controllerAs: 'vm',
    require: {
        paginationCtrl: '^ttmdPagination'
    },
    template: require('./pagination-mobile.html')
};

export default (ngModule) => {
    ngModule.component('ttmdPaginationMobile', PaginationMobileComponent);
}
