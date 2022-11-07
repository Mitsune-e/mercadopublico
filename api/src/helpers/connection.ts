import * as sql from "mssql";

async function Connect() {
  const settings: sql.config = {
    server: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT),
    options: {
      trustServerCertificate: true,
    }
  };

  return await new sql.ConnectionPool(settings).connect();
}

let Connection: sql.ConnectionPool = null;

export async function getConnection() {
  const connection = Connection !== null ? Connection : await Connect();
  return connection;
};

// export function setConnection(connection: sql.ConnectionPool) {
//   Connection = connection;
// }

export async function query<T>(queryString: string): Promise<sql.IResult<T>> {
  const connection = getConnection();

  const results = await (await connection).request().query<T>(queryString);

  return results;
}
