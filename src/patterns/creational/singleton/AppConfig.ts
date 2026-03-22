export class DatabaseConnection {

    static instance: DatabaseConnection | null = null;

    isConnected: boolean
    host: string

    private constructor() {
        this.isConnected = false;
        this.host = 'localhost';
    };

  
      
    static getInstance(): DatabaseConnection {
        if (!DatabaseConnection.instance) {
            DatabaseConnection.instance = new DatabaseConnection()
        }   
        return DatabaseConnection.instance;
    };

    connect() {
        if (this.isConnected) {
            console.log("Já Conectado.")
            return
        } 
        this.isConnected = true;
        console.log("Conexão realizada.")
        
    }

    query(sql: string) {
        if (!this.isConnected) {
            console.log("Conexão fechada.")
            return;
        }
         console.log(`Executando consulta: ${sql}`)
    }
}