const faker = require('faker');
const fakerCpf = require('gerador-validador-cpf')

export default {
  deliver({ cpf, email } = {}) {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();

    return {
      name: `${firstName} ${lastName}`,
      cpf: cpf || fakerCpf.generate(),
      email: email || faker.internet.email(firstName),
      whatsapp: "31999999999",
      address: {
        postalcode: "31010150",
        street: "Rua Nefelina",
        number: "105",
        details: "Casa D",
        district: "Santa Tereza",
        city_state: "Belo Horizonte/MG",
      },
      delivery_method: "Moto",
      cnh: "images/cnh-digital.jpg",
    };
  },
};
