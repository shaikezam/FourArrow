function test(preem) {
    let mySteps = {
        iPutText: function (sIdentify, sValue) {
            $('iframe').contents().find(sIdentify).val(sValue);
            return true;
        },
        iPressButton: function (sIdentify) {
            $('iframe').contents().find(sIdentify).trigger("click");
            return true;
        },
        iCheckTextInInput: function (sIdentify, sValue) {
            return $('iframe').contents().find(sIdentify).val() === sValue;
        },
        iCannSeeGameBoard: function (iRows) {
            let aTR = $('iframe').contents().find('tr');
            let oIsTableVisible = $('iframe').contents().find('table').is(":visible");
            return aTR.length === iRows && oIsTableVisible;
        }
    };
    When(mySteps.iPutText, ['#p1', 'ShayZambrovski']);
    Then(mySteps.iCheckTextInInput, ['#p1', 'ShayZambrovski']);
    When(mySteps.iPutText, ['#p2', 'MaayanDagan']);
    Then(mySteps.iCheckTextInInput, ['#p2', 'MaayanDagan']);
    When(mySteps.iPutText, ['#p1-pass', 'ShayZambrovskiPassword']);
    Then(mySteps.iCheckTextInInput, ['#p1-pass', 'ShayZambrovskiPassword']);
    When(mySteps.iPutText, ['#p2-pass', 'MaayanDaganPassword']);
    Then(mySteps.iCheckTextInInput, ['#p2-pass', 'MaayanDaganPassword']);
    When(mySteps.iPressButton, ['#start_game']);
    Then(mySteps.iCannSeeGameBoard, [6]);
    preem.start();
};


$(document).ready((oEvent) => {
    test(new Preem({
        file: './data/data.json',
        entriesUrlFilter: [new RegExp(".php")]
    }));
});
