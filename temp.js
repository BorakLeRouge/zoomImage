<p id="test" class="ok">test</p>

<script type="text/javascript">
// * * * * Exemple animation sur opacité * * * * *
function boHide(id) {
    var s = document.getElementById(id).style ;
    var result = parseFloat(s.opacity) - 0.1 ;
    s.opacity = result ;
    if (result >= 0) {
        setTimeout(function(){boHide(id)}, 60);
    } else { s.display = 'none' ; }
}
function boShow(id) {
    var s = document.getElementById(id).style ;
    var result = parseFloat(s.opacity) + 0.1 ;
    s.display = 'block' ;
    s.opacity = result ;
    if (result <= 1) {
        setTimeout(function(){boShow(id)}, 60);
    }
}
// * * * Preparation objet pour travail * * *
function boPrep(id) {
   var obj = document.getElementById(id)
   if (obj != undefined && obj != null) {
      obj.setAttribute('style', 'opacity: 1; display: block;') ;
      // setTimeout(function(){boHide(id)}, 4000);
}  }
boPrep('zeObjet') ;
</script>

<p><a href="javascript:boHide('test')">Hide</a>
 - <a href="javascript:boShow('test')">Show</a></p>