declare interface DBConfig{
    development: {
        database: string,
        username: string,
        password: string,
        host: string,
        port: string,
        dialect:string,
        define: {
          charset: string,
          collate: utf8_general_ci,
        },
        dialectOptions?: object
        logging: boolean, 
      },
      production: {
        database: string,
        username: string,
        password: string,
        host: string,
        port: string,
        dialect:string,
        define: {
          charset: string,
          collate: utf8_general_ci,
        },
        dialectOptions?: object
        logging: boolean, 
      },
      test: {
        database: string,
        username: string,
        password: string,
        host: string,
        port: string,
        dialect:string,
        define: {
          charset: string,
          collate: utf8_general_ci,
        },
        dialectOptions?: object
        logging: boolean, 
      },
}

declare type DBConfigIndex = 'test' | 'development' | 'production'
// declare var process.env.NODE_ENV = DBConfigIndex