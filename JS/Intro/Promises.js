function download(url) {
    return new Promise(function (resolve, reject) {
        if (!url.startsWith("http")) {
            reject(new Error("URL does not starts with http"))
        }
        else {
            console.log("Start Download:" + url)
            setTimeout(() => {
                let fileName = url.split("/").pop()
                resolve(fileName)
            }, 3000);
        }
    })
}

function resize(fileName) {
    return new Promise(function (resolve, reject) {
        if (!fileName.endsWith(".png")) {
            reject(new Error("File is not png"))
        }
        else {
            console.log("Start Resize:" + fileName)
            setTimeout(() => {
                let resizedFile = fileName.split(".")[0] + "-resized.png"
                resolve(resizedFile)
            }, 3000);
        }
    })
}

function upload(resizedFileName) {
    return new Promise(function (resolve, reject) {
        console.log("Start Uplaod:" + resizedFileName)
        setTimeout(() => {
            let uploadURL = "http://imgur.com/" + resizedFileName
            resolve(uploadURL)
        }, 3000);
    })
}

download('http://cb.lk/logo.png')
    .then(resize)                       // the fileName in the resolve of download function is passed as parameter in then block to the resize function
    .then(upload)                       // Similarly the resizedFile from resize function is passed to upload function
    .then(function (uploadURL) {         // this catches the resolve block from the upload function
        console.log("File was uploaded to:" + uploadURL)
    })
    .catch(function (err) {              // A single error block catches the error from both download and resize function
        console.error(err)
    })


// To execute promises for multiple values (url's here) 

Promise.all([                               // passed array of promises
    download("https://cb.lk/logo.png"),
    download("https://cb.lk/banner.png"),
    download("https://cb.lk/profile.png")
]).then(function (downloadValues) {          // there resolve will return array of values
    return Promise.all(downloadValues.map(resize))
}).then(function (resizeValues) {
    return Promise.all(resizeValues.map(upload))
}).then(function (uploadValues) {
    console.log(uploadValues)               // Will output array of upload file names
}).catch(function (err) {                    // if there is a reject from any promise then all the promises will be rejected, that is we will only get the error message
    console.error(err)
})