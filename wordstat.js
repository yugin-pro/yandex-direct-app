function createNewWordstatReport(client,phrasesArr,geoArr = []) {
  var base_url = "https://api.direct.yandex.ru/live/v4/json/";
  var yd_token = client.access_token
  var report_url = base_url //+ 'reports'
  

  
  var payload = {
    "method": "CreateNewWordstatReport",
    "param": {
    Phrases: phrasesArr,
    GeoID: geoArr
    },
    "locale": "ru",
    "token": yd_token
  }
  
  var options = {
    'headers': {
      'Content-Type': 'application/json; charset=utf-8'},
    'payload': JSON.stringify(payload)    
  }

  while (true) {
    var response = UrlFetchApp.fetch(report_url, options);
    if (response.getResponseCode() == 200){
      var respData = JSON.parse(response.getContentText())
      return respData.data
      break
    } else {
      Logger.log('failed ' + response);
      break
    }
  }
}


function getWordstatReportList(client) {
  var base_url = "https://api.direct.yandex.ru/live/v4/json/";
  var yd_token = client.access_token;
  var report_url = base_url //+ 'reports'
  

  
  var payload = {
    "method": "GetWordstatReportList",
    "param": {},
    "locale": "ru",
    "token": yd_token
  }
  
  var options = {
    'headers': {
      'Content-Type': 'application/json; charset=utf-8'},
    'payload': JSON.stringify(payload)    
  }

  while (true) {
    var response = UrlFetchApp.fetch(report_url, options);
    if (response.getResponseCode() == 200){
      var respData = JSON.parse(response.getContentText())
      return respData.data
      break
    } else {
      Logger.log('failed ' + response);
      break
    }
  }
}

function getWordstatReport(client, wsReportID) {
  var base_url = "https://api.direct.yandex.ru/live/v4/json/";
  var yd_token = client.access_token;
  var report_url = base_url //+ 'reports'
  

  
  var payload = {
    "method": "GetWordstatReport",
    "param": String(wsReportID),
    "locale": "ru",
    "token": yd_token
  }
  
  var options = {
    'headers': {
      'Content-Type': 'application/json; charset=utf-8'},
    'payload': JSON.stringify(payload)    
  }

  while (true) {
    var response = UrlFetchApp.fetch(report_url, options);
    if (response.getResponseCode() == 200){
      var respData = JSON.parse(response.getContentText())
      return respData.data
      break
    } else {
      Logger.log('failed ' + response);
      break
    }
  }
}

function getRegions(client) {
  var base_url = "https://api.direct.yandex.ru/live/v4/json/";
  var yd_token = client.access_token;
  var report_url = base_url //+ 'reports'
  

  
  var payload = {
    "method": "GetRegions",
    "locale": "ru",
    "token": yd_token
  }
  
  var options = {
    'headers': {
      'Content-Type': 'application/json; charset=utf-8'},
    'payload': JSON.stringify(payload)    
  }

  while (true) {
    var response = UrlFetchApp.fetch(report_url, options);
    if (response.getResponseCode() == 200){
      var respData = JSON.parse(response.getContentText())
      return respData.data
      break
    } else {
      Logger.log('failed ' + response);
      break
    }
  }
}
