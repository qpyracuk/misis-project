# ОБРАЗ ОСНОВАН НА DEBIAN
FROM node:21.2-bookworm

# РАБОЧАЯ ДИРЕКТОРИЯ
WORKDIR /app

# АРГУМЕНТЫ СБОРКИ
ARG RUN_MODE="development"

# УСТАНОВКА РЕЖИМА РАБОТЫ NODEJS
ENV NODE_ENV=$RUN_MODE

# КОПИРОВАНИЕ ФАЙЛА PACKAGE.JSON  
COPY package.json .

RUN  npm i

# КОНФИГУРИРОВАНИЕ ТИПА ЗАПУСКА
RUN if [ "$RUN_MODE" = "production" ]; then \
  echo "#!/bin/sh\n npm run production" > /app/run.sh; \
  else \
  npm i nodemon -g && echo "#!/bin/sh\n npm run development" > /app/run.sh; \
  fi

# КОПИРОВАНИЕ ОСТАЛЬНЫХ ФАЙЛОВ
COPY index.js .

# ЗАПУСК ПРОГРАММЫ
CMD ["sh", "/app/run.sh"]