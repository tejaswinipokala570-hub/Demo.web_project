//!Search Bar Functionality
let searchInput = document.getElementById("searchInput")
let productCards = document.querySelectorAll(".product_card")
searchInput.addEventListener("input", () => {
  let searchValue = searchInput.value.toLowerCase()
  productCards.forEach((card) => {
    let productName = card.querySelector("h1").innerText.toLowerCase()
    if (productName.includes(searchValue)) {
      card.style.display = "flex"
    } else {
      card.style.display = "none"
    }
  })
  let ProductContainers = document.querySelectorAll(".products")
  ProductContainers.forEach((ProductContainer) => {
    let cards = ProductContainer.querySelectorAll(".product_card")
    let visibleCount = 0
    cards.forEach((card) => {
      if (card.style.display == "flex") {
        visibleCount++
      }
    })
    if (visibleCount == 0) {
      ProductContainer.style.display = "none"
    } else {
      ProductContainer.style.display = "block"
    }
  })
})

//!Add To Cart Functionality
let cart = []
let cartQuantity = document.getElementById("cart_quantity")
let cartPrice = document.getElementById("cart_price")
productCards.forEach((card) => {
  let productName = card.querySelector("h1").innerText
  let productPrice = parseFloat(card.querySelector("p").innerText.replace("₹", ""))
  let productImage = card.querySelector("img").src
  let minusBtn = card.querySelector(".minus_btn")
  let cardQuantity = card.querySelector(".card_quantity")
  let plusBtn = card.querySelector(".plus_btn")
  let cardCartIcon = card.querySelector(".card_details2>p")

  cardCartIcon.addEventListener("click", () => {
    sidebarContainer.style.right = "0px"
    renderSidebar()
  })

  function updateNavbar() {
    let totalQty = 0;
    let totalPrice = 0;
    cart.forEach((item) => {
      totalQty += item.qty
      totalPrice += item.price * item.qty
    })
    cartQuantity.innerText = totalQty
    cartPrice.innerText = `₹${totalPrice.toFixed(2)}`
  }

  function updateCart(name, price, qty) {
    let existing = cart.find(item => item.name == name)
    if (existing) {
      existing.qty = qty
      if (qty == 0) {
        cart = cart.filter(item => item.name !== name)
      }
    } else {
      cart.push({ name, price, qty, image: productImage })
    }
    updateNavbar()
    localStorage.setItem("cart", JSON.stringify(cart))
  }

  plusBtn.addEventListener("click", () => {
    let qty = parseInt(cardQuantity.innerText)
    qty++
    cardQuantity.innerText = qty
    updateCart(productName, productPrice, qty)
    renderSidebar()
  })

  minusBtn.addEventListener("click", () => {
    let qty = parseInt(cardQuantity.innerText)
    if (qty > 0) qty--
    cardQuantity.innerText = qty
    updateCart(productName, productPrice, qty)
    renderSidebar()
  })
})

//!Sidebar Functionality
let cartIcon = document.querySelector("#nav_three>i")
let sidebarContainer = document.getElementById("sidebar_container")
let closeSidebarBtn = document.querySelector("#sidebar1>p")
let sidebar2 = document.getElementById("sidebar2")
let totalCartPrice = document.querySelector("#sidebar3>h2>span")

cartIcon.addEventListener("click", () => {
  sidebarContainer.style.right = "0px"
  renderSidebar()
})

closeSidebarBtn.addEventListener('click', () => {
  sidebarContainer.style.right = "-350px"
})

function renderSidebar() {
  sidebar2.innerHTML = ""
  if (cart.length == 0) {
    sidebar2.innerHTML = `<p style=margin:20px>Your Cart is empty</p>`
    totalCartPrice.innerText = "0.00"
    return
  }
  let total = 0
  cart.forEach((item) => {
    total += item.price * item.qty
    let itemDiv = document.createElement("div")
    itemDiv.classList.add("cart_item")
    itemDiv.innerHTML = `
       <div class=cart_item1>
        <img src=${item.image} alt=${item.name} height=120 width=150>
       </div>
       <div class=cart_item2>
          <h2 style=text-align:center>${item.name}</h2>
          <p>₹${item.price}</p>
          <div class=cart_item2_details>
            <p class=cart_item_quantity>Qty: ${item.qty}</p>
            <p class=cart_delete_btn><i class="fa-regular fa-trash-can"></i></p>
          </div>
       </div> 
     `
    sidebar2.append(itemDiv)

    //!Cart Items Delete Functionality
    let deleteBtn = itemDiv.querySelector(".cart_delete_btn")
    deleteBtn.addEventListener("click", () => {
      cart = cart.filter(existingItem => existingItem.name !== item.name)
      renderSidebar()
      //*navbar updation
      let totalQty = 0;
      let totalPrice = 0;
      cart.forEach((item) => {
        totalQty += item.qty
        totalPrice += item.price * item.qty
      })
      cartQuantity.innerText = totalQty
      cartPrice.innerText = `₹${totalPrice.toFixed(2)}`
      localStorage.setItem("cart", JSON.stringify(cart))
      let allCards = document.querySelectorAll(".product_card")
      allCards.forEach((card) => {
        let name = card.querySelector("h1").innerText
        if (name == item.name) {
          let quantity = card.querySelector(".card_quantity")
          quantity.innerText = 0
        }
      })
    })
    totalCartPrice.innerText = total.toFixed(2)
  })
}


let checkoutBtn = document.getElementById("checkout_btn")
checkoutBtn.addEventListener("click",()=>{
  location.href="Checkout.html"
})