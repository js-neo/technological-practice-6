# Task Manager

Консольное приложение для управления задачами, позволяющее обрабатывать задачи различными методами и сохранять их в файл.

## Описание

Это приложение предназначено для простого управления списком задач. Пользователи могут:
- Добавлять новые задачи.
- Удалять существующие задачи.
- Отображать все задачи или только выполненные.
- Помечать задачи как выполненные.
- Искать задачи по ключевым словам.
- Сортировать задачи по статусу выполнения.
- Сохранять задачи в файл и загружать их из файла.

## Структура проекта

```
case-task-5/
├── app.js
├── package.json
├── task.js
├── taskList.js
├── validateTasks.js
├── arraySchema.json
├── json-schema.json
├── index.html
└── styles.css
```

### Файлы и их назначение
- **app.js**: Главный файл приложения, инициализирует интерфейс командной строки и обрабатывает пользовательский ввод.
- **package.json**: Файл конфигурации проекта, описывающий зависимости, скрипты и метаданные проекта.
- **task.js**: Определяет класс `Task`, представляющий отдельную задачу с описанием и статусом выполнения.
- **taskList.js**: Определяет класс `TaskList`, который управляет списком задач, включая добавление, удаление и отображение задач.
- **validateTasks.js**: Содержит логику валидации данных задач с использованием JSON-схем, чтобы обеспечить корректность данных.
- **arraySchema.json**: JSON-схема, определяющая структуру данных задач, включая обязательные поля и их типы.
- **json-schema.json**: Конфигурация для интеграции JSON-схем с редакторами кода, упрощая разработку.
- **index.html**: HTML-файл, используемый для веб-документации и описания возможностей приложения.
- **styles.css**: Файл стилей, используемый для оформления веб-документации.

## Установка
1. Клонируйте репозиторий:
   ```bash
   git clone https://github.com/js-neo/technological-practice-6.git
   cd case-task-5
2. Установите зависимости:
    ```bash
   npm install

## Использование
Для запуска приложения выполните следующую команду в терминале:
```bash
node app.js
```

### Меню действий
После запуска приложение предложит выбрать одно из следующих действий:
1. **Добавить задачу**: Позволяет пользователю ввести описание новой задачи.
2. **Удалить задачу**: Удаляет задачу по указанному номеру из списка.
3. **Показать все задачи**: Отображает все задачи с их статусом выполнения.
4. **Показать выполненные задачи**: Отображает только те задачи, которые были помечены как выполненные.
5. **Сохранить задачи в файл**: Сохраняет текущий список задач в файл `tasks.json`.
6. **Поиск задач**: Позволяет искать задачи по ключевым словам в их описании.
7. **Пометить задачу как выполненную**: Позволяет пользователю пометить задачу как выполненную.
8. **Сортировать задачи**: Сортирует задачи по статусу выполнения (выполненные и не выполненные).

**0. Выйти**: Завершает работу приложения.

### Взаимодействие с программой
Для взаимодействия с программой нужно ввести номер необходимой операции и следовать инструкциям, отображаемым в консоли. После выбора действия приложение предложит дополнительные шаги, чтобы завершить операцию.

Например, для добавления задачи выберите номер **1** и следуйте инструкциям для ввода описания задачи. Аналогично, для удаления задачи выберите номер **2** и укажите номер задачи, которую хотите удалить.

### Валидация данных
Приложение использует JSON-схемы для валидации данных задач. Если данные не соответствуют схеме, они не будут сохранены в файл или загружены из файла. Это позволяет избежать ошибок и гарантирует, что структура данных остается корректной.

## Зависимости
- **ajv**: Библиотека для валидации JSON-данных, которая обеспечивает проверку структуры данных на соответствие заданной схеме.
- **chalk**: Библиотека для стилизации текста в консоли, позволяющая выделять важные сообщения цветом.

## Лицензия

Этот проект является частным и не имеет лицензии.