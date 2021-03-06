function ttMdTableProvider() {
    /*@ngInject*/
    const _defaultConfigs = {
            forceMobile: false,
            breakpoint: 'xs',
            limits: {
                desktop: 8,
                mobile: 3
            },
            message: {
                noData: null
            },
            enableAccordion: false
        },
        _availableScreenTypes = ['desktop', 'mobile'],
        _availableMessageTypes = ['noData'],
        _availableBreakpoints = ['xs', 'sm', 'md', 'lg'];
    let _config = {};

    /**
     * Check whether the option is validate
     * ['xs', 'sm', 'md', 'lg']
     * @param s
     * @returns {boolean}
     */
    function isMobileValidate(s) {
        return _availableBreakpoints
            .some((x) => {
                return x === s;
            });
    }

    /**
     * Check whether the limits option is validate
     * {desktop: number, mobile: number}
     * @param o
     * @returns {boolean}
     */
    function isLimitsValidate(o) {
        const keys = Object.keys(o).sort(),
            vKeys = _availableScreenTypes.sort();
        if (keys.length === 1) {
            return vKeys.indexOf(keys[0]) > -1;
        } else {
            return _.isEqual(keys, vKeys);
        }
    }

    /**
     * Check whether message type is predefined
     * ['noData']
     * @param o
     * @returns {boolean}
     */
    function isMessageTypeValidate(o){
        const keys = Object.keys(o).sort(),
            vKeys = _availableMessageTypes.sort();
        if (keys.length === 1) {
            return vKeys.indexOf(keys[0]) > -1;
        } else {
            return _.isEqual(keys, vKeys);
        }
    }

    /**
     * Set forceMobile to boolean
     * @param b
     */
    function setForceMobile(b) {
        _config = Object.assign({}, _config, {forceMobile: b});
    }

    /**
     * Set the breakpoint for the mobile view
     * @param s
     */
    function setMobile(s) {
        if (isMobileValidate(s)) {
            _config = Object.assign({}, _config, {breakpoint: s});
        } else {
            throw new Error('ttMdTable: setMobile() --> Cannot set mobile as: ', s);
        }
    }

    /**
     * Set limits
     * @param o
     */
    function setLimits(o) {
        if (isLimitsValidate(o)) {
            _config = Object.assign({}, _config, {limits: o});
        } else {
            throw new Error('ttMdTable: setPagination() --> Cannot set pagination as: ', JSON.stringify(null, 3, o));
        }
    }

    /**
     * Set Message
     * @param o
     */
    function setMessage(o){
        if(isMessageTypeValidate(o)){
            _config = Object.assign({}, _config, {message: o});
        }else{
            throw new Error("ttMdTable: setMessage() --> Not able to set: ", JSON.stringify(null, o, 3));
        }
    }

    function setEnableAccordion(b){
        if (b !== undefined) {
            _config = Object.assign({}, _config, {enableAccordion: b});
        } else {
            throw new Error('ttMdTable: setEnableAccordion() --> Cannot set enableAccordion');
        }
    }

    return {
        setConfig: function (obj) {
            if (obj) {
                if (obj.forceMobile) {
                    setForceMobile(obj.forceMobile);
                }

                if (obj.breakpoint) {
                    setMobile(obj.breakpoint);
                }

                if (obj.limits) {
                    setLimits(obj.limits);
                }

                if(obj.message){
                    setMessage(obj.message);
                }

                if(obj.enableAccordion){
                    setEnableAccordion(obj.enableAccordion);
                }
            }
        },
        $get: function () {
            return {
                isForceMobile(){
                    if (_config.forceMobile) {
                        return _config.forceMobile;
                    } else {
                        return _defaultConfigs.forceMobile;
                    }
                },
                getMobile(){
                    if (_config.breakpoint) {
                        return 'gt-' + _config.breakpoint;
                    } else {
                        return 'gt-' + _defaultConfigs.breakpoint
                    }
                },
                getLimits(type){
                    if (_config.limits) {
                        return _config.limits[type] || _defaultConfigs.limits[type];
                    } else {
                        return _defaultConfigs.limits[type];
                    }
                },
                getMessage(type){
                    if (_config.message) {
                        return _config.message[type] || _defaultConfigs.message[type];
                    } else {
                        return _defaultConfigs.message[type];
                    }
                },
                getEnableAccordion(){
                    if (_config.enableAccordion) {
                        return _config.enableAccordion;
                    } else {
                        return _defaultConfigs.enableAccordion
                    }
                }
            };
        }
    };
}

export default (ngModule) => {
    ngModule.provider('ttMdTable', ttMdTableProvider);
}
