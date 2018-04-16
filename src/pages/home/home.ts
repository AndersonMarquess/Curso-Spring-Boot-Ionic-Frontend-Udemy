import { Component } from '@angular/core';
import { NavController, IonicPage, MenuController } from 'ionic-angular';


@IonicPage()
//Anotação que faz com que a classe se torne um controlador da view
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  //Para declarar uma dependência de uma classe, informamos ela na assinatura do construtor
  constructor(public navCtrl: NavController, public menu: MenuController) {

  }

  //Métodos
  
  login() {
    //Chama uma página SEM empilhar as telas uma em cima da outra
    this.navCtrl.setRoot("CategoriasPage");
  }

  //Executa quando carrega a página igual o initialize
  ionViewDidLoad(){
    //Desabilita o swipe do menu na tela home
    this.menu.swipeEnable(false);
  }

  //Executa quando sai da página
  ionViewDidLeave(){
    //Habilita o swipe do menu na tela home
    this.menu.swipeEnable(true);
  }
}
