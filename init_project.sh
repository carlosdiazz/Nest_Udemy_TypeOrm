rm -rf mysql_data postgres_data mongo_data node_modules postgres
sleep 5
docker compose up -d
sleep 10
npm i

sleep 10
if [ ! -f ./src/database/migrations/*.ts ];
then
  echo "Generando la Primera Migrations..."
  npm run pg:generate-mg --name=first_migrations
fi

npm run pg:run-mg
#npm run seed:run
npm run dev
