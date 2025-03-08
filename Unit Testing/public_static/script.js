$(function () {

    let kmBox = $('#inpKm')
    let minBox = $('#inpMin')
    let calcBtn = $('#btnCalc')
    let fareDiv = $('#fare')
    let rateBtn = $('#btnRates')
    let rateDiv = $('#rates')

    calcBtn.click(function () {
        $.post('/calcfare', {
            km: kmBox.val(),
            min: minBox.val()
        }, function (data) {
            fareDiv.text('Fare : ' + data.fare)
        })
    })

    rateBtn.click(function () {
        $.get('/rate', function (data) {
            let prettyRateData = `
            Fixed Fare = Rs. ${data.fixed}  for ${data.minKm} KM
            <br>
            Fare (Distance) = Rs. ${data.perKm} / KM
            <br>
            Fare (Waiting) = Rs. ${data.perMin} / min (after first ${data.freeMin} min)
            `
            rateDiv.html(prettyRateData)
        })
    })
})