import { IonicPageModule } from 'ionic-angular/module';
import { NgModule } from '@angular/core';
import { HomePage } from './home';

// Criando um modulo
@NgModule({
    //O nome HomePage tem que ser correspondente ao nome do controller 
    declarations: [HomePage],
    imports: [IonicPageModule.forChild(HomePage)]
})

export class HomeModule {
}