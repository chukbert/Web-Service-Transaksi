var request = require('request')

const requestTrans = options => {
  return new Promise((resolve, reject) => {
    request(options, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        console.log('Split result:', body.split('<return>')[1].split('</return>')[0])
        resolve(body.split('<return>')[1].split('</return>')[0] === 'true')
      } else {
        reject(error)
      }
    })
  })
}

const checkTrans = async trans => {
  const xml =
   `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://services/">
   <soapenv:Header/>
   <soapenv:Body>
      <ser:checkTransaction>
         <arg0>1</arg0>
         <arg1>2000</arg1>
         <!--Optional:-->
         <arg2>2019-11-19 19:10:07</arg2>
         <!--Optional:-->
         <arg3>2019-11-19 22:10:09</arg3>
      </ser:checkTransaction>
   </soapenv:Body>
   </soapenv:Envelope>`

  var options = {
    url: 'http://localhost:8080/engima_war/WSBank?wsdl',
    method: 'POST',
    body: xml,
    headers: {
      'Content-Type': 'text/xml;charset=utf-8',
      'Accept-Encoding': 'gzip,deflate',
      'Content-Length': xml.length,
      SOAPAction: 'http://services'
    }
  }

  var exist = false

  //   const callback = (error, response, body) => {
  //     if (!error && response.statusCode === 200) {
  //       console.log('Split result:', body.split('<return>')[1].split('</return>')[0])
  //       console.log('Split result:', body.split('<return>')[1].split('</return>')[0])
  //     }
  //   }
  exist = await requestTrans(options)
  return exist
}

module.exports = checkTrans
