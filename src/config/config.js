export default (ngModule) => {

    ngModule.config(( $stateProvider, $translateProvider, ttMdTableProvider, $animateProvider, $urlRouterProvider, $httpProvider) => {
        $httpProvider.defaults.useXDomain = true;
        $urlRouterProvider.otherwise('/');

        $animateProvider.classNameFilter(/\banimated\b/);

        $stateProvider
            .state('main', {
                url: '/',
                views: {
                    'body': {
                        template: `
                            <h1>Table component</h1>
                            <pre style="width: 100%; height: 300px; overflow: auto; color: white; background-color: #7f7f7f">{{data |json}}</pre>
                            <ttmd-table
                                toolbar="{title: 'Accounts'}"
                                headers="headers"
                                items="data"
                                total-number="50"
                                enable-accordion=true
                                accordion-state=true
                                exclude="exclude"
                                pipes="pipes"
                                on-row-click="onRowClick(payload)"
                                on-page-change="changepage(payload)"
                            >
                                <ttmd-actions>
                                    <ttmd-action
                                        on-click="pay(payload)"
                                    >
                                        <md-button class="md-raised md-success">OK</md-button>
                                    </ttmd-action>
                                </ttmd-actions>
                               <!-- <ttmd-detail>
                                    <div >
                                        <h1>This is the detail view</h1>
                                    </div>
                                </ttmd-detail>-->
                            </ttmd-table>    
                        `,
                        controller: ($rootScope, $scope, $http) => {
                            var data = require('../data/multi-payments.json');
                            $scope.data = angular.copy(data.accounts);
                            $scope.headers = [
                                'Billing Number',
                                'User Name',
                                'Amount',
                                'Due Date',
                                'Action'
                            ];
                            $scope.sort=['dueDate'];
                            $scope.exclude = ['id', 'paid', 'currency'];
                            $scope.pay = (payload) => {
                                console.log(payload);
                            }
                            $scope.onRowClick = (payload) => {
                                console.log("onRowClick", payload);
                            }
                            $scope.timeDiffFromNow = (item) => {
                                const diffDays = moment(item.dueDate).diff(moment.now(), 'days');
                                return diffDays <= 6;
                            };
                            $scope.limits = {
                                desktop: 6,
                                mobile: 6
                            };
                            $scope.pipes = {
                                currency: {
                                    targets: ['amount'],
                                    format: '$'
                                },
                                date: {
                                    targets: ['dueDate'],
                                    format: 'dd-MM-yyyy'
                                }
                            };
                            $scope.changepage = ({limit, offset, listType}) => {
                                console.log(limit, offset, listType);
                                var temp = angular.copy(data.accounts);
                                var newData = temp.slice((offset - 1) * limit, offset * limit);
                                $scope.data = newData;
                            }
                        }
                    }
                }
            });
    });
}
