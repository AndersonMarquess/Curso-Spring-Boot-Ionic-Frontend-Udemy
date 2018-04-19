import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EnderecoDTO } from '../../models/endereco.dto';

@IonicPage()
@Component({
  selector: 'page-pick-adress',
  templateUrl: 'pick-adress.html',
})
export class PickAdressPage {

  items : EnderecoDTO[];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  //Informações MOCK
  ionViewDidLoad() {
    this.items = [
      {
        id :"1",
        logradouro: "Rua quinze de Novembro",
        numero: "300",
        complemento: "Santa Mônica",
        bairro: "Uberlândia",
        cep: "1234567",
        cidade : {
          id : "1",
          nome : "Uberlândia",
          estado : {
            id : "1",
            nome : "Minas Gerais"
          }
        }
      },
      {
        id :"1",
        logradouro: "Rua dezesseis de Dezembro",
        numero: "301",
        complemento: "Santa Mônica",
        bairro: "Uberlândia",
        cep: "8910112",
        cidade : {
          id : "1",
          nome : "Uberlândia",
          estado : {
            id : "1",
            nome : "Minas Gerais"
          }
        }
      }
    ]
  }

}
