declare module 'cepdistance-promise' {

  interface Data {
    cep1: string;
    cep2: string;
  }
  
  namespace cepdistance {}

  function cepdistance( cep: Data ): Promise<number>

  export = cepdistance
}