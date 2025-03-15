document.addEventListener("DOMContentLoaded", function () {
  const cartItemsContainer = document.getElementById("cart-items");
  const totalPriceElement = document.getElementById("total-price");
  const cartItemTemplate = document.getElementById("cart-item-template");

  function updateTotalPrice() {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    const total = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    totalPriceElement.textContent = `الإجمالي: $${total.toFixed(2)}`;
  }

  function renderCartItems() {
    cartItemsContainer.innerHTML = "";
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    cartItems.forEach((item, index) => {
      const cartItem = cartItemTemplate.content.cloneNode(true);
      cartItem.querySelector(".cart-item-image").src = item.image;
      cartItem.querySelector(".cart-item-name").textContent = item.name;
      cartItem.querySelector(".cart-item-price").textContent = `$${item.price}`;
      const quantityInput = cartItem.querySelector(".cart-item-quantity");
      quantityInput.value = item.quantity;

      cartItem.querySelector(".update-btn").addEventListener("click", () => {
        item.quantity = parseInt(quantityInput.value);
        cartItems[index] = item;
        localStorage.setItem("cart", JSON.stringify(cartItems));
        alert("تمت إضافة المنتج إلى العربة بنجاح!");
        updateTotalPrice();
      });

      cartItem.querySelector(".delete-btn").addEventListener("click", () => {
        cartItems.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cartItems));
        renderCartItems();
        updateTotalPrice();
      });

      cartItemsContainer.appendChild(cartItem);
    });
    updateTotalPrice();
  }

  function addToCartFromElement(element) {
    event.preventDefault();
    event.preventDefault();
    const productContainer = element.closest(".pro");
    const name = productContainer.querySelector(".p_Desc").textContent;
    const priceText = productContainer.querySelector(".p_Price").textContent;
    const price = parseFloat(priceText.replace("$", ""));
    const image = productContainer.querySelector(".p_Image").src;

    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItem = cartItems.find((item) => item.name === name);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cartItems.push({ name, price, image, quantity: 1 });
      alert("تمت إضافة المنتج إلى السلة بنجاح!");
    }
    localStorage.setItem("cart", JSON.stringify(cartItems));
    renderCartItems();
  }

  window.addToCartFromElement = addToCartFromElement;
  renderCartItems();
});

// loading
setTimeout(() => {
  const loadingSlide = document.querySelector('.loading_slide');
  loadingSlide.style.opacity = "0";
  loadingSlide.addEventListener('transitionend', () => {
      loadingSlide.style.display = "none";
  });
}, 1000);


window.onload = function () {
  const btns = document.getElementById('btn');

  window.onscroll = function () {
    if (window.scrollY > 100) {
      btns.style.display = 'flex'; 
    } else {
      btns.style.display = 'none';
    }
  }

  btns.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}