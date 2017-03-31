 let request = obj => {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open(obj.method || "GET", obj.url);
        if (obj.headers) {
            Object.keys(obj.headers).forEach(key => {
                xhr.setRequestHeader(key, obj.headers[key]);
            });
        }
        xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                resolve(xhr.response);
            } else {
                reject(xhr.statusText);
            }
        };
        xhr.onerror = () => reject(xhr.statusText);
        xhr.send(obj.body);
    });
};
 var Quote = '';
var Author = '';

function generateQuote() {
    request({
        headers: {
            "X-Mashape-Key": "OivH71yd3tmshl9YKzFH7BTzBVRQp1RaKLajsnafgL2aPsfP9V"
        },
        url: 'https://andruxnet-random-famous-quotes.p.mashape.com/cat=' }).then(function (data) {
        var dt = JSON.parse(data);
        Quote = dt.quote;
        Author = dt.author;

        $('#text').text(dt.quote);

        $('#author').html(dt.author);
    }).catch(function (error) {
        console.log(error);
    });
}

$(document).ready(function () {
    generateQuote();
    $('#generate').on('click', generateQuote);
    $('#tweet').on('click', function() {
      window.open('https://twitter.com/intent/tweet?hashtags=quotes&text=' + 
        encodeURIComponent('"' + Quote + '" ' +'-' +Author), 'Share', 'width=550, height=400, toolbar=0,scrollbars=1 ,location=0 ,statusbar=0 ,menubar=0, resizable=0')});
   
});