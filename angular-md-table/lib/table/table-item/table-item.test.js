export default (ngModule) => {
    describe('Table Item component', () => {

        let $compile, directiveElem, directiveCtrl, $scope, state, parentElement;

        beforeEach(window.module(ngModule.name));
        beforeEach(inject(function (_$compile_, _$rootScope_, _$state_) {
            $compile = _$compile_;
            $scope = _$rootScope_.$new();

            state = _$state_;
            spyOn(state, 'go');
            spyOn(state, 'transitionTo');

            directiveElem = getCompiledElement();
            directiveCtrl = directiveElem.controller('ttmdTableItem');
        }));

        it('should have the controller defined', () => {
            expect(directiveCtrl).toBeDefined();
        });

        it('should have the parent controller defined', () => {
            expect(directiveCtrl.listCtrl).toBeDefined();
        });

        it('should include desktop item', () => {
            expect(directiveElem.find('ttmd-desktop-item').length).toEqual(1);
        });

        it('should include mobile item', () => {
            directiveElem = getCompiledElement(true);
            directiveCtrl = directiveElem.controller('ttmdTableItem');
            $scope.$digest();
            expect(directiveElem.find('ttmd-mobile-item').length).toEqual(1);
        });

        function getCompiledElement(b) {

            $scope.item = {
                "serviceCode": "1-655-834-8324",
                "username": "Johann Homenick",
                "amount": "4.37",
                "dueDate": "2016-06-07T07:15:02.720Z"
            };

            $scope.headers = [
                'id',
                'number',
                'username',
                'amount',
                'due date'
            ];
            const
                mockParentController = {
                    goMobile() {
                        return b || false;
                    }
                };
            parentElement = angular.element('<div><ttmd-table-item item="item" headers="headers"></ttmd-table-item></div>');
            parentElement.data('$ttmdTableController', mockParentController);

            const compiledDirective = $compile(parentElement)($scope)
                .find('ttmd-table-item');
            $scope.$digest();
            return compiledDirective;
        }
    });
};
