//
//  Fonction de diaporama sur des images
//  
//  Appel se fait d'une maniere simple : ajout d'une classe zoomimage sur un lien ou une image
//
//  <a href="xxx" class="zoomimage"><img src=xxx"></a>
//  <img src="xxx" class="zoom image" />
//

function ZoomImage() {

   // ----- Les variables de travail, Permanente -----
   this.zoomimagePHOTO      = new Array() ;
   this.zoomimagePHOTOURL   = new Array() ;
   this.zoomimageCOUNT      = 0 ;
   this.zoomimagePLAY       = false ;
   this.zoomimagePOS        = -1 ;
   this.zoomimageInactClick = false ;


   // ----- Recale la position si on déborde à droite ou a gauche -----
   this.zoomimage_recadrepos function(pos)
   {  var rep = 1 * pos;
      if (rep < 1) { rep = zoomimageCOUNT ; }
      if (rep > zoomimageCOUNT) { rep = 1 ; }
      return rep ;
   }


   // ----- Diaporama, affichage image + 1 -----
   this.zoomimage_diapo function(pos)
   {  if (pos == zoomimagePOS && zoomimagePLAY)
      {  zoomimage(pos + 1) ; 
      }
   }


   // ----- Bascule Diaporama ON / OFF -----
   this.zoomimage_btplay = function(pos)
   {  zoomimageInactClick = true ;
      zoomimagePLAY = !zoomimagePLAY ;
      if (zoomimagePLAY)
      {  document.getElementById("zoomimage_play").src ="zoomimage_pause.png" ; 
         setTimeout("zoomimage_diapo("+pos+")", 200);
      }
      else
      {  document.getElementById("zoomimage_play").src = "zoomimage_play.png" ;
      }
   }


   // ----- Zoom sur une image -----
   this.zoomimageURL = function(url)
   { zoomimage(zoomimagePHOTOURL[url]);
   }

   this.zoomimage = function(pos)
   { // * * Affichage du fond * *    
      zoomimagePOS = zoomimage_recadrepos(pos) ; 
      var zoomimg = zoomimagePHOTO[zoomimagePOS]

      // * * Fermeture Div Prec * * 
      var ZeObjDiv = document.getElementById("zoomimage_cadre_1") ;
      ZeObjDiv.className = "cache" ;
      ZeObjDiv.innerHTML = ""

      // * * Préparation contenu du DIV * *
      LeCont =  '<img src="' + zoomimg + '" alt="" id="zoomimage_image_1" onload="zoomimage_chargimg(' + (zoomimagePOS) + ');" onclick="zoomimageCL(' + (zoomimagePOS + 1) + ');" />' ;    if (zoomimageCOUNT > 1)
      {  LeCont += '<img src="zoomimage_croix.png" alt="fermer" class="zoomimage_croix" onclick="zoomimage_Fermer();" />' ;
         LeCont += '<img src="zoomimage_gauche.png" alt="<-" class="zoomimage_gauche" onclick="zoomimageCL(' + (zoomimagePOS - 1) + ');" />' ;
         if (zoomimagePLAY)
         {  LeCont += '<img src="zoomimage_pause.png" alt="Pause" id="zoomimage_play" class="zoomimage_play" onclick="zoomimage_btplay(' + (zoomimagePOS) + ');" />' ; }
         else
         {  LeCont += '<img src="zoomimage_play.png" alt="Play" id="zoomimage_play" class="zoomimage_play" onclick="zoomimage_btplay(' + (zoomimagePOS) + ');" />' ; }
         LeCont += '<img src="zoomimage_droite.png" alt="->" class="zoomimage_droite" onclick="zoomimageCL(' + (zoomimagePOS + 1) + ');" />' ;
      }

      // * * Affichage * *
      document.getElementById("zoomimage_fond").className = "affich" ;
      document.getElementById("zoomimage_cadre_0").className = "affich" ;
      ZeObjDiv.className = "cache" ;
      ZeObjDiv.innerHTML = LeCont ;  
   }

   this.zoomimageCL = function(pos)
   {  if (zoomimageCOUNT > 1)
      {  zoomimageInactClick = true ;
         zoomimage(pos) ;
      } else {
         zoomimage_Fermer()
      }
   }

   // ----- image chargée (inLoad) il faut l'afficher -----
   this.zoomimage_chargimg = function(pos)
   { if (pos != zoomimagePOS) { return ; }
      document.getElementById("zoomimage_cadre_0").className = "cache" ;
      document.getElementById("zoomimage_cadre_1").className = "affich" ; 

      // Prechargement du suivant
      var suiv = new Image() ;
      suiv.src = zoomimagePHOTO[zoomimage_recadrepos(pos + 1)] ;

      // Diaporama auto
      if (zoomimagePLAY)
      {  setTimeout("zoomimage_diapo("+pos+")", 4000);
      }
   }


   // ----- Fermer le diaporama -----
   this.zoomimage_Fermer = function()
   {  zoomimagePOS = -1 ;
      document.getElementById("zoomimage_cadre_1").className = "cache" ;
      document.getElementById("zoomimage_fond").className = "cache" ;
      zoomimagePLAY  = false ;
   }
   this.zoomimage_FondFermer = function()
   {  if (!zoomimageInactClick)
      {  zoomimage_Fermer()
      }
      zoomimageInactClick = false ;
   }



   // ----- Base d'affichage et de mise en place du diaporama -----
   this.zoomimage_placezoom = function()
   {  // --- Recherche classe zoomimage ---
      var ob = document.getElementsByClassName("zoomimage") ; 
      for (idx in ob)
      {  if(ob[idx].tagName == "IMG")
         {  zoomimageCOUNT++ ;
            zoomimagePHOTO[zoomimageCOUNT] = ob[idx].src ;
            zoomimagePHOTOURL[ob[idx].src] = zoomimageCOUNT ;
            ob[idx].onclick = function() { zoomimageURL(this.src); return false ;} ;
            ob[idx].className = ob[idx].className.replace('zoomimagOK', 'zoomimage') ;
         }
         if(ob[idx].tagName == "A")
         {  zoomimageCOUNT++ ;
            zoomimagePHOTO[zoomimageCOUNT] = ob[idx].href ;
            zoomimagePHOTOURL[ob[idx].href] = zoomimageCOUNT ;
            ob[idx].onclick = function() { zoomimageURL(this.href); return false ;} ;
            ob[idx].className = ob[idx].className.replace('zoomimagOK', 'zoomimage') ;
         }
      }
      // --- Chargement en cours
      document.write('<div id="zoomimage_fond" class="cache" onclick="zoomimage_FondFermer();" >') ;
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
zoomimage_placezoom();