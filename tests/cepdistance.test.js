import cepdistance from '../src/cepdistance-promise';

describe('Testing CEP Distance', () => {
  
  test('Testing with both invalid ceps', async () => {
    try {
      await cepdistance({
        cep1: '01517115',
        cep2: '01517184'
      });
    } catch(error) {
      expect(error).toMatchObject({
        name: 'CepDistanceError',
        type: 'fetch_error',
        message: 'CEP não encontrado'
      });
    }
  });

  test('Testing with one invalid cep', async () => {
    try {
      await cepdistance({
        cep1: '01517100',
        cep2: '01517111'
      });
    } catch(error) {
      expect(error).toMatchObject({
        name: 'CepDistanceError',
        type: 'fetch_error',
        message: 'CEP não encontrado'
      });
    }
  });

  test('Testing with valid cep', async () => {
    expect.assertions(2);

    const distance = await cepdistance({
      cep1: '59310-000',
      cep2: '59300-000'
    });

    expect(distance).toBeGreaterThan(31000);
    expect(distance).toBeLessThan(32000);
  });

});