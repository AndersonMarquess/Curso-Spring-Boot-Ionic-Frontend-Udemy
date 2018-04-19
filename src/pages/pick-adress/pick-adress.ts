import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EnderecoDTO } from '../../models/endereco.dto';
import { ClienteService } from '../../services/domain/cliente.service';
import { ClienteDTO } from '../../models/cliente.dto';
import { StorageService } from '../../services/storage.service';
import { PedidoDTO } from '../../models/pedido.dto';
import { CartService } from '../../services/domain/cart.service';

@IonicPage()
@Component({
  selector: 'page-pick-adress',
  templateUrl: 'pick-adress.html',
})
export class PickAdressPage {

  items : EnderecoDTO[];
  pedido : PedidoDTO;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public clienteService : ClienteService, public storage : StorageService, public cartService : CartService) {
  }

  //Informações MOCK
  ionViewDidLoad() {
    let localUser = this.storage.getLocalUser();
    if(localUser && localUser.email) {
      this.clienteService.findByEmail(localUser.email).subscribe(resposta => {
        this.items = resposta['enderecos'];

        let cart = this.cartService.getCart();

        this.pedido = {
          //resposta no campo id
          cliente : {id : resposta['id']},
          enderecoDeEntrega : null,
          pagamento : null,
          //Percorre toda a lista de items e converte cada item para o formato aceito no item-pedido.dto (quantidade e id).
          itens : cart.items.map(x => { return {quantidade: x.quantidade, produto: {id: x.produto.id}} })
        }
      }, error => {
        if (error.status == 403) {
          this.navCtrl.setRoot('HomePage');
        }
      });
    } else {
      this.navCtrl.setRoot('HomePage');
    }
  }

  nextPage(item: EnderecoDTO) {
    this.pedido.enderecoDeEntrega = {id: item.id};
    console.log(this.pedido);
  }

}
