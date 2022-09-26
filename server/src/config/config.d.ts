declare interface DBConfig{
    development: {
        database: string,
        username: string,
        password: string,
        host: string,
        port: string,
        dialect:string,
        use_env_variable: boolean,
        define: {
          charset: string,
          collate: utf8_general_ci,
        },
        dialectOptions: any
        logging: boolean, 
      },
      production: {
        database: string,
        username: string,
        password: string,
        host: string,
        port: string,
        dialect:string,
        use_env_variable: boolean,
        define: {
          charset: string,
          collate: utf8_general_ci,
        },
        dialectOptions: any
        logging: boolean, 
      },
      test: {
        database: string,
        username: string,
        password: string,
        host: string,
        port: string,
        dialect:string,
        use_env_variable: boolean,
        define: {
          charset: string,
          collate: utf8_general_ci,
        },
        dialectOptions: any
        logging: boolean, 
      },
}

declare type DBConfigIndex = 'test' | 'development' | 'production'
// declare var process.env.NODE_ENV = DBConfigIndex