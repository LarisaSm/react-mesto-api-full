# Бэкенд проекта Mesto

### Начать работу
1. Перейдите в директорию
```
cd backend
```

2. Установите нужные модули из package.json
```
npm install
```

3. Запустите сервер mongo
```
mongod
```

4. Запустите приложение
```
# запуск в production режиме
npm run start

# запуск в dev режиме, c функцией hot-reload
npm run dev
```

### Доступная функциональность

Регистрация и авторизация пользователя:
```
# создание пользователя
POST /signup

# вход в систему
POST /signin 
```

### Работа с данными пользователя:
```
# получение данных
GET /users/me

# обновление информации
PATCH /users/me

# обновление аватара
PATCH /users/me/avatar
```

### Работа с данными о фильмах:
```
# получение всех карточек
GET /cards

# добавление нового места
POST /cards

# удаление места
DELETE /cards/cardId

# добавление лайка карточке
PUT /cards/cardId/likes

# удаление лайка 
DELETE /cards/cardId/likes  
```

### Используемые технологии 

git · npm · JS · Node JS · Express JS · MongoDB · Nginx · YandexCloud
