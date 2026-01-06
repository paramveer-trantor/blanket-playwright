const { faker } = require('@faker-js/faker');

const userData = {
  firstName : "Tester",
  lastName : "QA",
  genderFemale : "Female",
  genderMale : "Male",
  date : (() => {
    const date = faker.date.birthdate({ min: 18, max: 60, mode: 'age' });
    return `${String(date.getMonth() + 1).padStart(2, '0')}/${
      String(date.getDate()).padStart(2, '0')}/${date.getFullYear()}`;
  })(),
  date_18_50 : (() => {
    const date = faker.date.birthdate({ min: 18, max: 50, mode: 'age' });
    return `${String(date.getMonth() + 1).padStart(2, '0')}/${
      String(date.getDate()).padStart(2, '0')}/${date.getFullYear()}`;
  })(),
  date_50_60 : (() => {
    const date = faker.date.birthdate({ min: 50, max: 60, mode: 'age' });
    return `${String(date.getMonth() + 1).padStart(2, '0')}/${
      String(date.getDate()).padStart(2, '0')}/${date.getFullYear()}`;
  })(),
  date_61_65 : (() => {
    const date = faker.date.birthdate({ min: 61, max: 65, mode: 'age' });
    return `${String(date.getMonth() + 1).padStart(2, '0')}/${
      String(date.getDate()).padStart(2, '0')}/${date.getFullYear()}`;
  })(),
  date_66_70 : (() => {
    const date = faker.date.birthdate({ min: 66, max: 70, mode: 'age' });
    return `${String(date.getMonth() + 1).padStart(2, '0')}/${
      String(date.getDate()).padStart(2, '0')}/${date.getFullYear()}`;
  })(),
  feet : faker.number.int({ min: 5, max: 6 }).toString(),
  inches : faker.number.int({ min: 5, max: 11 }).toString(),
  weight : faker.number.int({ min: 165, max: 200 }).toString(),
  centi: faker.number.int({ min: 165, max: 190 }).toString(),
  weightKG : faker.number.int({ min: 65, max: 90 }).toString(),
  houseAddress : faker.number.int({ min: 100, max: 999 }).toString(),
  phoneNumber: '(222)-222-2222',
  income : faker.number.int({ min: 10000, max: 50000 }).toString(),
  saving : "0",
  mortgageBal : "0",
  debt : "0",
  quotevalue : "50.58",
  marijuana : faker.number.int({ min: 0, max: 7 }).toString(),
  marijuanaKnock : faker.number.int({ min: 8, max: 12 }).toString(),
  drinks : faker.number.int({ min: 0, max: 14 }).toString(),
  drinks_7_P : faker.number.int({ min: 8, max: 14 }).toString(),
  drinksKnock : faker.number.int({ min: 15, max: 20 }).toString(),
  optionYes : "Yes",
  optionNo : "No",
  benFirstName : faker.person.firstName(), 
  benLastName : "Beneficiary", 
  benDob : (() => {
    const date = faker.date.birthdate({ min: 20, max: 35, mode: 'age' });
    return `${String(date.getMonth() + 1).padStart(2, '0')}/${
      String(date.getDate()).padStart(2, '0')}/${date.getFullYear()}`;
  })(),
  benDobMinor : (() => {
    const date = faker.date.birthdate({ min: 10, max: 17, mode: 'age' });
    return `${String(date.getMonth() + 1).padStart(2, '0')}/${
      String(date.getDate()).padStart(2, '0')}/${date.getFullYear()}`;
  })(),
  benCompany : faker.company.name(),
  benShare : "100",
  trusteefirstname : faker.person.firstName(), 
  trusteelastname : "Trustee", 
  trusteedob : (() => {
    const date = faker.date.birthdate({ min: 25, max: 35, mode: 'age' });
    return `${String(date.getMonth() + 1).padStart(2, '0')}/${
      String(date.getDate()).padStart(2, '0')}/${date.getFullYear()}`;
  })(), 
  trusteerel : "Big brother",
  passportNo : "AB123456",
  healthNo: "123456789",
  licenseNo: "AA1234",
  cardName : "Test Card", 
  cardNo : "4111 1111 1111 1111", 
  expiryDate : "01/2027",
  cvv : "213",
  accountHolderName : "Test Account", 
  transitNo : "001", 
  institutionNo : "030800", 
  accountNo : "1234567", 
  bankName : "Test Bank"
};

const loginData = {
  validUser : {
    username : "gagandeep.singla+qaauto1@trantorinc.com",
    password : "Test@123",
    username_Fr : "gagandeep.singla+sqlqa_fr@trantorinc.com"
  },
  invalidUser : {
    invalidUsername : "gagandeep.singla+invaliduser@trantorinc.com",
    invalidPassword : "123123"
  },
  adminUsers : {
  adminUser : "gagandeep.singla+admin@trantorinc.com",
  adminPass : "Test@123",
  },
  prodUser : {
    username : "gagandeep.singla+qaprod@trantorinc.com",
    password : "Test@123",
  }
};

module.exports = {
  userData,
  loginData
};