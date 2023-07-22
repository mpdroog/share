"use strict";
(() => {
console.log("Load");

const html = document.getElementById("js-rows-html").innerHTML;    
const $list = document.getElementById("js-rows");

function escapeHtml(html){
  var text = document.createTextNode(html);
  var p = document.createElement('p');
  p.appendChild(text);
  return p.innerHTML;
}

const $encBtn = document.getElementById("js-encrypt");
$encBtn.addEventListener("click", function(e) {
  e.preventDefault();
  console.log("Click");
  var txt = document.getElementById("js-plain").value;
  var ciphertext = CryptoJS.AES.encrypt(txt, mp).toString();
  console.log(ciphertext);
});

$list.addEventListener("click", function(e) {
  if (! e.target.classList.contains("js-toggle")) return;
  // TODO: Maybe something cleaner?
  var hidden = e.target.parentNode.getElementsByClassName("d-none");
  hidden[0].classList.remove("d-none");
});

var $login = document.getElementById("passForm");
var $mp = document.getElementById("js-mp");
// TODO: Use something like scrypt so the in memory value is useless and safe
var mp = null;

$login.children[0].addEventListener("submit", function(e) {
  e.preventDefault();
  if (! $login.children[0].checkValidity()) {
    console.log("form invalid");
    return;
  }
  console.log("Decode");

  $list.classList.remove("d-none");
  mp = $mp.value;
  // Destroy part of DOM
  $mp = null;
  $login.remove();
  $login = null;

  // Download and decode files
  window.fetch("/action/files", {
    credentials: "include",
  })
  .then(response => response.json())
  .then(function(data) {
    data.forEach(function(line) {
      var next = html;
      next = next.replaceAll("{{title}}", line.file);

      var bytes = CryptoJS.AES.decrypt(line.content, mp);
      var originalText = bytes.toString(CryptoJS.enc.Utf8);
      originalText = originalText.replaceAll("\n", "<br>");

      next = next.replaceAll("{{body}}", originalText);
      $list.insertAdjacentHTML("beforeend", next);
    });
  });
});

})();
