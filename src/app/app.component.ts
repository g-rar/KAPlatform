import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Web3Service } from './util/web3.service';


declare let require: any;
const metacoin_artifacts = require('../../build/contracts/TestContract.json');


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Inbox',
      url: '/folder/Inbox',
      icon: 'mail'
    },
    {
      title: 'Outbox',
      url: '/folder/Outbox',
      icon: 'paper-plane'
    },
    {
      title: 'Favorites',
      url: '/folder/Favorites',
      icon: 'heart'
    },
    {
      title: 'Archived',
      url: '/folder/Archived',
      icon: 'archive'
    },
    {
      title: 'Trash',
      url: '/folder/Trash',
      icon: 'trash'
    },
    {
      title: 'Spam',
      url: '/folder/Spam',
      icon: 'warning'
    }
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private w3 : Web3Service
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }


  MetaCoin : any;

  ngOnInit() {
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }

    this.testFelipe()
  }
  
  testFelipe() {
    // pruebas
    this.w3.artifactsToContract(metacoin_artifacts)
    .then((MetaCoinAbstraction) => {
      this.MetaCoin = MetaCoinAbstraction;
      this.testFel2();
    });
  }

  async testFel2() {
    try{
      const deployedMetaCoin = await this.MetaCoin.deployed();
      console.log("DEPLOYED: ", deployedMetaCoin);
      
      const result = await deployedMetaCoin.getTestName.call({});
      console.log("La vara :v", result);
            
      if(result){
        console.log("CEDULA PAR ALV");
      } else {
        console.log("CEDULA IMPAR ALM");
      }
    } catch(e) {
      console.error("Hubo un MEGA ERROR",e);
    } 

  }
}
