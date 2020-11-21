Calcule facilmente adistância entre dois CEPs

## Exemplo
```javascript
import cepdistance from 'cepdistance-promise';

cepdistance({
  cep1: 'CEP1',
  cep2: 'CEP2'
}).then(distance => console.log(`A distância entre os CEPs é ${distance} metros`))
  .catch(error => console.log(`Erro: ${error.message}`));
```