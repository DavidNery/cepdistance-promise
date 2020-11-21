class CepDistanceError extends Error {

  constructor({ type, message }) {
    super();
    
    this.name = 'CepDistanceError';
    this.type = type;
    this.message = message;
  }

}

export default CepDistanceError;