import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProdutoDTO } from '../../models/produto.dto';
import { ProdutoService } from '../../services/domain/produto.service';
import { CartService } from '../../services/domain/cart.service';

@IonicPage()
@Component({
  selector: 'page-produto-detail',
  templateUrl: 'produto-detail.html',
})
export class ProdutoDetailPage {

  item : ProdutoDTO;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public produtoService : ProdutoService, public cartService : CartService) {
  }

  ionViewDidLoad() {
    let produto_id = this.navParams.get('produto_id');
    this.produtoService.findById(produto_id).subscribe(resposta => {
      this.item = resposta;
      this.getImageUrlIfExists();
    }, error =>{});
  }

  getImageUrlIfExists() {
    this.produtoService.getSmallImageFromBucket(this.item.id).subscribe(resposta => {
      //Passar url do bucket para pegar imagem
      this.item.imageUrl = 'assets/icon/rotulo.jpg';
    }, error=>{});
  }

  addToCart(produto : ProdutoDTO) {
    this.cartService.addProduto(produto);
    this.navCtrl.setRoot("CartPage");
  }
}
