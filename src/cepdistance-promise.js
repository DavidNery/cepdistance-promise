import CepDistanceError from './errors/cep-distance';
import distanceBetweenTwoCoords from './utils/distanceBetweenTwoCoords';
import fetch from 'node-fetch';

const url = 'https://nominatim.openstreetmap.org/search';
const options = {
  method: 'GET',
  headers: {
    'User-Agent': 'cepdistance'
  }
}

export default async function (data) {
  return Promise.resolve(data)
    .then(validateDataObject)
    .then(validateTypes)
    .then(transformCEPs)
    .then(validateLengths)
    .then(fetchCoords)
    .then(calculateDistance)
    .catch(error => {
      throw error;
    });
}

function calculateDistance({ lat1, long1, lat2, long2 }) {
  return Math.ceil(distanceBetweenTwoCoords(lat1, long1, lat2, long2));
}

async function fetchCoords(data) {
  const { lat: lat1, long: long1 } = await fetchCoord(data.cep1);
  const { lat: lat2, long: long2 } = await fetchCoord(data.cep2);
  
  return { lat1, long1, lat2, long2 };
}

async function fetchCoord(cep) {
  return fetch(`${url}?postalcode=${cep}&format=json`, options)
    .then(parseResponse)
    .then(getCepLatLong)
    .catch(error => {
      throw error;
    });
}

async function parseResponse(response) {
  if (!response.ok || response.status !== 200)
    throw new CepDistanceError({
      type: 'fetch_error',
      message: 'Ocorreu um erro inesperado ao tentar pegar as informações desse CEP'
    });

  const json = await response.json();

  if (json.length === 0)
    throw new CepDistanceError({
      type: 'fetch_error',
      message: 'CEP não encontrado'
    });

  return json[0];
}

function getCepLatLong({ lat, lon: long }) {
  return { lat, long };
}

function validateDataObject(data) {
  if (data.cep1 && data.cep2)
    return data;

  throw new CepDistanceError({
    type: 'validation_error',
    message: 'Informe os valores \'cep1\' e \'cep2\'.',
  });
}

function validateTypes(data) {
  if (typeof data.cep1 === 'string' && typeof data.cep2 === 'string')
    return data;

  throw new CepDistanceError({
    type: 'validation_error',
    message: 'Os CEPs tem de ser uma String',
  });
}

function transformCEPs(data) {
  return {
    cep1: data.cep1.replace(/\D+/g, ''),
    cep2: data.cep2.replace(/\D+/g, '')
  };
}

function validateLengths(data) {
  if (data.cep1.length === 8 && data.cep2.length === 8)
    return data;

  throw new CepDistanceError({
    type: 'validation_error',
    message: 'Os CEPs tem de ter exatamente 8 dígitos (Ex.: 12345678).'
  });
}