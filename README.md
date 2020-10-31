# ZoomImage - Diaporama Javascript

## présentation

A partir d'un ensemble d'image sur une page Web, ce script JavaScript permet de zoomer sur les images tout en installant un diaporama s'il y a plusieurs images.

## mise en place et fonctionnement

Fichiers nécessaire à l'utilisation (les autres sont des exemples):
- zoomimage.css
- zoomimage.js
- zoomimage_croix.png
- zoomimage_droite.png
- zoomimage_gauche.png
- zoomimage_loader.png
- zoomimage_pause.png
- zoomimage_play.png

Il faut ajouter l'appel à la feuille de style dédiée :     
   **\<link href="zoomimage.css" type="text/css" rel="stylesheet" />**

et en fin de page, il faut appeler le script :    
   **\<script type="text/javascript" src="zoomimage.js">\</script>**

Automatiquement, le script va chercher les classes "zoomimage" sur un lien ou une image pour mettre en place le diaporama qui se déclanchera en cliquant sur une image.

S'il y a qu'une image avec cette classe, il n'y aura qu'un zoom.    
S'il y a plusieurs images, il y aura un diaporama.

## Exemple de mise en place : 

Lien :     
**\<a href="grandeImage.jpg" class="zoomimage">\<img src="petiteImage.jpg" />\</a>**

Image :    
**\<img src="grandeImage.jpg" class="zoomimage" />**

