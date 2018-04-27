import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProdutoDTO } from '../../models/produto.dto';
import { ProdutoService } from '../../services/domain/produto.service';
import { API_CONFIG } from '../../config/api.config';


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
      this.loadImageUrls();
    }, error =>{});
  }

  //Carregaria e atribuiria a url da imagem, mas não foi criado o bucket...
  loadImageUrls() {
    for(var i = 0; i<this.items.length; i++) {
      let item = this.items[i];
      this.produtoService.getSmallImageFromBucket(item.id).subscribe(resposta => {
        //Vai inserir no atributo imageUrl o valor especificado
        item.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${item.id}-small.jpg`;
      }, error => {});
    }
  }

  showDetail(produto_id : string) {
    this.navCtrl.push("ProdutoDetailPage", {produto_id : produto_id});
  }
}
