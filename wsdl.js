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
         <arg0>${trans.account}</arg0>
         <arg1>${trans.amount}</arg1>
         <!--Optional:-->
         <arg2>${trans.start}</arg2>
         <!--Optional:-->
         <arg3>${trans.end}</arg3>
      </ser:checkTransaction>
   </soapenv:Body>
   </soapenv:Envelope>`

  // ----DEV----
  // var options = {
  //   url: 'http://localhost:8080/engima_war/WSBank?wsdl',
  //   method: 'POST',
  //   body: xml,
  //   headers: {
  //     'Content-Type': 'text/xml;charset=utf-8',
  //     'Accept-Encoding': 'gzip,deflate',
  //     'Content-Length': xml.length,
  //     SOAPAction: 'http://services'
  //   }
  // }

  var options = {
    url: 'http://13.229.224.101:8080/engima/WSBank?wsdl',
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
