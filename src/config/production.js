export default (ngModule) => {
    ngModule.config(($compileProvider, $httpProvider, $logProvider) => {
        $compileProvider.debugInfoEnabled(false);
        $httpProvider.useApplyAsync(true);
        $logProvider.debugEnabled(false);
        console.log("Production environment");
    });
};
