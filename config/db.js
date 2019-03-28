const config = {
    "development": {
        "host": "127.0.0.1",
        "port": 3306,
        "database": "parking",
        "user": "root",
        "password": "root"
    },
    "test": {
        "host": "mysql",
        "port": 3306,
        "database": "parking_test",
        "user": "app",
        "password": "app123"
    }
}

export default config[process.env.NODE_ENV || 'development']