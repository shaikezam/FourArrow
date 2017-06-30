let instance = null;
class Preem {
    constructor(oOptions) {
        if (!instance) {

            instance = this;
            
            $("#preem").html("<iframe id = 'preemFrame' src='../game/game.html'></iframe>");
            this._options = oOptions;
            this.setQueue();
            this.preemTestedApp = $('iframe')[0];
        }
        return instance;
    }
    static getInstance() {
        return instance;
    }
    setQueue() {
        this.oQueue = {
            _arr: [],
            enqueue: function (node) {
                this._arr.push(node);
            },
            dequeue: function () {
                let temp = null;
                if (!this.isEmpty()) {
                    temp = this._arr[0];
                    this._arr.shift();
                }
                return temp;
            },
            isEmpty: function () {
                return this._arr.length === 0
            },
            peek: function () {
                return this._arr[0];
            },
            removeQueue: function () {
                this._arr.length = 0;
            }
        }
    }
    getQueue() {
        if (!this.oQueue) {
            this.setQueue();
        }
        return this.oQueue;
    }
    addDeferred(fn, arg) {
        let _dft = {
            deferred: function () {
                this.oDeferred = $.Deferred().done(function () {
                    this.clearTimeout();
                    console.log("Fail");
                    let oQueue = Preem.getInstance().oQueue;
                    if (!oQueue.isEmpty()) {
                        Preem.getInstance().oQueue.dequeue().deferred();
                    } else {
                        Preem.getInstance().stopNetworkManager();
                    }

                }.bind(this)).fail(function () {
                    this.clearTimeout();
                    console.error("Fail");
                }.bind(this));
                this._startTimeout();
                return this.oDeferred;
            },
            _startInterval: function () {
                this.iIntervalId = setInterval(function () {
                    let returnBool = this.fn.apply(this, this.arg);
                    console.log(returnBool);
                    if (returnBool) {
                        this.oDeferred.resolve();
                    }
                }.bind(this), 200);
            },
            _startTimeout: function () {
                this._startInterval();
                this.iTimeoutId = setTimeout(function () {
                    window.clearInterval(this.iIntervalId);
                    this.oDeferred.reject();
                }.bind(this), 8000);
            },
            clearTimeout: function () {
                window.clearInterval(this.iIntervalId);
                window.clearTimeout(this.iTimeoutId);
            },
            fn: fn,
            arg: arg
        };
        this.oQueue.enqueue(_dft);
    }
    start() {

        $('#preemFrame').ready(() => {
            Preem.getInstance().oQueue.dequeue().deferred();
            let params = Preem.getInstance()._options;
            if (params instanceof Object) {
                Preem.getInstance().startNetworkManager(params);
            }
        })
    }
    startNetworkManager(oParameters) {
        this._initNetworkManager(oParameters);
        $.get(this.netWorkManager.configuration.file, this._playNetworkManager).fail(this._recordNetworkManager);

    }
    stopNetworkManager() {
        let sString = JSON.stringify(this.netWorkManager.recordedData, null, 4);
        let a = document.createElement("a");
        document.body.appendChild(a);
        let oBlob = new window.Blob([sString], {
            type: "octet/stream"
        });
        let sUrl = window.URL.createObjectURL(oBlob);
        a.href = sUrl;
        a.download = "data.json";
        a.click();
        window.URL.revokeObjectURL(sUrl);
    }
    _playNetworkManager(data) {
        $(Preem.getInstance().preemTestedApp.contentWindow).on('load', function() {
           $('iframe')[0].contentWindow._server = sinon.fakeServer.create();
        });
        
        Preem.getInstance().netWorkManager.recordedData = data;
        var origOpen = Preem.getInstance().preemTestedApp.contentWindow.XMLHttpRequest.prototype.open;
        Preem.getInstance().preemTestedApp.contentWindow.XMLHttpRequest.prototype.open = function (method, url) {
            
            Preem.getInstance().preemTestedApp.contentWindow._server.requests[0].respond(200, {
                'Content-Type': 'text/javascript'
            }, 'var foobar = 1;');
            //origOpen.apply(this, arguments);
            //Preem.getInstance().netWorkManager.recordedData.shift();
        };

    }
    _recordNetworkManager(data) {
        let origOpen = this.preemTestedApp.contentWindow.XMLHttpRequest.prototype.open;
        preemTestedApp.contentWindow.XMLHttpRequest.prototype.open = function (method, url) {
            this.method = method;
            this.url = url;
            if (!url.includes(".php")) {
                return;
            }
            this.addEventListener('load', function () {
                Preem.getInstance().netWorkManager.recordedData.push({
                    url: this.url,
                    method: this.method,
                    readyState: this.readyState,
                    responseText: this.responseText,
                    status: this.status,
                    responseURL: this.responseURL
                });
            }.bind(this));
            origOpen.apply(this, arguments);
        };
    }
    _initNetworkManager(oParameters) {
        this.netWorkManager = {};
        this.netWorkManager.configuration = oParameters;
        this.netWorkManager.recordedData = [];
    }
}
let When = function (fn, arg) {
    Preem.getInstance().addDeferred(fn, arg);
};
let Then = function (fn, arg) {
    Preem.getInstance().addDeferred(fn, arg);
};
