const ttmdActionsComponent = {
    transclude: true,
    replace: true,
    template: require('./actions.html')
};

export default (ngModule) => {
    ngModule.component('ttmdActions', ttmdActionsComponent);
}
