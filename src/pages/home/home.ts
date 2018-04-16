import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';


@IonicPage()
//Anotação que faz com que a classe se torne um controlador da view
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  //Para declarar uma dependência de uma classe, informamos ela na assinatura do construtor
  constructor(public navCtrl: NavController) {

  }

  //Métodos
  
  login() {
    //Chama uma página SEM empilhar as telas uma em cima da outra
    this.navCtrl.setRoot("CategoriasPage");
  }
}
