# Конфигурация БД:

Table admins:\
- id (PK) # id пользователя в вк, который является админом

Table mailing_list:\
- id (PK) # id пользователя из вк
- vklink (text) # ссылка на пользователя в вк
- customVideos ([]) # id добавленных пользователем видео (ПЕРЕДЕЛАТЬ НА FOREIGN KEY)

Table users:\
- id (PK) # id пользователя в вк
- email (text)
- password (text) # bcrypt hashed password
- vklink (text)
- last_vizit (datetime)
- added_videos # id добавленных им видео в общий пул (ПЕРЕДЕЛАТЬ НА FOREIGN KEY)
- isAdmin (bool)
- activated (bool)
- vk_access_token (text)

Table videos:\
- id (PK)
- ownerid # id добавившего его пользователя
- content #blob (надо удалить)
- vkcontent # ссылка для прикрепления к письму
- day (0 - 7) # 0 - любой день, 1 - 7 - ПН - ВС

Связи - один ко многим added_videos 
customVideos - скорее всего надо убрать, пусть админ проверяет все видео пользователей