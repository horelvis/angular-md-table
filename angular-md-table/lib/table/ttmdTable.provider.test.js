/*
 *  NOT able to find a working solution to test provider
 * */

export default (ngModule) => {
    describe('phone service test', () => {

        let ttMdTableProvider;


        beforeEach(function () {
            // Initialize the service provider by injecting it to a fake module's config block
            angular.module('testApp', function () {
                })
                .config(function (ttMdTableProvider) {
                    ttMdTableProvider = ttMdTableProvider;
                });
            // Initialize myApp injector
            window.module(ngModule.name, 'testApp');
            // Kickstart the injectors previously registered with calls to angular.mock.module
            inject(function () {
            });
        });

        xit('should get default config for limits', function () {
            console.log(ttMdTableProvider);
            expect(ttMdTableProvider).toBeDefined();
            /*let desktopLimit = ttMdTableProvider.$get().getLimits('desktop');
             let mobileLimit = ttMdTableProvider.$get().getLimits('mobile');
             expect(desktopLimit).toEqual(8);
             expect(mobileLimit).toEqual(3);*/
        });

        xit('should set limits', () => {
            const config = {
                limits: {
                    desktop: 6,
                    mobile: 4
                }
            };
            tableProvider.setConfig(config);
            let desktopLimit = tableProvider.$get().getLimits('desktop');
            let mobileLimit = tableProvider.$get().getLimits('mobile');
            expect(desktopLimit).toEqual(config.limits.desktop);
            expect(mobileLimit).toEqual(config.limits.mobile);
        });
    });
};
