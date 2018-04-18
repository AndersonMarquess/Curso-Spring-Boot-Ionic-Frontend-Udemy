import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CategoriaService } from '../../services/domain/categoria.service';
import { CategoriaDTO } from '../../models/categoria.dto';

/**
 * Generated class for the CategoriasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-categorias',
  templateUrl: 'categorias.html',
})
export class CategoriasPage {

  items : CategoriaDTO[];


  constructor(public navCtrl : NavController, public navParams: NavParams, 
    public categoriaService : CategoriaService) {
  }

  ionViewDidLoad() {
    //O Subscribe é tipo um callback da columnview
    //Neste caso temos duas chamadas, uma para imprimir a resposta e outra para imprimir o erro
    this.categoriaService.findAll()
    .subscribe(resposta => {
        console.log(resposta)
        this.items = resposta;
      }, 
      error => {});
  }

}
