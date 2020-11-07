//
//  Fonction de diaporama sur des images
//  
//  Appel se fait d'une maniere simple : ajout d'une classe zoomimage sur un lien ou une image
//
//  <a href="xxx" class="zoomimage"><img src=xxx"></a>
//  <img src="xxx" class="zoom image" />
//

function clog(c) { console.log(c) ; }

function ZoomImage(id) {

   // ----- Les variables de travail, Permanente -----
   this.id                  = id ;
   this.zoomimageNoCadrePrc = 1 ;
   this.zoomimageNoCadre    = 2 ;
   this.zoomimagePHOTO      = new Array() ;
   this.zoomimageTITRE      = new Array() ;
   this.zoomimageCOUNT      = 0 ;
   this.zoomimagePLAY       = false ;
   this.zoomimagePOS        = -1 ;
   this.zoomimageInactClick = false ;


   // ----- Recale la position si on déborde à droite ou a gauche -----
   this.zoomimage_recadrepos = function(pos)
   {  let rep = 1 * pos;
      if (rep < 1) { rep = this.zoomimageCOUNT ; }
      if (rep > this.zoomimageCOUNT) { rep = 1 ; }
      return rep ;
   }


   // ----- Diaporama, affichage image + 1 -----
   this.zoomimage_diapo = function(pos)
   {  if (pos == this.zoomimagePOS && this.zoomimagePLAY)
      {  this.zoomimage(pos + 1) ; 
      }
   }


   // ----- Bascule Diaporama ON / OFF -----
   this.zoomimage_btplay = function(pos)
   {  this.zoomimageInactClick = true ;
      this.zoomimagePLAY = !this.zoomimagePLAY ;
      if (this.zoomimagePLAY)
      {  document.getElementById("zoomimage_play"+this.zoomimageNoCadre).src ="zoomimage_pause.png" ; 
         setTimeout(this.id+".zoomimage_diapo("+pos+")", 200);
      }
      else
      {  document.getElementById("zoomimage_play"+this.zoomimageNoCadre).src = "zoomimage_play.png" ;
      }
   }

   this.zoomimage = function(pos)
   { // * * Affichage du fond * *    
      this.zoomimageNoCadrePrc = this.zoomimageNoCadre ;
      this.zoomimageNoCadre = 3 - this.zoomimageNoCadre ; 
      this.zoomimagePOS = this.zoomimage_recadrepos(pos) ; 
      let zoomimg = this.zoomimagePHOTO[this.zoomimagePOS] ;

      // * * Fermeture Div Prec * * 
      this.boHide("zoomimage_cadre_"+this.zoomimageNoCadrePrc) ;
      let ZeObjDiv = document.getElementById("zoomimage_cadre_"+this.zoomimageNoCadre) ;

      // * * Préparation contenu du DIV * *
      LeCont =  '<img src="' + zoomimg + '" alt="" id="zoomimage_image_'+this.zoomimageNoCadre+'" onload="'+this.id
               +'.zoomimage_chargimg(' + (this.zoomimagePOS) + ');" onclick="'+this.id
               +'.zoomimageCL(' + (this.zoomimagePOS + 1) + ');" />' ;
      if (this.zoomimageCOUNT > 1)
      {  LeCont += '<img src="zoomimage_croix.png" alt="fermer" class="zoomimage_croix" onclick="'+this.id+'.zoomimage_Fermer();" />' ;
         LeCont += '<img src="zoomimage_gauche.png" alt="<-" class="zoomimage_gauche" onclick="'+this.id
                  +'.zoomimageCL(' + (this.zoomimagePOS - 1) + ');" />' ;
         if (this.zoomimagePLAY)
         {  LeCont += '<img src="zoomimage_pause.png" alt="Pause" id="zoomimage_play'+this.zoomimageNoCadre+'" class="zoomimage_play" onclick="'+this.id
                     +'.zoomimage_btplay(' + (this.zoomimagePOS) + ');" />' ; }
         else
         {  LeCont += '<img src="zoomimage_play.png" alt="Play" id="zoomimage_play'+this.zoomimageNoCadre+'" class="zoomimage_play" onclick="'+this.id
                     +'.zoomimage_btplay(' + (this.zoomimagePOS) + ');" />' ; }
            LeCont += '<img src="zoomimage_droite.png" alt="->" class="zoomimage_droite" onclick="'+this.id   
                     +'.zoomimageCL(' + (this.zoomimagePOS + 1) + ');" />' ;
      }

      // * * Affichage * *
      if (document.getElementById("zoomimage_fond").className != 'affich') {
         document.getElementById("zoomimage_fond").className = "affich" ;
         this.boShow("zoomimage_fond") ;
      }
      document.getElementById("zoomimage_cadre_0").className = "affich" ;
      ZeObjDiv.className = "cache" ;
      ZeObjDiv.innerHTML = LeCont ;  
   }

   this.zoomimageCL = function(pos)
   {  if (this.zoomimageCOUNT > 1)
      {  this.zoomimageInactClick = true ;
         this.zoomimage(pos) ;
      } else {
         this.zoomimage_Fermer()
      }
   }

   // ----- image chargée (inLoad) il faut l'afficher -----
   this.zoomimage_chargimg = function(pos)
   { if (pos != this.zoomimagePOS) { return ; }
      document.getElementById("zoomimage_cadre_0").className = "cache" ;
      this.boShow("zoomimage_cadre_"+this.zoomimageNoCadre) ;

      // Alimentation titre
      let titr = document.getElementById("zoomimage_titre") ;
      titr.innerHTML = this.zoomimageTITRE[pos] ;
      titr.style = "display: inline-block;" ; clog(titr);

      // Prechargement du suivant
      let suiv = new Image() ;
      suiv.src = this.zoomimagePHOTO[this.zoomimage_recadrepos(pos + 1)] ;

      // Diaporama auto
      if (this.zoomimagePLAY)
      {  setTimeout(this.id+".zoomimage_diapo("+pos+")", 4000);
      }
   }


   // ----- Fermer le diaporama -----
   this.zoomimage_Fermer = function()
   {  this.zoomimagePOS = -1 ;
      this.boHide("zoomimage_cadre_"+this.zoomimageNoCadre) ;
      this.boHide("zoomimage_fond") ;
      this.zoomimagePLAY  = false ;
   }
   this.zoomimage_FondFermer = function()
   {  if (!this.zoomimageInactClick)
      {  this.zoomimage_Fermer()
      }
      this.zoomimageInactClick = false ;
   }



   // * * * * animation sur opacité * * * * *
   this.boHideBcl = function(id, trThis) {
      let s = document.getElementById(id).style ;
      let result = parseFloat(s.opacity) - 0.1 ;
      s.opacity = result ;
      if (result >= 0.05) {
         setTimeout(function(){trThis.boHideBcl(id, trThis)}, 45);
      } else { document.getElementById(id).className = "cache" ; }
   }
   this.boHide = function(id) {
      document.getElementById(id).style.opacity = 1 ;
      this.boHideBcl(id, this) ;
   }
   this.boShowBcl = function(id, trThis) {
      let s = document.getElementById(id).style ;
      let result = parseFloat(s.opacity) + 0.1 ;
      s.opacity = result ;
      if (result <= 0.95) {
         setTimeout(function(){trThis.boShowBcl(id, trThis)}, 60);
      }
   }
   this.boShow = function(id) {
      document.getElementById(id).style.opacity = 0 ;
      document.getElementById(id).className = "affich" ;
      this.boShowBcl(id, this) ;
   }



   // ----- Base d'affichage et de mise en place du diaporama -----
   this.zoomimage_placezoom = function()
   {  // --- Recherche classe zoomimage ---
      let ob = document.getElementsByClassName("zoomimage") ; 
      let zeThis = this ;
      for (idx in ob)
      {  if(ob[idx].tagName == "A")
         {  this.zoomimageCOUNT++ ;
            let i = this.zoomimageCOUNT ;
            this.zoomimagePHOTO[this.zoomimageCOUNT] = ob[idx].href ;
            ob[idx].onclick = function() { zeThis.zoomimage(i); return false ;} ;
            ob[idx].className = ob[idx].className.replace('zoomimagOK', 'zoomimage') ; 
            let temp = ob[idx].nextSibling.nextSibling.innerHTML ; 
            let p  = temp.indexOf("<br") ;
            let t1 = temp.substr(0, p) ;
            let t2 = temp.substr(p) ;  
            p  = t2.indexOf(">") + 1
            this.zoomimageTITRE[this.zoomimageCOUNT] = t1 + " - " + t2.substr(p) ; 
            if (this.zoomimageTITRE[this.zoomimageCOUNT] == ' - ') { this.zoomimageTITRE[this.zoomimageCOUNT] = '' } ; 
         }
      } 
      // --- Chargement en cours
      document.write('<div id="zoomimage_fond" class="cache" style="opacity: 0;" onclick="'+this.id+'.zoomimage_FondFermer();" >') ;
      document.write('<div id="zoomimage_cadre_0" class="cache" style="opacity: 1;">') ;
      document.write('<p>Loading . . .<br />') ;
      document.write('<img src="zoomimage_loader.gif" alt="En chargement ..." /></p>') ;
      document.write('</div>') ;
      // --- Prepar Image 
      document.write('<div id="zoomimage_cadre_1" class="cache" style="opacity: 1;"></div>') ; 
      document.write('<div id="zoomimage_cadre_2" class="cache" style="opacity: 1;"></div>') ; 
      document.write('<div id="zoomimage_titre"   style="display: none;"></div') ;
      document.write('</div>') ;
   }

}

// ----- Affichage
let zi = new ZoomImage('zi') ;
zi.zoomimage_placezoom() ;