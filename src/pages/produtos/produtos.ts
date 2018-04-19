import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ProdutoDTO } from '../../models/produto.dto';
import { ProdutoService } from '../../services/domain/produto.service';
import { API_CONFIG } from '../../config/api.config';


@IonicPage()
@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})
export class ProdutosPage {

  items : ProdutoDTO[] = []; //inicia a lista vazia
  page : number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public produtoService: ProdutoService, public loadController : LoadingController) {
  }

  ionViewDidLoad() {
    this.carregarDados();
  }

  carregarDados() {
    // Recebe o parâmetro que foi passado através da página categorias
    let categoria_id = this.navParams.get('categoria_id');
    let loader = this.presentLoading();
    //Busca os produtos de 10 em 10
    this.produtoService.findByCategoria(categoria_id, this.page, 10).subscribe(resposta => {
      //concat para unir as listas
      let inicio = this.items.length;
      this.items = this.items.concat(resposta['content']);
      loader.dismiss();
      this.loadImageUrls(inicio, this.items.length);
    }, error => {
      loader.dismiss();
    });
  }

  //Carregaria e atribuiria a url da imagem, mas não foi criado o bucket...
  loadImageUrls(inicio : number, fim : number) {
    for(var i = inicio; i<fim; i++) {
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

  presentLoading() {
    let loader = this.loadController.create({
      content: "Aguarde...",
    });
    loader.present();
    return loader;
  }

  doRefresh(refresher) {
    this.page = 0;
    this.items = [];
    this.carregarDados();
    setTimeout(() => {
      refresher.complete();
    }, 1000);
  }

  doInfinite(infiniteScroll) {
    this.page++;
    this.carregarDados();
    setTimeout(() => {
      infiniteScroll.complete();
    }, 1000);
  }
}
