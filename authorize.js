function getAuthorizeCodeUrl() {
  return 'https://oauth.yandex.ru/authorize?response_type=code&client_id=9baece81bdd04604a6d8fef59b56e8ed'
}
function getCredentails(code) {
  
  let options = {
    'method' : 'post',
    'payload': {
      'grant_type': 'authorization_code',
            'code': String(code),
            'client_id': PropertiesService.getScriptProperties().getProperty('appId'),
      'client_secret': PropertiesService.getScriptProperties().getProperty('appSecret')}
  }
  
  while (true) {
    let response = UrlFetchApp.fetch('https://oauth.yandex.ru/token', options);
    if (response.getResponseCode() == 200){
      let bd_clients = SpreadsheetApp.openById('1tw7svwug8GqNCm89drl1xdtlzvWDQQgOPsFIwb1Zpqs').getSheetByName('clients')
      let dateCreation = new Date().toDateString()
      bd_clients.appendRow([dateCreation,this.email,response.getContentText()])
      Logger.log(response.getContentText())
      return response.getContentText()
      break
    } else if (response.getResponseCode() == 201) {
      Logger.log('yandex report queued');
      Logger.log(response.getAllHeaders());
      Utilities.sleep(parseInt(response.getAllHeaders()['retryin'])*1000)
    } else if (response.getResponseCode() == 202) {
      Logger.log('yandex report is being processed');
      Logger.log(response.getAllHeaders());
      Utilities.sleep(parseInt(response.getAllHeaders()['retryin'])*1000)
    } else {
      Logger.log('failed ' + response);
      break
    }
  }
}
/*
Последовательность действий
При запросе токена требуется указывать идентификатор и пароль приложения, сгенерированные при регистрации на OAuth-сервере.

Приложение перенаправляет пользователя по ссылке вида
https://oauth.yandex.ru/authorize?response_type=code&client_id=<идентификатор_приложения>
На открывшейся странице пользователь нажимает кнопку Разрешить.

OAuth-сервер Яндекса осуществляет редирект на адрес из Callback URI. При этом к адресу добавляется параметр code. Например:
 http://site.ru/get_token.php?code=<код_подтверждения>
Скрипт выполняет POST-запрос на https://oauth.yandex.ru/token, передавая следующие параметры:
grant_type = authorization_code
code = <код_подтверждения>
client_id = <идентификатор_приложения>
client_secret = <пароль_приложения>
OAuth-сервер передает ответ в формате JSON. Ключ access_token содержит OAuth-токен. Например:
{"access_token": "ea135929105c4f29a0f5117d2960926f"}
Полученный токен необходимо сохранить и использовать в запросах к API Директа.
*/
