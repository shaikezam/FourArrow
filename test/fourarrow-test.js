QUnit.config.autostart = false;
function test(oIframe) {
    QUnit.start();
    this.steps = {
        putText: function(sIdentify, sValue) {
          $('iframe').contents().find(sIdentify).val(sValue);
        },
        pressButton: function (sIdentify) {
           $('iframe').contents().find(sIdentify).trigger( "click" );
        }
    }
    window.RequestRecorder.start('./data.har', {
        entriesUrlFilter: new RegExp("php"),
    });

    this.steps.putText('#p1', 'ShayZambrovski');
    this.steps.putText('#p2', 'MaayanDagan');
    this.steps.putText('#p1-pass', 'ShayZambrovskiPassword');
    this.steps.putText('#p2-pass', 'MaayanDaganPassword');
    this.steps.pressButton('#start_game');
    
    window.RequestRecorder.stop();
}
$(document).ready((oEvent) => {
    $('iframe').ready('load', () => {
        test();
    });
});