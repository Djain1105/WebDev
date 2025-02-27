$(function () {
    let inpProductName = $('#inpProductName')
    let inpProductManufacturer = $('#inpProductManufacturer')
    let inpProductPrice = $('#inpProductPrice')
    let btnProductAdd = $('#btnProductAdd')

    btnProductAdd.click(function () {

        addProduct(
            inpProductName.val(),
            inpProductManufacturer.val(),
            inpProductPrice.val(),
            function(addedProduct) {
                window.alert("Added " + addedProduct.name + " to Database")
            }
        )

    })
})