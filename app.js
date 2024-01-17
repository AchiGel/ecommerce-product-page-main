const mainImage = document.querySelector(".main-image");
const images = document.querySelectorAll(".other-images img");
const counter = document.querySelector(".quantity span");
const counterBtns = document.querySelectorAll(".quantity img");
const modal = document.querySelector(".modal-overlay");
const mainImageModal = modal.querySelector(".main-image-modal");
const imagesModal = modal.querySelectorAll(".other-images-modal img");
const imageSliderModalBtns = modal.querySelectorAll(".arrow");

function imageSlider() {
  images.forEach((img) => {
    img.addEventListener("click", (e) => {
      const imgBtn = e.target;
      const imageSrc = imgBtn.src.replace("-thumbnail", "");
      mainImage.src = imageSrc;

      images.forEach((image) => {
        image.classList.remove("chosen-img");
      });

      img.classList.add("chosen-img");
    });
  });
}

function counterHandle() {
  let counterTemp = 0;

  counterBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const btnMP = e.target;

      if (btnMP === counterBtns[0]) {
        if (counterTemp <= 0) {
          return;
        }
        counterTemp--;
      } else {
        counterTemp++;
      }

      counter.textContent = counterTemp;
    });
  });
}

mainImage.addEventListener("click", () => {
  modal.style.display = "flex";
  document.body.style.overflowY = "hidden";
});

let currentIndex = 0;

if (modal) {
  const closeBtn = modal.querySelector(".closeBtn");
  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
    document.body.style.overflowY = "";
  });
  imagesModal.forEach((img) => {
    img.addEventListener("click", (e) => {
      const imgBtn = e.target;
      const imageSrc = imgBtn.src.replace("-thumbnail", "");
      mainImageModal.src = imageSrc;

      imagesModal.forEach((image) => {
        image.classList.remove("chosen-img");
      });

      img.classList.add("chosen-img");
    });
  });

  imageSliderModalBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (btn.classList.contains("previous")) {
        currentIndex =
          (currentIndex - 1 + imagesModal.length) % imagesModal.length;
      } else {
        currentIndex = (currentIndex + 1) % imagesModal.length;
      }

      showSlide(currentIndex);
    });
  });
}

function showSlide(index) {
  mainImageModal.src = imagesModal[index].src.replace("-thumbnail", "");
  imagesModal.forEach((image) => {
    image.classList.remove("chosen-img");
  });

  imagesModal[index].classList.add("chosen-img");
}

const cartBusket = document.querySelector(".cart");
const cartModal = document.querySelector(".cart-modal");
const cartModalItems = document.querySelector(".cart-modal-items");

cartBusket.addEventListener("click", () => {
  if (cartModal.style.display === "block") {
    cartModal.style.display = "none";
  } else {
    cartModal.style.display = "block";
  }
});

function displayCartItem(img, title, quantity, price) {
  return `<div class="cartItemContainer">
                <div class="cartItemBody">
                    <img class="shoes" src='${img}'/>
                    <div>
                        <h3>${title}</h3>
                        <span class="shoesQuantity">$125.00 x ${quantity} </span>
                        <span class="totalPrice">${price}</span>
                    </div>
                    <img class="clearCart" src="./images/icon-delete.svg"/>
                </div>
                <button>Checkout</button>
          </div>`;
}

const addToCartBtn = document.querySelector(".add-to-cart button");

addToCartBtn.addEventListener("click", () => {
  const imageSrc = mainImage.src;
  const title = "Fall Limited Edition Sneakers";
  const quantity = parseInt(
    document.querySelector(".quantity span").textContent
  );
  const price = `$${quantity * 125}.00`;

  const cartItem = displayCartItem(imageSrc, title, quantity, price);

  cartModalItems.innerHTML = cartItem;

  const cartContainerAfter = document.querySelector(".cartContainerAfter");

  cartContainerAfter.style.display = "flex";
  cartContainerAfter.textContent = quantity;

  const clearCart = document.querySelector(".clearCart");

  clearCart.addEventListener("click", () => {
    cartModalItems.querySelector(".cartItemContainer").remove();
    cartContainerAfter.style.display = "none";
    cartModalItems.textContent = "Your cart is empty.";
  });
});

const btnMobile = document.querySelectorAll(".btn");
const imageBoxMobile = document.querySelector(".img-box img");
let currentImageIndex = 0;
const imagesMobile = [
  "./images/image-product-1.jpg",
  "./images/image-product-2.jpg",
  "./images/image-product-3.jpg",
  "./images/image-product-4.jpg",
];

btnMobile.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    if (btn.classList.contains("previous-button")) {
      currentImageIndex =
        (currentImageIndex - 1 + imagesMobile.length) % imagesMobile.length;
    } else {
      currentImageIndex = (currentImageIndex + 1) % imagesMobile.length;
    }
    imageBoxMobile.src = imagesMobile[currentImageIndex];
  });
});

const burgerMenu = document.getElementById("burgerMenu");
const burgerMenuBar = document.getElementsByClassName("burger-menu-overlay")[0];
const closeBtnBurger = document.querySelector(".burger-menu-modal img");

burgerMenu.addEventListener("click", () => {
  burgerMenuBar.classList.add("show");
});

closeBtnBurger.addEventListener("click", () => {
  burgerMenuBar.classList.remove("show");
});

imageSlider();
counterHandle();
