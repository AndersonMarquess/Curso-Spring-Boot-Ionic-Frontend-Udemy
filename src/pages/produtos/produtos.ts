import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProdutoDTO } from '../../models/produto.dto';
import { ProdutoService } from '../../services/domain/produto.service';


@IonicPage()
@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})
export class ProdutosPage {

  items : ProdutoDTO[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public produtoService: ProdutoService) {
  }

  ionViewDidLoad() {
    // Recebe o parâmetro que foi passado através da página categorias
    let categoria_id = this.navParams.get('categoria_id');
    this.produtoService.findByCategoria(categoria_id).subscribe(resposta => {
      this.items = resposta['content'];
    }, error =>{});
  }
}
