//
//  Fonction de diaporama sur des images
//  
//  Appel se fait d'une maniere simple : ajout d'une classe zoomimage sur un lien ou une image
//
//  <a href="xxx" class="zoomimage"><img src=xxx"></a>
//  <img src="xxx" class="zoom image" />
//

function ZoomImage(id) {

   // ----- Les variables de travail, Permanente -----
   this.id                  = id ;
   this.zoomimagePHOTO      = new Array() ;
   this.zoomimagePHOTOURL   = new Array() ;
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
      {  zoomimage(pos + 1) ; 
      }
   }


   // ----- Bascule Diaporama ON / OFF -----
   this.zoomimage_btplay = function(pos)
   {  this.zoomimageInactClick = true ;
      this.zoomimagePLAY = !this.zoomimagePLAY ;
      if (this.zoomimagePLAY)
      {  document.getElementById("zoomimage_play").src ="zoomimage_pause.png" ; 
         setTimeout(this.id+"zoomimage_diapo("+pos+")", 200);
      }
      else
      {  document.getElementById("zoomimage_play").src = "zoomimage_play.png" ;
      }
   }


   // ----- Zoom sur une image -----
   this.zoomimageURL = function(url)
   { this.zoomimage(zoomimagePHOTOURL[url]);
   }

   this.zoomimage = function(pos)
   { // * * Affichage du fond * *    
      this.zoomimagePOS = this.zoomimage_recadrepos(pos) ; 
      let zoomimg = this.zoomimagePHOTO[this.zoomimagePOS]

      // * * Fermeture Div Prec * * 
      let ZeObjDiv = document.getElementById("zoomimage_cadre_1") ;
      ZeObjDiv.className = "cache" ;
      ZeObjDiv.innerHTML = ""

      // * * Préparation contenu du DIV * *
      LeCont =  '<img src="' + zoomimg + '" alt="" id="zoomimage_image_1" onload="'+this.id
               +'zoomimage_chargimg(' + (this.zoomimagePOS) + ');" onclick="'+this.id
               +'zoomimageCL(' + (this.zoomimagePOS + 1) + ');" />' ;
      if (zoomimageCOUNT > 1)
      {  LeCont += '<img src="zoomimage_croix.png" alt="fermer" class="zoomimage_croix" onclick="'+this.id+'zoomimage_Fermer();" />' ;
         LeCont += '<img src="zoomimage_gauche.png" alt="<-" class="zoomimage_gauche" onclick="'+this.id
                  +'zoomimageCL(' + (this.zoomimagePOS - 1) + ');" />' ;
         if (zoomimagePLAY)
         {  LeCont += '<img src="zoomimage_pause.png" alt="Pause" id="zoomimage_play" class="zoomimage_play" onclick="'+this.id
                     +'zoomimage_btplay(' + (this.zoomimagePOS) + ');" />' ; }
         else
         {  LeCont += '<img src="zoomimage_play.png" alt="Play" id="zoomimage_play" class="zoomimage_play" onclick="'+this.id
                     +'zoomimage_btplay(' + (this.zoomimagePOS) + ');" />' ; }
            LeCont += '<img src="zoomimage_droite.png" alt="->" class="zoomimage_droite" onclick="'+this.id   
                     +'zoomimageCL(' + (this.zoomimagePOS + 1) + ');" />' ;
      }

      // * * Affichage * *
      document.getElementById("zoomimage_fond").className = "affich" ;
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
      document.getElementById("zoomimage_cadre_1").className = "affich" ; 

      // Prechargement du suivant
      let suiv = new Image() ;
      suiv.src = zoomimagePHOTO[this.zoomimage_recadrepos(pos + 1)] ;

      // Diaporama auto
      if (zoomimagePLAY)
      {  setTimeout(this.id+"zoomimage_diapo("+pos+")", 4000);
      }
   }


   // ----- Fermer le diaporama -----
   this.zoomimage_Fermer = function()
   {  this.zoomimagePOS = -1 ;
      document.getElementById("zoomimage_cadre_1").className = "cache" ;
      document.getElementById("zoomimage_fond").className = "cache" ;
      this.zoomimagePLAY  = false ;
   }
   this.zoomimage_FondFermer = function()
   {  if (!this.zoomimageInactClick)
      {  this.zoomimage_Fermer()
      }
      this.zoomimageInactClick = false ;
   }



   // ----- Base d'affichage et de mise en place du diaporama -----
   this.zoomimage_placezoom = function()
   {  // --- Recherche classe zoomimage ---
      let ob = document.getElementsByClassName("zoomimage") ; 
      let zeThis = this ;
      for (idx in ob)
      {  if(ob[idx].tagName == "IMG")
         {  this.zoomimageCOUNT++ ;
            this.zoomimagePHOTO[this.zoomimageCOUNT] = ob[idx].src ;
            this.zoomimagePHOTOURL[ob[idx].src] = this.zoomimageCOUNT ;
            ob[idx].onclick = function() { zeThis.zoomimageURL(this.src); return false ;} ;
            ob[idx].className = ob[idx].className.replace('zoomimagOK', 'zoomimage') ;
         }
         if(ob[idx].tagName == "A")
         {  this.zoomimageCOUNT++ ;
            this.zoomimagePHOTO[this.zoomimageCOUNT] = ob[idx].href ;
            this.zoomimagePHOTOURL[ob[idx].href] = this.zoomimageCOUNT ;
            ob[idx].onclick = function() { zeThis.zoomimageURL(this.href); return false ;} ;
            ob[idx].className = ob[idx].className.replace('zoomimagOK', 'zoomimage') ;
         }
      }
      // --- Chargement en cours
      document.write('<div id="zoomimage_fond" class="cache" onclick="'+this.id+'zoomimage_FondFermer();" >') ;
      document.write('<div id="zoomimage_cadre_0" class="cache" >') ;
      document.write('<p>Loading . . .<br />') ;
      document.write('<img src="zoomimage_loader.gif" alt="En chargement ..." /></p>') ;
      document.write('</div>') ;
      // --- Prepar Image 
      document.write('<div id="zoomimage_cadre_1" class="cache" ></div>') ;  
      document.write('</div>') ;
   }

}

// ----- Affichage
let zi = new ZoomImage('zi') ;
zi.zoomimage_placezoom() ;