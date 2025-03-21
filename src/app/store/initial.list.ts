import { TodosState } from './list.reducer';

function dateToIsoString(date: Date, addDays: number = 0): string {
  // Add days to the date
  const newDate = new Date(date.getTime() + addDays * 24 * 60 * 60 * 1000);
  const warsawDate = new Date(newDate.getTime());

  return warsawDate.toISOString().split('T')[0];
}

export const initialState: TodosState = {
  list: [
    {
      date: dateToIsoString(new Date(), 1),
      location: 'Prospect Creek',
      content: 'Alaska',
      display: true,
    },
    {
      date: dateToIsoString(new Date(), 1),
      location: 'Furnace Creek',
      content: 'Death Valley, California (USA)',
      display: true,
    },
    {
      date: dateToIsoString(new Date(), 1),
      location: 'Wrocław',
      content: 'Wrocław CCC Pasaż Grunwaldzki 0180',
      display: true,
    },
    {
      date: dateToIsoString(new Date(), 1),
      location: 'Sosnowiec',
      content: 'Sosnowiec CCC Plaza 179',
      display: true,
    },
    {
      date: dateToIsoString(new Date(), 2),
      location: 'Lublin',
      content: 'Lublin CCC Plaza 218',
      display: true,
    },
    {
      date: '',
      location: '',
      content: '',
      display: true,
    },
    {
      date: dateToIsoString(new Date(), 3),
      location: 'Wrocław',
      content: 'Wrocław CCC Borek 0157',
      display: true,
    },
    {
      date: '',
      location: '',
      content: '',
      display: true,
    },
    {
      date: dateToIsoString(new Date(), 4),
      location: 'Ostróda',
      content: 'Ostróda CCC Ostróda 153',
      display: true,
    },
    {
      date: dateToIsoString(new Date(), 5),
      location: 'Ruda Śląska',
      content: 'Ruda Śląska CCC Plaza 5',
      display: true,
    },
    {
      date: '',
      location: '',
      content: '',
      display: true,
    },
    {
      date: dateToIsoString(new Date(), -1),
      location: 'Zabrze',
      content: 'Zabrze CCC M1 0013',
      display: true,
    },
    {
      date: dateToIsoString(new Date(), -1),
      location: 'Warszawa',
      content: 'Warszawa CCC Wileńska 0021',
      display: true,
    },
    {
      date: dateToIsoString(new Date(), -1),
      location: 'Łódź',
      content: 'Łódź CCC Tesco Pojezierska 0060',
      display: true,
    },
    {
      date: dateToIsoString(new Date(), 5),
      location: 'Łódź',
      content: 'Łódź CCC Łódź Górna 66',
      display: true,
    },
    {
      date: dateToIsoString(new Date(), 6),
      location: 'Gdańsk',
      content: 'Gdańsk CCC Morena 299',
      display: true,
    },
    {
      date: dateToIsoString(new Date(), -15),
      location: 'Bielany Wrocławskie',
      content: 'Bielany Wrocławskie CCC Park Handlowy Bielany 337',
      display: true,
    },
  ],
};
