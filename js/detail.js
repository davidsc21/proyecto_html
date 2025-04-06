document.querySelector(".btn-minus").addEventListener("click", () => {
    let qty = document.querySelector(".quantity");
    let value = parseInt(qty.textContent);
    if (value > 1) qty.textContent = value - 1;
  });
  
  document.querySelector(".btn-plus").addEventListener("click", () => {
    let qty = document.querySelector(".quantity");
    let value = parseInt(qty.textContent);
    qty.textContent = value + 1;
  });
  
  const readMoreBtn = document.querySelector(".read-more-btn");
  const modal = document.getElementById("readMoreModal");
  const closeModal = document.getElementById("closeModal");
  
  readMoreBtn.addEventListener("click", () => {
    modal.showModal();
  });
  
  closeModal.addEventListener("click", () => {
    modal.close();
  });
  
  
