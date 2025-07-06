export function loading() {

      const spinner = document.getElementById("spinner");
      const cards = document.getElementById("cards");
    
      spinner.style.display = "block";
      cards.style.display = "none";
    
      setTimeout(() => {
        spinner.style.display = "none";
        cards.style.display = "flex";
      }, 1000);
 
}
loading();