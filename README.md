# Для установки и успешного запуска бэка на нашей системе должны иметься следующие вещи:
Установить git (https://github.com/facebook/create-react-app). 

Установить node.js(https://nodejs.org/en/download/package-manager)

# Для управления/просмотра локальной бд:
Установить postgresql(https://www.postgresql.org/download/)

Установить pgAdmin4(https://www.pgadmin.org/download/pgadmin-4-windows/). 

После того, как мы установили pgAdmin4 + postgresql нам необходимо локально на нашей системе создать таблицу schedule_db(https://support.russianit.ru/books/pomoshchnik-arbitrazhnogo-upravliaiushchego/page/nastroika-subd-postgresql). При скачивании postgres # ОЧЕНЬ! # важно запомнить пароль, который вы указываете. Имя пользователя желательно оставить postgres. Пароль после скачивания вы после изменяете в файле db.js.

После установки pgAdmin4 для создания бд необходимо:

![Снимок экрана 2024-10-15 055734](https://github.com/user-attachments/assets/f3334aac-be64-47db-97fc-27c99716db18) -> ![image](https://github.com/user-attachments/assets/08549b21-e604-4f11-b8c3-6776c8b9bfdd). Тут в пароле вводить пароль, который использовали при скачивании postgres.

Поздравляю, у нас есть сервер, что дальше? Дальше мы создаем нашу БД:
![Снимок экрана 2024-10-15 055921](https://github.com/user-attachments/assets/aa8cf214-add2-47b8-9335-62ccb3bcf4aa) -> ![image](https://github.com/user-attachments/assets/675af30f-64de-4127-b87b-604d96f35170). 

# Отлично, теперь есть и бд, дальше нам нужно её настроить:
![Снимок экрана 2024-10-15 055921](https://github.com/user-attachments/assets/90e25d94-2a9e-4919-ace8-4238a49cae59) -> вводим скрипт `CREATE TABLE Users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL CHECK (role IN ('admin', 'dispatcher', 'student', 'head_of_department', 'academic_affairs'))
);`
. После чего нажимаем запуск. 

# Отлично, теперь наша бд даже настроена! После всех махинаций она выглядит примерно так:
![Снимок экрана 2024-10-15 060449](https://github.com/user-attachments/assets/c180bc7c-0407-4961-b6d4-b18ef84e37fb)



# Осталось лишь создать админа:
![Снимок экрана 2024-10-15 060530](https://github.com/user-attachments/assets/87c0a410-dcc5-4160-a197-f2b2147de5a4)
 -> вводим скрипт `INSERT INTO Users (name, email, password, role)
VALUES ('Admin User', 'admin@example.com', '$2b$10$e0nG0n./sQ9Jjs3A1zHbGeWzN7Cwqr2O38ZgZ.nwTFhUeQk9tP1X2', 'admin');` Где вместо непонятных цифр, ваш пароль зашифрованный на сайте(https://bcrypt-generator.com/) с rounds = 10.

# Для первого запуска проекта используем команды:
npm install

npm start(используем и для последующего запуска). Если с бд все в порядке и проект подтянулся верно, в терминале видим вот такую картину:
![image](https://github.com/user-attachments/assets/5d11fa52-6c03-4644-a1b9-9f9873feebb6)






