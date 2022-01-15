import signupPage from '../pages/SignupPage';
import signupFacotory from '../factories/SignupFactory'
describe('Signup', () => {
  it('User should be deliver', function () {
    const deliver = signupFacotory.deliver();
    const expectedMessage = 'Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato.';
    signupPage.go();
    signupPage.fillForm(deliver);
    signupPage.submit();
    signupPage.modalContentShouldBe(expectedMessage)
  });

  it('Incorrect document', function () {
    const deliver = signupFacotory.deliver({ cpf: 'x00000141AA'});

    signupPage.go();
    signupPage.fillForm(deliver);
    signupPage.submit();
    signupPage.alertMessageShouldBe('Oops! CPF inválido')
  });

  it('Incorrect email', function () {
    const deliver = signupFacotory.deliver({ email: 'test.com'});
    signupPage.go();
    signupPage.fillForm(deliver);
    signupPage.submit();
    signupPage.alertMessageShouldBe('Oops! Email com formato inválido.')
  });

  context('Riquired fields', function() {
    const messages = [
      {field: 'name', output: "É necessário informar o nome"},
      {field: 'cpf', output:"É necessário informar o CPF"},
      {field: 'email', output:"É necessário informar o email"},
      {field: 'postalcode', output:"É necessário informar o CEP"},
      {field: 'delivery_method', output:"Selecione o método de entrega"},
      {field: 'cnh', output:"Adicione uma foto da sua CNH"},
    ]

    before(() => {
      signupPage.go();
      signupPage.submit();
    });

    // const expectedMessages = [
    //   "É necessário informar o nome",
    //   "É necessário informar o CPF",
    //   "É necessário informar o email",
    //   "É necessário informar o CEP",
    //   "É necessário informar o número do endereço",
    //   "Selecione o método de entrega",
    //   "Adicione uma foto da sua CNH",
    // ]

    messages.forEach((msg) => {
      it(`${msg.field} is required`, () => {
        signupPage.alertMessageShouldBe(msg.output);
      })
    })
  })
});