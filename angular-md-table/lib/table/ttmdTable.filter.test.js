export default (ngModule) => {
    describe('ttmdTable filters test', function () {

        let item;
        beforeEach(window.module(ngModule.name));
        beforeEach(() => {
            "use strict";
            item = {
                "id": "24",
                "serviceCode": "1-655-834-8324",
                "username": "Johann Homenick",
                "amount": "4.37",
                "dueDate": "2016-06-07T07:15:02.720Z"
            };
        });

        describe('exclude', ()=> {

            it('should receive the original value if passing a variable which is not an object', inject(function (excludeFilter) {
                item = [
                    {
                        "id": "24",
                        "serviceCode": "1-655-834-8324",
                        "username": "Johann Homenick",
                        "amount": "4.37",
                        "dueDate": "2016-06-07T07:15:02.720Z"
                    }
                ];
                let result = excludeFilter(item, ['id']);
                expect(result[0].id).toBeDefined();
                expect(result[0].id).toEqual("24");
            }));

            it('should exclude object attrs according to the passing array', inject(function (excludeFilter) {
                let expected = {
                    "serviceCode": "1-655-834-8324",
                    "username": "Johann Homenick",
                    "amount": "4.37",
                    "dueDate": "2016-06-07T07:15:02.720Z"
                };
                expect(excludeFilter(item, ['id'])).toEqual(expected);
            }));
        });
    });
}
