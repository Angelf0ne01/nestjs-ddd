#ejecuto las migraciones
liquibase --changelog-file=liquibase-config.xml --username=skeleton_service --password=postgres --url jdbc:postgresql://0.0.0.0:5445/skeleton_service update
