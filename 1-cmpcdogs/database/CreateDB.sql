SELECT 'CREATE DATABASE cmpcdogs'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'cmpcdogs')\gexec