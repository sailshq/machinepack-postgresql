FROM node:10

RUN mkdir -p /opt/machinepack-sqlserver

WORKDIR /opt/machinepack-sqlserver
COPY package.json package.json
RUN npm install

COPY ./test/docker/* ./
RUN chmod +x *.sh
ADD . .

CMD ["./wait-for-it.sh", "-t", "60", "sqlserver:1433", "--", "./compose-test.sh"]
