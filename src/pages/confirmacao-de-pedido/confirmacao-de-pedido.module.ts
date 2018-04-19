import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConfirmacaoDePedidoPage } from './confirmacao-de-pedido';
import { PedidoService } from '../../services/domain/pedido.service';

@NgModule({
  declarations: [
    ConfirmacaoDePedidoPage,
  ],
  imports: [
    IonicPageModule.forChild(ConfirmacaoDePedidoPage),

  ],
  providers: [
    PedidoService
  ]
})
export class ConfirmacaoDePedidoPageModule {}
